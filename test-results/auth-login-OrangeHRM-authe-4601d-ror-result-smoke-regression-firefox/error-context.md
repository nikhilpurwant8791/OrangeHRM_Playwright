# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth\login.spec.ts >> OrangeHRM authentication >> Failed logout to capture error result  @smoke @regression
- Location: tests\auth\login.spec.ts:29:8

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.orangehrm-login-title')
Expected substring: "Login"
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toContainText" locator('.orangehrm-login-title') with timeout 10000ms
  - waiting for locator('.orangehrm-login-title')

```

```yaml
- complementary:
  - navigation "Sidepanel":
    - link "client brand banner":
      - /url: https://www.orangehrm.com/
      - img "client brand banner"
    - textbox "Search"
    - button ""
    - separator
    - list:
      - listitem:
        - link "Admin":
          - /url: /web/index.php/admin/viewAdminModule
      - listitem:
        - link "PIM":
          - /url: /web/index.php/pim/viewPimModule
      - listitem:
        - link "Leave":
          - /url: /web/index.php/leave/viewLeaveModule
      - listitem:
        - link "Time":
          - /url: /web/index.php/time/viewTimeModule
      - listitem:
        - link "Recruitment":
          - /url: /web/index.php/recruitment/viewRecruitmentModule
      - listitem:
        - link "My Info":
          - /url: /web/index.php/pim/viewMyDetails
      - listitem:
        - link "Performance":
          - /url: /web/index.php/performance/viewPerformanceModule
      - listitem:
        - link "Dashboard":
          - /url: /web/index.php/dashboard/index
      - listitem:
        - link "Directory":
          - /url: /web/index.php/directory/viewDirectory
      - listitem:
        - link "Maintenance":
          - /url: /web/index.php/maintenance/viewMaintenanceModule
      - listitem:
        - link "Claim":
          - /url: /web/index.php/claim/viewClaimModule
          - img
          - text: Claim
      - listitem:
        - link "Buzz":
          - /url: /web/index.php/buzz/viewBuzz
- banner:
  - heading "Dashboard" [level=6]
  - link "Upgrade":
    - /url: https://orangehrm.com/open-source/upgrade-to-advanced
    - button "Upgrade"
  - list:
    - listitem:
      - img "profile picture"
      - paragraph: manda user
      - text: 
  - navigation "Topbar Menu":
    - list:
      - button ""
- text: 
- paragraph: Time at Work
- separator
- img "profile picture"
- paragraph: Punched Out
- paragraph: "Punched Out: Mar 29th at 01:19 PM (GMT 7)"
- text: 0h 0m Today
- button ""
- separator
- paragraph: This Week
- paragraph: Oct 26 - Nov 01
- text: 
- paragraph: 0h 0m
- text: 
- paragraph: My Actions
- separator
- button
- paragraph: (1) Pending Self Review
- button
- paragraph: (1) Candidate to Interview
- text: 
- paragraph: Quick Launch
- separator
- button "Assign Leave"
- paragraph: Assign Leave
- button "Leave List"
- paragraph: Leave List
- button "Timesheets"
- paragraph: Timesheets
- button "Apply Leave"
- paragraph: Apply Leave
- button "My Leave"
- paragraph: My Leave
- button "My Timesheet"
- paragraph: My Timesheet
- text: 
- paragraph: Buzz Latest Posts
- separator
- img "profile picture"
- paragraph: manda akhil user
- paragraph: 2026-01-11 07:41 PM
- separator
- paragraph: Happy Sunday
- img "profile picture"
- paragraph: manda akhil user
- paragraph: 2020-08-10 09:08 AM
- separator
- paragraph: "Hi All; Linda has been blessed with a baby boy! Linda: With love, we welcome your dear new baby to this world. Congratulations!"
- img "profile picture"
- paragraph: Sania Shaheen
- paragraph: 2020-08-10 09:08 AM
- separator
- paragraph: "World Championship: What makes the perfect snooker player? Mark Selby: Robertson has one of the best techniques in the game. It is very, very straight and he fully commits to every single shot he plays. John Higgins: Every shot is repetitive. He always keeps the same technique and cues through the ball bang straight. Barry Hawkins: Robertson is textbook with his grip and has a ramrod solid cue action, delivering it in a straight line. Honourable mentions: Shaun Murphy, Ding Junhui, Jack Lisowski."
- img "profile picture"
- paragraph: Rebecca Harmony
- paragraph: 2020-08-10 09:04 AM
- separator
- paragraph: Throwback Thursdays!!
- img
- img "profile picture"
- paragraph: Russel Hamilton
- paragraph: 2020-08-10 09:03 AM
- separator
- paragraph: Live SIMPLY Dream BIG Be GREATFULL Give LOVE Laugh LOT.......
- paragraph: Employees on Leave Today
- text: 
- separator
- img "No Content"
- paragraph: No Employees are on Leave Today
- text: 
- paragraph: Employee Distribution by Sub Unit
- separator
- list:
  - listitem: Engineering
  - listitem: Human Resources
  - listitem: Administration
  - listitem: Client Services
  - listitem: Unassigned
- text: 
- paragraph: Employee Distribution by Location
- separator
- list:
  - listitem: Texas R&D
  - listitem: New York Sales Office
  - listitem: Unassigned
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
- dialog:
  - document:
    - button "×"
    - heading "About" [level=6]
    - separator
    - paragraph: "Company Name:"
    - paragraph: OrangeHRM
    - paragraph: "Version:"
    - paragraph: OrangeHRM OS 5.9
    - paragraph: "Active Employees:"
    - paragraph: "105"
    - paragraph: "Employees Terminated:"
    - paragraph: "0"
```

# Test source

```ts
  1  | import { expect, type Locator, type Page } from '@playwright/test';
  2  | 
  3  | export class LogoutPage {
  4  |   readonly page: Page;
  5  |   readonly dropdown: Locator;
  6  |   readonly last_logout: Locator;
  7  |   readonly loginHeading: Locator;
  8  |   readonly failed_logout: Locator;
  9  | 
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |     this.dropdown = page.locator('.oxd-userdropdown-name');
  13 |     this.last_logout = page.locator('.oxd-dropdown-menu li a').last();
  14 |     this.loginHeading = page.locator('.orangehrm-login-title');
  15 |     this.failed_logout = page.locator('.oxd-dropdown-menu li a').first();
  16 |   }
  17 | 
  18 |   async logout(): Promise<void> {
  19 |        await this.dropdown.click();
  20 |       await this.last_logout.click();
  21 |       await expect(this.loginHeading).toContainText('Login');
  22 |   }
  23 | 
  24 |   async failedlogout(): Promise<void> {
  25 |        await this.dropdown.click();
  26 |       await this.failed_logout.click();
> 27 |       await expect(this.loginHeading).toContainText('Login');
     |                                       ^ Error: expect(locator).toContainText(expected) failed
  28 |   }
  29 | }
  30 | 
```