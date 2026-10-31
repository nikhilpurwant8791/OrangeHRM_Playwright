import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage';

const restrictedUsername = process.env.ORANGEHRM_RESTRICTED_USERNAME;
const restrictedPassword = process.env.ORANGEHRM_RESTRICTED_PASSWORD;

test('PIM navigation is hidden for a restricted employee role @regression @role', async ({ page }) => {
  test.skip(
    !restrictedUsername || !restrictedPassword,
    'Set ORANGEHRM_RESTRICTED_USERNAME and ORANGEHRM_RESTRICTED_PASSWORD for a role without PIM access.',
  );

  const loginPage = new LoginPage(page);
  const employeePage = new EmployeeManagementPage(page);

  await loginPage.goto();
  await loginPage.login(restrictedUsername!, restrictedPassword!);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toHaveCount(0);
});
