/*
爱思百货-注册机 
cron 10 8 * * *  asbh_reg.js

10.12		自己注册米云的账号   然后填写自己 apiname  账号密码 即可
------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 爱思百货-注册机
export asbh_reg=" apiname & pwd @ apiname & pwd   "

多账号用 换行 或 @ 分割
报错的自己下载 utils.js  放在脚本同级目录下
tg频道: https://t.me/yml2213_tg  
*/


//-------------------- 配置区域 --------------------
const reg_num = '7'  			//注册数量

const phone_zz = '13326283457'    // 注册手机号





const $ = new Env("爱思百货-注册机");
const utils = require("yml2213-utils");

const alias_name = "asbh_reg";

const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.1";
let Change = "\n自己注册米云的账号   然后填写自己 apiname  账号密码 即可";
let thank = `\n感谢 心雨大佬脚本\n`;
//---------------------------------------------------------------------------------------------------------



async function start() {
	const asbh_reg = new Asbh_reg();
	// await asbh_reg.init("初始化");
	await asbh_reg.login("获取my_token");
	if (ck_status) {
		for (index = 0; index < reg_num; index++) {
			// await asbh_reg.register("注册");
		}
		DoubleLog(`账号信息\n\n`)
		DoubleLog(reg_data)
		DoubleLog(`\n\n`);


	}
}

let my_token = mobile = code = reg_data = user_token = ''
class Asbh_reg {
	constructor() {

	}





	// 发送验证码  post    https://multi.mallgo.net.cn/api/sms/send
	async send_code(name) {
		let options = {
			method: "post",
			url: `https://multi.mallgo.net.cn/api/sms/send`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
			},
			body: JSON.stringify({
				"mobile": mobile,
				"key": "ZCYZ",
				"client": 6
			})
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}, 等待 30 秒`);
			await utils.wait(30)
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}, 等待 5 秒 ,尝试重新注册!`);
			await utils.wait(5)
			await this.register("注册");
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 获取验证码  get    http://api.miyun.pro/api/get_message?token=你的token&project_id=项目ID&phone_num=取卡返回的手机号
	async get_code(name) {
		let options = {
			method: "get",
			url: `http://api.miyun.pro/api/get_message?token=${my_token}&project_id=69828&phone_num=${mobile}`,
			headers: {},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.message == 'ok' && result.code != "") {
			DoubleLog(`${name}: 成功, 当前号码 ${mobile}, 本次验证码 ${result.code}`);
			code = result.code
			return code
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
			DoubleLog(`等待 5 秒 ,尝试重新注册!`);
			await utils.wait(5)
			await this.register("注册");
		}
	}



	// 注册  post   https://multi.mallgo.net.cn/api/account/register
	async register(name) {
		console.log(`\n================================================\n开始 第${index + 1}次${name}`);
		mobile = phone_zz
		await this.send_code('发送验证码')
		await this.get_code('获取验证码')

		let pwd = utils.randomszxx(8)
		let options = {
			method: "post",
			url: `https://multi.mallgo.net.cn/api/account/register`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				// 'token': token
			},
			body: JSON.stringify({
				"mobile": mobile,
				"password": pwd,
				"code": code,
				"client": 6
			})
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`成功: 本次账号信息: ${mobile}&${pwd}`)
			user_token = result.data.token
			reg_data += `${mobile}&${pwd}$${user_token}\n`
			console.log(`\n${reg_data}\n`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}
}















// #region ********************************************************  固定代码  ********************************************************

/**
 * 账号处理
 */
!(async () => {
	// let ckArr = await utils.checkEnv(ckStr, alias_name);
	// await tips(ckArr);

	await start();
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());

/**
 * 发送消息
 */
async function SendMsg(message) {
	if (!message) return;
	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require("./sendNotify");
			await notify.sendNotify($.name, message);
		} else {
			console.log($.name, "", message);
		}
	} else {
		console.log(message);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

// 网络请求   network_request
async function network_request(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	DoubleLog(`\n开始 ${name}`);
	try {
		let result = await utils.httpRequest(name, options);
		if (result) {
			return result
		} {
			DoubleLog(`未知错误(1`)
		}
	} catch (error) {
		console.log(error);
	}
}


// 精简 Env
function Env(name, e) {
	class s {
		constructor(name) {
			this.env = name;
		}
	}
	return new (class {
		constructor(name) {
			(this.name = name),
				(this.logs = []),
				(this.startTime = new Date().getTime()),
				this.log(`\n🔔${this.name}, 开始!`);
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports;
		}

		log(...name) {
			name.length > 0 && (this.logs = [...this.logs, ...name]),
				console.log(name.join(this.logSeparator));
		}

		done() {
			const e = new Date().getTime(),
				s = (e - this.startTime) / 1e3;
			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`)
		}
	})(name, e);
}

//#endregion

