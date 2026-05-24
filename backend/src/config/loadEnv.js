import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenvSafe from "dotenv-safe";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const backendRoot = path.resolve(currentDir, "../..");

dotenvSafe.config({
	path: path.join(backendRoot, ".env"),
	example: path.join(backendRoot, ".env.example"),
	allowEmptyValues: true,
});
