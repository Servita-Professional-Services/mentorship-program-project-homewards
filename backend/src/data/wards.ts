// TODO [CHALLENGE: Data Engineering] - Replace with Prisma DB query
// Run `pnpm db:migrate` and update routes/wards.ts to use PrismaClient

import { Ward } from '@prisma/client';

export const stubWards: Ward[] = [
  {
    id: 'ward-001',
    name: 'Respiratory Virtual Ward',
    capacity: 20,
    speciality: 'respiratory',
    location: 'Manchester University NHS Foundation Trust',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ward-002',
    name: 'Cardiology Virtual Ward',
    capacity: 15,
    speciality: 'cardiology',
    location: 'Nottingham University Hospitals NHS Trust',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'ward-003',
    name: 'General Medicine Virtual Ward',
    capacity: 30,
    speciality: 'general',
    location: 'University Hospitals Birmingham NHS Foundation Trust',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
