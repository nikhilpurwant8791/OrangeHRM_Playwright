import { getEnvironment, test, expect } from '../../fixtures/test';
import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage';
import { LoginPage } from '../../pages/LoginPage';
import { createEmployeeTestData } from '../../utils/employeeTestData';
import { LogoutPage } from '../../pages/LogoutPage';

test('Create ESS user @regression @lifecycle', async ({ page, accounts }) => {
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
  await loginPage.goto();
  await loginPage.login(adminAccount.username, adminAccount.password);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toBeVisible();

  await employeePage.openAdminClickAdd();
  // await employeePage.createEmployeeFromAdminPage(employee);
  const userNamePassword = await employeePage.createEmployeeFromAdminPage(employee);

  // Logout and login with the new ESS user
  const logoutPage = new LogoutPage(page);
  await logoutPage.logout();

  await loginPage.goto();
  await loginPage.login(userNamePassword, userNamePassword);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toHaveCount(0);

  // Logout and login back with the admin user to clean up
  await logoutPage.logout();

  await loginPage.goto();
  await loginPage.login(adminAccount.username, adminAccount.password);

  // Delete the ESS user created during the test 
  let deleted = await employeePage.deleteEmployeeIfPresentFromAdminPage(employee.firstName);
  expect(deleted).toBe(true);
});

test('Purposeful failure test case to capture screenshot and video', async ({ page, accounts }) => {
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
  await loginPage.goto();
  await loginPage.login(adminAccount.username, adminAccount.password);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toBeVisible();

  await employeePage.openAdminClickAdd();
  // await employeePage.createEmployeeFromAdminPage(employee);
  const userNamePassword = await employeePage.createEmployeeFromAdminPage(employee);

  // Logout and login with the new ESS user
  const logoutPage = new LogoutPage(page);
  await logoutPage.logout();

  await loginPage.goto();
  await loginPage.login(userNamePassword, userNamePassword);
  await loginPage.expectDashboard();
  await expect(employeePage.pimMenu).toHaveCount(0);

  // Logout and login back with the admin user to clean up
  await logoutPage.logout();

  await loginPage.goto();
  await loginPage.login(adminAccount.username, adminAccount.password);

  // Delete the ESS user created during the test 
  let deleted = await employeePage.deleteEmployeeIfPresentFromAdminPage(employee.firstName);
  expect(deleted).toBe(false); //negative test case to capture the screenrecording of failure as per fremework requirement.
});