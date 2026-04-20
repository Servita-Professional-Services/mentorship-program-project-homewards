import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Ward } from '@health-wards/shared';
import { Select } from '../components/Select/Select';
import { DatePickerInput } from '../components/DatePickerInput/DatePickerInput';
import { Button } from '../components/Button/Button';
import { getWards } from '../services/wards';
import { getDischargeRecords, type DischargeEntry } from '../services/dischargeRecords';

// ─── DISCHARGE COORDINATION — STEP 6 (optional) ──────────────────────────────
//
// Replace the placeholder below with a calendar view of discharge records.
//
// The `records` array is already fetched and available — each item has:
//   id, patientId, patientName, nhsNumber, wardId, preferredDateOfDischarge
//
// Ideas:
//   - A simple month grid with patient names on their discharge date
//   - A grouped list by week
//   - Amber highlight for overdue rows (preferredDateOfDischarge in the past)
//
// Helper functions already in this file:
//   wardName(wardId)  — resolves a wardId to a human-readable name
//   formatDate(iso)   — formats an ISO date string as "08 Apr 2026"
//   isPast(iso)       — returns true if the date has already passed
//
// ─────────────────────────────────────────────────────────────────────────────

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export function isPast(iso: string): boolean {
  return new Date(iso) < new Date();
}


export function isToday(iso: string): boolean {
  const date = new Date(iso);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export function isThisWeek(iso: string): boolean {
  const date = new Date(iso);
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  return date >= startOfWeek && date <= endOfWeek;
}

export function DischargeRecordsList() {
  const navigate = useNavigate();

  const [records, setRecords] = useState<DischargeEntry[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [wardId, setWardId] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Populated once STEP 1 (getWards) is implemented
  useEffect(() => {
    getWards()
      .then(setWards)
      .catch(() => {});
  }, []);

  // Re-fetches whenever filters change — populated once STEP 2 (getDischargeRecords) is implemented
  useEffect(() => {
    setLoading(true);
    setError(null);

    getDischargeRecords({
      wardId: wardId || undefined,
      startDate: startDate ?? undefined,
      endDate: endDate ?? undefined,
    })
      .then(setRecords)
      .catch(() => setError('Could not load discharge records. Is the API running?'))
      .finally(() => setLoading(false));
  }, [wardId, startDate, endDate]);

  const wardOptions = [
    { value: '', label: 'All wards' },
    ...wards.map((w) => ({ value: w.id, label: w.name })),
  ];

  const wardName = (id: string | null) => wards.find((w) => w.id === id)?.name ?? '—';

  const hasFilters = wardId || startDate || endDate;
  const todayCount = records.filter((r) => isToday(r.preferredDateOfDischarge)).length;
  const thisWeekCount = records.filter((r) => isThisWeek(r.preferredDateOfDischarge)).length;
  const overdueCount = records.filter((r) => isPast(r.preferredDateOfDischarge)).length;

  return (
    <>
      {/* Page header */}
      <div className="bg-brand-primary px-8 py-10">
        <div className="max-w-7xl mx-auto flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Discharge Records</h1>
            <p className="mt-1 text-white/60 text-sm">
              Planned discharges across all virtual wards
            </p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/discharge-records/new')}>
            + New record
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats bar */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border px-6 py-5">
              <p className="text-sm text-text-muted">Today</p>
              <p className="text-3xl font-bold text-text-primary mt-1">{todayCount}</p>
              <p className="text-xs text-text-muted mt-1">planned discharges</p>
            </div>
            <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border px-6 py-5">
              <p className="text-sm text-text-muted">This week</p>
              <p className="text-3xl font-bold text-text-primary mt-1">{thisWeekCount}</p>
              <p className="text-xs text-text-muted mt-1">planned discharges</p>
            </div>
            <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border px-6 py-5">
              <p className="text-sm text-text-muted">Overdue</p>
              <p
                className={`text-3xl font-bold mt-1 ${overdueCount > 0 ? 'text-amber-500' : 'text-text-primary'}`}
              >
                {overdueCount}
              </p>
              <p className="text-xs text-text-muted mt-1">past discharge date</p>
            </div>
          </div>
        )}
        {/* Filter bar — ward and date range filters */}
        <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border px-6 py-4 mb-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-56">
              <Select
                id="wardFilter"
                label="Ward"
                value={wardId}
                options={wardOptions}
                onChange={(e) => setWardId(e.target.value)}
              />
            </div>
            <div className="w-44">
              <DatePickerInput
                id="startDate"
                label="From"
                selected={startDate}
                onChange={setStartDate}
                maxDate={endDate ?? undefined}
              />
            </div>
            <div className="w-44">
              <DatePickerInput
                id="endDate"
                label="To"
                selected={endDate}
                onChange={setEndDate}
                minDate={startDate ?? undefined}
              />
            </div>
            {hasFilters && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setWardId('');
                  setStartDate(null);
                  setEndDate(null);
                }}
              >
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-24 text-text-muted">Loading discharge records…</div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-24">
            <p className="font-medium" style={{ color: '#d5281b' }}>
              {error}
            </p>
            <p className="mt-2 text-sm text-text-muted">
              Check that <code>pnpm dev</code> is running
            </p>
          </div>
        )}

        {/* STEP 6 — Build the table here */}
        {!loading && !error && (
          <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border overflow-hidden">
            {/* your table goes here — records, wardName(), formatDate(), isPast() are all available */}
            {records.length === 0 ? (
              <div className="px-6 py-16 text-center text-text-muted text-sm">
                No discharge records found.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-surface-border text-left text-text-muted">
                    <th className="px-6 py-3 font-medium">Patient</th>
                    <th className="px-6 py-3 font-medium">NHS Number</th>
                    <th className="px-6 py-3 font-medium">Ward</th>
                    <th className="px-6 py-3 font-medium">Discharge Date</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr
                      key={r.id}
                      className={`border-b border-surface-border last:border-0 ${
                        isPast(r.preferredDateOfDischarge) ? 'bg-amber-50' : ''
                      }`}
                    >
                      <td className="px-6 py-4 font-medium">{r.patientName}</td>
                      <td className="px-6 py-4 text-text-muted">{r.nhsNumber}</td>
                      <td className="px-6 py-4 text-text-muted">{wardName(r.wardId)}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1 ${
                            isPast(r.preferredDateOfDischarge) ? 'text-amber-600 font-medium' : ''
                          }`}
                        >
                          {isPast(r.preferredDateOfDischarge) && '⚠ '}
                          {formatDate(r.preferredDateOfDischarge)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
