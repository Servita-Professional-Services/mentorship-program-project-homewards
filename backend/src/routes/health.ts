import { Router, type IRouter } from 'express';

export const healthRouter: IRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'homeward-api',
    version: '0.0.1',
  });
});
