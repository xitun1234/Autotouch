const axios = require('axios');

class SimThue {
    constructor() {
        this.api = 'JttfrNaVfxfrq8-fHVj03hIfz';
        this.lastServiceId = '';
        this.lastRequestId = '';
        this.lastPhone = '';
        this.lastMsg = '';
        this.lastCode = '';
    }
    regcodeShopee(msg) {
        const regCode = msg.match(/Ma xac minh SHOPEE: (.*?)\./);
        const regCode1 = msg.match(/ma xac minh la (.*?)\./);

        if (regCode) {
            return regCode[1];
        } else if (regCode1) {
            return regCode1[1];
        }
        return false;
    }
    regcodeLazada(msg) {
        const regCode = test.match(/Lazada] (.*?)\D/);
        const regCode1 = test2.match(/[(Lazada)] (.*?)\D/);

        if (regCode) {
            return regCode[1];
        } else if (regCode1) {
            return regCode1[1];
        }
        return false;
    }
    async checkBalance() {
        return await axios.get(`http://api.simthue.com/balance?key=${this.api}`);
    }

    async createService(serviceId) {
        const url = `http://api.simthue.com/request/create?key=${this.api}&service_id=${serviceId}`;

        const result = await axios.post(url);

        this.lastServiceId = serviceId;
        this.lastRequestId = result.data.id;
        return result.data.id;
    }

    async getPhone(requestId) {
        const url = `http://api.simthue.com/request/check?key=${this.api}&id=${requestId}`;
        let phoneNumber;
        while (1) {
            const resultCheck = await axios.get(url);
            if (resultCheck.data.success == true && resultCheck.data.number && !isNaN(resultCheck.data.number)) {
                phoneNumber = resultCheck.data.number;
                break;
            }
        }

        this.lastRequestId = requestId;
        this.lastPhone = phoneNumber;

        return phoneNumber;
    }

    async getCode(requestId = this.lastRequestId) {
        const url = `http://api.simthue.com/request/check?key=${this.api}&id=${requestId}`;
        let msg;
        let code;
        while (1) {
            const resultCheck = await axios.get(url);
            if (resultCheck.data.success == true && resultCheck.data.sms[0]) {
                msg = resultCheck.data.sms[0];
                code = this.regcodeLazada(msg);
                break;
            }
        }

        this.lastMsg = msg;

        this.lastCode = code;

        return code;
    }
}

module.exports = SimThue;