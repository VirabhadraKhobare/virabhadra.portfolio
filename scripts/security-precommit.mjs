import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const args = process.argv.slice(2).filter((value) => !value.startsWith('--'));
const isCi = process.argv.includes('--ci');

const secretPatterns = [
  /BEGIN (RSA|EC|OPENSSH) PRIVATE KEY/i,
  /AKIA[0-9A-Z]{16}/,
  /gh[pousr]_[A-Za-z0-9_]{20,}/i,
  /xox[baprs]-[A-Za-z0-9-]{10,}/i,
  /eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/,
  /(JWT_SECRET|SMTP_PASS|SMTP_USER|MONGODB_URI|GITHUB_TOKEN)\s*[:=]\s*['"][^'"]{8,}['"]/i,
];

const suspiciousFiles = [];

let filesToScan = args;

if (isCi && filesToScan.length === 0) {
  filesToScan = execSync('git ls-files', { encoding: 'utf8' })
    .split(/\r?\n/)
    .filter(Boolean)
    .filter((filePath) => !filePath.startsWith('node_modules/'));
}

for (const filePath of filesToScan) {
  const normalizedPath = filePath.replace(/\\/g, '/');

  if (/\.env($|\.)/.test(normalizedPath) && !normalizedPath.endsWith('.env.example')) {
    suspiciousFiles.push(`${filePath} (environment file)`);
    continue;
  }

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    continue;
  }

  const contents = fs.readFileSync(filePath, 'utf8');

  if (secretPatterns.some((pattern) => pattern.test(contents))) {
    suspiciousFiles.push(filePath);
  }
}

if (suspiciousFiles.length > 0) {
  console.error('Potential secrets detected in staged files:');
  for (const file of suspiciousFiles) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

process.exit(0);