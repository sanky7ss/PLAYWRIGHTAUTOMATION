import{test, expect} from '@playwright/test';
test('Playwright Special Locators',async({page})=>{
    await page.goto('https://rahulshettyacademy.com/angularpractice');
    await page.getByLabel('Check me out if you Love IceCreams!').check();
    await page.getByLabel('Student').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByPlaceholder('Password').fill('abc123');
    await page.getByRole('button',{name:'Submit'}).click();
    expect(await page.getByText(' The Form has been submitted successfully!').isVisible()).toBeTruthy();
    await page.getByRole('link',{name:'Shop'}).click();
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();
    await page.locator('a.nav-link.btn.btn-primary').click();
    await page.waitForLoadState('networkidle');
    // await page.pause(); 
})
