/*
爱思百货_token--并发版  app

cron 10 8,10,12 * * *  asbh.js

10.12		看视频,换猫豆
10.13		优化流程，缩短任务间隔
10.16		token并发版

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 爱思百货
export asbh2=" token "

多账号用 换行 或 @ 分割

报错的自己下载 utils.js  放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  

*/

const utils = require("./utils");
const $ = new Env("爱思百货");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1

let envSplitor = ["@", "\n"];

let msg = ck = token = "";

let userCookie = process.env.asbh2;
let userList = [];
let userIdx = 0;
let userCount = 0;

///////////////////////////////////////////////////////////////////
class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.name = this.index;
		this.valid = false;
		this.cFlag = true;
		try {
			this.token = str;
			// console.log(cthis.phone, this.pwd);
		} catch (e) { }
	}


	async user_info(name) {
		let options = {
			method: "get",
			url: `https://multi.mallgo.net.cn/api/user/center`,
			headers: {
				Host: "multi.mallgo.net.cn",
				"content-type": "application/json",
				token: this.token,
			},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			DoubleLog(`\n账号[${this.index}] ${name}: 欢迎 ${result.data.nickname}, 手机号 ${utils.phone_num(result.data.mobile)}, 余额 ${result.data.user_money}, 等级 ${result.data.level}, 邀请码 ${result.data.distribution_code}`);
		} else {
			DoubleLog(`账号[${this.index}] ${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 任务列表  get   https://multi.mallgo.net.cn/api/bountyTask/lists
	async task_list(name) {
		let options = {
			method: "get",
			url: `https://multi.mallgo.net.cn/api/bountyTask/lists`,
			headers: {
				Host: "multi.mallgo.net.cn",
				"content-type": "application/json",
				token: this.token,
			},
		};
		let result = await network_request(name, options);

		// console.log(result);
		if (result.code == 1) {
			let tasks = result.data;
			for (let index = 0; index < tasks.length; index++) {
				DoubleLog(
					`账号[${this.index}] ${tasks[index].title}: ${tasks[index].period_start}--${tasks[index].period_end}, 完成情况:${tasks[index].accomplish}/${tasks[index].view_num}`
				);
				let num = `${tasks[index].view_num - tasks[index].accomplish}`;
				if (num) {
					await this.task(tasks[index].title, tasks[index].id, num);
				}
			}
		} else if (result.code == 0) {
			DoubleLog(`账号[${this.index}] ${name}: ${result.msg}`);
		} else {
			DoubleLog(`账号[${this.index}] ${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 任务分配   get
	async task(name, id, num) {
		// console.log(`任务名字${name},  任务id${id},  任务剩余数量${num}\n`);
		let body1 = {
			start_time: "06:00",
			end_time: "12:00",
			id: 1,
		};
		let body2 = {
			start_time: "12:00",
			end_time: "18:00",
			id: 2,
		};
		let body3 = {
			start_time: "18:00",
			end_time: "23:59",
			id: 3,
		};
		let h = utils.local_hours();
		if (id == 1 && num > 0) {
			if (num == 2) {
				await this.validityPeriod(name, body1, id, 65);
				await this.validityPeriod(name, body1, id, 3);
			} else if (num == 1) {
				await this.validityPeriod(name, body1, id, 3);
			}
		} else if (id == 2 && num > 0 && h > 9) {
			if (num == 2) {
				await this.validityPeriod(name, body2, id, 65);
				await this.validityPeriod(name, body2, id, 3);
			} else if (num == 1) {
				await this.validityPeriod(name, body2, id, 3);
			}
		} else if (id == 3 && num > 0 && h > 11) {
			if (num == 2) {
				await this.validityPeriod(name, body3, id, 65);
				await this.validityPeriod(name, body3, id, 3);
			} else if (num == 1) {
				await this.validityPeriod(name, body3, id, 3);
			}
		}
	}

	// 看视频    post   https://multi.mallgo.net.cn/api/bountyTask/validityPeriod
	async validityPeriod(name, body, id, wait_num) {
		let options = {
			method: "post",
			url: `https://multi.mallgo.net.cn/api/bountyTask/validityPeriod`,
			headers: {
				Host: "multi.mallgo.net.cn",
				"content-type": "application/json",
				token: this.token,
			},
			body: JSON.stringify(body),
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`等待 5 秒`);
			await wait(5);
			await this.browseAd(name, id, wait_num);
		} else if (result.code == 0) {
			DoubleLog(`账号[${this.index}] ${name}: ${result.msg}`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}

	// 看视频    post https://multi.mallgo.net.cn/api/bountyTask/browseAd
	async browseAd(name, id, wait_num) {
		let options = {
			method: "post",
			url: `https://multi.mallgo.net.cn/api/bountyTask/browseAd`,
			headers: {
				Host: "multi.mallgo.net.cn",
				"content-type": "application/json",
				token: this.token,
			},
			body: JSON.stringify({
				id: id,
			}),
		};
		let result = await network_request(name, options);

		if (result.code == 1) {
			DoubleLog(`账号[${this.index}] ${name}: ${result.msg}`);
			DoubleLog(`等待 ${wait_num} 秒`);
			await wait(wait_num);
		} else if (result.code == 0) {
			DoubleLog(`账号[${this.index}] ${name}: ${result.msg}`);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	}
}

!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		console.log("\n-------------- 用户信息 --------------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.user_info("用户信息"));
		}
		await Promise.all(taskall);
		console.log("\n-------------- 任务列表 --------------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.task_list("任务列表"));
		}
		await Promise.all(taskall);
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

// 网络请求   network_request
async function network_request(name, options) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	// DoubleLog(`\n开始 ${name}`);
	try {
		let result = await utils.httpRequest(name, options);
		if (result) {
			return result;
		}
		{
			DoubleLog(`未知错误(1`);
		}
	} catch (error) {
		console.log(error);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	console.log(`    ${data}`);
	msg += `\n    ${data}`;
}

////////////////////////////////////////////////////////////////////

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
			this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`);
		}
	})(name, e);
}
