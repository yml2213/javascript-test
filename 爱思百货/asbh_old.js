/*
爱思百货  app

cron 10 8,14,18 * * *  asbh.js

10.12		看视频,换猫豆

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
	const asbh = new Hyfls(ck[0], ck[1]);
	await asbh.init("初始化");
	await asbh.login("登录");
	if (ck_status) {
		await asbh.user_info("用户信息");
		await asbh.task_list("任务列表");
	}
}

let token, hostname, host, asbh_hd
class Hyfls {
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
			await utils.wait(2);
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


	// 用户信息  get    https://multi.mallgo.net.cn/api/user/center
	async user_info(name) {
		let options = {
			method: "get",
			url: `${hostname}/api/user/center`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': token
			},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`${name}: 欢迎 ${result.data.nickname}, 手机号 ${utils.phone_num(result.data.mobile)}, 余额 ${result.data.user_money}, 等级 ${result.data.level}, 邀请码 ${result.data.distribution_code}`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}


	// 任务列表  get   https://multi.mallgo.net.cn/api/bountyTask/lists
	async task_list(name) {
		let options = {
			method: "get",
			url: `${hostname}/api/bountyTask/lists`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': token
			},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			let tasks = result.data
			for (let index = 0; index < tasks.length; index++) {
				DoubleLog(`${tasks[index].title}: ${tasks[index].period_start}--${tasks[index].period_end}, 完成情况:${tasks[index].accomplish}/${tasks[index].view_num}`)
				let num = `${tasks[index].view_num - tasks[index].accomplish}`
				if (num) {
					await this.task(tasks[index].title, tasks[index].id, num)
				}
			}
		} else if (result.code == 0) {
			DoubleLog(`${name}: ${result.msg}`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}


	// 任务分配   get
	async task(name, id, num) {
		// console.log(`任务名字${name},  任务id${id},  任务剩余数量${num}\n`);
		let body1 = {
			"start_time": "06:00",
			"end_time": "12:00",
			"id": 1
		}
		let body2 = {
			"start_time": "12:00",
			"end_time": "18:00",
			"id": 2
		}
		let body3 = {
			"start_time": "18:00",
			"end_time": "23:59",
			"id": 3
		}
		let h = utils.local_hours()
		// console.log(`当前时间${h}`);
		if (h >= 6 && h < 12 && id == 1 && num > 0) {
			for (let index = 0; index < num; index++) {
				await this.validityPeriod(name, body1, id)
			}
		} else if (h >= 12 && h < 18 && id == 2 && num > 0) {
			for (let index = 0; index < num; index++) {
				await this.validityPeriod(name, body2, id)
			}
		} else if (h >= 18 && h < 23 && id == 3 && num > 0) {
			for (let index = 0; index < num; index++) {
				await this.validityPeriod(name, body3, id)
			}
		}
	}



	// 看视频 1   post   https://multi.mallgo.net.cn/api/bountyTask/validityPeriod
	async validityPeriod(name, body, id) {
		let options = {
			method: "post",
			url: `${hostname}/api/bountyTask/validityPeriod`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': token
			},
			body: JSON.stringify(body)
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`等待 5 秒`)
			await utils.wait(5)
			await this.browseAd(name, id)
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 看视频 2   post https://multi.mallgo.net.cn/api/bountyTask/browseAd
	async browseAd(name, id) {
		let options = {
			method: "post",
			url: `${hostname}/api/bountyTask/browseAd`,
			headers: {
				'Host': 'multi.mallgo.net.cn',
				'content-type': 'application/json',
				'token': token
			},
			body: JSON.stringify({
				"id": id
			})
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`${name}: ${result.msg}`);
			DoubleLog(`等待 65 秒`)
			await utils.wait(65)
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

