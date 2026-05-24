import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const logDirectory = path.resolve(currentDir, "../../logs");
const securityLogFile = path.join(logDirectory, "security.log");

const appendLog = async (line) => {
  await fs.mkdir(logDirectory, { recursive: true });
  await fs.appendFile(securityLogFile, `${line}\n`, "utf8");
};

export const logSecurityEvent = async (event, details = {}) => {
  const entry = JSON.stringify({
    timestamp: new Date().toISOString(),
    event,
    ...details,
  });

  if (process.env.NODE_ENV !== "test") {
    try {
      await appendLog(entry);
    } catch (_error) {
      // Logging must never block the request path.
    }
  }

  console.warn(`[security] ${event}`, details);
};