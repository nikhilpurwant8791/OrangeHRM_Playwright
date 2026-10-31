# Validation and Delivery

## Choose checks

Inspect `package.json`, `playwright.config.ts`, environment profiles, and CI workflow first. Run the smallest relevant check using existing tooling; do not install dependencies or add scripts unless a real requirement warrants it.

Available package scripts currently include:

- `npm.cmd run typecheck`
- `npm.cmd run test:dev`, `npm.cmd run test:demo`, or `npm.cmd run test:prod`
- Add `-- --headed`, `-- --ui`, a spec path, or Playwright options after the selected environment script as needed.
- `npm.cmd run test:smoke`, `npm.cmd run test:regression`, `npm.cmd run test:lifecycle`, `npm.cmd run test:role`
- `npm.cmd run report`

In PowerShell on Windows, use the `.cmd` shim if `npm.ps1` or `npx.ps1` is blocked by execution policy. The environment profiles currently share the same public demo URL; their environment labels do not imply distinct deployments. Inspect the profile contents before claiming which target is under test.

Check which browser projects are configured and installed. CI currently installs Chromium; do not assume other configured browsers are available in CI.

## Diagnose failures

For a failure, inspect the actual error, screenshot, video, trace, and relevant DOM or console/network evidence when available. Classify it as application behavior, selector, test data, environment, timing, or infrastructure. Make a root-cause fix only when requested and justified.

Do not weaken assertions, change `waitUntil` or readiness checks merely to hide incomplete rendering, increase timeouts without evidence, or add arbitrary sleeps. A navigation commit is not proof the single-page application rendered; retain a meaningful UI readiness assertion.

## Report outcomes accurately

Separate changes made from checks executed. State pass, fail, skip, blocked, and not-run outcomes independently. Missing credentials can skip lifecycle/role tests; never report skipped tests as passed. If credentials, browser installation, network access, or demo availability block validation, name the specific limitation.

Delivery summary: files changed, behavior addressed, commands actually run, outcomes, and known limitations. Do not commit, push, or perform destructive actions without explicit authorization.