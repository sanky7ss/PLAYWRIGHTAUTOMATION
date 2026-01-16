const{test,expect} = require('@playwright/test');

//test.describe.configure({mode:'parallel'}); // this mehod runs all the tests in parallel mode
test.describe.configure({mode:'serial'}); // this mehod runs all the tests in serial mode

test('PopUp validations',async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    // await page.goto("https://www.google.com");
    // await page.goBack();
    // await page.goForward(); 
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    page.pause();
    page.once('dialog',dialog=>dialog.accept());
    await page.locator("#confirmbtn").click();
    await page.on('dialog',dialog=>dialog.dismiss());
    await page.locator("#confirmbtn").click();
    await page.locator('#mousehover').hover();
    await page.locator("a[href='#top']").click();
    const frames = page.frameLocator('#courses-iframe');
    await frames.locator(".hidden .text-muted-foreground[href*='all-access-subscription']").click();
    const subsc = await frames.locator(".text-2xl").allTextContents();
    console.log(subsc[1]);




}
)


test('@Web Screenshot & Visual comparison',async({page})=>{

    await page.goto("https://rahulshettyacademy.com/AutomationPractice");
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path:'locatorScreenshot.png'});
    await page.pause();
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
})

test("Do Visual testing",async({page})=>{
    // await page.goto("https:google.com");
    await page.goto("https:flightaware.com");

    expect(await page.screenshot()).toMatchSnapshot('landing1.png');
})





// test('Calendar validation',async({page})=>{

// })