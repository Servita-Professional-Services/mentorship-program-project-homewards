
// TODO [CHALLENGE: Data Engineering] - Replace with Prisma DB query
// The seeds/patients.csv in /data is a starting point.
// Consider: how do you safely generate realistic test NHS numbers?

export type DischargeStatusValue = 'READY' | 'NOT_READY' | 'DISCHARGED';

export interface StubPatient {
  id: string;
  firstName: string;
  lastName: string;
  nhsNumber: string;
  wardId: string;
  dateOfBirth: Date;
  admittedAt: Date;
  dischargedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface DischargeStatusRecord {
  patientId: string;
  status: DischargeStatusValue;
  transportRequired: boolean;
  readySince: Date | null;
  updatedAt: Date;
}

export interface DischargeNoteRecord {
  id: string;
  patientId: string;
  note: string;
  type: string;
  createdAt: Date;
}

export const stubPatients: StubPatient[] = [
  {
    id: 'pat-001',
    firstName: 'Margaret',
    lastName: 'Thornton',
    nhsNumber: '943-476-5919',
    wardId: 'ward-001',
    dateOfBirth: new Date('1952-03-14'),
    admittedAt: new Date('2024-10-20T09:00:00Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'pat-002',
    firstName: 'Derek',
    lastName: 'Okafor',
    nhsNumber: '512-382-7741',
    wardId: 'ward-002',
    dateOfBirth: new Date('1967-07-22'),
    admittedAt: new Date('2024-11-01T14:30:00Z'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'pat-003',
    firstName: 'Priya',
    lastName: 'Patel',
    nhsNumber: '801-234-6612',
    wardId: 'ward-001',
    dateOfBirth: new Date('1989-01-09'),
    admittedAt: new Date('2024-11-05T08:15:00Z'),
    createdAt: new Date('2024-11-05T08:15:00Z'),
    updatedAt: new Date('2024-11-05T08:15:00Z'),
  },
  {
    id: 'pat-004',
    firstName: 'James',
    lastName: 'Whitfield',
    nhsNumber: '634-901-2281',
    wardId: 'ward-003',
    dateOfBirth: new Date('1975-11-30'),
    admittedAt: new Date('2024-10-28T11:00:00Z'),
    createdAt: new Date('2024-10-28T11:00:00Z'),
    updatedAt: new Date('2024-11-01T10:00:00Z'),
  },
  {
    id: 'pat-005',
    firstName: 'Aisha',
    lastName: 'Nkrumah',
    nhsNumber: '772-543-8819',
    wardId: 'ward-002',
    dateOfBirth: new Date('1944-06-03'),
    admittedAt: new Date('2024-10-15T16:45:00Z'),
    dischargedAt: new Date('2024-10-22T10:00:00Z'),
    createdAt: new Date('2024-10-15T16:45:00Z'),
    updatedAt: new Date('2024-10-22T10:00:00Z'),
  },
];

export const dischargeStatuses: Map<string, DischargeStatusRecord> = new Map([
  [
    'pat-001',
    {
      patientId: 'pat-001',
      status: 'READY',
      transportRequired: true,
      readySince: new Date('2026-04-07T10:00:00Z'),
      updatedAt: new Date('2026-04-07T10:00:00Z'),
    },
  ],
  [
    'pat-003',
    {
      patientId: 'pat-003',
      status: 'NOT_READY',
      transportRequired: false,
      readySince: null,
      updatedAt: new Date('2026-04-06T14:00:00Z'),
    },
  ],
  [
    'pat-005',
    {
      patientId: 'pat-005',
      status: 'DISCHARGED',
      transportRequired: false,
      readySince: new Date('2024-10-21T09:00:00Z'),
      updatedAt: new Date('2024-10-22T10:00:00Z'),
    },
  ],
]);

export const dischargeNotes: Map<string, DischargeNoteRecord[]> = new Map([
  [
    'pat-001',
    [
      {
        id: 'note-001',
        patientId: 'pat-001',
        note: 'Patient stable, transport arranged for 14:00.',
        type: 'GENERAL',
        createdAt: new Date('2026-04-07T10:05:00Z'),
      },
    ],
  ],
]);
