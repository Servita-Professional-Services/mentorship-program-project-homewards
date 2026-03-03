import type { Request, Response, NextFunction } from 'express';

// TODO [CHALLENGE: Reliability] - This is a basic error handler.
// What would a production error handler need?
// Consider: structured logging, not leaking stack traces in prod, alerting

export interface ApiError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const status = err.statusCode ?? 500;
  const message = status === 500 ? 'Internal Server Error' : err.message;

  console.error(`[error] ${status} - ${err.message}`);

  res.status(status).json({
    error: { status, message },
  });
}
