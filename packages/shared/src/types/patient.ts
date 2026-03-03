// TODO [CHALLENGE: Data Modelling] - Review the Patient model.
// Consider: what happens when a patient is discharged? Should status be a discriminated union?
// What fields are missing for a real NHS Virtual Ward context?

export type PatientStatus = 'ADMITTED' | 'MONITORING' | 'ESCALATED' | 'DISCHARGED';

export interface Patient {
  id: string;
  name: string;
  nhsNumber: string; // format: XXX-XXX-XXXX
  wardId: string;
  status: PatientStatus;
  dateOfBirth: string; // ISO 8601
  admittedAt: string; // ISO 8601
  dischargedAt?: string; // ISO 8601 — null means still admitted
}
