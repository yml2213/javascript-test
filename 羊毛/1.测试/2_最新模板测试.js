/*
抓登录包 响应体的 refreshToken 值
同目录新建一个 mr.txt 一行一个
注意填写42行的变量，默认男士
一天俩次吧
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyQ29udGV4dCI6IntcInVzZXJuYW1lXCI6XCJtMTM3NTQ2NTA4MDRcIixcIm5pY2tOYW1lXCI6XCIxMzc1NDY1MDgwNFwiLFwiaWRcIjpcIjE2NDE5OTI2ODg1OTkzMzQ5MTRcIixcImxvbmdUZXJtXCI6ZmFsc2UsXCJyb2xlXCI6XCJNRU1CRVJcIixcImlzU3VwZXJcIjpmYWxzZX0iLCJzdWIiOiJtMTM3NTQ2NTA4MDQiLCJleHAiOjE2ODUyNTYzNDV9.BJcfGdgGntBYNMNg_AiTO4aeRS7KOaHltplDNIYokJ8

*/
const $ = new Env('猫人')
const got = require('got')
const fs = require('fs')
const ckFile1 = 'mr.txt'
const envPrefix = '1'
const envSplitor = ['\n', '&', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + ''] //可以支持多变量


let userCookie = []
try {
    userCookie = userCookie.concat(fs.readFileSync(`./${ckFile1}`, 'utf-8').split('\n') || [])
    console.log(`ck文件[ ${ckFile1} ]加载成功`)
    this.mxr = true
} catch (e) {
    console.log(`未发现本地文件 调用青龙环境变量`)
    this.mxr = false
}
let mxr = this.mxr
if (this.mxr == false) {
    try {
        userCookie = userCookie.concat((($.isNode() ? process.env[ckNames] : $.getdata(ckNames)) || '')?.split('\n') || [])
        console.log(`环境变量[ ${ckNames} ]加载成功`)
    } catch (e) {
        //console.log(e)
    }
}
let userList = []
const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 20 //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3

//////////////////////////////////////////////////
/*
自定义变量区
*/
let dh = 'man'    //男士 man    女士  lady
///////////////////////////////////////////////////
class BasicClass {
    constructor() {
        this.index = $.userIdx++
        this.name = ''
        this.valid = true

        //设置got的默认超时等参数
        this.got = got.extend({
            retry: { limit: 0 },
            timeout: DEFAULT_TIMEOUT,
            followRedirect: false,
        })
    }
    //给每个账户打印前面加上自己的名字
    log(msg, opt = {}) {
        var m = '', n = $.userCount.toString().length;;
        if (this.index) m += `账号[${$.padStr(this.index, n)}]`
        if (this.name) m += `[${this.name}]`
        $.log(m + msg, opt)
    }
    //使用自己的got实例发包,可以实现设置每个账号自己的默认UA等
    async request(opt) {
        var resp = null, count = 0
        var fn = opt.fn || opt.url
        opt.method = opt?.method?.toUpperCase() || 'GET'
        while (count++ < DEFAULT_RETRY) {
            try {
                var err = null
                const errcodes = ['ECONNRESET', 'EADDRINUSE', 'ENOTFOUND', 'EAI_AGAIN']
                await this.got(opt).then(t => {
                    resp = t
                }, e => {
                    err = e
                    resp = e.response
                })
                if (err) {
                    if (err.name == 'TimeoutError') {
                        this.log(`[${fn}]请求超时(${err.code})，重试第${count}次`)
                    } else if (errcodes.includes(err.code)) {
                        this.log(`[${fn}]请求错误(${err.code})，重试第${count}次`)
                    } else {
                        let statusCode = resp?.statusCode || -1
                        this.log(`[${fn}]请求错误(${err.message}), 返回[${statusCode}]`)
                        break
                    }
                } else {
                    break
                }
            } catch (e) {
                this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
            };
        }
        let { statusCode = -1, headers = null, body = null } = resp
        if (body) try { body = JSON.parse(body) } catch { };
        return { statusCode, headers, result: body }
    }
}
let http = new BasicClass()

class UserClass extends BasicClass {
    constructor(ck) {
        super()
        this.ck = ck.split('#')


        this.got = this.got.extend({
            headers: {},
        })
    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`)

        await this.login()
        await $.wait(1000)
        await this.signlist()
        await $.wait(3000)
        await this.userinfo()
        await $.wait(1000)
        await this.orders()
    }

    async login() {
        try {
            let options = {
                fn: '登录',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/members/refresh/${this.ck}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN'
                }

            }
            let { result } = await this.request(options)
            if (result.code == 200) {
                this.log(`刷新refreshToken成功`)

                this.accessToken = result.result.accessToken

                this.refreshToken = `${result.result.refreshToken}\n`

                fs.appendFile("mr.txt", this.refreshToken, (err, data) => {
                    if (err) throw err
                })
                await $.wait(1000)
            } else {

                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async signlist() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let ts = getday2()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)
        try {
            let options = {
                fn: '签到列表',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/members/sign/month?time=${ts}&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            if (result.code == 200) {
                let day = local_day()
                if (result.result[day - 1]) {
                    this.log(`今日已签到`)

                } else {
                    this.log(`今日未签到 去签到...`)
                    await $.wait(1000)
                    await this.signin()
                }
            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }

    async signin() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let ts = getday()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)
        try {
            let options = {
                fn: '签到',
                method: 'post',
                url: `https://shopapp.miiow.com.cn/buyer/members/sign?time=${ts}&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                },
                form: {}

            }
            let { result } = await this.request(options)
            if (result.code == 200) {
                this.log(result.result)
            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async userinfo() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '用户信息',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/members?nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            if (result.code == 200) {
                this.log('用户:[' + phone_num(result.result.mobile) + ']' + '积分余额:[' + result.result.point + ']')
                await this.xd10()
                await this.xd9(result.result.point)
            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async xd2(a) {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '下单',
                method: 'post',
                url: `https://shopapp.miiow.com.cn/buyer/trade/carts/create/trade?nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                },
                json: {
                    "client": "WECHAT_MP",
                    "way": "POINTS",
                    "remark": [
                        {
                            "remark": "",
                            "storeId": a
                        }
                    ]
                }

            }
            let { result } = await this.request(options)
            //   this.log(JSON.stringify(result))
            if (result.code == 200) {
                this.log(`下单成功`)
            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }


    async xd5() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '选择订单地址',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/trade/carts/shippingAddress?shippingAddressId=${this.shippingAddressId}&way=POINTS&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //       this.log(JSON.stringify(result))
            if (result.code == 200) {

            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async xd6() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '获取地址',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/memberAddress?pageNumber=1&pageSize=1000&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //       this.log(JSON.stringify(result))
            if (result.code == 200) {
                this.shippingAddressId = result.result.records[0].id

            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async xd7() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '创建支付订单',
                method: 'post',
                url: `https://shopapp.miiow.com.cn/buyer/trade/carts?nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                },
                form: {
                    skuId: this.skuId,
                    num: '1',
                    cartType: 'POINTS'
                }

            }
            let { result } = await this.request(options)
            //  this.log(JSON.stringify(result))
            if (result.code == 200) {


            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }
    async xd8(a) {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '获取skuId',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/promotion/pointsGoods/${a}?nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //  this.log(JSON.stringify(result))
            if (result.code == 200) {
                this.skuId = result.result.skuId

            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }


    async xd9(a) {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '积分兑换列表',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/promotion/pointsGoods?pageNumber=1&pageSize=9999&pointsGoodsCategoryId=${this.pointsGoodsCategoryId}&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //   this.log(JSON.stringify(result))

            if (dh == 'lady') {

                for (let task of (result.result.records || [])) {
                    switch (task.goodsSku.goodsName) {

                        case '750积分兑换女士内裤 99':
                            this.log(`兑换商品:[${task.goodsSku.goodsName}] 库存:[${task.activeStock}] 所需积分:[${task.points}]`)

                            if (a >= task.points) {
                                this.log(`积分达到兑换目标商品:[${task.goodsSku.goodsName}]  去下单...`)
                                await this.xd8(task.id)
                                await this.xd7()
                                await this.xd6()
                                await this.xd5()
                                await this.xd2(task.storeId)
                            }

                            break

                    }
                }
            } else if (dh == 'man') {

                for (let task of (result.result.records || [])) {
                    switch (task.goodsSku.goodsName) {

                        case '850积分兑换男士内裤 99':
                            this.log(`兑换商品:[${task.goodsSku.goodsName}] 库存:[${task.activeStock}] 所需积分:[${task.points}]`)
                            if (a >= task.points) {
                                this.log(`积分达到兑换目标商品:[${task.goodsSku.goodsName}]  去下单...`)
                                await this.xd8(task.id)
                                await this.xd7()
                                await this.xd6()
                                await this.xd5()
                                await this.xd2(task.storeId)
                            }
                            break

                    }
                }

            }





        } catch (e) {
            console.log(e)
        }
    }

    async xd10() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '获取商城id',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/promotion/pointsGoods/category?nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //  this.log(JSON.stringify(result))
            if (result.code == 200) {
                this.pointsGoodsCategoryId = result.result.records[0].id

            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }

    async orders() {
        let ts13 = Math.round(new Date().getTime()).toString()
        let sjzfc = randomString(6)
        let sign = MD5_Encrypt(sjzfc + ts13 + this.accessToken)


        try {
            let options = {
                fn: '检查快递是否发货',
                method: 'get',
                url: `https://shopapp.miiow.com.cn/buyer/orders?pageNumber=1&pageSize=10&tag=ALL&nonce=${sjzfc}&timestamp=${ts13}&sign=${sign}`,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d38) NetType/WIFI Language/zh_CN',
                    'AccessToken': this.accessToken
                }

            }
            let { result } = await this.request(options)
            //  this.log(JSON.stringify(result))
            if (result.code == 200) {
                if (result.result.records.length != 0) {
                    this.log(`订单状态:[${result.result.records[0].orderStatus}] 送达状态:[${result.result.records[0].deliverStatus}] 快递单号:[${result.result.records[0].logisticsNo}]`)
                    //    this.log('DELIVERED/已交付  COMPLETED/完成  UNDELIVERED/未交付')

                } else if (result.result.records.length == 0) {
                    this.log('无订单记录')
                }

            } else {
                this.log(JSON.stringify(result))
            }



        } catch (e) {
            console.log(e)
        }
    }

}

!(async () => {

    //删除文件
    fs.unlink('mr.txt', (err) => { if (err) throw err })
    if (typeof $request !== "undefined") {
        await GetRewrite()
    } else {
        if (!(await checkEnv())) return
        if (userList.length > 0) {
            taskll = []
            //正常的做任务流程
            for (let user of userList) {
                await user.userTask()
            }
        }
    }


    //封装的并发方法, 想试的把下面的//删掉
    //   await $.threadTask('userTask',MAX_THREAD);

})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())
///////////////////////////////////////////////////////////////////
async function GetRewrite() {

}
function number(d) { var b = parseFloat(d); if (isNaN(b)) return !1; var b = Math.round(100 * d) / 100, a = b.toString(), c = a.indexOf("."); for (c < 0 && (c = a.length, a += "."); a.length <= c + 2;)a += "0"; return a }
function checkEnv() {
    if (userCookie) {
        for (let userCookies of userCookie) {
            if (userCookies) userList.push(new UserClass(userCookies))
        }
        userCount = userList.length
    } else {
        console.log(`未找到CK`)
        return false
    }

    console.log(`\n共找到${userCount}个账号`)
    return true
}
function randomString(m) {
    for (var e = m > 0 && void 0 !== m ? m : 21, t = ""; t.length < e;) t += Math.random().toString(36).slice(2)
    return t.slice(0, e)
}
//////////////////////////////////////////////////////////////////////////////////
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行\n`, { time: true })
            this.notifyStr = []
            this.notifyFlag = true
            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }
        log(msg, options = {}) {
            let opt = { console: true }
            Object.assign(opt, options)
            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) this.notifyStr.push(msg)
            if (opt.console) console.log(msg)
        }
        read_env(Class) {
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplitor.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplitor[0]
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
        async threads(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++]
                if (!user.valid) continue
                await user[taskName](opt)
            }
        }
        async threadTask(taskName, thread) {
            let taskAll = []
            let taskConf = { idx: 0 }
            while (thread--) taskAll.push(this.threads(taskName, taskConf))
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
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }
        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr.length) return
            var notify = require('./sendNotify')
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
        randomString(len, charset = 'abcdefghijklmnopqrstuvwxyz0123456789') {
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
        sjsz(len, charset = '0123456789') {
            let str = ''
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            return str
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log('')
            this.log(`[${this.name}]运行结束，共运行了${s}秒`, { time: true })
            process.exit(0)
        }
    }
    (name)
}



function getday() {
    let myDate = new Date()
    y = myDate.getFullYear()
    m = myDate.getMonth() + 1
    d = myDate.getDate()
    if (m.toString().length == 1) {
        m = `0${m}`
    }
    if (d.toString().length == 1) {
        d = `0${d}`
    }
    return y + '-' + m + '-' + d
}
function getday2() {
    let myDate = new Date()
    y = myDate.getFullYear()
    m = myDate.getMonth() + 1
    d = myDate.getDate()
    if (m.toString().length == 1) {
        m = `0${m}`
    }
    if (d.toString().length == 1) {
        d = `0${d}`
    }
    return y + m
}
function phone_num(phone_num) {
    if (phone_num.length == 11) {
        let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
        return data
    } else {
        return phone_num
    }
}
/**
 * 获取当前天数(数字)  5日
 */
function local_day() {
    let myDate = new Date()
    let d = myDate.getDate()
    return d
}
function MD5_Encrypt(a) { function b(a, b) { return (a << b) | (a >>> (32 - b)) } function c(a, b) { var c, d, e, f, g; return ((e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f) } function d(a, b, c) { return (a & b) | (~a & c) } function e(a, b, c) { return (a & c) | (b & ~c) } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++; return ((b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g) } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++) (b = (a >>> (8 * c)) & 255), (e = "0" + b.toString(16)), (d += e.substr(e.length - 2, 2)); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128))) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) (p = t), (q = u), (r = v), (s = w), (t = h(t, u, v, w, x[o + 0], y, 3614090360)), (w = h(w, t, u, v, x[o + 1], z, 3905402710)), (v = h(v, w, t, u, x[o + 2], A, 606105819)), (u = h(u, v, w, t, x[o + 3], B, 3250441966)), (t = h(t, u, v, w, x[o + 4], y, 4118548399)), (w = h(w, t, u, v, x[o + 5], z, 1200080426)), (v = h(v, w, t, u, x[o + 6], A, 2821735955)), (u = h(u, v, w, t, x[o + 7], B, 4249261313)), (t = h(t, u, v, w, x[o + 8], y, 1770035416)), (w = h(w, t, u, v, x[o + 9], z, 2336552879)), (v = h(v, w, t, u, x[o + 10], A, 4294925233)), (u = h(u, v, w, t, x[o + 11], B, 2304563134)), (t = h(t, u, v, w, x[o + 12], y, 1804603682)), (w = h(w, t, u, v, x[o + 13], z, 4254626195)), (v = h(v, w, t, u, x[o + 14], A, 2792965006)), (u = h(u, v, w, t, x[o + 15], B, 1236535329)), (t = i(t, u, v, w, x[o + 1], C, 4129170786)), (w = i(w, t, u, v, x[o + 6], D, 3225465664)), (v = i(v, w, t, u, x[o + 11], E, 643717713)), (u = i(u, v, w, t, x[o + 0], F, 3921069994)), (t = i(t, u, v, w, x[o + 5], C, 3593408605)), (w = i(w, t, u, v, x[o + 10], D, 38016083)), (v = i(v, w, t, u, x[o + 15], E, 3634488961)), (u = i(u, v, w, t, x[o + 4], F, 3889429448)), (t = i(t, u, v, w, x[o + 9], C, 568446438)), (w = i(w, t, u, v, x[o + 14], D, 3275163606)), (v = i(v, w, t, u, x[o + 3], E, 4107603335)), (u = i(u, v, w, t, x[o + 8], F, 1163531501)), (t = i(t, u, v, w, x[o + 13], C, 2850285829)), (w = i(w, t, u, v, x[o + 2], D, 4243563512)), (v = i(v, w, t, u, x[o + 7], E, 1735328473)), (u = i(u, v, w, t, x[o + 12], F, 2368359562)), (t = j(t, u, v, w, x[o + 5], G, 4294588738)), (w = j(w, t, u, v, x[o + 8], H, 2272392833)), (v = j(v, w, t, u, x[o + 11], I, 1839030562)), (u = j(u, v, w, t, x[o + 14], J, 4259657740)), (t = j(t, u, v, w, x[o + 1], G, 2763975236)), (w = j(w, t, u, v, x[o + 4], H, 1272893353)), (v = j(v, w, t, u, x[o + 7], I, 4139469664)), (u = j(u, v, w, t, x[o + 10], J, 3200236656)), (t = j(t, u, v, w, x[o + 13], G, 681279174)), (w = j(w, t, u, v, x[o + 0], H, 3936430074)), (v = j(v, w, t, u, x[o + 3], I, 3572445317)), (u = j(u, v, w, t, x[o + 6], J, 76029189)), (t = j(t, u, v, w, x[o + 9], G, 3654602809)), (w = j(w, t, u, v, x[o + 12], H, 3873151461)), (v = j(v, w, t, u, x[o + 15], I, 530742520)), (u = j(u, v, w, t, x[o + 2], J, 3299628645)), (t = k(t, u, v, w, x[o + 0], K, 4096336452)), (w = k(w, t, u, v, x[o + 7], L, 1126891415)), (v = k(v, w, t, u, x[o + 14], M, 2878612391)), (u = k(u, v, w, t, x[o + 5], N, 4237533241)), (t = k(t, u, v, w, x[o + 12], K, 1700485571)), (w = k(w, t, u, v, x[o + 3], L, 2399980690)), (v = k(v, w, t, u, x[o + 10], M, 4293915773)), (u = k(u, v, w, t, x[o + 1], N, 2240044497)), (t = k(t, u, v, w, x[o + 8], K, 1873313359)), (w = k(w, t, u, v, x[o + 15], L, 4264355552)), (v = k(v, w, t, u, x[o + 6], M, 2734768916)), (u = k(u, v, w, t, x[o + 13], N, 1309151649)), (t = k(t, u, v, w, x[o + 4], K, 4149444226)), (w = k(w, t, u, v, x[o + 11], L, 3174756917)), (v = k(v, w, t, u, x[o + 2], M, 718787259)), (u = k(u, v, w, t, x[o + 9], N, 3951481745)), (t = c(t, p)), (u = c(u, q)), (v = c(v, r)), (w = c(w, s)); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }