import { expect, test as base } from '@playwright/test';
import { testAccounts } from './testAccounts';

type Environment = keyof typeof testAccounts;
type EnvironmentAccounts = (typeof testAccounts)[Environment];

function isEnvironment(environment: string): environment is Environment {
  return Object.hasOwn(testAccounts, environment);
}

export function getEnvironment(): Environment {
  const environment = process.env.ENV ?? process.env.ORANGEHRM_ENV ?? 'demo';

  if (!isEnvironment(environment)) {
    throw new Error(`Unsupported ENV "${environment}". Use dev, demo, or prod.`);
  }

  return environment;
}

export const test = base.extend<{ accounts: EnvironmentAccounts }>({
  accounts: async ({}, use) => {
    await use(testAccounts[getEnvironment()]);
  },
});

export { expect };
