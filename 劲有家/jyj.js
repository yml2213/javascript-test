/*
劲有家 小程序

cron 4 7,9,12 * * *   jyj.js

========= 青龙--配置文件--贴心复制区域  ========= 
# 劲有家
export jyj='authorization & latitude & longitude @ authorization & latitude & longitude' 

取 jjw.jingjiu.com  域名的包, 找到 authorization    latitude  longitude 即可

10-22		完成签到 ，健康打卡 ，拍一拍，抽奖，集卡任务任务

多账号用 换行 或 @ 分割
tg频道: https://t.me/yml2213_tg  
*/


const $ = new Env("劲有家");
check_utils("utils.js");
const ckName = "jyj";
//---------------------------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; 			//0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = msg = ""
let host, hostname, httpRequest;
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
//---------------------------------------------------------

let text = sign = ""
//---------------------------------------------------------


async function start() {

	console.log("\n================== 签到 ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.do_sign('签到'))
	}
	await Promise.all(taskall)

	console.log("\n================== 健康打卡 ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.freeSign('健康打卡'))
	}
	await Promise.all(taskall)

	console.log("\n================== 拍一拍 ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.beat_info('拍一拍'))
	}
	await Promise.all(taskall)

	console.log("\n================== 抽奖 ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.Lottery_info('抽奖'))
	}
	await Promise.all(taskall)

	console.log("\n================== 集卡任务  ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.daySignPunch('养生签到'))
	}
	await Promise.all(taskall)
	taskall = []
	for (var user of userList) {
		taskall.push(user.photoPunch('养生饮劲酒'))
	}
	await Promise.all(taskall)
	taskall = []
	for (var user of userList) {
		taskall.push(user.quizPunch('养生学堂答题'))
	}
	await Promise.all(taskall)
	taskall = []
	for (var user of userList) {
		taskall.push(user.queryClubList('每日逛逛'))
	}
	await Promise.all(taskall)
	taskall = []
	for (var user of userList) {
		taskall.push(user.card_info('卡片信息'))
	}
	await Promise.all(taskall)

	console.log("\n================== 查积分 ==================\n");
	taskall = []
	for (var user of userList) {
		taskall.push(user.queryCustIntegral('查积分'))
	}
	await Promise.all(taskall)





}

class UserInfo {
	constructor(str) {
		this.index = ++userIdx;
		let ck = str.split('&')
		this.token = ck[0]
		this.latitude = ck[1]
		this.longitude = ck[2]
		this.headers = {
			'authorization': this.token,
			'charset': 'utf-8',
			'appid': 'wx10bc773e0851aedd',
			'content-type': 'application/json'
		}
	}



	async do_sign(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/taskContinuousRecord`,
				headers: this.headers,
				body: JSON.stringify({
					"taskId": 5
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}:  ${result.data.custName} ${result.msg}, 连续签到 ${result.data.continuousNum} 天, 本次签到获得 ${result.data.integral} 积分， 预计下次签到 ${result.data.nextSignRewardIntegral} 积分`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async freeSign(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/homePage/freeSign`,
				headers: this.headers,
				body: JSON.stringify({
					"img": "https://jjw-oss.jingjiu.com/jingyoujia/2022/10/22/1666368044592115.png"
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {

				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}, 本次健康打卡获得 ${result.data.rewardNum} 积分， 累计打卡 ${result.data.freeSignDay} 天`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async beat_info(n) {
		try {
			let options = {
				method: "get",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/beatSecondConfig/queryIntegralAndTimes?configId=1`,
				headers: this.headers,
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 剩余次数 ${result.data.lastTimes} 次`);
				for (let index = 0; index < result.data.lastTimes; index++) {
					await this.beat_start('拍一拍')
				}
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}
	async beat_start(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/beatSecondConfig/starGame`,
				headers: this.headers,
				body: JSON.stringify({
					"gameId": 1,
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				await wait(5)
				await this.beat_end('结束拍一拍', result.data)
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async beat_end(n, id) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/beatSecondConfig/endGame`,
				headers: this.headers,
				body: JSON.stringify({
					"beatTime": "5.31",
					"recordId": id
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 获得 ${result.data.integral} 积分`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}


	async Lottery_info(n) {
		try {
			let options = {
				method: "get",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/taskHallTurntable/getUserLotteryNumbers?activityId=3`,
				headers: this.headers,
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				let num = result.data.userLotteryNumbers
				DoubleLog(`账号[${this.index}]  ${n}: 剩余次数 ${num} 次`);
				for (let index = 0; index < num; index++) {
					await this.Lottery('抽奖')
				}
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}


	async Lottery(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/taskHallTurntable/extractTurntableGoods`,
				headers: this.headers,
				body: JSON.stringify({
					"activityId": 3,
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 奖品id ${result.data.id}, 奖品名字 ${result.data.awardName}`);
				await wait(5)
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}


	async queryCustIntegral(n) {
		try {
			let options = {
				method: "get",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/customer/queryCustIntegral`,
				headers: this.headers
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 积分余额:${result.data}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n} 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}


	async daySignPunch(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/daySignPunch`,
				headers: this.headers,
				body: JSON.stringify({
					"activityType": "HEALTH_CARE",
					"latitude": this.latitude,
					"longitude": this.longitude,
					"recordUrl": ""
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 获得卡片id ${result.data.cardId}, 卡片名字 ${result.data.cardName}`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async photoPunch(n) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/photoPunch`,
				headers: this.headers,
				body: JSON.stringify({
					"activityType": "HEALTH_CARE",
					"latitude": this.latitude,
					"longitude": this.longitude,
					"recordUrl": "https://jjw-oss.jingjiu.com/jingyoujia/2022/10/22/166637147816864.png"
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 审核 ${result.data.result}`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async quizPunch(n) {
		try {
			let options = {
				method: "get",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/queryQuizByCustId?activityType=HEALTH_CARE`,
				headers: this.headers,
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				this.questionName = result.data.quiz
				this.quizId = result.data.quizId
				let answerList = result.data.answerList
				for (const answer of answerList) {
					if (answer.isAnswer == 1) {
						this.custQuestionAnswer = answer.optionMark
					}
				}
				await this.Answer('回答', this.questionName, this.quizId, this.custQuestionAnswer)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async Answer(n, questionName, quizId, custQuestionAnswer) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/quizPunch`,
				headers: this.headers,
				body: JSON.stringify({
					"activityType": "HEALTH_CARE",
					"custQuestionAnswer": custQuestionAnswer,
					"latitude": this.latitude,
					"longitude": this.longitude,
					"questionName": questionName,
					"quizId": quizId
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 卡片名字 ${result.data.cardName}`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async queryClubList(n) {
		let h = utils.local_hours()
		if (h > 6 && h < 9) {
			try {
				let options = {
					method: "get",
					url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/queryClubList?activityType=HEALTH_CARE&clubType=3`,
					headers: this.headers,
				};
				let result = await httpResult(n, options);
				// console.log(result);
				if (result.code == 200) {

					let ClubList = result.data
					let num = utils.randomInt(0, ClubList.length)
					for (let index = 0; index < ClubList.length; index++) {
						this.taskId = ClubList[num].id
						this.clubTitle = ClubList[num].clubTitle
					}
					await this.addBrowseRecord('浏览文章', this.taskId)
				} else if (result.code == 500) {
					DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
				} else {
					DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
					console.log(result);
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			DoubleLog(`每天7-8 之间进行 每日逛逛 任务`)
		}
	}


	async addBrowseRecord(n, taskId) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/addBrowseRecord`,
				headers: this.headers,
				body: JSON.stringify({
					"activityType": "HEALTH_CARE",
					"latitude": this.latitude,
					"longitude": this.longitude,
					"partRecordType": 13,
					"taskId": taskId
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				await wait(15)
				await this.clubPunch('领取逛逛卡片', result.data)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async clubPunch(n, recordId) {
		try {
			let options = {
				method: "post",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/clubPunch`,
				headers: this.headers,
				body: JSON.stringify({
					"activityType": "HEALTH_CARE",
					"clubTitle": this.clubTitle,
					"latitude": this.latitude,
					"longitude": this.longitude,
					"duration": 15,
					"recordId": recordId
				})
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`账号[${this.index}]  ${n}: 卡片id ${result.data.cardId}, 卡片名字 ${result.data.cardName}`);
				await wait(3)
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}

	async card_info(n, recordId) {
		try {
			let options = {
				method: "get",
				url: `https://jjw.jingjiu.com/app-jingyoujia/app/jingyoujia/care/query/card?activityType=HEALTH_CARE`,
				headers: this.headers,
			};
			let result = await httpResult(n, options);
			// console.log(result);
			if (result.code == 200) {
				let obj = result.data
				let keysArr = Object.keys(obj)
				for (const key of keysArr) {
					this.cardName = obj[key][0].cardName
					this.cardId = obj[key][0].cardId
					this.activityId = obj[key][0].activityId
					DoubleLog(`账号[${this.index}]  ${n}: 卡片id ${this.cardId}, 卡片名字 ${this.cardName}, 有 ${this.activityId} 张！`);
				}
			} else if (result.code == 500) {
				DoubleLog(`账号[${this.index}]  ${n}: ${result.msg}`);
			} else {
				DoubleLog(`账号[${this.index}]  ${n}: 失败❌了呢`);
				console.log(result);
			}
		} catch (error) {
			console.log(error);
		}

	}



}






!(async () => {
	if (!(await checkEnv())) return;
	if (userList.length > 0) {
		await start();

	}
	await SendMsg(msg);
})()
	.catch((e) => console.log(e))
	.finally(() => $.done());

///////////////////////////////////////////////////////////////////

// #region ********************************************************  固定代码  ********************************************************

// 变量检查与处理
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


function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpResult(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; } async function check_utils(file_name) { await check(file_name); try { utils = require("./utils"); return utils; } catch (error) { console.log(error); } async function check(file_name) { const fs = require("fs"); const path = require("path"); dirPath = path.resolve(__dirname); let files = fs.readdirSync(dirPath); if (files.indexOf(file_name) > -1) { console.log(`当前目录 [${dirPath}] 依赖 ${file_name} 文件状态正常!`); utils = require("./utils"); return utils; } else { console.log(`当前目录 [${dirPath}] 未找到 ${file_name} , 将下载到该目录!`); write_utils(file_name); } function write_utils(file_name) { var request = require("request"); var options = { method: "GET", url: "https://raw.gh.fakev.cn/yml2213/javascript/master/utils.js", headers: {}, }; request(options, function (error, response) { if (error) throw new Error(error); text = response.body; fs.writeFile(`${dirPath}/${file_name}`, text, `utf-8`, (err) => { if (err) { console.log(`目录 [${dirPath}]  ${file_name} 文件 写入失败`); } console.log(`\n目录 [${dirPath}]  ${file_name} 文件写入成功\n请再次运行脚本!\n请再次运行脚本!\n请再次运行脚本!`); }); }); } } }

//#endregion
