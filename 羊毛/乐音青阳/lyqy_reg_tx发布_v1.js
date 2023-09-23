/*
乐音清扬答题_注册机   他信            lyqy_dt_reg_tx.js

-------------------  青龙-配置文件-复制区域  -------------------
# 乐音清扬答题_注册机 
export lyqy_dt_reg_tx=" user # pwd @  user # pwd"  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('乐音清扬答题_注册机')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['lyqy_dt_reg_tx']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================

const openid = `ommza4qBw75_Yzgl8Ekj_HalbQyE`  // openid  自己抓小程序的  删了  第一次进去抓   https://s.yqbtv.cn/index.php/Api/Wechat/redpackMiniProgramLogin  接口


let api = 'api.my531.com'
let hostName = `http://${api}`
let sid = '25841'  // 乐清市融媒体中心



//====================================================================================================





class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.user = this.ck[0]
        this.pwd = this.ck[1]

        this.client_id = '58'
        this.tenant_id = '41'

        this.openid = openid


        this.ua = `2.0.0;00000000-${$.randomInt(4)}-8460-0000-0000${$.randomInt(8)};Xiaomi M2102J2SC;Android;12;xiaomi`


        this.hd1 = {
            'User-Agent': this.ua = `2.0.0;00000000-${$.randomInt(4)}-8460-0000-0000${$.randomInt(8)};Xiaomi M2102J2SC;Android;12;xiaomi`
            ,
            'Cookie': ''
        }
        this.hd = {
            'User-Agent': this.ua,
            'Cookie': ''
        }


    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        // await this.get_img()

        $.log(`\n-------------- 开始 --------------`)
        await this.tx_login() // 登录
        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.start_reg()

        }


    }


    async start_reg() {
        this.signature_key = await this.get_signature_key()
        this.phone = await this.getPhone(sid)   // 获取手机号
        await this.checkPhone(this.phone) //检查手机号--是否注册
    }

    async checkPhone(phone) { // 检查手机号--是否注册
        let options = {
            fn: '检查手机号',
            method: 'get',
            url: `https://passport.tmuyun.com/web/account/check_phone_number?client_id=${this.client_id}&phone_number=${phone}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0 && resp.data.exist == true) {
            // this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${options.fn} ${phone} 已经被别人玩过了, 拉黑继续下一个`)
            await this.addBlacklist(sid, phone)
            await this.start_reg()

        } else if (resp.code == 0 && resp.data.exist == false) {
            $.log(`${this.idx}: ${options.fn} ${phone} 可以玩, 开始识别`)
            await this.get_img(phone)  // 获取本地验证码
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async get_img(phone) { // 获取本地验证码
        let options = {
            fn: '获取本地验证码',
            method: 'get',
            url: `https://passport.tmuyun.com/web/security/captcha_image`,
            headers: this.hd,
            responseType: 'buffer',

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let img_base64 = resp.toString('base64')
        // console.log(img_base64)
        let bd_code = await this.recognition_coed(img_base64)  // 识别本地验证码
        if (bd_code) {
            await this.sendSmscode(bd_code, phone)
        }

    }

    async sendSmscode(bd_code, phone) { // 发送短信验证码  captcha=6455&client_id=this.client_id&phone_number=16236610591
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        let aa = `post%%/web/security/send_security_code?client_id=${this.client_id}&phone_number=${phone}%%76f6e4de-14e8-4efe-93c0-8b312${$.randomString(7)}%%`
        // console.log(aa)
        let sign = crypto.HmacSHA256(aa, this.signature_key).toString(crypto.enc.Hex)
        // console.log('发送短信验证码', phone, bd_code)
        let options = {
            fn: '发送短信验证码',
            method: 'post',
            url: `https://passport.tmuyun.com/web/security/send_security_code`,
            headers: {
                'Cache-Control': 'no-cache',
                'User-Agent': 'ANDROID;12;58;2.0.0;1.0;null;M2102J2SC',
                'X-REQUEST-ID': reqid,
                'X-SIGNATURE': sign,
                'Host': 'passport.tmuyun.com',
                'Cookie': this.sig_ck,
            },
            form: {
                'captcha': bd_code,
                'client_id': this.client_id,
                'phone_number': phone
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            console.log(`${options.fn}: 成功!`)
            await this.getSmscode(phone)
        } else if (resp.code == 200003) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.message}`)
            await this.start_reg()
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

    }

    async getSmscode(phone) { // 获取短信验证码

        this.smsCode = await this.getMessage(sid, phone)   // 获取验证码
        if (this.smsCode == 1) {
            for (let i = 0; i < 5; i++) {
                if (this.smsCode == 1) {
                    await $.wait(10)
                    await this.getMessage(sid, phone)
                } else if (this.smsCode.length == 6) {
                    // console.log(`================`)
                    // console.log(this.smsCode)
                    // await this.cancelRecv(sid, phone) //释放手机号
                    break
                }
            }
            if (this.smsCode == 1) {
                console.log(`拉黑`)
                await this.addBlacklist(sid, phone)
                await this.start_reg()
            } else {
                await this.security_code_auth(this.smsCode, phone) //释放手机号

            }
        }
    }


    async security_code_auth(smsCode, phone) { // 获取登录code    client_id=58&phone_number=16582963567&security_code=292419
        let options = {
            fn: '获取登录code',
            method: 'post',
            url: `https://passport.tmuyun.com/web/oauth/security_code_auth`,
            headers: this.hd,
            form: {
                'client_id': this.client_id,
                'phone_number': phone,
                'security_code': smsCode
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.login_code = resp.data.authorization_code.code
            $.log(`${this.idx}: 登录code: ${this.login_code}`)
            await this.login_elqj(this.login_code)

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

    }


    async login_elqj(code) { // 登录
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&41
        let data = `/api/zbtxz/login&&64ff19ec6744791eaaf085c2&&${reqid}&&${ts13}&&FR*r!isE5W&&${this.tenant_id}`
        let sign = crypto.SHA256(data).toString()

        let options = {
            fn: '登录',
            method: 'post',
            url: `https://vapp.tmuyun.com/api/zbtxz/login`,
            headers: {
                'X-SESSION-ID': '64ff19ec6744791eaaf085c2',
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': this.tenant_id,
                'User-Agent': this.ua,
                'Cache-Control': 'no-cache',
                'Host': 'vapp.tmuyun.com'
            },
            form: {
                'code': code,
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.SESSION = resp.data.session.id
            $.log(`${this.idx}: 登录: ${resp.message}, 你的session:${resp.message}`)

            const sessionText = `${this.SESSION}`
            fs.appendFile('lyqy_session.txt', sessionText + '\n', (err) => {
                if (err) {
                    console.log('保存session失败: ', err)
                } else {
                    console.log(`${this.idx}: 登录成功, session已追加到session.txt文件`)
                    // 其他操作...
                }
            })


            await this.info()
            this.hd.Cookie = ``
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        }

    }


    async get_signature_key() { // 获取加密秘钥
        let options = {
            fn: '获取加密秘钥',
            method: 'get',
            url: `https://passport.tmuyun.com/web/init?client_id=${this.client_id}`,
            headers: this.hd,
        }
        // console.log(options)
        let resp = await $.request(options)
        let resp_1 = await $.request(options, 'hd')

        try {
            // console.log(resp_1)
            this.sig_ck = resp_1['set-cookie'][1]
            //  console.log(`=============`)
            // console.log(this.sig_ck)
            this.hd.Cookie = this.sig_ck
            //  this.SESSION_id = resp_1['set-cookie'][1].split(';')[0].split('=')[1]
            // console.log(this.SESSION_id)
            // console.log(resp)
            if (resp.code == 0) {
                return resp.data.client.signature_key
            } else return false
        } catch (error) {
            console.log(error)
        }

    }

    async info() { // 信息
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&41
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&${this.tenant_id}`
        let sign = crypto.SHA256(data).toString()

        let options = {
            fn: '信息',
            method: 'get',
            url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
            headers: {
                'X-SESSION-ID': this.SESSION,
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': this.tenant_id,
                'User-Agent': this.ua,
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {

            this.account_id = resp.data.rst.id
            this.phone = resp.data.rst.mobile
            this.nick_name = resp.data.rst.nick_name


            $.log(`${this.idx}: ${resp.data.rst.nick_name}, 积分:${resp.data.rst.total_integral} -- sesioon:  ${this.SESSION}    , account_id:${this.account_id}`)


            this.token = this.getToken(this.account_id, $.ts(10))
            // console.log(this.token)



            await this.lat()  // 抽奖



        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }

    getToken(accountId, time) {
        let type = 1
        // let _0x4055b8 = Date['parse'](new Date()) / (0x389ee ^ 0x38a06)
        let _0x4055b8 = time
        // var _0x11ecb0 = 0x46a4f ^ 0x46a4f
        var _0x11ecb0 = type
        let _0x12c744 = accountId //accountId
        let t =
            'yy*/,REwsna'
            ['\u0073\u0070\u006c\u0069\u0074'](
                ''['split']('')['reverse']()['join'](''.split('').reverse().join(''))
            )
            ['reverse']()
            ['join']('') +
            _0x12c744 +
            _0x11ecb0 +
            _0x4055b8

        function md5(data) {
            return crypto.MD5(data).toString()
        }

        let a = `Bearer ${time}&${type},${md5(t)}`
        return a
    }

    getToken1(accountId, time) {
        let type = 0
        // let _0x4055b8 = Date['parse'](new Date()) / (0x389ee ^ 0x38a06)
        let _0x4055b8 = time
        // var _0x11ecb0 = 0x46a4f ^ 0x46a4f
        var _0x11ecb0 = type
        let _0x12c744 = accountId //accountId
        let t =
            'yy*/,REwsna'
            ['\u0073\u0070\u006c\u0069\u0074'](
                ''['split']('')['reverse']()['join'](''.split('').reverse().join(''))
            )
            ['reverse']()
            ['join']('') +
            _0x12c744 +
            _0x11ecb0 +
            _0x4055b8

        function md5(data) {
            return crypto.MD5(data).toString()
        }

        let a = `Bearer ${time}&${type},${md5(t)}`
        return a
    }



    // https://favzevkg.act.tmuact.com/activity/api.php
    async lat() { // 抽奖
        const options = {
            fn: '抽奖',
            method: "post",
            url: `https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0`,
            headers: {
                'Host': 's.yqbtv.cn',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                // 'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/116.0.0.0 Mobile Safari/537.36;xsb_yueqing;xsb_yueqing;1.1.8;native_app',
                'User-Agent': this.ua,
                'Token': this.token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://s.yqbtv.cn',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
            },
            form: {
                'id': 1,
                'accountId': this.account_id,
                'mobile': this.phone,
                'nickname': encodeURI(this.nick_name)
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        console.log(JSON.stringify(resp))
        if (resp.code == 40000) {

            this.token_ = resp.token
            this.num = resp.num

            $.log(`${this.idx}: ${options.fn} -- 恭喜狗子, 获得${resp.msg}`)

            await $.wait($.randomInt(3, 5))

            await this.cash()

        } else if (resp.code == 40004) {

            this.token = this.getToken1(this.account_id, $.ts(10))
            // console.log(this.token)
            await this.lat1()  // 抽奖

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async lat1() { // 抽奖
        const options = {
            fn: '抽奖',
            method: "post",
            url: `https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0`,
            headers: {
                'Host': 's.yqbtv.cn',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'User-Agent': this.ua,
                'Token': this.token,
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Origin': 'https://s.yqbtv.cn',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                'Referer': 'https://s.yqbtv.cn/index.php/Mobile/Active/appAnswer/tag/eyyqJBptZvCI6MX0nvis0',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
            },
            form: {
                'id': 1,
                'accountId': this.account_id,
                'mobile': this.phone,
                'nickname': encodeURI(this.nick_name)
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        console.log(JSON.stringify(resp))
        if (resp.code == 40000) {

            this.token_ = resp.token
            this.num = resp.num

            $.log(`${this.idx}: ${options.fn} -- 恭喜狗子, 获得${resp.msg}`)

            await $.wait($.randomInt(3, 5))

            await this.cash()

        } else if (resp.code == 40004) {
            console.log(resp)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }



    async cash() { // 提现

        let o = this.openid
        let n = $.ts(10)
        let token_sign = crypto.MD5(`redpAkk.*${o}${n}`).toString()

        let options = {
            fn: '提现',
            method: 'post',
            url: `https://s.yqbtv.cn/index.php/Api/Wechat/takenRedpack`,
            headers: {
                'Host': 's.yqbtv.cn',
                'content-type': 'application/json',
                'Authorization': `Bearer ${token_sign}`,
                'User-Agent': this.ua,
                'Referer': 'https://servicewechat.com/wx14898a7fcced1a4d/6/page-frame.html'
            },
            json: {
                "token": this.token_,
                "num": this.num,
                "tag": "wxanswer",
                "openid": this.openid,
                "timestamp": n
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            $.log(`${this.idx}: 真的狗: 提现 ${this.num} 元, ${resp.msg}`)
            await $.wait($.randomInt(1, 2))

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }




    async recognition_coed(img_base64) { // 识别本地验证码
        let options = {
            fn: '识别验证码',
            method: 'post',
            url: `http://81.70.196.85:9898/ocr/b64/json`,
            headers: {
                "content-type": "application/json; charset=utf-8",
            },
            body: img_base64
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.status == 200 && resp.msg == '') {
            let bd_code = resp.result
            if (bd_code.length == 4) {
                $.log(`识别成功:${bd_code}`)
                return bd_code
            } else {
                $.log(`识别失败1: ${resp.msg}`)
                await this.start_reg()
            }
        } else if (resp.msg != '') {
            $.log(`识别失败2: ${resp.msg}`)
            await this.start_reg()
        } else {
            $.log(`未知错误!`)
        }

    }

    // http://服务器地址/sms/?api=login&user=用户名&pass=密码  GET/POST 都行
    async tx_login() { // 登录
        let options = {
            fn: '登录',
            method: 'get',
            url: `${hostName}/Login/?username=${this.user}&password=${this.pwd}&type=json`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            // this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${options.fn} ${resp.message}, 余额:${resp.data.money}, token :${resp.data.token}`)
            this.token = resp.data.token

            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }



    // http://api.my531.com/Login/?username=用户名&password=密码  GET/POST 都行
    async getPhone(sid) { // 获取手机号
        let options = {
            fn: '获取手机号',
            method: 'get',
            url: `${hostName}/GetPhone/?token=${this.token}&id=${sid}&type=json`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            this.phone = resp.data
            $.log(`${options.fn}: 当前手机号:${resp.data}`)
            return this.phone
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://服务器地址/sms/?api=getMessage&token=用户令牌&sid=项目ID&phone=手机号
    async getMessage(sid, phone) { // 获取验证码  
        let options = {
            fn: '获取验证码',
            method: 'get',
            url: `${hostName}/GetMsg/?token=${this.token}&id=${sid}&phone=${phone}&type=json&dev=Marchzl`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 1) {
            $.log(`${options.fn}: 当前手机号:${phone}, 短信为:${resp.data}`)

            this.smsCode = resp.data.split('验证码：')[1].split('，')[0]


            return this.smsCode
        } else if (resp.code == -1) {
            $.log(`${options.fn}: 当前手机号:${phone}, 验证吗还没来, 在等一下下.......`)
            return 1
        }
    }

    // http://服务器地址/sms/?api=cancelRecv&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号  GET/POST 都行
    async cancelRecv(sid, phone) { // 释放手机号
        let options = {
            fn: '释放手机号',
            method: 'get',
            url: `${hostName}/Cancel/?token=${this.token}&id=${sid}&phone=${phone}&type=json`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 200) {
            this.phone = resp.phone
            $.log(`${options.fn}: 释放手机号: ${phone}--${resp.msg}`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    // http://服务器地址/sms/?api=addBlacklist&token=用户令牌&sid=项目ID&country_code=国家代码&phone=手机号
    async addBlacklist(sid, phone) { // 拉黑手机号
        let options = {
            fn: '拉黑手机号',
            method: 'get',
            url: `${hostName}/Addblack/?token=${this.token}&id=${sid}&phone=${phone}`,
            headers: {},
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.phone = resp.phone
            $.log(`${options.fn}: 拉黑手机号: ${phone}--${resp.msg}`)
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
            if (this.notifyStr.length) return
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