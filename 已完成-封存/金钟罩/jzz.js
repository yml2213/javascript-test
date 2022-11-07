/*
app_id#token&unionid  三个数据
*/

const $ = new Env("金钟罩");
let envSplitor = ['\n', '@']
let httpResult, httpReq, httpResp, ck

const Notify = 1;
const notify = $.isNode() ? require("./sendNotify") : "";
let userCookie = ($.isNode() ? process.env.jzzck : $.getdata('jzzck')) || '';
let userList = []
let userIdx = 0
let userCount = 0
let plarr = ['不要贪图小便宜', '一定要保持清醒的头脑，不贪图小利，不轻信他人，牢记世上“没有免费的午餐”,打消“用小钱赚大钱”“吃小亏赚大便宜”“不劳而获”的念头', '看好自己的钱袋子，凡是有人让您出钱，一定要多一个心眼，不能轻易将自己的钱拿出来', '提高法治意识平时多关注新闻媒体、社区宣传栏、标语等', '了解当前多发的各类诈骗手段，提高警惕，加强对诈骗伎俩的识别能力', '树立安全思维注意妥善保管自己的个人信息，如本人证件号码、各种与身份信息或银行卡绑定的账号、密码等，不向他人透露，并尽量避免通过公共网络环境使用金融服务', '保持警戒心理有些骗子常常主动与老年人打招呼，套近乎，同时表现得很热情，此时有的老年人就容易放松警惕,在此特别提醒老年朋友，千万不要和“陌生人”过于接近，以免上当受骗', '开拓眼界，关心社会,平时多关注各种新闻媒体、社区内黑板报、宣传栏、标语等宣传', '了解当前多发的各类诈骗手法，提高警惕', '加强对诈骗伎俩的识别能力,不要轻易付钱,凡是要动钱的时候，不要相信骗子那些“不要告诉任何人”的鬼话', '自己拿不定主意时，找老伴、孩子或找自己信得过的邻居和朋友，以及找社区工作人员，向他们通报情况，征求意见，商量对策', '防止一叶蔽目 政府和社区组织的活动都会积极做好宣传和保障工作', '去政府和社区定点和正规的部门办事,老人有病要到正规的医院去看，买药要到正规的药店去买', '征婚要通过自己信得过的亲友和正规的婚介所去征', '谋求工作要到正规的中介所去找，出版书籍要到正规的出版社去洽谈', '不要随便接不熟悉的电话,对不熟悉的电话不要随意告知家中的基本信息；对不熟悉的电话提供的服务要谨慎；尤其是对电话对方以公检法名义提出以要处罚要扣款名义提出询问基本信息的要予以拒绝,如果老人受到不明电话骚扰，要及时告诉家人，邻里和社区工作人员，一起帮忙处理,或者及时报警处理', '微信、支付宝、网银不要放太多钱,不熟练操作网上支付平台的老年人，建议不要在微信、支付宝内绑定银行卡，只存少量零钱，银行卡尽量不开通网上支付业务，避免受骗后造成大量损失']



///////////////////////////////////////////////////////////////////
class UserInfo {
	constructor(str) {
		this.nickname = ++userIdx
		this.valid = false
		try {
			ck = str.split("&");
			this.app_id = ck[0]
			this.token = ck[1]
			this.unionid = ck[2]
			this.ckValid = true
			this.pl = randomArr(plarr)
		} catch (e) {
			console.log(e);
		}
	}
	//个人信息
	async grxx() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-userinfo-service/jzz/user`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			//console.log(result)
			this.nickname = result.data.nickname
			await $.wait(330)
			await this.login_time()
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//更新登录时间
	async login_time() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/update_login_time`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			//>console.log(result)
			await $.wait(330)
			await this.sign(), await this.info()
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//签到
	async sign() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/sign_in`;
			let body = `appid=${this.app_id}`;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 200) {
				console.log(`账号${this.nickname} 签到成功获得积分${result.data.score} `)
			} else if (result.code == 110001) {
				console.log(`账号${this.nickname} ${result.message}`)
			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//文章列表
	async wzlb() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_home_page?app_id=${this.app_id}&title=&type_id=0&video=0&page_size=20&page=1&unionid=${this.unionid}`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			// console.log(result)
			if (result.code == 200) {
				//console.log(`${JSON.stringify(result)}`)
				result.data.loop.length = 3
				for (let i = 0; i < result.data.loop.length; i++) {
					let dd = randomArr(result.data.loop)
					this.b = dd.id, this.c = dd.title
					//console.log(`获取到文章[${dd.id}] ${JSON.stringify(dd.title)}`)
					//await this.mrpl()
				}
				await this.rw()

			} else {
			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//任务列表
	async rw() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/daily_task_finish_status`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			// console.log(result);
			if (result.code == 200) {
				// console.log(result)
				// console.log(`账号${this.nickname} ${result} `)
				console.log(`\n开始检查 ${this.pt} 任务列表\n`);
				if (result.data[0].finish_num == 0) {
					console.log('开始 每日评论');
					await $.wait(3300)
					await this.mrpl()
				} else {
					console.log('已完成 每日评论');
				}
				if (result.data[1].finish_num == 0) {
					console.log('开始 每日点赞');
					await $.wait(3300)
					await this.mrdz()
				} else {
					console.log('已完成 每日点赞');
				}
				if (result.data[2].finish_num < 2) {
					console.log('开始 每日分享');
					await $.wait(3300)
					await this.mrfx()
				} else {
					console.log('已完成 每日分享');
				}
				if (result.data[3].finish_num < 2) {
					console.log('开始 每日阅读');
					await $.wait(3300)
					await this.mryd()
				} else {
					console.log('已完成 每日阅读');
				}

			} else {
				console.log(`账号${this.token} ${result.msg}`)
			}

		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//每日评论
	async mrpl() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/article/comment`;
			let body = `{"relation_id":${this.b},"title":"${this.c}","content":"${this.pl}","unionid":"${this.unionid}","username":"${this.nickname}","app_id":"${this.app_id}","plat":1,"type":1,"headimgurl":"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNNfytM1PljgvLwicWmrKkl4bRByUibAKF3HDGfibd3YLOpeoJYwiccPdugoEoTibomepicCTia52zKXvyw/132","replied_username":"","replied_unionid":"","pid":0,"replied_content":"","is_at":0}`;
			let h = {
				"Host": "jzz.secxun.com",
				"Connection": "keep-alive",
				"Content-Length": "466",
				"token": `${this.token}`,
				"Content-Type": "application/json;charset=utf-8",
				"Accept": "application/json, text/plain, */*",
				"Accept-Encoding": "gzip,compress,br,deflate",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001442) NetType/4G Language/zh_CN",
				"Referer": `https://servicewechat.com/${this.app_id}/12/page-frame.html`
			}

			let urlObject = popu(url, h, body)
			console.log(urlObject);
			await httpRequest('post', urlObject)
			let result = httpResult;
			 console.log(result)
			if (result.code !== 200) {
				console.log(`账号${this.nickname} 评论成功获得积分${result.data.score} `)
			} else {
			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//每日点赞
	async mrdz() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/article/fabulous`;
			let body = `{"relation_id":${this.b},"unionid":"${this.unionid}","username":"${this.nickname}","app_id":"${this.app_id}","type":1,"plat":1,"pid":${this.b},"p_type":1,"status":1}`
			let h = {
				"Host": "jzz.secxun.com",
				"Connection": "keep-alive",
				"Content-Length": "162",
				"token": `${this.token}`,
				"Content-Type": "application/json;charset=utf-8",
				"Accept": "application/json, text/plain, */*",
				"Accept-Encoding": "gzip,compress,br,deflate",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001442) NetType/4G Language/zh_CN",
				"Referer": `https://servicewechat.com/${this.app_id}/12/page-frame.html`
			}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			// console.log(result)
			if (result.code == 200) {
				console.log(`账号${this.nickname} 点赞获得 ${result.data.score}积分 `)
				await $.wait(3300)
				await this.qxdz()
			} else {

			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}

	//取消点赞
	async qxdz() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/article/fabulous`;
			let body = `{"relation_id":${this.b},"unionid":"${this.unionid}","username":"${this.nickname}","app_id":"${this.app_id}","type":1,"plat":1,"pid":${this.b},"p_type":1,"status":0}`;
			let h = {
				"Host": "jzz.secxun.com",
				"Connection": "keep-alive",
				"Content-Length": "466",
				"token": `${this.token}`,
				"Content-Type": "application/json;charset=utf-8",
				"Accept": "application/json, text/plain, */*",
				"Accept-Encoding": "gzip,compress,br,deflate",
				"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_8 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.20(0x18001442) NetType/4G Language/zh_CN",
				"Referer": `https://servicewechat.com/${this.app_id}/12/page-frame.html`
			}
			let urlObject = popu(url, h, body)
			await httpRequest('post', urlObject)
			let result = httpResult;
			if (result.code == 200) {
				console.log(`账号${this.nickname} 取消点赞 `)
			} else {

			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//每日分享
	async mrfx() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_article_share?app_id=${this.app_id}&art_id=${this.b}&type=1&unionid=${this.unionid}`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 200) {
				console.log(`账号${this.nickname} 分享成功获得积分${result.data.score} `)

			} else if (result.code == 110001) {
				console.log(`账号${this.nickname} ${result.message}`)
			}
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//每日阅读
	async mryd() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_article_info?app_id=${this.app_id}&art_id=${this.b}&page=1&page_size=20&unionid=${this.unionid}`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			if (result.code == 200) console.log(`${JSON.stringify(result.message)}`)
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//查询平台
	async info() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-plugin-service/miniprogram/info?appid=${this.app_id}`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			//console.log(result)
			this.pt = result.data.title
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
	//积分查询
	async sign_in_info() {
		try {
			let url = `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/sign_in_info`;
			let body = ``;
			let h = {
				"token": `${this.token}`,
			}
			let urlObject = popu(url, h, body)
			await httpRequest('get', urlObject)
			let result = httpResult;
			//console.log(result)
			console.log(`账号 ${this.nickname}      【 ${this.pt}  总积分${result.data.surplus_score} 】 `)
		} catch (e) {
			console.log(e)
		} finally {
			return Promise.resolve(1);
		}
	}
}

!(async () => {
	if (typeof $request !== "undefined") {
		await GetRewrite()
	} else {

		if (!(await checkEnv())) return;



		if (userList.length > 0) {
			console.log('\n------- 签到 -------\n')
			taskall = []
			for (let user of userList) {
				taskall.push(user.grxx())
			}
			await Promise.all(taskall)
			if (userList.length > 0) {
				console.log('\n------- 任务列表 -------\n')
				taskall = []
				for (let user of userList) {
					// taskall.push(user.wzlb())

					
					taskall.push(user.wzlb())
					taskall.push(user.mrpl())

				}
				await Promise.all(taskall)
			}
			if (userList.length > 0) {
				console.log('\n------- 平台积分查询 -------\n')
				taskall = []
				for (let user of userList) {
					taskall.push(user.sign_in_info())
				}
				await Promise.all(taskall)
			}
		}

	}
})()
	.catch((e) => console.log(e))
	.finally(() => $.done())

///////////////////////////////////////////////////////////////////
async function GetRewrite() {

}


async function checkEnv() {
	if (userCookie) {
		let splitor = envSplitor[0];
		for (let sp of envSplitor) {
			if (userCookie.indexOf(sp) > -1) {
				splitor = sp;
				break;
			}
		}
		for (let userCookies of userCookie.split(splitor)) {
			if (userCookies)
				userList.push(new UserInfo(userCookies))

		}
		userCount = userList.length
	} else {
	}
	console.log(`找到${userCount}个账号`)
	return true
}
function randomArr(arr) {
	return arr[parseInt(Math.random() * arr.length, 10)]
}
////////////////////////////////////////////////////////////////////
function popu(url, h, body = '') {
	let host = url.replace('//', '/').split('/')[1]
	let urlObject = {
		url: url,
		headers: h,
		timeout: 5000,
	}
	if (body) {
		urlObject.body = body
	}

	return urlObject;
}


async function httpRequest(method, url) {
	httpResult = null, httpReq = null, httpResp = null;
	return new Promise((resolve) => {
		$.send(method, url, async (err, req, resp) => {
			try {
				httpReq = req;
				httpResp = resp;
				if (err) {
				} else {
					if (resp.body) {
						if (typeof resp.body == "object") {
							httpResult = resp.body;
						} else {
							try {
								httpResult = JSON.parse(resp.body);
							} catch (e) {
								httpResult = resp.body;
							}
						}
					}
				}
			} catch (e) {
				console.log(e);
			} finally {
				resolve();
			}
		});
	});
}
function randomArr(arr) {
	return arr[parseInt(Math.random() * arr.length, 10)]
}
////////////////////////////////////////////////////////////////////
function Env(a, b) {
	return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
		constructor(a, b) {
			this.name = a, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, b), console.log(`${this.name} 开始运行：
`)
		} isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getdata(b) { let a = this.getval(b); if (/^@/.test(b)) { let [, c, f] = /^@(.*?)\.(.*?)$/.exec(b), d = c ? this.getval(c) : ""; if (d) try { let e = JSON.parse(d); a = e ? this.lodash_get(e, f, "") : a } catch (g) { a = "" } } return a } setdata(c, d) { let a = !1; if (/^@/.test(d)) { let [, b, e] = /^@(.*?)\.(.*?)$/.exec(d), f = this.getval(b), i = b ? "null" === f ? null : f || "{}" : "{}"; try { let g = JSON.parse(i); this.lodash_set(g, e, c), a = this.setval(JSON.stringify(g), b) } catch (j) { let h = {}; this.lodash_set(h, e, c), a = this.setval(JSON.stringify(h), b) } } else a = this.setval(c, d); return a } getval(a) { return this.isSurge() || this.isLoon() ? $persistentStore.read(a) : this.isQuanX() ? $prefs.valueForKey(a) : this.isNode() ? (this.data = this.loaddata(), this.data[a]) : this.data && this.data[a] || null } setval(b, a) { return this.isSurge() || this.isLoon() ? $persistentStore.write(b, a) : this.isQuanX() ? $prefs.setValueForKey(b, a) : this.isNode() ? (this.data = this.loaddata(), this.data[a] = b, this.writedata(), !0) : this.data && this.data[a] || null } send(b, a, f = () => { }) { if ("get" != b && "post" != b && "put" != b && "delete" != b) { console.log(`无效的http方法：${b}`); return } if ("get" == b && a.headers ? (delete a.headers["Content-Type"], delete a.headers["Content-Length"]) : a.body && a.headers && (a.headers["Content-Type"] || (a.headers["Content-Type"] = "application/x-www-form-urlencoded")), this.isSurge() || this.isLoon()) { this.isSurge() && this.isNeedRewrite && (a.headers = a.headers || {}, Object.assign(a.headers, { "X-Surge-Skip-Scripting": !1 })); let c = { method: b, url: a.url, headers: a.headers, timeout: a.timeout, data: a.body }; "get" == b && delete c.data, $axios(c).then(a => { let { status: b, request: c, headers: d, data: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }).catch(a => console.log(a)) } else if (this.isQuanX()) a.method = b.toUpperCase(), this.isNeedRewrite && (a.opts = a.opts || {}, Object.assign(a.opts, { hints: !1 })), $task.fetch(a).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, a => f(a)); else if (this.isNode()) { this.got = this.got ? this.got : require("got"); let { url: d, ...e } = a; this.instance = this.got.extend({ followRedirect: !1 }), this.instance[b](d, e).then(a => { let { statusCode: b, request: c, headers: d, body: e } = a; f(null, c, { statusCode: b, headers: d, body: e }) }, b => { let { message: c, response: a } = b; f(c, a, a && a.body) }) } } time(a) { let b = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "h+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; for (let c in /(y+)/.test(a) && (a = a.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))), b) new RegExp("(" + c + ")").test(a) && (a = a.replace(RegExp.$1, 1 == RegExp.$1.length ? b[c] : ("00" + b[c]).substr(("" + b[c]).length))); return a } async showmsg() { if (!this.notifyStr) return; let a = this.name + " \u8FD0\u884C\u901A\u77E5\n\n" + this.notifyStr; if ($.isNode()) { var b = require("./sendNotify"); console.log("\n============== \u63A8\u9001 =============="), await b.sendNotify(this.name, a) } else this.msg(a) } logAndNotify(a) { console.log(a), this.notifyStr += a, this.notifyStr += "\n" } msg(d = t, a = "", b = "", e) { let f = a => { if (!a) return a; if ("string" == typeof a) return this.isLoon() ? a : this.isQuanX() ? { "open-url": a } : this.isSurge() ? { url: a } : void 0; if ("object" == typeof a) { if (this.isLoon()) { let b = a.openUrl || a.url || a["open-url"], c = a.mediaUrl || a["media-url"]; return { openUrl: b, mediaUrl: c } } if (this.isQuanX()) { let d = a["open-url"] || a.url || a.openUrl, e = a["media-url"] || a.mediaUrl; return { "open-url": d, "media-url": e } } if (this.isSurge()) return { url: a.url || a.openUrl || a["open-url"] } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(d, a, b, f(e)) : this.isQuanX() && $notify(d, a, b, f(e))); let c = ["", "============== \u7CFB\u7EDF\u901A\u77E5 =============="]; c.push(d), a && c.push(a), b && c.push(b), console.log(c.join("\n")) } getMin(a, b) { return a < b ? a : b } getMax(a, b) { return a < b ? b : a } padStr(e, b, f = "0") { let a = String(e), g = b > a.length ? b - a.length : 0, c = ""; for (let d = 0; d < g; d++)c += f; return c + a } json2str(b, e, f = !1) { let c = []; for (let d of Object.keys(b).sort()) { let a = b[d]; a && f && (a = encodeURIComponent(a)), c.push(d + "=" + a) } return c.join(e) } str2json(e, f = !1) { let d = {}; for (let a of e.split("#")) { if (!a) continue; let b = a.indexOf("="); if (-1 == b) continue; let g = a.substr(0, b), c = a.substr(b + 1); f && (c = decodeURIComponent(c)), d[g] = c } return d } randomString(d, a = "abcdef0123456789") { let b = ""; for (let c = 0; c < d; c++)b += a.charAt(Math.floor(Math.random() * a.length)); return b } randomList(a) { let b = Math.floor(Math.random() * a.length); return a[b] } wait(a) { return new Promise(b => setTimeout(b, a)) } done(a = {}) {
			let b = (new Date).getTime(), c = (b - this.startTime) / 1e3; console.log(`
${this.name} 运行结束，共运行了 ${c} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(a)
		}
	}(a, b)
}
