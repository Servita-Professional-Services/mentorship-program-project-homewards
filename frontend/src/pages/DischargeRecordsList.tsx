import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // ← uncomment for STEP 3
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

export function DischargeRecordsList() {
  // const navigate = useNavigate(); // ← uncomment for STEP 3

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
          {/* ── STEP 3 ────────────────────────────────────────────────────────────
              Add a button here that navigates to '/discharge-records/new'.
              Use the Button component with variant="secondary".
              Example: <Button variant="secondary" onClick={() => navigate('/discharge-records/new')}>+ New record</Button>
          ─────────────────────────────────────────────────────────────────────── */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">

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
            <p className="font-medium" style={{ color: '#d5281b' }}>{error}</p>
            <p className="mt-2 text-sm text-text-muted">
              Check that <code>pnpm dev</code> is running
            </p>
          </div>
        )}

        {/* STEP 6 — Build the table here */}
        {!loading && !error && (
          <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border overflow-hidden">
            {/* your table goes here — records, wardName(), formatDate(), isPast() are all available */}
            <div className="px-6 py-16 text-center text-text-muted text-sm">
              {records.length === 0
                ? 'No discharge records found.'
                : `${records.length} record${records.length !== 1 ? 's' : ''} loaded — see STEP 6 above to build the table`}
              <p className="mt-1 text-xs opacity-60">
                Hint: use wardName(r.wardId), formatDate(r.preferredDateOfDischarge), isPast(r.preferredDateOfDischarge)
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
