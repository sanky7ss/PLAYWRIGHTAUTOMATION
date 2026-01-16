const {test,expect} = require('@playwright/test');

test.only ('Browser Context Playwright test', async ({browser})=>
{
    const context=  await browser.newContext();
    const page = await context.newPage();
    //page.route('**/*.{jpg,pngjpeg}',route=> route.abort());// this line will abort loading any request we provide inside the route 

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTtiles = page.locator(".card-body a");
    page.on('request',request=>console.log(request.url()));// this line fetches the request url and prints
    page.on('response',response=>console.log(response.url(),response.status()));// this line fetches response url, status code and prints

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await userName.fill("rahulshetty");
    await page.locator("[type='password']").fill("learning");
    await signIn.click();
   console.log( await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect');
   await userName.fill("rahulshettyacademy");
   await signIn.click();
   await page.locator(".card-body a").first().waitFor();
   //console.log(await cardTtiles.first().textContent());
   //console.log(await cardTtiles.nth(2).textContent());
   const allTitles = await cardTtiles.allTextContents();
   console.log(allTitles);
//    await page.pause();

});

test('Page Playwright test', async ({page})=>
{
    await page.goto ("https://www.google.com");
    await expect(page).toHaveTitle("Google");

    
});

test('UI controls', async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const blinkingtext = page.locator("[href*=document]");
    await dropdown.selectOption("consult");
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    //assertion
    console.log("Before");
    await expect (page.locator('.radiotextsty').last()).toBeChecked();
    console.log (await page.locator(".radiotextsty").last().isChecked());
    await page.locator('#terms').click();
    console.log (await page.locator('#terms').isChecked());
    await page.locator('#terms').uncheck();
    console.log (await page.locator('#terms').isChecked());
    expect(await page.locator('#terms').isChecked()).toBeFalsy();
    await expect(blinkingtext).toHaveAttribute("class","blinkingText");
    //await page.pause();
}
)

test("ChildWindows",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage()
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const dropdown = page.locator('select.form-control');
    const blinkingtext = await page.locator("[href*=document]");
    
    //await page.pause();
    const [newPage] =await Promise.all(
    [
        context.waitForEvent('page'),
        blinkingtext.click(),
    ])
    const text =  await newPage.locator('.im-para.red').textContent();
    const text1 = text.split("@");
    const domain  = text1[1].split(" ")[0];
    console.log(domain);
    await userName.fill(domain);
    console.log(await userName.inputValue());
    await userName.click();
    //  await page.pause();
})
