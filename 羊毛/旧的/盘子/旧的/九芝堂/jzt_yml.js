/*
九芝堂  盘子 自己玩就行    cron 10 8,10,12 * * *  jzt.js

11.7		yml改

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 九芝堂
export jztck=" phone & pwd "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("九芝堂");
const ckName = "jztck";
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

	console.log("\n------- 登陆和签到 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.cashck("登陆和签到"));
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.valid = false;

		let ck = str.split("&");
		this.username = ck[0];
		this.password = ck[1];

	}

	//登录
	async cashck(name) {
		let options = {
			method: "post",
			url: `https://api.coincheckusq.xyz//login`,
			headers: {
				"Host": "api.coincheckusq.xyz",
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				'username': this.username,
				'password': this.password
			}
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号 ${this.index}  ${name}:  ${result.msg}`);
			this.token = result.data.token;
			await this.sign("签到"), await this.total("余额");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	async sign(name) {
		let options = {
			method: "post",
			url: `https://api.coincheckusq.xyz//sign`,
			headers: {
				"Host": "api.coincheckusq.xyz",
				'authorization': `Bearer ${this.token}`
			},
			body: `integral=0`
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号 ${this.index}  ${name}: ${result.data}`);
		} else if (result.code == 1) {
			DoubleLog(`账号 ${this.index}  ${name}: ${result.msg}`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}


	async total(name) {
		let options = {
			method: "get",
			url: `https://api.coincheckusq.xyz//total`,
			headers: {
				"Host": "api.coincheckusq.xyz",
				'authorization': `Bearer ${this.token}`
			},
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`账号 ${this.index}  ${name}: 可提现 ${result.data.total_assets} 元`);
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
