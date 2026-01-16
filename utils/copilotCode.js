const { request } = require('@playwright/test');

class ApiStatusChecker {
    constructor() {
        this.apiContext = null;
    }

    async initializeContext() {
        this.apiContext = await request.newContext();
    }

    async sendRequestAndCheck200(endpoint, method = 'POST', data = null) {
        if (!this.apiContext) {
            await this.initializeContext();
        }

        let response;
        if (method.toUpperCase() === 'GET') {
            response = await this.apiContext.get(endpoint);
        } else if (method.toUpperCase() === 'POST') {
            response = await this.apiContext.post(endpoint, { data });
        } else {
            throw new Error('Unsupported method');
        }

        if (response.status() === 200) {
            console.log('API request successful: Response status is 200');
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson;
        } else {
            throw new Error(`API request failed: Response status is ${response.status()}`);
        }
    }

    async closeContext() {
        if (this.apiContext) {
            await this.apiContext.dispose();
        }
    }
}

module.exports = { ApiStatusChecker };