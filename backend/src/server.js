import "./config/loadEnv.js";
import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";

const bootstrap = async () => {
  await connectDatabase();
  const port = Number(process.env.PORT) || 5000;
  app.listen(port, () => {
    console.log(`API server running on ${port}`);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start API server", error);
  process.exit(1);
});
