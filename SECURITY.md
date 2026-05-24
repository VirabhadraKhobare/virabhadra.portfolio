# Security Policy

## Supported Versions

Security fixes should be applied to the latest `main` branch and the current production deployment.

## Reporting a Vulnerability

Do not open a public issue for sensitive security bugs.

Report issues privately to the repository maintainer and include:

- A short summary of the issue
- Affected route, component, or package
- Steps to reproduce
- Expected impact

## Handling Secrets

- Never commit `.env` files or production credentials.
- Rotate JWT, SMTP, and database secrets immediately after any suspected exposure.
- Revoke any leaked GitHub tokens, API keys, or cloud credentials.