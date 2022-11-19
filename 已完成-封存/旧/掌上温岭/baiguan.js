/**
 * 脚本地址: http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/baiguan.js
 * 转载请留信息,谢谢
 *
 * 百观  app (安卓最好下载  2.0.8 版本,ios随意)
 *
 * cron 10 7,12 * * *  yml2213_javascript_master/baiguan.js
 *
 *
 * 5-30		完成 签到  资讯阅读  分享资讯  资讯点赞  本地服务 任务
 * 5-31		增加社区任务,修复一个任务bug
 * 6-1		增加评论任务,基本完成所有任务,测试无 bug直接转正式基本
 *
 *
 * 感谢所有测试人员
 * ========= 青龙--配置文件 =========
 * 变量格式: export baiguan_data='X-SESSION-ID & X-REQUEST-ID @ X-SESSION-ID & X-REQUEST-ID'  多个账号用 换行 或 @分割
 * 
 * 抓包 vapp.tmuyun.com 这个域名 ,找到上面的变量即可
 *
 * tg频道: https://t.me/yml2213_tg  
 * tg群组: https://t.me/yml_tg    
 * qq频道: https://qun.qq.com/qqweb/qunpro/share?_wv=3&_wwv=128&appChannel=share&inviteCode=1W4InjV&appChannel=share&businessType=9&from=181074&biz=ka&shareSource=5
 * 
 */
const $ = new Env("百观");
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0			//0为关闭调试,1为打开调试,默认为0
///////////////////////////////////////////////////////////////////
let ckStr = process.env.baiguan_data;
let msg = "";
let ck = "";
let host = "vapp.tmuyun.com";
let hostname = "https://" + host;
let salt = 'FR*r!isE5W'
let ck_status = "";
let new_id = "";
let user_name = "";
let Community_new_id = "";
///////////////////////////////////////////////////////////////////
let VersionCheck = "0.1.3"
let thank = `\n 感谢 xx 的投稿`
///////////////////////////////////////////////////////////////////

async function tips(ckArr) {
	let Version_latest = await Version_Check('baiguan');
	let Version = `\n本地脚本:V0.1.3     远程仓库脚本:V${Version_latest}\n`
	console.log(`${Version}`);
	msg += `${Version}`

	// console.log(thank);
	// msg += `${thank}`

	await wyy();
	console.log(`\n================= 共找到 ${ckArr.length} 个账号 =================`);
	msg += `\n================= 共找到 ${ckArr.length} 个账号 =================`
	debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}


!(async () => {
	let ckArr = await getCks(ckStr, "baiguan_data");
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		console.log(`\n------------- 开始【第 ${num} 个账号】------------- `);
		msg += `\n------------- 开始【第 ${num} 个账号】------------- `

		ck = ckArr[index].split("&");

		debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done());


async function start() {

	console.log("开始 用户信息");
	await user_info();

	if (ck_status) {
		console.log("开始 任务列表");
		await task_list();
	}

	// await new_Comment();

}


/**
 * 用户信息    httpGet
 * https://vapp.tmuyun.com/api/user_mumber/account_detail
 */
async function user_info() {
	let ts = ts13();
	let _data = `/api/user_mumber/account_detail&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/user_mumber/account_detail`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `用户信息`);

	if (result.code == 0) {
		console.log(`    任务列表: 欢迎光临 ${result.data.rst.nick_name} 🎉  , 手机号: ${result.data.rst.mobile} , 积分 ${result.data.rst.total_integral} , 等级 ${result.data.rst.grade} ${result.data.rst.grade_name}`);
		msg += `\n    任务列表: 欢迎光临 ${result.data.rst.nick_name} 🎉  , 手机号: ${result.data.rst.mobile} , 积分 ${result.data.rst.total_integral} , 等级 ${result.data.rst.grade} ${result.data.rst.grade_name}`;
		user_name = result.data.rst.nick_name;
	} else {
		console.log(`    用户信息: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    用户信息: 失败 ❌ 了呢,原因未知!}`;
		return ck_status = false;
	}
}



/**
 * 任务列表    httpGet
 * /api/user_mumber/numberCenter&&6294ba9bfe3fc15cbf96bbcc&&5e107ab6-74ed-4c65-bc8a-f9ab11d7d558&&1653915287942&&FR*r!isE5W&&44
 */
async function task_list() {
	let ts = ts13();
	let _data = `/api/user_mumber/numberCenter&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/user_mumber/numberCenter`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `任务列表`);

	if (result.code == 0) {
		if (result.data.rst.user_task_list[0].finish_times < result.data.rst.user_task_list[0].frequency) {
			console.log(`    签到: ${result.data.rst.nick_name} 未签到 ,去签到喽!`);
			msg += `\n    签到: ${result.data.rst.nick_name} 未签到 ,去签到喽!`;
			console.log(`开始 签到`);
			await signIn();
		} else if (result.data.rst.user_task_list[0].finish_times == result.data.rst.user_task_list[0].frequency) {
			console.log(`    签到: ${result.data.rst.nick_name} 今天已经签到了 ,明天再来吧!`);
			msg += `\n    签到: ${result.data.rst.nick_name} 今天已经签到了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[1].finish_times < result.data.rst.user_task_list[1].frequency) {
			console.log(`    新闻资讯阅读: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[1].finish_times}/${result.data.rst.user_task_list[1].frequency}`);
			msg += `\n    新闻资讯阅读: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[1].finish_times}/${result.data.rst.user_task_list[1].frequency}`;
			let num = result.data.rst.user_task_list[1].frequency - result.data.rst.user_task_list[1].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始第 ${j + 1} 次 新闻资讯阅读`);
				await read_new();
			}
		} else if (result.data.rst.user_task_list[1].finish_times == result.data.rst.user_task_list[1].frequency) {
			console.log(`    新闻资讯阅读: ${result.data.rst.nick_name} ,完成了,明天再来吧!`);
			msg += `\n    新闻资讯阅读: ${result.data.rst.nick_name} ,完成了,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[2].finish_times < result.data.rst.user_task_list[2].frequency) {
			console.log(`    分享资讯给好友: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[2].finish_times}/${result.data.rst.user_task_list[2].frequency}`);
			msg += `\n    分享资讯给好友: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[2].finish_times}/${result.data.rst.user_task_list[2].frequency}`;
			let num = result.data.rst.user_task_list[2].frequency - result.data.rst.user_task_list[2].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 分享资讯给好友`);
				await dotask('分享资讯给好友', '3');
			}
		} else if (result.data.rst.user_task_list[2].finish_times == result.data.rst.user_task_list[2].frequency) {
			console.log(`    分享资讯给好友: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    分享资讯给好友: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[3].finish_times < result.data.rst.user_task_list[3].frequency) {
			console.log(`    新闻资讯评论: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[3].finish_times}/${result.data.rst.user_task_list[3].frequency}`);
			msg += `\n    新闻资讯评论: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[3].finish_times}/${result.data.rst.user_task_list[3].frequency}`;
			let num = result.data.rst.user_task_list[3].frequency - result.data.rst.user_task_list[3].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 新闻资讯评论`);
				await new_Comment();
			}
		} else if (result.data.rst.user_task_list[3].finish_times == result.data.rst.user_task_list[3].frequency) {
			console.log(`    新闻资讯评论: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    新闻资讯评论: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[4].finish_times < result.data.rst.user_task_list[4].frequency) {
			console.log(`    新闻资讯点赞: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[4].finish_times}/${result.data.rst.user_task_list[4].frequency}`);
			msg += `\n    新闻资讯点赞: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[4].finish_times}/${result.data.rst.user_task_list[4].frequency}`;
			let num = result.data.rst.user_task_list[4].frequency - result.data.rst.user_task_list[4].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 次新闻资讯点赞`);
				await new_like();
			}
		} else if (result.data.rst.user_task_list[4].finish_times == result.data.rst.user_task_list[4].frequency) {
			console.log(`    新闻资讯点赞: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    新闻资讯点赞: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[5].finish_times < result.data.rst.user_task_list[5].frequency) {
			console.log(`    使用本地服务: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[5].finish_times}/${result.data.rst.user_task_list[5].frequency}`);
			msg += `\n    使用本地服务: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[5].finish_times}/${result.data.rst.user_task_list[5].frequency}`;
			let num = result.data.rst.user_task_list[5].frequency - result.data.rst.user_task_list[5].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 使用本地服务`);
				await dotask('使用本地服务', '6');
			}
		} else if (result.data.rst.user_task_list[5].finish_times == result.data.rst.user_task_list[5].frequency) {
			console.log(`    使用本地服务: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    使用本地服务: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[7].finish_times < result.data.rst.user_task_list[7].frequency) {
			console.log(`    社区帖子分享: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[7].finish_times}/${result.data.rst.user_task_list[7].frequency}`);
			msg += `\n    社区帖子分享: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[7].finish_times}/${result.data.rst.user_task_list[7].frequency}`;
			let num = result.data.rst.user_task_list[7].frequency - result.data.rst.user_task_list[7].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 社区帖子分享`);
				await Community_share();
			}
		} else if (result.data.rst.user_task_list[7].finish_times == result.data.rst.user_task_list[7].frequency) {
			console.log(`    社区帖子分享: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    社区帖子分享: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

		if (result.data.rst.user_task_list[8].finish_times < result.data.rst.user_task_list[8].frequency) {
			console.log(`    社区帖子点赞: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[8].finish_times}/${result.data.rst.user_task_list[8].frequency}`);
			msg += `\n    社区帖子点赞: 进度 ${result.data.rst.nick_name} , ${result.data.rst.user_task_list[8].finish_times}/${result.data.rst.user_task_list[8].frequency}`;
			let num = result.data.rst.user_task_list[8].frequency - result.data.rst.user_task_list[8].finish_times;
			// console.log(num);
			for (let j = 0; j < num; j++) {
				console.log(`    开始 开始第 ${j + 1} 次 社区帖子点赞`);
				await Community_like();
			}
		} else if (result.data.rst.user_task_list[8].finish_times == result.data.rst.user_task_list[8].frequency) {
			console.log(`    社区帖子点赞: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`);
			msg += `\n    社区帖子点赞: ${result.data.rst.nick_name} ,完成了 ,明天再来吧!`;
		}

	} else {
		console.log(`    任务列表: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    任务列表: 失败 ❌ 了呢,原因未知!`;
	}
}


/**
 * 签到    httpGet
 */
async function signIn() {
	let ts = ts13();
	let _data = `/api/user_mumber/sign&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/user_mumber/sign`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `签到`);

	if (result.code == 0) {
		console.log(`    签到: ${result.data.reason} ,获得积分 ${result.data.signExperience}`);
		console.log(`*********以下测试使用*********`);
		console.log(result.data);
		msg += `\n    签到: ${result.data.reason} ,获得积分 ${result.data.signExperience}`;
		await wait(3);
	} else {
		console.log(`    签到: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    签到: 失败 ❌ 了呢,原因未知!}`;
	}
}


/**
 * 文章列表    httpGet
 * https://vapp.tmuyun.com/api/article/channel_list?channel_id=606566eaad61a43e7054b600&isDiangHao=false&is_new=true&list_count=500&size=10
 * /api/article/channel_list&&6294ba9bfe3fc15cbf96bbcc&&49a8982b-07ed-44ea-af61-858c4b4d0a8d&&1653915400372&&FR*r!isE5W&&44
 */
async function new_list() {
	let ts = ts13();
	let _data = `/api/article/channel_list&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/article/channel_list?channel_id=606566eaad61a43e7054b600&isDiangHao=false&is_new=true&list_count=500&size=10`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `文章列表`);

	if (result.code == 0) {
		console.log(`    文章列表: 成功`);
		// msg += `\n    文章列表: 成功`;
		await wait(3);
		let num = randomInt(1, 9);
		new_id = result.data.article_list[num].id;
	} else {
		console.log(`    文章列表: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    文章列表: 失败 ❌ 了呢,原因未知!}`;
	}
}


/**
 * 新闻资讯阅读    httpGet
 * https://vapp.tmuyun.com/api/article/detail?id=1455826
 */
async function read_new() {
	await new_list();
	let ts = ts13();
	let _data = `/api/article/detail&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let num_time = randomInt(3000, 20000)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/article/detail?id=${new_id}`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `新闻资讯阅读`);

	if (result.code == 0) {
		console.log(`    新闻资讯阅读: 成功`);
		msg += `\n    新闻资讯阅读: 成功`;
		await wait(3);
	} else {
		console.log(`    新闻资讯阅读: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    新闻资讯阅读: 失败 ❌ 了呢,原因未知!}`;
	}
}



/**
 * 新闻资讯评论    httpPost
 * https://vapp.tmuyun.com/api/comment/create
 */
async function new_Comment() {
	await new_list();
	let ts = ts13();
	let _data = `/api/comment/create&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let Comment_textArr = ["支持", 6666, "点赞", "越来越好了"];
	let num = randomInt(1, 4);
	let Comment_text = Comment_textArr[num];
	let url = {
		url: `${hostname}/api/comment/create`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {
			'channel_article_id': new_id,
			'content': Comment_text,
		}
	};
	let result = await httpPost(url, `新闻资讯评论`);

	if (result.code == 0) {
		console.log(`    新闻资讯评论: 成功`);
		msg += `\n    新闻资讯评论: 成功`;
		await wait(3);
		await Comment_list(new_id);
	} else {
		console.log(`    新闻资讯评论: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    新闻资讯评论: 失败 ❌ 了呢,原因未知!}`;
	}
}


/**
 * 获取评论列表    httpGet
 * https://vapp.tmuyun.com/api/comment/list?channel_article_id=1455280
 */
async function Comment_list(new_id) {
	let ts = ts13();
	let _data = `/api/comment/list&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let num_time = randomInt(3000, 20000)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/comment/list?channel_article_id=${new_id}`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `获取评论列表`);

	if (result.code == 0 && result.data.comment_count > 0) {
		console.log(`    获取评论列表: 成功`);
		// msg += `\n    获取评论列表: 成功`;
		for (let index = 0; index < result.data.comment_list.length; index++) {
			let data = result.data.comment_list[index];
			// console.log(data.nick_name);
			if (user_name == data.nick_name) {
				commentID = data.id;
				await wait(2);
				await delete_comment(commentID);
			}
		}

	} else {
		console.log(`    获取评论列表: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    获取评论列表: 失败 ❌ 了呢,原因未知!}`;
	}
}




/**
 * 删除评论    httpPost
 * https://vapp.tmuyun.com/api/comment/delete
 */
async function delete_comment(commentID) {
	let ts = ts13();
	let _data = `/api/comment/delete&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let url = {
		url: `${hostname}/api/comment/delete`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {
			'comment_id': commentID,
		}
	};
	let result = await httpPost(url, `删除评论`);

	if (result.code == 0) {
		console.log(`    删除评论: 成功`);
		msg += `\n    删除评论: 成功`;
	} else {
		console.log(`    删除评论: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    删除评论: 失败 ❌ 了呢,原因未知!}`;
	}
}






/**
 * 分享资讯给好友 3    使用本地服务 6   httpPost
 * https://vapp.tmuyun.com/api/user_mumber/doTask
 */
async function dotask(name, num) {
	await new_list();
	let ts = ts13();
	let _data = `/api/user_mumber/doTask&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/user_mumber/doTask`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {
			'memberType': num,
			'member_type': num
		}
	};
	let result = await httpPost(url, name);

	if (result.code == 0) {
		console.log(`    分享资讯给好友: 成功`);
		msg += `\n    分享资讯给好友: 成功`;
		await wait(3);
	} else {
		console.log(`    分享资讯给好友: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    分享资讯给好友: 失败 ❌ 了呢,原因未知!}`;
	}
}


/**
 * 新闻资讯点赞    httpPost
 * https://vapp.tmuyun.com/api/user_mumber/doTask
 */
async function new_like() {
	await new_list();
	let ts = ts13();
	let _data = `/api/favorite/like&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/favorite/like`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {
			'action': 'true',
			'id': new_id
		}
	};
	let result = await httpPost(url, `新闻资讯点赞`);

	if (result.code == 0) {
		console.log(`    新闻资讯点赞: 成功`);
		msg += `\n    新闻资讯点赞: 成功`;
		await wait(3);
	} else {
		console.log(`    新闻资讯点赞: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    新闻资讯点赞: 失败 ❌ 了呢,原因未知!}`;
	}
}



/**
 * 社区帖子列表    httpGet
 * https://vapp.tmuyun.com/api/forum/thread_list?forum_id=174
 */
async function Community_new_list() {
	let ts = ts13();
	let _data = `/api/forum/thread_list&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	// console.log(sign);
	let url = {
		url: `${hostname}/api/forum/thread_list?forum_id=174`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
	};
	let result = await httpGet(url, `社区帖子列表`);

	if (result.code == 0) {
		console.log(`    社区帖子列表: 成功`);
		msg += `\n    社区帖子列表: 成功`;
		await wait(3);
		let num = randomInt(1, 9);
		Community_new_id = result.data.thread_list[num].id;
	} else {
		console.log(`    社区帖子列表: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    社区帖子列表: 失败 ❌ 了呢,原因未知!}`;
	}
}



/**
 * 社区帖子分享    httppost
 * https://vapp.tmuyun.com/api/user_mumber/doTask?member_type=14&target_id=21452
 */
async function Community_share() {
	await Community_new_list();
	let ts = ts13();
	let _data = `/api/user_mumber/doTask&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let url = {
		url: `${hostname}/api/user_mumber/doTask?member_type=14&target_id=${Community_new_id}`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {}
	}
	let result = await httpPost(url, `社区帖子分享`);

	if (result.code == 0) {
		console.log(`    社区帖子分享: 成功`);
		msg += `\n    社区帖子分享: 成功`;
		await wait(3);
	} else {
		console.log(`    社区帖子分享: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    社区帖子分享: 失败 ❌ 了呢,原因未知!}`;
	}
}




/**
 * 社区帖子点赞    httppost
 * https://vapp.tmuyun.com/api/forum/like
 */
async function Community_like() {
	await Community_new_list();
	let ts = ts13();
	let _data = `/api/forum/like&&${ck[0]}&&${ck[1]}&&${ts}&&${salt}&&44`
	let sign = sha256_Encrypt(_data)
	let url = {
		url: `${hostname}/api/forum/like`,
		headers: {
			'X-SESSION-ID': ck[0],
			'X-REQUEST-ID': ck[1],
			'X-TIMESTAMP': ts,
			'X-SIGNATURE': sign,
			'X-TENANT-ID': '44',
			'Host': host,
		},
		form: {
			'target_type': '1',
			'target_id': Community_new_id
		}
	}
	let result = await httpPost(url, `社区帖子点赞`);

	if (result.code == 0) {
		console.log(`    社区帖子点赞: 成功`);
		msg += `\n    社区帖子点赞: 成功`;
		await wait(3);
	} else {
		console.log(`    社区帖子点赞: 失败 ❌ 了呢,原因未知!`);
		console.log(result);
		msg += `\n    社区帖子点赞: 失败 ❌ 了呢,原因未知!}`;
	}
}




























//#region ********************************固定代码********************************

/**
 * 变量检查
 */
async function getCks(ck, str) {
	return new Promise((resolve) => {
		let ckArr = []
		if (ck) {
			if (ck.indexOf("@") !== -1) {
				ck.split("@").forEach((item) => {
					ckArr.push(item);
				});
			} else if (ck.indexOf("\n") !== -1) {

				ck.split("\n").forEach((item) => {
					ckArr.push(item);
				});
			} else {
				ckArr.push(ck);
			}
			resolve(ckArr)
		} else {
			console.log(` :未填写变量 ${str}`)
		}
	}
	)
}


/**
 * 获取远程版本
 * http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/baiguan.js
 */
function Version_Check(name) {
	return new Promise((resolve) => {
		let url = {
			url: `http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/baiguan.js`,
		}
		$.get(url, async (err, resp, data) => {
			try {
				VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve(VersionCheck)
			}
		}, timeout = 3 * 1000)
	})
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

function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min);
}


/**
 * 时间戳 13位
 */

function ts13() {
	return Math.round(new Date().getTime()).toString();
}

/**
 * 时间戳 10位
 */

function ts10() {
	return Math.round(new Date().getTime() / 1000).toString();
}

/**
 * 获取当前小时数
 */

function local_hours() {
	let myDate = new Date();
	h = myDate.getHours();
	return h;
}

/**
 * 获取当前分钟数
 */

function local_minutes() {
	let myDate = new Date();
	m = myDate.getMinutes();
	return m;
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
 * 每日网抑云
 */
function wyy() {
	return new Promise((resolve) => {
		let url = {
			url: `http://ovooa.com/API/wyrp/api.php`,
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				// console.log(data);
				console.log(`【网抑云时间】 ${data.data.Content}  by--${data.data.Music}`);

			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout = 3 * 1000)
	})
}

/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = getUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.get(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`======`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					resolve(result);
				} catch (e) {
					// console.log(err, resp);
					// console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					// msg += `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

/**
 * post请求
 */
async function httpPost(postUrlObject, tip, timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = postUrlObject;
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 url ===============`);
			console.log(url);
		}

		$.post(
			url,
			async (err, resp, data) => {
				try {
					if (debug) {
						console.log(`\n\n 【debug】===============这是 ${tip} 返回data==============`);
						console.log(data);
						console.log(`======`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					resolve(result);
				} catch (e) {
					// console.log(err, resp);
					// console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					// msg += `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}




/**
 * debug调试
 */
function debugLog(...args) {
	if (debug) {
		console.log(...args);
	}
}


/* SHA256 logical functions */
function rotateRight(n, x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x, y, z) {
	return ((x & y) ^ (~x & z));
}
function majority(x, y, z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j & 0x0f] += sha256_sigma1(W[(j + 14) & 0x0f]) + W[(j + 9) & 0x0f] +
		sha256_sigma0(W[(j + 1) & 0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
overflow) */
function safe_add(x, y) {
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	/* Initialize registers with the previous intermediate value */
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

	/* make 32-bit words */
	for (var i = 0; i < 16; i++)
		W[i] = ((buffer[(i << 2) + 3]) | (buffer[(i << 2) + 2] << 8) | (buffer[(i << 2) + 1]
			<< 16) | (buffer[i << 2] << 24));

	for (var j = 0; j < 64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if (j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
	}

	/* Compute the current intermediate hash value */
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	/* Compute number of bytes mod 64 */
	index = ((count[0] >> 3) & 0x3f);
	var remainder = (inputLen & 0x3f);

	/* Update number of bits */
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	/* Transform as many times as possible */
	for (i = 0; i + 63 < inputLen; i += 64) {
		for (var j = index; j < 64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	/* Buffer remaining input */
	for (var j = 0; j < remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
	buffer[index++] = 0x80;
	if (index <= 56) {
		for (var i = index; i < 56; i++)
			buffer[i] = 0;
	} else {
		for (var i = index; i < 64; i++)
			buffer[i] = 0;
		sha256_transform();
		for (var i = 0; i < 56; i++)
			buffer[i] = 0;
	}
	buffer[56] = (count[1] >>> 24) & 0xff;
	buffer[57] = (count[1] >>> 16) & 0xff;
	buffer[58] = (count[1] >>> 8) & 0xff;
	buffer[59] = count[1] & 0xff;
	buffer[60] = (count[0] >>> 24) & 0xff;
	buffer[61] = (count[0] >>> 16) & 0xff;
	buffer[62] = (count[0] >>> 8) & 0xff;
	buffer[63] = count[0] & 0xff;
	sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
	var j = 0;
	var output = new Array(32);
	for (var i = 0; i < 8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
	var output = new String();
	for (var i = 0; i < 8; i++) {
		for (var j = 28; j >= 0; j -= 4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

/* Main function: returns a hex string representing the SHA256 value of the 
given data */
function sha256_Encrypt(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
	return sha256_encode_hex();
}


// 忽略
function Env(t, e) {
	"undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

	class s {
		constructor(t) {
			this.env = t
		}

		send(t, e = "GET") {
			t = "string" == typeof t ? { url: t } : t;
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
			} catch {
			}
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
				this.get({ url: t }, (t, s, i) => e(i))
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
					body: { script_text: t, mock_type: "cron", timeout: r },
					headers: { "X-Key": o, Accept: "*/*" }
				};
				this.post(n, (t, e, i) => s(i))
			}).catch(t => this.logErr(t))
		}

		loaddata() {
			if (!this.isNode()) return {};
			{
				this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
				const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
				if (!s && !i) return {};
				{
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
				const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
					s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
				s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
			}
		}

		lodash_get(t, e, s) {
			const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
			let r = t;
			for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
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
				const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
					h = i ? "null" === o ? null : o || "{}" : "{}";
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

		get(t, e = (() => {
		})) {
			t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			})) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
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
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
			}, t => {
				const { message: s, response: i } = t;
				e(s, i, i && i.body)
			}))
		}

		post(t, e = (() => {
		})) {
			if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => {
				!t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
			}); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => {
				const { statusCode: s, statusCode: i, headers: r, body: o } = t;
				e(null, { status: s, statusCode: i, headers: r, body: o }, o)
			}, t => e(t)); else if (this.isNode()) {
				this.initGotEnv(t);
				const { url: s, ...i } = t;
				this.got.post(s, i).then(t => {
					const { statusCode: s, statusCode: i, headers: r, body: o } = t;
					e(null, { status: s, statusCode: i, headers: r, body: o }, o)
				}, t => {
					const { message: s, response: i } = t;
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
				if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0;
				if ("object" == typeof t) {
					if (this.isLoon()) {
						let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
						return { openUrl: e, mediaUrl: s }
					}
					if (this.isQuanX()) {
						let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
						return { "open-url": e, "media-url": s }
					}
					if (this.isSurge()) {
						let e = t.url || t.openUrl || t["open-url"];
						return { url: e }
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
			const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
			this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
		}
	}(t, e)
}

     //#endregion

