/*
兔宝宝  小程序

cron 10 8,10 * * *  tbb.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 兔宝宝
export tbb=' token & token ' 

抓  www.tubaobao.com  的 token

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/


const utils = require("yml2213-utils");
const $ = new Env("兔宝宝");
const ckName = "tbb";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1;		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = '';
let host, hostname;
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
//---------------------- 自定义变量区域 -----------------------------------

let app_id = 14;
let text = sign = '';
//---------------------------------------------------------

async function start() {


    console.log('\n================== 用户信息 ==================\n');
    taskall = [];
    for (let user of userList) {
        taskall.push(user.user_info('用户信息'));
    }
    await Promise.all(taskall);





}


class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.token = str;
    }

    async signin(name) { //签到
        let options = {
            method: "post",
            url: `https://www.tubaobao.com/mini/index/sign`,
            headers: {
                'charset': 'utf-8',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'token': this.token
            }
        };

        // console.log(options);
        let res = await httpRequest(name, options);

        // console.log(res);
        if (res.flag == 1) {
            DoubleLog(`账号[${this.index}]  ${name}" ${res.msg}, 签到天数 ${result.data.day}, 其他:${JSON.parse(res.extra)}`);
            await wait(2);
        } else if (res.flag == -1) {
            DoubleLog(`账号[${this.index}]  ${name}" ${res.msg}`);
            await wait(2);
        } else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(res);

    }




    async user_info(name) { // 用户信息

        let options = {
            method: "post",
            url: `https://www.tubaobao.com/mini/index/user_profile`,
            headers: {
                'charset': 'utf-8',
                'content-type': 'application/x-www-form-urlencoded'
            },
            form: {
                'token': this.token
            }
        };

        // console.log(options);
        let res = await httpRequest(name, options);

        // console.log(res);
        if (res.flag == 1) {
            DoubleLog(`账号[${this.index}]   ${res.data.user_nickname}, 手机号: ${utils.phone_num(res.data.user_phone)}, 积分 ${res.data.user_score}, 邀请码 ${res.data.user_invite_code} `);
            await wait(2);
            await this.signin('签到');
        } else DoubleLog(`账号[${this.index}]  ${name} 失败❌了呢`), console.log(res);
    }


}

!(async () => {
    if (!(await checkEnv())) return;
    if (userList.length > 0) {
        await start();
    }
    await SendMsg(msg);
})()
    .catch((e) => console.log(e))
    .finally(() => $.done());


// #region ********************************************************  固定代码  ********************************************************


// 变量检查与处理
async function checkEnv() {
    if (userCookie) {
        // console.log(userCookie);
        let e = envSplitor[0];
        for (let o of envSplitor)
            if (userCookie.indexOf(o) > -1) {
                e = o;
                break;
            }
        for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
        userCount = userList.length;
    } else {
        console.log("未找到CK");
        return;
    }
    return console.log(`共找到${userCount}个账号`), !0;
}



// =========================================== 不懂不要动 =========================================================
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

