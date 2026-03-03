import type { Patient } from '@health-wards/shared';

// TODO [CHALLENGE: Data Engineering] - Replace with Prisma DB query
// The seeds/patients.csv in /data is a starting point.
// Consider: how do you safely generate realistic test NHS numbers?

export const stubPatients: Patient[] = [
  {
    id: 'pat-001',
    name: 'Margaret Thornton',
    nhsNumber: '943-476-5919',
    wardId: 'ward-001',
    status: 'MONITORING',
    dateOfBirth: '1952-03-14',
    admittedAt: '2024-11-01T09:00:00Z',
  },
  {
    id: 'pat-002',
    name: 'Derek Okafor',
    nhsNumber: '512-382-7741',
    wardId: 'ward-002',
    status: 'ADMITTED',
    dateOfBirth: '1967-07-22',
    admittedAt: '2024-11-03T14:30:00Z',
  },
  {
    id: 'pat-003',
    name: 'Priya Patel',
    nhsNumber: '801-234-6612',
    wardId: 'ward-001',
    status: 'ESCALATED',
    dateOfBirth: '1989-01-09',
    admittedAt: '2024-11-05T08:15:00Z',
  },
  {
    id: 'pat-004',
    name: 'James Whitfield',
    nhsNumber: '634-901-2281',
    wardId: 'ward-003',
    status: 'MONITORING',
    dateOfBirth: '1975-11-30',
    admittedAt: '2024-10-28T11:00:00Z',
  },
  {
    id: 'pat-005',
    name: 'Aisha Nkrumah',
    nhsNumber: '772-543-8819',
    wardId: 'ward-002',
    status: 'DISCHARGED',
    dateOfBirth: '1944-06-03',
    admittedAt: '2024-10-15T16:45:00Z',
    dischargedAt: '2024-10-22T10:00:00Z',
  },
];
