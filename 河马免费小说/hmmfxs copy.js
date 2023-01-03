'use strict'

var require$$0 = require('dotenv')
var got = require('got')
var hpagent = require('hpagent')
var require$$1 = require('querystring')
var require$$2 = require('tunnel')
var require$$3 = require('crypto')
var require$$4 = require('fs')
var require$$5 = require('path')
var require$$7 = require('tough-cookie')

function _interopNamespaceDefault(e) {
    var n = Object.create(null)
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k)
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k] }
                })
            }
        })
    }
    n.default = e
    return Object.freeze(n)
}

var require$$0__namespace = /*#__PURE__*/_interopNamespaceDefault(require$$0)

/* Hash constant words K: */ new Array(0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2)

/**
 * 取最小值
 * @param {number} a
 * @param {number} b
 */
function min(a, b) {
    return a < b ? a : b
}
/**
 * 取最大值
 * @param {number} a
 * @param {number} b
 */
function max(a, b) {
    return a < b ? b : a
}

/**
 * @param {number} len 长度
 * @param {boolean} up 是否大写
 * @param {string} charset 随机的字符串
 */
function randomStr(len, up = false, charset = "abcdef0123456789") {
    let str = ""
    for (let i = 0; i < len; i++) {
        str += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    if (!up) {
        return str
    }
    return str.toUpperCase()
}

/**
 * 返回区间随机值
 * @param {number} min 最小数
 * @param {number} max 最大数
 * @returns 随机值
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

var math = {
    min,
    max,
    randomStr,
    randomInt,
}

class Http {

    /**
     * 初始化一个http对象
     * @param {string} host hostname地址
     * @param {Object} headers 自定义的header
     */
    constructor(host, headers) {
        this.headers = headers
        this.host = host
        const options = {
            prefixUrl: host,
            headers: headers,
        }
        this.client = got.extend(options)
    }

    /**
     * get post put delete 请求，返回json对象
     * 
     * @param {string} method 请求类型
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     *  
     */
    async do(method, path, headers = {}, options = {
        resolveBodyOnly: true
    }) {
        let o = {
            method: method,
            headers: headers,
            responseType: 'json'
        }
        Object.assign(o, options)
        return this.client(path, o)
    }

    /**
     * 如果环境变量设置代理，debug代理
     * @param {Object} options 
     */
    async debugProxy(options) {
        let httpProxy = process.env.debug_proxy
        if (httpProxy) {
            options.https = {
                rejectUnauthorized: false
            }

            options.agent = {
                https: new hpagent.HttpsProxyAgent({
                    keepAlive: true,
                    keepAliveMsecs: 1000,
                    maxSockets: 256,
                    maxFreeSockets: 256,
                    scheduling: 'lifo',
                    proxy: httpProxy
                })
            }
        }
    }

    /**
     * get请求，返回json对象
     * 
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {Object} params get请求的参数对象
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     *  
     */
    async get(options) {
        if (options?.resolveBodyOnly == undefined) {
            options.resolveBodyOnly = true
        }
        if (options?.debug == undefined) {
            options.debug = false
        }

        // console.log(`====== options ====== `)
        // console.log(options)
        let o = {
            searchParams: options.p,
            headers: options.h,
            resolveBodyOnly: options.resolveBodyOnly
        }
        Object.assign(o, this.headers)  // 合并两个hd

        if (options.debug) {
            console.log(`----------------------- 开始debug -----------------------`)
            console.log(`url: ${this.host}/${options.path}`)
            console.log(Object.assign(o, this.headers))
            console.log(`----------------------- 结束debug -----------------------\n\n`)
        }
        this.debugProxy(o)
        let resp = await this.client(options.path, o)
        if (options.resolveBodyOnly) { // 只返回 resp.body 正常默认 -- 判断后返回
            if (this.isJsonStr(resp)) {
                resp = JSON.parse(resp)
                return resp
            } return resp
        } else { // 返回完整resp 直接返回返回
            return resp
        }



    }

    /**
     * post请求，body为字符串类型
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {string | Object} body 字符串或对象 , 根据 Content-Type判断放入到哪个位置
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     * @returns 
     */
    async post(options) {
        if (options?.resolveBodyOnly == undefined) {
            options.resolveBodyOnly = true
        }
        if (options?.debug == undefined) {
            options.debug = false
        }

        let o = {
            method: 'POST',
            headers: options.h,
            resolveBodyOnly: options.resolveBodyOnly
        }
        if (typeof options.body == 'string') {
            o.body = options.body
        } else {
            let headers = options.h
            if (headers['content-type']) {
                let tem = headers['content-type']
                delete headers['content-type']
                headers["Content-Type"] = tem
            }
            let ct = headers['Content-Type']
            if (ct && ct.includes('json')) {
                // @ts-ignore
                o.json = options.body
            } else {
                //默认放在form里
                o.form = options.body
            }
        }
        Object.assign(o, this.headers)   // 合并两个hd

        if (options.debug) {
            console.log(`----------------------- 开始debug -----------------------`)
            console.log(`url: ${this.host}/${options.path}`)
            console.log(Object.assign(o, this.headers))
            console.log(`----------------------- 结束debug -----------------------\n\n`)
        }

        this.debugProxy(o)
        let resp = await this.client(options.path, o)
        if (options.resolveBodyOnly) { // 只返回 resp.body 正常默认 -- 判断后返回
            if (this.isJsonStr(resp)) {
                resp = JSON.parse(resp)
                return resp
            } return resp
        } else { // 返回完整resp 直接返回
            return resp
        }
    }


    isJsonStr(str) {
        if (typeof str == "string") {
            try {
                if (typeof JSON.parse(str) == "object") {
                    return true
                }
            } catch (e) {
                return false
            }
        }
        return false
    }





    /**
     * post请求，body为json类型
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {Object} json 对象
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     * @returns 
     */
    async postJson(path, headers = {}, json = {}, options = {
        resolveBodyOnly: true
    }) {
        let o = {
            method: 'POST',
            json: json,
            headers: headers,
            responseType: 'json'
        }
        Object.assign(o, options)
        return this.client(path, o)
    }

    /**
     * post请求，body为formData类型
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {Object} form 对象
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     * @returns 
     */
    async postForm(path, headers = {}, form = {}, options = {
        resolveBodyOnly: true,
    }) {
        let o = {
            method: 'POST',
            form: form,
            headers: headers,
            // responseType: 'json'
        }
        Object.assign(o, options)
        return this.client(path, o)
    }


    /**
     * post请求，body为字符串类型
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {string | Object} body 字符串或对象 , 根据 Content-Type判断放入到哪个位置
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     * @returns 
     */
    async postX(path, headers = {}, body, options = {
        resolveBodyOnly: true
    }) {
        Object.assign(headers, this.headers)
        let o = {
            method: 'POST',
            headers: headers,
            responseType: 'json'
        }
        if (typeof body == 'string') {
            // @ts-ignore
            o.body = body
        } else {
            // @ts-ignore
            let ct = headers['Content-Type']
            if (ct && ct.includes('json')) {
                // @ts-ignore
                o.json = body
            } else {
                //默认放在form里
                // @ts-ignore
                o.form = body
            }
        }

        this.debugProxy(o)
        Object.assign(o, options)
        // console.log(o)
        return this.client(path, o)
    }

    /**
     * get请求，返回json对象
     * 
     * @param {string} path 接口路径
     * @param {Object} headers 自定义的header对象
     * @param {Object} params get请求的参数对象
     * @param {Object} options 自定义的options对象,详情参考 https://github.com/sindresorhus/got/blob/main/documentation/2-options.md#options
     *  
     */
    async getX(path, headers = {}, params = {}, options = {
        resolveBodyOnly: true
    }) {
        let o = {
            searchParams: params,
            headers: headers,
            responseType: 'json'
        }
        this.debugProxy(o)
        Object.assign(o, options)
        return this.client(path, o)
    }



    /**
     * 友好的错误处理返回
     * @param {string} name 接口的展示名字
     * @param {any} user 用户信息
     * @param {Object} resp 返回值
     * @param {(name: string, user: any, resp: Object) => void} defaultError 默认的处理错误方法
     * @param {( (user: any, resp: any)=>{ ok: boolean; f: ()=>{}; })[]} conditions 返回值的处理情况， 处理200，300，400等情况
     */
    async userRespLog(name, user, resp, defaultError, ...conditions) {
        for (let index = 0; index < conditions.length; index++) {
            const cd = conditions[index]
            let {
                ok,
                f
            } = cd(user, resp)
            if (ok) {
                await f()
                return
            }

        }
        defaultError(name, user, resp)
    }

}

var sendNotify = { exports: {} };

/*
 * @Author: lxk0301 https://gitee.com/lxk0301
 * @Date: 2020-08-19 16:12:40
 * @Last Modified by: whyour
 * @Last Modified time: 2021-5-1 15:00:54
 * sendNotify 推送通知功能
 * @param text 通知头
 * @param desp 通知体
 * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
 * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
 */

(function (module) {
    require$$0.config()
    const querystring = require$$1
    const $ = new Env()
    const timeout = 15000 //超时时间(单位毫秒)
    // =======================================gotify通知设置区域==============================================
    //gotify_url 填写gotify地址,如https://push.example.de:8080
    //gotify_token 填写gotify的消息应用token
    //gotify_priority 填写推送消息优先级,默认为0
    let GOTIFY_URL = ''
    let GOTIFY_TOKEN = ''
    let GOTIFY_PRIORITY = 0
    // =======================================go-cqhttp通知设置区域===========================================
    //gobot_url 填写请求地址http://127.0.0.1/send_private_msg
    //gobot_token 填写在go-cqhttp文件设置的访问密钥
    //gobot_qq 填写推送到个人QQ或者QQ群号
    //go-cqhttp相关API https://docs.go-cqhttp.org/api
    let GOBOT_URL = '' // 推送到个人QQ: http://127.0.0.1/send_private_msg  群：http://127.0.0.1/send_group_msg
    let GOBOT_TOKEN = '' //访问密钥
    let GOBOT_QQ = '' // 如果GOBOT_URL设置 /send_private_msg 则需要填入 user_id=个人QQ 相反如果是 /send_group_msg 则需要填入 group_id=QQ群

    // =======================================微信server酱通知设置区域===========================================
    //此处填你申请的SCKEY.
    //(环境变量名 PUSH_KEY)
    let SCKEY = ''

    // =======================================Bark App通知设置区域===========================================
    //此处填你BarkAPP的信息(IP/设备码，例如：https://api.day.app/XXXXXXXX)
    let BARK_PUSH = ''
    //BARK app推送图标,自定义推送图标(需iOS15或以上)
    let BARK_ICON =
        'https://img.gejiba.com/images/a3f551e09ac19add4c49ec16228729c5.png'
    //BARK app推送铃声,铃声列表去APP查看复制填写
    let BARK_SOUND = ''
    //BARK app推送消息的分组, 默认为"QingLong"
    let BARK_GROUP = 'QingLong'

    // =======================================telegram机器人通知设置区域===========================================
    //此处填你telegram bot 的Token，telegram机器人通知推送必填项.例如：1077xxx4424:AAFjv0FcqxxxxxxgEMGfi22B4yh15R5uw
    //(环境变量名 TG_BOT_TOKEN)
    let TG_BOT_TOKEN = ''
    //此处填你接收通知消息的telegram用户的id，telegram机器人通知推送必填项.例如：129xxx206
    //(环境变量名 TG_USER_ID)
    let TG_USER_ID = ''
    //tg推送HTTP代理设置(不懂可忽略,telegram机器人通知推送功能中非必填)
    let TG_PROXY_HOST = '' //例如:127.0.0.1(环境变量名:TG_PROXY_HOST)
    let TG_PROXY_PORT = '' //例如:1080(环境变量名:TG_PROXY_PORT)
    let TG_PROXY_AUTH = '' //tg代理配置认证参数
    //Telegram api自建的反向代理地址(不懂可忽略,telegram机器人通知推送功能中非必填),默认tg官方api(环境变量名:TG_API_HOST)
    let TG_API_HOST = 'api.telegram.org'
    // =======================================钉钉机器人通知设置区域===========================================
    //此处填你钉钉 bot 的webhook，例如：5a544165465465645d0f31dca676e7bd07415asdasd
    //(环境变量名 DD_BOT_TOKEN)
    let DD_BOT_TOKEN = ''
    //密钥，机器人安全设置页面，加签一栏下面显示的SEC开头的字符串
    let DD_BOT_SECRET = ''

    // =======================================企业微信机器人通知设置区域===========================================
    //此处填你企业微信机器人的 webhook(详见文档 https://work.weixin.qq.com/api/doc/90000/90136/91770)，例如：693a91f6-7xxx-4bc4-97a0-0ec2sifa5aaa
    //(环境变量名 QYWX_KEY)
    let QYWX_KEY = ''

    // =======================================企业微信应用消息通知设置区域===========================================
    /*
     此处填你企业微信应用消息的值(详见文档 https://work.weixin.qq.com/api/doc/90000/90135/90236)
     环境变量名 QYWX_AM依次填入 corpid,corpsecret,touser(注:多个成员ID使用|隔开),agentid,消息类型(选填,不填默认文本消息类型)
     注意用,号隔开(英文输入法的逗号)，例如：wwcff56746d9adwers,B-791548lnzXBE6_BWfxdf3kSTMJr9vFEPKAbh6WERQ,mingcheng,1000001,2COXgjH2UIfERF2zxrtUOKgQ9XklUqMdGSWLBoW_lSDAdafat
     可选推送消息类型(推荐使用图文消息（mpnews）):
     - 文本卡片消息: 0 (数字零)
     - 文本消息: 1 (数字一)
     - 图文消息（mpnews）: 素材库图片id, 可查看此教程(http://note.youdao.com/s/HMiudGkb)或者(https://note.youdao.com/ynoteshare1/index.html?id=1a0c8aff284ad28cbd011b29b3ad0191&type=note)
     */
    let QYWX_AM = ''

    // =======================================iGot聚合推送通知设置区域===========================================
    //此处填您iGot的信息(推送key，例如：https://push.hellyw.com/XXXXXXXX)
    let IGOT_PUSH_KEY = ''

    // =======================================push+设置区域=======================================
    //官方文档：http://www.pushplus.plus/
    //PUSH_PLUS_TOKEN：微信扫码登录后一对一推送或一对多推送下面的token(您的Token)，不提供PUSH_PLUS_USER则默认为一对一推送
    //PUSH_PLUS_USER： 一对多推送的“群组编码”（一对多推送下面->您的群组(如无则新建)->群组编码，如果您是创建群组人。也需点击“查看二维码”扫描绑定，否则不能接受群组消息推送）
    let PUSH_PLUS_TOKEN = ''
    let PUSH_PLUS_USER = ''

    //==========================云端环境变量的判断与接收=========================
    if (process.env.GOTIFY_URL) {
        GOTIFY_URL = process.env.GOTIFY_URL
    }
    if (process.env.GOTIFY_TOKEN) {
        GOTIFY_TOKEN = process.env.GOTIFY_TOKEN
    }
    if (process.env.GOTIFY_PRIORITY) {
        GOTIFY_PRIORITY = process.env.GOTIFY_PRIORITY
    }

    if (process.env.GOBOT_URL) {
        GOBOT_URL = process.env.GOBOT_URL
    }
    if (process.env.GOBOT_TOKEN) {
        GOBOT_TOKEN = process.env.GOBOT_TOKEN
    }
    if (process.env.GOBOT_QQ) {
        GOBOT_QQ = process.env.GOBOT_QQ
    }

    if (process.env.PUSH_KEY) {
        SCKEY = process.env.PUSH_KEY
    }

    if (process.env.QQ_SKEY) {
        QQ_SKEY = process.env.QQ_SKEY
    }

    if (process.env.QQ_MODE) {
        QQ_MODE = process.env.QQ_MODE
    }

    if (process.env.BARK_PUSH) {
        if (
            process.env.BARK_PUSH.indexOf('https') > -1 ||
            process.env.BARK_PUSH.indexOf('http') > -1
        ) {
            //兼容BARK自建用户
            BARK_PUSH = process.env.BARK_PUSH
        } else {
            BARK_PUSH = `https://api.day.app/${process.env.BARK_PUSH}`
        }
        if (process.env.BARK_ICON) {
            BARK_ICON = process.env.BARK_ICON
        }
        if (process.env.BARK_SOUND) {
            BARK_SOUND = process.env.BARK_SOUND
        }
        if (process.env.BARK_GROUP) {
            BARK_GROUP = process.env.BARK_GROUP
        }
    } else {
        if (
            BARK_PUSH &&
            BARK_PUSH.indexOf('https') === -1 &&
            BARK_PUSH.indexOf('http') === -1
        ) {
            //兼容BARK本地用户只填写设备码的情况
            BARK_PUSH = `https://api.day.app/${BARK_PUSH}`
        }
    }
    if (process.env.TG_BOT_TOKEN) {
        TG_BOT_TOKEN = process.env.TG_BOT_TOKEN
    }
    if (process.env.TG_USER_ID) {
        TG_USER_ID = process.env.TG_USER_ID
    }
    if (process.env.TG_PROXY_AUTH) TG_PROXY_AUTH = process.env.TG_PROXY_AUTH
    if (process.env.TG_PROXY_HOST) TG_PROXY_HOST = process.env.TG_PROXY_HOST
    if (process.env.TG_PROXY_PORT) TG_PROXY_PORT = process.env.TG_PROXY_PORT
    if (process.env.TG_API_HOST) TG_API_HOST = process.env.TG_API_HOST

    if (process.env.DD_BOT_TOKEN) {
        DD_BOT_TOKEN = process.env.DD_BOT_TOKEN
        if (process.env.DD_BOT_SECRET) {
            DD_BOT_SECRET = process.env.DD_BOT_SECRET
        }
    }

    if (process.env.QYWX_KEY) {
        QYWX_KEY = process.env.QYWX_KEY
    }

    if (process.env.QYWX_AM) {
        QYWX_AM = process.env.QYWX_AM
    }

    if (process.env.IGOT_PUSH_KEY) {
        IGOT_PUSH_KEY = process.env.IGOT_PUSH_KEY
    }

    if (process.env.PUSH_PLUS_TOKEN) {
        PUSH_PLUS_TOKEN = process.env.PUSH_PLUS_TOKEN
    }
    if (process.env.PUSH_PLUS_USER) {
        PUSH_PLUS_USER = process.env.PUSH_PLUS_USER
    }
    //==========================云端环境变量的判断与接收=========================

    /**
     * sendNotify 推送通知功能
     * @param text 通知头
     * @param desp 通知体
     * @param params 某些推送通知方式点击弹窗可跳转, 例：{ url: 'https://abc.com' }
     * @param author 作者仓库等信息  例：`本通知 By：https://github.com/whyour/qinglong`
     * @returns {Promise<unknown>}
     */
    async function sendNotify(
        text,
        desp,
        params = {},
        author = '\n\n本通知 By：https://github.com/whyour/qinglong',
    ) {
        //提供6种通知
        desp += author //增加作者信息，防止被贩卖等
        await Promise.all([
            serverNotify(text, desp), //微信server酱
            pushPlusNotify(text, desp), //pushplus(推送加)
        ])
        //由于上述两种微信通知需点击进去才能查看到详情，故text(标题内容)携带了账号序号以及昵称信息，方便不点击也可知道是哪个京东哪个活动
        text = text.match(/.*?(?=\s?-)/g) ? text.match(/.*?(?=\s?-)/g)[0] : text
        await Promise.all([
            BarkNotify(text, desp, params), //iOS Bark APP
            tgBotNotify(text, desp), //telegram 机器人
            ddBotNotify(text, desp), //钉钉机器人
            qywxBotNotify(text, desp), //企业微信机器人
            qywxamNotify(text, desp), //企业微信应用消息推送
            iGotNotify(text, desp, params), //iGot
            gobotNotify(text, desp), //go-cqhttp
            gotifyNotify(text, desp), //gotify
        ])
    }

    function gotifyNotify(text, desp) {
        return new Promise((resolve) => {
            if (GOTIFY_URL && GOTIFY_TOKEN) {
                const options = {
                    url: `${GOTIFY_URL}/message?token=${GOTIFY_TOKEN}`,
                    body: `title=${encodeURIComponent(text)}&message=${encodeURIComponent(
                        desp,
                    )}&priority=${GOTIFY_PRIORITY}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('gotify发送通知调用API失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.id) {
                                console.log('gotify发送通知消息成功🎉\n')
                            } else {
                                console.log(`${data.message}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve()
                    }
                })
            } else {
                resolve()
            }
        })
    }

    function gobotNotify(text, desp, time = 2100) {
        return new Promise((resolve) => {
            if (GOBOT_URL) {
                const options = {
                    url: `${GOBOT_URL}?access_token=${GOBOT_TOKEN}&${GOBOT_QQ}`,
                    json: { message: `${text}\n${desp}` },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout,
                }
                setTimeout(() => {
                    $.post(options, (err, resp, data) => {
                        try {
                            if (err) {
                                console.log('发送go-cqhttp通知调用API失败！！\n')
                                console.log(err)
                            } else {
                                data = JSON.parse(data)
                                if (data.retcode === 0) {
                                    console.log('go-cqhttp发送通知消息成功🎉\n')
                                } else if (data.retcode === 100) {
                                    console.log(`go-cqhttp发送通知消息异常: ${data.errmsg}\n`)
                                } else {
                                    console.log(
                                        `go-cqhttp发送通知消息异常\n${JSON.stringify(data)}`,
                                    )
                                }
                            }
                        } catch (e) {
                            $.logErr(e, resp)
                        } finally {
                            resolve(data)
                        }
                    })
                }, time)
            } else {
                resolve()
            }
        })
    }

    function serverNotify(text, desp, time = 2100) {
        return new Promise((resolve) => {
            if (SCKEY) {
                //微信server酱推送通知一个\n不会换行，需要两个\n才能换行，故做此替换
                desp = desp.replace(/[\n\r]/g, '\n\n')
                const options = {
                    url: SCKEY.includes('SCT')
                        ? `https://sctapi.ftqq.com/${SCKEY}.send`
                        : `https://sc.ftqq.com/${SCKEY}.send`,
                    body: `text=${text}&desp=${desp}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout,
                }
                setTimeout(() => {
                    $.post(options, (err, resp, data) => {
                        try {
                            if (err) {
                                console.log('发送通知调用API失败！！\n')
                                console.log(err)
                            } else {
                                data = JSON.parse(data)
                                //server酱和Server酱·Turbo版的返回json格式不太一样
                                if (data.errno === 0 || data.data.errno === 0) {
                                    console.log('server酱发送通知消息成功🎉\n')
                                } else if (data.errno === 1024) {
                                    // 一分钟内发送相同的内容会触发
                                    console.log(`server酱发送通知消息异常: ${data.errmsg}\n`)
                                } else {
                                    console.log(
                                        `server酱发送通知消息异常\n${JSON.stringify(data)}`,
                                    )
                                }
                            }
                        } catch (e) {
                            $.logErr(e, resp)
                        } finally {
                            resolve(data)
                        }
                    })
                }, time)
            } else {
                resolve()
            }
        })
    }

    function BarkNotify(text, desp, params = {}) {
        return new Promise((resolve) => {
            if (BARK_PUSH) {
                const options = {
                    url: `${BARK_PUSH}/${encodeURIComponent(text)}/${encodeURIComponent(
                        desp,
                    )}?icon=${BARK_ICON}?sound=${BARK_SOUND}&group=${BARK_GROUP}&${querystring.stringify(
                        params,
                    )}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout,
                }
                $.get(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('Bark APP发送通知调用API失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.code === 200) {
                                console.log('Bark APP发送通知消息成功🎉\n')
                            } else {
                                console.log(`${data.message}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve()
                    }
                })
            } else {
                resolve()
            }
        })
    }

    function tgBotNotify(text, desp) {
        return new Promise((resolve) => {
            if (TG_BOT_TOKEN && TG_USER_ID) {
                const options = {
                    url: `https://${TG_API_HOST}/bot${TG_BOT_TOKEN}/sendMessage`,
                    body: `chat_id=${TG_USER_ID}&text=${text}\n\n${desp}&disable_web_page_preview=true`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout,
                }
                if (TG_PROXY_HOST && TG_PROXY_PORT) {
                    const tunnel = require$$2
                    const agent = {
                        https: tunnel.httpsOverHttp({
                            proxy: {
                                host: TG_PROXY_HOST,
                                port: TG_PROXY_PORT * 1,
                                proxyAuth: TG_PROXY_AUTH,
                            },
                        }),
                    }
                    Object.assign(options, { agent })
                }
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('telegram发送通知消息失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.ok) {
                                console.log('Telegram发送通知消息成功🎉。\n')
                            } else if (data.error_code === 400) {
                                console.log(
                                    '请主动给bot发送一条消息并检查接收用户ID是否正确。\n',
                                )
                            } else if (data.error_code === 401) {
                                console.log('Telegram bot token 填写错误。\n')
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else {
                resolve()
            }
        })
    }
    function ddBotNotify(text, desp) {
        return new Promise((resolve) => {
            const options = {
                url: `https://oapi.dingtalk.com/robot/send?access_token=${DD_BOT_TOKEN}`,
                json: {
                    msgtype: 'text',
                    text: {
                        content: ` ${text}\n\n${desp}`,
                    },
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout,
            }
            if (DD_BOT_TOKEN && DD_BOT_SECRET) {
                const crypto = require$$3
                const dateNow = Date.now()
                const hmac = crypto.createHmac('sha256', DD_BOT_SECRET)
                hmac.update(`${dateNow}\n${DD_BOT_SECRET}`)
                const result = encodeURIComponent(hmac.digest('base64'))
                options.url = `${options.url}&timestamp=${dateNow}&sign=${result}`
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('钉钉发送通知消息失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.errcode === 0) {
                                console.log('钉钉发送通知消息成功🎉。\n')
                            } else {
                                console.log(`${data.errmsg}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else if (DD_BOT_TOKEN) {
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('钉钉发送通知消息失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.errcode === 0) {
                                console.log('钉钉发送通知消息完成。\n')
                            } else {
                                console.log(`${data.errmsg}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else {
                resolve()
            }
        })
    }

    function qywxBotNotify(text, desp) {
        return new Promise((resolve) => {
            const options = {
                url: `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${QYWX_KEY}`,
                json: {
                    msgtype: 'text',
                    text: {
                        content: ` ${text}\n\n${desp}`,
                    },
                },
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout,
            }
            if (QYWX_KEY) {
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('企业微信发送通知消息失败！！\n')
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.errcode === 0) {
                                console.log('企业微信发送通知消息成功🎉。\n')
                            } else {
                                console.log(`${data.errmsg}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else {
                resolve()
            }
        })
    }

    function ChangeUserId(desp) {
        const QYWX_AM_AY = QYWX_AM.split(',')
        if (QYWX_AM_AY[2]) {
            const userIdTmp = QYWX_AM_AY[2].split('|')
            let userId = ''
            for (let i = 0; i < userIdTmp.length; i++) {
                const count2 = '签到号 ' + (i + 1)
                if (desp.match(count2)) {
                    userId = userIdTmp[i]
                }
            }
            if (!userId) userId = QYWX_AM_AY[2]
            return userId
        } else {
            return '@all'
        }
    }

    function qywxamNotify(text, desp) {
        return new Promise((resolve) => {
            if (QYWX_AM) {
                const QYWX_AM_AY = QYWX_AM.split(',')
                const options_accesstoken = {
                    url: `https://qyapi.weixin.qq.com/cgi-bin/gettoken`,
                    json: {
                        corpid: `${QYWX_AM_AY[0]}`,
                        corpsecret: `${QYWX_AM_AY[1]}`,
                    },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout,
                }
                $.post(options_accesstoken, (err, resp, data) => {
                    html = desp.replace(/\n/g, '<br/>')
                    var json = JSON.parse(data)
                    accesstoken = json.access_token
                    let options

                    switch (QYWX_AM_AY[4]) {
                        case '0':
                            options = {
                                msgtype: 'textcard',
                                textcard: {
                                    title: `${text}`,
                                    description: `${desp}`,
                                    url: 'https://github.com/whyour/qinglong',
                                    btntxt: '更多',
                                },
                            }
                            break

                        case '1':
                            options = {
                                msgtype: 'text',
                                text: {
                                    content: `${text}\n\n${desp}`,
                                },
                            }
                            break

                        default:
                            options = {
                                msgtype: 'mpnews',
                                mpnews: {
                                    articles: [
                                        {
                                            title: `${text}`,
                                            thumb_media_id: `${QYWX_AM_AY[4]}`,
                                            author: `智能助手`,
                                            content_source_url: ``,
                                            content: `${html}`,
                                            digest: `${desp}`,
                                        },
                                    ],
                                },
                            }
                    }
                    if (!QYWX_AM_AY[4]) {
                        //如不提供第四个参数,则默认进行文本消息类型推送
                        options = {
                            msgtype: 'text',
                            text: {
                                content: `${text}\n\n${desp}`,
                            },
                        }
                    }
                    options = {
                        url: `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accesstoken}`,
                        json: {
                            touser: `${ChangeUserId(desp)}`,
                            agentid: `${QYWX_AM_AY[3]}`,
                            safe: '0',
                            ...options,
                        },
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                    $.post(options, (err, resp, data) => {
                        try {
                            if (err) {
                                console.log(
                                    '成员ID:' +
                                    ChangeUserId(desp) +
                                    '企业微信应用消息发送通知消息失败！！\n',
                                )
                                console.log(err)
                            } else {
                                data = JSON.parse(data)
                                if (data.errcode === 0) {
                                    console.log(
                                        '成员ID:' +
                                        ChangeUserId(desp) +
                                        '企业微信应用消息发送通知消息成功🎉。\n',
                                    )
                                } else {
                                    console.log(`${data.errmsg}\n`)
                                }
                            }
                        } catch (e) {
                            $.logErr(e, resp)
                        } finally {
                            resolve(data)
                        }
                    })
                })
            } else {
                resolve()
            }
        })
    }

    function iGotNotify(text, desp, params = {}) {
        return new Promise((resolve) => {
            if (IGOT_PUSH_KEY) {
                // 校验传入的IGOT_PUSH_KEY是否有效
                const IGOT_PUSH_KEY_REGX = new RegExp('^[a-zA-Z0-9]{24}$')
                if (!IGOT_PUSH_KEY_REGX.test(IGOT_PUSH_KEY)) {
                    console.log('您所提供的IGOT_PUSH_KEY无效\n')
                    resolve()
                    return
                }
                const options = {
                    url: `https://push.hellyw.com/${IGOT_PUSH_KEY.toLowerCase()}`,
                    body: `title=${text}&content=${desp}&${querystring.stringify(params)}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    timeout,
                }
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log('发送通知调用API失败！！\n')
                            console.log(err)
                        } else {
                            if (typeof data === 'string') data = JSON.parse(data)
                            if (data.ret === 0) {
                                console.log('iGot发送通知消息成功🎉\n')
                            } else {
                                console.log(`iGot发送通知消息失败：${data.errMsg}\n`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else {
                resolve()
            }
        })
    }

    function pushPlusNotify(text, desp) {
        return new Promise((resolve) => {
            if (PUSH_PLUS_TOKEN) {
                desp = desp.replace(/[\n\r]/g, '<br>') // 默认为html, 不支持plaintext
                const body = {
                    token: `${PUSH_PLUS_TOKEN}`,
                    title: `${text}`,
                    content: `${desp}`,
                    topic: `${PUSH_PLUS_USER}`,
                }
                const options = {
                    url: `https://www.pushplus.plus/send`,
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': ' application/json',
                    },
                    timeout,
                }
                $.post(options, (err, resp, data) => {
                    try {
                        if (err) {
                            console.log(
                                `push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'
                                }通知消息失败！！\n`,
                            )
                            console.log(err)
                        } else {
                            data = JSON.parse(data)
                            if (data.code === 200) {
                                console.log(
                                    `push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'
                                    }通知消息完成。\n`,
                                )
                            } else {
                                console.log(
                                    `push+发送${PUSH_PLUS_USER ? '一对多' : '一对一'
                                    }通知消息失败：${data.msg}\n`,
                                )
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve(data)
                    }
                })
            } else {
                resolve()
            }
        })
    }

    module.exports = {
        sendNotify,
        BARK_PUSH,
    }

    // prettier-ignore
    function Env(t, s) { return new class { constructor(t, s) { this.name = t, this.data = null, this.dataFile = "box.dat", this.logs = [], this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, s), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } getScript(t) { return new Promise(s => { $.get({ url: t }, (t, e, i) => s(i)) }) } runScript(t, s) { return new Promise(e => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); o = o ? 1 * o : 20, o = s && s.timeout ? s.timeout : o; const [h, a] = i.split("@"), r = { url: `http://${a}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: o }, headers: { "X-Key": h, Accept: "*/*" } }; $.post(r, (t, s, i) => e(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require$$4, this.path = this.path ? this.path : require$$5; const t = this.path.resolve(this.dataFile), s = this.path.resolve(process.cwd(), this.dataFile), e = this.fs.existsSync(t), i = !e && this.fs.existsSync(s); if (!e && !i) return {}; { const i = e ? t : s; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require$$4, this.path = this.path ? this.path : require$$5; const t = this.path.resolve(this.dataFile), s = this.path.resolve(process.cwd(), this.dataFile), e = this.fs.existsSync(t), i = !e && this.fs.existsSync(s), o = JSON.stringify(this.data); e ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(s, o) : this.fs.writeFileSync(t, o) } } lodash_get(t, s, e) { const i = s.replace(/\[(\d+)\]/g, ".$1").split("."); let o = t; for (const t of i) if (o = Object(o)[t], void 0 === o) return e; return o } lodash_set(t, s, e) { return Object(t) !== t ? t : (Array.isArray(s) || (s = s.toString().match(/[^.[\]]+/g) || []), s.slice(0, -1).reduce((t, e, i) => Object(t[e]) === t[e] ? t[e] : t[e] = Math.abs(s[i + 1]) >> 0 == +s[i + 1] ? [] : {}, t)[s[s.length - 1]] = e, t) } getdata(t) { let s = this.getval(t); if (/^@/.test(t)) { const [, e, i] = /^@(.*?)\.(.*?)$/.exec(t), o = e ? this.getval(e) : ""; if (o) try { const t = JSON.parse(o); s = t ? this.lodash_get(t, i, "") : s } catch (t) { s = "" } } return s } setdata(t, s) { let e = !1; if (/^@/.test(s)) { const [, i, o] = /^@(.*?)\.(.*?)$/.exec(s), h = this.getval(i), a = i ? "null" === h ? null : h || "{}" : "{}"; try { const s = JSON.parse(a); this.lodash_set(s, o, t), e = this.setval(JSON.stringify(s), i) } catch (s) { const h = {}; this.lodash_set(h, o, t), e = this.setval(JSON.stringify(h), i) } } else e = $.setval(t, s); return e } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, s) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, s) : this.isQuanX() ? $prefs.setValueForKey(t, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = t, this.writedata(), !0) : this.data && this.data[s] || null } initGotEnv(t) { this.got = this.got ? this.got : got, this.cktough = this.cktough ? this.cktough : require$$7, this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, s = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? $httpClient.get(t, (t, e, i) => { !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i) }) : this.isQuanX() ? $task.fetch(t).then(t => { const { statusCode: e, statusCode: i, headers: o, body: h } = t; s(null, { status: e, statusCode: i, headers: o, body: h }, h) }, t => s(t)) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, s) => { try { const e = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(e, null), s.cookieJar = this.ckjar } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: e, statusCode: i, headers: o, body: h } = t; s(null, { status: e, statusCode: i, headers: o, body: h }, h) }, t => s(t))) } post(t, s = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) $httpClient.post(t, (t, e, i) => { !t && e && (e.body = i, e.statusCode = e.status), s(t, e, i) }); else if (this.isQuanX()) t.method = "POST", $task.fetch(t).then(t => { const { statusCode: e, statusCode: i, headers: o, body: h } = t; s(null, { status: e, statusCode: i, headers: o, body: h }, h) }, t => s(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: e, ...i } = t; this.got.post(e, i).then(t => { const { statusCode: e, statusCode: i, headers: o, body: h } = t; s(null, { status: e, statusCode: i, headers: o, body: h }, h) }, t => s(t)) } } time(t) { let s = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in s) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? s[e] : ("00" + s[e]).substr(("" + s[e]).length))); return t } msg(s = t, e = "", i = "", o) { const h = t => !t || !this.isLoon() && this.isSurge() ? t : "string" == typeof t ? this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : void 0 : "object" == typeof t && (t["open-url"] || t["media-url"]) ? this.isLoon() ? t["open-url"] : this.isQuanX() ? t : void 0 : void 0; $.isMute || (this.isSurge() || this.isLoon() ? $notification.post(s, e, i, h(o)) : this.isQuanX() && $notify(s, e, i, h(o))), this.logs.push("", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="), this.logs.push(s), e && this.logs.push(e), i && this.logs.push(i) } log(...t) { t.length > 0 ? this.logs = [...this.logs, ...t] : console.log(this.logs.join(this.logSeparator)) } logErr(t, s) { const e = !this.isSurge() && !this.isQuanX() && !this.isLoon(); e ? $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : $.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(s => setTimeout(s, t)) } done(t = {}) { const s = (new Date).getTime(), e = (s - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${e} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, s) }
}(sendNotify))

sendNotify.exports

// console.log(a)
let sNotify = sendNotify.exports
// console.log(sNotify)

/**
 * 用户信息的基本情况
 * 
 * msg 需要发送的消息
 * 
 * isSuccess 为false 时， 用户信息不可用 ，跳过
 */
class User {
    /**
     * @param {number} [index]
     * 
     */
    constructor(index) {

        if (index || index == 0) {
            /**
             * 第几个用户
             * @type {number}
             */
            this.index = index + 1
            /**
             * 发消息需要
             * @type {string}
             */
            this.msg = `账号${this.index} `
        }
        /**
         * 判断是否返回正确的用户信息
         * @type {boolean}
         */
        this.isSuccess = true
    }

    /**
     * 用户失败，忽略这个用户
     */
    ignore() {
        this.isSuccess = false
    }

    /**
     * 打印
     * @param {string} msg  带账号顺序的打印方法
     */
    log(msg) {
        console.log(`账号${this.index} `, msg)
    }



    /**
     * 可以发送的打印
     * @param {string} msg
     */
    sendLog(msg) {
        this.log(msg)
        this.msg += msg
    }
}

class Env {
    /**
     * @param {any | string} name 项目名字
     * @param {string} ckName 要获取的ck的名字
     * @param {{
     * author:string,
     * notify: number
     * }} info 自定义信息 notify默认为1，整体发送 notify为2的时候，单独每条发送
     */
    constructor(name, ckName, info = {
        author: '',
        notify: 1
    }) {
        this.info = info
        this.ckName = ckName
        this.name = name
        this.startTime = new Date().getTime()
        console.log(`${this.name} 开始运行: \n`)
    }

    async done() {
        const e = new Date().getTime(),
            s = (e - this.startTime) / 1e3
        console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
    }


    /**
     * 
     * @returns {string|*}
     */
    name() {
        return new User()
    }

    /**
 
     * @param {(index: number, ck: string) => Promise<User>} fnUserInfo 返回的自定义UserInfo
     * @param {(() => {name:string, task: (user:User)=>Promise<any>})[]} tasks 多个任务，可变数组形式
     */
    async start(fnUserInfo = async (index, ck) => {
        return new User()
    }, ...tasks) {
        // 入口
        !(async () => {
            let {
                author,
                notify
            } = this.info
            if (!notify) {
                notify = 1
            }
            if (!author) {
                author = ""
            }
            // console.log(info)
            console.log("----------------- 用户信息 -----------------\n")
            let users = await getUsers(this.ckName, fnUserInfo)
            // console.log(users)

            for (let index = 0; index < tasks.length; index++) {
                const {
                    name,
                    task
                } = tasks[index]()
                console.log(`\n----------------- ${name} -----------------\n`)
                /**
                 * @type {Promise<User>[]}
                 */
                let list = []
                users.forEach(async user => {
                    if (user["isSuccess"]) {
                        list.push(task(user))
                    }
                })
                await Promise.all(list)

            }
            let msg = ""
            let send = async ( /** @type {string} */ str) => {
                if (author.length > 0) {
                    await sNotify.sendNotify(this.name, str, {}, author)
                } else {
                    await sNotify.sendNotify(this.name, str)
                }
            }
            users.forEach(async user => {
                msg += user.msg + "\n"
                if (notify == 2) {
                    await send(user.msg)
                }
            })
            if (notify == 1) {
                await send(msg)
            }

        })()
            .catch((e) => console.log(e))
            .finally(() => this.done())
    }
}

/**
 * @param {string} ckName
 * @param {(index: number, ck: string) => Promise<User>} fnUserInfo
 */
async function getUsers(ckName, fnUserInfo) {
    let userList = []
    // @ts-ignore
    let userCookie = process.env[ckName]
    let envSplicer = ["@", "\n", "&"]
    let userCount = 0
    if (userCookie) {
        let e = envSplicer[0]
        for (let o of envSplicer)
            if (userCookie.indexOf(o) > -1) {
                e = o
                break
            }
        let arr = userCookie.split(e)
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index]
            element && userList.push(await fnUserInfo(index, element))
        }
        userCount = userList.length
    } else {
        console.log("未找到CK")
    }
    console.log(`共找到${userCount}个账号`)
    return userList
}

require$$0__namespace.config()

/*
河马免费小说-快应用  app    cron 10 16,18 * * *  hmmfxs.js

12.13       修改自己的模板         

------------------------  青龙--配置文件-贴心复制区域  ---------------------- 
# 河马免费小说-快应用
export hmmfxs=" t # smdid @ t # smdid "  


多账号用 换行 或 @ 分割 
tg频道: https://t.me/yml2213_tg  
*/

let $ = new Env('河马免费小说-快应用', 'hmmfxs', {
    author: '\n\n  特别感谢小小大佬新模板   本脚本 by_yml',
    notify: 2
})

let http = new Http('https://dzmfxs.kkyd.cn', {

})


class UserInfo extends User {
    constructor(index, ck) {
        super(index)
        this.ck = ck.split('#')
        this.t = this.ck[0]
        this.smdid = this.ck[1]
    }
    getHeaders() {
        return {
            't': this.t,
            'pname': 'com.dianzhong.hmxs',
            'Content-Type': 'application/json;charset=UTF-8',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 hap/1.10/xiaomi com.miui.hybrid/1.10.0.0 com.dianzhong.hmxs/5.5.2.720 ({"packageName":"com.miui.home","type":"shortcut","extra":{"original":{"packageName":"mark.via","type":"url","extra":{}},"scene":"api"}})'
        }
    }


    /**
     * 主入口  
     */
    async main() {
        await this.readDuration()
        let qd = [
            1001, 1042, 1043, 1044, 1062, 1068, 1069, 1070, 1071,
            1072, 1075, 1085, 1087, 1092, 1094, 1104, 1105, 1141,
            1142, 1148, 1149, 1150, 1151, 1152, 1153, 1154, 1156,
            1157, 1158, 1159, 1160, 1161, 1162, 1167, 1169, 1170,
            1171, 1173, 1174, 1176, 1177, 1179, 1180, 1187, 1193,
            1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202,
            1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1218,
            1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227,
            1228, 1229, 1236, 1240, 1244, 1245, 1247, 1248, 1249,
            1250, 1251, 1252, 1257, 1258, 1260, 1266, 1269, 1272,
            1278, 47
        ]

        for (let id of qd) {
            await this.dotask(id)
        }
    }


    /**
     * 查看收益的实现
     */
    async balance() {
        await this.points()
    }

    //==========================================================================


    async readDuration() {
        let name = '上传阅读时间'
        let options = {
            path: 'glory/fastapp/2146?ver=5502720&appVer=5.5.2.720',
            h: this.getHeaders(),
            body: {
                "taskId": 1251,
                "action": 36,
                "readDuration": math.randomInt(500, 700),
                "bookId": "11010122921",
                "chapterId": "521307189"
            },
            debug: 0
        }
        let resp = await http.post(options)
        // console.log(resp)

        if (resp.retCode == 0 && resp.data.totalReadDuration) {
            this.log(`上传阅读时间成功 当前阅读 ${resp.data.totalReadDuration}分钟`)
        } else if (resp.retCode == 0 && resp.data.totalReadDuration == 0) {
            this.log(`${name}: 失败,稍后再试!`)
        } else console.log(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(resp)

    }


    async dotask(id) {
        let options = {
            path: 'glory/fastapp/2141?ver=5502720&appVer=5.5.2.720',
            h: this.getHeaders(),
            body: {
                'taskId': id,
            },
            debug: 0
        }
        let resp = await http.post(options)
        // console.log(resp)

        if (resp.data.code == 0 && resp.data.message) {
            this.log(`${JSON.stringify(resp.data.message)}`)
        }

    }



    async points() {
        let name = '查询'
        let options = {
            path: 'glory/fastapp/2404?ver=5502720&appVer=5.5.2.720',
            h: this.getHeaders(),
            body: {
                'signText': 1,
            },
            debug: 0
        }
        let resp = await http.post(options)

        if (resp.retCode == 0) {
            this.coin = resp.data.glods
        } else console.log(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(resp)

        options = resp = {}
        options = {
            path: 'glory/fastapp/2106?ver=5502720&appVer=5.5.2.720',
            h: this.getHeaders(),
            body: {},
            debug: 0
        }

        resp = await http.post(options)
        if (resp.retCode == 0) {
            console.log(`账号: ${resp.data.user.nickName}, 金币:${this.coin}`)
        } else console.log(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(resp)


        if (this.coin >= 30000) {
            await this.cash()
        }
    }


    // https://dzmfxs.kkyd.cn/glory/fastapp/2856?ver=5502720&appVer=5.5.2.720
    async cash() {
        let name = '提现'
        let options = {
            path: 'glory/fastapp/2856?ver=5502720&appVer=5.5.2.720',
            h: this.getHeaders(),
            body: {
                'amountId': 13,
                'smdid': this.smdid,
            },
            debug: 0
        }
        let resp = await http.post(options)
        // console.log(resp)

        if (resp.retCode == 0 && resp.data.retCode == 1) {
            console.log(`提现3元:  ${resp.data.retMsg}`)
        } else console.log(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(resp)

    }





}






// ===================================== 默认 =====================================



//下面的代码可以不用动，也可以自己修改
//=========================

$.start(
    async (index, ck) => {
        // console.log(index, ck)
        let user = new UserInfo(index, ck)
        return user
    },
    doStart,
    balance,
)

function doStart() {
    return {
        name: '开始任务了',
        task: async ( /** @type {UserInfo} */ user) => {
            await user.main()
        }
    }
}

function balance() {
    return {
        name: '查看收益',
        task: async ( /** @type {UserInfo} */ user) => {
            await user.balance()
        }
    }
}
