

/*
百佳优选  		cron 10 8,10,12 * * *  nnyx.js

baijia.axwes.top    36859884

========= 青龙--配置文件--贴心复制区域  ========= 
# 百佳优选
export bjyxck=' 账号 & 密码 ' 

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const $ = new Env("蒙牛")
const utils = require('yml2213-utils')
const ckName = 'mnck'
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : ""
const Notify = 1		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = res = result = ''
let host, hostname
let userCookie = '18831916968&a18831916968'
let userList = []
let userIdx = 0
let userCount = 0
//---------------------------------------------------------


//---------------------------------------------------------

async function start() {

	for (let user of userList) {
		await user.verify('验证码')
		await user.login('登录')
		// 	await user.lottery('抽奖')
		// 	await user.user_info('用户名')
		// 	await user.userindex('余额查询')
	}
}


class UserInfo {
	constructor(str) {
		this.index = ++userIdx
		try {
			this.ck = str.split('&')
			this.ip = this.ck[0]
			this.pa = this.ck[1]
		} catch (e) {

		}
	}

	async verify(name) {
		let options = {
			method: "get",
			url: `https://app.mengniumuchangdny.com/api/v1/verify?=`,
			headers: {
				"Host": "app.mengniumuchangdny.com",
				"Content-Type": "application/json"
			},
		};

		let result = await httpRequest(name, options);

		if (result.code == 0) {
			console.log(`账号 [${this.index}] ` + result.message)
			this.captcha = result.data.captcha
		}


	}
	async login(name) {
		let options = {
			method: "post",
			url: `https://app.mengniumuchangdny.com/api/v1/login`,
			headers: {
				"Host": "app.mengniumuchangdny.com",
				'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				"password": this.pa,
				"username": this.ip,
				"vcode": this.captcha
			})
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			console.log(`账号 [${this.index}] ` + result.msg)
			this.token = result.data.token
		}
		if (result.code !== 0) console.log(`账号 [${this.index}] ` + result)

	}


	async userindex(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top:1003/user/withdraw.html`,
			headers: {
				'Cookie': this.y
			},
		};

		let result = await httpRequest(name, options);
		if (result) {
			let x = result.match(/ <span id="userMoney">(\d+(\D+\d))/g)[1].split('>')[1]
			DoubleLog(`账号 [${this.index}]: ${this.urer_name} ${name}: ${x} 元`)
		}

	}

	async user_info(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top/user/index.html`,
			headers: {
				'Cookie': this.y
			},
		};

		let result = await httpRequest(name, options);
		if (result) {
			this.urer_name = result.split('<span>账号：')[1].split('<')[0]
		}

	}

	async lottery(name) {
		let options = {
			method: "get",
			url: `http://baijia.axwes.top:1003/user/wheel/click`,
			headers: {
				'Cookie': this.y
			},
		};
		let result = await httpRequest(name, options);
		if (result.state == 0) DoubleLog(`账号 [${this.index}]  ${name}: ${result.msg}`)
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
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////

// #region ********************************************************  固定代码  ********************************************************


// 变量检查与处理
async function checkEnv() {
	if (userCookie) {
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

function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }
 //#endregion

