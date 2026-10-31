import { expect, type Locator, type Page } from '@playwright/test';
import type { EmployeeTestData } from '../utils/employeeTestData';

export class EmployeeManagementPage {
  readonly page: Page;
  readonly pimMenu: Locator;
  readonly addEmployeeLink: Locator;
  readonly employeeListLink: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;
  readonly employeeRows: Locator;
  readonly noRecordsMessage: Locator;
  readonly deleteConfirmationButton: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenu = page.getByRole('link', { name: 'PIM', exact: true });
    this.addEmployeeLink = page.getByRole('link', { name: 'Add Employee', exact: true });
    this.employeeListLink = page.getByRole('link', { name: 'Employee List', exact: true });
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page
      .locator('.oxd-input-group')
      .filter({ hasText: 'Employee Id' })
      .locator('input');
    this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
    this.employeeRows = page.locator('.oxd-table-card');
    this.noRecordsMessage = page.getByText('No Records Found', { exact: true }).first();
    this.deleteConfirmationButton = page.getByRole('button', { name: 'Yes, Delete', exact: true });
    this.successToast = page.locator('.oxd-toast');
  }

  async openAddEmployee(): Promise<void> {
    await this.pimMenu.click();
    await this.addEmployeeLink.click();
    await expect(this.page.getByRole('heading', { name: 'Add Employee' })).toBeVisible();
  }

  async createEmployee(employee: EmployeeTestData): Promise<void> {
    await this.firstNameInput.fill(employee.firstName);
    await this.lastNameInput.fill(employee.lastName);
    await this.employeeIdInput.fill(employee.employeeId);
    await this.saveButton.click();
  }

  async updateEmployee(firstName: string, lastName: string): Promise<void> {
    await this.page.getByRole('button', { name: 'Edit', exact: true }).click();
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
}
