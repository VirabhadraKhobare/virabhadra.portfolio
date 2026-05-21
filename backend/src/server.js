import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';

const bootstrap = async () => {
  await connectDatabase();
  app.listen(env.port, () => {
    console.log(`API server running on ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start API server', error);
  process.exit(1);
});
