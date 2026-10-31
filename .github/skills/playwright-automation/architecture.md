# Framework Architecture

## Current project shape

This repository is a Playwright Test + TypeScript UI automation project for OrangeHRM. Inspect the live files before relying on this inventory; the project may evolve.

- `tests/auth/`: successful-login, invalid-credential, and required-field scenarios.
- `tests/employee/`: employee create/update/delete lifecycle and restricted-role navigation visibility.
- `pages/`: `LoginPage` and `EmployeeManagementPage` page objects.
- `utils/`: unique employee test-data generation.
- `.env.example` and `.env`: shared credentials; `.env` is local and must remain untracked.
- `.env.dev`, `.env.demo`, `.env.prod`: environment labels and base URLs. They currently point to the public demo URL.
- `playwright.config.ts`: environment metadata, HTML reporter, browser projects, timeouts, and failure artifacts.
- `.github/workflows/playwright.yml`: GitHub Actions execution, secret/variable wiring, browser installation, and artifact upload.

The package scripts provide generic and dev/demo/prod test commands, tag filters, report opening, and TypeScript checking. Read `package.json` and the configuration directly before choosing a command or asserting supported behavior.

## Architectural boundaries

- Keep test intent and business assertions in specs; keep page interactions and locators in focused page objects.
- Keep generated test data in utilities. Prefer Playwright fixtures and built-in assertions over custom wrappers.
- Reuse existing helpers, dependencies, environment handling, and reporting. Add abstractions only when a concrete repeated need justifies them.
- Maintain test isolation. Use unique employee identifiers and delete only records created by the test.
- Use environment variables for URLs and credentials. Do not hard-code or disclose credentials.

## Scope and trust

Implement only requested and verified OrangeHRM workflows. Do not assume modules, roles, APIs, or permissions exist.

The current role scenario verifies only that PIM navigation is hidden for a configured restricted account. It does not prove direct-route or backend authorization. Stronger authorization claims require a dedicated environment and explicit access-denial checks.

The public demo is shared and may be slow, rate-limited, or reset. Avoid unnecessary destructive operations and do not treat demo data as persistent.

## Definition of done

Changes follow project conventions, address the requested behavior without unrelated restructuring, and are validated as far as the configured environment allows. Report unverified, skipped, blocked, and failed behavior accurately.