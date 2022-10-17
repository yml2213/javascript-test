/*
新黄河--并发版  app

cron 10 8,10,12 * * *  xhh.js

8-26		签到兑换实物--心雨大佬
10.17		改并发, 

========= 青龙--配置文件-贴心复制区域  ========= 
# 新黄河
export xhh=' token ' 

多账号用 换行 或 @ 分割, 报错的自己下载 utils.js, 放在脚本同级目录下

tg频道: https://t.me/yml2213_tg  

*/

const utils = require("./utils");
const $ = new Env("新黄河");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1

let envSplitor = ["@", "\n"];

let msg = ck = token = "";

let userCookie = process.env.xhh;
let userList = [];
let userIdx = 0;
let userCount = 0;

let vid = query_url = ''
let ts = utils.ts13()
let article_id = utils.randomInt(3175520, 3309443);



///////////////////////////////////////////////////////////////////
class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		this.name = this.index;
		this.valid = false;
		this.cFlag = true;
		try {
			this.token = str;
		} catch (e) { }
	}
	async signin(name) {
		try {
			let options = {
				method: "get",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=user&a=sign&platform=android&token=${this.token}`,
				headers: {
					Host: "api.jinantimes.com.cn",
				},
			};
			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}]  ${name}:${result?.message} 🎉 `);
				await wait(3);
			} else if (result?.code == 401) {
				DoubleLog(`账号[${this.index}]  ${name}:${result?.message}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		} finally {
			return Promise.resolve(1);
		}
	}

	async task_allocation(name) { //任务分配
		for (let i = 1; i < 31; i++) {
			await this.browse_news('浏览新闻', i)
		}

		for (let i = 1; i < 11; i++) {
			await this.share_news('分享新闻', i)
		}

		for (let i = 1; i < 21; i++) {
			await this.like_news('点赞', i)
		}

		for (let i = 1; i < 11; i++) {
			await this.comment_news('评论新闻', i)
		}

		for (let i = 1; i < 31; i++) {
			await this.watch_video('看视频', i)
		}

		for (let i = 1; i < 21; i++) {
			await this.follow('关注奔流号', i, 0)
			await this.follow('取消关注奔流号', i, 1)
		}
	}




	async browse_news(name, num) {
		try {
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=content&a=show_pub&isAndriod=1`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'timestamp': ts,
					'id': article_id,
					'catid': 208
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 成功 🎉 `);
				await wait(10);
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async share_news(name, num) { //分享新闻
		try {
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=content&a=add_share_log`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'newsid': article_id,
					'catid': 31
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: ${result?.message}`);
				await wait(3);
				await this.receive_share_news('领取分享奖励')
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async receive_share_news(name) {
		try {
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=user&a=addScoreZf`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}]  ${name}: ${result?.message}`);
				await wait(3);
			} else {
				DoubleLog(`账号[${this.index}]  ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async like_news(name, num) { //点赞新闻
		try {

			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=content&a=dingcai`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'newsid': article_id,
					'catid': 208
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: ${result?.message}`);
				await wait(3);
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async comment_news(name, num) { //评论新闻
		try {
			let unm = utils.randomInt(1, 8)
			let textArr = ['6666', '学到了', '感谢分享', '很有帮助', '原来是这样', '懂了,懂了', '学习一下', '知识又增加了'];
			let text = textArr[unm];

			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=coment&a=postcomment`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'newsid': article_id,
					'catid': 243,
					'content': text,
					'commentthumb': '',
					'ruserid': 0,
					'rid': 0,
					'type': 'content',
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: ${result?.message}`);
				await wait(3);
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async follow(name, num, type) { //关注 取消关注 奔流号
		try {
			let bid = utils.randomInt(41, 108);
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=user&a=follow`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'target_userid': bid,
					'followstatus': type
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: ${result?.message}`);
				await wait(3)
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async watch_video(name, num) { //看视频
		try {
			await this.get_vid('获取 vid')
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=content&a=show_pub&isAndriod=1`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'id': vid,
					'catid': 75
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 成功`);
				await wait(10);
			} else {
				DoubleLog(`账号[${this.index}] 第${num}次 ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async get_vid(name) { //视频列表获取 vid
		try {
			let pageid = utils.randomInt(1, 20);
			let options = {
				method: "post",
				url: `https://api.jinantimes.com.cn/index.php?m=api&c=content&a=newsList_pub`,
				headers: {
					Host: "api.jinantimes.com.cn",
					"Content-Type": "application/x-www-form-urlencoded",
				},
				form: {
					'platform': 'android',
					'token': this.token,
					'id': vid,
					'catid': 75,
					'num': 10,
					'page': pageid
				},
			};

			let result = await network_request(name, options);

			// console.log(result);
			if (result?.code == 200) {
				let num_ = utils.randomInt(0, 9);
				vid = result.data.news[num_].id
				return vid
			} else {
				DoubleLog(`账号[${this.index}]  ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	// https://jfshop.jnbywh.cn/index.php?s=/wap&token=p3tt9jmqvmuheagov9vucqreon8vp
	async query_points(name) { //积分查询  
		try {
			await this.get_query_url('获取查询 url')
			let options = {
				method: "get",
				url: query_url,
				headers: {
					'Host': "jfshop.jnbywh.cn",
				},
			};
			let result = await network_request(name, options);

			// console.log(result);
			if (result) {
				let tem = result.split('<div class="count">')
				// console.log(tem[1]);
				let points = tem[1].split('</')[0]
				// console.log(points);
				DoubleLog(`账号[${this.index}]  ${name}: ${points} 分!`)
			} else {
				DoubleLog(`账号[${this.index}]  ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}

	async get_query_url(name) {
		try {
			let options = {
				method: "get",
				url: `https://jfshop.jnbywh.cn/index.php?s=%2Fwap%2Flogin%2FajaxThirdLogin&platform=3&token=${this.token}`,
				headers: {
					'Host': "jfshop.jnbywh.cn",
					'Pragma': 'no-cache',
					'X-Requested-With': 'XMLHttpRequest',
				},
			};
			let result = await network_request(name, options);

			// console.log(result);
			if (result.code == 1) {
				query_url = result.data.url
				return query_url
			} else {
				DoubleLog(`账号[${this.index}]  ${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (e) {
			console.log(e);
		}
	}


}

!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		console.log("\n-------------- 签到 --------------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.signin("签到"));
		}
		await Promise.all(taskall);

		console.log("\n-------------- 任务分配 --------------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.task_allocation("任务分配"));
		}
		await Promise.all(taskall);

		console.log("\n-------------- 积分查询 --------------\n");
		taskall = [];
		for (let user of userList) {
			taskall.push(user.query_points("积分查询"));
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
		// console.log(userCookie);
		let e = envSplitor[0];
		for (let o of envSplitor)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		for (let n of userCookie.split(e)) n && userList.push(new UserInfo(n));
		userCount = userList.length;
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
