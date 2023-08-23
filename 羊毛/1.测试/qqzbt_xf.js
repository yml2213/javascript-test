const CodeName = "钱钱赚不停";
const env = "qqzbt";
const got = require("got");
require('dotenv').config()
let UserData = process.env[env] || `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZWNyZXQiOiJCQTZCRjYxRkRDMkFCRDYwMDJEODMwQTNGNEJCQjk0MTVCNUQ3MkYwMTM4QjZGNDdDQ0YxMUQ3MTMyQzg1MDlDIiwiZXhwIjoxNjkyNzc5NTkwLCJrZXkiOiI2RDJENjk4NzNDQkYyMkI1NzZGNEI0N0EwNDUzRkI3MjlENEMzM0JEQUI4QjY2NDcxMzA3QUMzMkJENTM0NzNDMjlEQTVFN0IyQkQ0NjNEMjVDQUZCQTY4Q0M3RjZEQzUyNUQ0MjdBMTY2MzRDMjRBMDQ4RDFCNDE0RjVDNTBFODgzNkZDNDc4MzdCNzY5ODg5OTZDRDYyMkY1QjdGNTc5MTAxODAyNTJFNTc0NTY2NkJFRDE2NURGQzI3QzQ2RTBGQ0FDQkZDNERBNUNDQTE1ODZEQUEzOUIwOUIxQTExODEzQjEyOTA4Njk5MEU1NjdBMTA2MkZDN0ZGRTQwRUMzQTgxOEVCMEJDMjc4QzYyQzM4QjI2QTIxMkY4RDQ3QTEifQ.MyOdMYVGS3dKT8kjoUwXY1AQ_lOYSKteESWBoGeiMLU`;
let sendlog = [];

const mode = 1;
const runmax = 3;
const q = console;

class User {
    constructor(str, id) {
        [this.token] = str.split("#");
        this.index = id;
    }

    async task() {
        this.arrx = [];
        await this.rewardAmount1();
        await this.rewardAmountlist();
        await this.rewardAmountlist();
        await this.rewardAmountlist();
        this.arrx = Array.from(new Set(this.arrx));
        this.log(`得到 ${this.arrx.length} 个云码ID `);
        var f = [];
        for (let c of this.arrx) f.push(this.detail(c));
        await Promise.all(f);
        await this.rewardAmount1();
        if (this.cash >= 1) await this.withdrawalapply();
    }

    async rewardAmountlist() {
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/task/list/v2`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
        };
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        // console.log(JSON.stringify(result))
        try {
            if (result.code == 0) {
                for (const a of result.data.list) {
                    // console.log(a.taskNo)
                    this.arrx.push(a.taskNo);
                    // if (a.appPath.split("?k=")[1]) {
                    //     this.arrx.push(a.appPath.split("?k")[1]);
                    // }
                }
            }
            await  wait(3)
        } catch (error) {
        }
    }

    async withdrawalapply() {
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/withdrawal/apply`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
            form: {
                amount: this.cash,
            },
        };
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        try {
            if (result.code == 0) {
                this.log(`提现 ${this.cash}  ${result.msg}`);
            } else {
                this.log(result);
            }
        } catch (error) {
        }
    }

    async rewardAmount1() {
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/member/account`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
            form: {
                token: this.token,
            },
        };
        // console.log(options)
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        // console.log(result)

        try {
            if (result.code == 0) {
                this.log(`当前余额 ${result.data.balanceAmount}`);
                this.cash = result.data.balanceAmount;
            } else {
                this.log(result);
            }
        } catch (error) {
        }
    }

    async detail(a) {
        // console.log(a)
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/task/rewardAmount`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
            form: {
                'taskNo': a
            },
        };
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        try {
            if (result.msg == "操作成功") {
                await this.notify(encodeURIComponent(result.data.taskNo));
                await this.taskall(this.rewardAmount, 150, 150, encodeURIComponent(result.data.taskNo));
            }
        } catch (error) {
        }
    }

    async notify(a) {
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/denghuoInfo/notify`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
            body: `taskNo=${a}`,
        };
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        try {
        } catch (error) {
        }
    }

    async rewardAmount(a) {
        const options = {
            method: "post",
            url: `https://ad.zyxdit.com/api/task/rewardAmount`,
            headers: {
                Connection: `keep-alive`,
                "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/20F66 Ariver/1.1.0 AliApp(AP/10.3.86.6100) Nebula WK RVKType(0) AlipayDefined(nt:WIFI,ws:430|932|3.0) AlipayClient/10.3.86.6100 Language/zh-Hans Region/CN NebulaX/1.0.0 XRiver/10.2.58.1`,
                token: this.token,
                "Content-Type": `application/x-www-form-urlencoded`,
            },
            body: `taskNo=${a}`,
        };
        this.hd = options.headers;
        let {result} = await requestPromise(options);
        try {
        } catch (error) {
        }
    }

    async taskall(taskFunc, maxnums, numTasks, ...args) {
        const task = taskFunc.bind(this, ...args);
        if (numTasks <= maxnums) {
            await Promise.all(Array.from({length: numTasks}, (_, i) => i).map((index) => task(index)));
            return;
        }
        for (let i = 0; i < numTasks; i += maxnums) {
            const chunkTasks = Array.from({length: Math.min(maxnums, numTasks - i)}, (_, j) => i + j);
            if (this.forrun) return;
            await Promise.all(chunkTasks.map((index) => task(index)));
        }
    }

    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            q.log(`\n${"•".repeat(8)}  ${this.index} ${"•".repeat(8)}\n`);
            this.hasLogged = true;
        }
        q.log(`${this.index} ${typeof message === "object" ? JSON.stringify(message) : message}`);
        if (p) {
            sendlog.push(`${this.index} ${message}`);
        }
    }
}

async function requestPromise(options) {
    let response, body, headers, result;
    try {
        if (options.method.toUpperCase() === "GET") delete options.json, options.body, options.from;
        response = await got(options, {
            followRedirect: false,
            https: {rejectUnauthorized: false},
            timeout: 13000,
        });
    } catch (error) {
        response = error.response;
    }
    if (response) {
        body = response.body;
        headers = response.headers;
        if (body) {
            try {
                result = JSON.parse(body);
            } catch (e) {
                result = body;
            }
        }
    }
    return {headers, result};
}

class UserList {
    constructor(env) {
        this.env = env;
        this.userList = [];
        this.logPrefix = `\n[环境检测 ${this.env}]`;
        this.mode = mode;
    }

    checkEnv() {
        console.log(`[任务 ${CodeName}] 开始运行`);
        const userCookie = UserData;
        if (!userCookie || userCookie.trim() === "") {
            console.log(`${this.logPrefix} 没有找到账号信息`);
            return false;
        }
        this.userList = userCookie
            .split(`\n`)
            .filter((cookie) => cookie.trim() !== "")
            .map((cookie, index) => new User(cookie.trim(), `账号[${index + 1}]`));
        const userCount = this.userList.length;
        console.log(`${this.logPrefix} ${userCount > 0 ? `找到 ${userCount} 个账号\n` : "没有找到账号\n"}`);
        return userCount > 0;
    }

    async runTask() {
        if (!this.checkEnv()) {
            return;
        }
        if (this.mode === 2) {
            const taskQueue = [];
            const concurrency = runmax;
            for (const user of this.userList) {
                while (taskQueue.length >= concurrency) {
                    await Promise.race(taskQueue);
                }
                const promise = user.task();
                taskQueue.push(promise);
                promise.finally(() => {
                    taskQueue.splice(taskQueue.indexOf(promise), 1);
                });
                if (taskQueue.length < concurrency) {
                    continue;
                }
                await Promise.race(taskQueue);
            }
            await Promise.allSettled(taskQueue);
        } else {
            for (const user of this.userList) {
                await user.task();
            }
        }
    }
}

(async () => {
    const s = Date.now();
    const userList = new UserList(env);
    await userList.runTask();
    const e = Date.now();
    await done(s, e);
})().catch(console.error);

function done(s, e) {
    const el = (e - s) / 1000;
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`);
    process.exit(0);
}

function wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
