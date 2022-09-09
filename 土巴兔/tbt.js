/**
 * 脚本地址:   https://raw.githubusercontent.com/yml2213/javascript/master/tbt/tbt.js
 * 转载请留信息,谢谢
 * 
 * 下载地址: 自己下载即可
 * 
 *
 * 土巴兔装修  app
 *
 * cron 10 7,12 * * *  tbt.js
 *
 * 9.10		完成部分任务
 *
 * ========= 青龙--配置文件 =========
 * 变量格式: export tbt='ticket @ ticket'   ,多账号用 换行 或 @ 分割
 * 
 * 抓包 api.metayunduan.com , 找到 x-auth-token 即可
 * ====================================
 * tg频道: https://t.me/yml2213_tg  
 */

const $ = new Env("土巴兔");
const alias_name = 'tbt'
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1 		//0为关闭通知,1为打开通知,默认为1
const debug = 0			//0为关闭调试,1为打开调试,默认为0
//---------------------------------------------------------------------------------------------------------
let ckStr = process.env[alias_name];
let msg, ck;
let uid, word_id, video_id;
let ck_status = true;

//---------------------------------------------------------------------------------------------------------
let VersionCheck = "0.0.1"
let Change = '领取每日任务!'
let thank = `\n感谢 群友 的投稿\n`
//---------------------------------------------------------------------------------------------------------

async function tips(ckArr) {
	let Version_latest = await Version_Check(alias_name, '1');
	let Version = `\n📌 本地脚本: V ${VersionCheck}  远程仓库脚本: V ${Version_latest}`
	DoubleLog(`${Version}\n📌 🆙 更新内容: ${Change}`);
	// DoubleLog(`${thank}`);
	await wyy();
	DoubleLog(`\n========== 共找到 ${ckArr.length} 个账号 ==========`);
	debugLog(`【debug】 这是你的账号数组:\n ${ckArr}`);
}




async function start() {

	// await user_info('用户信息');
	await coin_info('兔币查询');

	if (ck_status) {
		await sign_info('签到信息');

		await task_list('任务列表');
		await coin_info('兔币查询');


		// await alterScore('推荐列表', 1);
		// // await word_list('文章列表');


		// // await video_list('视频列表');


	}

}






// 兔币查询
async function coin_info(name) {
	try {
		console.log(`开始 ${name}`);
		let url = {
			url: `https://apigwc2.to8to.com/cgi/cre/credits/task/center?ticket=${ck[0]}&source=tbt-app`,
			headers: {
				'Host': 'apigwc2.to8to.com'
			},
			body: 'args={"pubArgs":"{}"}'
		};
		let result = await httpPost(url, name);

		if (result.status == 200) {
			DoubleLog(`兔币余额: ${result?.result?.userCredits?.credits} 个`);
			uid = result?.result?.userCredits?.uid
			// console.log(uid);
			return uid
		} else {
			DoubleLog(`用户信息: 失败 ❌ 了呢,原因未知!`);
			// console.log(result);
			return ck_status = false;
		}
	} catch (error) {
		console.log(error)
	}
}





//  任务列表
async function task_list(name) {
	try {
		DoubleLog(`开始 ${name}`);
		let url = {
			url: `https://apigwc2.to8to.com/cgi/cre/credits/task/center?ticket=${ck[0]}&source=tbt-app`,
			headers: {
				'Host': 'apigwc2.to8to.com'
			},
			body: 'args={"pubArgs":"{}"}'
		};
		let result = await httpPost(url, name);

		if (result.status == 200) {
			taskArr = result?.result?.ruleTypeList[1]?.ruleList;
			// console.log(taskArr);

			for (let index = 0; index < taskArr.length; index++) {
				let ruleTitle = taskArr[index].ruleTitle;
				let schedule = taskArr[index].schedule;
				let cycleCount = taskArr[index].cycleCount;
				let ruleCode = taskArr[index].ruleCode;
				let num = cycleCount - schedule;
				// console.log(ruleTitle, num);
				if (ruleCode == 'Daily_login' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await login(ruleTitle, num);
				} else if (ruleCode == 'view_diary' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await alterScore(ruleTitle, num);
				} else if (ruleCode == 'Collection' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await Collection(ruleTitle, num);
				} else if (ruleCode == 'Share' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await Share(ruleTitle, num);
				} else if (ruleCode == 'Answer' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
				} else if (ruleCode == 'Attention' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await follow(ruleTitle, num);
				} else if (ruleCode == 'Photo' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
				} else if (ruleCode == 'Diary' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
				} else if (ruleCode == 'Like' && num != 0) {
					console.log(ruleTitle, '剩余', num, '次');
					await Like(ruleTitle, num);
				}


			}

		} else {
			DoubleLog(`任务列表: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}

}



// 签到
async function sign_info(name) {
	DoubleLog(`开始 ${name}`);

	try {
		let url = {
			url: `https://apigwc2.to8to.com/cgi/cre/sevenDays/checkSign?source=tbt-app&ticket=${ck[0]}`,
			headers: {
				'Host': 'apigw.to8to.com',
			},
			body: `args=%7B%7D`

		};
		let result = await httpPost(url, '签到信息');
		// console.log(result);
		if (result?.status == 200 && result?.result == false) {
			DoubleLog(`${name}: 未签到， 执行签到`);
			await do_sign('签到信息');
		} else if (result?.result == true) {
			DoubleLog(`${name}: 已签到!`);
			// console.log(result);
		} else {
			DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}
	} catch (error) {
		console.log(error);
	}

	async function do_sign(name) {
		try {
			let url = {
				url: `https://apigwc2.to8to.com/cgi/cre/sevenDays/sign?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigwc2.to8to.com',
				},
				body: 'args=%7B%7D'
			};
			let result = await httpPost(url, '签到');

			// console.log(result);

			if (result?.status == 200) {
				DoubleLog(`${name}: 成功， 已签到${result.result.signContinuousDays}，获得积分 ${result.result.credits}`);
				await wait(5);
			} else if (result.status == 1007) {
				DoubleLog(`${name}: ${result.message}`);
			} else {
				DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}


}



// 收藏相关  
async function Collection(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await word_list('推荐列表')
		await do_Collection(word_id)
		// await cancel_Collection(word_id)
	}


	async function do_Collection(word_id) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/ics/interaction/objectCollect?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `{"args":{"uid":"${uid}","moduleCode":"video","objectId":"${word_id}","pubArgs":"{}"}}`
			};
			let result = await httpPost(url, ruleTitle);

			// console.log(result);

			if (result?.status == 200) {
				DoubleLog(`收藏: 文章${word_id}, 获得积分 ${result.result.score}`);
				await wait(20);
			} else if (result.status == 30002) {
				DoubleLog(`收藏: ${result.message}`);
			} else {
				DoubleLog(`收藏: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async function cancel_Collection(word_id) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/ics/interaction/objectCancelCollect?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `{"args":{"uid":"${uid}","moduleCode":"video","objectId":"${word_id}","pubArgs":"{}"}}`
			};
			let result = await httpPost(url, '取消收藏');
			// console.log(result);

			if (result?.status == 200) {
				DoubleLog(`取消收藏: 文章${word_id}, 成功`);
				await wait(3);
			} else if (result.status == 30001) {
				DoubleLog(`取消收藏: ${result.message}`);
			} else {
				DoubleLog(`取消收藏: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}




}


// 关注相关  
async function follow(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await video_list('视频列表')
		await do_follow(video_id)
		// await cancel_follow(video_id)
	}

	async function do_follow(video_id) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/ics/relationship/follow?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `{"args":{"uid":"${uid}","followUid":"${video_id}","pubArgs":"{\\"channel\\":\\"小米\\",\\"appversion\\":\\"9.29.0\\",\\"systemversion\\":\\"31\\",\\"apkPackageName\\":\\"com.to8to.housekeeper\\",\\"appid\\":\\"15\\",\\"appName\\":\\"to8to-app\\",\\"version\\":\\"2.5\\",\\"appostype\\":\\"1\\",\\"appversioncode\\":\\"102900\\",\\"deviceModel\\":\\"thyme-M2102J2SC\\",\\"device\\":\\"Xiaomi-M2102J2SC\\",\\"isnew\\":\\"0\\",\\"cityName\\":\\"滨州\\",\\"cityId\\":\\"1386\\",\\"cityid\\":\\"1386\\",\\"imei\\":\\"2a8923ab9678a160f80c0cc0a96e333c\\",\\"t8t_device_id\\":\\"2a8923ab9678a160f80c0cc0a96e333c\\",\\"first_id\\":\\"2a8923ab9678a160f80c0cc0a96e333c\\",\\"citySource\\":\\"2\\",\\"ticket\\":\\"xEchELc0wwDP45hmAQ0NyY7T1OIJFvkYmOMwfmWp2LmI6rEl4ATjyc8VbNZzDTTEjzNX23-_vkNuBDjoGGsUJqmQYhC_GNrH2iF1v2v7cORyyedAVivc_LFWAXgO1Uar\\",\\"to8to_token\\":\\"xEchELc0wwDP45hmAQ0NyY7T1OIJFvkYmOMwfmWp2LmI6rEl4ATjyc8VbNZzDTTEjzNX23-_vkNuBDjoGGsUJqmQYhC_GNrH2iF1v2v7cORyyedAVivc_LFWAXgO1Uar\\",\\"accountId\\":\\"31472783\\",\\"oaid\\":\\"e998cb31be347dc0\\"}"}}`

			};
			let result = await httpPost(url, ruleTitle);

			// console.log(result);
			if (result?.status == 200) {
				DoubleLog(`关注: 视频${video_id}, 获得积分 ${result.result.score}`);
				await wait(5);
			} else if (result.status == 10011) {
				DoubleLog(`关注: ${result.message}`);
			} else {
				DoubleLog(`关注: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}






}


// 为精彩的内容点赞  
async function Like(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await video_list2('视频列表2')
		await do_Like(video_id)
		// await cancel_follow(video_id)
	}

	// https://apigw.to8to.com/cgi/ics/owner/objectPraise?uid=19791703&accountId=31476840&source=tbt-app&ticket=xEchELc0wwDP45hmAQ0NyQhnScH9dxLCL2701SI8AV83okEUD5-39LLE0eBv-2CC43zwMAuQhB2wqOfntwyuYczcN10eah6fAHaIXYJAsOByyedAVivc_LFWAXgO1Uar
	async function do_Like(video_id) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/ics/owner/objectPraise?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `{"args":{"uid":"${uid}","moduleCode":"ugcMeitu","objectId":"${video_id}","pubArgs":"{\\"imei\\":\\"e6e13eb7aae26390b23f7359b568f03f\\",\\"t8t_device_id\\":\\"e6e13eb7aae26390b23f7359b568f03f\\",\\"first_id\\":\\"e6e13eb7aae26390b23f7359b568f03f\\",\\"channel\\":\\"小米\\",\\"appversion\\":\\"9.29.0\\",\\"systemversion\\":\\"31\\",\\"apkPackageName\\":\\"com.to8to.housekeeper\\",\\"appid\\":\\"15\\",\\"appName\\":\\"to8to-app\\",\\"version\\":\\"2.5\\",\\"appostype\\":\\"1\\",\\"appversioncode\\":\\"102900\\",\\"deviceModel\\":\\"thyme-M2102J2SC\\",\\"device\\":\\"Xiaomi-M2102J2SC\\",\\"isnew\\":\\"1\\",\\"cityName\\":\\"滨州\\",\\"cityId\\":\\"1386\\",\\"cityid\\":\\"1386\\",\\"citySource\\":\\"2\\",\\"oaid\\":\\"e998cb31be347dc0\\",\\"uid\\":\\"${uid}\\",\\"ticket\\":\\"xEchELc0wwDP45hmAQ0NyQhnScH9dxLCL2701SI8AV83okEUD5-39LLE0eBv-2CC43zwMAuQhB2wqOfntwyuYczcN10eah6fAHaIXYJAsOByyedAVivc_LFWAXgO1Uar\\",\\"to8to_token\\":\\"xEchELc0wwDP45hmAQ0NyQhnScH9dxLCL2701SI8AV83okEUD5-39LLE0eBv-2CC43zwMAuQhB2wqOfntwyuYczcN10eah6fAHaIXYJAsOByyedAVivc_LFWAXgO1Uar\\",\\"accountId\\":\\"31476840\\"}"}}`
				// {"args":{"uid":"19791703","moduleCode":"ugcMeitu","objectId":"318553","pubArgs":"{}"}}

			};
			let result = await httpPost(url, ruleTitle);

			// console.log(result);
			if (result?.status == 200) {
				DoubleLog(`${ruleTitle}: 视频${video_id}, 获得积分 ${result.result.score}`);
				await wait(5);
			} else if (result.status == 10011) {
				DoubleLog(`${ruleTitle}: ${result.message}`);
			} else {
				DoubleLog(`${ruleTitle}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

}




// 看日记，总结装修经验 (浏览日记)
async function alterScore(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await do_alterScore('浏览日记')
	}

	async function do_alterScore(name) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/cre/credits/app/alterScore?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `args={"ruleCode":"view_diary","pubArgs":"{}"}`

			};
			let result = await httpPost(url, ruleTitle);
			// console.log(result);
			if (result?.status == 200) {
				DoubleLog(`${name}: 获得积分 ${result.result.score}`);
				await wait(5);
			} else {
				DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}
}


// 分享好内容给朋友
async function Share(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await do_Share('分享')
	}

	async function do_Share(name) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/cre/credits/app/alterScore?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `args={"ruleCode":"Share","pubArgs":"{}"}`

			};
			let result = await httpPost(url, ruleTitle);
			// console.log(result);
			if (result?.status == 200) {
				DoubleLog(`${name}: 获得积分 ${result.result.score}`);
				await wait(5);
			} else {
				DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}
}


// 每日登录app
async function login(ruleTitle, num) {
	DoubleLog(`开始 ${ruleTitle}`);
	for (let index = 0; index < num; index++) {
		await do_login('登录')
	}

	async function do_login(name) {
		try {
			let url = {
				url: `https://apigw.to8to.com/cgi/cre/credits/app/alterScore?source=tbt-app&ticket=${ck[0]}`,
				headers: {
					'Host': 'apigw.to8to.com',
				},
				body: `args={"ruleCode":"Daily_login","pubArgs":"{}"}`

			};
			let result = await httpPost(url, ruleTitle);
			// console.log(result);
			if (result?.status == 200) {
				DoubleLog(`${name}: 获得积分 ${result.result.score}`);
				await wait(5);
			} else {
				DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}
}




//文章列表  post
async function word_list(name) {
	word_id = ''
	try {

		let Option = {
			url: `https://apigw.to8to.com/cgi/gw/opts/index/entrances/v2?ticket=ck[1]&source=tbt-app`,
			headers: {},
			body: 'args={"wholeCode":"7!710!71001!28","pubArgs":"{\\"appversion\\":\\"9.29.0\\",\\"cityid\\":\\"1386\\"}"}'
		};
		let result = await httpPost(Option, name);
		// console.log(result);

		if (result.status == 200) {
			word_lists = result.result.topEntrances[1].entrances;
			// console.log(word_lists);
			let num = randomInt(1, word_lists.length);
			word_id = word_lists[num].id
			// console.log(`=============================`);
			return word_id;


		}
	} catch (error) {
		console.log(error)
	}
}



//视频列表  post  https://apigw.to8to.com/cgi/gw/feed/chunk/v4?&uid=19791703&accountId=31476840&source=tbt-app&ticket=xEchELc0wwDP45hmAQ0NyQhnScH9dxLCL2701SI8AV83okEUD5-39LLE0eBv-2CC43zwMAuQhB2wqOfntwyuYczcN10eah6fAHaIXYJAsOByyedAVivc_LFWAXgO1Uar
async function video_list(name) {
	video_id = ''
	try {

		let Option = {
			url: `https://apigw.to8to.com/cgi/views/vms/video/clientQueryVideoListWithFlow?ticket=${ck[0]}&source=tbt-app`,
			headers: {},
			body: '{"args":{"excludedBizObj":[{"bizId":"363692","bizType":"b0038"}],"bizType":"b0038","bizId":"363692","pageSize":20,"pubArgs":"{\\"appversion\\":\\"9.29.0\\",\\"first_id\\":\\"2a8923ab9678a160f80c0cc0a96e333c\\"}"}}'
			// {"args":{"uid":"19788623","moduleCode":"video","objectId":"8821560","pubArgs":"{}"}}
		};
		let result = await httpPost(Option, name);
		// console.log(result);

		if (result.status == 200) {
			video_lists = result.result.rows;
			// console.log(video_lists);

			let num = randomInt(1, video_lists.length);
			video_id = video_lists[num].author.uid;
			// console.log(`=============================`);
			// console.log(video_id);
			return video_id;
		}

	} catch (error) {
		console.log(error)
	}
}



//视频列表  post  https://apigw.to8to.com/cgi/gw/feed/chunk/v4?&uid=19791703&accountId=31476840&source=tbt-app&ticket=xEchELc0wwDP45hmAQ0NyQhnScH9dxLCL2701SI8AV83okEUD5-39LLE0eBv-2CC43zwMAuQhB2wqOfntwyuYczcN10eah6fAHaIXYJAsOByyedAVivc_LFWAXgO1Uar
async function video_list2(name) {
	video_id = ''
	try {

		let Option = {
			url: `https://apigw.to8to.com/cgi/gw/feed/chunk/v4?ticket=${ck[0]}&source=tbt-app`,
			headers: {},
			body: 'args={"offset":0,"client":"app","lon":"117.75907","page":1,"wholeCode":"index","title":"推荐","lat":"36.895648","isViewBusinessData":0,"pubArgs":"{\\"appversion\\":\\"9.29.0\\",\\"cityid\\":\\"1386\\"}"}'
		};
		let result = await httpPost(Option, name);
		// console.log(result);

		if (result.status == 200) {
			video_lists = result.result;
			// console.log(video_lists);

			let num = randomInt(1, video_lists.length);
			video_id = video_lists[num].content.id;
			// console.log(`=============================`);
			// console.log(video_id);
			return video_id;
		}

	} catch (error) {
		console.log(error)
	}
}



// #region ********************************************************  固定代码  ********************************************************



/**
 * 账号处理
 */
!(async () => {
	let ckArr = await checkEnv(ckStr, alias_name);
	await tips(ckArr);
	for (let index = 0; index < ckArr.length; index++) {
		let num = index + 1;
		DoubleLog(`\n-------- 开始【第 ${num} 个账号】--------`);
		ck = ckArr[index].split("&");
		debugLog(`【debug】 这是你第 ${num} 账号信息:\n ${ck}`);
		await start();
	}
	await SendMsg(msg);
})()
	.catch((e) => $.logErr(e))
	.finally(() => $.done());





/**
 * 变量检查
 */
async function checkEnv(ck, Variables) {
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
			console.log();
			console.log(` ${$.neme}:未填写变量 ${Variables} ,请仔细阅读脚本说明!`)
		}
	}
	)
}


/**
 * 获取远程版本
 * http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js
 * https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js
 */
function Version_Check(name, type) {
	return new Promise((resolve) => {
		if (type == 1) {
			data = `https://raw.gh.fakev.cn/yml2213/javascript/master/${name}/${name}.js`
		} else if (type == 2) {
			data = `http://yml-gitea.ml:2233/yml/JavaScript-yml/raw/branch/master/${name}.js`
		}
		let url = {
			url: data,
		}
		$.get(url, async (err, resp, data) => {
			try {
				VersionCheck = resp.body.match(/VersionCheck = "([\d\.]+)"/)[1]
				console.log(`================`);
				console.log(VersionCheck);
			} catch (e) {
				// $.logErr(e, resp);
			} finally {
				resolve(VersionCheck)
			}
		}, timeout = 3)
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
			// $.msg(message);
			$.msg($.name, '', message)
		}
	} else {
		console.log(message);
	}
}

/**
 * 双平台log输出
 */
function DoubleLog(data) {
	if ($.isNode()) {
		if (data) {
			console.log(`    ${data}`);
			msg += `\n    ${data}`;
		}
	} else {
		console.log(`    ${data}`);
		msg += `\n    ${data}`;
	}

}

/**
 * 随机 数字 + 大写字母 生成
 */
function randomszdx(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";

	for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
	return n;
}


/**
 * 随机 数字 + 小写字母 生成
 */
function randomszxx(e) {
	e = e || 32;
	var t = "qwertyuioplkjhgfdsazxcvbnm1234567890",
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
 * 时间戳 转 日期
 */
function tmtoDate(time = +new Date()) {
	if (time.toString().length == 13) {
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	} else if (time.toString().length == 10) {
		time = time * 1000;
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	}
}

/**
 * 获取当前小时数
 */
function local_hours() {
	let myDate = new Date();
	let h = myDate.getHours();
	return h;
}

/**
 * 获取当前分钟数
 */
function local_minutes() {
	let myDate = new Date();
	let m = myDate.getMinutes();
	return m;
}


/**
 * 获取当前年份 2022
 */
function local_year() {
	let myDate = new Date();
	y = myDate.getFullYear();
	return y;
}

/**
 * 获取当前月份(数字)  5月
 */
function local_month() {
	let myDate = new Date();
	let m = myDate.getMonth();
	return m;
}


/**
* 获取当前月份(数字)  05月 补零
*/
function local_month_two() {
	let myDate = new Date();
	let m = myDate.getMonth();
	if (m.toString().length == 1) {
		m = `0${m}`
	}
	return m;
}

/**
* 获取当前天数(数字)  5日  
*/
function local_day() {
	let myDate = new Date();
	let d = myDate.getDate();
	return d;
}


/**
* 获取当前天数  05日 补零
*/
function local_day_two() {
	let myDate = new Date();
	let d = myDate.getDate();
	if (d.toString().length == 1) {
		d = `0${d}`
	}
	return d;
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
				data = JSON.parse(data);
				// console.log(data);
				// console.log(`网抑云时间: ${data.data.Content}  by--${data.data.Music}`)
				msg = `[网抑云时间]: ${data.data.Content}  by--${data.data.Music}`
				// DoubleLog(`[网抑云时间]: ${data.data.Content}  by--${data.data.Music}`);
			} catch (e) {
				$.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout = 3)
	})
}

/**
 * get请求
 */
async function httpGet(getUrlObject, tip, timeout = 3) {
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
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
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
async function httpPost(postUrlObject, tip, timeout = 3) {
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
						console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
						console.log(JSON.parse(data));
					}
					let result = JSON.parse(data);
					if (result == undefined) {
						return;
					} else {
						resolve(result);
					}

				} catch (e) {
					console.log(err, resp);
					console.log(`\n ${tip} 失败了!请稍后尝试!!`);
					msg = `\n ${tip} 失败了!请稍后尝试!!`
				} finally {
					resolve();
				}
			},
			timeout
		);
	});
}

/**
 * 网络请求 (get, post等)
 */
async function httpRequest(postOptionsObject, tip, timeout = 3) {
	return new Promise((resolve) => {

		let Options = postOptionsObject;
		let request = require('request');
		if (!tip) {
			let tmp = arguments.callee.toString();
			let re = /function\s*(\w*)/i;
			let matches = re.exec(tmp);
			tip = matches[1];
		}
		if (debug) {
			console.log(`\n 【debug】=============== 这是 ${tip} 请求 信息 ===============`);
			console.log(Options);
		}

		request(Options, async (err, resp, data) => {
			try {
				if (debug) {
					console.log(`\n\n 【debug】===============这是 ${tip} 返回数据==============`);
					console.log(data);
					console.log(`\n 【debug】=============这是 ${tip} json解析后数据============`);
					console.log(JSON.parse(data));
				}
				let result = JSON.parse(data);
				if (!result) return;
				resolve(result);
			} catch (e) {
				console.log(err, resp);
				console.log(`\n ${tip} 失败了!请稍后尝试!!`);
				msg = `\n ${tip} 失败了!请稍后尝试!!`
			} finally {
				resolve();
			}
		}), timeout

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








// 完整 Env
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }

    //#endregion
