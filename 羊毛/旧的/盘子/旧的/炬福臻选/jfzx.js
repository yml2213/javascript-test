/*
资金盘!!!!  
炬福臻选  三天换健康包  别人实测到货
注册地址 :www.xwctldk.cn  邀请码联系我
11.	7	
------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 金钟罩
export jfzxck=" 手机号&密码"

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("炬福臻选");
const ckName = "jfzxck";
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

	if (userList.length > 0) {
		console.log("\n------- 登录 -------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.grxx("登录"));
		}
		await Promise.all(taskall);

		console.log("\n------- 积分查询 -------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.jfcx("积分查询"));
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
		this.ckValid = true;
	}

	//个人信息
	async grxx(name) {
		let options = {
			method: "get",
			url: `https://www.xwctldk.cn/api/api/config`,
			headers: {
				"Host": "www.xwctldk.cn",
				"Connection": "keep-alive",
				"Sec-Fetch-Dest": "empty",
				"Accept": "*/*",
				"X-Requested-With": "mark.via",
				"Sec-Fetch-Site": "same-origin",
				"Sec-Fetch-Mode": "cors"
			}
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			this.ssid = result.data.ssid
			await this.login("登录");
		}
	}

	// 登录
	async login(name) {
		let options = {
			method: "post",
			url: `https://www.xwctldk.cn/api/api/login`,
			headers: {
				'Content-Type': 'application/json'
			},
			body: `{"username":"${this.user}","password":"${this.mima}","ssid":"${this.ssid}"}`,

		};
		// console.log(options);
		let result = await httpRequest(name, options);
		//console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`)
			this.ssid = result.ssid
			await this.sign("签到"), await this.zp("抽奖")
		}
	}

	// 签到
	async sign(name) {
		let options = {
			method: "post",
			url: `https://www.xwctldk.cn/user/info/checkin2`,
			headers: {
				"Host": "www.xwctldk.cn",
				"Connection": "keep-alive",
				"Content-Length": "27",
				"Content-Type": "application/json;charset\u003dUTF-8"
			},
			body: `{"ssid":"${this.ssid}"}`
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
		} else if (result.code == 410) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
		}
	}

	//转盘抽奖
	async zp(name) {
		let options = {
			method: "post",
			url: `https://www.xwctldk.cn/user/prize/apply`,
			headers: {
				"Host": "www.xwctldk.cn",
				"Connection": "keep-alive",
				"Content-Length": "27",
				"Content-Type": "application/json;charset\u003dUTF-8"
			},
			body: `{"ssid":"${this.ssid}"}`
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
		} else if (result.code == 410) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
		}
	}

	// 积分查询
	async jfcx(name) {
		let options = {
			method: "post",
			url: `https://www.xwctldk.cn/user/info/index`,
			headers: {
				"Host": "www.xwctldk.cn",
				"Connection": "keep-alive",
				"Content-Length": "27",
				"Content-Type": "application/json;charset\u003dUTF-8"
			},
			body: `{"ssid":"${this.ssid}"}`
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号 ${this.user}  积分${result.data.carbon_info.total_jlz} 余额${result.data.money}`);
		} else if (result.code == 410) {
			DoubleLog(`${name}: 账号 ${this.user}  ${result.msg}`);
		}
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
