/**
 * 广汽传祺 
 * cron 10 8 * * *  yml2213_javascript_master/gqcq.js
 * 
 * 广汽传祺 app  
 * 4-13  完成签到 抽奖 分享 发帖 评论 任务   有bug及时反馈
 * 
 * 感谢所有测试人员
 * ========= 青龙 =========
 * 变量格式: export gqcq_data='token1 @ token2 '  多个账号用 @分割 
 * 
 * 抓包： 随便抓个有token的包就行了
 * 
 * 还是不会的请百度或者群里求助: QQ群: 1101401060  tg: https://t.me/yml_tg  通知: https://t.me/yml2213_tg
 */

const $ = new Env("广汽传祺");
// const jsname = "广汽传祺";
// const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
//////////////////////
const salt = '17aaf8118ffb270b766c6d6774317a133.4.0'
let gqcq_dataArr = [];
let topicNames = '', postId = '';
let gqcq_data = process.env.gqcq_data;
let ts = Math.round(new Date().getTime()).toString();

/////////////////////////////////////////////////////////
let textarr = ['最简单的提高观赏性的办法就是把地球故事的部分剪辑掉半小时， emo的部分剪辑掉半小时。这样剩下的90分钟我们就看看外星人，看看月球，看看灾难片大场面就不错。', '顶着叛国罪的风险无比坚信前妻，这种还会离婚？', '你以为它是灾难片，其实它是科幻片；你以为它是科幻片，其实它是恐怖片；你以为它是恐怖片，其实它是科教片', '我的天，剧情真的好阴谋论，但是还算是能自圆其说', '大杂烩啊……我能理解这电影为什么在海外卖的不好了，因为核心创意真的已经太老套了', '一开始我以为这就是外国人看《流浪地球》时的感受啊，后来发现这不是我当初看《胜利号》的感受么']
let add_comment_text_arr = ['感谢推荐的电影呢', '有时间一定看看这个电影怎么样', '晚上就去看', '66666666666', '这部电影我看过，非常好看']
ram_num = randomInt(1, 5)

let text = textarr[ram_num];
let add_comment_text = add_comment_text_arr[ram_num];

/////////////////////////////////////////////////////////

!(async () => {

	if (!(await Envs()))  //多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`本地脚本4-13 )`);

		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);
		console.log(`\n 脚本测试中,有bug及时反馈! \n`);

		console.log(`\n\n=========================================    \n脚本执行 - 北京时间(UTC+8): ${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000).toLocaleString()} \n=========================================\n`);

		await wyy();


		console.log(`\n=================== 共找到 ${gqcq_dataArr.length} 个账号 ===================`)


		for (let index = 0; index < gqcq_dataArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			data = gqcq_dataArr[index].split('&');
			if (debug) {
				console.log(`\n 【debug】 这是你第 ${num} 账号信息:\n ${data}\n`);
			}

			console.log('开始 检查任务列表');
			await task_list();
			await $.wait(2 * 1000);


		}


	}

})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done())



/**
 * 任务列表  task_list   post
 * https://gsp.gacmotor.com/gw/app/community/api/mission/getlistv1?place=1
 */
function task_list(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: 'https://gsp.gacmotor.com/gw/app/community/api/mission/getlistv1?place=1',
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Connection': 'Keep-Alive',
				'Accept-Encoding': 'gzip',

			},
			body: '',
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 任务列表 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 任务列表 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 获取任务列表:${result.errorMessage} 🎉 准备执行任务\n`);
					if (result.data[0].finishedNum == 0) {

						console.log(`\n 签到状态： 未签到，去执行签到 \n`);
						await signin();
						await $.wait(2 * 1000);

						console.log('顺便抽个奖吧！ 开始 抽奖');
						await lottery();
						await $.wait(2 * 1000);

					} else if (result.data[0].finishedNum == 1) {
						console.log(`签到状态：今天已经签到过了鸭，明天再来吧！`);
					} else {
						console.log(`\n 获取签到状态:  失败 ❌ 了呢,原因未知！\n ${result} \n `)
					}
					if (result.data[1].finishedNum < 2) {
						console.log(`\n 发帖：${result.data[1].finishedNum} / ${result.data[1].total} \n`);

						console.log(`\n 发帖：执行第一次发帖,评论，删除评论 \n`);
						await post_topic();
						await $.wait(3 * 1000);

						await add_comment();
						await $.wait(2 * 1000);

						await delete_topic();
						await $.wait(30 * 1000);


						console.log(`\n 发帖：执行第二次发帖,评论，删除评论 \n`);
						await post_topic();
						await $.wait(3 * 1000);

						await add_comment();
						await $.wait(2 * 1000);

						await delete_topic();
						await $.wait(2 * 1000);


					} else if (result.data[1].finishedNum == 2) {
						console.log(`\n 今天已经发帖了，明天再来吧！\n `);
					} else {
						console.log(`\n 获取发帖状态:  失败 ❌ 了呢,原因未知！\n ${result} \n `);
					}



					if (result.data[3].finishedNum < 2) {

						console.log(`\n 分享状态：${result.data[3].finishedNum} / ${result.data[3].total} \n`);

						await Article_list();
						await $.wait(2 * 1000);

						await share();
						await $.wait(2 * 1000);


						await Article_list();
						await $.wait(2 * 1000);

						await share();
						await $.wait(2 * 1000);


					} else if (result.data[3].finishedNum == 2) {
						// await Article_list();
						// await share();

						console.log(`\n 今天已经分享过了鸭，明天再来吧！\n `);
					} else {
						console.log(`\n 获取分享状态:  失败 ❌ 了呢,原因未知！\n ${result} \n `)
					}


				} else {

					console.log(`\n 获取任务列表:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




/**
 * 签到   get
 * https://gsp.gacmotor.com/gateway/app-api/sign/submit
 */
function signin(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	// console.log(reqNonc);
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: 'https://gsp.gacmotor.com/gateway/app-api/sign/submit',
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Connection': 'Keep-Alive',
				'Accept-Encoding': 'gzip'
			},
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 签到 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 签到 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 200) {

					console.log(`\n 签到:${result.errorMessage} 🎉 \n你已经连续签到 ${result.data.dayCount} 天;  签到获得G豆 ${result.data.operationValue} 个 \n`);


				} else if (result.errorCode == 200015) {

					console.log(`\n 签到:${result.errorMessage}\n`);


				} else {

					console.log(`\n 签到:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}


/**
 * 抽奖  每天免费一次  其他50G豆一次  trunaround   post
 * https://gsp.gacmotor.com/gw/app/activity/api/cge/trunaround
 */
function lottery(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: 'https://gsp.gacmotor.com/gw/app/activity/api/cge/trunaround',
			headers: {

				'token': data[0],
				'Host': 'gsp.gacmotor.com',
				// 'User-Agent': 'Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/80.0.3987.99 Mobile Safari/537.36;GACClient',
				'Origin': 'https://gsp.gacmotor.com',
				'Accept': 'application/json, text/plain, */*',
				'Cache-Control': 'no-cache',
				'Sec-Fetch-Dest': 'empty',
				'X-Requested-With': 'com.cloudy.component',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Mode': 'cors',
				'Referer': 'https://gsp.gacmotor.com/h5/html/draw/index.html',
				'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded'

			},
			body: 'activityCode=CGE',
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 抽奖 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 抽奖 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 抽奖:${result.errorMessage} 🎉 \n恭喜你获得 ${result.data.medalName} 奖品为 ${result.data.medalDescription} \n`);


				} else {

					console.log(`\n 抽奖:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}


/**
 * 获取 文章列表  Article_list   get
 * https://gsp.gacmotor.com/gw/app/community/api/post/channelPostList?current=1&size=20&channelId=&sortType=1
 */
function Article_list(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	// console.log(reqNonc);
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: `https://gsp.gacmotor.com/gw/app/community/api/post/channelPostList?current=1&size=40&channelId=&sortType=1`,
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Connection': 'Keep-Alive',
				'Accept-Encoding': 'gzip',
			},
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 文章列表 请求 url ===============`);
			console.log(url);
		}
		$.get(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 文章列表 返回data==============`);
					// console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 获取文章列表:${result.errorMessage} 🎉 \n`);
					let num = randomInt(1, 39);
					// console.log(num);
					console.log(`分享的文章: ${result.data.records[num].topicNames}  文章ID:${result.data.records[num].postId}`);
					postId = result.data.records[num].postId;
					// console.log(postId);




				} else {

					console.log(`\n 获取文章列表:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}



/**
 * 分享文章  每天两次   post
 * https://gsp.gacmotor.com/gw/app/community/api/post/forward
 */
function share(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: `https://gsp.gacmotor.com/gw/app/community/api/post/forward`,
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Connection': 'Keep-Alive',
				'Accept-Encoding': 'gzip'

			},
			body: `postId=${postId}&userId=`,
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 分享文章 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 分享文章 返回data==============`);
					console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 分享文章:${result.errorMessage} 🎉 \n`);


				} else {

					console.log(`\n 分享文章:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}


/**
 * 发布帖子  post
 * https://gsp.gacmotor.com/gw/app/community/api/topic/appsavepost
 */
function post_topic(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: `https://gsp.gacmotor.com/gw/app/community/api/topic/appsavepost`,
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Connection': 'Keep-Alive',
				'Accept-Encoding': 'gzip',
			},
			body: `postId=&postType=2&topicId=176&columnId=&postTitle=那些年我们看过的电影&postContent=[{"text":"${text}"}]&coverImg=https://pic-gsp.gacmotor.com/app/42a97ad9-0bfb-4205-b838-8170ad3289e2.png&publishedTime=&contentWords=${text}&contentImgNums=1&lng=&lat=&address=&cityId=`



			// `postId=&postType=2&topicId=176&columnId=&postTitle=那些年我们看过的电影&postContent=[{"text":"最简单的提高观赏性的办法就是把地球故事的部分剪辑掉半小时， emo的部分剪辑掉半小时。这样剩下的90分钟我们就看看外星人，看看月球，看看灾难片大场面就不错。"}]&coverImg=https://pic-gsp.gacmotor.com/app/42a97ad9-0bfb-4205-b838-8170ad3289e2.png&publishedTime=&contentWords=最简单的提高观赏性的办法就是把地球故事的部分剪辑掉半小时， emo的部分剪辑掉半小时。这样剩下的90分钟我们就看看外星人，看看月球，看看灾难片大场面就不错。&contentImgNums=1&lng=&lat=&address=&cityId=`
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 发布帖子 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 发布帖子 返回data==============`);
					// console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 发布帖子:${result.errorMessage} 🎉 \n帖子ID: ${result.data.postId} `);
					topic_id = result.data.postId;

				} else {

					console.log(`\n 发布帖子:  失败 ❌ 了呢,原因未知！\n ${result} \n `)
				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




/**
 * 评论帖子  post
 * https://gsp.gacmotor.com/gw/app/community/api/comment/add
 */
function add_comment(timeout = 3 * 1000) {
	let reqNonc = randomInt(100000, 999999)
	let reqSign = MD5Encrypt(`signature${reqNonc}${ts}${salt}`)

	return new Promise((resolve) => {
		let url = {
			url: `https://gsp.gacmotor.com/gw/app/community/api/comment/add`,
			headers: {

				'User-Agent': 'okhttp/3.10.0',
				'token': data[0],
				'verification': 'signature',
				'reqTs': ts,
				'reqNonc': reqNonc,
				'reqSign': reqSign,
				'Host': 'gsp.gacmotor.com',
				'Content-Type': 'application/x-www-form-urlencoded'

			},
			body: `commentType=0&postId=${topic_id}&commentContent=${add_comment_text}&commentId=0&commentatorId=NDIwNTA0NQ==&isReplyComment=1`



			// commentType=0&postId=3904810&commentContent=感谢推荐&commentId=0&commentatorId=NDIwNTA0NQ==&isReplyComment=1
		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 评论帖子 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 评论帖子 返回data==============`);
					// console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 评论帖子:${result.errorMessage} 🎉 \n`);

				} else {

					console.log(`\n 评论帖子:  失败 ❌ 了呢,原因未知！\n ${result} \n `)
				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




/**
 * 删除帖子  post
 * https://gsp.gacmotor.com/gw/app/community/api/post/delete
 */
function delete_topic(timeout = 3 * 1000) {

	return new Promise((resolve) => {
		let url = {
			url: `https://gsp.gacmotor.com/gw/app/community/api/post/delete`,
			headers: {

				'Origin': 'https://gsp.gacmotor.com',
				'Accept': 'application/json, text/plain, */*',
				'Cache-Control': 'no-cache',
				'Sec-Fetch-Dest': 'empty',
				'token': data[0],
				'X-Requested-With': 'com.cloudy.component',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Mode': 'cors',
				'Referer': 'https://gsp.gacmotor.com/h5/html/community/myHome.html?userId=NDIwNTA0NQ==&version=newApp',
				'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
				'Content-Type': 'application/x-www-form-urlencoded'

			},
			body: `postId=${topic_id}`,

		}

		if (debug) {
			console.log(`\n 【debug】=============== 这是 删除帖子 请求 url ===============`);
			console.log(url);
		}
		$.post(url, async (error, response, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 删除帖子 返回data==============`);
					// console.log(data)
					console.log(`======`)
					console.log(JSON.parse(data))
				}
				let result = JSON.parse(data);
				if (result.errorCode == 20000) {

					console.log(`\n 删除帖子: 帖子ID: ${topic_id} , 执行删除 ${result.errorMessage} 🎉 \n`)

				} else {

					console.log(`\n 删除帖子:  失败 ❌ 了呢,原因未知！\n ${result} \n `)

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




































//#region 固定代码
// ============================================变量检查============================================ \\
async function Envs() {
	console.log(gqcq_data);
	if (gqcq_data) {
		if (gqcq_data.indexOf("@") != -1) {
			gqcq_data.split("@").forEach((item) => {
				gqcq_dataArr.push(item);
			});
		} else {
			gqcq_dataArr.push(gqcq_data);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 gqcq_data`)
		return;
	}

	return true;
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
	if (!message)
		return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
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
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

//每日网抑云
function wyy(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://keai.icu/apiwyy/api`
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				console.log(`\n 【网抑云时间】: ${data.content}  by--${data.music}`);

			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)
	})
}

//#endregion



function MD5Encrypt(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }




// prettier-ignore
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }