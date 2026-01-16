const { test, expect } = require('@playwright/test')


test("Network Security test intercept", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sanky7ss@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle'); // this method waits until all services calls are done
    await page.locator('.card-body b').first().waitFor();

    await page.locator('li [routerlink*=myorders]').click();
    // the below line sends modifies the request itself before being sent
    // for eg below bewe have captured the request being sent after view buttonis clicked 
    // but we took took it and asked play wright to keep looking into the below url is being sent or not
    //and modified our own forged url to be sent as the request, so it will never return a correct response as the request is not valid
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94a" })
        //route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*" })
    );
    await page.locator("button:has-text('View')").first().click();
    await page.pause();
    
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");
})