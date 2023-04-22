/*
习酒 小程序             cron 47 6,12,18 * * *  xijiu.js


23/3/18    修改原有脚本


-------------------  青龙-配置文件-复制区域  -------------------
# 习酒
export xijiu="token # 兑换类型 # 手机号  @  token # 兑换类型 # 手机号 "  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('习酒')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['xijiu']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


async function userTasks() {


    $.log('登录刷新', { sp: true, console: false })  // 带分割的打印
    let list = []
    for (let user of $.userList) {
        list.push(user.Info())
    }
    await Promise.all(list)


    // $.log('用户信息', { sp: true, console: false })  // 带分割的打印
    // list = []
    // for (let user of $.userList) {
    //     list.push(user.doSign())
    //     list.push(user.user_info())
    // }
    // await Promise.all(list)


    $.log('任务', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.tasklist_other())
        }
    }
    await Promise.all(list)


}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.token = this.ck[0]
        this.dh_typy = this.ck[1]
        this.phoen = this.ck[2]


        this.dUA = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'

        this.hd_xcx = {
            'Host': 'xcx.exijiu.com',
            'User-Agent': this.dUA,
            'login_code': this.token,
            'Authorization': '',
        }

        this.hd_api = {
            'Host': 'apimallwm.exijiu.com',
            'User-Agent': this.dUA,
            'login_code': this.token,
            'Authorization': '',
        }


    }

    async Info() { // 个人信息
        let options = {
            fn: '个人信息',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/getJifenShopMemberInfo`,
            headers: {
                'Host': 'xcx.exijiu.com',
                'User-Agent': this.dUA,
                'login_code': this.token,
            },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.id = resp.data.id
            this.phone_no = resp.data.phone_no
            this.integration = resp.data.integration
            // console.log(this.uid, this.name)
            $.log(`${this.idx}: ${options.fn} 成功 🎉, 手机号:${$.phoneNum(this.phone_no)}, 积分:${this.integration}`, { notify: true })
            this.ckFlog = true
            await $.wait(2)
            await this.getJwt()
        } else if (resp.code == -1) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`, { notify: true })
            this.ckFlog = false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async getJwt() { // 获取新jwt
        let options = {
            fn: '获取新jwt',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/getJwt`,
            headers: {
                'Host': 'xcx.exijiu.com',
                'User-Agent': this.dUA,
                'login_code': this.token,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.jwt = resp.data.jwt
            this.hd_xcx.Authorization = resp.data.jwt
            this.hd_api.Authorization = resp.data.jwt
            await this.refresh()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }
    async refresh() { // 刷新
        let options = {
            fn: '刷新',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/hasDataMsCenterUser`,
            headers: this.hd_xcx
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} 成功 `)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async tasklist() { // 任务列表

    }



    async tasklist_other() { // 任务列表

        await this.change_phone()       // 判断是否种兑换话费
        await this.is_wheat()       // 判断是否种植小麦

        // await this.gardenmemberwine()  // 制酒 高粱
        // await this.info()       // 仓库 水 高粱 小麦 酒曲 酒 数量

        // await this.signin()     // 签到
        // await this.dailySign()


        // await this.Gardenquestiontask()     // 答题


        // await this.dailyShare()     // 每日分享
        // await this.$.wait(1000)
        // await this.dailyShare()
        // await this.$.wait(1000)
        // await this.dailyShare()



        // await this.realscene()
        // await this.sorghumindex2()      // 获取浇水施肥id
        // await this.zjq()        // 制作酒曲
        // await this.sorghumindex()       // 种高粱 ?

    }




    async change_phone() { // 判断是否种兑换话费
        if (this.phoen.length == 11) {
            if (this.integration >= 10000) {
                $.log(`${this.idx}: 积分 ${this.integration}, 可换三网 100元 话费, 即将自动更换`, { notify: true })
                if (this.dh_typy == 'lt') {
                    let a = `goods_code=1001-LT&id=61610&phone=${this.phoen}`
                    await this.do_change_phone(a)    // 联通话费
                } else if (this.dh_typy == 'yd') {
                    let a = `goods_code=1001-YD&id=61615&phone=${this.phoen}`
                    await this.do_change_phone(a)  // 移动话费
                } else if (this.dh_typy == 'dx') {
                    let a = `goods_code=1001-DX&id=61605&phone=${this.phoen}`
                    await this.do_change_phone(a)  // 电信话费
                } else {
                    $.log(`${this.idx}: 兑换话费变量设置错误，不执行`)
                }
            }
        } else {
            $.log(`${this.idx}: 未设置兑换话费变量，不执行`)
        }
    }


    async do_change_phone(a) { // 兑换话费
        let options = {
            fn: '兑换话费',
            method: 'post',
            url: `https://apimallwm.exijiu.com/oforders`,
            headers: {
                "Host": "apimallwm.exijiu.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": this.dUA,
                "Authorization": this.jwt,
            },
            form: $.str2json(a)
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            $.log(`${this.idx}: ${options.fn} --  ${resp.msg}`, { notify: true })
        } else if (resp.err == 40040) {
            $.log(`${this.idx}: ${options.fn} --  ${resp.msg}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }




    async is_wheat() { // 是否种植小麦
        let options = {
            fn: '是否种植小麦',
            method: 'get',
            url: `https://apimallwm.exijiu.com/garden/gardenmemberinfo/getMemberInfo`,
            headers: this.hd_api
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            if (resp.data.wine_yeast <= 2) {
                await this.do_wheat() //种植小麦
            }
            // $.log(`${this.idx}: ${options.fn} 成功 `)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async do_wheat() { // 种植小麦
        try {
            let options = {
                fn: '种植小麦',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let list = resp.data
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status != -1) {
                        $.log(list[i].serial_number + "号田下次成熟时间：" + list[i].crop_time)
                        let typeid = list[i].id
                        await harvest(typeid)
                        await sorghum2(typeid, 2)
                        await all()
                    }

                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }




}


!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        await userTasks()
    }


})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


//===============================================================
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
                let resp = null, count = 0
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                while (count++ < DEFAULT_RETRY) {
                    try {
                        resp = await got(opt)
                        break
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`)
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
                        }
                    }
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
            if (opt.sp) {
                console.log(`\n-------------- ${msg} --------------`)
            }
        }

        read_env(Class) {
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

        async taskThread(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++]
                await user[taskName](opt)
            }
        }

        async threadManager(taskName, thread) {
            let taskAll = []
            let taskConf = { idx: 0 }
            while (thread--) {
                taskAll.push(this.taskThread(taskName, taskConf))
            }
            await Promise.all(taskAll)
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