const{Before, After, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');
const {chromium}  = require('@playwright/test');
const { POManager } = require('../../PageObjects/POManager');


Before({tags:'@Validation or @Regression'},async function(){
    this.browser = await chromium.launch({headless:false});
    this.context =await this.browser.newContext();
    this.page = await this.context.newPage();
    this.pOmanager = new POManager(this.page);

});

BeforeStep(async function(){

});

AfterStep(async function({result}){
    if (result.status === Status.FAILED){
       await this.page.screenshot({path:"screenshotFail.png"});
    }
})

After(async function(){
    await console.log("I am the last one from execute");
})