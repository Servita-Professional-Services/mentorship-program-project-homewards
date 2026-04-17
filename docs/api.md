# API Reference

Base URL: `http://localhost:3001`

All endpoints return JSON. Error responses follow the shape `{ "error": "message" }`.

---

## Health

### `GET /health`

Service liveness check.

**Response `200`**

```json
{
  "status": "ok",
  "timestamp": "2026-04-17T10:00:00.000Z",
  "service": "homeward-api",
  "version": "0.0.1"
}
```

---

## Wards

### `GET /api/v1/wards`

Returns all wards.

**Response `200`**

```json
{
  "data": [{ "id": "ward-a", "name": "Ward A" }],
  "total": 3
}
```

### `GET /api/v1/wards/:id`

Returns a single ward.

**Response `200`**

```json
{ "data": { "id": "ward-a", "name": "Ward A" } }
```

**Response `404`** — ward not found

---

## Patients

> Patients are currently backed by stub data in `backend/src/data/patients.ts`.

### `GET /api/v1/patients`

Returns all patients.

**Response `200`**

```json
{
  "data": [
    {
      "id": "patient-1",
      "name": "Jane Smith",
      "nhsNumber": "943 476 5919",
      "wardId": "ward-a",
      "ward": "Ward A",
      "status": "ADMITTED",
      "dateOfBirth": "1965-03-12T00:00:00.000Z",
      "admittedAt": "2026-03-01T00:00:00.000Z",
      "dischargedAt": null,
      "dischargeStatus": null,
      "transportRequired": false,
      "readySince": null
    }
  ],
  "total": 18
}
```

Patient `status` values: `ADMITTED` | `MONITORING` | `ESCALATED` | `DISCHARGED`

### `GET /api/v1/patients/:id`

Returns a single patient.

**Response `200`** — same shape as a single item in the list above

**Response `404`** — patient not found

### `POST /api/v1/patients/:id/discharge`

Updates the discharge status for a patient.

**Request body**

```json
{
  "status": "READY",
  "transportRequired": true
}
```

| Field               | Type    | Required | Values                                 |
| ------------------- | ------- | -------- | -------------------------------------- |
| `status`            | string  | yes      | `READY` \| `NOT_READY` \| `DISCHARGED` |
| `transportRequired` | boolean | yes      |                                        |

**Response `200`**

```json
{
  "data": {
    "patientId": "patient-1",
    "status": "READY",
    "transportRequired": true,
    "readySince": "2026-04-17T10:00:00.000Z",
    "updatedAt": "2026-04-17T10:00:00.000Z"
  }
}
```

**Response `400`** — invalid status value

### `GET /api/v1/patients/:id/notes`

Returns all notes for a patient.

**Response `200`**

```json
{
  "data": [
    {
      "id": "note-1234567890",
      "patientId": "patient-1",
      "note": "Patient responding well to treatment.",
      "type": "GENERAL",
      "createdAt": "2026-04-17T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Response `404`** — patient not found

### `POST /api/v1/patients/:id/notes`

Adds a note to a patient record.

**Request body**

```json
{
  "note": "Patient responding well to treatment.",
  "type": "GENERAL"
}
```

| Field  | Type   | Required | Notes                   |
| ------ | ------ | -------- | ----------------------- |
| `note` | string | yes      |                         |
| `type` | string | no       | Defaults to `"GENERAL"` |

**Response `201`**

```json
{
  "data": {
    "id": "note-1234567890",
    "patientId": "patient-1",
    "note": "Patient responding well to treatment.",
    "type": "GENERAL",
    "createdAt": "2026-04-17T10:00:00.000Z"
  }
}
```

**Response `400`** — note is missing

**Response `404`** — patient not found

---

## Discharge Records

> Backed by Prisma + SQLite. Run `db:migrate` and `db:seed` before using (see [getting-started.md](./getting-started.md)).

### `GET /api/v1/patients/:id/discharge-records`

Returns all discharge records for a patient, newest first.

**Response `200`**

```json
{
  "data": [
    {
      "id": "dr-abc123",
      "patientId": "patient-1",
      "preferredDateOfDischarge": "2026-04-25T00:00:00.000Z",
      "dateOfBloodwork": "2026-04-20T00:00:00.000Z",
      "dischargeReason": "Recovery complete",
      "supportPlanNeeded": false,
      "medicationRecords": [
        {
          "id": "med-abc123",
          "medicationName": "Lisinopril",
          "amount": 10,
          "measurement": "mg"
        }
      ],
      "createdAt": "2026-04-17T10:00:00.000Z",
      "updatedAt": "2026-04-17T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Response `404`** — patient not found

### `POST /api/v1/patients/:id/discharge-records`

Creates a new discharge record for a patient.

**Request body**

```json
{
  "preferredDateOfDischarge": "2026-04-25T00:00:00.000Z",
  "dateOfBloodwork": "2026-04-20T00:00:00.000Z",
  "dischargeReason": "Recovery complete",
  "supportPlanNeeded": false,
  "medicationRecords": [
    {
      "medicationName": "Lisinopril",
      "amount": 10,
      "measurement": "mg"
    }
  ]
}
```

| Field                      | Type            | Required | Notes            |
| -------------------------- | --------------- | -------- | ---------------- |
| `preferredDateOfDischarge` | ISO 8601 string | yes      |                  |
| `dateOfBloodwork`          | ISO 8601 string | yes      |                  |
| `dischargeReason`          | string          | yes      |                  |
| `supportPlanNeeded`        | boolean         | yes      |                  |
| `medicationRecords`        | array           | no       | Defaults to `[]` |

**Response `201`** — same shape as a single item from the GET list above

**Response `400`** — missing required fields

**Response `404`** — patient not found

---

## Discharge Coordination

### `GET /api/v1/discharge-coordination/records`

Returns discharge records across all patients, ordered by preferred discharge date ascending. Designed for calendar/list views.

**Query parameters** — all optional

| Param       | Type            | Description                            |
| ----------- | --------------- | -------------------------------------- |
| `wardId`    | string          | Filter to patients in this ward        |
| `startDate` | ISO 8601 string | Include records on or after this date  |
| `endDate`   | ISO 8601 string | Include records on or before this date |

**Example**

```
GET /api/v1/discharge-coordination/records?wardId=ward-a&startDate=2026-04-01&endDate=2026-04-30
```

**Response `200`**

```json
{
  "data": [
    {
      "id": "dr-abc123",
      "date": "2026-04-25T00:00:00.000Z",
      "patientId": "patient-1",
      "patientName": "Jane Smith",
      "nhsNumber": "943 476 5919",
      "wardId": "ward-a",
      "preferredDateOfDischarge": "2026-04-25T00:00:00.000Z"
    }
  ],
  "total": 1
}
```

**Response `400`** — invalid date format

---

## Escalations

> Backed by in-memory stub data — resets on server restart.

### `GET /api/v1/escalations`

Returns all escalations.

**Response `200`**

```json
{
  "data": [
    {
      "id": "esc-1",
      "patientId": "patient-1",
      "level": "HIGH",
      "reason": "Deteriorating obs",
      "status": "OPEN",
      "createdAt": "2026-04-17T10:00:00.000Z",
      "updatedAt": "2026-04-17T10:00:00.000Z"
    }
  ],
  "total": 1
}
```

### `POST /api/v1/escalations`

Creates a new escalation.

**Request body**

```json
{
  "patientId": "patient-1",
  "level": "HIGH",
  "reason": "Deteriorating obs"
}
```

| Field       | Type   | Required | Values                      |
| ----------- | ------ | -------- | --------------------------- |
| `patientId` | string | yes      | Must be a valid patient ID  |
| `level`     | string | yes      | `LOW` \| `MEDIUM` \| `HIGH` |
| `reason`    | string | yes      |                             |

**Response `201`** — same shape as a single item from the GET list above

**Response `400`** — missing/invalid fields

**Response `404`** — patient not found
