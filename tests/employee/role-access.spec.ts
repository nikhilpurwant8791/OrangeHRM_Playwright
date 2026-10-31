import { test, expect } from '../../fixtures/test';
import { LoginPage } from '../../pages/LoginPage';
import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage';

test('PIM navigation is hidden for a restricted employee role @regression @role', async ({ page, accounts }) => {
  const essAccount = accounts.account2;
  test.skip(
    !essAccount.username || !essAccount.password,
    'Configure the selected environment ESS account credentials for a role without PIM access.',
  );

  const loginPage = new LoginPage(page);
  const employeePage = new EmployeeManagementPage(page);

  await loginPage.goto();
  await loginPage.login(essAccount.username, essAccount.password);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toHaveCount(0);
});
