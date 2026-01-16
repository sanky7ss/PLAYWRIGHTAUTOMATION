// @ts-check
import { chromium, defineConfig, devices } from '@playwright/test';
import { trace } from 'console';
import { permission } from 'process';


/**

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({

  testDir: './tests',
  timeout: 40 * 1000,
  retries : 1,
  //workers :1 , //this line disables parallel execution, restricts worker one by one
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  projects: [{
    name: 'SafariBrowser',
    use: {
      browserName: 'webkit',
      headless: true,
      trace: 'on',
      screenshot: 'on'//'retain-on-failure'//'on',
    }
  },
  {
    name: 'ChromeBrowser',
    use: {
      browserName: 'chromium',
      headless: false,
      trace: 'on',
      ignoreHttpsErrors:true, // this objects clicks on advanceand connects to further wesite link
      permission: ['geolocation'], //handles the pop ups related to access and other persmissions
      screenshot: 'on',//'retain-on-failure'//'on',
      video : 'retain-on-failure',
      //viewport: {width : 720, height: 720}  // This object helps to decice the resoltuon of the browser
      //...devices['Galaxy S24']  // this object opens the browser inthe devices default resolution
    }

  },
{
    name: 'FireFoxBrowser',
    use: {
      browserName: 'firefox',
      headless: true,
      trace: 'on',
      screenshot: 'on'//'retain-on-failure'//'on',
    }

  }]


});

module.exports = config