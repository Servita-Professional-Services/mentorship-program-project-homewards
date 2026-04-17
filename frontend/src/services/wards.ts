import type { Ward } from '@health-wards/shared';

const API_BASE = import.meta.env.VITE_API_BASE as string;

// ─── DISCHARGE COORDINATION — STEP 1 (worked example) ────────────────────────
//
// This function is already implemented — read it carefully before moving on.
// The other service functions follow the same pattern.
//
// Endpoint : GET /api/v1/wards
// Response : { data: Ward[] }
// Returns  : Ward[]
//
// ─────────────────────────────────────────────────────────────────────────────
export async function getWards(): Promise<Ward[]> {
  const res = await fetch(`${API_BASE}/api/v1/wards`);
  if (!res.ok) throw new Error(`Failed to fetch wards: ${res.status}`);
  const json: { data: Ward[] } = await res.json();
  return json.data;
}
