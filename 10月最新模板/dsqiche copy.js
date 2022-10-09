/*
ds汽车  app 
cron 10 7 * * *  dsqiche.js

10/2		修复心雨大佬签到bug 

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# ds汽车
export dsqiche=" phone & pwd @ phone & pwd "


多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg  

*/

const utils = require("./utils");
const $ = new Env("ds汽车");
const alias_name = "dsqiche";
// const request = require('request');
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let ck_status = 1;
//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.1";
let Change = "内部脚本,严谨外传!\n内部脚本,严谨外传!\n内部脚本,严谨外传!";
let thank = `\n感谢 心雨大佬脚本\n`;
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	// let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n📌 本地脚本: V ${VersionCheck}`;
	DoubleLog(`${Version}\n📌 🆙 更新内容: ${Change}`);
	DoubleLog(`${thank}`);
	await utils.yiyan()
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
}

async function start() {
	await init("初始化");
	await login("登录");
	if (ck_status) {
		await user_info("用户信息");
		await signin("签到");
		await task_list("任务列表");
	}
}

// 初始化
async function init(name) {
	if (!name) {
		name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1];
	}
	DoubleLog(`\n开始 ${name}`);
	host = "act-client.o2o.mpsa.cn";
	hostname = "https://" + host;
	ds_hd = {
		"Content-Type": "application/json",
		Host: host,
	};
}


// 登录    post
async function login(name) {
	let options = {
		method: "post",
		url: `https://customer-passport-org.o2o.mpsa.cn/api/v1/uaa/mobile/token`,
		headers: {
			Host: "customer-passport-org.o2o.mpsa.cn",
			"Content-Type": "application/json",
			"User-Agent": "okhttp/3.14.0",
		},
		body: JSON.stringify({
			password: `${ck[1]}`,
			source: 2,
			tenantId: "0",
			username: `${ck[0]}`,
		}),
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
		accessToken = result.data.accessToken;
		accountId = result.data.openId;
		await utils.wait(5);
		return (ck_status = 1);
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
		return (ck_status = 0);
	}
}

// 签到    post
async function signin(name) {

	await get_actid("获取id");
	let options = {
		method: "post",
		url: `${hostname}/api/v1/activity/sign-in/sign-in?activityId=${actid}&access_token=${accessToken}`,
		headers: ds_hd,
		body: JSON.stringify({
			password: `${ck[1]}`,
			source: 2,
			tenantId: "0",
			username: `${ck[0]}`,
		}),
	};
	let result = await network_request(name, options);

	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
		await utils.wait(5);
	} else if (result.status == 400) {
		DoubleLog(`${name}:${result.message}`);
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 获取签到活动 id    get
async function get_actid(name) {
	let options = {
		method: "get",
		url: ` https://act-client.o2o.mpsa.cn/api/v1/activity/sign-in/index?access_token=${accessToken}&tenantId=0&activityEntrance=1`,
		headers: ds_hd,
	};
	let result = await network_request(name, options);
	// console.log(result);
	if (result.status == 200) {
		// DoubleLog(`${name}:${result.message}`);
		actid = result.data.activityInfo.id;
		return actid;
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 任务列表    get
async function task_list(name) {

	let options = {
		method: "get",
		url: `${hostname}/api/v1/activity/sign-in/assignments?activityId=${actid}&access_token=${accessToken}`,
		headers: {
			Host: "act-client.o2o.mpsa.cn",
			"accept-language": "zh-cn",
		},
	};
	let result = await network_request(name, options);

	if (result.status == 200) {
		let tasks = result.data;
		for (let index = 0; index < tasks.length; index++) {
			let bizName = tasks[index].bizName;
			let task_id = tasks[index].id;
			let task_status = tasks[index].status;
			if (task_id == 244 && task_status == 1) {
				await browse(bizName); //浏览文章
			} else if (task_id == 244 && task_status == 2) {
				DoubleLog(`${bizName}:已完成`);
			}
			if (task_id == 242 && task_status == 1) {
				await comment(bizName); //发布资讯评论
			} else if (task_id == 242 && task_status == 2) {
				DoubleLog(`${bizName}:已完成`);
			}
		}
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
		return (ck_status = 0);
	}
}

// 浏览文章
async function browse(name) {

	await article_list("文章列表");
	let options = {
		method: "get",
		url: `https://ucontent-business.o2o.mpsa.cn/api/v1/ucontent/comment/business/comments/cnt?relaCodes=${art_id}&typeCode=article-comment&tenant=0&access_token=${accessToken}`,
		headers: {
			Host: "ucontent-business.o2o.mpsa.cn",
			"Accept-Language": "zh-cn",
		},
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
		await utils.wait(10);
		await browse_award("浏览文章奖励");
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 文章列表
async function article_list(name) {

	let pageNo = utils.randomInt(1, 10);
	let options = {
		method: "get",
		url: `https://mini-app.o2o.mpsa.cn/api/v1/pgc/information?pageNo=${pageNo}&pageSize=10&classifyIds=1447941448073740290&tenantId=0`,
		headers: {
			Host: "mini-app.o2o.mpsa.cn",
			"Accept-Language": "zh-cn",
		},
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
		let unm = utils.randomInt(0, 9);
		art_id = result.data.data[unm].id;
		return art_id;
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 浏览文章奖励
async function browse_award(name) {

	let options = {
		method: "post",
		url: `https://mini-app.o2o.mpsa.cn/api/v1/activity/sign-in/read-content?access_token=${accessToken}`,
		headers: {
			Host: "mini-app.o2o.mpsa.cn",
			"Content-Length": "16",
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tenantId: "0" }),
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 发布资讯评论		post
async function comment(name) {

	await article_list("文章列表");
	await daily_one_word("获取评论内容");
	let options = {
		method: "post",
		url: `https://ucontent-business.o2o.mpsa.cn/api/v1/ucontent/comment/business/comment?access_token=${accessToken}`,
		headers: {
			Host: "ucontent-business.o2o.mpsa.cn",
			"Content-Length": "350",
			"Content-Type": "application/json",
			"Accept-Language": "zh-cn",
		},
		body: JSON.stringify({
			relaTypeCode: "article-comment",
			tenant: "0",
			operationCode: "create",
			moduleTypeCode: "comment",
			channel: "h5",
			accountType: "10",
			level: 1,
			relaCode: `${art_id}`,
			content: `${one_word}`,
			accountId: `${accountId}`,
			logicalParentId: 0,
			displayParentId: 0,
		}),
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result.status == 200) {
		DoubleLog(`${name}:${result.message}`);
		await utils.wait(5);
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 获取评论内容
async function daily_one_word(name) {

	let options = {
		method: "get",
		url: `https://v1.jinrishici.com/all.json`,
		headers: {},
	};
	let result = await network_request(name, options);

	// console.log(result);
	if (result) {
		one_word = `${result.content} ---来自${result.author}`;
		console.log(one_word);
		return one_word;
	} else {
		DoubleLog(`${name}: 失败❌了呢`);
		console.log(result);
	}
}

// 用户信息   httpGet
async function user_info(name) {

	let options = {
		method: "get",
		url: `https://mini-app.o2o.mpsa.cn/api/v1/user/user-detail?access_token=${accessToken}`,
		headers: {
			Host: "mini-app.o2o.mpsa.cn",
			"Accept-Language": "zh-cn",
		},
	};
	let result = await network_request(name, options);

	if (result.status == 200) {
		DoubleLog(
			`用户信息:${result.message},手机号${utils.phone_num(
				result.data.mobile
			)}`
		);
		await utils.wait(2);
	} else {
		DoubleLog(`用户信息: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
	}
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
