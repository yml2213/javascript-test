/*
七读小说 任务

-------------------  青龙-配置文件-复制区域  -------------------
# 七读小说
export qdxs_task=" 你扫码的ck  "

抓   的  sessionId 就行   记得填上自己的 ua  29行左右
多账号用 换行 或 @ 分割

tg频道: https://t.me/yml2213_tg
*/


const CodeName = "七读小说"
const env = "qdxs_task"
const envSplit = ["\n", "&", "@"]
const fs = require("fs")
const CryptoJS = require("crypto-js")
const { log } = require("console")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 3  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
// const ck_ = `13754650804#{"usr":"j174924563","utdid":"ZMl91UcGKg7puy6VUd3yd9gn","token":"daada922b19c570b4419231f85fa2040","authToken":"7640b25e5ba9449001462b5277552f1c","nickname":"ymlk6m5q7"}`  // 快速测试, 直接填入ck即可测试
const ck_ = `758550620#17682166389#{"usr":"j185149565","utdid":"ZMeZFFNRqeqNPOP9hFMhAmEK","token":"180c897f1cd034e5de48ee665f75218d","authToken":"a2546802510c05709de9e7c66d2be8b7","nickname":"来西少林喝酒滴德鄂"}`  // 快速测试, 直接填入ck即可测试


let ad_num = 50
let cash_ad_num = 10


//====================================================================================================

class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("#")
        this.remark = this.ck_[0]
        // this.ck_data = JSON.parse(this.ck_[1].replace(/'/g, '"'))
        this.ck_data = this.ck_[1]
        // console.log(this.ck_data)
        try {
            this.ck_data = JSON.parse(this.ck_[1])

        } catch (error) {
            console.log(`请检查你的变量是否是 jSON 字符串, 可以直接用登录生成的ck`)
            console.log(error)
        }



        this.privateKey = `-----BEGIN PRIVATE KEY-----
        MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMXGjyS3p+3AVnlBJe5VQ6tC9inh8tVBve4r+yBjC5HQD6th2n3tSyuNVYaNRAFSEq+OENwnwwhjbYUnjLWb+qZscB43K1+4/WlKdvfgwQVXm0ZQ2+jMBf+165UBEEuuWT2WqXeKkkUqPQta5lrt4eFfbo53JcOO4D5fDSGQS5bZAgMBAAECgYAor4I/AXEQXeLsKtTMxMmY77uIPi0gZdfWqUGOFhIJOw4eKZEzGp++I+MWPPVieCnT55vcTmm2zg13uP0fVykmukWqZszG/ZNpPKYleOqnZOqQj7O3au8Ywz18F/pqD++PsUzxRVeXxSOOwmjQ0D2Pe/9yutz62pyiFGAzDsaI6QJBAMn8DeBT3AtcWuONdiHL3yC4NkGJDdyBbMOaWyvrcvUUZr13uS9mZO6pLTN6v9tkmPUdvYxcPTJ9wdGR7NcNPDsCQQD6qluGI2VAlz4s5UoDnelFKrwDPeiruE3I6wsrasK6h37DsAE6OrQgx2dm4yH7ntJHUlJCZ5ay1EBNfEexgQv7AkA1r2vUwxVKY7q4nqHWa8SbgrrRAmePw0qwVreC3erJHyoLk+XBpnqPQKIF+8tAueU5yTTXOLD/WZOJazrDEf5/AkBpwG+Ggu5Xtrcbd8ynA/sDHElf0MGVmNbwOgFnWs42pa1cX6fU6ilOXvIH3TFcF6A9SMS9kThpz9QlHJaek4P7AkAavQillA/wnrha9GsK5UFmzmwNfkjLLW4psAUsXOsqFXWMoxTd0xWuSbuVOzERpbFMBl1VoZQmD9BLSVOTNe+v
        -----END PRIVATE KEY-----`

        this.privateKey2 = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFxo8kt6ftwFZ5QSXuVUOrQvYp4fLVQb3uK/sgYwuR0A+rYdp97UsrjVWGjUQBUhKvjhDcJ8MIY22FJ4y1m/qmbHAeNytfuP1pSnb34MEFV5tGUNvozAX/teuVARBLrlk9lql3ipJFKj0LWuZa7eHhX26OdyXDjuA+Xw0hkEuW2QIDAQAB`
        this.des_key = '97243249'

        this.app_name = "七读免费小说"          // # config.get(App, "app_name")
        this.wxappid = "wx0488b2337ff4a61a"          // # config.get(App, "wxappid")
        this.login_host = "dj.palmestore.com"           //# config.get(App, "login_host")
        this.welfare_host = "dj.palmestore.com"          // # config.get(App, "welfare_host")
        this.p2 = "136002"
        this.p3 = "25006056"
        this.p21 = "1303"
        this.p25 = "25006056"
        this.p33 = "com.dj.sevenRead"
        this.dl = "5.2.2"

        this.hd = {
            "Host": "dj.palmestore.com",
            "user-agent": "Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        }
        this.wx_ua = 'Mozilla/5.0 (Linux; Android 9; PBBT00 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 MMWEBID/3625 MicroMessenger/7.0.17.1720(0x27001134) Process/tools WeChat/arm32 NetType/4G Language/zh_CN ABI/arm64'

    }

    async userTask() {



        await this.get_userinfo()     // 个人信息
        // await this.get_smboxid()

        if (this.ckFlog) {
            // $.log(`\n-------------- 积分查询 --------------`)
            await this.checkin()  // 签到
            await this.reading_time()  // 刷阅读

            for (let index = 0; index < ad_num; index++) {
                await this.task_watch_video(10)  // 观看视频
            }

            for (let index = 0; index < cash_ad_num; index++) {
                await this.cash_video("advence")  // 提现视频
            }

        }

    }



    async checkin() {  // 签到
        try {
            // console.log(JSON.parse(this.ck_data))
            // console.log(typeof this.ck_data)
            let num = await this.get_MyContinueLogindays()
            const options = {
                method: "get",
                url: `https://dj.palmestore.com/zycl/gold/dailyWelfareV5`,
                headers: this.hd,
                params: {
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI 9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "d1": this.dl,
                    "firm": "Xiaomi",
                    "source": "bookShelf",
                    "signType": "2",
                    "ecpmMix": "0.0",
                    "ecpmVideo": "29.5",
                    "mcTacid": "13065",
                    "smboxid": await this.get_smboxid()
                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                if (res.body.signNormal.isTodayFirstSign) {
                    this.log(`签到成功, 获得 ${res.body.signNormal.reward.giftNum} 金币, ${res.body.signNormal.reward.signMoBaoNum} 墨宝, 已连续签到 ${num} 天`)
                } else {
                    this.log(`已签到, 已连续签到 ${num} 天`)
                }
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async get_MyContinueLogindays() {  // 签到天数查询
        try {
            const options = {
                method: "get",
                url: `https://${this.welfare_host}/zycl/gold/withdraw`,
                headers: this.hd,
                params: {
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__6241cd3ba605545d",
                    "p9": "1",
                    "p16": "2210132C",
                    "p21": this.p21,
                    "p22": "13",
                    "p25": this.p25,
                    "p26": "33",
                    "p28": "44b933d9b5b74f04",
                    "p31": "__6241cd3ba605545d",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "pca": "channel-visit",
                    "firm": "Xiaomi",
                    "source": "welfare",
                    "launch": "newpage",

                }
            }

            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res) {
                let num = res.split('myContinueLoginDays = ')[1].split(';var ')[0]
                // console.log(num)
                return num
            }

        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async get_userinfo() {  // 个人信息
        try {
            let ts13 = ts(13)
            const options = {
                method: "get",
                url: `https://${this.welfare_host}/zyuc/api/user/my/tab`,
                headers: this.hd,
                params: {
                    "timestamp": ts13,
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI+9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "d1": this.dl,
                    "firm": "Xiaomi",
                }
            }
            let a = `timestamp=${options.params.timestamp}&usr=${options.params.usr}`
            let sign = this.Sha1withRsa(a)
            // console.log(sign)
            options.params.sign = sign
            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                this.log(`手机号: ${res.body.userInfo.phone}, 总资产: ${res.body.gold.goldAmount}金币==${res.body.gold.goldAmount / 10000}元`, 1)
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async reading_time() {  // 刷阅读
        try {
            const zlib = require('zlib')
            let ts13 = ts(13)
            // let ts13 = 1700917407211
            // let num = 14895
            let num = randomInt(10000, 16000)
            let time = `${ts('y')}-${ts('mo')}-${ts('d')}`
            // console.log(time)
            let a = `alias=5b8b1da904bf407e96ff2ab8564620dd&data=[{"type":6,"data":{"${time}":{"d1":[{"bid":"12321351","format":"zyepub","time":${num},"resType":"read"}]}}}]&platformId=501656&timestamp=${ts13}&user_name=${this.ck_data.usr}`
            // console.log(a)
            let sign = this.Sha1withRsa(a)
            // console.log(sign)
            let data = `{"alias":"5b8b1da904bf407e96ff2ab8564620dd","data":"[{\\"type\\":6,\\"data\\":{\\"${time}\\":{\\"d1\\":[{\\"bid\\":\\"12321351\\",\\"format\\":\\"zyepub\\",\\"time\\":${num},\\"resType\\":\\"read\\"}]}}}]","platformId":"501656","sign":"${sign}","timestamp":"${ts13}","user_name":"${this.ck_data.usr}"}`

            data = zlib.gzipSync(data)


            const options = {
                method: "post",
                url: `https://dj.palmestore.com/dj_reading/out/readingTime/report`,
                headers: {
                    'Host': 'dj.palmestore.com',
                    'accept-encoding': 'gzip',
                    'content-type': 'text/plain',
                    'user-agent': 'Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)',
                    // 'Accept-Encoding': 'gzip'
                },
                params: {
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI 9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "d1": this.dl,
                    "firm": "Xiaomi",
                    "pkgName": this.p33,
                },
                body: data,
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            console.log(res)
            if (res.code == 0) {
                this.log(`刷阅读成功, 本次阅读 ${num / 60} 分钟`)
            } else {
                this.log(`刷阅读失败`)
                this.log(res)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async task_watch_video(type) {  // 观看视频
        try {
            let ts13 = ts(13)
            const options = {
                method: "get",
                url: `https://${this.login_host}/zycl/api/gold/moneyChallengeReport`,
                headers: this.hd,
                params: {
                    "ecpm": "52.16",  // 啥玩意不确定
                    "timestamp": ts13,
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "type": type,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI+9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "d1": this.dl,
                    "firm": "Xiaomi",
                }
            }
            let a = `ecpm=${options.params.ecpm}&timestamp=${options.params.timestamp}&type=${options.params.type}&usr=${options.params.usr}`
            let sign = this.Sha1withRsa(a)
            // console.log(sign)
            options.params.sign = sign
            // log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                let ad_num = res.conf.redPacketMaxNum - res.conf.receiveRedPacketNum
                this.log(`观看视频获得金币 ${res.conf.receiveMoney} 个, 剩余 ${ad_num} 次`)
                await wait(5, 8)
                // if (ad_num > 0) {
                //     await this.task_watch_video(10)
                // }
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async cash_video(type) {  // 提现视频
        try {
            let ts13 = ts(13)
            const options = {
                method: "get",
                url: `https://dj.palmestore.com/zycl/gold/notice/video`,
                headers: this.hd,
                params: {
                    "timestamp": ts13,
                    "zyeid": this.ck_data.zyeid,
                    "usr": this.ck_data.usr,
                    "type": type,
                    "rgt": "7",
                    "p1": this.ck_data.utdid,
                    "ku": this.ck_data.usr,
                    "kt": this.ck_data.token,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI+9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "d1": this.dl,
                    "firm": "Xiaomi",
                    "pca": "channel-visit",
                    "param": "10060",
                    "videoId": "10060",
                    "smboxid": await this.get_smboxid(),
                }
            }
            let a = `p2=${options.params.p2}&param=${options.params.param}&timestamp=${options.params.timestamp}&usr=${options.params.usr}`
            let sign = this.Sha1withRsa(a)
            // console.log(sign)
            options.params.sign = sign
            // log(options)
            let { res } = await requestPromise(options)
            this.log(res)
            if (res.code == 0) {
                this.log(`观看第 ${res.body.usedCount} 个提现视频 `)
                await wait(5, 8)
                // if (ad_num > 0) {
                //     await this.task_watch_video(10)
                // }
            } else if (res.code == 40161) {
                this.log(`观看 提现视频  ${res.msg}`)
            } else {
                this.log(res)
                return this.ckFlog = false
            }
        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }








    async WX_login(utdid, _name, zyeId) {
        try {

            let ts13 = ts(13)
            let code = await this.post_qrcode()
            let wx_code = await this.post_code(code)
            let smboxid = this.get_smboxid()

            const options = {
                method: "post",
                url: `https://${this.login_host}/dj_user/out/login/loginByOAuthV2`,
                headers: this.hd,
                params: {
                    "zyeid": zyeId,
                    "usr": _name,
                    "rgt": "7",
                    "p1": utdid,
                    "pc": "10",
                    "p2": this.p2,
                    "p3": this.p3,
                    "p4": "501656",
                    "p5": "19",
                    "p7": "__e2ba088bce115acf",
                    "p9": "3",
                    "p12": "",
                    "p16": "MI+9",
                    "p21": this.p21,
                    "p22": "11",
                    "p25": this.p25,
                    "p26": "30",
                    "p28": "146bdb4427eb2ecd",
                    "p30": "",
                    "p31": "__e2ba088bce115acf",
                    "p33": this.p33,
                    "p34": "Xiaomi",
                    "firm": "Xiaomi",
                    "d1": this.dl
                },
                form: {
                    "smboxid": smboxid,
                    "versionId": this.p25,
                    "device": "MI+9",
                    "pkgName": this.p33,
                    "userName": _name,
                    "uid": wx_code,
                    "imei": "____e4ba066bce775acf",
                    "timestamp": ts13,
                    "utdId": utdid,
                    "loginSource": "%E6%88%91%E7%9A%84_%E9%A9%AC%E4%B8%8A%E7%99%BB%E5%BD%95",
                    "authMode": "token",
                    "authToken": this.wxappid,
                    "channelId": this.p2,
                    "platform": "weixin"
                }
            }


            let a = `authToken=${options.form.authToken}&channelId=${options.form.channelId}&device=${options.form.device}&imei=${options.form.imei}&pkgName=${options.form.pkgName}&platform=${options.form.platform}&timestamp=${options.form.timestamp}&uid=${options.form.uid}&versionId=${options.form.versionId}`
            let sign = this.Sha1withRsa(a)
            // console.log(sign)
            options.form.sign = sign
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            if (res.code == 0) {
                let ck_data = {}
                ck_data.usr = res.body.userName
                ck_data.utdid = utdid
                ck_data.zyeid = res.body.zyeid
                ck_data.token = res.body.token
                ck_data.authToken = res.body.authToken
                ck_data.nickname = res.body.usrMsg.nick
                this.log(`${res.body.userName}, 登录成功, 您的ck 信息\n`)
                this.log(ck_data)
                // console.log(ck_data)
                // return res.body.name, res.body.zyeId
                return ck_data
            } else {
                this.log(res)
            }

        } catch (error) {
            console.log(error)
        }
    }
    async post_qrcode() {
        try {
            const options = {
                method: "post",
                url: `http://open.weixin.qq.com/connect/app/qrconnect?appid=${this.wxappid}&bundleid=(null)&scope=snsapi_userinfo&state=w&from=message&isappinstalled=0`,
                headers: { 'User-Agent': this.wx_ua }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // this.log(res)
            let auth_qrcode_url = res.split('class="auth_qrcode" src="')[1].split('" />')[0]
            let auth_qrcode = auth_qrcode_url.split('qrcode/')[1]
            // console.log(auth_qrcode)
            // this.auth_qrcode = auth_qrcode
            this.log(`打开以下网址微信扫码\n${auth_qrcode_url}\n`, 1)
            return auth_qrcode

        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async post_code(code) {
        try {
            let ts10 = ts(10)
            const options = {
                method: "post",
                url: `http://long.open.weixin.qq.com/connect/l/qrconnect?uuid=${code}&_=${ts10}`,
                headers: { 'User-Agent': this.wx_ua }
            }
            // console.log(options)
            while (true) {
                let res = await httpRequest(options)
                // console.log(res)
                if (res.indexOf('405') > -1) {
                    let wx_code = res.split("window.wx_code='")[1].split("'")[0]
                    // console.log(wx_code)
                    return wx_code
                } else {
                    this.log(`等待扫码中...`)
                }
                await wait()
            }

        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }

    async get_smboxid() {
        try {
            const options = {
                method: "post",
                url: `http://fp-it.fengkongcloud.com/deviceprofile/v4`,
                // headers: { 'User-Agent': this.wx_ua },
                json: { "organization": "q8VWRaAq7Qkv7w6EgXDV", "os": "android", "appId": "qidu", "encode": 2, "compress": 3, "data": "Yg8tu7LrclMENRVAa+ygDSoaUo1ED6NYV3d0dYAnsFiSivRLcAV45NAKzTvZg41Q+fNSqL7qV1Fm2jZhQ\/FtbvRbcMqZTTJVnbT9vymgzmxjPBmH4TiGun9mz89\/GYeHUjQEO3\/9LW74+9fpUolaeKMFoSFNHpvKcyzpJ1AL8wpfxY5D\/6C24JjX2piYr8SdsUbJQY43LV5rZVmH6i2s3JPkFmmq0W2XOPEHSc1gMca1\/y\/NOlVJ6GxRuLuC2SdzXetntTVy2WpDya9dN6mUpb7P1t1+RI76f4iWrzcwghBx3bRHPJVmgrkz6mtUDt+qOlCbEYXNoV1ohOvz\/kk2XhZ9j1KKvsue8TaLrQ7Q4xUnMKVxCQfSymD+c2R+x6LDPqrD\/6Kfu1eakU1b3IZ0cAhoy6sprF4cILmFOvzCw6JSNo8A1Ydnd2x49Q8oHsUR0ZwB0r5l6j0y+CfOM\/ctAGJRcmfG81FFH5QNB7x2Xoy9D1ztH+g8W\/scgb9XW0i3t9IVe1p6G9K9QNnDkAFbeTekBWbGZZQjYs12YkT15yJ3bbYc+nRPdObVgfGabA1pf1wroJGHAwMaxHNRvn1s2RRs9pWWTDgl1uM2SeBIgfypTguobsQRuU7WcHsARbnowbB4ZK7oPpliKgnElE2dNrDHxuHM\/E5iQCgmkYrtfYheD0mCHY8dbiu0U1eCN6\/fWhHzuRoF7zLMpIzV7Sc2YE6a4\/lR2mSNcougmho\/pYpnPiQX6Tj0wlhtuljyz\/EjzbruFGFhwmscX5d9BAWvGYVkJTtFdq+Fo3mhgqjBSw3+qd06TMR\/GuB+1PRPlcYgNba\/BrQNz0psBDXo2sYtFFiTMRkQp\/wvG4HSw+7ycEc5I1DkudtQNSjIzF\/t4vuBWjqZ+RHuCzS5ykpiuMWBE1MmAkKgNPqL3rkYjQCLVa8kWFYGzKsZQLT6H8Qvumr6P9rjoQ1jRzyZoFGMmSbKgWaTgMAJxf\/yUCaskejfEPxFmE3GW8+aQq2CHbRnsxtrvuzb971dVXhXEtyWOrBjWiBYK3FdTQsndghQ1s29oiRH4ekapalIMtx31TxyuLi8zj9fIlz78GoP16uf4uOYcZE8bTNjoXa5LHx1I1\/UBElT\/JUd\/ELlEG7419TftvGr3FW8CxZMalow\/4FOsbRSA8NLZQq2aBuaqyBJkJpzbtdnExsl1a+VV6SmEvUobWhtkkV7ooNkWOL\/g\/EEOkXLUNENp\/L\/ZPtkVbgwlh11TeWceYcluLcM5jLFlwXhErenP4eWRvwVDhNmHApzLjm8CzW2lG3wUVuuML6\/lfifMebXga2WhSxXomwjS7lRuNy3\/QFLBkTvoAXjkL7V87zlUEVgUrHakY80ydZWVYHer9Si15n8Zpz2brDTqLFbZ2unmAniZa0jtAz70t274+wTeZlIk8uQf4cmfARxYOzdnPqcRL+waumHUm4\/bzgNsLbuglMo025oaJmL8qvNxPjEXGT9O7CPvh1+wHEnNTt+irWMiLjBvmGrN7+5eLWS\/1iR37JKPPH2uZDhJ0aK1rH0DKq4d3dHCc2jYpqRNvug3e74ms3ZUreRw1PS9jfpoTCHvVNlJe0oAeJ+H3517SByoQba1yERI\/g4PNJpe7kiFU2k5qtnl\/KYO1iUmYs043xkakyOVhGAuFDylHHqVB\/rkTuOev7bmEnQbnh8tofQVBOO3qiEMmTc3Qh0rI32XDZr+SX4lKYxlIoLDGLQkTF5DGwTVteAf\/AOwzbcphU5ojZqddeeC1UHe3WsxNWVyV\/pLB5uUBFZj42WIucbMWHRQo7JZrIjDRtv7neM5MdAfdVV1Z5mIBWBdwlMocz0JYL96kieuPn9EI\/6iSKSQZV9BS9P7L\/iaeojbfC6Qd+TrTwPgkLs7D2TUQiWYmR7R6ZNqxyOS0a5yMPxMotWqE3SNJqF6trfRVvs8MvgFdbezdftBXVKc9SYzMSCaSghJ99rE44HLzRHXpadjgmeQkeR2Ur7rrdpptOylkVDDzUSgfyrkW6p2nkcSDDcKQkos\/XyXDme0oetglKdM2UmfSzqMJd99Vbqi0VHnYK69dD6Tdf7IC8owdlMT9TwI\/v3sJxFBIbMvizPbKiyYhv1unvSoOhIXgvEodUHnhLr35WFFdhlehegGRypqhWoASQpezL+tbFzdgiiGzCFLQS+sKTvvunv7tfFuq5KNL+G1vnl4++vIoyvh603zJfx3PrsDjAnF22CbUYeLEbvVUGEt6pcYQLU5O9U6r4lT+FjP0LYf1YwJ5NVl9gQRWO+kkJw97CDXUkvsbvEauQqaHPdzc82EzksU9BPV3GuGwANy4t23eQ9Py+zW4FGdML\/VPIYxMu1xbFy94V9YHulf\/0IuBx4IW5a+PbGJpW\/HeA4HS8u0c5BdTnQH9Mfc2e1ypGOOvrEy50uKXodrzxbg7uPnLXcN5lbVa4f6r\/8nGH4ucai3XTRY6MXcSaujCc4wdYOwELqINDWaXnkWdhRXR2mXJPz1U3T51a74KMPgoTgN7gy4e6oCwCVS4DrH\/GnUJdHqG4TpklxVj6LvrW\/xCKVWqWVlj+rktwzKcF29otPrwZM2l3MfpndfF99adok6PZWJQf0X8s6FScYdrJnjIxygejEGJqsBOJGWqKdv0zJ\/\/yNAS\/HyyxvEfw35\/Y2UZ2\/Aa63Y7eakCMzQwFJfLHaKGYj9Wgn63eEVMRkx7yb2I5kcSnV1LihGhru4JmakfB903CYL\/O1HNfujYbkmWBfkqobzuH64UUeQj+psVTOQZig3au9eYR7Va+kTErMPM2Fk486VDucaxVCLU1CmLDqCO6smrsijiaqEXPu8RQfI+RxHEKbqWnYTgoLCe4KxNx2e5Qsg0YPUyB6YxY04sCKI5EeMHoVnco9GwOxCpE0uzyarXbVqNDLXhjHP6AtNC9GWNGtimQoxwnW3zWxopqhRYx\/UUxnDVkeYBC65DVgGgCKTlxT0YtTcwKgjMzLyWi\/WYEHE1YX\/m5GeU3gguKtajAMn9Oekno3UbzVeqMJpX0DPCLe5DmIigDB2kBi\/DSdjGwvb4PVn4CFzvn2Kcn7h83EKXpYGr5YJzjHtS7LVGjg\/2++IxHhAItPb8V7HbEFsbow", "tn": "NZ30raQQgcvbqiVizz\/3WK2HzPIRYgaXxxBK72DY1tjPpVYuanNFn8DByukQioN+whywF82Zngdlp+w6KW4wsD\/0H\/DvoCSITP001FOxm+2R\/C+Of0MOr0N+vaxJIib03D51l8XZb5Y0C697Q0X736UQyr+F\/8plwuIhUUBObDuo79v4InZ\/t9QW1RMSVtr8atuNeCs3nqGupCxxwbl7G+XRZTo061tVtqT7jvmQjDa0vvGK2vzQDYicGBZE4h60NaiYtqs+c2Gs5kxnYTWZyXjXOzuauesO0QyMyjx3+XAXVC4uqdn64+JamIwxdD05V3U3MhOxhYl4DXWfgKyNyA==", "ep": "g7cfWsrfx2E1OG\/68RV4mhHjbwirs5TvZdWmrYSaKf+kgQDd7wrRaR5PDGpy36ZCvvAMjMJtVvfXzlVfK1U8MQEEnIeqBkrJexmqcWVz4pNVVmDmADpNeR+mOy+OHq0SnaDWWI4N9yFU96n39Gs7nlVE\/9PAm\/wx6wg0fi8xCvcYfMg5Hxh7gw6Hbs1r\/\/aQpHbZwlGKYm5DLP5L5nt5sARi2P1NWRifv9ercQ76iStMwzk\/CNWC\/yj6IyDTnFkKA\/XnvSeaH3i\/WJy6PXr51jP1ZXujV3a5JGWd3426OCL94sBAdWrERL12P0XYNnejPvg0fPibn8e+y2ZOIFyFgg==" }
            }
            // console.log(options)
            let { res } = await requestPromise(options)
            // console.log(res)
            if (res.code == 1100) {
                return encodeURIComponent(res.detail.deviceId)
            }
            // if (res.indexOf('405') > -1) {
            //     let wx_code = res.split("window.wx_code='")[1].split("'")[0]
            //     // console.log(wx_code)
            //     return wx_code
            // } else {
            //     this.log(`等待扫码中...`)
            // }
            // await wait()

        } catch (error) {
            console.log(error)
            return this.ckFlog = false
        }
    }







    sortObjectByKey(obj) {
        return Object.entries(obj)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .reduce((obj, [key, value]) => {
                obj[key] = value
                return obj
            }, {})
    }




    //RSA加密
    RSA(msg, Key) {
        const NodeRSA = require('node-rsa')
        let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
        nodersa.setOptions({ encryptionScheme: 'pkcs1' })
        return nodersa.encrypt(msg, 'base64', 'utf8')
    }
    getSHA256withRSA(content) {
        const key = rs.KEYUTIL.getKey(this.privateKey)
        const signature = new rs.KJUR.crypto.Signature({ alg: "SHA1withRSA" })
        signature.init(key)
        signature.updateString(content)
        const originSign = signature.sign()
        const sign64u = rs.hextob64u(originSign)
        return sign64u
    }
    hexToBase64(hex) {
        const bytes = []
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substr(i, 2), 16))
        }
        const base64 = btoa(String.fromCharCode(...bytes))
        return base64
    }
    Sha1withRsa(data) {
        // log(typeof data)
        if (typeof data != 'string') {
            let encodedData = {}
            for (let key in data) {
                encodedData[key] = (data[key])
            }
            data = Object.entries(encodedData).map(([key, value]) => `${key}=${value}`).join('&')
            // console.log(data)
        }

        const { KEYUTIL, KJUR, b64utoutf8, utf8tob64 } = require('jsrsasign')
        const key = KEYUTIL.getKey(this.privateKey)
        const sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' })
        sig.init(key)
        sig.updateString(data)
        const signatureHex = sig.sign()
        let sign = this.hexToBase64(signatureHex)
        return sign
    }

    //AES/DES加解密 0=加密  1=解密
    //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')  AES/DES加解密 0=加密  1=解密
    DecryptCrypto(i, method, mode, padding, data, key, iv) {
        if (i == 0) {
            const encrypted = CryptoJS[method].encrypt(CryptoJS.enc.Utf8.parse(data), CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding],
            })
            return encrypted.toString()
        } else {
            const decrypt = CryptoJS[method].decrypt(data, CryptoJS.enc.Utf8.parse(key), {
                iv: CryptoJS.enc.Utf8.parse(iv),
                mode: CryptoJS.mode[mode],
                padding: CryptoJS.pad[padding],
            })
            return decrypt.toString(CryptoJS.enc.Utf8)
        }
    }
















    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(24)}  ${this.index} ${"•".repeat(24)}\n`)
            this.hasLogged = true
        }
        console.log(`${this.index}-${this.remark},  ${typeof message === "object" ? JSON.stringify(message) : message}`)
        if (p) {
            sendLog.push(`${this.index} ${message}`)
        }
    }
}



async function httpRequest(options) {
    const request = require('request')

    return new Promise((resolve) => {

        request(options, function (error, response) {
            // if (error) throw new Error(error)
            // response.body
            let data = response.body
            try {
                // console.log(typeof (data));
                if (typeof data == "string") {
                    if (isJsonString(data)) {
                        let result = JSON.parse(data)
                        resolve(result)
                    } else {
                        let result = data
                        resolve(result)
                    }
                    function isJsonString(str) {
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
                } else {
                    let result = data
                    resolve(result)
                }
            } catch (e) {
                console.log(error, response)
                console.log(`\n 失败了!请稍后尝试!!`)
            } finally {
                resolve()
            }
        })
    })
}

async function requestPromise(options) {
    const got = require("got")
    let response, body, headers, res
    try {
        if (options.method.toUpperCase() === "GET") delete options.json, options.body, options.from
        if (options.params) {
            options.searchParams = options.params
            delete options.params
        }
        response = await got(options, {
            followRedirect: false,
            https: { rejectUnauthorized: false },
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
        console.log(error)
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
    return { headers, res }
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
    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    await showmsg()
    async function showmsg() {
        if (!sendLog) return
        if (!sendLog.length) return
        let notify = require('./sendNotify')
        console.log('\n============== 本次推送--by_yml ==============')
        await notify.sendNotify(CodeName, sendLog.join('\n'))
    }
    process.exit(0)

}

function wait(min = 2, max = 3) {  //默认等待 2-3 秒， 自定义的话需要两个值
    let s = Math.round(Math.random() * (max - min) + min)
    console.log(`等待 ${s} 秒`)
    return new Promise((resolve) => setTimeout(resolve, s * 1000))
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
            a = myDate.getMonth() + 1
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

function randomString(length, options = { xx: true, dx: true, sz: true }) {
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
