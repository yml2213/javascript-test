/*
蒙牛-注册机 


报错的自己安装  yml2213-utils 依赖

tg频道: https://t.me/yml2213_tg  
*/

//-------------------- 配置区域 --------------------
const reg_num = "30"; //注册数量
let regcode = "471836"; //邀请码  471836
let host = "app.mengniumuchangdny.com";
let hostname = "https://" + host;
// -----------------------------------------------

const utils = require("yml2213-utils");
const $ = new Env("蒙牛-注册机");
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let ck = msg = "";
//---------------------- 自定义变量区域 -----------------------------------
let index = 1;
let reg_data = ''

//---------------------------------------------------------------------------------------------------------

async function start() {
	let user = new UserInfo(index);
	for (let index = 0; index < reg_num; index++) {
		await user.register("注册", index + 1);
	}
	console.log(`账号信息\n\n`);
	console.log(reg_data);
	console.log(`\n\n`);

}

class UserInfo {
	constructor(str) {
		this.index = str;
		this.hostname = "https://" + host;
		this.regcode = regcode;
	}
	// 获取验证码  get     https://app.mengniumuchangdny.com/api/v1/verify?
	async get_code(name) {
		let options = {
			method: "get",
			url: `${hostname}/api/v1/verify?`,
			headers: {},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0 && result.data.captcha != "") {
			DoubleLog(`${name}: 成功, 本次验证码 ${result.data.captcha}`);
			this.code = result.data.captcha;
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
			DoubleLog(`等待 5 秒, 尝试重新注册!`), await wait(5);
			await this.register("注册");
		}
	}

	async phone(name) {
		let a = new Array("130", "131", "132", "133", "135", "136", "137", "138", "139", "151", "152", "158", "166", "170", "177", "179", "181", "187", "189"),
			d = parseInt(a.length * Math.random()),
			b = a[d];
		for (let c = 0; c < 8; c++) b += Math.floor(10 * Math.random());
		if (b.length == 11) {
			DoubleLog(`${name}: 成功, 当前号码 ${b}`);
			this.phone_code = b
		}
	}

	// 注册  post   https://app.mengniumuchangdny.com/api/v1/register
	async register(name, index) {
		console.log(`\n================================================\n开始 第 ${index}次 ${name}`);
		await this.phone("获取手机号");
		await this.get_code("获取验证码");
		let pwd = utils.randomszxx(8);
		let options = {
			method: "post",
			url: `${hostname}/api/v1/register`,
			headers: {
				"Content-Type": 'application/json; charset=utf-8',
			},

			body: JSON.stringify({
				"captcha": this.code,
				"password": pwd,
				"password2": pwd,
				"code": this.regcode,
				"username": this.phone_code,
			})
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}, 本次账号信息: ${this.phone_code}&${pwd}`);
			reg_data += `${this.phone_code}&${pwd}\n`;
			await wait(3)
			// console.log(`\n${reg_data}\n`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}
}

// #region ********************************************************  固定代码  ********************************************************

!(async () => {
	// if (!(await checkEnv())) return;
	await start();
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());

///////////////////////////////////////////////////////////////////


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
async function httpRequest(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	try {
		let result = await utils.httpRequest(name, options);
		if (result) {
			return result;
		}
		{
			DoubleLog(`未知错误(1)`);
		}
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
