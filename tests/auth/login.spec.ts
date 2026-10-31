import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

const username = process.env.ORANGEHRM_USERNAME;
const password = process.env.ORANGEHRM_PASSWORD;

test.describe('OrangeHRM authentication', () => {
  test('successful login reaches the dashboard @smoke @regression', async ({ page }) => {
    // test.skip(!username || !password, 'Set ORANGEHRM_USERNAME and ORANGEHRM_PASSWORD in .env');

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username!, password!);
    await loginPage.expectDashboard();
  });

  test('invalid credentials keep the user on the login page @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('invalid-user-for-automation', 'invalid-password-for-automation');
    await loginPage.expectInvalidLogin();
  });

  test('empty username and password show required-field validation @regression', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.loginButton.click();
    await loginPage.expectRequiredFieldErrors();
    await expect(loginPage.loginHeading).toBeVisible();
  });
});
