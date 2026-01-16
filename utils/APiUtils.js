class ApiUtils{
    constructor (apicontext,loginPayLoad)
    {
        this.apicontext = apicontext;
        this.loginPayLoad = loginPayLoad;

    }

    async getToken(){
        const loginResponse = await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }) 
        // expect 200 201 2 
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    }

    async createOrder(orderPayload)
    {
        let response ={}   ;
        response.token = await this.getToken();
        const orderResponse =  await this.apicontext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
        data : orderPayload,
        headers:{
            'authorization': response.token,
            'Content-Type': 'application/json'

        },
    })

    const orderresponseJSON = await orderResponse.json();
    console.log(orderresponseJSON);
    const orderID =await orderresponseJSON.orders[0];
    response.orderID =orderID;
    return response;
    }
}
module.exports={ApiUtils};