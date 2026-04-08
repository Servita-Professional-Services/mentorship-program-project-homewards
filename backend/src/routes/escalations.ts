import { Router, type IRouter } from 'express';
import { escalations, EscalationLevel, EscalationRecord } from '../data/escalations';
import { stubPatients } from '../data/patients';

export const escalationsRouter: IRouter = Router();

const VALID_LEVELS: EscalationLevel[] = ['LOW', 'MEDIUM', 'HIGH'];

escalationsRouter.get('/', (_req, res) => {
  res.json({
    data: escalations.map((e) => ({
      ...e,
      createdAt: e.createdAt.toISOString(),
      updatedAt: e.updatedAt.toISOString(),
    })),
    total: escalations.length,
  });
});

escalationsRouter.post('/', (req, res, next) => {
  const { patientId, level, reason } = req.body as {
    patientId: string;
    level: EscalationLevel;
    reason: string;
  };

  if (!patientId || !level || !reason) {
    const err = Object.assign(new Error('patientId, level, and reason are required'), {
      statusCode: 400,
    });
    return next(err);
  }

  if (!VALID_LEVELS.includes(level)) {
    const err = Object.assign(new Error(`level must be one of: ${VALID_LEVELS.join(', ')}`), {
      statusCode: 400,
    });
    return next(err);
  }

  const patient = stubPatients.find((p) => p.id === patientId);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${patientId} not found`), { statusCode: 404 });
    return next(err);
  }

  const escalation: EscalationRecord = {
    id: `esc-${Date.now()}`,
    patientId,
    level,
    reason,
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  escalations.push(escalation);

  res.status(201).json({
    data: {
      ...escalation,
      createdAt: escalation.createdAt.toISOString(),
      updatedAt: escalation.updatedAt.toISOString(),
    },
  });
});
