/*
快手果园              kuaishou_dt.js

-------------------  青龙-配置文件-复制区域  -------------------
# 快手果园 
export kuaishou_dt=" cookie#备注  @ cookie#备注  "  
export kuaishou_dt_code="你的卡密"    需要购买卡密请前往: https://yml-git.tk   

多账号用 换行 或 @ 分割  
抓 https://encourage.kuaishou.com  的 的 cookie


需自己安装 bytenode 依赖  需自己安装 bytenode 依赖  需自己安装 bytenode 依赖

tg频道: https://t.me/yml2213_tg  
*/


const $ = Env('快手果园')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['kuaishou_dt']                //支持多变量
const CryptoJS = require('crypto-js')
require('dotenv').config()
let kuaishou_dt_code = process.env.kuaishou_dt_code

//====================================================================================================
let code_tips = `1. 当前版本:最终版_v2,  优化输出\n2. 凡是倒卖卡密者,一律封卡密`

//====================================================================================================

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck_ = ck.split('#')
        this.ck = this.ck_[0]
        this.u_name = this.ck_[1]
        this.ua = `Mozilla/5.0 (Linux; Android ${$.randomInt(9, 13)}; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.612 (rel) Mobile Safari/537.36 Yoda/3.1.4-rc1 ksNebula/11.4.40.5686 OS_PRO_BIT/64 MAX_PHY_MEM/11598 AZPREFIX/zw ICFO/0 StatusHT/32 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn CT/0 ISLM/-1`
        this.ts13 = $.ts(13)
        this.port = 6698

        this.hd = {
            'Host': 'encourage.kuaishou.com',
            'User-Agent': this.ua,
            'X-Requested-With': 'com.kuaishou.nebula',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Dest': 'empty',
            'Cookie': this.ck,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

    }

    async userTask() {



        console.log(`\n=============== ${this.idx} ===============`)
        $.log(`\n-------------- 开始验证卡密 --------------`)
        await this.get_codes() // 验证

        if (this.ckFlog) {
            $.log(`\n-------------- 开始答题 --------------`)
            await this.start_dt() // 开始答题


        }

    }


    async tips() { // 提示内容
        let options = {
            fn: '提示内容',
            method: 'get',
            url: `https://raw.githubusercontent.com/yml2213/javascript/master/yml/tipe.txt`,
            headers: {}
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp) {
            $.log(`\n\n\n${resp}${code_tips}------------------------------------------------------------------------------`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async get_codes() {
        if (kuaishou_dt_code.includes('@')) {
            console.log(`发现两张卡密`)
            let code_ = kuaishou_dt_code.split('@')
            let codes = [code_[0], code_[1]]
            await this.stacks_num(codes)

        } else {
            // console.log(`一张卡密`)
            await this.auth()
        }
    }

    async stacks_num(codes) {
        console.log(`开始叠加次数`)
        let old_code = codes[1]
        let new_code = codes[0]
        let options = {
            fn: '叠加次数',
            method: 'post',
            url: `http://81.70.196.85:${this.port}/ksjsb/voucher/merge`,
            headers: {
                'Content-Type': 'application/json',
                "voucherCode": new_code
            },
            json: {
                "old": old_code, //要转移的卡密
                "new": new_code //新的卡密添加次数
            }
        }
        console.log(options)
        let resp = await $.request(options)
        console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${options.fn}, 叠加成功, 新的卡密: ${new_code}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

        kuaishou_dt_code = new_code
        await this.auth()

    }

    async auth() { // 验证 
        let options = {
            fn: '卡密验证',
            method: 'get',
            url: `http://81.70.196.85:${this.port}/ksjsb/auth`,
            headers: {
                'voucherCode': kuaishou_dt_code
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            if (resp.message != '您是永久卡密！') {
                $.log(`${this.idx}: ${options.fn}, 卡密次数:${resp.message}`)
            } else {
                $.log(`${this.idx}: ${options.fn}, 卡密次数:${resp.message}, 欢迎尊贵的永久卡密用户!`)
            }
            this.ckFlog = true
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${options.fn} 失败:${resp.message}, 请检查卡密是否正确, 购买卡密请前往: 'http://yml-git.tk'`, { notify: true }), this.ckFlog = false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }

    async start_dt() { // 开始答题 



        let options = {
            fn: '开始答题',
            method: 'get',
            url: `https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/kickoff?reKickoff=false&sigCatVer=1`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.result == 1 && resp.data.roundId) {

            this.roundId = resp.data.roundId
            this.questionDetail = resp.data.questionDetail
            this.question = resp.data.questionDetail.question
            this.opt = resp.data.questionDetail.options
            this.index = resp.data.questionDetail.index
            this.total = resp.data.questionDetail.total

            await this.next(this.index, this.question, this.opt, this.roundId)

            this.ckFlog = true
        } else if (resp.result == 103703) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.error_msg}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }


    async upload(question, opt, roundId, index, answer, nswer_index, type = 'database') { // 上传答案 
        let sig3 = await this.getSig3(this.ck, roundId, index, nswer_index)
        let options = {
            fn: '上传答案',
            method: 'post',
            url: `https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=${sig3}&sigCatVer=1`,
            headers: {
                'Host': 'encourage.kuaishou.com',
                'User-Agent': this.ua,
                'Accept': '*/*',
                'Origin': 'https://encourage.kuaishou.com',
                'X-Requested-With': 'com.kuaishou.nebula',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cookie': this.ck,
                'content-type': 'application/json'
            },
            json: {
                "roundId": roundId,
                "index": index,
                "answer": nswer_index
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)

        if (type == 'database') {
            if (resp.result == 1 && resp.data.answerDetail.correct) {
                if (index == 9) {
                    $.log(`${this.idx} -- ${this.u_name}: 恭喜你个狗子, 10 道题全对了, 当前金币:${resp.data.amount.current}==${resp.data.amount.current / 10000} 元`, { notify: true })
                } else {
                    this.roundId = resp.data.nextQuestionDetail.roundId
                    this.questionDetail = resp.data.nextQuestionDetail.questionDetail
                    this.question = resp.data.nextQuestionDetail.questionDetail.question
                    this.opt = resp.data.nextQuestionDetail.questionDetail.options
                    this.index = resp.data.nextQuestionDetail.questionDetail.index
                    // this.total = resp.data.nextQuestionDetail.questionDetail.total

                    $.log(`${this.idx} -- ${this.u_name}: ${options.fn} 第 ${index + 1} 题 -- 回答正确, 当前金币:${resp.data.amount.current}`)
                    await this.next(this.index, this.question, this.opt, this.roundId)
                }

            } else if (resp.result == 1 && resp.data.answerDetail.correct == false) {
                $.log(`${this.idx} -- ${this.u_name}:  第 ${index + 1} 题 -- 回答错误, 请检查数据库答案`)
                // await this.up_qs(question, opt, roundId, resp.data.answerDetail.correctAnswer)
                console.log(JSON.stringify(resp))
            } else console.log(`${options.fn}: 失败, ${JSON.stringify(options)} ${JSON.stringify(resp)}`)

        }


    }



    async getSig3(ck, roundId, index, answer) {
        let sig3str = await this.getSig3str(ck, roundId, index, answer)
        // console.log(sig3str)

        const options = {
            method: 'post',
            url: `http://81.70.196.85:${this.port}/ksjsb/websig3`,
            headers: {
                'Content-Type': 'application/json',
                "voucherCode": kuaishou_dt_code
            },
            json: { str: sig3str }
        }

        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            // console.log(resp.data)
            return resp.data

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)




    }

    async getSig3str(ck, roundId, index, answer) {

        var __defProp = Object.defineProperty,
            __defProps = Object.defineProperties,
            __getOwnPropDescs = Object.getOwnPropertyDescriptors,
            __getOwnPropSymbols = Object.getOwnPropertySymbols,
            __hasOwnProp = Object.prototype.hasOwnProperty,
            __propIsEnum = Object.prototype.propertyIsEnumerable,
            __defNormalProp = (t, e, r) =>
                e in t
                    ? __defProp(t, e, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: r
                    })
                    : (t[e] = r),
            __spreadValues = (t, e) => {
                for (var r in e || (e = {}))
                    __hasOwnProp.call(e, r) && __defNormalProp(t, r, e[r])
                if (__getOwnPropSymbols)
                    for (var r of __getOwnPropSymbols(e))
                        __propIsEnum.call(e, r) && __defNormalProp(t, r, e[r])
                return t
            },
            __spreadProps = (t, e) => __defProps(t, __getOwnPropDescs(e)),
            __publicField = (t, e, r) => (
                __defNormalProp(t, 'symbol' != typeof e ? e + '' : e, r), r
            ),
            __async = (t, e, r) =>
                new Promise((n, o) => {
                    var i = t => {
                        try {
                            s(r.next(t))
                        } catch (e) {
                            o(e)
                        }
                    },
                        a = t => {
                            try {
                                s(r.throw(t))
                            } catch (e) {
                                o(e)
                            }
                        },
                        s = t => (t.done ? n(t.value) : Promise.resolve(t.value).then(i, a))
                    s((r = r.apply(t, e)).next())
                }),
            _a,
            _b,
            _c,
            _d,
            _e,
            _f,
            _g,
            _h,
            _i,
            _j,
            _k,
            _l

        const
            sigCatVer = 1,
            ignoreKey = '__NS',
            cookieWhiteList = [
                'kpn',
                'kpf',
                'userId',
                'did',
                'c',
                'appver',
                'language',
                'mod',
                'did_tag',
                'egid',
                'oDid',
                'androidApiLevel',
                'newOc',
                'browseType',
                'socName',
                'ftt',
                'abi',
                'userRecoBit',
                'device_abi',
                'grant_browse_type',
                'iuid',
                'rdid'
            ]

        function getCookie(cookie) {
            var t
            return (null != (t = cookie.split(';')) ? t : [])
                .map(t => {
                    const e = t.split('=')
                    return [e[0].trim(), e.slice(1).join('=').trim()]
                })
                .filter(t => cookieWhiteList.includes(t[0]) && !!t[1])
                .reduce((t, e) => ((t[e[0]] = e[1]), t), {})
        }


        function isGetMethod(t) {
            return ['get', 'options', 'head'].includes(t.toLowerCase())
        }
        function makeString(t) {
            return Object.keys(t)
                .reduce(
                    (e, r) => (r.startsWith(ignoreKey) || e.push(`${r}=${t[r]}`), e),
                    []
                )
                .sort((t, e) => (t === e ? 0 : t < e ? -1 : 1))
                .join('')
        }



        function getRequestString(cookie, t = {}, e = null, r = 'get', n = 'json') {
            const o = getCookie(cookie)
            let i = __spreadValues(__spreadValues({ sigCatVer: sigCatVer }, o), t)
            if ('json' === n) {
                if (isGetMethod(r))
                    return (i = __spreadValues(__spreadValues({}, i), e)), makeString(i)
                const t = e ? ('string' == typeof e ? e : JSON.stringify(e)) : ''
                return `${makeString(i)}${t}`
            }
            return (
                'form' === n && (i = __spreadValues(__spreadValues({}, i), e)),
                makeString(i)
            )
        }

        class SearchParams {
            constructor(t) {
                __publicField(this, '_entries', new Map())
                const e = (t.startsWith('?') ? t.substr(1) : t).split('&')
                for (const r of e) {
                    const [t, e] = r.split('=')
                    t &&
                        this._entries.set(
                            this.serializeParam(t),
                            this.serializeParam(null != e ? e : '')
                        )
                }
            }
            serializeParam(t) {
                return encodeURIComponent(t).replace(/%20/g, '+')
            }
            delete(t) {
                this._entries.delete(this.serializeParam(t))
            }
            append(t, e) {
                this._entries.set(
                    this.serializeParam(t),
                    this.serializeParam(null != e ? e : '')
                )
            }
            toString() {
                const t = [...this._entries.entries()]
                if (!t.length) return ''
                const e = t.reduce((t, e) => (t.push(`${e[0]}=${e[1]}`), t), [])
                return `${e.length ? '?' : ''}${e.join('&')}`
            }
            entries() {
                return [...this._entries.entries()].reduce((t, e) => {
                    const [r, n] = e
                    return (t[r] = n), t
                }, {})
            }
        }

        class BaseUrl {
            constructor(t) {
                __publicField(this, 'protocol', ''),
                    __publicField(this, 'hostname', ''),
                    __publicField(this, 'port', ''),
                    __publicField(this, 'pathname', ''),
                    __publicField(this, 'hash', ''),
                    __publicField(this, 'searchParams', new SearchParams('')),
                    this.parseUrl(t)
            }
            get search() {
                var t
                return (null == (t = this.searchParams) ? void 0 : t.toString()) || ''
            }
            get path() {
                return this.pathname + this.search
            }
            get host() {
                return this.port ? `${this.hostname}:${this.port}` : this.hostname
            }
            get href() {
                const t = this.host ? `//${this.host}` : '',
                    e = `${this.pathname && !this.pathname.startsWith('/') ? '/' : ''}${this.pathname
                        }`
                return this.protocol + t + e + this.search + this.hash
            }
            parseUrl(t) {
                let e = t.trim()
                const r = /^([a-z0-9.+-]+:)\/\//i.exec(e)
                r && ((this.protocol = r[1].toLowerCase()), (e = e.substr(r[0].length)))
                const n = e.indexOf('#')
                    ; -1 !== n && ((this.hash = e.substr(n)), (e = e.slice(0, n)))
                const o = e.indexOf('?')
                    ; -1 !== o &&
                        ((this.searchParams = new SearchParams(e.substr(o))), (e = e.slice(0, o)))
                const i = e.split(/[/?#]/g),
                    a = i.length ? i[0] : '',
                    s = e.replace(a, '')
                this.pathname = s
                const c = /:([0-9]*)$/.exec(a)
                c && (this.port = c[1])
                const u = c ? a.length - c[0].length : a.length
                this.hostname = a.substr(0, u)
            }
        }

        function getUrlSearchParams(t = window.location.href) {
            return new BaseUrl(t).searchParams.entries()
        }

        function getRequestInfo(t, e) {
            var r, n, o, i, a
            let s = '/',
                c = 'GET',
                u = null
            return void 0 === e
                ? ('string' == typeof t
                    ? (s = t)
                    : t instanceof Request &&
                    ((s = t.url),
                        (c = (null != (r = t.method) ? r : 'GET').toUpperCase()),
                        isGetMethod(c) || (u = t.body)),
                    { url: s, method: c, query: getUrlSearchParams(s), data: u })
                : ('string' == typeof t
                    ? ((s = t), (c = (null != (n = e.method) ? n : 'GET').toUpperCase()))
                    : t instanceof Request &&
                    ((s = null != (o = t.url) ? o : '/'),
                        (c = (
                            null != (a = null != (i = e.method) ? i : t.method) ? a : 'GET'
                        ).toUpperCase())),
                    isGetMethod(c) || (u = e.body),
                    { url: s, method: c, query: getUrlSearchParams(s), data: u })
        }




        function getSig3Str(url, options) {
            let info = getRequestInfo(url, options)
            let requestType = 'json'
            return getRequestString(options.cookie, info.query, info.data, info.method, requestType)
        }

        const options = {
            method: 'post',
            body: {
                "roundId": roundId,
                "index": index,
                "answer": answer
            },
            cookie: ck

        }
        let url = "URL: https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=8898dfef1b2c22c85fd45cd7d0d128dfb56897ae32da41ca33d4c7c7c1c1c2c3fcdc&sigCatVer=1"

        let result = getSig3Str(url, options)
        // console.log(`=====result ${result}====  `)
        return result





    }


    async next(index, question, opt, roundId) { // 答题逻辑

        $.log(`\n\n\n${this.idx} -- ${this.u_name}:  第 ${index + 1} 题`)
        // $.log(`\n\n\n${this.idx}:  第 ${index + 1} 题, 问题:${question} -- 选项:[${this.opt}]`)

        $.log(`${this.idx}: 开始查询数据库...`)
        let database_data = await this.checkDatabase(question, opt)
        if (database_data) {
            // console.log(database_data)

            if (opt.indexOf(database_data.answer) > -1) {
                let answer_index = opt.indexOf(database_data.answer)
                let answer = database_data.answer

                await $.wait($.randomInt(3, 5))
                await this.upload(question, opt, roundId, index, answer, answer_index, 'database')
            }

        } else {
            $.log(`${this.idx}: 开始查询数据库(2)...`)
            let database_data_2 = await this.checkDatabase_2(question, opt)
            if (database_data_2 && opt.indexOf(database_data_2) > -1) {
                let answer_index = opt.indexOf(database_data_2)
                let answer = database_data_2
                await $.wait($.randomInt(3, 5))
                await this.upload(question, opt, roundId, index, answer, answer_index, 'gpt')
            }
        }
    }



    async checkDatabase(question, opt) {
        const options = {
            method: 'get',
            url: `http://81.70.196.85:${this.port}/ksjsb/question?str=${question}`,
            headers: {
                'Content-Type': 'application/json',
                "voucherCode": kuaishou_dt_code
            }

        }

        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${this.question}   ❀❀❀数据库支援来了❀❀❀ `)
            $.log(`${this.idx}: ${resp.message}`)
            return resp.data
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${this.question} 数据库没有这个题`)
            $.log(`${this.idx}: ${resp.message}`)
            return false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async checkDatabase_2(question, opt) {

        let data = question.replace('？', '?')
        const options = {
            method: 'post',
            url: `http://81.70.196.85:${this.port}/ksjsb/v2/question`,
            headers: {
                'Content-Type': 'application/json',
                "voucherCode": kuaishou_dt_code
            },
            json: {
                "str": data
            }
        }

        let resp = await $.request(options)
        // console.log(resp);
        if (resp.code == 200) {
            $.log(`${this.idx}: ${question}   ❀❀❀数据库(2)支援来了❀❀❀ `)
            return resp.data
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${this.question} 数据库(2)没有这个题`)
            $.log(`${this.idx}: ${resp.message}`)
            return false
        } else console.log(`数据库: 失败,  ${JSON.stringify(resp)}`)

    }


    async up_qs(question, opt, roundId, answer) {
        const options = {
            method: 'post',
            url: `http://81.70.196.85:${this.port}/ksjsb`,
            headers: {
                'Content-Type': 'application/json'
            },
            json: {
                "question": question, //题目
                "options": opt, //选项
                "answer": answer, //答案
                "roundId": roundId //roundId
            }
        }

        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200 && resp.message == "成功！") {
            // $.log(`${this.idx}: ${question} -- [${opt}]; 答案:${answer}, 上传数据库成功...`)
        } else if (resp.code == 202 && resp.message == "存在重复题目") {
            // $.log(`${this.idx}: ${resp.message}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }




}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()

        await $.userList[0].tips()

        // console.log(tip_)

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
                let DEFAULT_TIMEOUT = 8 * 1000      // 默认超时时间
                let DEFAULT_RETRY = 2     // 默认重试次数--2
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
                // console.log(resp)
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(resp)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'all') {
                    return Promise.resolve([headers, body])
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
            if (!this.notifyStr.length) return
            let notify = require('./sendNotify')
            this.log('\n============== 本次推送--by_yml ==============')
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
                        const res = await got('https://v1.hitokoto.cn')
                        // console.log(res.body)
                        let data = JSON.parse(res.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.res.body)
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