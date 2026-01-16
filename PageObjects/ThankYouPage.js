const{test,expect} =require('@playwright/test');
class ThankYouPage{
    constructor(page){
        this.page = page;
        this.thanksmessagelabel = page.locator('.hero-primary');
        this.orderID = page.locator('label.ng-star-inserted');
        this.myOrderbtn = page.locator('li [routerlink*=myorders]');
    }
    async validateThankyoumsg(tymessage){
        await expect(this.thanksmessagelabel).toHaveText(tymessage);
    }

    async getOredrID(){
         return await this.orderID.textContent();
    }
    async navigateToMyOrders(){
        this.myOrderbtn.click();
        //this.page.waitForLoadState('networkidle');
    }


}

module.exports = {ThankYouPage};