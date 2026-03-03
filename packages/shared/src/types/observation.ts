// TODO [CHALLENGE: Data Engineering] - Observations are time-series data.
// What storage format/database would you choose for this? Why?
// How would you detect an abnormal reading?

export type ObservationType =
  | 'BLOOD_PRESSURE'
  | 'HEART_RATE'
  | 'OXYGEN_SATURATION'
  | 'TEMPERATURE'
  | 'RESPIRATORY_RATE';

export interface Observation {
  id: string;
  patientId: string;
  type: ObservationType;
  value: number;
  unit: string;
  recordedAt: string; // ISO 8601
  recordedBy?: string; // clinician ID — not linked to a user model yet
}
