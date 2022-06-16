/**
 * 2022.5.5  tom
 * 
 * 广汽三菱  兑换实物  以前有上车的换这个js吧
 * 
 * 没上车的 走一下邀请链接：https://mspace.gmmc.com.cn/partner/introduction?partnerId=pnu165628102013687962&fromUserId=1135364
 * 
 * 只支持青龙  是你们自己投票说用青龙的比较多的
 * 
 * 变量格式: export GQSLAuthorization=''  多个账号用 @分割
 *
 * 点个人信息随便抓个链接，找到 header 里的 Authorization
 *
 */
const $ = new Env("广汽三菱");
const notify = $.isNode() ? require("../sendNotify") : "";
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let ckStr = process.env.GQSLAuthorization;
let msg = "";
let ck = "";
let G = 'Tom   2022.5.5 更新  '
/////////////////////////////////////////////////////////
console.log(`${G}\n`);
msg += `${G}\n`;
async function tips(ckArr) {
	console.log(
		`\n脚本执行 - 北京时间(UTC+8): ${new Date(
			new Date().getTime() +
			new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000
		).toLocaleString()} \n`
	);

	console.log(
		`\n=================== 共找到 ${ckArr.length} 个账号 ===================`
	);
	debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}

!(async () => {
	let ckArr = await getCks(ckStr, "GQSLAuthorization");

	await tips(ckArr);

	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		console.log(`\n========= 开始【第 ${num} 个账号】=========\n`);

		ck = ckArr[index].split("&");

		debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);

		await start();
	}
	await SendMsg(msg);

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done());

async function start() {
	gqslposthd = {
		"Authorization": ck[0],
		"Content-Type": "application/json;charset=utf-8"
	}
	gqslgethd = {
		"Authorization": ck
	}

	S = `签到`
	if (S == `签到`) {
		await task(`post`, `https://mspace.gmmc.com.cn/customer-app/customer/user/info`, gqslposthd, ``)
		if (DATA.code == 0000) {
			nickname = DATA.data.nickname
			userId = DATA.data.userId
			integral = DATA.data.integral
			console.log(`\n========== 当前用户：${nickname} ==========\n现有积分:${integral}\n`);
			msg += `\n========== 【当前用户】：${nickname} ==========\n【现有积分】:${integral}\n`
			await all()
			await $.wait(2000)
		} else {
			console.log(`\n⚠️COOKIE失效\n请点击前往获取 https://mspace.gmmc.com.cn/partner/introduction?partnerId=pnu165628102013687962&fromUserId=1135364`);
			msg += `⚠️COOKIE失效\n请点击前往获取 https://mspace.gmmc.com.cn/partner/introduction?partnerId=pnu165628102013687962&fromUserId=1135364\n`
		}
	}
}




async function all() {
	S = `签到`
	if (S == `签到`) {
		sign = MD5Encrypt(`9dde010a3a6f4fc67d1a4ac082024850iOS2.2.8${tss()}${ck}`)
		await task(`post`, `https://mspace.gmmc.com.cn/customer-app/task-mapi/sign-in/detail?noLoad=true`, gqslposthd, `{"taskTypeCode":"TASK-INTEGRAL-SIGN-IN","sign":"${sign}","timestamp":"${tss()}","appVersion":"2.2.8","operateSystem":"iOS"}`)
		if (DATA.code == 0000) {

			console.log(`签到 ：已签到 ${DATA.data.signInDays} 天\n`);
			msg += `【签到】：已签到 ${DATA.data.signInDays} 天\n`
			rwlist = DATA.data.pageInfo.banners[1].contents
		} else {
			console.log(`签到 ： ${DATA.data.msg}\n`);
			msg += `【签到】： ${DATA.data.msg}\n`
		}
	}

	for (is of rwlist) {
		id = is.title
		type = is.type
		if (id == `发布评论（0/1）`) {

			S = `获取文章列表`
			if (S == `获取文章列表`) {
				await task(`get`, `https://mspace.gmmc.com.cn/platform-cms-app/frontend/article/queryByPage?pageNo=1&pageSize=20&source=1`, gqslgethd)
				if (DATA.code == 0000) {

					dd = RT(0, 3)
					wzid = DATA.data.list[dd].articleId
					wzmz = DATA.data.list[dd].title
					S = `获取评论内容`
					if (S == `获取评论内容`) {
						await task(`post`, `https://mspace.gmmc.com.cn/social-cms-app/frontend/comment/queryByPage`, gqslposthd, `{"pageNo":1,"pageSize":10,"commentType":1,"commentTypeBusinessId":"${wzid}","pageLastId":""}`)
						if (DATA.code == 0000) {

							dd = RT(0, 3)
							plnr = DATA.data.list[dd].commentContent


							S = `获取评论内容`
							if (S == `获取评论内容`) {
								await task(`post`, `https://mspace.gmmc.com.cn/social-cms-app/frontend/comment/queryByPage`, gqslposthd, `{"pageNo":1,"pageSize":10,"commentType":1,"commentTypeBusinessId":"${wzid}","pageLastId":""}`, 3 * 1000)
								if (DATA.code == 0000) {
									console.log(`评论文章：文章：${wzmz}  评论内容：${plnr}\n`);
									msg += `【评论文章】：文章：${wzmz}  评论内容：${plnr}\n`
								} else {
									console.log(`评论文章 ： ${DATA.data.msg}\n`);
									msg += `【评论文章】： ${DATA.data.msg}\n`
								}
							}



						} else {
							console.log(`获取评论内容 ： ${DATA.data.msg}\n`);
							msg += `【获取评论内容】： ${DATA.data.msg}\n`
						}

					}




				} else {
					console.log(`获取文章列表 ： ${DATA.data.msg}\n`);
					msg += `【获取文章列表】： ${DATA.data.msg}\n`
				}
			}
		}
		if (id == `回答问题（0/1）`) {
			//await gqslwdlb()
		}
		if (id == `分享动态（0/1）`) {
			//await gqsldtid()
		}
		if (id == `分享资讯（0/1）`) {
			//await gqslzxid()
		}
		if (id == `分享活动（0/1）`) {
			//await gqslhdid()
		}
	}


}








async function gqslwdlb(timeout = 150000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/qa/list`,
		headers: gqslposthd,
		body: `{"pageSize":20,"pageNo":1}`
	};
	let DATA = await httpPost(url, `获取问答列表`, timeout);
	if (DATA.code == 0000) {

		dd = RT(1, 5)
		wdid = DATA.data.list[dd].questionId
		wdmz = DATA.data.list[dd].content

		await gqslwdnr()
		await $.wait(1000)

	} else {
		console.log(`获取问答列表 ： ${DATA.data.msg}\n`);
		msg += `【获取问答列表】： ${DATA.data.msg}\n`
	}
}
async function gqslwdnr(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/qa/detail`,
		headers: gqslposthd,
		body: `{"pageNo":1,"pageSize":10,"questionId":"${wdid}"}`
	};
	let DATA = await httpPost(url, `获取问答内容`, timeout);
	if (DATA.code == 0000) {
		dd = RT(0, 3)
		wdnr = DATA.data.qaQuestionListAnswerVo.list[dd].content
		await gqslwdwt()
		await $.wait(2000)

	} else {
		console.log(`获取问答内容 ： ${DATA.data.msg}\n`);
		msg += `【获取问答内容】： ${DATA.data.msg}\n`
	}
}
async function gqslwdwt(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/qa/addAnswer`,
		headers: gqslposthd,
		body: `{"content":"${wdnr}","pics":[],"questionId":${wdid}}`
	};
	let DATA = await httpPost(url, `问答答题`, timeout);
	if (DATA.code == 0000) {
		console.log(`【问答问题】：文章：${wdmz}  回复内容：${wdnr}\n`);
		msg += `【问答问题】：文章：${wdmz}  回复内容：${wdnr}\n`
	} else {
		console.log(`问答答题 ： ${DATA.msg}\n`);
		msg += `【问答答题】： ${DATA.msg}\n`
	}
}


async function gqsldtid(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/dynamic/queryByPage?dimensionType=1&pageNo=1&pageSize=20&type=2`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `动态id`, timeout);
	if (DATA.code == 0000) {
		dtid = DATA.data.list[0].dynamicId
		await gqslfxdt()
		await $.wait(1000)

	} else {
		console.log(`动态id：${DATA.msg}\n`);
		msg += `【动态id】：${DATA.msg}\n`
	}
}
async function gqslfxdt(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/data/point?indexType=2&businessType=3&businessId=${dtid}&fromUserId=${userId}`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `分享动态`, timeout);
	if (DATA.code == 0000) {
		await gqslfxdt1()
	} else {
		console.log(`分享动态 ： ${DATA.data.msg}\n`);
		msg += `【分享动态】： ${DATA.data.msg}\n`
	}
}
async function gqslfxdt1(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/customer-app/integral-task/complete/share?noLoad=true`,
		headers: gqslposthd,
		body: `{"taskType":${type}}`
	};
	let DATA = await httpPost(url, `分享动态1`, timeout);
	if (DATA.code == 0000) {
		console.log(`【分享动态】：成功\n`);
		msg += `【分享动态】：成功\n`
	} else {
		console.log(`分享动态： ${DATA.msg}\n`);
		msg += `【分享动态】： ${DATA.msg}\n`
	}
}

async function gqslzxid(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/platform-cms-app/frontend/article/queryByPage?pageNo=1&pageSize=20&source=0`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `资讯id`, timeout);
	if (DATA.code == 0000) {
		zxid = DATA.data.list[0].articleId
		await gqslfxzx()
		await $.wait(1000)

	} else {
		console.log(`资讯id：${DATA.msg}\n`);
		msg += `【资讯id】：${DATA.msg}\n`
	}
}
async function gqslfxzx(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/data/point?indexType=10&businessType=4&businessId=${zxid}&fromUserId=${userId}`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `分享资讯`, timeout);
	if (DATA.code == 0000) {
		await gqslfxzx1()
	} else {
		console.log(`分享资讯 ： ${DATA.data.msg}\n`);
		msg += `【分享资讯】： ${DATA.data.msg}\n`
	}
}
async function gqslfxzx1(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/customer-app/integral-task/complete/share?noLoad=true`,
		headers: gqslposthd,
		body: `{"taskType":${type}}`
	};
	let DATA = await httpPost(url, `分享资讯1`, timeout);
	if (DATA.code == 0000) {
		console.log(`【分享资讯】：成功\n`);
		msg += `【分享资讯】：成功\n`
	} else {
		console.log(`分享资讯： ${DATA.msg}\n`);
		msg += `【分享资讯】： ${DATA.msg}\n`
	}
}


async function gqslhdid(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/activity/queryByPage?fansUserId=&pageNo=1&pageSize=20&type=0`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `活动id`, timeout);
	if (DATA.code == 0000) {
		hdid = DATA.data.list[0].activityId
		await gqslfxhd()
		await $.wait(1000)

	} else {
		console.log(`活动id：${DATA.msg}\n`);
		msg += `【活动id】：${DATA.msg}\n`
	}
}
async function gqslfxhd(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/social-cms-app/frontend/data/point?indexType=1&businessType=5&businessId=${hdid}&fromUserId=${userId}`,
		headers: gqslgethd
	};
	let DATA = await httpGet(url, `分享活动`, timeout);
	if (DATA.code == 0000) {
		await gqslfxhd1()
	} else {
		console.log(`分享活动 ： ${DATA.data.msg}\n`);
		msg += `【分享活动】： ${DATA.data.msg}\n`
	}
}
async function gqslfxhd1(timeout = 3 * 1000) {
	let url = {
		url: `https://mspace.gmmc.com.cn/customer-app/integral-task/complete/share?noLoad=true`,
		headers: gqslposthd,
		body: `{"taskType":${type}}`
	};
	let DATA = await httpPost(url, `分享活动1`, timeout);
	if (DATA.code == 0000) {
		console.log(`【分享活动】：成功\n`);
		msg += `【分享活动】：成功\n`
	} else {
		console.log(`分享活动： ${DATA.msg}\n`);
		msg += `【分享活动】： ${DATA.msg}\n`
	}
}














//#region 固定代码
// ============================================变量检查============================================ \\

async function getCks(ck, str) {


	return new Promise((resolve, reject) => {

		let ckArr = []
		if (ck) {
			if (ck.indexOf("@") != -1) {

				ck.split("@").forEach((item) => {
					ckArr.push(item);
				});
			} else {
				ckArr.push(ck);
			}
			resolve(ckArr)
		} else {
			console.log(`\n 【${$.name}】：未填写变量 ${str}`)
		}

	})
}

// ============================================发送消息============================================ \\

async function SendMsg(message) {
	if (!message) return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require("../sendNotify");
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}

}

/**
 * 随机数生成
 */

function randomString(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}

/**
 * 随机整数生成
 */

function RT(X, Y) {
	do rt = Math.round(Math.random() * Y);
	while (rt < X)
	return rt;
}

function tss() {
	TS = Math.round(new Date().getTime() +
		new Date().getTimezoneOffset() * 60 * 1000 +
		8 * 60 * 60 * 1000).toString();

	return TS;
};


function task(method, taskurl, taskheader, taskbody) {
	return new Promise(async resolve => {
		let url = {
			url: taskurl,
			headers: taskheader,
			body: taskbody,
		}
		if (debug) {
			console.log(
				`\n 【debug】=============== 这是 ${S} 请求 url ===============`
			);
			console.log(url);
		}

		$[method](url, (err, resp, data) => {
			try {
				if (debug) {
					console.log(
						`\n\n 【debug】===============这是 ${S} 返回data==============`
					);
					console.log(data);
					console.log(`======`);
					console.log(JSON.parse(data));
				}
				if (err) {
					console.log(`${JSON.stringify(err)}`)
				} else {
					if (data) {
						if (data.indexOf(`<body>`) >= 0) {
							DATA = data
						} else {
							DATA = JSON.parse(data);
						}
					} else {
						console.log(`服务器返回数据为空`)
					}
				}
			} catch (e) {
				$.logErr(e, resp)
			} finally {
				resolve();
			}
		},
		timeout(3000)
		)
	})
}





// ============================================ debug调试 ============================================ \\
function debugLog(...args) {
	if (debug) {
		console.log(...args);
	}
}

function MD5Encrypt(a) {
	function b(a, b) {
		return a << b | a >>> 32 - b
	}

	function c(a, b) {
		var c, d, e, f, g;
		return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
	}

	function d(a, b, c) {
		return a & b | ~a & c
	}

	function e(a, b, c) {
		return a & c | b & ~c
	}

	function f(a, b, c) {
		return a ^ b ^ c
	}

	function g(a, b, c) {
		return b ^ (a | ~c)
	}

	function h(a, e, f, g, h, i, j) {
		return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
	}

	function i(a, d, f, g, h, i, j) {
		return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
	}

	function j(a, d, e, g, h, i, j) {
		return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
	}

	function k(a, d, e, f, h, i, j) {
		return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
	}

	function l(a) {
		for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
		return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
	}

	function m(a) {
		var b, c, d = "",
			e = "";
		for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
		return d
	}

	function n(a) {
		a = a.replace(/\r\n/g, "\n");
		for (var b = "", c = 0; c < a.length; c++) {
			var d = a.charCodeAt(c);
			128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
		}
		return b
	}
	var o, p, q, r, s, t, u, v, w, x = [],
		y = 7,
		z = 12,
		A = 17,
		B = 22,
		C = 5,
		D = 9,
		E = 14,
		F = 20,
		G = 4,
		H = 11,
		I = 16,
		J = 23,
		K = 6,
		L = 10,
		M = 15,
		N = 21;
	for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
	var O = m(t) + m(u) + m(v) + m(w);
	return O.toLowerCase()
	// .toUpperCase()
}
// prettier-ignore
function MD5Encrypt(a) {
	function b(a, b) {
		return a << b | a >>> 32 - b
	}

	function c(a, b) {
		var c, d, e, f, g;
		return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
	}

	function d(a, b, c) {
		return a & b | ~a & c
	}

	function e(a, b, c) {
		return a & c | b & ~c
	}

	function f(a, b, c) {
		return a ^ b ^ c
	}

	function g(a, b, c) {
		return b ^ (a | ~c)
	}

	function h(a, e, f, g, h, i, j) {
		return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
	}

	function i(a, d, f, g, h, i, j) {
		return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
	}

	function j(a, d, e, g, h, i, j) {
		return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
	}

	function k(a, d, e, f, h, i, j) {
		return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
	}

	function l(a) {
		for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
		return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
	}

	function m(a) {
		var b, c, d = "",
			e = "";
		for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
		return d
	}

	function n(a) {
		a = a.replace(/\r\n/g, "\n");
		for (var b = "", c = 0; c < a.length; c++) {
			var d = a.charCodeAt(c);
			128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
		}
		return b
	}
	var o, p, q, r, s, t, u, v, w, x = [],
		y = 7,
		z = 12,
		A = 17,
		B = 22,
		C = 5,
		D = 9,
		E = 14,
		F = 20,
		G = 4,
		H = 11,
		I = 16,
		J = 23,
		K = 6,
		L = 10,
		M = 15,
		N = 21;
	for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
	var O = m(t) + m(u) + m(v) + m(w);
	return O.toLowerCase()
}

function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
	class s {
		constructor(t) {
			this.env = t
		}
		send(t, e = "GET") {
			t = "string" == typeof t ? {
				url: t
			} : t;
			let s = this.get;
			return "POST" === e && (s = this.post), new Promise((e, i) => {
				s.call(this, t, (t, s, r) => {
					t ? i(t) : e(s)
				})
			})
		}
		get(t) {
			return this.send.call(this.env, t)
		}
		post(t) {
			return this.send.call(this.env, t, "POST")
		}
	}
	return new class {
		constructor(t, e) {
			this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
		}
		isNode() {
			return "undefined" != typeof module && !!module.exports
		}
		isQuanX() {
			return "undefined" != typeof $task
		}
		isSurge() {
			return "undefined" != typeof $httpClient && "undefined" == typeof $loon
		}
		isLoon() {
			return "undefined" != typeof $loon
		}
		toObj(t, e = null) {
			try {
				return JSON.parse(t)
			} catch {
				return e
			}
		}
		toStr(t, e = null) {
			try {
				return JSON.stringify(t)
			} catch {
				return e
			}
		}
		getjson(t, e) {
			let s = e;
			const i = this.getdata(t);
			if (i) try {
				s = JSON.parse(this.getdata(t))
			} catch { }
			return s
		}
		setjson(t, e) {
			try {
				return this.setdata(JSON.stringify(t), e)
			} catch {
				return !1
			}
		}
		getScript(t) {
			return new Promise(e => {
				this.get({
					url: t
				}, (t, s, i) => e(i))
			})
		}
		runScript(t, e) {
			return new Promise(s => {
				let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
				i = i ? i.replace(/\n/g, "").trim() : i;
				let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
				r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
				const [o, h] = i.split("@"), n = {
					url: `http://${h}/v1/scripting/evaluate`,
					body: {
						script_text: t,
						mock_type: "cron",
						timeout: r
					},
					headers: {
						"X-Key": o,
						Accept: "*/*"
					}
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}
		loaddata() {
			if (!this.isNode()) return {}; {
				this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					i = !s && this.fs.existsSync(e);
				if (!s && !i) return {}; {
					const i = s ? t : e;
					try {
						return JSON.parse(this.fs.readFileSync(i))
					} catch (t) {
						return {}
					}
				}
			}
		}
		writedata() {
			if (this.isNode()) {
				this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile),
					e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t),
					i = !s && this.fs.existsSync(e),
					r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}
		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i)
				if (r = Object(r)[t], void 0 === r) return s;
			return r
		}
		lodash_set(t, e, s) {
			return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
		}
		getdata(t) {
			let e = this.getval(t);
			if (/^@/.test(t)) {
				const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
				if (r) try {
					const t = JSON.parse(r);
					e = t ? this.lodash_get(t, i, "") : e
				} catch (t) {
					e = ""
				}
			}
			return e
		}
		setdata(t, e) {
			let s = !1;
			if (/^@/.test(e)) {
				const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}";
				try {
					const e = JSON.parse(h);
					this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
				} catch (e) {
					const o = {};
					this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
				}
			} else s = this.setval(t, e);
			return s
		}
		getval(t) {
			return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
		}
		setval(t, e) {
			return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
		}
		initGotEnv(t) {
			this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
		}
		get(t, e = (() => { })) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
				"X-Surge-Skip-Scripting": !1
			})), $httpClient.get(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
				hints: !1
			})), $task.fetch(t).then(t => {
				const {
					statusCode: s,
					statusCode: i,
					headers: r,
					body: o
				} = t;
				e(null, {
					status: s,
					statusCode: i,
					headers: r,
					body: o
				}, o)
			}, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
				try {
					if (t.headers["set-cookie"]) {
						const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
						s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
					}
				} catch (t) {
					this.logErr(t)
				}
			}).then(t => {
				const {
					statusCode: s,
					statusCode: i,
					headers: r,
					body: o
				} = t;
				e(null, {
					status: s,
					statusCode: i,
					headers: r,
					body: o
				}, o)
			}, t => {
				const {
					message: s,
					response: i
				} = t;
				e(s, i, i && i.body)
			}))
		}
		post(t, e = (() => { })) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
				"X-Surge-Skip-Scripting": !1
			})), $httpClient.post(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			});
			else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
				hints: !1
			})), $task.fetch(t).then(t => {
				const {
					statusCode: s,
					statusCode: i,
					headers: r,
					body: o
				} = t;
				e(null, {
					status: s,
					statusCode: i,
					headers: r,
					body: o
				}, o)
			}, t => e(t));
			else if (this.isNode()) {
				this.initGotEnv(t);
				const {
					url: s,
					...i
				} = t;
				this.got.post(s, i).then(t => {
					const {
						statusCode: s,
						statusCode: i,
						headers: r,
						body: o
					} = t;
					e(null, {
						status: s,
						statusCode: i,
						headers: r,
						body: o
					}, o)
				}, t => {
					const {
						message: s,
						response: i
					} = t;
					e(s, i, i && i.body)
				})
			}
		}
		time(t, e = null) {
			const s = e ? new Date(e) : new Date;
			let i = {
				"M+": s.getMonth() + 1,
				"d+": s.getDate(),
				"H+": s.getHours(),
				"m+": s.getMinutes(),
				"s+": s.getSeconds(),
				"q+": Math.floor((s.getMonth() + 3) / 3),
				S: s.getMilliseconds()
			};
			/(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
			for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
			return t
		}
		msg(e = t, s = "", i = "", r) {
			const o = t => {
				if (!t) return t;
				if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {
					"open-url": t
				} : this.isSurge() ? {
					url: t
				} : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"],
							s = t.mediaUrl || t["media-url"];
						return {
							openUrl: e,
							mediaUrl: s
						}
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl,
							s = t["media-url"] || t.mediaUrl;
						return {
							"open-url": e,
							"media-url": s
						}
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return {
							url: e
						}
					}
				}
			};
			if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
				let t = ["", "==============📣系统通知📣=============="];
				t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
			}
		}
		log(...t) {
			t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
		}
		logErr(t, e) {
			const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
			s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
		}
		wait(t) {
			return new Promise(e => setTimeout(e, t))
		}
		done(t = {}) {
			const e = (new Date).getTime(),
				s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}(t, e)
}