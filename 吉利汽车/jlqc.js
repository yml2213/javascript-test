/*
吉利汽车  小程序

11.5		yml改
11.16       修复评论错误


------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 吉利汽车
export jlqc="  token @ token "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("吉利汽车");
const ckName = "jlqc";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = (msg = "");
// let httpRequest
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------


//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

    console.log("\n------- 签到 -------\n");
    taskall = [];
    for (let user of userList) {
        taskall.push(user.signin("签到"));
    }
    await Promise.all(taskall);


    console.log("\n------- 任务 -------\n");
    taskall = [];
    for (let user of userList) {
        taskall.push(user.task("发帖"));
    }
    await Promise.all(taskall);

    console.log("\n------- 积分查询 -------\n");
    taskall = [];
    for (let user of userList) {
        taskall.push(user.point("积分查询"));
    }
    await Promise.all(taskall);
}

class UserInfo {
    constructor(str) {
        this.index = ++userIdx;
        this.token = str;
        this.cId = "BLqo2nmmoPgGuJtFDWlUjRI2b1b";
    }



    // 签到
    async signin(name) {
        let options = {
            method: "post",
            url: `https://app.geely.com/api/v1/user/sign/`,
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            body: ''
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}:  成功, 获得积分${result.data.score}`);
        } else if (result.code == 'error.geely.user.already.signed') {
            DoubleLog(`账号 ${this.index}  ${name}:  ${result.message}`);
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }

    // 发帖
    async task(name) {
        await this.get_text('获取评论');
        let options = {
            method: "post",
            url: `https://app.geely.com/api/v2/topicContent/create`,
            headers: {
                token: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'content': this.content_text,
                'contentType': 1
            })
        };

        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}: 成功`);
            this.id = result.data;
            await wait(10);
            await this.comment('评论帖子');
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }

    // 评论帖子
    async comment(name) {
        let options = {
            method: "post",
            url: `https://app.geely.com/api/v1/community/comment/publisherComment`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                'content': this.content_text,
                'type': 2,
                'id': this.id,
            })
        };
        // console.log(options);
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}: 成功`);
            await wait(10);
            await this.share('分享');
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }

    // 分享
    async share(name) {
        let options = {
            method: "post",
            url: `https://app.geely.com/api/v1/share/awardPoint`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: ''
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}: 成功`);
            await wait(3);
            await this.delete('删除帖子');
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }


    // 删除帖子
    async delete(name) {
        let options = {
            method: "post",
            url: `https://app.geely.com/api/v2/topicContent/deleteContent`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': this.id
            })
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}: 成功`);
            await wait(3);
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }

    // 查询分数
    async point(name) {
        let options = {
            method: "get",
            url: `https://app.geely.com/apis/api/v1/point/available`,
            headers: {
                'token': this.token,
                'Content-Type': 'application/json'
            },
        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result.code == 'success') {
            DoubleLog(`账号 ${this.index}  ${name}: 积分 ${result.data.availablePoint}==${result.data.availablePoint / 10}元`);
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }




    // 获取评论
    async get_text(name) {
        let options = {
            method: "get",
            url: `https://keai.icu/apiwyy/api`,
            headers: {},

        };
        let result = await httpRequest(name, options);

        // console.log(result);
        if (result) {
            // console.log(result.content.length);
            if (result.content.length >= 100) {
                await this.get_text('获取评论');
            } else this.content_text = result.content;
        } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
    }


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
