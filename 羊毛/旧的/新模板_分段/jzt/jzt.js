const $ = new Env("九芝堂");

const notify = $.isNode() ? require("./sendNotify") : "";
const Notify = 1;


const CK_NAME = "jztck";


async function main(userInfo) {

	let host = 'https://api.coincheckusq.xyz';
	let headers = {
		"Host": "api.coincheckusq.xyz",
	};
	let api = new Api(host, headers);
	let task = new Task(userInfo, api);
	await task.cashck();  // 登录和签到
}




class UserInfo {
	constructor(index, str) {
		this.index = index + 1;

		let ck = str.split("&");
		this.username = ck[0];
		this.password = ck[1];

	}
}

class Task {
	constructor(userInfo, api) {
		this.userInfo = userInfo;
		this.api = api;
	}

	executeIf(result, condition, success) {	// 返回体统一处理 2
		if (condition) {
			try {
				success();
			} catch (e) {
				console.log(e);
			}

		} else {
			console.log(`${name}: 失败 ❌ 了呢,原因未知!`);
			console.log(result);
		}

	}

	execute(result, success) {	// 返回体统一处理 1
		// console.log(result)
		this.executeIf(result, () => {
			return result.code == 0;
		}, success);

	}

	async cashck() {
		let options = {
			path: '//login',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			form: {
				'username': this.userInfo.username,
				'password': this.userInfo.password
			}
		};

		let name = "登录和签到";
		return this.api.catchPost(name, options).then(data => {
			this.execute(data, async () => {
				console.log(`账号 ${this.userInfo.index}  ${name}:  ${data.msg}`);
				this.api.addHeader('authorization', `Bearer ${data.data.token}`);
				await this.sign();
				await this.total();
			});

		});
	}

	async sign() {
		let name = '签到';
		let options = {
			path: '//sign',
			body: `integral=0`
		};
		return this.api.catchPost(name, options).then(data => {
			this.execute(data, () => {
				console.log(`账号 ${this.userInfo.index}  ${name}: ${data.msg}`);
			});

		});

	}

	async total() {
		let name = '余额';
		let options = {
			path: '//total',
		};
		return this.api.catchGet(name, options).then(data => {
			this.execute(data, () => {
				console.log(`账号 ${this.userInfo.index}  ${name}: 可提现 ${data.data.total_assets} 元`);
			});

		});
	}

}





///////////////////////////////////////////////////////////////////

async function getUsers(ckName, fnUserInfo) {
	let userList = [];
	let userCookie = process.env[ckName];
	let envSplicer = ["@", "\n"];
	let userCount = 0;
	if (userCookie) {
		let e = envSplicer[0];
		for (let o of envSplicer)
			if (userCookie.indexOf(o) > -1) {
				e = o;
				break;
			}
		// for (let n of userCookie.split(e)) n && userList.push(await fnUserInfo(n))

		let arr = userCookie.split(e);
		for (let index = 0; index < arr.length; index++) {
			const element = arr[index];
			element && userList.push(await fnUserInfo(index, element));
		}

		// console.log(n);
		userCount = userList.length;
		// console.log(userList);
	} else {
		console.log("未找到CK");
	}
	console.log(`共找到${userCount}个账号`), !0;
	return userList;
}



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



function mergeObjs(def, obj) {
	if (!obj) {
		return def;
	} else if (!def) {
		return obj;
	}

	for (var i in obj) {
		// if its an object
		if (obj[i] != null && obj[i].constructor == Object) {
			def[i] = mergeObjs(def[i], obj[i]);
		}
		// if its an array, simple values need to be joined.  Object values need to be remerged.
		else if (obj[i] != null && (obj[i] instanceof Array) && obj[i].length > 0) {
			// test to see if the first element is an object or not so we know the type of array we're dealing with.
			if (obj[i][0].constructor == Object) {
				var newobjs = [];
				// create an index of all the existing object IDs for quick access.  There is no way to know how many items will be in the arrays.
				var objids = {};
				for (var x = 0, l = def[i].length; x < l; x++) {
					objids[def[i][x].id] = x;
				}

				// now walk through the objects in the new array
				// if the ID exists, then merge the objects.
				// if the ID does not exist, push to the end of the def array
				for (var x = 0, l = obj[i].length; x < l; x++) {
					var newobj = obj[i][x];
					if (objids[newobj.id] !== undefined) {
						def[i][x] = mergeObjs(def[i][x], newobj);
					} else {
						newobjs.push(newobj);
					}
				}

				for (var x = 0, l = newobjs.length; x < l; x++) {
					def[i].push(newobjs[x]);
				}
			} else {
				for (var x = 0; x < obj[i].length; x++) {
					var idxObj = obj[i][x];
					if (def[i].indexOf(idxObj) === -1) {
						def[i].push(idxObj);
					}
				}
			}
		} else {
			def[i] = obj[i];
		}
	}
	return def;
}

let request = require("request");
class Api {
	constructor(host, headers) {
		this.headers = headers;
		this.host = host;
	}

	addHeader(key, value) { // 给 hd 增加属性
		this.headers[key] = value;
	}

	/**
	 * 测试get post合一   10-9改 request
	 */
	async httpRequest(options) {
		// console.log(options)
		return new Promise((resolve, reject) => {

			function isJsonString(str) {
				if (typeof str == "string") {
					try {
						if (typeof JSON.parse(str) == "object") {
							return true;
						}
					} catch (e) {
						return false;
					}
				}
				return false;
			}

			request(options, function (error, response) {
				if (error) throw new Error(error);
				// response.body
				let data = response.body;
				try {
					// console.log(typeof (data));
					if (typeof data == "string") {
						if (isJsonString(data)) {
							resolve(JSON.parse(data));
						} else {
							resolve(data);
						}
					} else {
						resolve(data);
					}
				} catch (e) {
					console.log(error, response);
					reject(error);
				}
			});
		});
	}

	getOption(method, path) {
		return {
			method: method,
			url: `${this.host}${path}`,
			headers: this.headers
		};
	}

	async httpGet(path, headers) {
		let options = this.getOption('get', path);
		// console.log(options)
		let o = {
		};
		if (headers) {
			o.headers = headers;
		}
		return this.httpRequest(mergeObjs(options, o));
	}

	async httpPost(path, headers, body, form) {
		let options = this.getOption('post', path);
		let o = {

		};
		if (headers) {
			o.headers = headers;
		}
		if (body) {
			o.body = body;
		}

		if (form) {
			o.form = form;
		}

		return this.httpRequest(mergeObjs(options, o));
	}

	async catchInfo(name, p) {
		return p.catch(error => {
			console.log(`\n ${name} 失败了!请稍后尝试!!`);
		});
	}

	async catchPost(name, options) {	// 捕获 post 

		let { path, headers, body, form } = options;

		try {
			return this.catchInfo(name, this.httpPost(path, headers, body, form));
		} catch (e) {
			console.log(e);
			return Promise.resolve(1);
		}
	}

	async catchGet(name, options) {

		let { path, headers } = options;

		try {
			return this.catchInfo(name, this.httpGet(path, headers));
		} catch (e) {
			console.log(e);
			return Promise.resolve(1);
		}

	}

}



//下面的都不需要改

!(async () => {
	let users = await getUsers(CK_NAME, async (index, element) => {
		let userInfo = new UserInfo(index, element);
		// await main(userInfo)
		return userInfo;
	});
	// console.log(users)

	users.forEach(element => {
		main(element);
	});


})()
	.catch((e) => console.log(e))
	.finally(() => $.done());