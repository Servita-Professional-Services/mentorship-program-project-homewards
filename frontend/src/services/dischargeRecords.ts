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
  _filters: DischargeRecordFilters = {},
): Promise<DischargeEntry[]> {
  return [];
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
  _patientId: string,
  _payload: CreateDischargeRecordPayload,
): Promise<void> {
  // your code here
}
