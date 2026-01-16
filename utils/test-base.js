const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testdatafororder:  {
        username: "sanky7ss@gmail.com",
        password: "Iamking@000",
        productname : "ZARA COAT 3",
        cardnumber : "1234567890123456",
        country : "ind",
        selectcountry : " British Indian Ocean Territory",
        tymessage : " Thankyou for the order. "
    }
})