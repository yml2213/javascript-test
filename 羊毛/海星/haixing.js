/*

# 海星
export HX_CK=" 备注 # token @ 备注 # token "

抓 hxapi-prod.mhaixing    的 token 就行
多账号用 换行 或 @ 分割

*/


const CodeName = "海星"
const env = "HX_CK"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = ``  // 快速测试, 直接填入ck即可测试


let out_log = ""

//====================================================================================================


class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = this.ck_[0]

        this.token = this.ck_[1]
        this.com_hd = {
            Host: 'hxapi-prod.mhaixing.com',
            token: this.token,
            clienttype: '2',
            appversion: '2.5.30',
            channelcode: 'hxali',
            'content-type': 'application/json',
            'user-agent': 'okhttp/5.0.0-alpha.2'
        }

        this.cn_hd = {
            authority: 'hxapi-prod.mhaixing.cn',
            accept: 'application/json, text/plain, */*',
            'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            appversion: '2.5.30',
            'cache-control': 'no-cache',
            channelcode: 'hxali',
            token: this.token,
            clienttype: '3',
            'content-type': 'application/json',
            origin: 'https://app-web.yooucai.xyz',
            pragma: 'no-cache',
            referer: 'https://app-web.yooucai.xyz/',
            'sec-ch-ua': '"Not_A Brand";v="8", "Chromium";v="120", "Android WebView";v="120"',
            'sec-ch-ua-mobile': '?1',
            'sec-ch-ua-platform': '"Android"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'cross-site',
            'user-agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0.6099.43 Mobile Safari/537.36',
            'x-requested-with': 'com.mhaixing.hx'
        }


    }

    async userTask() {


        await this.task_day()      // 每日任务


        // await this.signIn()      // 签到
        // await this.do_draw()     // 抽奖
        // await this.draw_num()     // 抽奖次数
        // await this.read()       // 阅读
        // await this.share()       // 分享
        // await this.praise()       // 点赞
        // await this.praise_comment()       // 点赞评论

        // if (this.ckFlog) {
        //     // $.log(`\n-------------- 积分查询 --------------`)
        //     await this.check()
        //     // await this.task()
        //     // await this.get_id()


        // }

    }


    async task_day() {
        try {
            let aa = this.RSA('{"taskClass":101}')
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/integral/task/detail/list`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                // console.log(data)
                this.log(`积分: ${data.integralNum}`)
                let taskRspList = data.taskRspList
                for (let i = 0; i < taskRspList.length; i++) {
                    let r = taskRspList[i]
                    if (r.completeStatus === 1) {
                        console.log(`${r.taskName}--已完成`)
                    } else if (r.completeStatus === 0) {
                        let num = r.allNum - r.alreadyComplete
                        switch (r.taskName) {
                            case '参与抽奖':
                                await this.draw_num()
                                break
                            case '点赞留言':
                                for (let j = 0; j < num; j++) {
                                    await this.praise_comment()
                                }
                                break
                            case '点赞文章':
                                for (let j = 0; j < num; j++) {
                                    await this.praise()
                                }
                                break
                            case '分享文章':
                                await this.share()
                                break
                            case '完成签到':
                                await this.signIn()
                                break
                            case '阅读文章':
                                for (let j = 0; j < num; j++) {
                                    await this.read()
                                }
                                break
                            case '参与竞猜':
                                // await this.praise()
                                break
                            case '留言置顶':
                                // await this.share()
                                break
                            case '分享活动':
                                await this.share_act()
                                break
                            case '分享竞猜活动':
                                await this.share_jc_act()
                                break
                            case '参与圈子':
                                for (let j = 0; j < num; j++) {
                                    await this.join_talk()
                                }
                                break
                            case '分享圈子':
                                for (let j = 0; j < num; j++) {
                                    await this.share_talk()
                                }
                                break
                            case '评论文章':
                                // await this.share()
                                break


                        }

                    }
                }


            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async signIn() {
        try {
            let aa = this.RSA("{}")
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/integral/sign/day`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                // {"blindBoxReward":[],"consecutiveDays":1,"integralNum":5,"isPush":null,"signDate":"2023-12-30","totalDays":1}
                console.log(`${data.signDate}--签到, 获取积分 ${data.integralNum}, 累计签到: ${data.totalDays}`)
                this.log(data)
            } else if (res.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async do_draw() {
        try {
            let aa = this.RSA('{"activityCode":"23090700"}')
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/integral/activity/draw`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                // {"id":2,"name":"25-50积分","residueNum":1,"status":0,"type":1,"usedNum":4,"value":"39"}
                this.log(`抽奖获得${data.name}, 本次获得积分 ${data.value}\n`)
                this.log(data)
                await wait(3)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async draw_num() {
        try {
            let aa = this.RSA('{"activityCode":"23090700"}')
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/integral/activity/draw/home`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                this.log(`抽奖次数${data.feeLuckDrawNum}`)
                for (let i = 0; i < data.feeLuckDrawNum; i++) {
                    await this.do_draw()
                }
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }


    async read() {
        try {
            let id = await this.get_article_id()
            let aa = this.RSA(`{"id":"${id}"}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/article/read/integral`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`阅读: ${id} -- ${res.msg}`)
                await wait(3)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async praise() {
        try {
            let id = await this.get_article_id()
            let aa = this.RSA(`{"id":"${id}","praise":true}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/article/praise`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`点赞: ${id} -- ${res.msg}`)
                await wait(3)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async praise_comment() {  // {"commentId":"2c9294148a874e8c018cb46524713f33"}
        try {
            let id = await this.get_comment_id()
            if (id) {
                // console.log(id)
                let aa = this.RSA(`{"commentId":"${id}"}`)
                // console.log(aa)
                const options = {
                    method: "post",
                    url: `https://hxapi-prod.mhaixing.cn/article/comment/praise`,
                    headers: this.cn_hd,
                    json: {"content": aa},
                }
                // console.log(options)
                let {res} = await requestPromise(options)
                // this.log(res)
                if (res.code === 200) {
                    console.log(`点赞评论: ${id} -- ${res.msg}`)
                    await wait(3)
                } else if (res.data.code === 500) {
                    this.log(res.msg)
                } else {
                    this.log(res)
                }
            }else await this.praise_comment()


        } catch (error) {
            this.log(error)
        }

    }

    async share() {
        try {
            let id = await this.get_article_id()
            let aa = await this.com_encode(`{"dataId":"${id}","taskType":5.0}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.com/integral/task/type`,
                headers: this.com_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`分享: ${id} -- ${res.msg}!`)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async share_act() {
        try {
            let aa = this.RSA(`{"merchantChannelCode":"yqhd_app_jfyy24","visitUuid":"epqCos1nQSKmrkRf61kyWp0mm77VtZt9"}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/channel/merchant/channel/visit/add`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`分享活动: ${res.msg}`)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async share_jc_act() {
        try {
            let aa = this.RSA(`{}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/integral/quiz/search`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`分享竞猜活动: ${res.msg}`)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async get_talk_id() {
        try {
            let aa = this.RSA(`{"pageNumber":1,"pageSize":5}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/talk/detail/list`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                // console.log(data)
                let ran = randomInt(0, data.topicList.length)
                // console.log(data.topicList[ran].id)
                return data.topicList[ran].id


            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async join_talk() {
        try {
            let id = await this.get_talk_id()
            let aa = await this.com_encode(`{"dataId":"${id}","taskType":6.0}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.com/integral/task/type`,
                headers: this.com_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                console.log(`参与圈子: ${id} -- ${res.msg}!`)
                await wait(3)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async share_talk() {
        try {
            let id = await this.get_talk_id()
            if (id) {
                let aa = await this.com_encode(`{"dataId":"${id}","taskType":7.0}`)
                // console.log(aa)
                const options = {
                    method: "post",
                    url: `https://hxapi-prod.mhaixing.com/integral/task/type`,
                    headers: this.com_hd,
                    json: {"content": aa},
                }
                // console.log(options)
                let {res} = await requestPromise(options)
                // this.log(res)
                if (res.code === 200) {
                    console.log(`分享圈子: ${id} -- ${res.msg}!`)
                    await wait(3)
                } else if (res.data.code === 500) {
                    this.log(res.msg)
                } else {
                    this.log(res)
                }
            }

        } catch (error) {
            this.log(error)
        }

    }

    async get_comment_id() { // {"articleId":"2c9294148a874e8c018c9ff271b23caa","pageNumber":1}
        try {
            let id = await this.get_article_id()
            let aa = this.RSA(`{"articleId":"${id}","pageNumber":1}`)
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.cn/article/comment/list`,
                headers: this.cn_hd,
                json: {"content": aa},
            }
            // console.log(options)
            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = JSON.parse(decodeURIComponent(res.data))
                // console.log(data)
                let ran = randomInt(0, data.comments.length)
                // console.log(data.comments[ran].id)
                return data.comments[ran].id

            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }

    async get_article_id() {
        try {
            let aa = await this.com_encode('{"pageNumber":3.0,"pageSize":10.0,"typeId":"0"}')
            // console.log(aa)
            const options = {
                method: "post",
                url: `https://hxapi-prod.mhaixing.com/article/query/list`,
                headers: this.com_hd,
                json: {"content": aa},
            }
            // console.log(options)

            let {res} = await requestPromise(options)
            // this.log(res)
            if (res.code === 200) {
                let data = await this.com_decode(res.data)
                data = JSON.parse(data)
                // console.log(data)
                let ran = randomInt(0, data.length)
                // console.log(data[ran].id)
                return data[ran].id


                // // {"id":2,"name":"25-50积分","residueNum":1,"status":0,"type":1,"usedNum":4,"value":"39"}
                // this.log(`抽奖获得${data.name}, 本次获得积分 ${data.value}\n`)
                // console.log(data)
            } else if (res.data.code === 500) {
                this.log(res.msg)
            } else {
                this.log(res)
            }

        } catch (error) {
            this.log(error)
        }

    }


    async com_encode(args) {
        const options = {
            method: "post",
            url: `http://81.70.196.85:18080/haixing/encode`,
            headers: {'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'},
            json: {"content": args},
        }
        // console.log(options)
        let {res} = await requestPromise(options)
        // console.log(res)
        if (res.code === 200) {
            return res.data
        } else return false
    }

    async com_decode(args) {
        const options = {
            method: "post",
            url: `http://81.70.196.85:18080/haixing/decode`,
            headers: {'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'},
            json: {"content": args},
        }
        // console.log(options)
        let {res} = await requestPromise(options)
        // console.log(res)
        if (res.code === 200) {
            return res.data
        } else return false
    }


    RSA(msg) {
        let Key = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2bQf7RFl40YXkXRwGqGhU4OVzVA/8PMXylw7zLIlQd3ksvagUTPtd024AbjWgbNaVzMJBmFHxq9Y3YFgsf7JYiCHKtIVaHMLqh9RX1vIEYzqbbLOX3tpmpqGQlCThrqLHit7Di1NP8DlF/t5Xp7jP8HfnyEuJ+xHX0xjiLZ9WiB9WkHc1SIZqsg/pceaAYishg3I4kUI/a0QeO1/zJRv44JETGkGTxgJI1PQK4hCawjFeZfnLinp7udHS/3V+f0EHJoWO7EdfN7hd/YgTdmga7jR0VsjQejbV6c1O9eVwUOEwz2xNNqyV5zgH6gLlEOIBRfBnqB1rcjO+Kqg3fbeQwIDAQAB'
        const NodeRSA = require('node-rsa')
        let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
        nodersa.setOptions({encryptionScheme: 'pkcs1'})
        return nodersa.encrypt(msg, 'base64', 'utf8')
    }


    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(24)}  ${this.index} ${"•".repeat(24)}\n`)
            this.hasLogged = true
        }
        console.log(`${this.index} -- ${this.remark},  ${typeof message === "object" ? JSON.stringify(message) : message}`)
        if (p === 1) {
            sendLog.push(`${this.index} -- ${this.remark}, ${message}`)
        } else if (p === 2) {
            sendLog.push(`${this.index} -- ${this.remark}, ${message}`)
            out_log += `${this.index}-- ${this.remark}, ${message}\n`

        }
    }
}

async function requestPromise(options) {
    const got = require("got")
    let response, body, headers, res
    try {
        if (options.method.toUpperCase() === "GET") delete options.json, options.body, options.from
        response = await got(options, {
            followRedirect: false,
            https: {rejectUnauthorized: false},
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
    }
    if (response) {
        body = response.body
        headers = response.headers
        if (body) {
            try {
                res = JSON.parse(body)
            } catch (e) {
                res = body
            }
        }
    }
    return {headers, res}
}

class UserList {
    constructor(env) {
        this.env = env
        this.userList = []
        this.logPrefix = `\n[环境检测 ${this.env}]`
        this.mode = mode
    }

    1

    checkEnv() {
        try {
            let UserData = ""
            if (ckFile !== "" && fs.existsSync(ckFile)) {
                UserData = UserData.concat(fs.readFileSync(`./${ckFile}`, "utf-8").split("\n") || [])
                console.log(`ck文件[ ${ckFile} ]加载成功`)
            } else {
                console.log(`ck文件[ ${ckFile} ]不存在, 调用青龙环境变量`)
                UserData = process.env[env] || ck_
            }
            if (!UserData || UserData.trim() === "") {
                console.log(`${this.logPrefix} 没有找到账号信息`)
                return false
            }
            this.userList = UserData
                .split(new RegExp(envSplit.join("|")))
                .filter((cookie) => cookie.trim() !== "")
                .map((cookie, index) => new User(cookie.trim(), `账号[${index + 1}]`))
            const userCount = this.userList.length
            console.log(`${this.logPrefix} ${userCount > 0 ? `找到 ${userCount} 个账号\n` : "没有找到账号\n"}`)
            return true

        } catch (e) {
            console.log(e)
        }
    }

    async runTask() {
        if (!this.checkEnv()) {
            return
        }
        console.log(`[任务 ${CodeName}] 开始运行`)
        if (this.mode === 2) {  // 并发
            const taskQueue = []
            const concurrency = runMax
            for (const user of this.userList) {
                while (taskQueue.length >= concurrency) {
                    await Promise.race(taskQueue)
                }
                const promise = user.task()
                taskQueue.push(promise)
                promise.finally(() => {
                    taskQueue.splice(taskQueue.indexOf(promise), 1)
                })
                if (taskQueue.length < concurrency) {
                    continue
                }
                await Promise.race(taskQueue)
            }
            await Promise.allSettled(taskQueue)
        } else {
            for (const user of this.userList) {
                await user.userTask()
            }
        }
    }
}

(async () => {
    const s = Date.now()
    const userList = new UserList(env)
    await userList.runTask()
    const e = Date.now()
    await done(s, e)
})().catch(console.error)


async function done(s, e) {

    if (out_log.length > 0) {
        console.log(`开始重要日志输出\n`)
        console.log(`${out_log}`)
        console.log(`结束重要日志输出\n`)
    }


    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    await showmsg()

    async function showmsg() {
        if (!sendLog) return
        if (!sendLog.length) return
        let notify = require("./sendNotify")
        console.log("\n============== 本次推送--by_yml ==============")
        await notify.sendNotify(CodeName, sendLog.join("\n"))
    }

    process.exit(0)

}

function wait(seconds) {
    console.log(`等待 ${seconds} 秒`)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function ts(type = false, _data = "") {
    let myDate = new Date()
    let a = ""
    switch (type) {
        case 10:
            a = Math.round(new Date().getTime() / 1000).toString()
            break
        case 13:
            a = Math.round(new Date().getTime()).toString()
            break
        case "h":
            a = myDate.getHours()
            break
        case "m":
            a = myDate.getMinutes()
            break
        case "y":
            a = myDate.getFullYear()
            break
        case "h":
            a = myDate.getHours()
            break
        case "mo":
            a = myDate.getMonth()
            break
        case "d":
            a = myDate.getDate()
            break
        case "ts2Data":
            if (_data != "") {
                time = _data
                if (time.toString().length == 13) {
                    let date = new Date(time + 8 * 3600 * 1000)
                    a = date.toJSON().substr(0, 19).replace("T", " ")
                } else if (time.toString().length == 10) {
                    time = time * 1000
                    let date = new Date(time + 8 * 3600 * 1000)
                    a = date.toJSON().substr(0, 19).replace("T", " ")
                }
            }
            break
        default:
            a = "未知错误,请检查"
            break
    }
    return a
}

function randomString(length, options = {xx: true, dx: true, sz: true}) {
    let charset = ""
    if (options.xx) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (options.dx) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.sz) {
        charset += "0123456789"
    }
    let res = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}
