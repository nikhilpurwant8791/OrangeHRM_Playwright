import { randomUUID } from 'node:crypto';

export interface EmployeeTestData {
  firstName: string;
  lastName: string;
  employeeId: string;
}

export function createEmployeeTestData(): EmployeeTestData {
  const token = randomUUID().replaceAll('-', '').slice(0, 8);

  return {
    firstName: `QA${token}`,
    lastName: `Employee${token}`,
    employeeId: token,
  };
}
