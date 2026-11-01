# OrangeHRM Playwright Automation

Playwright + TypeScript UI automation for OrangeHRM. This guide covers setup, environment selection, common test commands, reports, and the repository layout.

## Prerequisites

- Node.js 20 or newer
- npm
- Network access to the configured OrangeHRM environment

## Quick setup

From the repository root, install the locked dependencies and all browsers configured in Playwright:

```bash
npm ci
npx playwright install
```

On Linux CI agents, install browser system dependencies as well:

```bash
npx playwright install --with-deps
```

## Framework structure

```text
.
├── .github/
│   ├── skills/playwright-automation/  # Repository-specific automation guidance
│   └── workflows/playwright.yml      # GitHub Actions workflow
├── docs/
│   └── test-plan.md                  # Test plan
├── fixtures/
│   ├── test.ts                       # Environment-aware Playwright fixture
│   └── testAccounts.ts               # Account data by environment
├── pages/
│   ├── EmployeeManagementPage.ts     # Employee and Admin page interactions
│   ├── LoginPage.ts                  # Login actions and assertions
│   └── LogoutPage.ts                 # Logout actions
├── tests/
│   ├── auth/login.spec.ts            # Login, validation, and logout tests
│   └── employee/
│       ├── employee-lifecycle.spec.ts
│       └── role-access.spec.ts       # ESS account and restricted-navigation checks
├── utils/
│   └── employeeTestData.ts           # Unique employee test data
├── .env.example                      # Example environment variables
├── .env.dev                          # Dev profile
├── .env.demo                         # Demo profile
├── .env.prod                         # Prod profile
├── package.json                      # Commands and dependencies
├── package-lock.json                 # Locked dependency versions
├── playwright.config.ts              # Browser, reporter, and failure artifact config
└── tsconfig.json                     # TypeScript configuration
```

Tests contain scenario intent and assertions; page objects contain reusable page interactions; fixtures supply environment-specific accounts; utilities generate test data.

## Configure the target and accounts

`fixtures/testAccounts.ts` contains `account1`, `account2`, etc. for each environment. Current tests use `account1` as the Admin account. The role-access spec creates an ESS account during its test and validates that account's visible navigation.

Environment selection precedence is `ENV`, then `ORANGEHRM_ENV`, then `demo`. The `.env.dev`, `.env.demo`, and `.env.prod` profiles currently point to the public OrangeHRM demo URL. The profile names select account/configuration sets; they do not currently identify separate deployments. Configure `ORANGEHRM_BASE_URL` for the intended authorized target.

Account values are currently read from the checked-in TypeScript fixture; they are not loaded from a secret manager. Keep only non-sensitive test values in source. Do not commit real passwords. For CI, use a dedicated non-production tenant and inject credentials securely after adapting the fixture to read them from environment variables or another secret store.

The employee lifecycle creates, updates, and deletes records and is skipped for `prod`. The public demo is shared and may be reset or rate-limited; prefer a dedicated test tenant for state-changing tests.

## Run tests

Headless is the default. Commands below use npm scripts, which work in PowerShell, Command Prompt, macOS, and Linux.

### Run the complete suite by environment

| Environment | Command |
|---|---|
| Dev | `npm run test:dev` |
| Demo | `npm run test:demo` |
| Prod | `npm run test:prod` |

On Windows PowerShell, use `npm.cmd` if PowerShell blocks the `npm.ps1` shim:

```powershell
npm.cmd run test:dev
npm.cmd run test:demo
npm.cmd run test:prod
```

These profile scripts load `.env.dev`, `.env.demo`, or `.env.prod`. To run the default profile without a named environment, use `npm test`.

### Browser display and UI Mode

Append the Playwright option after `--`:

```powershell
# Headed browser
npm.cmd run test:demo -- --headed

# Playwright UI Mode
npm.cmd run test:demo -- --ui
```

Use the corresponding `test:dev` or `test:prod` script to select another profile. Direct environment-variable syntax is also available:

```powershell
$env:ENV="demo"; npx.cmd playwright test
$env:ENV="demo"; npx.cmd playwright test --headed
$env:ENV="demo"; npx.cmd playwright test --ui
Remove-Item Env:ENV
```

Bash, macOS, and Linux can use:

```bash
ENV=demo npx playwright test
ENV=demo npx playwright test --headed
ENV=demo npx playwright test --ui
```

### Run a spec, browser, or tag selection

```powershell
# Specific specs
npm.cmd run test:demo -- tests\auth\login.spec.ts
npm.cmd run test:demo -- tests\employee\employee-lifecycle.spec.ts

# One browser project
npm.cmd run test:demo -- --project=chromium

# Tag filters
npm.cmd run test:smoke
npm.cmd run test:regression
npm.cmd run test:lifecycle
npm.cmd run test:role
```

The `test:role` script selects tests tagged `@role`; currently, the role-access spec does not have that tag, so this command may find no tests. The suite also contains a test explicitly named “Purposeful failure test case to capture screenshot and video,” which intentionally asserts a negative result. It can cause the full suite to fail by design; do not treat a failing full-suite run as a regression until that test is removed, skipped, or separated from the normal CI suite.

## Type checking and reports

```powershell
# TypeScript validation
npm.cmd run typecheck

# Open the most recently generated HTML report
npm.cmd run report
```

Playwright targets Chromium, Firefox, and WebKit. Install all three with `npx playwright install`. The HTML report is generated in `playwright-report/`; failure screenshots, videos, and traces are written under `test-results/`.

The GitHub Actions workflow uploads these directories as build artifacts. They are generated outputs and generally should be archived by CI rather than committed. At present, the repository's `.gitignore` does not exclude `playwright-report/` or `test-results/`; review and untrack generated files if the repository should contain source only.

## CI

GitHub Actions is configured in `.github/workflows/playwright.yml` and runs on pushes and pull requests to `main` and `master`. It installs dependencies, installs Chromium, runs Playwright, and uploads the HTML report and test results. The Playwright config includes Chromium, Firefox, and WebKit, so install/CI browser configuration should be aligned if all three projects are expected to run in CI.

There is no `Jenkinsfile` in the repository. For Jenkins, use a Node.js 20+ Linux agent with the required Playwright browsers and system dependencies, run `npm ci`, `npm run typecheck`, then the intended test command, and archive `playwright-report/**` and `test-results/**` even when tests fail. Use Jenkins Credentials for real test accounts; the current fixture needs secret-variable support before that is safe.

## Troubleshooting

- If PowerShell blocks `npm` or `npx`, use `npm.cmd` or `npx.cmd`.
- If a browser is missing, run `npx playwright install`; on Linux CI, use `npx playwright install --with-deps`.
- If login fails, confirm that the selected profile, account values, and `ORANGEHRM_BASE_URL` match an authorized environment.
- For failed tests, inspect the HTML report and the associated screenshot, video, and trace in `test-results/`.
- Never commit real passwords, authentication state, or sensitive report artifacts.
