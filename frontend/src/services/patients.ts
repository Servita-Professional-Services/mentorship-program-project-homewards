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
  const res = await fetch(`${API_BASE}/api/v1/patients`);
  if (!res.ok) throw new Error(`Failed to fetch patients: ${res.status}`);
  const json = await res.json();
  return json.data;
}
