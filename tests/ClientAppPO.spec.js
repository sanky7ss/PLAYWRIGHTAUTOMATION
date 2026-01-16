const {test, expect} = require('@playwright/test');
// const { Console } = require('console');
// const { constrainedMemory } = require('process');
const{POManager} = require('../PageObjects/POManager');
//const { MyordersPage } = require('../PageObjects/MyordersPage');
/*JSON —> String —>js object */ 
const testdataset = JSON.parse(JSON.stringify(require('../utils/ClienAppPO_TestData.json')));
/*commnetingn the below lines as all these objects have been called in the above 
POManager js file.*/
/*
const { LoginPage } = require('../PageObjects/LoginPage');
const { DashBoardPage } = require('../PageObjects/DashBoardPage');
const {CompleteOrderPage} = require('../PageObjects/CompleteOrderPage');*/
const {customtest} =require('../utils/test-base');
for (const data of testdataset){
test(`@Web Client App Login ${data.productname}`, async ({page})=> 
{
    const pOmanager= new POManager(page);
   /* const productName = "ADIDAS ORIGINAL"
    //const products = page.locator(".card-body");
    const username = "sanky7ss@gmail.com";
    const password = "Iamking@000";
    const cardNumber = "1234567890123456";
    const country = 'ind';
    const selectCountry  = " India";
    const tyMessage =" Thankyou for the order. "*/
    //await page.goto("https://rahulshettyacademy.com/client");
    // const loginPage = new LoginPage(page);
    const loginPage = pOmanager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(data.username,data.password);
    // const dashBoard = new DashBoardPage(page);
    const dashBoard = pOmanager.getDashBoardPage();
    await dashBoard.searchProductAddCart(data.productname);
    
    await dashBoard.navigateToCart();
    // const completeOrderPage = new CompleteOrderPage(page);
    const completeOrderPage = pOmanager.getCompleteOrderPage();
    await completeOrderPage.proceedtoCheckout(data.productname);
    const placeOrder = pOmanager.getPaymentPage();
    await placeOrder.selectCountry(data.country,data.selectcountry);
    await placeOrder.enterCardNumber(data.cardnumber);
    await placeOrder.placeOrder();
    const thankYouPage = pOmanager.getThankYouPage();
    await thankYouPage.validateThankyoumsg(data.tymessage);
    const orderID = await thankYouPage.getOredrID();
    await thankYouPage.navigateToMyOrders();
    const myOrderPage = pOmanager.getMyordersPage();
    await myOrderPage.validateOrderID(orderID);
    
    
    // await page.pause();



})

}

// Below is a test where test data is passed as a fixture //
customtest(`@Web Client App Login`, async ({page,testdatafororder})=> 
{
    const pOmanager= new POManager(page);
    const loginPage = pOmanager.getLoginPage();
    await loginPage.goto();
    await loginPage.validLogin(testdatafororder.username,testdatafororder.password);
    // const dashBoard = new DashBoardPage(page);
    const dashBoard = pOmanager.getDashBoardPage();
    await dashBoard.searchProductAddCart(testdatafororder.productname);
    
    await dashBoard.navigateToCart();
    // const completeOrderPage = new CompleteOrderPage(page);
    const completeOrderPage = pOmanager.getCompleteOrderPage();
    await completeOrderPage.proceedtoCheckout(testdatafororder.productname);
    const placeOrder = pOmanager.getPaymentPage();
    await placeOrder.selectCountry(testdatafororder.country,testdatafororder.selectcountry);
    await placeOrder.enterCardNumber(testdatafororder.cardnumber);
    await placeOrder.placeOrder();
    const thankYouPage = pOmanager.getThankYouPage();
    await thankYouPage.validateThankyoumsg(testdatafororder.tymessage);
    const orderID = await thankYouPage.getOredrID();
    await thankYouPage.navigateToMyOrders();
    const myOrderPage = pOmanager.getMyordersPage();
    await myOrderPage.validateOrderID(orderID);

})
