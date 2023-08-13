/*
金钟罩  小程序

11.5		yml改

滨海金钟罩		无文章

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 金钟罩
export jzzck=" app_id & token & unionid"

多账号用 换行 或 @ 分割 ,  报错的自己安装  yml2213-utils 依赖
tg频道: https://t.me/yml2213_tg  
*/

const utils = require("yml2213-utils");
const $ = new Env("金钟罩");
const ckName = "jzzck";
//-------------------- 一般不动变量区域 -------------------------------------
const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1; //0为关闭通知,1为打开通知,默认为1
let envSplitor = ["@", "\n"];
let ck = (msg = "");
// let httpRequest
let userCookie = process.env[ckName];
let userList = [];
let userIdx = 0;
let userCount = 0;
let ck_status = 1;
//---------------------- 自定义变量区域 -----------------------------------
let plarr = [
	"不要贪图小便宜",
	"一定要保持清醒的头脑，不贪图小利，不轻信他人，牢记世上“没有免费的午餐”,打消“用小钱赚大钱”“吃小亏赚大便宜”“不劳而获”的念头",
	"看好自己的钱袋子，凡是有人让您出钱，一定要多一个心眼，不能轻易将自己的钱拿出来",
	"提高法治意识平时多关注新闻媒体、社区宣传栏、标语等",
	"了解当前多发的各类诈骗手段，提高警惕，加强对诈骗伎俩的识别能力",
	"树立安全思维注意妥善保管自己的个人信息，如本人证件号码、各种与身份信息或银行卡绑定的账号、密码等，不向他人透露，并尽量避免通过公共网络环境使用金融服务",
	"保持警戒心理有些骗子常常主动与老年人打招呼，套近乎，同时表现得很热情，此时有的老年人就容易放松警惕,在此特别提醒老年朋友，千万不要和“陌生人”过于接近，以免上当受骗",
	"开拓眼界，关心社会,平时多关注各种新闻媒体、社区内黑板报、宣传栏、标语等宣传",
	"了解当前多发的各类诈骗手法，提高警惕",
	"加强对诈骗伎俩的识别能力,不要轻易付钱,凡是要动钱的时候，不要相信骗子那些“不要告诉任何人”的鬼话",
	"自己拿不定主意时，找老伴、孩子或找自己信得过的邻居和朋友，以及找社区工作人员，向他们通报情况，征求意见，商量对策",
	"防止一叶蔽目 政府和社区组织的活动都会积极做好宣传和保障工作",
	"去政府和社区定点和正规的部门办事,老人有病要到正规的医院去看，买药要到正规的药店去买",
	"征婚要通过自己信得过的亲友和正规的婚介所去征",
	"谋求工作要到正规的中介所去找，出版书籍要到正规的出版社去洽谈",
	"不要随便接不熟悉的电话,对不熟悉的电话不要随意告知家中的基本信息；对不熟悉的电话提供的服务要谨慎；尤其是对电话对方以公检法名义提出以要处罚要扣款名义提出询问基本信息的要予以拒绝,如果老人受到不明电话骚扰，要及时告诉家人，邻里和社区工作人员，一起帮忙处理,或者及时报警处理",
	"微信、支付宝、网银不要放太多钱,不熟练操作网上支付平台的老年人，建议不要在微信、支付宝内绑定银行卡，只存少量零钱，银行卡尽量不开通网上支付业务，避免受骗后造成大量损失",
];

//---------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------

async function start() {

	console.log("\n------- 签到 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.grxx("签到"));
	}
	await Promise.all(taskall);


	console.log("\n------- 任务列表 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.rw("任务列表"));
	}
	await Promise.all(taskall);

	console.log("\n------- 平台积分查询 -------\n");
	taskall = [];
	for (let user of userList) {
		taskall.push(user.sign_in_info("平台积分查询"));
	}
	await Promise.all(taskall);
}

class UserInfo {
	constructor(str) {
		this.nickname = ++userIdx;
		this.valid = false;
		ck = str.split("&");
		this.app_id = ck[0];
		this.token = ck[1];
		this.unionid = ck[2];
		this.ckValid = true;
		this.pl = randomArr(plarr);
	}

	//个人信息
	async grxx(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-userinfo-service/jzz/user`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			this.nickname = result.data.nickname;
			await this.login_time("更新登录时间");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 更新登录时间
	async login_time(name) {
		let options = {
			method: "post",
			url: `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/update_login_time`,
			headers: {
				token: this.token,
			},
			body: "",
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			await this.sign("签到"), await this.info("平台查询");
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 签到
	async sign(name) {
		let options = {
			method: "post",
			url: `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/sign_in`,
			headers: {
				token: this.token,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				'appid': this.app_id
			}
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号 ${this.nickname} 成功, 获得积分${result.data.score}`);
		} else if (result.code == 110001) {
			DoubleLog(`${name}: 账号 ${this.nickname} ${result.message}`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	//查询平台
	async info(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-plugin-service/miniprogram/info?appid=${this.app_id}`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			this.pt = result.data.title;
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	//文章列表
	async wzlb(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_home_page?app_id=${this.app_id}&title=&type_id=0&video=0&page_size=20&page=1&unionid=${this.unionid}`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		console.log(result);
		if (result.code == 200 && result.data.loop != '') {
			let dd = randomArr(result.data.loop);
			(this.b = dd.id), (this.c = dd.title);
			// await this.rw('任务列表')
		} else if (result.data.loop == '') {
			DoubleLog(`${name}: 没有文章！`)
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	//任务列表   1 完成  2未完成
	async rw(name) {
		try {
			let options = {
				method: "get",
				url: `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/daily_task_finish_status`,
				headers: {
					token: this.token,
				},
			};
			let result = await httpRequest(name, options);

			// console.log(result);
			if (result.code == 200) {
				DoubleLog(`开始检查 【${this.pt}】  账号 ${this.nickname} 任务列表\n`);
				let tasks = result.data;
				console.log(tasks);
				for (const task of tasks) {
					this.task_name = task.name;
					this.task_remark = task.remark;
					this.task_total_num = task.total_num;
					this.task_finish_num = task.finish_num;
					if (task.finish_status == 2) {
						if (task.type == 1) {
							// 每日评论
							DoubleLog(`平台 ${this.pt} , 账号${this.nickname} :  ${this.task_name}----${this.task_finish_num}/${this.task_total_num}`);
							await this.wzlb("文章列表");
							await this.mrpl(this.task_name);
						}
						if (task.type == 2) {
							// 每日点赞
							DoubleLog(`平台 ${this.pt} , 账号${this.nickname} :  ${this.task_name}----${this.task_finish_num}/${this.task_total_num}`);
							await this.wzlb("文章列表");
							await this.mrdz(this.task_name, 1);
						}
						if (task.type == 3) {
							// 每日分享
							DoubleLog(`平台 ${this.pt} , 账号${this.nickname} :  ${this.task_name}----${this.task_finish_num}/${this.task_total_num}`);
							let num = this.task_total_num - this.task_finish_num;
							for (let index = 0; index < num; index++) {
								await this.wzlb("文章列表");
								await this.mrfx(this.task_name);
							}
						}
						if (task.type == 4) {
							// 每日阅读
							DoubleLog(`平台 ${this.pt} , 账号${this.nickname} :  ${this.task_name}----${this.task_finish_num}/${this.task_total_num}`);
							let num = this.task_total_num - this.task_finish_num;
							for (let index = 0; index < num; index++) {
								await this.wzlb("文章列表");
								await this.mryd(this.task_name);
							}
						}
					} else DoubleLog(`${this.task_name}: 已完成`);
				}
			} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
		} catch (error) {
			console.log(error);
		}

	}

	// 每日评论
	async mrpl(name) {
		let options = {
			method: "post",
			url: `https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/article/comment`,
			headers: {
				token: this.token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				relation_id: this.b,
				title: this.c,
				content: this.pl,
				unionid: this.unionid,
				username: this.nickname,
				app_id: this.app_id,
				plat: 1,
				type: 1,
				headimgurl:
					"https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLNNfytM1PljgvLwicWmrKkl4bRByUibAKF3HDGfibd3YLOpeoJYwiccPdugoEoTibomepicCTia52zKXvyw/132",
				replied_username: "",
				replied_unionid: "",
				pid: 0,
				replied_content: "",
				is_at: 0,
			}),
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号${this.nickname}成功, 获得积分${result.data.score}`);
			await wait(3);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	// 每日点赞/取消点赞
	async mrdz(name, type) {
		let options = {
			method: "post",
			url: `https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/article/fabulous`,
			headers: {
				token: this.token,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				relation_id: this.b,
				unionid: this.unionid,
				username: this.nickname,
				app_id: this.app_id,
				type: 1,
				plat: 1,
				pid: this.b,
				p_type: 1,
				status: type,
			}),
		};
		// console.log(options);
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			if (type == 1) {
				DoubleLog(`${name}: 账号 ${this.nickname} 成功, 获得积分${result.data.score}`);
				await wait(2);
				await this.mrdz("取消点赞", 0);
			} else {
				DoubleLog(`${name}: 账号 ${this.nickname} : ok`);
				await wait(1);
			}
		} else DoubleLog(`${name}: 失败 ❌ 了呢, 原因未知!`), console.log(result);
	}

	//每日分享
	async mrfx(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_article_share?app_id=${this.app_id}&art_id=${this.b}&type=1&unionid=${this.unionid}`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号${this.nickname}成功, 获得积分${result.data.score}`);
			await wait(2);
		} else if (result.code == 110001) {
			DoubleLog(`${name}: 账号${this.nickname} ${result.message}`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	//每日阅读
	async mryd(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-article-service/article/mini_article_info?app_id=${this.app_id}&art_id=${this.b}&page=1&page_size=20&unionid=${this.unionid}`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 账号${this.nickname}成功, 获得积分${result.data.score}`);
			await wait(2);
		} else if (result.code == 110001) {
			DoubleLog(`${name}: 账号${this.nickname} ${result.message}`);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}

	//积分查询
	async sign_in_info(name) {
		let options = {
			method: "get",
			url: `https://jzz.secxun.com/jzz-miniprogram-user-operation-service/user_member/sign_in_info`,
			headers: {
				token: this.token,
			},
		};
		let result = await httpRequest(name, options);

		// console.log(result);
		if (result.code == 200) {
			DoubleLog(`${name}: 【 ${this.pt} 】, 账号 ${this.nickname}  总积分${result.data.surplus_score}`);
			await wait(2);
		} else DoubleLog(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(result);
	}


}

function randomArr(arr) {
	return arr[parseInt(Math.random() * arr.length, 10)];
}

// #region ********************************************************  固定代码  ********************************************************

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

// =========================================== 不懂不要动 =========================================================
function Env(name, e) { class s { constructor(name) { this.env = name; } } return new (class { constructor(name) { (this.name = name), (this.logs = []), (this.startTime = new Date().getTime()), this.log(`\n🔔${this.name}, 开始!`); } isNode() { return "undefined" != typeof module && !!module.exports; } log(...name) { name.length > 0 && (this.logs = [...this.logs, ...name]), console.log(name.join(this.logSeparator)); } done() { const e = new Date().getTime(), s = (e - this.startTime) / 1e3; this.log(`\n🔔${this.name}, 结束! 🕛 ${s} 秒`); } })(name, e); } async function httpRequest(name, options) { if (!name) { name = /function\s*(\w*)/i.exec(arguments.callee.toString())[1]; } try { let result = await utils.httpRequest(name, options); if (result) { return result; } { DoubleLog(`未知错误(1)`); } } catch (error) { console.log(error); } } async function SendMsg(message) { if (!message) return; if (Notify > 0) { if ($.isNode()) { var notify = require("./sendNotify"); await notify.sendNotify($.name, message); } else { console.log($.name, "", message); } } else { console.log(message); } } function wait(n) { return new Promise(function (resolve) { setTimeout(resolve, n * 1000); }); } function DoubleLog(data) { console.log(`    ${data}`); msg += `\n    ${data}`; }

//#endregion
