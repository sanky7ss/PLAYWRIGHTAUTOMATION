// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';


/**

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout:40*1000,
  expect : {
    timeout : 5000,
  }, 
  reporter: 'html',
   use: {
   browserName:'chromium',
   headless : true,
   trace :'on',
   screenshot :'on'//'retain-on-failure'//'on',


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
   },

});

module.exports = config