const axios = require('axios');
const {appRun,appKill,appState,appInfo} = at;


function tap(x, y) {
    at.touchDown(0, x, y);
    at.usleep(16000);
    at.touchUp(0, x, y);
}

function waitSeconds(seconds) {
    at.toast(`Wait ${seconds}s!`);
    at.usleep(seconds * 1000000);
}

function screenShotRegion(region) {
    at.screenshot(``, region);
    at.toast(`Da chup hinh region`);
}

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
        const regCode = msg.match(/Lazada] (.*?)\D/);
        const regCode1 = msg.match(/[(Lazada)] (.*?)\D/);

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

    createService(serviceId){
        const url = `http://api.simthue.com/request/create?key=${this.api}&service_id=${serviceId}`;

        return axios.post(url).then(response =>{
            if (response.data.success == true)
            {
                this.lastRequestId = response.data.id;
                return response.data.id;
            }
        }).catch(error =>{
            return Promise.reject(error);
        })
    }
    getPhone(requestId) {
        const url = `http://api.simthue.com/request/check?key=${this.api}&id=${requestId}`;
        return axios.get(url).then(response =>{
            this.lastPhone = response.data.number;
            return response.data;
        }).catch(error =>{
            return Promise.reject(error);
        });
    }

    getCode(requestId = this.lastRequestId) {
        const url = `http://api.simthue.com/request/check?key=${this.api}&id=${requestId}`;
        return axios.get(url).then(response =>{
            let msg = response.data.sms[0];
            let code = this.regcodeLazada(msg);
            this.lastCode = code; 
            return code;
        }).catch(error =>{
            return Promise.reject(error);
        });

    }
}

class Lazada {
    constructor() {
        this.username = '';
        this.password = '';
        this.isRegister = false;
        this.fullName = '';
        this.lastRequestId = 'RT88JzQw-x80';
        this.lastCode = '';
    }
    regcodeLazada(msg) {
        const regCode = msg.match(/Lazada] (.*?)\D/);
        const regCode1 = msg.match(/[(Lazada)] (.*?)\D/);

        if (regCode) {
            return regCode[1];
        } else if (regCode1) {
            return regCode1[1];
        }
        return false;
    }
    
    clickButton(options, duration = 10) {
        let index = 0;
        at.findColors({
            options,
            duration: duration,
            interval: 2000, // lap moi giay
            exitIfFound: true,
            eachFindingCallback: () => {
                at.toast(`Cho ${index+1}s!`, 1);
                index += 1;
            },
            foundCallback: result => {
                at.toast(`Tim thay button`, 2);
                index = 0;
                at.usleep(100000);
                at.toast(`Click button`, 1);
                at.tap(result[0]['x'], result[0]['y']);
            },
            errorCallback: error => {
                alert(error);
            },
            completedCallback: () => {
                console.log('findImage compeleted!');
            },
            block: true, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
        });
    }

    findIconDone(options) {
        let index = 0;
        at.findColors({
            options,
            duration: 10,
            interval: 1000, // lap moi giay
            exitIfFound: true,
            eachFindingCallback: () => {
                at.toast(`Cho ${index+1}s!`, 1);
                index += 1;
            },
            foundCallback: result => {
                at.toast(`Done`, 2);
                index = 0;
                at.usleep(100000);
            },
            errorCallback: error => {
                alert(error);
            },
            completedCallback: () => {
                console.log('findImage compeleted!');
            },
            block: true, // OPTIONAL, you want to run findColors asynchronously or synchronously, block=true means it will run synchronously and block here till completed, default is false, doesn't block here.
        });
    }

    runAppXoaInfo() {
        // run App XoaInfo
        at.toast("Run App XoaInfo", 1);
        at.appRun("com.ienthach.XoaInfo");

        // config options
        const optionsButtonRRS = {
            colors: [{
                    color: 16618503,
                    x: 0,
                    y: 0
                },
                {
                    color: 16618761,
                    x: 6,
                    y: 112
                },
                {
                    color: 16777215,
                    x: 89,
                    y: 117
                },
                {
                    color: 16777215,
                    x: 85,
                    y: 23
                },
                {
                    color: 0,
                    x: 83,
                    y: 66
                },
            ],
            region: {
                x: 148.94,
                y: 367.61,
                width: 185.92,
                height: 170.07
            },
            count: 10,
            debug: false,
        };
        // call function
        this.clickButton(optionsButtonRRS,10);

        const optionsIconDone = {
            colors: [{
                    color: 15329770,
                    x: 0,
                    y: 0
                },
                {
                    color: 15329769,
                    x: 8,
                    y: 158
                },
                {
                    color: 15329769,
                    x: 137,
                    y: 160
                },
                {
                    color: 15329769,
                    x: 155,
                    y: 28
                },
                {
                    color: 16777215,
                    x: 89,
                    y: 31
                },
            ],
            region: {
                x: 441.55,
                y: 1123.94,
                width: 229.23,
                height: 202.82
            },
            count: 10,
            debug: false,
        };
        // Call function wait Done
        this.findIconDone(optionsIconDone);
    }

    runAppLazada() {
        // run App Lazada
        at.toast("Run App Lazada", 1);
        at.appRun("com.LazadaSEA.Lazada");
        waitSeconds(3);
        // click button Tieng Viet
        const optionsButtonLanguage = {
            colors: [{
                    color: 15953697,
                    x: 0,
                    y: 0
                },
                {
                    color: 15558682,
                    x: 9,
                    y: 69
                },
                {
                    color: 15493145,
                    x: 181,
                    y: 74
                },
                {
                    color: 15888161,
                    x: 183,
                    y: 4
                },
                {
                    color: 16777215,
                    x: 91,
                    y: 34
                }
            ],
            region: {
                x: 406,
                y: 2050,
                width: 300,
                height: 170.07
            },
            count: 10,
            debug: false,
        }
        let index = 0;
        this.clickButton(optionsButtonLanguage, 5);
        at.usleep(1000000);
        // click button Dong Y
        const optionsButtonAgree = {
            colors: [{
                    color: 15953697,
                    x: 0,
                    y: 0
                },
                {
                    color: 15558682,
                    x: 2,
                    y: 63
                },
                {
                    color: 15953953,
                    x: 188,
                    y: -1
                },
                {
                    color: 15558681,
                    x: 189,
                    y: 66
                },
                {
                    color: 16777215,
                    x: 166,
                    y: 44
                },
                {
                    color: 16777215,
                    x: 165,
                    y: 46
                }
            ],
            region: {
                x: 450,
                y: 2148,
                width: 300,
                height: 202.82
            },
            count: 10,
            debug: false,
        };

        this.clickButton(optionsButtonAgree);
        at.usleep(1000000);
        // Click button bo qua
        const optionsButtonBoQua = {
            colors: [{
                    color: 1257368,
                    x: 0,
                    y: 0
                },
                {
                    color: 1256595,
                    x: 0,
                    y: 71
                },
                {
                    color: 1256595,
                    x: 102,
                    y: 75
                },
                {
                    color: 1257368,
                    x: 100,
                    y: 6
                },
                {
                    color: 16777215,
                    x: 103,
                    y: 39
                },
                {
                    color: 16777215,
                    x: 50,
                    y: 52
                }
            ],
            region: {
                x: 460,
                y: 2157,
                width: 300,
                height: 202.82
            },
            count: 10,
            debug: false,
        };

        this.clickButton(optionsButtonBoQua);
        at.usleep(1000000);
    }

    ClickButtonDangNhap(){
        // click button DangNhap
        const [result, error] = at.findColors({
            colors: [
                { color: 16777215, x: 0, y: 0 },
                { color: 14671839, x: 2, y: 77 },
                { color: 16777215, x: 54, y: 0 },
                { color: 7960953, x: 57, y: 75 },
                { color: 3355443, x: 50, y: 25 },
                { color: 6710886, x: 35, y: 58 }
            ],
            debug: false,
            region: {x: 946, y: 2189, width: 300, height: 230},
            count: 3
        });
    
        if (result != '')
        {
            at.toast('Truong hop 1');
            at.tap(result[0]['x'], result[0]['y']);
        }
        else
        {
            at.toast(`Truong hop 2`);
        }
    }

    clickButtonHome(){
        // click button Home
        const [result, error] = at.findColors({
            colors: [
                    { color: 3355443, x: 0, y: 0 },
                    { color: 6710886, x: 4, y: 53 },
                    { color: 6710886, x: 53, y: 53 },
                    { color: 3355443, x: 58, y: 4 },
                    { color: 16777215, x: 29, y: 23 }
            ],
            debug: false,
            region: {x: 21, y: 2209, width: 280, height: 200},
            count: 3
        });
    
        if (result != '')
        {
            at.toast('Truong hop 1');
            at.tap(result[0]['x'], result[0]['y']);
        }
        else
        {
            at.toast(`Truong hop 2`);
            at.tap(1014,2241);
        }
    }
    
    clickButtonCondition(optionsButton, x, y){
        
        const [result, error] = at.findColors(optionsButton);
    
        if (result != '')
        {
            at.toast('Truong hop 1');
            at.tap(result[0]['x'], result[0]['y']);
        }
        else
        {
            at.toast(`Truong hop 2`);
            if (x != 0 && y !=0)
            {
                at.tap(x,y);
            }
        }
    }

    registerLazada(){
        const optionsButtonDangNhap = {
        colors: [ // REQUIRED, colors and their relative positions
                { color: 16777215, x: 0, y: 0 },
                { color: 14671839, x: 2, y: 77 },
                { color: 16777215, x: 54, y: 0 },
                { color: 7960953, x: 57, y: 75 },
                { color: 3355443, x: 50, y: 25 },
                { color: 6710886, x: 35, y: 58 }
        ],
        count: 3, // OPTIONAL, default is 0, 0 means no limitation
        region: {x: 946, y: 2189, width: 300, height: 230}, // OPTIONAL, default is null, null means the whole screen
        debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
        rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
        bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };

        at.toast(`Click button DangNhap`);
        this.ClickButtonDangNhap(); 
        at.usleep(1000000);
        
        // config iconDaHieu
        const optionsDaHieu = {
        colors: [ // REQUIRED, colors and their relative positions
            { color: 3355443, x: 0, y: 0 },
            { color: 3355443, x: 2, y: 26 },
            { color: 16777215, x: -1, y: 30 },
            { color: 16777215, x: 119, y: 30 },
            { color: 3355443, x: 118, y: 4 }
        ],
        count: 3, // OPTIONAL, default is 0, 0 means no limitation
        region: {x: 769.01, y: 1599.30, width: 263.03, height: 103.52}, // OPTIONAL, default is null, null means the whole screen
        debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
        rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
        bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };
    
        this.clickButton(optionsDaHieu, 5);

        at.usleep(1000000);
    
        // click buttonDangKyDangNhap
        const optionsDangKy = {
            colors: [ // REQUIRED, colors and their relative positions
                    { color: 16724748, x: 0, y: 0 },
                    { color: 16777215, x: -1, y: -21 },
                    { color: 16724748, x: 62, y: -26 },
                    { color: 16724748, x: 58, y: -7 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: {x: 305.28, y: 404.58, width: 525.00, height: 85.56}, // OPTIONAL, default is null, null means the whole screen
            debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
            rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
            bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };
    
        this.clickButton(optionsDangKy, 5);

        at.usleep(1000000);
        // click buttonTaoTaiKhoan
        const optionsTaoTaiKhoan ={
            colors: [ // REQUIRED, colors and their relative positions
                    { color: 16777215, x: 0, y: 0 },
                    { color: 16740427, x: 1, y: 40 },
                    { color: 16739142, x: 37, y: 39 },
                    { color: 16777215, x: 31, y: 11 },
                    { color: 16739914, x: 14, y: 24 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: {x: 284.15, y: 1655.28, width: 303.17, height: 114.08}, // OPTIONAL, default is null, null means the whole screen
            debug: true, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
            rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
            bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };

        // this.clickButtonCondition(optionsTaoTaiKhoan, 556, 1698);
        this.clickButton(optionsTaoTaiKhoan,5);
        // config class SimThue
        at.usleep(1000000);
        at.toast(`Create request simThue`);
        const simThue = new SimThue();
        simThue.createService(46).then(result =>{
            alert(result);
        })


        // click formInputText
        const optionsInputText ={
            colors: [ // REQUIRED, colors and their relative positions
                    { color: 16739142, x: 0, y: 0 },
                    { color: 16738628, x: 22, y: 66 },
                    { color: 16668980, x: 146, y: 64 },
                    { color: 16777215, x: 135, y: 21 },
                    { color: 16777215, x: 94, y: 37 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: {x: 413.03, y: 635.92, width: 196.48, height: 103.52}, // OPTIONAL, default is null, null means the whole screen
            debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
            rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
            bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };

        this.clickButtonCondition(optionsInputText, 454, 676);

        simThue.getPhone(simThue.lastRequestId).then(result =>{
            at.inputText(result.number);
        })
        at.usleep(1000000);


        // createService = await simThue.createService(46);
        // at.toast('Get PhoneNumber');
        // const phoneNumber = await simThue.getPhone(createService);
        // at.usleep(5000000);
        // console.log(phoneNumer);
        // at.inputText(phoneNumber);
        

        // click buttonGui
        const optionsbtnGui ={
            colors: [ // REQUIRED, colors and their relative positions
                        { color: 16777215, x: 0, y: 0 },
                        { color: 16777215, x: 11, y: 56 },
                        { color: 16711680, x: 5, y: 32 },
                        { color: 16777215, x: 65, y: 51 },
                        { color: 16759739, x: 64, y: 33 },
                        { color: 16711680, x: 63, y: 26 },
                        { color: 16777215, x: 60, y: 3 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: {x: 708.80, y: 822.89, width: 239.79, height: 101.41}, // OPTIONAL, default is null, null means the whole screen
            debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
            rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
            bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };

        this.clickButton(optionsbtnGui,3);

        at.usleep(1000000);


        // click formInputCode
        const optionsInputCode ={
            colors: [ // REQUIRED, colors and their relative positions
                        { color: 16777215, x: 0, y: 0 },
                        { color: 11184810, x: 0, y: 30 },
                        { color: 16777215, x: 43, y: 28 },
                        { color: 16777215, x: 46, y: 29 },
                        { color: 16777215, x: 38, y: 0 },
                        { color: 11184810, x: 28, y: 31 }
            ],
            count: 3, // OPTIONAL, default is 0, 0 means no limitation
            region: {x: 220.77, y: 837.68, width: 242.96, height: 130.99}, // OPTIONAL, default is null, null means the whole screen
            debug: false, // OPTIONAL, default is false, true means turn on the debug mode which will produce an image showing the finding process
            rightToLeft: false, // OPTIONAL, default is false, true means do the finding from right to left of the screen
            bottomToTop: false // OPTIONAL, default is false, true means do the finding from bottom to top of the screen
        };

        this.clickButtonCondition(optionsInputCode, 246, 900);
        at.toast(`Cho get code SMS`)
        at.usleep(5000000);

        simThue.getCode(simThue.lastRequestId).then(code=>{
            at.inputText(code);
        })
        at.usleep(1000000);
        alert(simThue);
        // const getCode = await simThue.getCode(createService);
        // at.usleep(500000);
        // at.inputText(getCode);
        
    }
}


module.exports = Lazada;