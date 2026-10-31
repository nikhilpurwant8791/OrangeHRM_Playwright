# OrangeHRM Playwright Automation

Playwright + TypeScript UI automation for the public OrangeHRM demo application.

## Prerequisites

- Node.js 20 or newer
- npm
- Access to the target OrangeHRM environment

Test accounts are listed in `fixtures/testAccounts.ts`; replace the example values with credentials for your authorized environments before running account-dependent tests. Do not use real production credentials in a committed source file.

## Install

```bash
npm install
npx playwright install chromium
```

## Configure the environment

`fixtures/testAccounts.ts` contains only account data, with `account1` and `account2` entries under each environment. `fixtures/test.ts` selects the environment using `ENV` (or `ORANGEHRM_ENV`) and provides its accounts to tests. The login and employee lifecycle tests use `account1` (Admin); the role-visibility test uses `account2` (ESS). Add another numbered account directly under the desired environment.

```text
ENV=demo
ORANGEHRM_BASE_URL=https://opensource-demo.orangehrmlive.com
```

The tracked `.env.dev`, `.env.demo`, and `.env.prod` profiles select which account set is used and currently all point to the public OrangeHRM demo URL. The selected label and URL are recorded in Playwright run metadata. Replace example account values with authorized credentials; configure the ESS account as a non-production account without PIM access for the role-visibility check.

The employee lifecycle test creates, updates, and deletes data, so it is skipped when `ENV=prod` (or `ORANGEHRM_ENV=prod`). Use a dedicated non-production tenant for state-changing tests.

## Run tests

`ENV` selects the account environment. Headless mode is the default; add `--headed` to show the browser. Add `--ui` to open Playwright UI Mode and select tests interactively.

### Bash, macOS, or Linux

```bash
# Dev
ENV=dev npx playwright test
ENV=dev npx playwright test --headed
ENV=dev npx playwright test --ui

# Demo
ENV=demo npx playwright test
ENV=demo npx playwright test --headed
ENV=demo npx playwright test --ui

# Prod
ENV=prod npx playwright test
ENV=prod npx playwright test --headed
ENV=prod npx playwright test --ui
```

### Windows PowerShell

Use `npx.cmd` in PowerShell, which avoids script-execution-policy errors from the `npx.ps1` shim:

```powershell
# Dev
$env:ENV="dev"; npx.cmd playwright test
$env:ENV="dev"; npx.cmd playwright test --headed
$env:ENV="dev"; npx.cmd playwright test --ui

# Demo
$env:ENV="demo"; npx.cmd playwright test
$env:ENV="demo"; npx.cmd playwright test --headed
$env:ENV="demo"; npx.cmd playwright test --ui

# Prod
$env:ENV="prod"; npx.cmd playwright test
$env:ENV="prod"; npx.cmd playwright test --headed
$env:ENV="prod"; npx.cmd playwright test --ui
```

In PowerShell, `$env:ENV` remains set for the current terminal session; clear it with `Remove-Item Env:ENV`.

The equivalent npm profile scripts are also available:

| Environment | Headless | Headed | Playwright UI Mode |
|---|---|---|---|
| Dev | `npm.cmd run test:dev` | `npm.cmd run test:dev -- --headed` | `npm.cmd run test:dev -- --ui` |
| Demo | `npm.cmd run test:demo` | `npm.cmd run test:demo -- --headed` | `npm.cmd run test:demo -- --ui` |
| Prod | `npm.cmd run test:prod` | `npm.cmd run test:prod -- --headed` | `npm.cmd run test:prod -- --ui` |

To run a specific spec in any environment, add its path after the mode option:

```powershell
npm.cmd run test:dev -- tests\employee\employee-lifecycle.spec.ts
npm.cmd run test:demo -- --headed tests\employee\employee-lifecycle.spec.ts
npm.cmd run test:prod -- --ui
```

For Command Prompt, macOS, or Linux, use `npm` rather than `npm.cmd`; use forward slashes in test paths.

The generic commands below use the default `.env` URL and `ENV` (falling back to `ORANGEHRM_ENV`, then `demo`):

```powershell
npm.cmd test
npm.cmd run test:headed
npm run typecheck
npm run report
npm run test:smoke
npm run test:regression
npm run test:lifecycle
npm run test:role
```

The Playwright project targets Chromium and runs single-worker against the shared demo URL and in CI to limit contention. Screenshots, videos, and traces are retained for failed tests, and the HTML report is written to `playwright-report/`. CI uploads both report and test-result artifacts. To point a profile at a separate deployment later, edit that profile's `ORANGEHRM_BASE_URL`.

For GitHub Actions, configure the repository variables `ORANGEHRM_BASE_URL` and `ORANGEHRM_ENV`. Account data is maintained in `fixtures/testAccounts.ts`.

Run only the login scenarios with:

```bash
npx playwright test tests/auth/login.spec.ts
```

The employee lifecycle creates a unique employee, checks the created record, updates its name, verifies the updated row, and deletes that record. Cleanup is armed before the create request is submitted so a delayed UI response does not leave a test-created employee behind. The role check verifies that a configured restricted account does not see the PIM navigation entry; this checks UI visibility, not server-side authorization. Configure a dedicated non-production role account for this check.

## Troubleshooting

- If an account-dependent test fails authentication, verify the credentials in the selected environment's `fixtures/testAccounts.ts` entry.
- If the demo rejects valid credentials, confirm the target URL and account in a browser; the public demo can be rate-limited or reset.
- If Chromium is missing, run `npx playwright install chromium`.
- For a failure, inspect the HTML report and the corresponding screenshot, video, and trace under `test-results/`.
- Do not add real passwords, authentication state, screenshots, traces, or reports to source control.
