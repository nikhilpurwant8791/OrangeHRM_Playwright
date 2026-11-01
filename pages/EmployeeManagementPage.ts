import { expect, type Locator, type Page } from '@playwright/test';
import type { EmployeeTestData } from '../utils/employeeTestData';

export class EmployeeManagementPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly adminMenu: Locator;
  readonly addESSfromAdmin: Locator;
  readonly userRole: Locator;
  readonly status: Locator;
  readonly ESSuser: Locator;
  readonly enabledStatus: Locator;
  readonly adminPageEmployeeName: Locator;
  readonly adminPageEmployeeNameSelector: Locator;
  readonly adminPageAddPassword: Locator;
  readonly searchEmployeeOnAdminPage: Locator;
  readonly addEmployeeLink: Locator;
  readonly employeeListLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly usernameInput: Locator;
  readonly saveButton: Locator;
  readonly employeeRows: Locator;
  readonly noRecordsMessage: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM', exact: true });
    this.adminMenu = page.getByRole('link', { name: 'Admin', exact: true });
    this.addESSfromAdmin = page.locator('.orangehrm-header-container button');
    this.userRole = page.locator('.oxd-select-text-input').first();
    this.status = page.locator('.oxd-select-text-input').last();
    this.ESSuser = page.getByText('ESS', { exact: true });
    this.enabledStatus = page.getByText('Enabled', { exact: true });
    this.adminPageEmployeeName = page.locator('input[placeholder="Type for hints..."]');
    this.adminPageEmployeeNameSelector = page.locator('.oxd-autocomplete-option').first();
    this.adminPageAddPassword = page.locator("[type='password']");
    this.searchEmployeeOnAdminPage = page.locator('.oxd-input-group .oxd-input');
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee', exact: true });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List', exact: true });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');
    this.usernameInput = page.locator('//label[text()="Username"]/following::input[1]');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true }).first();
    this.employeeRows = page.locator('.oxd-table-card');
    this.noRecordsMessage = page.getByText('No Records Found', { exact: true }).first();
    this.deleteConfirmationButton = page.locator('.orangehrm-modal-footer .oxd-button').last();
    this.successToast = page.locator('.oxd-toast');
  }

  async openAddEmployee(): Promise<void> {
    await this.pimMenu.click();
    await this.addEmployeeLink.click();
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async openAdminClickAdd(): Promise<void> {
    await this.adminMenu.click();
    await this.addESSfromAdmin.click();
  }


  async createEmployee(employee: EmployeeTestData): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.employeeIdInput.fill(employee.employeeId);
    await this.saveButton.click();
  }

  async waitForEmployeeNameSelector(): Promise<void> {
    // await this.page.waitForSelector('.oxd-autocomplete-option', { timeout: 5000 });
    await this.page.locator('.oxd-autocomplete-option')
      .filter({ hasText: /searching/i })
      .waitFor({ state: 'hidden' });
  }

  async createEmployeeFromAdminPage(employee: EmployeeTestData): Promise<string> {

    let userNamePassword = employee.firstName;
    // Click the User Role dropdown
    await this.userRole.click();

    // Select ESS from the dropdown
    await this.ESSuser.click();

    // Click the Status dropdown
    await this.status.click();

    // Select Enabled from the dropdown
    await this.enabledStatus.click();

    // Enter employee name
    await this.adminPageEmployeeName.fill('John');

    // Wait until autocomplete suggestions appear
    await this.waitForEmployeeNameSelector();

    // Select the first suggestion
    await this.adminPageEmployeeNameSelector.click();

    //Add username
    await this.usernameInput.fill(userNamePassword);

    // Add password and confirm password
    await this.adminPageAddPassword.first().fill(userNamePassword);
    await this.adminPageAddPassword.last().fill(userNamePassword);

    // Click the Save button
    await this.saveButton.click();
    await expect(this.successToast).toContainText('Successfully Saved');

    // Verify added employee is present in the employee list
    await this.adminMenu.click();
    await this.searchAnyEmployeeOnAdminPage(employee.firstName);
    const row = this.employeeRows.filter({ hasText: employee.firstName }).first();
    await expect(row).toBeVisible();
    return userNamePassword;

  }

  async updateEmployee(firstName: string, lastName: string): Promise<void> {
    // await this.page.getByRole('button', { name: 'Edit', exact: true }).click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.saveButton.click();
  }

  async openEmployeeList(): Promise<void> {
    await this.pimMenu.click();
    await this.employeeListLink.click();
    await expect(this.page.getByRole('heading', { name: 'Employee Information' })).toBeVisible();
  }

  async searchEmployee(employeeId: string): Promise<void> {
    await this.employeeIdInput.fill(employeeId);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async deleteEmployeeIfPresent(employeeId: string): Promise<boolean> {
    await this.openEmployeeList();
    await this.searchEmployee(employeeId);

    const row = this.employeeRows.filter({ hasText: employeeId }).first();
    await expect(row.or(this.noRecordsMessage)).toBeVisible();
    if (!(await row.isVisible())) {
      return false;
    }

    await row.locator('button:has(.bi-trash)').click();
    await this.deleteConfirmationButton.waitFor({ state: 'visible' });
    await this.deleteConfirmationButton.click();
    await expect(this.successToast).toContainText(/Successfully Deleted/i);
    await this.searchEmployee(employeeId);
    await expect(this.noRecordsMessage).toBeVisible();
    return true;
  }

  async searchAnyEmployeeOnAdminPage(firstName: string): Promise<void> {
    await this.searchEmployeeOnAdminPage.fill(firstName);
    await this.page.getByRole('button', { name: 'Search', exact: true }).click();
  }

  async deleteEmployeeIfPresentFromAdminPage(firstName: string): Promise<boolean> {

    await this.adminMenu.click();
    await this.searchAnyEmployeeOnAdminPage(firstName);
    const row = this.employeeRows.filter({ hasText: firstName }).first();
    await expect(row.or(this.noRecordsMessage)).toBeVisible();
    if (!(await row.isVisible())) {
      return false;
    }

    await row.locator('button:has(.bi-trash)').click();
    await this.deleteConfirmationButton.waitFor({ state: 'visible' });
    await this.deleteConfirmationButton.click();
    await expect(this.successToast).toContainText(/Successfully Deleted/i);
    await this.searchAnyEmployeeOnAdminPage(firstName);
    await expect(this.noRecordsMessage).toBeVisible();

    return true;
  }
}
