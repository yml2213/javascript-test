/*
同程里程  app    cron 10 8,10,12 * * *  zzw.js

11.8		签到

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 同程里程
export tclc="token @ cookie "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("同程里程");
const ckName = "tclc";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			// 通知 : 0关闭 1为打开
let envSplitor = ["@", "\n"];
let ck = msg = "";
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------




//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

	//console.log("\n------- 签到 -------\n");
	taskall = [];
	for (let user of userList) {
		//taskall.push(user.signin("签到"));
		//await wait(1)
		taskall.push(user.luck_draw("抽奖"));
		await wait(1)
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		this.valid = false
		
		this.ck = str.split('&')
		this.token = this.ck[0]
		this.unionId = this.ck[1]
		this.openId = this.ck[2]
	}


    // 签到
	async signin(name) {
	   
		let options = {
			method: "post",
			url: `https://wx.17u.cn/wcsign/sign/SaveSignInfoNew`,
			headers: {
			    
				'Content-Type': 'application/json',
				'sectoken': this.token,
				'TCSecTk': this.token,
				'apmat': this.openId
				
			},
		
			form: {
			
			"unionId": this.unionId,
			"openId": this.openId
			
			},
		};
		//console.log(options);
		console.log(`\n------------- 开始第【${this.index}】个账号------------- `);
		let result = await httpRequest(name, options);
		
        if(result.rspCode==0){
            console.log(`\n${result.message},获得${result.data.prizes.amount}里程`);
        }else{
            console.log(result.message);
        }
		//console.log(result.message+","+"获得");
		await wait(1)

		// if (result.err_no == 0 && status == 0) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 成功, 获得 ${score} 积分`);
		// } else if (status == 2) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 已签到`);
		// } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}


// 抽奖
	async luck_draw(name) {
	   
		let options = {
			method: "post",
			url: `https://wx.17u.cn/wcrewardshopapiv2/roulette/lottery`,
			headers: {
			    
				"userKey": this.unionId,
				"openId": this.openId,
				"Content-Type": "application/json;charset=utf-8",
				"userToken": this.token
			},
		
			body: JSON.stringify({
			
				"openId": this.openId,
				"unionId": this.unionId,
				"onceFlag": true,
				"playId": "IXuH79YDGkYNShOZEHy69g==",
			}),
		};
		//console.log(options);
		let result = await httpRequest(name, options);
		console.log(result);
		//console.log(result.message+","+"获得");
		await wait(1)

		// if (result.err_no == 0 && status == 0) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 成功, 获得 ${score} 积分`);
		// } else if (status == 2) {
		// 	DoubleLog(`账号 ${this.index}  ${name}: 已签到`);
		// } else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
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
