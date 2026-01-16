const {test,expect,request} = require ('@playwright/test');
const loginPayLoad = {userEmail: "sanky7ss@gmail.com", userPassword: "Iamking@000"};
const orderPayload ={orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};
const {ApiUtils} = require('../utils/APiUtils');
const fakePayloadOrders = {data:[],message:"No Orders"}

//let token;
let orderID ;
let response;
test.beforeAll(  async()=>{
    const apicontext  = await request.newContext();
    const apiUtils = new ApiUtils (apicontext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayload);
   
});
     

test.beforeEach(()=>{

})

test ('Place the Order',async({page})=>
{
    
    
    await page.addInitScript((value =>{
        window.localStorage.setItem('token',value)
    }),response.token);

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
       async route=> {
         const response = await page.request.fetch(route.request());
         let body = JSON.stringify(fakePayloadOrders);
         route.fulfill(
            {
                response,
                body,
            }
         )
        }
    )

    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator('li [routerlink*=myorders]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");
    const noOrdermsg = await page.locator('.mt-4').textContent();
    console.log(noOrdermsg);
    
})

// const xlsx = require('xlsx');
// const { Workbook } = require('exceljs');

// test.skip('Read Write excel',({page})=>{
//     const WorkBook = xlsx.readFile('FileName.xlsx');
//     const sheetName = Workbook.SheetNames[0];
//     const data = xlsx.utils.sheet_to_json(WorkBook.Sheets[sheetName]);

//     for (const row of data){
//         page.goto("https://example.com");
//         page.locator('.locator').fill(row.username);
//         page.locator('.locator').fill(row.userPassword);
//     }
// })