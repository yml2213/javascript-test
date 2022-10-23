/*
爱思百货  app  

cron 10 8,10,12,14 * * *  asbh.js

10.12		看视频,换猫豆
10.13		优化流程，缩短任务间隔
10.14       修复任务错误问题

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 爱思百货
export asbh=" phone & pwd @ phone & pwd   "

多账号用 换行 或 @ 分割

报错的自己下载 utils.js  放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  

*/
const utils = require("./utils");
const $ = new Env("爱思百货");
const alias_name = "asbh";
// const request = require('request');
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck, token_info = '';
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.3";
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
	const asbh = new Script(ck[0], ck[1]);
	await asbh.init("初始化");
	await asbh.login("登录");

}
// DoubleLog(`账号token信息\n`)
// DoubleLog(token_info)
// DoubleLog(`\n\n`);


let token, hostname, host, asbh_hd
class Script {
	constructor(phone, pwd) {
		this.phone = phone
		this.pwd = pwd
	}
	// 初始化
	async init(name) {
		if (!name) {
			name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
		}
		DoubleLog(`\n开始 ${name}`)
		host = "multi.mallgo.net.cn"
		hostname = "https://" + host

		asbh_hd = {
			'Host': 'multi.mallgo.net.cn',
			'content-type': 'application/json'
		}
	}


	// 登录   post
	async login(name) {
		let options = {
			method: "post",
			url: `${hostname}/api/account/login`,
			headers: asbh_hd,
			body: JSON.stringify({
				"mobile": this.phone,
				"password": this.pwd,
				"client": 6
			})
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}`);
			token = result.data.token
			token_info += `${token}\n`
			// console.log(token_info);
			await wait(2);
			ck_status = 1
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
			ck_status = 0
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
			ck_status = 0
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
	DoubleLog(`账号token信息\n`)
	DoubleLog(token_info)
	DoubleLog(`\n\n`);

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
 * 等待 X 秒
 */
function wait(n) {
	return new Promise(function (resolve) {
		setTimeout(resolve, n * 1000);
	});
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

