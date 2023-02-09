/*
广汽传祺 app             cron 22 8,12 * * *  gqcq.js

4-13     	完成签到 抽奖 分享 发帖 评论 任务   有bug及时反馈
4-14     	修复已知bug  恢复正常使用
5-21     	更新通知,优化代码
6-10		更新模板,修改部分逻辑!
9-12        修复抽奖，增加签到宝箱开启
9-21        增加用户信息输出
9-22		修复开宝箱错误
9-28		修复删除帖子错误
9-29		增加了快递信息查询,不用来回看了
10-10		感谢 banxiaya 大佬修复
12.14       查询增加手机号
23/1/3      更换模版

-------------------  青龙-配置文件-复制区域  -------------------
# 广汽传祺
export gqcq=" token @ token "  

抓 gsp.gacmotor.com 的 token

多账号用 换行 或 @ 分割  
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('广汽传祺')
const {MD5} = require('crypto-js')
const notify = require('./sendNotify')

const envSplitor = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['gqcq']                //支持多变量
//====================================================================================================
let DEFAULT_RETRY = 2           // 默认重试次数
let token = '17fdf8cd32444132bcbc9ff5b74e11bf'   // 自己更换token即可

//====================================================================================================


async function userTasks() {
    $.log('用户信息', {sp: true, console: false})  // 带分割的打印
    await userInfo()
    await userInfo2()


}

async function userInfo() {
    let options = {
        fn: 'userInfo',
        method: 'get',
        url: 'https://gsp.gacmotor.com/gateway/app-api/shop/shopcommodity/morecommodity?current=1&size=200&pageNo=1&pageSize=200&subclassId=0&categoryId=16',
        headers: {
            'token': token,
        }
    }
    // console.log(options)
    let resp = await $.request(options)
    // console.log(resp)
    if (resp.errorCode == 200) {
        $.log(`${this.idx}: 库存: ${resp.errorMessage}`)
        let goods = resp.data.commodityList.records
        $.log(`=================== 新品驾到 =========================`, {notify: true})
        for (let good of goods) {
            // console.log(good)
            let {commodityName, stock, mixtureSkuGdou} = good
            $.log(`${commodityName}: 积分 ${mixtureSkuGdou}, 剩余 ${stock} 个`, {notify: true})
        }
    } else console.log(`${options.fn}: 失败, ${resp}`)

}

// https://gsp.gacmotor.com/gateway/app-api/shop/shopcommodity/morecommodity?current=1&size=200&pageNo=1&pageSize=20&subclassId=0&categoryId=1
async function userInfo2() {
    let options = {
        fn: 'userInfo',
        method: 'get',
        url: 'https://gsp.gacmotor.com/gateway/app-api/shop/shopcommodity/morecommodity?current=1&size=200&pageNo=1&pageSize=200&subclassId=0&categoryId=1',
        headers: {
            'token': token,
        }
    }
    // console.log(options)
    let resp = await $.request(options)
    // console.log(resp)
    if (resp.errorCode == 200) {
        let goods = resp.data.commodityList.records
        $.log(`\n\n=================== G豆精选 =========================`, {notify: true})
        for (let good of goods) {
            // console.log(good)
            let {commodityName, stock, mixtureSkuGdou} = good
            $.log(`${commodityName}: 积分 ${mixtureSkuGdou}, 剩余 ${stock} 个`, {notify: true})
        }
    } else console.log(`${options.fn}: 失败, ${resp}`)

}

!(async () => {
    console.log(await $.yiyan())
    await userTasks()


})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


//===============================================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`, {time: true})

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt) {
            const got = require('got')
            let DEFAULT_TIMEOUT = 8000      // 默认超时时间
            let resp = null, count = 0
            let fn = opt.fn || opt.url
            let resp_opt = opt.resp_opt || 'body'
            opt.timeout = opt.timeout || DEFAULT_TIMEOUT
            opt.retry = opt.retry || {limit: 0}
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
            if (resp == null) return Promise.resolve({statusCode: 'timeout', headers: null, body: null})
            let {statusCode, headers, body} = resp
            if (body) try {
                body = JSON.parse(body)
            } catch {
            }
            if (resp_opt == 'body') {
                return Promise.resolve(body)
            } else if (resp_opt == 'hd') {
                return Promise.resolve(headers)
            } else if (resp_opt == 'statusCode') {
                return Promise.resolve(statusCode)
            }

        }

        log(msg, options = {}) {
            let opt = {console: true}
            Object.assign(opt, options)


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
                let sp = envSplitor.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplitor[0]
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck))
                }
            }
            this.userCount = this.userList.length
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, {notify: true})
                return false
            }
            this.log(`共找到${this.userCount}个账号`)
            return true
        }


        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr) return
            let notify = require('./sendNotify')
            this.log('\n============== 推送 ==============')
            await notify.sendNotify(this.name, this.notifyStr.join('\n'))
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
