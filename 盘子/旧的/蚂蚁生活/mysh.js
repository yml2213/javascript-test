/*
资金盘!!!!  
蚂蚁生活
注册地址 :antw.c3xsx0t.shop  478525
11.	7	
------------------------  青龙--配置文件-贴心复制区域  ---------------------- 

export myshck=" 手机号&密码"


*/

const utils = require("yml2213-utils");
const $ = new Env("蚂蚁生活");
const ckName = "myshck";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = "";
// let httpRequest
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------


const rename = '杨梦磊';//填入身份证姓名 仅支持同名身份证
let sfzarr = ['513127198009101620']; //填入数组格式 身份证信息
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

    if (userList.length > 0) {
        console.log("\n------- 登录 -------\n");
        taskall = [];
        for (let user of userList) {
            taskall.push(user.login("登录"));
        }
        await Promise.all(taskall);

        console.log("\n------- 余额查询 -------\n");
        taskall = [];
        for (let user of userList) {
            taskall.push(user.jfcx("余额查询"));
        }
        await Promise.all(taskall);
    }
}

class UserInfo {
    constructor(str) {
        this.nickname = ++userIdx;
        this.valid = false;
        ck = str.split("&");
        this.user = ck[0];
        this.mima = ck[1];
        this.sfz = randomArr(sfzarr);
        this.ckValid = true;
    }


    // 登录
    async login(name) {
        let options = {
            method: "post",
            url: `https://antw.c3xsx0t.shop/api/login`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: `{"username":"${this.user}","password":"${this.mima}"}`,
        };
        //console.log(options);
        let result = await httpRequest(name, options);
        // console.log(result);
        if (result.code == 0) {
            this.token = result.data.token;
            if (result.data.is_real == 0) {
                console.log(`${name}: 账号 ${this.user}  未实名 去实名`);
                await this.verify("实名");
            }
            await this.sign("签到");
            for (let c = 0; c < 3; c++) {
                await this.zp("抽奖");
            }
        } else {

        }
    }
    //实名
    async verify(name) {
        let options = {
            method: "post",
            url: `https://antw.c3xsx0t.shop/api/member/verify`,
            headers: {
                "Host": "antw.c3xsx0t.shop",
                "Connection": "keep-alive",
                "Content-Length": "58",
                "Accept": "application/json, text/plain, */*",
                "Origin": "https://antw.c3xsx0t.shop",
                "Sec-Fetch-Dest": "empty",
                "token": `${this.token}`,
                "X-Requested-With": "com.mayishenghuo.bb",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Referer": "https://antw.c3xsx0t.shop/home",
                "Accept-Encoding": "gzip, deflate",
                // "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "Cookie": `ant-token=${this.token}`
            },
            body: `{"id_number":"${this.sfz}","real_name":"${rename}"}`
        };
        //	console.log(options)
        let result = await httpRequest(name, options);
        //console.log(result);
        if (result.code == 0) {
            DoubleLog(`${name}: 账号 ${this.user}  实名成功`);
            await this.sign("签到"), await this.zp("抽奖");
        } else if (result.code == 10001) {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
        }
    }

    // 签到
    async sign(name) {
        let options = {
            method: "post",
            url: `https://antw.c3xsx0t.shop/api/sign/sign`,
            headers: {
                "Host": "antw.c3xsx0t.shop",
                "Connection": "keep-alive",
                "Content-Length": "0",
                "Accept": "application/json, text/plain, */*",
                "Origin": "https://antw.c3xsx0t.shop",
                "Sec-Fetch-Dest": "empty",
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36",
                "token": `${this.token}`,
                "X-Requested-With": "com.mayishenghuo.bb",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Referer": "https://antw.c3xsx0t.shop/home",
                "Accept-Encoding": "gzip, deflate",
                // "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "Cookie": `ant-token=${this.token}`
            },
            body: ``
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 0) {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.data.msg}`);
        } else if (result.code == 10001) {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
        }
    }

    //转盘抽奖
    async zp(name) {
        let options = {
            method: "post",
            url: `https://antw.c3xsx0t.shop/api/luck_wheel/lottery`,
            headers: {
                "Host": "antw.c3xsx0t.shop",
                "Connection": "keep-alive",
                "Content-Length": "0",
                "Accept": "application/json, text/plain, */*",
                "Origin": "https://antw.c3xsx0t.shop",
                "Sec-Fetch-Dest": "empty",
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36",
                "token": `${this.token}`,
                "X-Requested-With": "com.mayishenghuo.bb",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Referer": "https://antw.c3xsx0t.shop/home",
                "Accept-Encoding": "gzip, deflate",
                // "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "Cookie": `ant-token=${this.token}`
            },
            body: ``
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 0) {
            DoubleLog(`${name}: 账号 ${this.user}  ${result.data.msg}`);
        } else if (result.code == 10001) {
            DoubleLog(`${name}: 账号 ${this.user}  今日已抽奖`);
        }
    }

    // 积分查询
    async jfcx(name) {
        let options = {
            method: "get",
            url: `https://antw.c3xsx0t.shop/api/member/info`,
            headers: {
                "Host": "antw.c3xsx0t.shop",
                "Connection": "keep-alive",
                "Content-Length": "0",
                "Accept": "application/json, text/plain, */*",
                "Origin": "https://antw.c3xsx0t.shop",
                "Sec-Fetch-Dest": "empty",
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36",
                "token": `${this.token}`,
                "X-Requested-With": "com.mayishenghuo.bb",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-Mode": "cors",
                "Referer": "https://antw.c3xsx0t.shop/home",
                "Accept-Encoding": "gzip, deflate",
                // "Accept-Language": "zh-CN,zh;q\u003d0.9,en-US;q\u003d0.8,en;q\u003d0.7",
                "Cookie": `ant-token=${this.token}`
            },

        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 0) {
            DoubleLog(`${name}: 账号 ${this.user} 可提现 ${result.data.balance}`);
        } else {
        }
    }
}
function randomArr(arr) {
    return arr[parseInt(Math.random() * arr.length, 10)];
}

// #region ********************************************************  固定代码  ********************************************************

!(async () => {
    if (!(await checkEnv())) return;
    if (userList.length > 0) {
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());

///////////////////////////////////////////////////////////////////

async function checkEnv() {
    if (userCookie) {
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
        // console.log(n);
        userCount = userList.length;
        // console.log(userList);
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${userCount}个账号`), !0;
}

// =========================================== 不懂不要动 =========================================================
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

//#endregion
