import express from 'express';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { healthRouter } from './routes/health';
import { wardsRouter } from './routes/wards';
import { patientsRouter } from './routes/patients';

// TODO [CHALLENGE: Architecture] - This is a single Express app.
// How would you split this into microservices? What would the trade-offs be?
// What patterns (BFF, API Gateway) might apply to a virtual wards platform?

export function createApp() {
  const app = express();

  app.use(corsMiddleware);
  app.use(express.json());

  app.use('/health', healthRouter);
  app.use('/api/v1/wards', wardsRouter);
  app.use('/api/v1/patients', patientsRouter);

  // Error handling must be registered last
  app.use(errorHandler);

  return app;
}
