/*
汇民购-注册机 
cron 10 8 * * *  hmg_reg_fy.js

10.12		自己注册 飞鱼 的账号   然后填写自己 用户名 username  密码 pwd   即可

飞鱼链接(带邀请): http://h5.haozhuma.com/reg.html?action=yml2213
------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 汇民购-注册机  飞鱼 username  pwd
export hmg_reg_fy=" username & pwd "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

//-------------------- 配置区域 --------------------
const reg_num = 1; 						 //注册数量
const mid = 'MzMwMTUsMHJ2MWF3dmk='       // 自己的邀请码




const utils = require("yml2213-utils");
const $ = new Env("汇民购-注册机");
const ckName = "hmg_reg_fy";
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
//---------------------- 自定义变量区域 -----------------------------------
let VersionCheck = "0.1";
let ck_status = 1;
let reg_data_pwd = ''
let reg_data_token = ''
// let token_zz_10 = ''
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {
	for (let user of userList) {
		await user.login("登录-获取 fy_token");
		if (ck_status) {
			for (index = 0; index < reg_num; index++) {
				await user.register("注册");
			}
			DoubleLog(`账号密码信息\n\n`)
			DoubleLog(reg_data_pwd)
			DoubleLog(`\n\n`);
			DoubleLog(`账号token信息\n\n`)
			DoubleLog(reg_data_token)

		}
	}
}

class UserInfo {
	constructor(str) {
		ck = str.split("&");
		this.username = ck[0];
		this.pwd = ck[1];
		this.fy_api = "api.haozhuma.com";
		this.sid = "54009";
		this.mid = mid
	}
	//   http://api.haozhuma.com/sms/?api=login&user=yml2213&pass=yml12345678
	// 获取 fy_token   get  http://服务器地址/sms/?api=login&user=用户名&pass=密码
	async login(name) {
		let options = {
			method: "get",
			url: `http://${this.fy_api}/sms/?api=login&user=${this.username}&pass=${this.pwd}`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
			this.fy_token = result.token;
			await this.fy_user_info("查询飞鱼余额");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
		return ck_status == 0;
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

	// 发送验证码  post    https://hmg.tykhrs.work/api/login/sms_verification_code?mobile=15339956683&type=login&sms_type=2
	async send_code(name) {
		let options = {
			method: "get",
			url: `https://hmg.tykhrs.work/api/login/sms_verification_code?mobile=${this.phone}&type=login&sms_type=2`,
			headers: {
				'x-requested-with': 'com.tencent.mm',
				'referer': `https://hmg.tykhrs.work/hmg/?mid=${this.mid}`,
				'content-type': 'application/json;charset=UTF-8',
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}, 等待 30 秒`);
			await wait(30);
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



	// 注册  post   https://hmg.tykhrs.work/api/login/phone_register?pid=&mobile=15339956683&verification_code=902029&password=hmg123456&pwd=hmg123456
	async register(name) {
		console.log(`\n================================================\n开始 第${index + 1}次${name}`);
		await this.get_phone_num("获取手机号");
		await this.send_code("发送验证码");
		await this.get_code("获取验证码");

		let pwd = utils.randomszxx(8);
		let options = {
			method: "get",
			url: `https://hmg.tykhrs.work/api/login/phone_register?pid=&mobile=${this.phone}&verification_code=${this.code}&password=${pwd}&pwd=${pwd}`,
			headers: {
				'x-requested-with': 'com.tencent.mm',
				'referer': `https://hmg.tykhrs.work/hmg/?mid=${this.mid}`,
				'content-type': 'application/json;charset=UTF-8',
			},

		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.code == 1) {
			DoubleLog(`成功: 本次账号信息: ${this.phone}&${pwd}`);
			let user_token = result.data.token;
			reg_data_pwd += `${this.phone}&${pwd}\n`;
			console.log(`\n${reg_data_pwd}\n`);

			reg_data_token += `$${user_token}\n`;
			console.log(`\n${reg_data_token}\n`);

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
