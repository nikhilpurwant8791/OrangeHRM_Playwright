# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employee\role-access.spec.ts >> Purposeful failure test case to capture screenshot and video
- Location: tests\employee\role-access.spec.ts:51:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: false
Received: true
```

# Page snapshot

```yaml
- generic [ref=f11e2]:
  - generic [ref=f11e3]:
    - generic:
      - complementary [ref=f11e4]:
        - navigation "Sidepanel" [ref=f11e5]:
          - generic [ref=f11e6]:
            - link [ref=f11e7] [cursor=pointer]:
              - /url: https://www.orangehrm.com/
              - img "client brand banner" [ref=f11e9]
            - text: 
          - generic [ref=f11e10]:
            - generic [ref=f11e11]:
              - generic [ref=f11e12]:
                - textbox "Search" [ref=f11e15]
                - button "" [ref=f11e16] [cursor=pointer]
              - separator [ref=f11e18]
            - list [ref=f11e19]:
              - listitem [ref=f11e20]:
                - link "Admin" [ref=f11e21] [cursor=pointer]:
                  - /url: /web/index.php/admin/viewAdminModule
              - listitem [ref=f11e25]:
                - link "PIM" [ref=f11e26] [cursor=pointer]:
                  - /url: /web/index.php/pim/viewPimModule
              - listitem [ref=f11e41]:
                - link "Leave" [ref=f11e42] [cursor=pointer]:
                  - /url: /web/index.php/leave/viewLeaveModule
              - listitem [ref=f11e46]:
                - link "Time" [ref=f11e47] [cursor=pointer]:
                  - /url: /web/index.php/time/viewTimeModule
              - listitem [ref=f11e54]:
                - link "Recruitment" [ref=f11e55] [cursor=pointer]:
                  - /url: /web/index.php/recruitment/viewRecruitmentModule
              - listitem [ref=f11e62]:
                - link "My Info" [ref=f11e63] [cursor=pointer]:
                  - /url: /web/index.php/pim/viewMyDetails
              - listitem [ref=f11e70]:
                - link "Performance" [ref=f11e71] [cursor=pointer]:
                  - /url: /web/index.php/performance/viewPerformanceModule
              - listitem [ref=f11e80]:
                - link "Dashboard" [ref=f11e81] [cursor=pointer]:
                  - /url: /web/index.php/dashboard/index
              - listitem [ref=f11e85]:
                - link "Directory" [ref=f11e86] [cursor=pointer]:
                  - /url: /web/index.php/directory/viewDirectory
              - listitem [ref=f11e90]:
                - link "Maintenance" [ref=f11e91] [cursor=pointer]:
                  - /url: /web/index.php/maintenance/viewMaintenanceModule
              - listitem [ref=f11e96]:
                - link "Claim" [ref=f11e97] [cursor=pointer]:
                  - /url: /web/index.php/claim/viewClaimModule
              - listitem [ref=f11e105]:
                - link "Buzz" [ref=f11e106] [cursor=pointer]:
                  - /url: /web/index.php/buzz/viewBuzz
      - banner [ref=f11e110]:
        - generic [ref=f11e111]:
          - generic [ref=f11e112]:
            - text: 
            - generic [ref=f11e113]:
              - heading "Admin" [level=6] [ref=f11e114]
              - heading "/ User Management" [level=6] [ref=f11e115]
          - link [ref=f11e117]:
            - /url: https://orangehrm.com/open-source/upgrade-to-advanced
            - button "Upgrade" [ref=f11e118] [cursor=pointer]
          - list [ref=f11e124]:
            - listitem [ref=f11e125]:
              - generic [ref=f11e126] [cursor=pointer]:
                - img "profile picture" [ref=f11e127]
                - paragraph [ref=f11e128]: manda user
                - generic [ref=f11e129]: 
        - navigation "Topbar Menu" [ref=f11e131]:
          - list [ref=f11e132]:
            - listitem [ref=f11e133] [cursor=pointer]:
              - generic [ref=f11e134]:
                - text: User Management
                - generic [ref=f11e135]: 
            - listitem [ref=f11e136] [cursor=pointer]:
              - generic [ref=f11e137]:
                - text: Job
                - generic [ref=f11e138]: 
            - listitem [ref=f11e139] [cursor=pointer]:
              - generic [ref=f11e140]:
                - text: Organization
                - generic [ref=f11e141]: 
            - listitem [ref=f11e142] [cursor=pointer]:
              - generic [ref=f11e143]:
                - text: Qualifications
                - generic [ref=f11e144]: 
            - listitem [ref=f11e145] [cursor=pointer]:
              - link "Nationalities" [ref=f11e146]:
                - /url: "#"
            - listitem [ref=f11e147] [cursor=pointer]:
              - link "Corporate Branding" [ref=f11e148]:
                - /url: "#"
            - listitem [ref=f11e149] [cursor=pointer]:
              - generic [ref=f11e150]:
                - text: Configuration
                - generic [ref=f11e151]: 
            - button "" [ref=f11e153] [cursor=pointer]
    - generic [ref=f11e155]:
      - generic [ref=f11e157]:
        - generic [ref=f11e158]:
          - generic [ref=f11e159]:
            - heading "System Users" [level=5] [ref=f11e161]
            - button "" [ref=f11e164] [cursor=pointer]
          - separator [ref=f11e166]
          - generic [ref=f11e168]:
            - generic [ref=f11e170]:
              - generic [ref=f11e172]:
                - generic [ref=f11e173]: Username
                - textbox [ref=f11e176]: QA5eaf0ffb
              - generic [ref=f11e178]:
                - generic [ref=f11e179]: User Role
                - generic [ref=f11e183] [cursor=pointer]:
                  - generic [ref=f11e184]: "-- Select --"
                  - generic [ref=f11e185]: 
              - generic [ref=f11e188]:
                - generic [ref=f11e189]: Employee Name
                - textbox "Type for hints..." [ref=f11e194]
              - generic [ref=f11e196]:
                - generic [ref=f11e197]: Status
                - generic [ref=f11e201] [cursor=pointer]:
                  - generic [ref=f11e202]: "-- Select --"
                  - generic [ref=f11e203]: 
            - separator [ref=f11e205]
            - generic [ref=f11e206]:
              - button "Reset" [ref=f11e207] [cursor=pointer]
              - button "Search" [active] [ref=f11e208] [cursor=pointer]
        - generic [ref=f11e209]:
          - button " Add" [ref=f11e211] [cursor=pointer]:
            - generic [ref=f11e212]: 
            - text: Add
          - generic [ref=f11e213]:
            - separator [ref=f11e214]
            - generic [ref=f11e215]: No Records Found
          - table [ref=f11e218]:
            - rowgroup [ref=f11e219]:
              - row [ref=f11e220]:
                - columnheader "" [ref=f11e221]:
                  - generic [ref=f11e223] [cursor=pointer]:
                    - checkbox "" [ref=f11e224]
                    - generic [ref=f11e225]: 
                - columnheader "Username " [ref=f11e227]:
                  - text: Username
                  - generic [ref=f11e228]:
                    - generic [ref=f11e229] [cursor=pointer]: 
                    - text:  
                - columnheader "User Role " [ref=f11e230]:
                  - text: User Role
                  - generic [ref=f11e231]:
                    - generic [ref=f11e232] [cursor=pointer]: 
                    - text:  
                - columnheader "Employee Name " [ref=f11e233]:
                  - text: Employee Name
                  - generic [ref=f11e234]:
                    - generic [ref=f11e235] [cursor=pointer]: 
                    - text:  
                - columnheader "Status " [ref=f11e236]:
                  - text: Status
                  - generic [ref=f11e237]:
                    - generic [ref=f11e238] [cursor=pointer]: 
                    - text:  
                - columnheader "Actions" [ref=f11e239]
            - rowgroup
      - generic [ref=f11e241]:
        - paragraph [ref=f11e242]: OrangeHRM OS 5.9
        - paragraph [ref=f11e243]:
          - text: © 2005 - 2026
          - link "OrangeHRM, Inc" [ref=f11e244] [cursor=pointer]:
            - /url: http://www.orangehrm.com
          - text: . All rights reserved.
  - generic [ref=f11e245]:
    - generic [ref=f11e246] [cursor=pointer]:
      - generic [ref=f11e247]:
        - generic [ref=f11e248]: 
        - generic [ref=f11e251]:
          - paragraph [ref=f11e252]: Info
          - paragraph [ref=f11e253]: No Records Found
      - button "×" [ref=f11e255]
    - generic [ref=f11e256] [cursor=pointer]:
      - generic [ref=f11e257]:
        - generic [ref=f11e258]: 
        - generic [ref=f11e261]:
          - paragraph [ref=f11e262]: Info
          - paragraph [ref=f11e263]: No Records Found
      - button "×" [ref=f11e265]
```

# Test source

```ts
  1  | import { getEnvironment, test, expect } from '../../fixtures/test';
  2  | import { EmployeeManagementPage } from '../../pages/EmployeeManagementPage';
  3  | import { LoginPage } from '../../pages/LoginPage';
  4  | import { createEmployeeTestData } from '../../utils/employeeTestData';
  5  | import { LogoutPage } from '../../pages/LogoutPage';
  6  | 
  7  | test('Create ESS user @regression @lifecycle', async ({ page, accounts }) => {
  8  |   test.skip(
  9  |     getEnvironment() === 'prod',
  10 |     'Employee lifecycle mutations are disabled in the prod environment.',
  11 |   );
  12 | 
  13 |   const adminAccount = accounts.account1;
  14 |   test.skip(
  15 |     !adminAccount.username || !adminAccount.password,
  16 |     'Configure the selected environment admin account credentials.',
  17 |   );
  18 | 
  19 |   const loginPage = new LoginPage(page);
  20 |   const employeePage = new EmployeeManagementPage(page);
  21 |   const employee = createEmployeeTestData();
  22 |   await loginPage.goto();
  23 |   await loginPage.login(adminAccount.username, adminAccount.password);
  24 |   await loginPage.expectDashboard();
  25 |   await expect(employeePage.pimMenu).toBeVisible();
  26 | 
  27 |   await employeePage.openAdminClickAdd();
  28 |   // await employeePage.createEmployeeFromAdminPage(employee);
  29 |   const userNamePassword = await employeePage.createEmployeeFromAdminPage(employee);
  30 | 
  31 |   // Logout and login with the new ESS user
  32 |    const logoutPage = new LogoutPage(page);
  33 |    await logoutPage.logout();
  34 | 
  35 |   await loginPage.goto();
  36 |   await loginPage.login(userNamePassword, userNamePassword);
  37 |   await loginPage.expectDashboard();
  38 |   await expect(employeePage.pimMenu).toHaveCount(0);
  39 | 
  40 |   // Logout and login back with the admin user to clean up
  41 |   await logoutPage.logout();
  42 | 
  43 |   await loginPage.goto();
  44 |   await loginPage.login(adminAccount.username, adminAccount.password);
  45 | 
  46 |   // Delete the ESS user created during the test 
  47 |   let deleted = await employeePage.deleteEmployeeIfPresentFromAdminPage(employee.firstName);
  48 |     expect(deleted).toBe(true);
  49 | });
  50 | 
  51 | test('Purposeful failure test case to capture screenshot and video', async ({ page, accounts }) => {
  52 |   test.skip(
  53 |     getEnvironment() === 'prod',
  54 |     'Employee lifecycle mutations are disabled in the prod environment.',
  55 |   );
  56 | 
  57 |   const adminAccount = accounts.account1;
  58 |   test.skip(
  59 |     !adminAccount.username || !adminAccount.password,
  60 |     'Configure the selected environment admin account credentials.',
  61 |   );
  62 | 
  63 |   const loginPage = new LoginPage(page);
  64 |   const employeePage = new EmployeeManagementPage(page);
  65 |   const employee = createEmployeeTestData();
  66 |   await loginPage.goto();
  67 |   await loginPage.login(adminAccount.username, adminAccount.password);
  68 |   await loginPage.expectDashboard();
  69 |   await expect(employeePage.pimMenu).toBeVisible();
  70 | 
  71 |   await employeePage.openAdminClickAdd();
  72 |   // await employeePage.createEmployeeFromAdminPage(employee);
  73 |   const userNamePassword = await employeePage.createEmployeeFromAdminPage(employee);
  74 | 
  75 |   // Logout and login with the new ESS user
  76 |    const logoutPage = new LogoutPage(page);
  77 |    await logoutPage.logout();
  78 | 
  79 |   await loginPage.goto();
  80 |   await loginPage.login(userNamePassword, userNamePassword);
  81 |   await loginPage.expectDashboard();
  82 |   await expect(employeePage.pimMenu).toHaveCount(0);
  83 | 
  84 |   // Logout and login back with the admin user to clean up
  85 |   await logoutPage.logout();
  86 | 
  87 |   await loginPage.goto();
  88 |   await loginPage.login(adminAccount.username, adminAccount.password);
  89 | 
  90 |   // Delete the ESS user created during the test 
  91 |   let deleted = await employeePage.deleteEmployeeIfPresentFromAdminPage(employee.firstName);
> 92 |     expect(deleted).toBe(false); //negative test case to capture the screenrecording of failure as per fremework requirement.
     |                     ^ Error: expect(received).toBe(expected) // Object.is equality
  93 | });
```