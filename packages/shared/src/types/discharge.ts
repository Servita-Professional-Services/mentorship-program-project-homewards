export interface MedicationRecord {
  id: string;
  medicationName: string;
  amount: number;
  measurement: string;
}

export interface DischargeRecord {
  id: string;
  patientId: string;
  dateOfBloodwork: string; // ISO 8601
  supportPlanNeeded: boolean;
  dischargeReason: string;
  preferredDateOfDischarge: string; // ISO 8601
  medicationRecords: MedicationRecord[];
  createdAt: string;
  updatedAt: string;
}
