export type DischargeRecordPayload = {
  id: number;
  dateOfBloodwork: Date;
  supportPlanNeeded: boolean;
  dischargeReason: string;
  preferredDateOfDischarge: Date;
  medication: MedicationRecord[];
};

export type MedicationRecord = {
  id: number;
  medicationName: string;
  amount: number;
};
