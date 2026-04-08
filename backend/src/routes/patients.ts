import { Router, type IRouter } from 'express';
import {
  stubPatients,
  dischargeStatuses,
  dischargeNotes,
  DischargeStatusValue,
  DischargeNoteRecord,
} from '../data/patients';
import { stubWards } from '../data/wards';

// TODO [CHALLENGE: API Design]
// 1. Replace stub data with real Prisma queries (see prisma/schema.prisma)
// 2. Add validation — what happens if transportRequired is missing?
// 3. How would you validate the NHS number format and check digit?
// 4. Should patients be nested under wards? /api/v1/wards/:id/patients?
// 5. What authentication/authorisation should protect patient data? (RBAC?)

export const patientsRouter: IRouter = Router();

const VALID_STATUSES: DischargeStatusValue[] = ['READY', 'NOT_READY', 'DISCHARGED'];

function wardName(wardId: string): string {
  return stubWards.find((w) => w.id === wardId)?.name ?? wardId;
}

function toPatientResponse(patient: (typeof stubPatients)[0]) {
  const discharge = dischargeStatuses.get(patient.id);
  return {
    id: patient.id,
    name: `${patient.firstName} ${patient.lastName}`,
    nhsNumber: patient.nhsNumber,
    wardId: patient.wardId,
    ward: wardName(patient.wardId),
    dateOfBirth: patient.dateOfBirth.toISOString(),
    admittedAt: patient.admittedAt.toISOString(),
    dischargedAt: patient.dischargedAt?.toISOString() ?? null,
    dischargeStatus: discharge?.status ?? null,
    transportRequired: discharge?.transportRequired ?? false,
    readySince: discharge?.readySince?.toISOString() ?? null,
  };
}

patientsRouter.get('/', (_req, res) => {
  const data = stubPatients.map(toPatientResponse);
  res.json({ data, total: data.length });
});

patientsRouter.get('/:id', (req, res, next) => {
  const patient = stubPatients.find((p) => p.id === req.params['id']);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }
  res.json({ data: toPatientResponse(patient) });
});

patientsRouter.post('/:id/discharge', (req, res, next) => {
  const patient = stubPatients.find((p) => p.id === req.params['id']);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }

  const { status, transportRequired } = req.body as {
    status: DischargeStatusValue;
    transportRequired: boolean;
  };

  if (!VALID_STATUSES.includes(status)) {
    const err = Object.assign(new Error(`status must be one of: ${VALID_STATUSES.join(', ')}`), {
      statusCode: 400,
    });
    return next(err);
  }

  const existing = dischargeStatuses.get(patient.id);
  const record = {
    patientId: patient.id,
    status,
    transportRequired: Boolean(transportRequired),
    readySince:
      status === 'READY' && existing?.status !== 'READY'
        ? new Date()
        : (existing?.readySince ?? null),
    updatedAt: new Date(),
  };

  dischargeStatuses.set(patient.id, record);

  res.json({
    data: {
      ...record,
      readySince: record.readySince?.toISOString() ?? null,
      updatedAt: record.updatedAt.toISOString(),
    },
  });
});

patientsRouter.post('/:id/notes', (req, res, next) => {
  const patient = stubPatients.find((p) => p.id === req.params['id']);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }

  const { note, type = 'GENERAL' } = req.body as { note: string; type?: string };

  if (!note || typeof note !== 'string') {
    const err = Object.assign(new Error('note is required'), { statusCode: 400 });
    return next(err);
  }

  const newNote: DischargeNoteRecord = {
    id: `note-${Date.now()}`,
    patientId: patient.id,
    note,
    type,
    createdAt: new Date(),
  };

  const existing = dischargeNotes.get(patient.id) ?? [];
  existing.push(newNote);
  dischargeNotes.set(patient.id, existing);

  res.status(201).json({
    data: { ...newNote, createdAt: newNote.createdAt.toISOString() },
  });
});

patientsRouter.get('/:id/notes', (req, res, next) => {
  const patient = stubPatients.find((p) => p.id === req.params['id']);
  if (!patient) {
    const err = Object.assign(new Error(`Patient ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }

  const notes = dischargeNotes.get(patient.id) ?? [];
  res.json({
    data: notes.map((n) => ({ ...n, createdAt: n.createdAt.toISOString() })),
    total: notes.length,
  });
});
