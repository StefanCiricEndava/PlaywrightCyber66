// @ts-check
import { defineConfig, devices } from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  testDir: './e2e',
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: 'html',
  expect: {
    timeout: 5000
  },
  use: {
    trace: 'on-first-retry',
    viewport: null,
    actionTimeout: 20000,
    navigationTimeout: 25000,
    baseURL: 'https://demo-next-sap-b2b-coveo.alokai.com/',
    launchOptions: {
      args: ["--start-maximized"]
    }
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /.*auth\.setup\.ts/,
      use: {
        
        launchOptions: {
          args: ['--start-maximized']
        }
      }
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
        
        launchOptions: {
          args: ['--start-maximized']
        }
      },
      dependencies: ['setup'],
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/user.json',
        baseURL: 'https://demo-next-sap-b2b-coveo.alokai.com/',
        launchOptions: {
          args: ['--start-maximized']
        }
      },
      dependencies: ['setup'],
    },

  ],

});
