/*
赚钱帮-注册机 
cron 10 8 * * *  zqb_reg.js

10.12		自己注册 蒲公英 的账号   然后填写自己 用户名 username  密码 pwd   即可

蒲公英链接(带邀请): http://www.dbnx.xyz:7391?inviteCode=E5C2SUIXHSHH

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 赚钱帮-注册机  蒲公英 username  pwd
export zqb_reg=" username & pwd "

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

//-------------------- 配置区域 --------------------
const reg_num = 1		 //注册数量

const utils = require("yml2213-utils");
const $ = new Env("赚钱帮-注册机");
const ckName = "zqb_reg";
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
//---------------------- 自定义变量区域 -----------------------------------
let VersionCheck = "0.1";
let ck_status = 1;
// let token_zz_10 = ''
//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {
	for (let user of userList) {
		await user.login("登录-获取 pgy_token");
		if (ck_status) {
			for (index = 0; index < reg_num; index++) {
				await user.register("注册");
			}
			DoubleLog(`账号信息\n\n`)
			DoubleLog(reg_data)
			DoubleLog(`\n\n`);
		}
	}
}

class UserInfo {
	constructor(str) {
		ck = str.split("&");
		this.username = ck[0];
		this.pwd = ck[1];
		this.sid = "19270";
	}
	// 获取 pgy_token   get  http://www.dbnx.xyz:7923/api/v1/login?username=xxxx&password=xxxx
	async login(name) {
		let options = {
			method: "get",
			url: `http://www.dbnx.xyz:7923/api/v1/login?username=${this.username}&password=${this.pwd}`,
			headers: {},
		};
		let result = await http_Request(name, options);

		// console.log(result);
		if (result.code == 1000) {
			DoubleLog(`${name}: ${result.msg}`);
			this.pgy_token = result.data.token;
			await this.pgy_user_info("查询蒲公英余额");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result); return ck_status == 0;
	}

	// 查询蒲公英余额  get  http://www.dbnx.xyz:7923/api/v1/getbalance?token=登录时获取的token
	async pgy_user_info(name) {
		let options = {
			method: "get",
			url: `http://www.dbnx.xyz:7923/api/v1/getbalance?token=${this.pgy_token}`,
			headers: {},
		};
		let result = await http_Request(name, options);

		// console.log(result);
		if (result.code == 1000) {
			DoubleLog(`${name}: 当前余额:${result.data.balance}`);
			if (result.data.balance == 0) {
				return ck_status == 0;
			}
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 获取手机号  get   http://www.dbnx.xyz:7923/api/v1/getphonenumber?token=你的token&projectId=14197
	async get_phone_num(name) {
		let options = {
			method: "get",
			url: `http://www.dbnx.xyz:7923/api/v1/getphonenumber?token=${this.pgy_token}&projectId=${this.sid}`,
			headers: {},
		};
		let result = await http_Request(name, options);

		// console.log(result);
		if (result.code == 1000 && result.data.mobileNo != "") {
			DoubleLog(`${name}: ${result.msg}, 当前号码为 ${result.data.mobileNo}`);
			this.phone = result.data.mobileNo;
			this.mid = result.data.mid;
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
		let result = await http_Request(name, options);

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

	// 获取验证码  get    http://www.dbnx.xyz:7923/api/v1/getsms?token=你的token&mid=xxxxx
	async get_code(name) {
		let options = {
			method: "get",
			url: `http://www.dbnx.xyz:7923/api/v1/getsms?token=${this.pgy_token}&mid=${this.mid}`,
			headers: {},
		};
		let result = await http_Request(name, options);

		console.log(result);
		if (result.code == 1000 && result.data.SMS != "") {
			DoubleLog(`${name}: 成功, 当前号码 ${this.phone}, 本次验证码 ${result.data.SMS}`);
			this.code = result.data.SMS.split('验证码')[1].split('该')[0];
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
			await this.cancelRecv('释放手机号')
			DoubleLog(`等待 5 秒, 尝试重新注册!`);
			await wait(5);
			await this.register("注册");
		}
	}

	// 释放手机号  get   http://www.dbnx.xyz:7923/api/v1/releasenumber?token=你的token&mid=xxxxxxx
	async cancelRecv(name) {
		let options = {
			method: "get",
			url: `http://www.dbnx.xyz:7923/api/v1/releasenumber?token=${this.pgy_token}&mid=${this.mid}`,
			headers: {},
		};
		let result = await http_Request(name, options);

		console.log(result);
		if (result.code == 1000) {
			DoubleLog(`${name}: 成功, 当前号码 ${this.phone} 已释放`);
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
		let result = await http_Request(name, options);

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
			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`);
		}
	})(name, e);
}
async function http_Request(name, options) {
	const request = require('request')
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	try {
		request(options, function (error, response) {
			if (error) throw new Error(error);
			console.log(response.body);
		});



		// request(options, function (error, response) {
		// 	if (error) {
		// 		console.log(error);
		// 		// throw new Error(error);
		// 	}
		// 	console.log(response);
		// 	// response.body
		// 	let data = response.body;
		// 	// console.log(typeof (data));
		// 	if (typeof data == "string") {
		// 		if (isJsonString(data)) {
		// 			let result = JSON.parse(data);
		// 			resolve(result);
		// 		} else {
		// 			let result = data;
		// 			resolve(result);
		// 		}
		// 		function isJsonString(str) {
		// 			if (typeof str == "string") {
		// 				try {
		// 					if (typeof JSON.parse(str) == "object") {
		// 						return true;
		// 					}
		// 				} catch (e) {
		// 					return false;
		// 				}
		// 			}
		// 			return false;
		// 		}
		// 	} else {
		// 		let result = data;
		// 		resolve(result);
		// 	}

		// });

	} catch (error) {
		console.log(error);
	}
}
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
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
}
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

//#endregion
