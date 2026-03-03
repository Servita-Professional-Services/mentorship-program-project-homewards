import { createApp } from './app';

const PORT = process.env.PORT ?? 3001;

const app = createApp();

app.listen(PORT, () => {
  console.log(`[api] Virtual Wards API running on http://localhost:${PORT}`);
  console.log(`[api] Health check: http://localhost:${PORT}/health`);
});
