const{test,expect,request} = require('@playwright/test');
const loginPayload = {userEmail : 'sanky7ss@gmail.com',userPassword:'Iamking@000'};
const orderPayload = {orders: [{country: "Germany", productOrderedId: "68a961719320a140fe1ca57c"}]};
const fakeorderPayload = {data:[],message:"No Orders"}

 let loginToken;
test('API Test Self',async({page})=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    // console.log(loginResponseJson);
    loginToken = loginResponseJson.token;
    console.log(loginToken);
    console.log(loginResponseJson.userId);
    console.log(loginResponseJson.message);

    const responseOrder = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
        data: orderPayload,
        headers : {
            'authorization': loginToken,
            'Content-type': 'application/json'
        },
    })

    const responseOrderJSON = await responseOrder.json();
    console.log(responseOrderJSON);

    await page.addInitScript((value=>{
        window.localStorage.setItem('token',value)
    }),loginToken) ;

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.getByText("  ORDERS").waitFor();
    // await page.getByRole('button',{name:' ORDERS'}).click();
    /*await page.locator('.btn.btn-custom').filter({hastext:'/ORDERS/'})
    .getByRole('button',{name:'/ORDERS/'}).click();*/ // thismethod did not work
   
    await page.close();

})

test('Mocking API',async({page})=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",{data:loginPayload});
    expect(loginResponse.ok()).toBeTruthy();
    const loginResponseJson = await loginResponse.json();
    console.log(loginResponseJson);
    loginToken = loginResponseJson.token;
    await page.addInitScript((value=>{
         window.localStorage.setItem('token',value)
    }),loginToken);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            const response =await page.request.fetch(route.request());
            let reqbody = JSON.stringify(fakeorderPayload);
            route.fulfill(
                {
                    response,
                    body:reqbody
                }
            )
        }
    )

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('li [routerlink*=myorders]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    const nomsg = await page.locator('.mt-4').textContent();
    console.log(nomsg);


})