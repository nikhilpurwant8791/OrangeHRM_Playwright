import { test, expect } from '../../fixtures/test';
import { LoginPage } from '../../pages/LoginPage';
import { LogoutPage } from '../../pages/LogoutPage';

type Account = {
  username: string;
  password: string;
  role: string;
};

test.describe('OrangeHRM authentication', () => {
  let loginPage!: LoginPage;
  let logoutPage!: LogoutPage;
  let adminAccount!: Account;

  test.beforeEach(async ({ page, accounts }) => {
    loginPage = new LoginPage(page);
    logoutPage = new LogoutPage(page);
    adminAccount = accounts.account1;
  });

  test('successful login reaches the dashboard @smoke @regression', async ({ page, accounts }) => {
    await loginPage.goto();
    await loginPage.login(adminAccount.username, adminAccount.password);
    await loginPage.expectDashboard();
    await logoutPage.logout();
  });

   test('Failed logout to capture error result  @smoke @regression', async ({ page, accounts }) => {
    await loginPage.goto();
    await loginPage.login(adminAccount.username, adminAccount.password);
    await loginPage.expectDashboard();
    await logoutPage.failedlogout();
  });

  test('invalid credentials keep the user on the login page @regression', async ({ page }) => {
    await loginPage.goto();
    await loginPage.login('invalid-user-for-automation', 'invalid-password-for-automation');
    await loginPage.expectInvalidLogin();
  });

  test('empty username and password show required-field validation @regression', async ({ page }) => {
    await loginPage.goto();
    await loginPage.loginButton.click();
    await loginPage.expectRequiredFieldErrors();
    await expect(loginPage.loginHeading).toContainText('Login');
  });
});
