/*
牛奶优选 	cron 10 8,10,12 * * *  nnyx.js

http://niunai.mkjng.top:1003/			邀请码 88767832  40921855 

========= 青龙--配置文件--贴心复制区域  ========= 
# 牛奶优选
export nnyx=' 账号 & 密码 ' 

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("牛奶优选");
const ckName = "nnyx";
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

	console.log("\n------- 初始化 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.init("初始化"));
	}
	await Promise.all(taskall);

	console.log("\n------- 登录 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.login("登录"));
	}
	await Promise.all(taskall);

	console.log("\n------- 抽奖 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.lottery("抽奖"));
	}
	await Promise.all(taskall);


	console.log("\n------- 用户名 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.user_info("用户名"));
	}
	await Promise.all(taskall);



	console.log("\n------- 余额查询 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.userindex("余额查询"));
	}
	await Promise.all(taskall);

}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.valid = false;

		this.ck = str.split('&')
		this.ip = this.ck[0]
		this.pa = this.ck[1]

	}

	async init(name) {
		let options = {
			method: "get",
			url: `http://niunai.mkjng.top:1003/login.html?login=1`,
			headers: {
				"Pragma": "no-cache",
				"Proxy-Connection": "keep-alive",
				'Upgrade-Insecure-Requests': 1,
			},
		}

		let res = await login_Request(name, options);
		// console.log(res.body);
		let result = res.body

		if (result) {
			this._token = result.split('_token:"')[1].split('",')[0]
			this.y = res.headers['set-cookie'][1]
			// console.log(this._token, this.y);
		}
	}



	//登录
	async login(name) {
		let options = {
			method: "Post",
			url: `http://niunai.mkjng.top:1003/login.html`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Cookie': this.y,
				'X-Requested-With': 'XMLHttpRequest'
			},
			body: `_token=${this._token}&username=${this.ip}&password=${this.pa}`
		};

		let result = await httpRequest(name, options);
		// console.log(res);
		// let result = JSON.parse(res.body)

		if (result.status == 0) {
			console.log(`账号 [${this.index}] ` + result.msg)
			// this.y = res.headers['set-cookie'][1]
			await wait(2)
		}
		if (result.status !== 0) console.log(`账号 [${this.index}] ` + result)

	}


	async userindex(name) {
		let options = {
			method: "get",
			url: `http://niunai.mkjng.top:1003/user/withdraw.html`,
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
			url: `http://niunai.mkjng.top:1003/user/index.html`,
			headers: {
				'Cookie': this.y
			},
		};

		let result = await httpRequest(name, options);
		if (result) {
			this.urer_name = result.split('<span>账号：')[1].split('<')[0]
		}

	}

	// { state: 1, msg: '恭喜您抽中2元现金', index: 1, levelwheels: 1, clicks: 0 }
	async lottery(name) {
		let options = {
			method: "get",
			url: `http://niunai.mkjng.top:1003/user/wheel/click`,
			headers: {
				'Cookie': this.y
			},
		};
		let result = await httpRequest(name, options);

		switch (result.state) {
			case 1: DoubleLog(`账号 [${this.index}]  ${name}: ${result.msg}, index ${result.index}`);
				break;
			case 0: DoubleLog(`账号 [${this.index}]  ${name}: ${result.msg}`);
				break;
			default: DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
				break;
		}

	}




}





var request = require("request");

async function login_Request(name, options) {
	return new Promise((resolve) => {
		if (!name) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			name = matches[1];
		}
		request(options, function (error, response) {
			if (error) throw new Error(error);
			// response.body
			// console.log(response.headers['set-cookie']);
			resolve(response);

		});
	});
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
