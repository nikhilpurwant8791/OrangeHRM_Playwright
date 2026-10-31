import { expect, type Locator, type Page } from '@playwright/test';

export class LogoutPage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly last_logout: Locator;
  readonly loginHeading: Locator;
  readonly failed_logout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator('.oxd-userdropdown-name');
    this.last_logout = page.locator('.oxd-dropdown-menu li a').last();
    this.loginHeading = page.locator('.orangehrm-login-title');
    this.failed_logout = page.locator('.oxd-dropdown-menu li a').first();
  }

  async logout(): Promise<void> {
       await this.dropdown.click();
      await this.last_logout.click();
      await expect(this.loginHeading).toContainText('Login');
  }

  async failedlogout(): Promise<void> {
       await this.dropdown.click();
      await this.failed_logout.click();
      await expect(this.loginHeading).toContainText('Login');
  }
}
