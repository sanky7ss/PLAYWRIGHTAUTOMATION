
const { Given, When, Then } = require('@cucumber/cucumber');
const { POManager } = require('../../PageObjects/POManager');
//const {expect} = require('@playwright/test');
const { chromium,expect } = require('@playwright/test');
/*function normalizevalue(value){
    if (value===undefined||value===null) return value;
    return value
        .replace(/<SPACE>/g,' ')
        .replace(/<EMPTY/g,'');
}*/
Given('a login to ecommerce platform with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    /* The below lines are passed from Hooks.js file
    this.browser = await chromium.launch({headless:false});
    this.context =await this.browser.newContext();
    this.page = await this.context.newPage();*/
    this.pOmanager = new POManager(this.page);
    this.loginPage = this.pOmanager.getLoginPage();
    await this.loginPage.goto();
    await this.loginPage.validLogin(username, password);
});
When('Add {string}', async function (productname) {
    // Write code here that turns the phrase above into concrete actions
    this.dashBoard = this.pOmanager.getDashBoardPage();
    await this.dashBoard.searchProductAddCart(productname);
    await this.dashBoard.navigateToCart();

});

Then('verify {string} is present in the cart', async function (productname) {
    // Write code here that turns the phrase above into concrete actions
    this.completeOrderPage = this.pOmanager.getCompleteOrderPage();
    await this.completeOrderPage.proceedtoCheckout(productname);
});
When('enter valid detials {string} , {string},{string} to place order', async function (cardnumber, country, selectcountry) {
    // Write code here that turns the phrase above into concrete actions
    this.placeOrder = this.pOmanager.getPaymentPage();
    await this.placeOrder.selectCountry(country, selectcountry);
    await this.placeOrder.enterCardNumber(cardnumber);
    await this.placeOrder.placeOrder();
});
Then('verify order is present in the order history with {string}', async function (tymessage) {
    // Write code here that turns the phrase above into concrete actions
    this.thankYouPage = this.pOmanager.getThankYouPage();
    await this.thankYouPage.validateThankyoumsg(tymessage);
    const orderID = await this.thankYouPage.getOredrID();
    await this.thankYouPage.navigateToMyOrders();
    this.myOrderPage = this.pOmanager.getMyordersPage();
    await this.myOrderPage.validateOrderID(orderID);
});


Given('a login to ecommerce2 platform with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator('#username');
    const signIn = this.page.locator('#signInBtn');
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
   
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
});


Then('error message should be visible', async function () {
    // Write code here that turns the phrase above into concrete actions
     console.log( await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');

});

