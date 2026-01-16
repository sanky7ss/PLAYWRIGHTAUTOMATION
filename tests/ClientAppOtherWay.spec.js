const {test, expect} = require('@playwright/test');
const { Console } = require('console');
const { constrainedMemory } = require('process');

test.only('Browser Context-Validating Error Login', async ({page})=> 
{
    const productName = "ADIDAS ORIGINAL"
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("sanky7ss@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.getByRole('button',{name:'Login'}).click();
    await page.waitForLoadState('networkidle'); // this method waits until all services calls are done
    await page.locator('.card-body').first().waitFor();
    await page.locator('.card-body').filter({hasText:productName}).getByRole
    ('button',{name:'Add To Cart'}).click();
    await page.getByRole('listitem').getByRole('button',{name:"Cart"}).click();
    await page.getByRole('listitem').getByRole('button',{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole('button',{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();
    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();
    const orderID = await page.locator('label.ng-star-inserted').textContent();
    await page.getByRole('button',{name:'ORDERS'}).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(3000);
    const orderID2 = await page.locator("tr [scope=row]").first().textContent();
    console.log(orderID +"   "+orderID2);
    expect(orderID.includes(orderID2)).toBeTruthy();

    



})

