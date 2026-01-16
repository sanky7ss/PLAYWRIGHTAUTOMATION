const{test,expect} = require('@playwright/test');
class MyordersPage{
    constructor(page){
        this.page = page;
        this.orderitems = page.locator('.ng-star-inserted [scope=row]')
    }
    async validateOrderID(orderID){
        await this.orderitems.first().waitFor();
        const orderCount = await this.orderitems.count();
         for (let l=0; l<orderCount; ++l){
        console.log(await this.orderitems.nth(l).textContent());
        expect(orderID.includes(await this.orderitems.nth(l).textContent())).toBeTruthy();
        if (orderID.includes(await this.orderitems.nth(l).textContent())){
            await console.log(orderID+" Found.");
            break;
        }
    }

    }
}

module.exports = {MyordersPage};