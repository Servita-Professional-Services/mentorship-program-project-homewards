export type EscalationLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type EscalationStatus = 'OPEN' | 'RESOLVED';

export interface EscalationRecord {
  id: string;
  patientId: string;
  level: EscalationLevel;
  reason: string;
  status: EscalationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const escalations: EscalationRecord[] = [
  {
    id: 'esc-001',
    patientId: 'pat-002',
    level: 'HIGH',
    reason: 'Delayed discharge — awaiting cardiology sign-off',
    status: 'OPEN',
    createdAt: new Date('2026-04-06T16:00:00Z'),
    updatedAt: new Date('2026-04-06T16:00:00Z'),
  },
  {
    id: 'esc-002',
    patientId: 'pat-004',
    level: 'MEDIUM',
    reason: 'Patient requires occupational therapy assessment before discharge',
    status: 'OPEN',
    createdAt: new Date('2026-04-07T08:30:00Z'),
    updatedAt: new Date('2026-04-07T08:30:00Z'),
  },
];
