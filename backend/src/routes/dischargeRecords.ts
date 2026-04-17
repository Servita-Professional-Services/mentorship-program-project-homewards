import { Router, type IRouter } from 'express';
import { PrismaClient } from '@prisma/client';

// TODO [CHALLENGE: Architecture] - Move PrismaClient to a shared singleton (e.g. src/db.ts)
// Instantiating PrismaClient per-module works for a single process but wastes connections.
const prisma = new PrismaClient();

export const dischargeRecordsRouter: IRouter = Router();
export const dischargeRecordsListRouter: IRouter = Router();

interface MedicationRow {
  id: string;
  medicationName: string;
  amount: number;
  measurement: string;
  dischargeRecordId: string;
}

interface DischargeRecordWithMeds {
  id: string;
  patientId: string;
  dateOfBloodwork: Date;
  supportPlanNeeded: boolean;
  dischargeReason: string;
  preferredDateOfDischarge: Date;
  createdAt: Date;
  updatedAt: Date;
  medicationRecords: MedicationRow[];
}

function toResponse(record: DischargeRecordWithMeds) {
  return {
    id: record.id,
    patientId: record.patientId,
    dateOfBloodwork: record.dateOfBloodwork.toISOString(),
    supportPlanNeeded: record.supportPlanNeeded,
    dischargeReason: record.dischargeReason,
    preferredDateOfDischarge: record.preferredDateOfDischarge.toISOString(),
    medicationRecords: record.medicationRecords.map(({ dischargeRecordId: _drId, ...med }) => med),
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

// GET /api/v1/discharge-coordination/records?wardId=&startDate=&endDate=
dischargeRecordsListRouter.get('/records', async (req, res, next) => {
  try {
    const { wardId, startDate, endDate } = req.query as {
      wardId?: string;
      startDate?: string;
      endDate?: string;
    };

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if ((startDate && isNaN(start!.getTime())) || (endDate && isNaN(end!.getTime()))) {
      return next(
        Object.assign(new Error('startDate and endDate must be valid ISO 8601 dates'), {
          statusCode: 400,
        }),
      );
    }

    const records = await prisma.dischargeRecord.findMany({
      where: {
        ...(wardId ? { patient: { wardId } } : {}),
        preferredDateOfDischarge: {
          ...(start ? { gte: start } : {}),
          ...(end ? { lte: end } : {}),
        },
      },
      include: {
        patient: {
          select: { firstName: true, lastName: true, nhsNumber: true, wardId: true },
        },
      },
      orderBy: { preferredDateOfDischarge: 'asc' },
    });

    const data = records.map((r) => ({
      id: r.id,
      date: r.preferredDateOfDischarge.toISOString(),
      patientId: r.patientId,
      patientName: `${r.patient.firstName} ${r.patient.lastName}`,
      nhsNumber: r.patient.nhsNumber,
      wardId: r.patient.wardId,
      preferredDateOfDischarge: r.preferredDateOfDischarge.toISOString(),
    }));

    res.json({ data, total: data.length });
  } catch (err) {
    next(err);
  }
});

// GET /api/v1/patients/:id/discharge-records
dischargeRecordsRouter.get('/:id/discharge-records', async (req, res, next) => {
  try {
    const patientId = req.params['id'];

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return next(Object.assign(new Error(`Patient ${patientId} not found`), { statusCode: 404 }));
    }

    const records = await prisma.dischargeRecord.findMany({
      where: { patientId },
      include: { medicationRecords: true },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ data: records.map(toResponse), total: records.length });
  } catch (err) {
    next(err);
  }
});

// POST /api/v1/patients/:id/discharge-records
dischargeRecordsRouter.post('/:id/discharge-records', async (req, res, next) => {
  try {
    const patientId = req.params['id'];

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) {
      return next(Object.assign(new Error(`Patient ${patientId} not found`), { statusCode: 404 }));
    }

    const {
      dateOfBloodwork,
      supportPlanNeeded,
      dischargeReason,
      preferredDateOfDischarge,
      medicationRecords = [],
    } = req.body as {
      dateOfBloodwork: string;
      supportPlanNeeded: boolean;
      dischargeReason: string;
      preferredDateOfDischarge: string;
      medicationRecords?: Array<{ medicationName: string; amount: number; measurement: string }>;
    };

    if (
      !dateOfBloodwork ||
      supportPlanNeeded === undefined ||
      !dischargeReason ||
      !preferredDateOfDischarge
    ) {
      return next(
        Object.assign(
          new Error(
            'dateOfBloodwork, supportPlanNeeded, dischargeReason, and preferredDateOfDischarge are required',
          ),
          { statusCode: 400 },
        ),
      );
    }

    const record = await prisma.dischargeRecord.create({
      data: {
        patientId,
        dateOfBloodwork: new Date(dateOfBloodwork),
        supportPlanNeeded: Boolean(supportPlanNeeded),
        dischargeReason,
        preferredDateOfDischarge: new Date(preferredDateOfDischarge),
        medicationRecords: {
          create: medicationRecords.map((m) => ({
            medicationName: m.medicationName,
            amount: m.amount,
            measurement: m.measurement,
          })),
        },
      },
      include: { medicationRecords: true },
    });

    res.status(201).json({ data: toResponse(record) });
  } catch (err) {
    next(err);
  }
});
