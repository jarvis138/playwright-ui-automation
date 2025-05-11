import { defineConfig, devices } from '@playwright/test';
import CustomReporter from './utils/customReporter';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['list'],
    ['./utils/customReporter.ts']
  ],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: null,
    launchOptions: {
      args: ['--start-maximized'],
      headless: false
    },
    actionTimeout: 15000,
    navigationTimeout: 15000,
    testIdAttribute: 'data-test',
  },
  timeout: 30000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: {
      maxDiffPixels: 100,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: ['--disable-dev-shm-usage', '--no-sandbox', '--start-maximized'],
          headless: false
        }
      },
    }
  ],
}); 