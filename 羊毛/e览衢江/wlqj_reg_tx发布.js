/*
e览衢江注册机   他信            elqj_reg_tx.js

-------------------  青龙-配置文件-复制区域  -------------------
# e览衢江注册机 
export elqj_reg_tx=" user # pwd @  user # pwd"  

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('e览衢江注册机')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['elqj_reg_tx']                //支持多变量
const crypto = require('crypto-js')

//====================================================================================================

let device_no = `00000000-6641-8460-0000-000011${$.randomString(6)}`
let api = 'api.my531.com'

let hostName = `http://${api}`


let sid = '50698'  // 衢江传媒集团


let pay_name = 'xxxx'
let pay_email = 'xxxxxx@qiott.com'
//====================================================================================================





class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.user = this.ck[0]
        this.pwd = this.ck[1]

        this.client_id = '10035'

        this.hd1 = {
            'User-Agent': 'ANDROID;12;10035;2.0.0;1.0;null;M2102J2SC',
            'Cookie': ''
        }
        this.hd = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36;xsb_qujiang;xsb_qujiang;2.0.0;native_app',
            'Cookie': ''
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        // await this.get_img()

        $.log(`\n-------------- 开始 --------------`)
        await this.login() // 登录
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
                'User-Agent': 'ANDROID;12;10035;2.0.0;1.0;null;M2102J2SC',
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


    async security_code_auth(smsCode, phone) { // 获取登录code    client_id=10035&phone_number=16582963567&security_code=292419
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
        // /api/zbtxz/login&&64af614f7dee052db44967f9&&49e8b432-5e3c-4fb5-b89e-dd46f0ef7f1f&&1689389911948&&FR*r!isE5W&&85

        //   check_token=9ca17ae2e6fbcda170e2e6eec3af2aa2fef6c3ca6eb1bd9bbbeb46a2ae86a2d45b969a9ab6e14fb5a78396e57a93f0ba8ae25ee2f4ee95a132e296848ed970f3afb78eef68868ba2afdb3b91e8a9add437fffeb3&code=RdIpX16NVlUU8rkJmp4TwIg8&token=&type=-1&union_id=
        let ts13 = $.ts(13)
        let reqid = `3bc70f69-a965-41ca-9d56-${$.randomString(12)}`
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&85
        let data = `/api/zbtxz/login&&63c9fb37d3181f4cf95ff630&&${reqid}&&${ts13}&&FR*r!isE5W&&85`
        let sign = crypto.SHA256(data).toString()

        let options = {
            fn: '登录',
            method: 'post',
            url: `https://vapp.tmuyun.com/api/zbtxz/login`,
            headers: {
                'X-SESSION-ID': '63c9fb37d3181f4cf95ff630',
                'X-REQUEST-ID': reqid,
                'X-TIMESTAMP': ts13,
                'X-SIGNATURE': sign,
                'X-TENANT-ID': '85',
                'User-Agent': '2.0.0;00000000-6641-8460-0000-000011944588;Xiaomi M2102J2SC;Android;12;xiaomi',
                'Cache-Control': 'no-cache',
                'Host': 'vapp.tmuyun.com'
            },
            form: {
                'check_token': '9ca17ae2e6fbcda170e2e6eec3af2aa2fef6c3ca6eb1bd9bbbeb46a2ae86a2d45b969a9ab6e14fb5a78396e57a93f0ba8ae25ee2f4ee95a132e296848ed970f3afb78eef68868ba2afdb3b91e8a9add437fffeb3',
                'code': code,
                'token': '',
                'type': -1,
                'union_id': '',
            }

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.SESSION = resp.data.session.id
            $.log(`${this.idx}: 登录: ${resp.message}, 你的session:${resp.message}`)
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
        // /api/user_mumber/account_detail&&64af616ed63fea5c0a0e9eea&&3bc70f69-a965-41ca-9d56-21cc61acab28&&1689230115318&&FR*r!isE5W&&85
        let data = `/api/user_mumber/account_detail&&${this.SESSION}&&${reqid}&&${ts13}&&FR*r!isE5W&&85`
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
                'X-TENANT-ID': '85',
                'User-Agent': '2.0.0;00000000-6641-8460-0000-000011944588;Xiaomi M2102J2SC;Android;12;xiaomi',
            },

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {

            this.account_id = resp.data.rst.id
            $.log(`${this.idx}: ${resp.data.rst.nick_name}, 积分:${resp.data.rst.total_integral} -- sesioon:  ${this.SESSION}    , account_id:${this.account_id}`)

            await this.get_acw_tc()  // 获取acw_tc



        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }


    async get_acw_tc() {

        let options = {
            fn: '获取acw_tc',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/answer/index.html`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options, 'hd')
        // console.log(resp)

        this.acw_tc = resp['set-cookie'][0].split(';path')[0]
        await this.get_phpsession()  // 获取phpsession


    }


    async get_phpsession() { // 获取phpsession

        let options = {
            fn: '获取phpsession',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=public&subm=front`,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.196 Mobile Safari/537.36;xsb_qujiang;xsb_qujiang;2.0.0;native_app',
                'Cookie': this.acw_tc
            }

        }
        // console.log(options)
        let resp = await $.request(options, 'hd')
        // console.log(resp)

        this.phpsession = resp['set-cookie'][0].split(';path')[0]
        this.hd.Cookie = this.phpsession

        // console.log(this.phpsession)
        await this.check_addr()  // 检测地址

    }

    async check_addr() { // 检测地址
        // `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=quzhouregister&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}`,
        let options = {
            fn: '检测地址',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=init&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}&need_register=2`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 检测地址成功， 开始答题`)
            await this.start(1)  // 开始答题

        } else if (resp.code == 5110) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 开始初始化地址`)
            await this.init2()  // 初始化地址

        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        }
    }
    async init2() { // 初始化地址

        let addArr = ["峡川镇", "上方镇", "灰坪乡", "杜泽镇", "太真乡", "双桥乡"]

        let a = $.randomInt(0, addArr.length - 1)

        let options = {
            fn: '初始化地址',
            method: 'post',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=quzhouregister&q=YunSLfvEi&account_id=${this.account_id}&sessionid=${this.SESSION}`,
            headers: this.hd,
            form: {
                'street': addArr[a]
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {

            $.log(`${this.idx}:${options.fn},选择--${addArr[a]}  ${resp.msg}`)
            // await this.start(1)  // 开始答题
            await this.end(1)  // 开始答题  直接结束
        } else {
            console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
            // await this.start(1)  // 开始答题

        }
    }


    async start(num) { // 开始答题
        let options = {
            fn: '开始答题',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&answer_start=${num}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            this.id = resp.data.list[0].id
            this.win_id = resp.data.list[0].win_id.toUpperCase()
            $.log(`${this.idx}: ${resp.msg}, 题目:${this.id}--${resp.data.list[0].title}, 获取答案:${this.win_id}`)

            // await $.wait($.randomInt(5, 8))

            await this.doSubm(num, this.id, this.win_id)

            // console.log(resp.data)

            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false


    }


    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerdata&answer_id=2218
    async doSubm(num, id, win_id) { // 提交

        let last = ''
        if (num < 10) {
            last = 0
        } else if (num == 10) {
            last = 1
        }

        let options = {
            fn: '提交',
            method: 'post',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerdata&answer_id=2218`,
            headers: this.hd,
            form: {
                'id': id,
                'option': `["${win_id}"]`,
                'yongshi': $.randomInt(5, 10),
                'last': last
            }
        }

        // console.log(options)
        let resp = await $.request(options)
        // console.log(`================= ${num}===================`)
        // console.log(resp)
        // console.log(`====================================`)
        if (resp.code == 3001) {
            if (num < 10) {
                $.log(`${this.idx}: ${options.fn} ${resp.msg}, 继续, 第${num + 1}题`)
                await this.doAnswer(num + 1)
            } else if (num == 10) {
                // console.log(JSON.stringify(resp))
                if (resp.data.fin == 1) {
                    $.log(`${this.idx}: ${options.fn} ${resp.msg}, 完成答题, 准备提交`)
                    // console.log(resp.data.id)
                    this.endId = resp.data.id
                    await this.end(this.endId)
                } else {
                    $.log(`${this.idx}: ${options.fn}, 无ID,无法提交`)

                }
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)


    }

    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=10
    // https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=2
    async doAnswer(num) { // 答题
        let options = {
            fn: '答题',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerinfo&answer_id=2218&page=${num}`,
            headers: this.hd

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            this.id = resp.data.list[0].id
            this.win_id = resp.data.list[0].win_id.toUpperCase()
            $.log(`${this.idx}: ${resp.msg}, 题目:${this.id}--${resp.data.list[0].title}, 获取答案:${this.win_id}`)

            // 答题延迟
            await $.wait($.randomInt(1, 4))
            // await $.wait(1)

            await this.doSubm(num, this.id, this.win_id)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async end(endId) { // 结束
        let options = {
            fn: '结束',
            method: 'get',
            url: `https://foyguk1n.act.tmuact.com/activity/api.php?m=front&subm=answer&action=answerresult&answer_id=2218&id=${endId}`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {

            if (resp.data.result == 1) {
                $.log(`${this.idx}: ${resp.msg}, 答题完成， 去抽奖了！`)
                await this.Lottery()
            } else {
                $.log(`${this.idx}: ${resp.msg}, 未知错误！`)
            }

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    // https://favzevkg.act.tmuact.com/activity/api.php
    async Lottery() { // 抽奖
        let ts13 = $.ts(13)
        // 00000000-6641-8460-0000-000011944588&&1689223895018&&MJ<?TH4&9w^
        let data = `${device_no}&&${ts13}&&MJ<?TH4&9w^`
        let sign = crypto.SHA256(data).toString()
        // console.log(sign)

        let options = {
            fn: '抽奖',
            method: 'post',
            url: `https://favzevkg.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money',
                'action': 'open',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'token': '',
                'q': 'YunSLfvb9',
                'system': 'Android',
                'signature': sign,
                'appName': 'e览衢江',
                'system_version': '12',
                'device_no': device_no,
                'device_type': 'Xiaomi+M2102J2SC',
                'statusBarHeight': '33',
                'networkType': 'wifi',
                'timestamp': ts13,
                'version': '2.0.0',
                'detail': '',
                'client_code': 'xsb_qujiang'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        console.log(JSON.stringify(resp))
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- 恭喜你鸭, 获得${resp.data.suffix}: ${resp.data.name} 元`)
            // $.log(`${this.idx}: ${options.fn} -- 获得${resp.data.client_money_name}: ${resp.data.client_money} 元, 可提现:${resp.data.can_withdraw}`)
            // $.log(`${this.idx}: ${options.fn} -- 完成次数(限制三次): 设备:${resp.data.device_limit}, 手机号 :${resp.data.mobile_limit}`)
            await $.wait($.randomInt(3, 5))
            await this.end(1)  // 开始答题

        } else if (resp.code == 5514) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            await this.yecx()
            $.log(`\n-------------- 开始提现 --------------`)
            // await this.info()
            await this.bandAipay()
            // await this.info()
            await this.change_bandAipay()
        } else if (resp.code == 5562) {
            console.log(`=========== 谢谢呢 ========`)
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            await $.wait($.randomInt(3, 5))
            await this.end(1)  // 开始答题
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async yecx() { // 余额查询
        let options = {
            fn: '余额查询',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                "m": "front",
                "subm": "money_wallet",
                "action": "wallet",
                "session_id": this.SESSION,
                "account_id": this.account_id,
                "app": "XSB_QUJIANG",
                "gaze_contro": 0
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {

            $.log(`${this.idx}: ${options.fn} -- 通用钱包余额 ${resp.data.list[0].total} 元`)

        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)


    }

    async bandAipay() { // 绑定支付宝
        let options = {
            fn: '绑定支付宝',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money_wallet',
                'action': 'commonzfb',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'name': pay_name,
                'zfb': pay_email,
                'app': 'XSB_QUJIANG',
                'gaze_control': '0',
                'wallet_id': '0',
                'wallet_name': '通用钱包'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: 当前支付宝: ${resp.data.zfb}`)
            await $.wait($.randomInt(1, 2))
            await this.cash_check()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async cash_check() { // 提现检查
        let options = {
            fn: '提现检查',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money_wallet',
                'action': 'commongetmoneyinit',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'app': 'XSB_QUJIANG',
                'gaze_control': '0',
                'wallet_id': '0',
                'wallet_name': '通用钱包'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- 可提现: ${resp.data.can_get} 元`)
            if (resp.data.can_get) {
                await this.cash()

            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }

    async cash() { // 提现
        let options = {
            fn: '提现',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money_wallet',
                'action': 'commonchange',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'zfb': pay_email,
                'app': 'XSB_QUJIANG',
                'gaze_control': '0',
                'wallet_id': '0',
                'wallet_name': '通用钱包'
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} ${resp.msg}`)
            await $.wait($.randomInt(1, 2))
            // await this.change_bandAipay()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async change_bandAipay() { // 换绑定支付宝
        let new_name = RandomClass.randomName()
        let new_pay_email = `${$.randomString(5)}@${$.randomString(3)}.com`
        let options = {
            fn: '换绑定支付宝',
            method: 'post',
            url: `https://wallet.act.tmuact.com/activity/api.php`,
            headers: this.hd,
            form: {
                'm': 'front',
                'subm': 'money_wallet',
                'action': 'commonzfb',
                'account_id': this.account_id,
                'session_id': this.SESSION,
                'name': new_name,
                'zfb': new_pay_email,
                'app': 'XSB_QUJIANG',
                'gaze_control': '0',
                'wallet_id': '0',
                'wallet_name': '通用钱包'
            }
        }

        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 3001) {
            $.log(`${this.idx}: ${options.fn} -- 当前绑定支付宝: ${resp.data.zfb}`)
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
    async login() { // 登录
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

class RandomClass {
    // 随机整数
    static randomNum = function (min = 0, max = 10) {
        return Math.round(Math.random() * (max - min)) + min
    }

    static randomName = function () {
        // 姓氏
        let xing = ["赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许", "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章", "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳", "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常", "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹", "姚", "邵", "湛", "汪", "祁", "毛", "禹", "狄", "米", "贝", "明", "臧", "计", "伏", "成", "戴", "谈", "宋", "茅", "庞", "熊", "纪", "舒", "屈", "项", "祝", "董", "梁", "杜", "阮", "蓝", "闵", "席", "季", "麻", "强", "贾", "路", "娄", "危", "江", "童", "颜", "郭", "梅", "盛", "林", "刁", "钟", "徐", "邱", "骆", "高", "夏", "蔡", "田", "樊", "胡", "凌", "霍", "虞", "万", "支", "柯", "昝", "管", "卢", "莫", "经", "房", "裘", "缪", "干", "解", "应", "宗", "丁", "宣", "贲", "邓", "郁", "单", "杭", "洪", "包", "诸", "左", "石", "崔", "吉", "钮", "龚", "程", "嵇", "邢", "滑", "裴", "陆", "荣", "翁", "荀", "羊", "於", "惠", "甄", "曲", "家", "封", "芮", "羿", "储", "靳", "汲", "邴", "糜", "松", "井", "段", "富", "巫", "乌", "焦", "巴", "弓", "牧", "隗", "山", "谷", "车", "侯", "宓", "蓬", "全", "郗", "班", "仰", "秋", "仲", "伊", "宫", "宁", "仇", "栾", "暴", "甘", "钭", "厉", "戎", "祖", "武", "符", "刘", "景", "詹", "束", "龙", "叶", "幸", "司", "韶", "郜", "黎", "蓟", "薄", "印", "宿", "白", "怀", "蒲", "邰", "从", "鄂", "索", "咸", "籍", "赖", "卓", "蔺", "屠", "蒙", "池", "乔", "阴", "鬱", "胥", "能", "苍", "双", "闻", "莘", "党", "翟", "谭", "贡", "劳", "逄", "姬", "申", "扶", "堵", "冉", "宰", "郦", "雍", "郤", "璩", "桑", "桂", "濮", "牛", "寿", "通", "边", "扈", "燕", "冀", "郏", "浦", "尚", "农", "温", "别", "庄", "晏", "柴", "瞿", "阎", "充", "慕", "连", "茹", "习", "宦", "艾", "鱼", "容", "向", "古", "易", "慎", "戈", "廖", "庾", "终", "暨", "居", "衡", "步", "都", "耿", "满", "弘", "匡", "国", "文", "寇", "广", "禄", "阙", "东", "欧", "殳", "沃", "利", "蔚", "越", "夔", "隆", "师", "巩", "厍", "聂", "晁", "勾", "敖", "融", "冷", "訾", "辛", "阚", "那", "简", "饶", "空", "曾", "毋", "沙", "乜", "养", "鞠", "须", "丰", "巢", "关", "蒯", "相", "查", "后", "荆", "红", "游", "竺", "权", "逯", "盖", "益", "桓", "公", "万", "俟", "司", "马", "上", "官", "欧", "阳", "夏", "侯", "诸", "葛", "闻", "人", "东", "方", "赫", "连", "皇", "甫", "尉", "迟", "公", "羊", "澹", "台", "公", "冶", "宗", "政", "濮", "阳", "淳", "于", "单", "于", "太", "叔", "申", "屠", "公", "孙", "仲", "孙", "轩", "辕", "令", "狐", "钟", "离", "宇", "文", "长", "孙", "慕", "容", "鲜", "于", "闾", "丘", "司", "徒", "司", "空", "丌", "官", "司", "寇", "仉", "督", "子", "车", "颛", "孙", "端", "木", "巫", "马", "公", "西", "漆", "雕", "乐", "正", "壤", "驷", "公", "良", "拓", "跋", "夹", "谷", "宰", "父", "谷", "梁", "晋", "楚", "闫", "法", "汝", "鄢", "涂", "钦", "段", "干", "百", "里", "东", "郭", "南", "门", "呼", "延", "归", "海", "羊", "舌", "微", "生", "岳", "帅", "缑", "亢", "况", "郈", "有", "琴", "梁", "丘", "左", "丘", "东", "门", "西", "门", "商", "牟", "佘", "佴", "伯", "赏", "南", "宫", "墨", "哈", "谯", "笪", "年", "爱", "阳", "佟", "第", "五", "言", "福", "百", "家", "姓", "终"]
        // 名称
        let names = [
            "澄邈",
            "德泽",
            "海超",
            "海阳",
            "海荣",
            "海逸",
            "海昌",
            "瀚钰",
            "瀚文",
            "涵亮",
            "涵煦",
            "明宇",
            "涵衍",
            "浩皛",
            "浩波",
            "浩博",
            "浩初",
            "浩宕",
            "浩歌",
            "浩广",
            "浩邈",
            "浩气",
            "浩思",
            "浩言",
            "鸿宝",
            "鸿波",
            "鸿博",
            "鸿才",
            "鸿畅",
            "鸿畴",
            "鸿达",
            "鸿德",
            "鸿飞",
            "鸿风",
            "鸿福",
            "鸿光",
            "鸿晖",
            "鸿朗",
            "鸿文",
            "鸿轩",
            "鸿煊",
            "鸿骞",
            "鸿远",
            "鸿云",
            "鸿哲",
            "鸿祯",
            "鸿志",
            "鸿卓",
            "嘉澍",
            "光济",
            "澎湃",
            "彭泽",
            "鹏池",
            "鹏海",
            "浦和",
            "浦泽",
            "瑞渊",
            "越泽",
            "博耘",
            "德运",
            "辰宇",
            "辰皓",
            "辰钊",
            "辰铭",
            "辰锟",
            "辰阳",
            "辰韦",
            "辰良",
            "辰沛",
            "晨轩",
            "晨涛",
            "晨濡",
            "晨潍",
            "鸿振",
            "吉星",
            "铭晨",
            "起运",
            "运凡",
            "运凯",
            "运鹏",
            "运浩",
            "运诚",
            "运良",
            "运鸿",
            "运锋",
            "运盛",
            "运升",
            "运杰",
            "运珧",
            "运骏",
            "运凯",
            "运乾",
            "维运",
            "运晟",
            "运莱",
            "运华",
            "耘豪",
            "星爵",
            "星腾",
            "星睿",
            "星泽",
            "星鹏",
            "星然",
            "震轩",
            "震博",
            "康震",
            "震博",
            "振强",
            "振博",
            "振华",
            "振锐",
            "振凯",
            "振海",
            "振国",
            "振平",
            "昂然",
            "昂雄",
            "昂杰",
            "昂熙",
            "昌勋",
            "昌盛",
            "昌淼",
            "昌茂",
            "昌黎",
            "昌燎",
            "昌翰",
            "晨朗",
            "德明",
            "德昌",
            "德曜",
            "范明",
            "飞昂",
            "高旻",
            "晗日",
            "昊然",
            "昊天",
            "昊苍",
            "昊英",
            "昊宇",
            "昊嘉",
            "昊明",
            "昊伟",
            "昊硕",
            "昊磊",
            "昊东",
            "鸿晖",
            "鸿朗",
            "华晖",
            "金鹏",
            "晋鹏",
            "敬曦",
            "景明",
            "景天",
            "景浩",
            "俊晖",
            "君昊",
            "昆琦",
            "昆鹏",
            "昆纬",
            "昆宇",
            "昆锐",
            "昆卉",
            "昆峰",
            "昆颉",
            "昆谊",
            "昆皓",
            "昆鹏",
            "昆明",
            "昆杰",
            "昆雄",
            "昆纶",
            "鹏涛",
            "鹏煊",
            "曦晨",
            "曦之",
            "新曦",
            "旭彬",
            "旭尧",
            "旭鹏",
            "旭东",
            "旭炎",
            "炫明",
            "宣朗",
            "学智",
            "轩昂",
            "彦昌",
            "曜坤",
            "曜栋",
            "曜文",
            "曜曦",
            "曜灿",
            "曜瑞",
            "智伟",
            "智杰",
            "智刚",
            "智阳",
            "昌勋",
            "昌盛",
            "昌茂",
            "昌黎",
            "昌燎",
            "昌翰",
            "晨朗",
            "昂然",
            "昂雄",
            "昂杰",
            "昂熙",
            "范明",
            "飞昂",
            "高朗",
            "高旻",
            "德明",
            "德昌",
            "德曜",
            "智伟",
            "智杰",
            "智刚",
            "智阳",
            "瀚彭",
            "旭炎",
            "宣朗",
            "学智",
            "昊然",
            "昊天",
            "昊苍",
            "昊英",
            "昊宇",
            "昊嘉",
            "昊明",
            "昊伟",
            "鸿朗",
            "华晖",
            "金鹏",
            "晋鹏",
            "敬曦",
            "景明",
            "景天",
            "景浩",
            "景行",
            "景中",
            "景逸",
            "景彰",
            "昆鹏",
            "昆明",
            "昆杰",
            "昆雄",
            "昆纶",
            "鹏涛",
            "鹏煊",
            "景平",
            "俊晖",
            "君昊",
            "昆琦",
            "昆鹏",
            "昆纬",
            "昆宇",
            "昆锐",
            "昆卉",
            "昆峰",
            "昆颉",
            "昆谊",
            "轩昂",
            "彦昌",
            "曜坤",
            "曜文",
            "曜曦",
            "曜灿",
            "曜瑞",
            "曦晨",
            "曦之",
            "新曦",
            "鑫鹏",
            "旭彬",
            "旭尧",
            "旭鹏",
            "旭东",
            "浩轩",
            "浩瀚",
            "浩慨",
            "浩阔",
            "鸿熙",
            "鸿羲",
            "鸿禧",
            "鸿信",
            "泽洋",
            "泽雨",
            "哲瀚",
            "胤运",
            "佑运",
            "允晨",
            "运恒",
            "运发",
            "云天",
            "耘志",
            "耘涛",
            "振荣",
            "振翱",
            "中震",
            "子辰",
            "晗昱",
            "瀚玥",
            "瀚昂",
            "瀚彭",
            "景行",
            "景中",
            "景逸",
            "景彰",
            "绍晖",
            "文景",
            "曦哲",
            "永昌",
            "子昂",
            "智宇",
            "智晖",
            "晗日",
            "晗昱",
            "瀚昂",
            "昊硕",
            "昊磊",
            "昊东",
            "鸿晖",
            "绍晖",
            "文昂",
            "文景",
            "曦哲",
            "永昌",
            "子昂",
            "智宇",
            "智晖",
            "浩然",
            "鸿运",
            "辰龙",
            "运珹",
            "振宇",
            "高朗",
            "景平",
            "鑫鹏",
            "昌淼",
            "炫明",
            "昆皓",
            "曜栋",
            "文昂",
            "治汇",
            "恨桃",
            "依秋",
            "依波",
            "香巧",
            "紫萱",
            "涵易",
            "忆之",
            "幻巧",
            "美倩",
            "安寒",
            "白亦",
            "惜玉",
            "碧春",
            "怜雪",
            "听南",
            "念蕾",
            "紫夏",
            "凌旋",
            "芷梦",
            "凌寒",
            "梦竹",
            "千凡",
            "丹蓉",
            "慧贞",
            "思菱",
            "平卉",
            "笑柳",
            "雪卉",
            "南蓉",
            "谷梦",
            "巧兰",
            "绿蝶",
            "飞荷",
            "佳蕊",
            "芷荷",
            "怀瑶",
            "慕易",
            "若芹",
            "紫安",
            "曼冬",
            "寻巧",
            "雅昕",
            "尔槐",
            "以旋",
            "初夏",
            "依丝",
            "怜南",
            "傲菡",
            "谷蕊",
            "笑槐",
            "飞兰",
            "笑卉",
            "迎荷",
            "佳音",
            "梦君",
            "妙绿",
            "觅雪",
            "寒安",
            "沛凝",
            "白容",
            "乐蓉",
            "映安",
            "依云",
            "映冬",
            "凡雁",
            "梦秋",
            "梦凡",
            "秋巧",
            "若云",
            "元容",
            "怀蕾",
            "灵寒",
            "天薇",
            "翠安",
            "乐琴",
            "宛南",
            "怀蕊",
            "白风",
            "访波",
            "亦凝",
            "易绿",
            "夜南",
            "曼凡",
            "亦巧",
            "青易",
            "冰真",
            "白萱",
            "友安",
            "海之",
            "小蕊",
            "又琴",
            "天风",
            "若松",
            "盼菡",
            "秋荷",
            "香彤",
            "语梦",
            "惜蕊",
            "迎彤",
            "沛白",
            "雁彬",
            "易蓉",
            "雪晴",
            "诗珊",
            "春冬",
            "晴钰",
            "冰绿",
            "半梅",
            "笑容",
            "沛凝",
            "映秋",
            "盼烟",
            "晓凡",
            "涵雁",
            "问凝",
            "冬萱",
            "晓山",
            "雁蓉",
            "梦蕊",
            "山菡",
            "南莲",
            "飞双",
            "凝丝",
            "思萱",
            "怀梦",
            "雨梅",
            "冷霜",
            "向松",
            "迎丝",
            "迎梅",
            "雅彤",
            "香薇",
            "以山",
            "碧萱",
            "寒云",
            "向南",
            "书雁",
            "怀薇",
            "思菱",
            "忆文",
            "翠巧",
            "书文",
            "若山",
            "向秋",
            "凡白",
            "绮烟",
            "从蕾",
            "天曼",
            "又亦",
            "从语",
            "绮彤",
            "之玉",
            "凡梅",
            "依琴",
            "沛槐",
            "又槐",
            "元绿",
            "安珊",
            "夏之",
            "易槐",
            "宛亦",
            "白翠",
            "丹云",
            "问寒",
            "易文",
            "傲易",
            "青旋",
            "思真",
            "雨珍",
            "幻丝",
            "代梅",
            "盼曼",
            "妙之",
            "半双",
            "若翠",
            "初兰",
            "惜萍",
            "初之",
            "宛丝",
            "寄南",
            "小萍",
            "静珊",
            "千风",
            "天蓉",
            "雅青",
            "寄文",
            "涵菱",
            "香波",
            "青亦",
            "元菱",
            "翠彤",
            "春海",
            "惜珊",
            "向薇",
            "冬灵",
            "惜芹",
            "凌青",
            "谷芹",
            "雁桃",
            "映雁",
            "书兰",
            "盼香",
            "梅致",
            "寄风",
            "芳荷",
            "绮晴",
            "映之",
            "醉波",
            "幻莲",
            "晓昕",
            "傲柔",
            "寄容",
            "以珊",
            "紫雪",
            "芷容",
            "书琴",
            "美伊",
            "涵阳",
            "怀寒",
            "易云",
            "代秋",
            "惜梦",
            "宇涵",
            "谷槐",
            "怀莲",
            "英莲",
            "芷卉",
            "向彤",
            "新巧",
            "语海",
            "灵珊",
            "凝丹",
            "小蕾",
            "迎夏",
            "慕卉",
            "飞珍",
            "冰夏",
            "亦竹",
            "飞莲",
            "秋月",
            "元蝶",
            "春蕾",
            "怀绿",
            "尔容",
            "小玉",
            "幼南",
            "凡梦",
            "碧菡",
            "初晴",
            "宛秋",
            "傲旋",
            "新之",
            "凡儿",
            "夏真",
            "静枫",
            "芝萱",
            "恨蕊",
            "乐双",
            "念薇",
            "靖雁",
            "菊颂",
            "丹蝶",
            "元瑶",
            "冰蝶",
            "念波",
            "迎翠",
            "海瑶",
            "乐萱",
            "凌兰",
            "曼岚",
            "若枫",
            "傲薇",
            "雅芝",
            "乐蕊",
            "秋灵",
            "凤娇",
            "觅云",
            "依伊",
            "恨山",
            "从寒",
            "忆香",
            "香菱",
            "静曼",
            "青寒",
            "笑天",
            "涵蕾",
            "元柏",
            "代萱",
            "紫真",
            "千青",
            "雪珍",
            "寄琴",
            "绿蕊",
            "荷柳",
            "诗翠",
            "念瑶",
            "兰楠",
            "曼彤",
            "怀曼",
            "香巧",
            "采蓝",
            "芷天",
            "尔曼",
            "巧蕊",
            "八戒",
            "悟空",
            "金银",
            "珠宝",
            "伟鹏",
            "厚渡",
            "建国",
            "顾家",
            "一一",
            "依依",
            "不忙",
            "萌萌",
            "思思",
            "萱萱",
            "熙熙",
            "鹤轩",
            "伟祺",
            "祺祺",
            "鑫鑫",
            "明熙",
            "明旭",
            "文杰",
            "人杰",
            "明耀",
            "雄逸",
            "田磊",
            "天磊",
            "石磊",
            "俊哲",
            "修杰",
            "泽雨",
            "逸轩",
            "怡怿",
            "天佑",
            "德厚",
            "雅畅",
            "舒畅",
            "皓轩",
            "雅量",
            "泽铭",
            "泽民",
            "明远",
            "婉婷",
            "晏颖",
            "灵灵",
            "玉婷",
            "韵寒",
            "寒冰",
            "欣妍",
            "心祺",
            "佳琪",
            "诗诗",
            "诗涵",
            "菲林",
            "依娜",
            "雪莉",
            "茹雪",
            "灵慧",
            "灵芸",
            "芳菲",
            "澄泓",
            "彬彬",
            "佟伟",
            "炵伟",
            "彤彤",
            "浩然",
            "浩丽",
            "祺祺",
            "麒麒",
            "祁琪",
            "栖栖",
            "冉冉",
            "柒柒",
            "博雅",
        ]

        // 拼接名称
        let xingI = this.randomNum(0, xing.length - 1)
        let namesI = this.randomNum(0, names.length - 1)

        // 名
        let ming = ''
        // 一个字的情况
        if (this.randomNum(0, 1) === 1) {
            ming = names[namesI][this.randomNum(0, names[namesI].length - 1)]
        } else { // 一个词情况
            ming = names[namesI]
        }
        return `${xing[xingI] + ming}`
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