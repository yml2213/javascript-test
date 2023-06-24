/*
酷学院 app             cron 0 1,6,12,18,22 * * *  kxy.js

23/6/19    继续研究

-------------------  青龙-配置文件-复制区域  -------------------
# 酷学院
export kxy=" phone # pwd  @  phone # pwd "  

多账号用 换行 或 @ 分割  


tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('酷学院')
const crypto = require('crypto-js')

const NodeRSA = require('node-rsa')


const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['kxy']                //支持多变量

//====================================================================================================


//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.phone = this.ck[0]
        this.pwd = this.en_rsa(this.ck[1])

        this.hd = {
            'access_token': '',
            'User-Agent': 'Android',
            'lang': 'zh_cn',
            'token': '',
            'Host': 'coolapi.coolcollege.cn',
            'Content-Type': 'application/json; charset=UTF-8'
        }

    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 登陆 --------------`)
        await this.login()

        if (this.ckFlog) {
            $.log(`\n-------------- 检查状态 --------------`)
            // await this.study_projects() // 学习项目
            // await this.exam_check()  // 考试
            await this.studies_check('unfinished') // 未完成--学习
            // await this.studies_check('finished') // 已完成--学习
            // await this.researches_check() //调研

            // await this.query('1937149800852099072', 10) // 测试学习
            // await this.do_studies('1937149800852099072', '1937140961100566528', 10) // 测试

        }
    }

    async login() { // 登陆
        let options = {
            fn: '登陆',
            method: 'post',
            url: `https://coolapi.coolcollege.cn/login-api/v3/login`,
            headers: this.hd,
            json: { "password": this.pwd, "userCode": this.phone },
            json: { "access_token": "", "password_encrypted": "1", "password": this.pwd, "login_type": "account_password_login", "user_id": "", "mobile": this.phone, "enterprise_id": "" }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200000) {
            // console.log(resp.data)
            this.access_token = resp.data.user.access_token
            this.account = resp.data.user.account       // 手机号
            this.enterprise_name = resp.data.user.enterprise_name   // 企业名字
            this.u_name = resp.data.user.name       // 个人名字
            this.type_str = resp.data.user.type_str         // 职位
            this.enterprise_id = resp.data.user.enterprise_id           // 企业 id
            this.user_id = resp.data.user.enterprises[0].user_id        // 企业用户 id
            this.id = resp.data.user.id        // 学习要用 id

            console.log('this.id', this.id, 'user_id', this.user_id)
            this.hd.timaToken = resp.data.token
            $.log(`${this.idx}: ${options.fn} ${resp.message} 🎉, 欢迎:${this.enterprise_name}--${this.u_name}--${this.type_str} ,本次actoken:${this.access_token}`)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }






    // 学习项目  检查
    // https://coolapi.coolcollege.cn/training-manage-api/v2/enterprises/${this.enterprise_id}/users/${this.user_id}/study-projects?access_token=956646b5c313460ebca1a0e645789c29&enterprise_id=${this.enterprise_id}&overdue_status=unOverdue&page_number=1&page_size=10&status=unfinished&study_type=task&user_id=${this.user_id}
    async study_projects() {
        try {
            let options = {
                fn: '学习项目',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/training-manage-api/v2/enterprises/${this.enterprise_id}/users/${this.user_id}/study-projects?`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 200000) {
                // console.log(resp.data)
                this.st_data = resp.data
                let { all_count, finished_count, unfinished_count } = resp.data.extend
                this.unfinished_count = resp.data.extend.unfinished_count

                $.log(`${this.idx}: ${this.u_name},学习项目情况 ----未学习: ${this.unfinished_count} 个, 已学习: ${finished_count} 个, 所有课程共: ${all_count} 个`)
                if (this.unfinished_count > 0) {
                    $.log(`${this.idx}: ${this.u_name}, 检测到 ${this.unfinished_count}个 未学习课程, 准备自动学习!`)
                    // await this.do_study()
                }
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }

    // 自动学习


    // 考试    检查
    // https://coolapi.coolcollege.cn/new-exam-api/v2/enterprises/${this.enterprise_id}/users/${this.user_id}/exams-list?access_token=2b4164b4fb6b45f0bd55c0ee1edf78dc&enterprise_id=${this.enterprise_id}&keyword=&page_number=1&page_size=20&status=&user_id=${this.user_id}
    async exam_check() {
        try {
            let options = {
                fn: '考试',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/new-exam-api/v2/enterprises/${this.enterprise_id}/users/${this.user_id}/exams-list?`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.code == 200000) {
                // console.log(resp.data)
                $.log(`${this.idx}: ${this.u_name},考试情况 ---- 共计: ${resp.data.all} 个, 已完成: ${resp.data.finished} 个, 未完成: ${resp.data.unfinished} 个 缺考: ${resp.data.absence} 个`)
                if (resp.data.unfinished > 0) { // 存在未完成
                    $.log(`${this.idx}: ${this.u_name}, 检测到 ${resp.data.unfinished} 个 未完成 考试, 准备自动 考试!`)
                    await this.exam()
                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }

    // 学习    检查
    // https://coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/studies?access_token=2b4164b4fb6b45f0bd55c0ee1edf78dc&enterprise_id=${this.enterprise_id}&page_number=1&page_size=10&status=unfinished&user_id=${this.user_id}
    async studies_check(type) {
        try {
            let options = {
                fn: '未完成-学习检查',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/studies?access_token=${this.access_token}&enterprise_id=${this.enterprise_id}&page_number=1&page_size=100&status=${type}&user_id=${this.user_id}`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.has_next_page == 'false') {
                // console.log(resp.data)
                if (resp.total > 0) {
                    $.log(`${this.idx}: ${this.u_name},学习情况 ---- 共计: ${resp.total} 个未完成, , 准备自动 学习!`)
                    await this.studies(resp.list)
                } else {
                    $.log(`${this.idx}: ${this.u_name},学习情况 ---- 已完成所有学习!`)
                }
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    async studies(lists) { // 自动 学习 1685635200000
        try {
            let ts = $.ts(13)
            // console.log(lists)
            for (const list of lists) {
                this.id = list.id
                this.progress = list.progress
                console.log(`${list.title}:${this.id}--${list.create_user_name}, 目前进度:${this.progress}%, 开始时间:${$.ts('ts2Data', list.begin_time)}, 截止时间:${$.ts('ts2Data', list.end_time)}`)
                if (list.begin_time <= ts && list.end_time >= ts && this.progress < 100) {
                    console.log(`目前任务 ${list.title}, 在规定时间内, 即将开始自动学习!`)

                    await this.query()
                } else (
                    console.log(`目前任务 ${list.title}, 已完成学习!`)
                )
            }

        } catch (e) {
            console.log(e)
        }
    }


    async query() { // 根据id 查看任务详情
        try {
            let options = {
                fn: '任务详情',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/studies/${this.id}/query?access_token=${this.access_token}&enterprise_id=${this.enterprise_id}&user_id=${this.user_id}`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp) {
                let lists = resp.stages[0].course_list
                // console.log(lists)
                console.log(`目前任务${resp.title} 共有 ${lists.length} 个小任务!`)
                for (const list of lists) {
                    // console.log(list.title, list.id, list.progress)
                    this._title = list.title
                    this._id = list.id
                    this._progress = list.progress

                    if (this._progress < 100) {
                        console.log(`目前小任务 ${this._title}, 未完成, 即将开始自动学习!`)
                        await this.do_studies(this.id, this._id, this._progress)
                    } else (
                        console.log(`目前小任务 ${list.title}, 已完成学习!`)
                    )
                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }



    }

    async do_studies(id, _id, _progress) {
        this.new_p = await this.up_progress(_progress)
        this.new_p <= 100 ? await this.save_progress('studies', id, _id, this.new_p) : await this.save_progress('studies', id, _id, 100)
    }

    async up_progress(progress) {
        await $.wait($.randomInt(15, 30))  // 随机等待时间
        // await $.wait($.randomInt(4, 6))  // 随机等待时间
        let a = $.randomInt(3, 10)
        // console.log(a)
        a = progress + a
        this.progress = a
        return a
    }

    // https://waf-coolapi.coolcollege.cn/training-manage-api/v2/1371843837940600987/users/1909191009892438016/studies/1937149800852099072/courses/1937141198040993792/resources/1937141198040993792/save_progress?access_token=2b4164b4fb6b45f0bd55c0ee1edf78dc&enterprise_id=1371843837940600987&user_id=1909191009892438016
    async save_progress(type, id, _id, progress) { // 保存进度 
        try {
            let sign = crypto.MD5(`${this.enterprise_id}_${this.user_id}_${this.access_token}_${_id}_${progress}`).toString()
            let options = {
                fn: '保存进度',
                method: 'post',
                url: `https://waf-coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/${type}/${id}/courses/${_id}/resources/${_id}/save_progress?access_token=${this.access_token}&enterprise_id=${this.enterprise_id}&user_id=${this.user_id}`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'x-data-sign': sign,
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                },
                json: {
                    "progress": progress,
                    "recent_start": progress,
                    "mapId": ""
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            console.log(resp)
            if (resp.code == 0) {
                // console.log(resp.data)
                $.log(`当前进度: ${resp.progress} %`)
                if (resp.progress < 100) {
                    await this.do_studies(this.id, this._id, this.new_p)
                } else {
                    console.log(`目前小任务, 已完成学习!`)
                }
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }

    // 调研    检查
    // https://coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/researches?access_token=2b4164b4fb6b45f0bd55c0ee1edf78dc&enterprise_id=${this.enterprise_id}&page_number=1&page_size=10&status=unfinished&user_id=${this.user_id}
    async researches_check() {
        try {
            let options = {
                fn: '调研检查',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/training-manage-api/v2/${this.enterprise_id}/users/${this.user_id}/researches?page_number=1&page_size=50`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp) {
                // console.log(resp.data)
                if (resp.total > 0) {
                    $.log(`${this.idx}: ${this.u_name},调研情况 ---- 共计: ${resp.total} 个未完成, , 准备自动 调研!`)
                    // await this.studies()
                } else {
                    $.log(`${this.idx}: ${this.u_name},调研情况 ---- 已完成所有调研!`)
                }
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    async exam() { // 自动 考试
        try {
            let options = {
                fn: '考试',
                method: 'get',
                url: `https://coolapi.coolcollege.cn/new-exam-api/v2/enterprises/${this.enterprise_id}/users/${this.user_id}/exams-list?`,
                headers: {
                    'Pragma': 'no-cache',
                    'Enterprise-Id': this.enterprise_id,
                    'X-Access-Token': this.access_token,
                    'X-Requested-With': 'com.coolcollege.kxy',
                    'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 Android_App',
                }
            }
            // console.log(options)
            // let resp = await $.request(options)
            // // console.log(resp)
            // if (resp.code == 200000) {
            //     // console.log(resp.data)
            //     $.log(`${this.idx}: ${this.u_name},考试情况 ---- 共计: ${resp.data.all} 个, 已完成: ${resp.data.finished} 个, 未完成: ${resp.data.unfinished} 个 缺考: ${resp.data.absence} 个`)
            //     if (resp.data.unfinished >= 0) { // 存在未完成
            //         $.log(`${this.idx}: ${this.u_name}, 检测到 ${resp.data.unfinished}个 未完成 考试, 准备自动 考试!`)
            //         await this.exam()
            //     }

            // } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }
    }


    //RSA加密
    en_rsa(encryptTxt) {
        let Key = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwp+dZYUGEJ8ixBevMmANELzri9jUet/m5AR8V
    krktzuZZ0B0X+F+DYiYWmSn0/2MSWRxtiVU7d2ZzPYodBelubnH3YgxcOKJ8ILaLlCkWZd30L68M
    AO3JG65NWIgCDq9d0BFiOY6XzRFav2E5+u33hVk1jWspTlgL9ylaEB5ynQIDAQAB`
        let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
        nodersa.setOptions({ encryptionScheme: 'pkcs1' })
        let decryptText = nodersa.encrypt(encryptTxt, 'base64', 'utf8')
        return decryptText
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
    .catch((e) => $.log(e))
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
                        let time = _data
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