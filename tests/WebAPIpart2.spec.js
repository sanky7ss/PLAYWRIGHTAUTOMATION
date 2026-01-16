const {test,expect} = require('@playwright/test');
let webContext;


test.beforeAll( async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("sanky7ss@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');
    await context.storageState({path : 'state.json'});
    webContext = await browser.newContext({storageState:'state.json'});
}
)

test ('Client App Login',async({})=>{
    const productName = "ADIDAS ORIGINAL"
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    const products = page.locator(".card-body");

    await page.waitForLoadState('networkidle'); // this method waits until all services calls are done
    await page.locator('.card-body b').first().waitFor();
    const  titles= await page.locator('.card-body b').allTextContents();
    //const products = page.locator(".card-body");
    console.log(titles);
    const count = await products.count();
    
        for (let i= 0 ; i<count ; ++i){
            console.log(await products.nth(i).locator("b").textContent());
            if ( await products.nth(i).locator("b").textContent()===productName){
                await products.nth(i).locator("text = Add To Cart ").click();
                break;
            }
    
        }
        await page.locator("[routerlink*='cart']").click();
    
    
        // await page.pause();
        // await page.waitForLoadState('networkidle');
        await page.locator('div li').first().waitFor();
        const bool =  await page.locator("h3:has-text('"+productName+"')").isVisible();
        expect(bool).toBeTruthy();
        page.locator("text=Checkout").click();
        await page.waitForLoadState('networkidle');
        await page.locator("[placeholder*='Country']").pressSequentially("ind");
        const dropDownOptions = await page.locator('.ta-results');
        await dropDownOptions.waitFor();
        const count2 = await dropDownOptions.locator('button').count();
        console.log(count2);
        for (let j = 0 ; j<count2; ++j){
            const text =await dropDownOptions.locator('button').nth(j).textContent();
            console.log(text);
            if(text===" India"){
               await dropDownOptions.locator('button').nth(j).click();
               break;
            }
    
    
        }
    
        // const count3=await page.locator('div .field input[type=text]').count();
        const textbox = await page.locator('div .field');
        const count3=await textbox.count();
        console.log(count3);
        for (let k =0; k<count3;++k){
            console.log (await textbox.nth(k).locator('.title').textContent());
            if (await textbox.nth(k).locator('.title').textContent() ==='Credit Card Number '){
                await textbox.nth(k).locator('.input').nth(k).fill('1234567890123456');
                console.log('Card No entered 1234567890123456');
                break
            }
            else{
                console.log('False');
            }
        }
    
        await page.locator('[class*=action__submit]').click();
        const tyMessage =" Thankyou for the order. "
        await page.waitForLoadState('networkidle');
        const thanksmsg=  await page.locator('.hero-primary');
        await expect(thanksmsg).toHaveText(tyMessage);
        const orderID = await page.locator('label.ng-star-inserted').textContent();
        console.log(orderID);
        await page.locator('li [routerlink*=myorders]').click();
        page.waitForLoadState('networkidle');
        await page.locator('.ng-star-inserted [scope=row]').first().waitFor();
        const orders = await page.locator('.ng-star-inserted [scope=row]');
        const orderCount = await orders.count();
        console.log(orderCount);
        for (let l=0; l<orderCount; ++l){
            console.log(await orders.nth(l).textContent());
            expect(orderID.includes(await orders.nth(l).textContent())).toBeTruthy();
            if (orderID.includes(await orders.nth(l).textContent())){
                console.log(orderID+" Found.");
                break;
            }
        }
        //await orders.first().waitFor();
        await page.pause();

})

test('@API Test case 2',async({})=>{
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    
    const products = page.locator(".card-body");
    await page.waitForLoadState('networkidle'); // this method waits until all services calls are done
    await page.locator('.card-body b').first().waitFor();
    const  titles= await page.locator('.card-body b').allTextContents();
    console.log(titles);
})