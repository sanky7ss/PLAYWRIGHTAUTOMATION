const {test,expect,request} = require ('@playwright/test');
const loginPayLoad = {userEmail: "sanky7ss@gmail.com", userPassword: "Iamking@000"};
const orderPayload ={orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const {ApiUtils} = require('../utils/APiUtils');

//let token;
let orderID ;
let response;
test.beforeAll(  async()=>{
    const apicontext  = await request.newContext();
    const apiUtils = new ApiUtils (apicontext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
    // //-----uncomment the below lines to perform APi test directly for file equivalent to function in APiUtils js file async getToken()---------
    // const loginResponse = await apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{
    // data: loginPayLoad
    // }) // expect 200 201 2 
    // expect(loginResponse.ok()).toBeTruthy;
    // const loginResponseJson = await loginResponse.json();
    // token = loginResponseJson.token;
    // console.log(token);
    // //-----uncomment the below lines to perform APi test directly for file---------
    
    // orderPayload
    // -- code equivalent to  async createOrder(orderPayload) funftion -----------
    // const orderResponse =  await apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    // {
    //     data : orderPayload,
    //     headers:{
    //         'authorization': token,
    //         'Content-Type': 'application/json'

    //     },
    // })

    // const orderresponseJSON = await orderResponse.json();
    // console.log(orderresponseJSON);
    // orderID =orderresponseJSON.orders[0];
    // -- code equivalent to  async createOrder(orderPayload) funftion -----------


    


});

        


test.beforeEach(()=>{

})

test ('@API Place the Order',async({page})=>
{
    // const apiUtils = new ApiUtils (apicontext,loginPayLoad);
    
    // If ypu want to define a funcntion instead of defining within the first parameter below line of code reqd
    // function getToken1(value1){
    //     window.localStorage.setItem('token',value1);
    // }
    // await page.addInitScript(getToken1,response.token);
    
    await page.addInitScript((value =>{
        window.localStorage.setItem('token',value)
    }),response.token);

    

    

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('li [routerlink*=myorders]').click();
    // page.waitForLoadState('networkidle');
    await page.locator('.ng-star-inserted [scope=row]').first().waitFor();
    const orders = await page.locator('tbody tr');
    const orderCount = await orders.count();
    console.log("order count is "+orderCount);
    for (let l=0; l<orderCount; ++l){
        const rowOrderID = await orders.nth(l).locator('th').textContent();
        //expect(orderID.includes(rowOrderID)).toBeTruthy();
        if (response.orderID.includes(rowOrderID)){
            //console.log(orderID+" Found.");
            await orders.locator("button").first().click();
            break;
        }
    }
    //await page.pause();
    const orderDetails = await page.locator('.col-text').textContent();
    console.log(orderDetails);
    expect(response.orderID.includes(orderDetails)).toBeTruthy;
})
