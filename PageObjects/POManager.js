const {LoginPage} = require('../PageObjects/LoginPage');
const {DashBoardPage} = require ('../PageObjects/DashBoardPage');
const {CompleteOrderPage} = require('../PageObjects/CompleteOrderPage');
const {PaymentPage} = require('../PageObjects/PaymentPage'); 
const {ThankYouPage} = require('../PageObjects/ThankYouPage');
const {MyordersPage} = require('../PageObjects/MyordersPage');

class POManager{
    constructor(page){
        this.page = page;
        this.LoginPage = new LoginPage(page);
        this.DashBoardPage = new DashBoardPage(page);
        this.CompleteOrderPage = new CompleteOrderPage(page);
        this.PaymentPage = new PaymentPage(page);
        this.ThankYouPage = new ThankYouPage(page);
        this.MyordersPage = new MyordersPage(page);
    }

    getLoginPage(){
        return this.LoginPage;
    }

    getDashBoardPage(){
        return this.DashBoardPage;
    }
    getCompleteOrderPage(){
        return this.CompleteOrderPage;
    }
    getPaymentPage(){
        return this.PaymentPage;
    }
    getThankYouPage(){
        return this.ThankYouPage;
    }
    getMyordersPage(){
        return this.MyordersPage;
    }
}
module.exports={POManager}