/*
学习强安              cron 0 1,6,12,18,22 * * *  xxqa.js


-------------------  青龙-配置文件-复制区域  -------------------
# 学习强安
export xxqa=" sfz # pwd @ sfz # pwd "  

多账号用 换行 或 @ 分割  

抓 xgimi.com 的包  accessToken 即可 

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('学习强安')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['xxqa']                //支持多变量

//====================================================================================================
let taskarr = []
let learning = finished = unlearned = 0
//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.sfz = this.ck[0]
        this.pwd = this.ck[1]

        this.cookie = 'SESSION=YTJlMWNlOTItYjdkZi00ODZkLTg5ODUtMWZlMDY0YWYyMWNm'

        this.d_ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1'
        this.hd = {
            'Host': 'xxqaph.sdaj.gov.cn:9999',
            'openid': '',
            'tokenid': '',
            'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
            'Origin': 'http://xxqaph.sdaj.gov.cn:9999',
            'User-Agent': this.d_ua,
            'Cookie': this.cookie,
        }

    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        typeof idx

        $.log(`\n-------------- 登录 --------------`)
        await this.login()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.getTaskList(1)
            await this.doTask()

        }
    }


    async login() { // 登录
        let options = {
            fn: '登录',
            method: 'post',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/login/login`,
            headers: {
                'Host': 'xxqaph.sdaj.gov.cn:9999',
                'openid': '',
                'tokenid': '',
                'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
                'Origin': 'http://xxqaph.sdaj.gov.cn:9999',
                'User-Agent': this.d_ua,
                'Cookie': this.cookie,
            },
            json: { "username": this.sfz, "password": this.pwd }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            this.tokenid = resp.obj
            this.hd.tokenid = this.tokenid
            await this.userInfo()
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false


    }

    async userInfo() { // 用户信息
        let options = {
            fn: '用户信息',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/user/userheader`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            this.score = resp.obj.score
            this.name = resp.obj.name
            this.enname = resp.obj.enname

            $.log(`${this.idx}: ${options.fn}  ${this.name} 登录成功 🎉, 公司: ${this.enname}, 新token: ${this.tokenid}`)
            await $.wait(2)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }


    async getTaskList(num = 1) { // 任务列表 

        let options = {
            fn: '任务列表',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/list/0/0/${num}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            if (resp.obj.next) {
                taskarr = taskarr.concat(resp.obj.reslist)
                await $.wait(1)
                await this.getTaskList(num + 1)
            } else {
                taskarr = taskarr.concat(resp.obj.reslist)
                return taskarr
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async doTask() { // 做任务

        learning = finished = unlearned = 0
        for (const task of taskarr) {
            if (task.zt == 2) { // 已完成
                finished++
            } else if (task.zt == 1) { // 学习中
                learning++
            } else if (task.zt == 0) { // 未完成
                unlearned++
            }

            await this.test_taskInit(task.id) // 每课一练


        }

        // console.log(taskarr)

        $.log(`${this.idx}: ${this.name} 共找到 ${taskarr.length} 个任务, 未完成 ${unlearned} 个,学习中 ${learning} 个, 已完成 ${finished} 个`, { notify: true })




        if (unlearned > 0 || learning > 0) { // 普通学习
            $.log(`${this.idx}: ${this.name} 发现 ${unlearned} 个 未完成 任务, 开始自动学习!`)
            $.log(`${this.idx}: ${this.name} 发现 ${learning} 个 学习中 任务, 开始自动学习!`)

            for (const task of taskarr) {
                if (task.zt == 0 && task.type == 1 || 3) {  // 未学习
                    $.log(`${this.idx}: 开始学习 ${task.title}, 即将进入任务详情: ${task.id}!`)
                    await this.taskInit(task.id)
                } else if (task.zt == 1 && task.type == 1 || 3) {  // 学习中
                    $.log(`${this.idx}: 开始学习 ${task.title}, 即将进入任务详情: ${task.id}!`)
                    await this.taskInit(task.id)
                }
            }
        }



    }


    async test_taskInit(id) { // 每课一练--任务详情 
        let options = {
            fn: '每课一练--任务详情',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/init/${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {

            if (resp.obj.kqmn == 1) { // 每课一练 未完成
                await this.test(resp.obj.id)
            } else if (resp.obj.kqmn == 2) { // 每课一练 完成或没有
            }



        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async taskInit(id) { // 任务详情 
        let options = {
            fn: '任务详情',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/init/${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            this.taskuserid = resp.obj.taskuserid
            $.log(`${this.idx}: ${options.fn}  成功, 当前任务id: ${this.taskuserid}, 当前任务数量: ${resp.obj.files.length} 个`)
            let files = resp.obj.files
            for (const file of files) {
                if (file.mytime < file.time) { // 视频 图文 一个接口 
                    let num = (file.time - file.mytime) / 20 + 1
                    $.log(`${this.idx}: ${file.title}--- 已观看${file.mytime}秒, 最低学时 ${file.time}秒,  开始模拟观看 ${num * 20} 秒 !`)
                    await this.time(this.taskuserid, file.id, num)
                }
            }


        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async time(taskuserid, id, num) { // 模拟观看 
        if (num) {
            for (let i = 0; i < num; i++) {
                await this.doTime(taskuserid, id)
            }
        }

    }


    async doTime(taskuserid, id) { // 模拟观看 
        let options = {
            fn: '模拟观看',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/time/${taskuserid}/${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}: ${options.fn}  成功, 增加 20 s 学时 `)
            await $.wait($.randomInt(20, 23))

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async test(id) { // 每课一练任务
        let options = {
            fn: '每课一练',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mninfo/${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            this.totalscore = resp.obj.totalscore
            this.pass = resp.obj.pass
            let lists = resp.obj.list
            if (lists[0].score >= this.pass) {
                $.log(`${this.idx}: ${options.fn} 当前练习已通过, 跳过!`)
            } else {
                $.log(`${this.idx}: ${options.fn} 当前练习未通过--分数不够及格线, 开始 每课一练, id:${id}`)
                await this.doTest(id)
            }
            // if (lists.length) {
            //     for (const list of lists) {
            //         if (list.score >= this.pass) {
            //             $.log(`${this.idx}: ${options.fn} 当前练习已通过, 跳过!`)
            //         } else {
            //             $.log(`${this.idx}: ${options.fn} 当前练习未通过--分数不够及格线, 开始 每课一练, id:${id}`)
            //             await this.doTest(id)
            //         }
            //     }
            // } else {
            //     $.log(`${this.idx}: ${options.fn} 未完成, 开始 每课一练, id:${id}`)
            //     await this.doTest(id)
            // }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async doTest(id) { // 每课一练任务
        // 创建新的模拟 取返回内容 http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/createmn/2f9da9e76b814c2992001141a2e466cc
        let c_id = await this.createmn(id)
        if (c_id) {
            // http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnexaminfo/48f0e325497142e49f6324c3d7270cf5
            let test_data = await this.mnexaminfo(c_id)
            for (let i = 0; i < this.totalscore; i++) {
                // http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnanswer/
                await this.mnanswer(c_id, i + 1, test_data[i + 1])
                await $.wait($.randomInt(5, 8))
            }
            // http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnexamtj/48f0e325497142e49f6324c3d7270cf5    提交
            // await this.mnexamtj(c_id)

            let options = {
                fn: '提交',
                method: 'get',
                url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnexamtj/${c_id}`,
                headers: this.hd,
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.status == 200) {
                let { score, err, pass, bl, time } = resp.obj
                $.log(`${this.idx}: ${options.fn}  成功, 得分: ${bl}, 错误: ${err} 个, 正确: ${score} 个, 用时: ${time} 分, 本次测试: ${pass ? '通过' : '未通过'}`)
                await $.wait($.randomInt(10, 15))
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        } else {
            await this.doTest()
        }


    }

    async mnanswer(id, num, an) { // 模拟做题  http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnanswer/48f0e325497142e49f6324c3d7270cf5/1/D
        let options = {
            fn: '模拟做题',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnanswer/${id}/${num}/${an}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            $.log(`${this.idx}: ${options.fn} 第${num}题: ${an}--模拟成功`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async createmn(id) { // 创建新的模拟 http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/createmn/2f9da9e76b814c2992001141a2e466cc
        let options = {
            fn: '创建新的模拟',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/createmn/${id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {
            return resp.obj
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async mnexaminfo(c_id) { // 获取题目及答案信息
        let options = {
            fn: '获取题目及答案信息',
            method: 'get',
            url: `http://xxqaph.sdaj.gov.cn:9999/yjpxapi/app/xxtask/mnexaminfo/${c_id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200) {

            let obj = resp.obj
            let end_test_data = {}
            if (obj.dxlist) {
                processing('dxlist')
            }
            if (obj.pdlist) {
                processing('pdlist')
            }
            if (obj.fxlist) {
                processing('fxlist')
            }

            console.log(end_test_data)

            function processing(name) {
                for (const list of obj[name]) {
                    // console.log(list.index, list.answer)
                    end_test_data[list.index] = list.answer
                    // console.log(end_test_data)
                }
            }

            return end_test_data
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }




}


!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.exitNow())


//========================= 2023/06/19 ======================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8000      // 默认超时时间
                let resp = null
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                try {
                    resp = await got(opt)
                } catch (e) {
                    console.log(e)
                }
                if (resp == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null })
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
            }

        }

        log(msg, options = {}) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
            let opt = { console: true }
            Object.assign(opt, options)

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) {
                this.notifyStr.push(msg)
            }
            if (opt.console) {
                console.log(msg)
            }

        }

        read_env(Class) {
            require('dotenv').config()
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplit.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplit[0]
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck))
                }
            }
            this.userCount = this.userList.length
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true })
                return false
            }
            this.log(`共找到${this.userCount}个账号`)
            return true
        }


        time(t, x = null) {
            let xt = x ? new Date(x) : new Date
            let e = {
                "M+": xt.getMonth() + 1,
                "d+": xt.getDate(),
                "h+": xt.getHours(),
                "m+": xt.getMinutes(),
                "s+": xt.getSeconds(),
                "q+": Math.floor((xt.getMonth() + 3) / 3),
                S: this.padStr(xt.getMilliseconds(), 3)
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }

        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr) return
            let notify = require('./sendNotify')
            this.log('\n============== 推送 ==============')
            await notify.sendNotify(this.name, this.notifyStr.join('\n'))
        }

        padStr(num, length, opt = {}) {
            let padding = opt.padding || '0'
            let mode = opt.mode || 'l'
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let pads = ''
            for (let i = 0; i < numPad; i++) {
                pads += padding
            }
            if (mode == 'r') {
                numStr = numStr + pads
            } else {
                numStr = pads + numStr
            }
            return numStr
        }

        json2str(obj, c, encode = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encode) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c)
        }

        str2json(str, decode = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue
                let idx = item.indexOf('=')
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decode) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }

        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                return data
            } else {
                return phone_num
            }
        }

        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        async yiyan() {
            const got = require('got')
            return new Promise((resolve) => {
                (async () => {
                    try {
                        const response = await got('https://v1.hitokoto.cn')
                        // console.log(response.body)
                        let data = JSON.parse(response.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.response.body)
                    }
                })()
            })
        }

        ts(type = false, _data = "") {
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

        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length))
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase()
                } else {
                    str += chars
                }
            }
            return str
        }

        randomString(len, charset = 'abcdef0123456789') {
            let str = ''
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            return str
        }

        randomList(a) {
            let idx = Math.floor(Math.random() * a.length)
            return a[idx]
        }


        wait(t) {
            $.log(`随机等待 ${t} 秒 ...`)
            return new Promise(e => setTimeout(e, t * 1000))
        }

        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}