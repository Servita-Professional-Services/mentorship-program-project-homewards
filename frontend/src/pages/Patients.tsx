import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient, Ward } from '@health-wards/shared';
import { StatusBadge } from '../components/StatusBadge/StatusBadge';

// TODO [CHALLENGE: Software Engineering] - SE-01
// This page fetches stub data from the API. To make it production-ready:
// 1. Add column sorting — click a header to sort ascending/descending
// 2. Add status filter tabs or pills (ESCALATED / MONITORING / ADMITTED / DISCHARGED)
// 3. Add a search bar to filter by patient name or NHS number
// 4. Add pagination — real wards have hundreds of patients
// 5. Move API_BASE to a VITE_API_URL env variable

// TODO [CHALLENGE: Data Engineering] - DE-01
// The API returns stub data from backend/src/data/patients.ts
// Once the DB is connected, replace the route handler with a real Prisma query

// TODO [CHALLENGE: Component Design]
// The loading and error states are intentionally minimal.
// Build a proper Skeleton loading component and an ErrorState component —
// both reusable across pages.

const API_BASE = import.meta.env.VITE_API_BASE as string;

function getAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }
  return age;
}

function daysSince(isoDate: string): number {
  return Math.floor((Date.now() - new Date(isoDate).getTime()) / 86_400_000);
}

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function Patients() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [wardMap, setWardMap] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/api/v1/patients`).then((r) => r.json()),
      fetch(`${API_BASE}/api/v1/wards`).then((r) => r.json()),
    ])
      .then(([patientRes, wardRes]: [{ data: Patient[] }, { data: Ward[] }]) => {
        setPatients(patientRes.data);
        setWardMap(Object.fromEntries(wardRes.data.map((w) => [w.id, w.name])));
      })
      .catch(() => setError('Could not load patient data. Is the API running?'))
      .finally(() => setLoading(false));
  }, []);

  const escalatedCount = patients.filter((p) => p.status === 'ESCALATED').length;

  return (
    <>
      {/* Page header */}
      <div className="bg-brand-primary px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white">Patients</h1>
          <p className="mt-1 text-white/60 text-sm">
            All patients currently admitted across virtual wards
          </p>
          {escalatedCount > 0 && !loading && (
            <div
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
              style={{
                backgroundColor: '#d5281b22',
                color: '#d5281b',
                border: '1px solid #d5281b35',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-current" />
              {escalatedCount} patient{escalatedCount !== 1 ? 's' : ''} require urgent review
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Loading */}
        {loading && <div className="text-center py-24 text-text-muted">Loading patients…</div>}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="font-medium" style={{ color: '#d5281b' }}>
              {error}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Check that <code>pnpm start</code> is running
            </p>
          </div>
        )}

        {/* Table */}
        {!loading && !error && (
          <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border overflow-hidden">
            {/* TODO [CHALLENGE: Software Engineering] - Add search + filter bar here */}

            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border bg-surface-bg">
                  {/* TODO [CHALLENGE: Software Engineering] - Make headers clickable to sort */}
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Patient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    NHS Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Ward
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Admitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-text-muted uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {patients.map((patient) => {
                  const isEscalated = patient.status === 'ESCALATED';
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => navigate(`/patients/${patient.id}`)}
                      className="hover:bg-surface-bg cursor-pointer transition-colors"
                      style={
                        isEscalated
                          ? { borderLeft: '3px solid #d5281b' }
                          : { borderLeft: '3px solid transparent' }
                      }
                    >
                      <td className="px-6 py-4 font-medium text-text-primary">
                        {patient.name}
                        {patient.dischargedAt && (
                          <span className="ml-2 text-xs text-text-muted">
                            Discharged {formatDate(patient.dischargedAt)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-mono text-text-muted">{patient.nhsNumber}</td>
                      <td className="px-6 py-4 text-text-muted">
                        {wardMap[patient.wardId] ?? patient.wardId}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={patient.status} />
                      </td>
                      <td className="px-6 py-4 text-text-muted">
                        {daysSince(patient.admittedAt)}d
                      </td>
                      <td className="px-6 py-4 text-text-muted">{getAge(patient.dateOfBirth)}</td>
                      <td className="px-6 py-4">
                        {/* ── STEP 4 ────────────────────────────────────────────────────
                            Add an "Add discharge" button here that navigates to
                            `/discharge-records/new` (you'll need to pass the patient ID too).
                            Use e.stopPropagation() so the row click doesn't also fire.
                            Example:
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); navigate(`/discharge-records/new`); }}
                              className="text-xs text-brand-primary hover:underline"
                            >
                              Add discharge
                            </button>
                        ─────────────────────────────────────────────────────────────── */}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="px-6 py-3 border-t border-surface-border bg-surface-bg text-xs text-text-muted flex items-center justify-between">
              <span>
                {patients.length} patient{patients.length !== 1 ? 's' : ''}
              </span>
              {/* TODO [CHALLENGE: Software Engineering] - Add pagination controls here */}
              <span className="italic opacity-60">Pagination not yet implemented</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
