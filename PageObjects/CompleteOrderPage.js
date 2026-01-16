const { test, expect } = require('@playwright/test')
class CompleteOrderPage {
    constructor(page) {
        this.page = page;
        this.productLineItems = page.locator('div li').first();
        this.checkoutBtn = page.locator("text=Checkout");
    }

    async proceedtoCheckout(productName) {
        await this.productLineItems.waitFor();
        const bool = await this.getProductLocator(productName).isVisible();
        expect(bool).toBeTruthy();
        this.checkoutBtn.click();
       // await this.page.waitForLoadState('networkidle');
    }

    getProductLocator(productName) {
        return this.page.locator("h3:has-text('" + productName + "')");
    }
}
module.exports = { CompleteOrderPage };
