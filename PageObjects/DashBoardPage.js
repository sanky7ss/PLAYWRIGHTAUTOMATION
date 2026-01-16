class DashBoardPage{
    constructor(page){
        this.page = page;
        this.product = page.locator(".card-body");
        this.productsText = page.locator('.card-body b');
        this.cart =page.locator("[routerlink*='cart']") ;

    }
    async searchProductAddCart(productName)
    {
    const  titles= await this.productsText.allTextContents();
    await this.page.locator('.card-body b').first().waitFor() ;
    await console.log(titles);
    const count = await this.product.count();

    for (let i= 0 ; i<count ; ++i){
        console.log(await this.product.nth(i).locator("b").textContent());
        if ( await this.product.nth(i).locator("b").textContent()===productName){
            await this.product.nth(i).locator("text = Add To Cart ").click();
            break;  
        }

    }
    //await page.locator("[routerlink*='cart']").click();
    }

    async navigateToCart()
    {
        await this.cart.click();
    }

}
module.exports = {DashBoardPage};