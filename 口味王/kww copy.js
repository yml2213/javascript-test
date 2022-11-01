/*
口味王  小程序 
cron 10 7 * * *  kww.js

10.27				

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 口味王
export kww=" uid @ uid "


多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg  
*/



const utils = require("yml2213-utils");
const $ = new Env("口味王");
const ckName = "kww";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1;		 //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = "";
// let httpRequest
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
//---------------------- 自定义变量区域 -----------------------------------
let VersionCheck = "0.1";
let ck_status = 1;
// let token_zz_10 = ''
//---------------------------------------------------------------------------------------------------------


async function start() {
	for (let user of userList) {
		await user.login('登录');
		if (ck_status) {
			// await user_info('用户信息');
			// await signin('签到');
			// await task_list('任务列表');
		}
	}
}

class UserInfo {
	constructor(str) {
		// ck = str.split("&");
		this.uid = str;
		this.host = "89420.activity-20.m.duiba.com.cn";
		this.hostname = 'https://' + this.host;
	}
	// 获取 fy_token   get 
	async login(name) {
		let options = {
			method: "get",
			url: `https://member.kwwblcj.com/member/api/info/?userKeys=v1.0&pageName=loginFreePlugin&formName=searchForm&uid=${this.uid}&levelCode=1&redirect=https%3A%2F%2F89420.activity-20.m.duiba.com.cn%2Fprojectx%2Fp85657820%2Findex.html%3FappID%3D89420`,
			headers: {
				'Host': 'member.kwwblcj.com',
				'charset': 'utf-8',
				'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/86.0.4240.99 XWEB/4317 MMWEBSDK/20220903 Mobile Safari/537.36 MMWEBID/8801 MicroMessenger/8.0.28.2240(0x28001C3D) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 MiniProgramEnv/android',
				'Content-Type': 'application/json',
				'Referer': 'https://servicewechat.com/wxfb0905b0787971ad/24/page-frame.html'
			},
		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.flag == 'T') {
			DoubleLog(`${name}: ${result.msg}`);
			this.login_url = result.result;
			// await this.pgy_user_info("查询蒲公英余额");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result); return ck_status == 0;
	}

	// 查询飞鱼余额  get  http://服务器地址/sms/?api=getSummary&token=令牌
	async fy_user_info(name) {
		let options = {
			method: "get",
			url: `http://${this.fy_api}/sms/?api=getSummary&token=${this.fy_token}`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`${name}: 当前余额:${result.money}`);
			if (result.money == 0) {
				return ck_status == 0;
			}
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 获取手机号  get   http://服务器地址/sms/?api=getPhone&token=用户令牌&sid=项目ID&country_code=国家代码&Province=省份&
	async get_phone_num(name) {
		let options = {
			method: "get",
			url: `http://${this.fy_api}/sms/?api=getPhone&token=${this.fy_token}&sid=${this.sid}&country_code=CN`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0 && result.phone != "") {
			DoubleLog(`${name}: ${result.msg}, 当前号码为 ${result.phone}`);
			this.phone = result.phone;
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
			await this.get_phone_num("\n重新获取手机号");
		}
	}

	// 发送验证码  post    http://www.weihuitui.org.cn/index.php/api/sms/send
	async send_code(name) {
		let options = {
			method: "post",
			url: `http://www.weihuitui.org.cn/index.php/api/sms/send`,
			headers: {
				'Pragma': "no-cache",
				"content-type": "application/x-www-form-urlencoded, application/x-www-form-urlencoded",
				"Proxy-Connection": "akeep-alive"
			},
			form: {
				mobile: this.phone,
				type: 1,
				event: "register",
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}, 等待 50 秒`);
			await wait(50);
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}, 等待 5 秒 ,尝试重新注册!`);
			await wait(5);
			await this.register("注册");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 获取验证码  get    http://服务器地址/sms/?api=getMessage&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号
	async get_code(name) {
		let options = {
			method: "get",
			url: `http://${this.fy_api}/sms/?api=getMessage&token=${this.fy_token}&sid=${this.sid}&country_code=CN&phone=${this.phone}`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.code == 0 && result.yzm != "") {
			DoubleLog(`${name}: 成功, 当前号码 ${mobile}, 本次验证码 ${result.yzm}`);
			this.code = result.yzm;
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
			await this.cancelRecv('释放手机号')
			DoubleLog(`等待 5 秒, 尝试重新注册!`);
			await wait(5);
			await this.register("注册");
		}
	}

	// 释放手机号  get    http://服务器地址/sms/?api=cancelRecv&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号
	async cancelRecv(name) {
		let options = {
			method: "get",
			url: `http://${this.fy_api}/sms/?api=cancelRecv&token=${this.fy_token}&sid=${this.sid}&country_code=CN&phone=${this.phone}`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.code == 0) {
			DoubleLog(`${name}: 成功, 当前号码 ${this.phone} 已释放`);
		} else if (result.code == -1) {
			DoubleLog(`${name}: 失败, 释放 ${this.phone} ---- ${result.msg} `);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);

	}



	// 注册  post   http://www.weihuitui.org.cn/index.php/api/user/register
	async register(name) {
		console.log(
			`\n================================================\n开始 第${index + 1
			}次${name}`
		);
		await this.get_phone_num("获取手机号");
		await this.send_code("发送验证码");
		await this.get_code("获取验证码");

		let pwd = utils.randomszxx(8);
		let options = {
			method: "post",
			url: `http://www.weihuitui.org.cn/index.php/api/user/register`,
			headers: {
				Host: "www.weihuitui.org.cn",
				"content-type":
					"application/x-www-form-urlencoded, application/x-www-form-urlencoded",
				// 'token': token
			},
			form: {
				mobile: this.phone,
				password: pwd,
				code: this.code,
				client: 6,
			},
		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.code == 1) {
			DoubleLog(`成功: 本次账号信息: ${this.phone}&${pwd}`);
			let user_token = result.data.token;
			reg_data += `${this.phone}&${pwd}$${user_token}\n`;
			console.log(`\n${reg_data}\n`);
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
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } else { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

//#endregion
