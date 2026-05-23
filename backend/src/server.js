import "./config/loadEnv.js";
import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";

const bootstrap = async () => {
  await connectDatabase();
  const port = Number(process.env.PORT) || 5000;

  const server = app.listen(port, () => {
    console.log(`API server running on ${port}`);
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${port} is already in use. Stop the existing server process or set a different PORT in backend/.env.`,
      );
      process.exit(1);
    }

    console.error("Failed to start API server", error);
    process.exit(1);
  });
};

bootstrap().catch((error) => {
  console.error("Failed to start API server", error);
  process.exit(1);
});
