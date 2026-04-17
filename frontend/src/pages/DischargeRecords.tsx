import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Patient } from '@health-wards/shared';
import { Input } from '../components/Input/Input';
import { NumberInput } from '../components/NumberInput/NumberInput';
import { DatePickerInput } from '../components/DatePickerInput/DatePickerInput';
import { TextArea } from '../components/TextArea/TextArea';
import { Button } from '../components/Button/Button';
import { Select } from '../components/Select/Select';
import { getPatients } from '../services/patients';
import { createDischargeRecord } from '../services/dischargeRecords';

type FormErrors = Partial<
  Record<'patientId' | 'preferredDateOfDischarge' | 'dateOfBloodwork' | 'dischargeReason', string>
>;

interface MedicationRow {
  id: string;
  medicationName: string;
  amount: string;
  measurement: string;
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-semibold text-text-primary mb-4 pb-2 border-b border-surface-border">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function DischargeRecords() {
  const navigate = useNavigate();

  // ── Patient selection ──────────────────────────────────────────────────────
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const selectedPatient = patients.find((p) => p.id === selectedPatientId) ?? null;

  // Populated once STEP 3 (getPatients) is implemented
  useEffect(() => {
    getPatients()
      .then(setPatients)
      .catch(() => {});
  }, []);

  // ── Form state ─────────────────────────────────────────────────────────────
  const [preferredDateOfDischarge, setPreferredDateOfDischarge] = useState<Date | null>(null);
  const [dateOfBloodwork, setDateOfBloodwork] = useState<Date | null>(null);
  const [dischargeReason, setDischargeReason] = useState('');
  const [supportPlanNeeded, setSupportPlanNeeded] = useState(false);
  const [medications, setMedications] = useState<MedicationRow[]>([]);

  // ── Submission state ───────────────────────────────────────────────────────
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // ── Medication helpers ─────────────────────────────────────────────────────
  function addMedication() {
    setMedications((prev) => [
      ...prev,
      { id: crypto.randomUUID(), medicationName: '', amount: '', measurement: '' },
    ]);
  }

  function removeMedication(id: string) {
    setMedications((prev) => prev.filter((m) => m.id !== id));
  }

  function updateMedication(id: string, field: keyof Omit<MedicationRow, 'id'>, value: string) {
    setMedications((prev) => prev.map((m) => (m.id === id ? { ...m, [field]: value } : m)));
  }

  // ── STEP 5 — Validate the form ─────────────────────────────────────────────
  // Return an errors object with a message for each invalid field.
  // Required: patientId, preferredDateOfDischarge, dateOfBloodwork, dischargeReason
  // Date rule: dateOfBloodwork must not be after preferredDateOfDischarge
  function validateForm(): FormErrors {
    const errs: FormErrors = {};
    // your code here
    return errs;
  }

  // ── STEP 5 — Submit to the API ─────────────────────────────────────────────
  // validateForm() runs first — if there are errors they're shown on the fields.
  // Then call createDischargeRecord() (STEP 1d) with the form data.
  // On success: navigate('/discharge-records')
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);
    setSubmitError(null);

    try {
      await createDischargeRecord(selectedPatientId, {
        preferredDateOfDischarge: preferredDateOfDischarge!,
        dateOfBloodwork: dateOfBloodwork!,
        dischargeReason,
        supportPlanNeeded,
        medicationRecords: medications.map((m) => ({
          medicationName: m.medicationName,
          amount: Number(m.amount),
          measurement: m.measurement,
        })),
      });
      navigate('/discharge-records');
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  const patientOptions = [
    { value: '', label: 'Select a patient…' },
    ...patients.map((p) => ({ value: p.id, label: `${p.name} — ${p.nhsNumber}` })),
  ];

  return (
    <>
      {/* Page header */}
      <div className="bg-brand-primary px-8 py-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white">New Discharge Record</h1>
          <p className="mt-1 text-white/60 text-sm">
            Complete all required fields before submitting
          </p>

          {selectedPatient && (
            <div className="mt-4 text-sm text-white/80">
              <span className="font-medium">{selectedPatient.name}</span>
              <span className="mx-2 opacity-40">·</span>
              <span className="font-mono">{selectedPatient.nhsNumber}</span>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} noValidate>
          <div className="bg-surface-card rounded-2xl shadow-sm border border-surface-border p-8 flex flex-col gap-8">
            {/* ── STEP 4 — Patient selector ──────────────────────────────────
                The patient list comes from getPatients() (STEP 3).
                Once STEP 3 is implemented, this dropdown will populate. */}
            <FormSection title="Patient">
              <Select
                id="patientId"
                label="Patient"
                value={selectedPatientId}
                options={patientOptions}
                error={errors.patientId}
                onChange={(e) => {
                  setSelectedPatientId(e.target.value);
                  setErrors((prev) => ({ ...prev, patientId: undefined }));
                }}
              />
            </FormSection>

            {/* ── STEP 4 — Discharge detail fields ───────────────────────────
                Use the pre-built form components:
                  DatePickerInput  — for dates
                  TextArea         — for discharge reason
                The error prop on each field is already wired to the errors state. */}
            <FormSection title="Discharge Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DatePickerInput
                  id="preferredDateOfDischarge"
                  label="Preferred date of discharge"
                  selected={preferredDateOfDischarge}
                  error={errors.preferredDateOfDischarge}
                  onChange={(date) => {
                    setPreferredDateOfDischarge(date);
                    setErrors((prev) => ({ ...prev, preferredDateOfDischarge: undefined }));
                  }}
                />
                {/* TODO - Date of bloodwork */}

                <div className="mt-4">{/* TODO - Discharge Reason */}</div>

                <div className="mt-4 flex items-center gap-3">
                  {/* TODO - Checkbox for support plan */}
                </div>
              </div>
            </FormSection>

            <FormSection title="Medications">
              {medications.length === 0 && (
                <p className="text-sm text-text-muted mb-4">No medications added yet.</p>
              )}

              <div className="flex flex-col gap-3">
                {medications.map((med) => (
                  <div key={med.id} className="grid grid-cols-[1fr_auto_auto_auto] gap-3 items-end">
                    <Input
                      label="Medication name"
                      placeholder="e.g. Lisinopril"
                      value={med.medicationName}
                      onChange={(e) => updateMedication(med.id, 'medicationName', e.target.value)}
                    />
                    <NumberInput
                      label="Amount"
                      placeholder="0"
                      min={0}
                      step="any"
                      value={med.amount}
                      onChange={(e) => updateMedication(med.id, 'amount', e.target.value)}
                      className="w-24"
                    />
                    <Input
                      label="Unit"
                      placeholder="mg"
                      value={med.measurement}
                      onChange={(e) => updateMedication(med.id, 'measurement', e.target.value)}
                      className="w-20"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedication(med.id)}
                      className="mb-[1px] text-text-muted hover:text-status-escalated transition-colors text-lg leading-none"
                      aria-label="Remove medication"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <Button
                type="button"
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={addMedication}
              >
                + Add medication
              </Button>
            </FormSection>

            {submitError && (
              <p className="text-sm text-status-escalated text-right">{submitError}</p>
            )}

            <div className="flex justify-end gap-3 pt-2 border-t border-surface-border">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/discharge-records')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={submitting}>
                {submitting ? 'Saving…' : 'Save discharge record'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
