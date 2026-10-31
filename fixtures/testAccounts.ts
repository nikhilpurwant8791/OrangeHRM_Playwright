export const testAccounts = {
  dev: {
    account1: {
      username: 'Admin',
      password: 'admin123',
      role: 'Admin',
    },
    account2: {
      username: 'johnQA123',
      password: 'johnQA123',
      role: 'ESS',
    },
  },
  demo: {
    account1: {
      username: 'Admin',
      password: 'admin123',
      role: 'Admin',
    },
    account2: {
      username: 'johnQA123',
      password: 'johnQA123',
      role: 'ESS',
    },
  },
  prod: {
    account1: {
      username: 'Admin',
      password: 'admin123',
      role: 'Admin',
    },
    account2: {
      username: 'johnQA123',
      password: 'johnQA123',
      role: 'ESS',
    },
  },
} as const;
