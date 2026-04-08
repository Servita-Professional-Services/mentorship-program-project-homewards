import { Router, type IRouter } from 'express';
import { stubWards } from '../data/wards';

// TODO [CHALLENGE: API Design]
// 1. Replace stub data with real Prisma queries (see prisma/schema.prisma)
// 2. Add pagination — how would you implement cursor-based pagination?
// 3. Add filtering by specialty
// 4. What HTTP status codes should each scenario return?

export const wardsRouter: IRouter = Router();

wardsRouter.get('/', (_req, res) => {
  res.json({ data: stubWards, total: stubWards.length });
});

wardsRouter.get('/:id', (req, res, next) => {
  const ward = stubWards.find((w) => w.id === req.params['id']);
  if (!ward) {
    const err = Object.assign(new Error(`Ward ${req.params['id']} not found`), {
      statusCode: 404,
    });
    return next(err);
  }
  res.json({ data: ward });
});
