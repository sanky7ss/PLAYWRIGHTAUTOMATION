const{test,expect} = require('@playwright/test');
test('Calendar validation',async({page})=>
{
    const month ='6';
    const date = '25';
    const year = '2025';
    const arrCalendar = [month,date,year];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation').click();
    await page.locator('.react-calendar__navigation').click();
    await page.getByText(year).click();
    await page.locator('.react-calendar__tile').nth(Number(month)-1).click();
    await page.locator("//abbr[text()='"+date+"']").click();
    // await page.getByText(year).click();
    const pageDt = page.locator('.react-date-picker__inputGroup__input')
    for (let i=0; i<arrCalendar.length;i++){
        const value = await pageDt.nth(i).getAttribute('value');
        expect(value).toEqual(arrCalendar[i]);        
    }

})