import { Router } from 'express';
import { stubPatients } from '../data/patients';

// TODO [CHALLENGE: API Design]
// 1. Replace stub data with real Prisma queries (see prisma/schema.prisma)
// 2. Add POST /api/v1/patients — what validation would you add?
// 3. How would you validate the NHS number format and check digit?
// 4. Should patients be nested under wards? /api/v1/wards/:id/patients?
// 5. What authentication/authorisation should protect patient data? (RBAC?)

export const patientsRouter = Router();

patientsRouter.get('/', (_req, res) => {
  res.json({ data: stubPatients, total: stubPatients.length });
});

patientsRouter.get('/:id', (req, res, next) => {
  const patient = stubPatients.find((p) => p.id === req.params['id']);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }
  res.json({ data: patient });
});
