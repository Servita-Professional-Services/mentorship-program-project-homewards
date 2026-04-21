const API_BASE = import.meta.env.VITE_API_BASE as string;

export interface DischargeEntry {
  id: string;
  date: string;
  patientId: string;
  patientName: string;
  nhsNumber: string;
  wardId: string | null;
  preferredDateOfDischarge: string;
}

export interface DischargeRecordFilters {
  wardId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface MedicationPayload {
  medicationName: string;
  amount: number;
  measurement: string;
}

export interface CreateDischargeRecordPayload {
  preferredDateOfDischarge: Date;
  dateOfBloodwork: Date;
  dischargeReason: string;
  supportPlanNeeded: boolean;
  medicationRecords: MedicationPayload[];
}

// ─── DISCHARGE COORDINATION — STEP 2 ─────────────────────────────────────────
//
// Fetch all discharge records for the list/calendar view.
// Accepts optional filters: wardId, startDate, endDate.
//
// Endpoint : GET /api/v1/discharge-coordination/records
// Query    : ?wardId=&startDate=&endDate= (all optional)
// Response : { data: DischargeEntry[] }
// Returns  : DischargeEntry[]
//
// Hint: build a URLSearchParams object from the filters, append it to the URL,
// then fetch and return the data array.
//
// ─────────────────────────────────────────────────────────────────────────────
export async function getDischargeRecords(
  filters: DischargeRecordFilters = {},
): Promise<DischargeEntry[]> {
  const params = new URLSearchParams();
  if (filters.wardId) params.set('wardId', filters.wardId);
  if (filters.startDate) params.set('startDate', filters.startDate.toISOString());
  if (filters.endDate) params.set('endDate', filters.endDate.toISOString());

  const query = params.toString();
  const res = await fetch(
    `${API_BASE}/api/v1/discharge-coordination/records${query ? `?${query}` : ''}`,
  );

  if (!res.ok) throw new Error(`Failed to fetch discharge records: ${res.status}`);

  const json = await res.json();
  return json.data;
}
// ─── DISCHARGE COORDINATION — STEP 4 ─────────────────────────────────────────
//
// Create a new discharge record for a patient.
//
// Endpoint : POST /api/v1/patients/:patientId/discharge-records
// Body     : CreateDischargeRecordPayload (JSON)
// On error : throw an Error with the message from the API response so the
//            form can display it to the user.
//
// Hint: use fetch() with method: 'POST', set Content-Type: application/json,
// and JSON.stringify the payload. Check response.ok before returning.
//
// ─────────────────────────────────────────────────────────────────────────────
export async function createDischargeRecord(
  patientId: string,
  payload: CreateDischargeRecordPayload,
): Promise<void> {
  const res = await fetch(`${API_BASE}/api/v1/patients/${patientId}/discharge-records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorJson = await res.json().catch(() => null);
    throw new Error(errorJson?.message ?? `Failed to create discharge record: ${res.status}`);
  }
}
