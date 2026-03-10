# Data Engineering Challenges

> **Brief reference:** [`docs/brief.md`](../brief.md)
> These challenges develop the skills needed to deliver HomeWard's data infrastructure safely and at scale.

---

## DE-01 — Connect the Database

**Addresses:** `AR-3` Secure Data & Governance Alignment, `SE-3` Real-Time Performance & Reliability

The Prisma schema is fully defined but the API uses in-memory stub data. This is the foundational data challenge.

**Your challenge:**

1. Spin up PostgreSQL locally (Docker recommended: `docker run -e POSTGRES_PASSWORD=password -p 5432:5432 postgres`)
2. Create `backend/.env` with `DATABASE_URL=postgresql://postgres:password@localhost:5432/homeward`
3. Run `pnpm --filter '@health-wards/api' db:migrate` to apply migrations
4. Seed the database from [`data/seeds/patients.csv`](../../data/seeds/patients.csv)
5. Replace stub data in `backend/src/data/` with real Prisma queries using `PrismaClient`

**Entry point:** [`backend/prisma/schema.prisma`](../../backend/prisma/schema.prisma)

**Questions to answer:**

- Why PostgreSQL for this use case rather than MongoDB or MySQL?
- What is the difference between `prisma migrate dev` and `prisma migrate deploy`? When would you use each?
- How do you ensure the migration is safe to run against a production database that already has patient data in it?

---

## DE-02 — Observations Time-Series

**Addresses:** `PR-3` Safe Remote Monitoring & Escalation Model, `AR-1` Interoperable & API-First Design

The `Observation` model captures patient vitals (heart rate, blood pressure, SpO2, temperature, respiratory rate) over time. Currently no observation endpoints exist.

**Your challenge:**

- Add `GET /api/v1/patients/:id/observations` returning the last 24 hours by default
- Explain why the index `@@index([patientId, recordedAt])` in the Prisma schema matters for this query pattern
- Consider: at what observation volume does PostgreSQL become the wrong storage choice? What are the alternatives?

**Questions to answer:**

- The [NEWS2 score](https://www.rcplondon.ac.uk/projects/outputs/national-early-warning-score-news-2) is a clinical deterioration indicator calculated from multiple observation types. How would you structure a query that computes NEWS2 from the most recent reading of each type?
- How would you store and query a trend (e.g. "SpO2 dropping steadily over 6 hours") rather than just a point reading?

**Entry point:** [`backend/prisma/schema.prisma`](../../backend/prisma/schema.prisma) — `Observation` model

---

## DE-03 — Ward Summary & Reporting Endpoint

**Addresses:** `PR-3` Safe Remote Monitoring & Escalation Model, `SE-3` Real-Time Performance & Reliability

Build a ward summary endpoint that gives a clinician an at-a-glance view of their ward's status.

**Endpoint:** `GET /api/v1/wards/:id/summary`

**Expected response:**

```json
{
  "wardId": "ward-001",
  "name": "Respiratory Virtual Ward",
  "patientCount": 12,
  "capacity": 20,
  "capacityUtilisation": 0.6,
  "byStatus": {
    "MONITORING": 8,
    "ESCALATED": 2,
    "ADMITTED": 2,
    "DISCHARGED": 0
  },
  "lastUpdated": "2024-11-05T10:30:00Z"
}
```

**Questions to answer:**

- This endpoint will be called every time the dashboard refreshes. How would you cache it? (Redis, in-memory, HTTP `Cache-Control` headers?)
- At what request volume does caching become necessary — and how would you measure that?
- How do you ensure the `lastUpdated` timestamp is meaningful and accurate?

---

## DE-04 — Data Retention, Governance & GDPR

**Addresses:** `AR-3` Secure Data & Governance Alignment, `SE-2` Auditability

NHS data retention rules require patient records to be retained for defined periods after discharge (typically 8 years for adults under the [Records Management Code of Practice](https://transform.england.nhs.uk/information-governance/guidance/records-management-code/)). Deletion is not simply deletion.

**Your challenge:**

- Design a data retention policy for HomeWard, specifying retention periods for each data type (patient records, observations, audit logs, clinical notes)
- Implement a script or scheduled job that identifies records eligible for archival
- Define what "deletion" means in the context of a system that has audit requirements — can you truly delete a record that is referenced in an audit log?
- Consider: how does GDPR's "right to erasure" interact with NHS retention obligations?

**Entry point:** [`backend/prisma/schema.prisma`](../../backend/prisma/schema.prisma) — `Patient.dischargedAt` field

**Questions to answer:**

- What is the difference between soft deletion, anonymisation, and archival? When is each appropriate?
- An observation record contains both patient-identifiable data (patientId) and clinical data (the reading). If a patient invokes their right to erasure, what should happen to each part?
