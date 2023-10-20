import { PlaywrightTestConfig } from "@playwright/test"

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: true,
        viewport: { width: 1280, height: 720},
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off',
    },
    projects: [
        {
          name: 'Chromium',
          use: { browserName: 'chromium' },
        },
      ],
      workers: 3,
      reporter: [['list'], ['junit', { outputFile: 'test-results.xml' }], ['html'], ['allure-playwright']],
}

export default config

//how to use playwright with config you can use it in this command
//npx playwright test --config=playwright.config.ts --project=Webkit