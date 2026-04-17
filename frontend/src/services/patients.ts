import type { Patient } from '@health-wards/shared';

const API_BASE = import.meta.env.VITE_API_BASE as string;

// ─── DISCHARGE COORDINATION — STEP 3 ─────────────────────────────────────────
//
// Fetch all patients. Used to populate the patient selector in the new
// discharge record form.
//
// Endpoint : GET /api/v1/patients
// Response : { data: Patient[] }
// Returns  : Patient[]
//
// ─────────────────────────────────────────────────────────────────────────────
export async function getPatients(): Promise<Patient[]> {
  return [];
}
