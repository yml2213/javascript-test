/*
陆金所  app 
cron 10 7 * * *  ljs.js

10.11		完成签到,抽奖,抢购(自己添加自己的地址)

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 陆金所
export ljs=" cookie  @ cookie  "

多账号用 换行 或 @ 分割

抓  m.lu.com  中的参数   cookie 

报错的自己下载 utils.js  放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  

*/
const utils = require("./utils");
const $ = new Env("陆金所");
const alias_name = "ljs";
// const request = require('request');
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.1";
let Change = "\n报错的自己下载 utils.js  放在脚本同级目录下\n完成签到,抽奖";
let thank = `\n感谢 心雨大佬脚本\n`;
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	// let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n📌 本地脚本: V ${VersionCheck}`;
	DoubleLog(`${Version}\n📌 🆙 更新内容: ${Change}`);
	// DoubleLog(`${thank}`);
	await utils.yiyan()
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
}

async function start() {
	const ljs = new Hyfls(ck[0]);
	await ljs.do_sign("签到");
}

class Hyfls {
	constructor(cookie) {
		this.cookie = cookie;
	}

	// 签到信息   get
	async sign_info(name) {
		let options = {
			method: "get",
			url: `https://m.lu.com/h5-member/integral-server/integral-info`,
			headers: {
				'Cookie': this.cookie
			},
		};
		let result = await network_request(name, options);

		if (result.code == '0000' && result.result.signinInfo.serialSignedDays == 0) {
			DoubleLog(`${name}: 未签到 ,去签到喽!`);
			await this.do_sign("签到")
		} else if (result.code == '0000' && result.result.signinInfo.serialSignedDays == 1) {
			DoubleLog(`${name}: 已签到, 明天再来吧!`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 签到    post  
	async do_sign(name) {
		let options = {
			method: "post",
			url: `https://m.lu.com/h5-member/integral-server/sign-in`,
			headers: {
				'Cookie': this.cookie
			},
			form: {
				'ct': 'APP',
				'm1': '',
				'version': '8.29.0'
			}
		};
		let result = await network_request(name, options);

		if (result.code == '0000') {
			DoubleLog(`${name}: 获得${result.result.receivePoints} 积分(${result.result.basicPoints}), 累计签到天数:${result.result.serialSignedDays} 天`);
			await utils.wait(3);
		} else if (result.code == '1111') {
			DoubleLog(`${name}:${result.message}`);
		} else {
			DoubleLog(`${name}: 失败❌了呢`);
			console.log(result);
		}
	}
}















// #region ********************************************************  固定代码  ********************************************************

/**
 * 账号处理
 */
!(async () => {
	let ckArr = await utils.checkEnv(ckStr, alias_name);
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		DoubleLog(`\n-------- 开始【第 ${num} 个账号】--------`);
		ck = ckArr[index].split("&");
		await start();
	}
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

