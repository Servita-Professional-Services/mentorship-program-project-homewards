// TODO [CHALLENGE: Data Engineering] - Replace with Prisma DB query
// A patient can have multiple discharge records across separate admissions.

export interface StubMedicationRecord {
  id: string;
  medicationName: string;
  amount: number;
  measurement: string;
  dischargeRecordId: string;
}

export interface StubDischargeRecord {
  id: string;
  patientId: string;
  dateOfBloodwork: Date;
  supportPlanNeeded: boolean;
  dischargeReason: string;
  preferredDateOfDischarge: Date;
  medicationRecords: StubMedicationRecord[];
  createdAt: Date;
  updatedAt: Date;
}

export const stubDischargeRecords: StubDischargeRecord[] = [
  {
    id: 'dr-001',
    patientId: 'pat-001',
    dateOfBloodwork: new Date('2026-04-06T09:00:00Z'),
    supportPlanNeeded: true,
    dischargeReason: 'Patient stable, ready for home care with community nurse follow-up.',
    preferredDateOfDischarge: new Date('2026-04-08T12:00:00Z'),
    medicationRecords: [
      {
        id: 'med-001',
        medicationName: 'Lisinopril',
        amount: 10,
        measurement: 'mg',
        dischargeRecordId: 'dr-001',
      },
      {
        id: 'med-002',
        medicationName: 'Atorvastatin',
        amount: 20,
        measurement: 'mg',
        dischargeRecordId: 'dr-001',
      },
    ],
    createdAt: new Date('2026-04-06T09:00:00Z'),
    updatedAt: new Date('2026-04-07T10:00:00Z'),
  },
  {
    id: 'dr-002',
    patientId: 'pat-001',
    dateOfBloodwork: new Date('2025-06-10T08:30:00Z'),
    supportPlanNeeded: false,
    dischargeReason: 'Respiratory episode resolved. Discharged with GP follow-up.',
    preferredDateOfDischarge: new Date('2025-06-12T11:00:00Z'),
    medicationRecords: [
      {
        id: 'med-004',
        medicationName: 'Salbutamol',
        amount: 100,
        measurement: 'mcg',
        dischargeRecordId: 'dr-002',
      },
    ],
    createdAt: new Date('2025-06-10T08:30:00Z'),
    updatedAt: new Date('2025-06-12T11:00:00Z'),
  },
  {
    id: 'dr-005',
    patientId: 'pat-005',
    dateOfBloodwork: new Date('2024-10-20T08:00:00Z'),
    supportPlanNeeded: false,
    dischargeReason: 'Treatment complete. No further clinical intervention required.',
    preferredDateOfDischarge: new Date('2024-10-22T10:00:00Z'),
    medicationRecords: [
      {
        id: 'med-003',
        medicationName: 'Metformin',
        amount: 500,
        measurement: 'mg',
        dischargeRecordId: 'dr-005',
      },
    ],
    createdAt: new Date('2024-10-20T08:00:00Z'),
    updatedAt: new Date('2024-10-22T10:00:00Z'),
  },
];
