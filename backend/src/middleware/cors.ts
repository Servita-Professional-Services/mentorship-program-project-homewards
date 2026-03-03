import cors from 'cors';

// TODO [CHALLENGE: Security] - In production, this should be locked to specific origins.
// How would you manage CORS origins across environments (dev/staging/prod)?

export const corsMiddleware = cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') ?? ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
