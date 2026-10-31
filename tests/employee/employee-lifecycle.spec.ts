import { getEnvironment, test, expect } from '../../fixtures/test';
import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage';
import { LoginPage } from '../../pages/LoginPage';
import { createEmployeeTestData } from '../../utils/employeeTestData';

test('admin can create, update, and delete an employee @regression @lifecycle', async ({ page, accounts }) => {
  test.skip(
    getEnvironment() === 'prod',
    'Employee lifecycle mutations are disabled in the prod environment.',
  );

  const adminAccount = accounts.account1;
  test.skip(
    !adminAccount.username || !adminAccount.password,
    'Configure the selected environment admin account credentials.',
  );

  const loginPage = new LoginPage(page);
  const employeePage = new EmployeeManagementPage(page);
  const employee = createEmployeeTestData();
  const updatedFirstName = `${employee.firstName}Updated`;
  const updatedLastName = `${employee.lastName}Updated`;
  let primaryFailure: unknown;
  let employeeMayExist = false;
  let deleted = false;

  try {
    await loginPage.goto();
    await loginPage.login(adminAccount.username, adminAccount.password);
    await loginPage.expectDashboard();
    await expect(employeePage.pimMenu).toBeVisible();

    await employeePage.openAddEmployee();
    employeeMayExist = true;
    await employeePage.createEmployee(employee);
    await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();
    await expect(employeePage.firstNameInput).toHaveValue(employee.firstName);
    await expect(employeePage.lastNameInput).toHaveValue(employee.lastName);

    await employeePage.updateEmployee(updatedFirstName, updatedLastName);
    await expect(employeePage.successToast).toContainText(/Successfully Updated/i);
    await expect(employeePage.firstNameInput).toHaveValue(updatedFirstName);
    await expect(employeePage.lastNameInput).toHaveValue(updatedLastName);

    await employeePage.openEmployeeList();
    await employeePage.searchEmployee(employee.employeeId);
    await expect(employeePage.employeeRows.filter({ hasText: employee.employeeId })).toContainText(
      `${updatedFirstName} ${updatedLastName}`,
    );

    deleted = await employeePage.deleteEmployeeIfPresent(employee.employeeId);
    expect(deleted).toBe(true);
  } catch (error) {
    primaryFailure = error;
    throw error;
  } finally {
    if (employeeMayExist && !deleted) {
      try {
        await employeePage.deleteEmployeeIfPresent(employee.employeeId);
      } catch (cleanupError) {
        if (primaryFailure !== undefined) {
          throw new AggregateError(
            [primaryFailure, cleanupError],
            'Employee lifecycle failed and the created employee could not be cleaned up.',
          );
        }
        throw cleanupError;
      }
    }
  }
});
