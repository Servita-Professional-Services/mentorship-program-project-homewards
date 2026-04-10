import express, { type Express } from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health';
import { wardsRouter } from './routes/wards';
import { patientsRouter } from './routes/patients';
import { escalationsRouter } from './routes/escalations';

// TODO [CHALLENGE: Architecture] - This is a single Express app.
// How would you split this into microservices? What would the trade-offs be?
// What patterns (BFF, API Gateway) might apply to a virtual wards platform?

export function createApp(): Express {
  const app = express();

  app.use(corsMiddleware);
  app.use(express.json());

  app.get('/', (_req, res) => res.json({ ok: true }));
  app.use('/health', healthRouter);
  app.use('/api/v1/wards', wardsRouter);
  app.use('/api/v1/patients', patientsRouter);
  app.use('/api/v1/escalations', escalationsRouter);

  // Error handling must be registered last
  app.use(errorHandler);

  return app;
}
