import type { Ward } from '@health-wards/shared';

// TODO [CHALLENGE: Data Engineering] - Replace with Prisma DB query
// Run `pnpm db:migrate` and update routes/wards.ts to use PrismaClient

export const stubWards: Ward[] = [
  {
    id: 'ward-001',
    name: 'Respiratory Virtual Ward',
    capacity: 20,
    specialty: 'respiratory',
  },
  {
    id: 'ward-002',
    name: 'Cardiology Virtual Ward',
    capacity: 15,
    specialty: 'cardiology',
  },
  {
    id: 'ward-003',
    name: 'General Medicine Virtual Ward',
    capacity: 30,
    specialty: 'general',
  },
];
