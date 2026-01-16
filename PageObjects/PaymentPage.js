const {test,expect} = require('@playwright/test')
class PaymentPage{
    constructor(page){
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.countryDropdowns = page.locator('.ta-results');
        this.cardNoTextBox = page.locator('div .field')
        this.placeOrderBtn =page.locator('[class*=action__submit]');
    }

    async selectCountry(country,selectCountry){
         await this.country.pressSequentially(country);
         await this.countryDropdowns.waitFor();
         const btnCount = await this.countryDropdowns.locator('button').count();
         for (let j = 0 ; j<btnCount; ++j){
        const text = await this.countryDropdowns.locator('button').nth(j).textContent();
        console.log(text);
        if(text===selectCountry){
           await this.countryDropdowns.locator('button').nth(j).click();
           break;
        }

    }}

    async enterCardNumber(cardNumber){
        const textBoxCount = await this.cardNoTextBox.count();
        for (let k =0; k<textBoxCount;++k){
        console.log (await this.cardNoTextBox.nth(k).locator('.title').textContent());
        if (await this.cardNoTextBox.nth(k).locator('.title').textContent() ==='Credit Card Number '){
            await this.cardNoTextBox.nth(k).locator('.input').nth(k).fill(cardNumber);
            await console.log('Card No entered '+cardNumber);
            break;
        }
        else{
            console.log('False');
        }
    }
    }

    async placeOrder(){
        this.placeOrderBtn.click();
        //await this.page.waitForLoadState('networkidle');
    }
}
module.exports = {PaymentPage};
