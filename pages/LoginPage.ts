import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly loginHeading: Locator;
  readonly fieldErrors: Locator;
  readonly authenticationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
    this.loginHeading = page.locator('.orangehrm-login-title');
    this.fieldErrors = page.locator('.oxd-input-field-error-message');
    this.authenticationError = page
      .getByRole('alert')
      .filter({ hasText: /invalid|credential|attempt|captcha|retry|restricted/i })
      .first();
  }

  async goto(): Promise<void> {
  await this.page.goto('/web/index.php/auth/login', { waitUntil: 'networkidle' });
  await expect(this.loginHeading).toContainText('Login');
}

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index/);
    await expect(this.page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  }

  async expectInvalidLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/web\/index\.php\/auth\/login/);
    await expect(this.authenticationError).toBeVisible();
  }

  async expectRequiredFieldErrors(): Promise<void> {
    await expect(this.fieldErrors).toHaveCount(2);
    await expect(this.fieldErrors).toHaveText(['Required', 'Required']);
  }
}
