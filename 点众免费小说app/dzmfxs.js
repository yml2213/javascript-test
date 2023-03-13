/*
点众免费小说 app             cron 25 6-23 * * *  dzmfxs.js


23/2/25      

-------------------  青龙-配置文件-复制区域  -------------------
# 点众免费小说
export dzmfxs=" 解密后的数据  @  解密后的数据 "  

解密 xgmf.zuanqianyi.com/glory/free/1601 的 param 参数即可
自动提现请设置 smdid  找 1703 包的 body信息  然后解密即可  start_ 不需要

多账号用 换行 或 @ 分割  

tg频道: https://t.me/yml2213_tg  


*/
const $ = Env('点众免费小说')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['dzmfxs']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
let ok_arr = []

let smdid = 'DeyJvcyI6ImFuZHJvaWQiLCJlbmNvZGUiOjEsImRhdGEiOiJleUpoTVNJNkltVjRZMlZ3ZEdsdmJpSXNJbUUySWpvaVlXNWtjbTlwWkNJc0ltRTNJam9pTXk0d0xqY2lMQ0poTWlJNklpSXNJbUV4TUNJNklqRXlJaXdpWVRFeklqb2lUVEl4TURKS01sTkRJaXdpWVRrMklqb2lJaXdpWVRFeElqb2lJaXdpWVRrNElqb2lJaXdpWlNJNkltcGhkbUV1YkdGdVp5NUpiR3hsWjJGc1FXTmpaWE56UlhoalpYQjBhVzl1T2lCemJYTmtheUJ1YjNRZ2FXNXBkQ0ZjYmx4MFlYUWdZMjl0TG1semFIVnRaV2t1YzIxaGJuUnBabkpoZFdRdVUyMUJiblJwUm5KaGRXUXVaMlYwUkdWMmFXTmxTV1FvVlc1cmJtOTNiaUJUYjNWeVkyVTZNeklwWEc1Y2RHRjBJSGcwTG1JdVl5aFRiM1Z5WTJWR2FXeGxPaklwWEc1Y2RHRjBJSEUxTG1ZdVoyVjBRWEJ3UkdGMFlTaFRiM1Z5WTJWR2FXeGxPalFwWEc1Y2RHRjBJR0Z1WkhKdmFXUXViM011VFdWemMyRm5aVkYxWlhWbExtNWhkR2wyWlZCdmJHeFBibU5sS0U1aGRHbDJaU0JOWlhSb2IyUXBYRzVjZEdGMElHRnVaSEp2YVdRdWIzTXVUV1Z6YzJGblpWRjFaWFZsTG01bGVIUW9UV1Z6YzJGblpWRjFaWFZsTG1waGRtRTZNek0zS1Z4dVhIUmhkQ0JoYm1SeWIybGtMbTl6TGt4dmIzQmxjaTVzYjI5d1QyNWpaU2hNYjI5d1pYSXVhbUYyWVRveE5qZ3BYRzVjZEdGMElHRnVaSEp2YVdRdWIzTXVURzl2Y0dWeUxteHZiM0FvVEc5dmNHVnlMbXBoZG1FNk1qazVLVnh1WEhSaGRDQmhibVJ5YjJsa0xtOXpMa2hoYm1Sc1pYSlVhSEpsWVdRdWNuVnVLRWhoYm1Sc1pYSlVhSEpsWVdRdWFtRjJZVG8yTnlsY2JpSXNJbUU1TnlJNklpSjkiLCJ0biI6IiIsImVwIjoiIn0='
//====================================================================================================


async function userTasks() {

    // $.log('登录', { sp: true, console: false })  // 带分割的打印
    // let list = []
    // for (let user of $.userList) {
    //     list.push(user.get_iv())
    // }
    // await Promise.all(list)


    $.log('任务列表', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            // list.push(user.tasklist())
            list.push(user.task())
        }
    }
    await Promise.all(list)


    $.log('积分查询', { sp: true, console: false })
    list = []
    for (let user of $.userList) {
        if (user.ckFlog) {
            list.push(user.check())
        }
    }
    await Promise.all(list)

    // console.log(ok_arr)

}


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck
        this.appId = '105291391'
        this.key = 'dzkjgfyxgshylgzm'
        this.iv = 'apiupdownedcrypt'
        this.salt = 'b5d906bfe573ec7b0eb3d9f96d3513ed'

        this.hd = {
            'Host': 'api.qd-metro.com',
            'User-Agent': 'okhttp/3.12.0'
        }
        this.pk = `-----BEGIN PRIVATE KEY-----
        MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCKeaOFPXGp7N80uoPzQ8Ncz9fy
    PM8fvKj52szC4bSFWuS66ZZdo/vHFj4zLahQ2slL/begQfGSC4elaaX1wpFgEbyucYyulDOcHz0O
    5vvQDtySpnEu4b3AX2JfhQKtEJdK1pwDgzV+uLi0T2wBua7NADyiVL9J1KiVrywDKN+pclgVy2+s
    qK1wKWWKMha2HS/NlqfmNyxCdvnTuE6D20lIsPUmrkE2ZwkrlqivHTI4gWh6ONqjtPSd76lhgBV2
    svO9D7aMRz96BcV4XVqYdBXzbArOmd/rfXFWty6spGqqCBcHX79QUwarNVWrK7cprPZMatx3Y4N5
    pIait/F9c3jBAgMBAAECggEBAIfJmdDJHNF9Zq8lCskcNNGpOl/ew1iivqwro0ii3Us7gznKXtm6
    OOXT6PB0oC2RLX1n8Y2jvIfy6HQK8mPZBIdJPVVuIX778tPwSgZ3+IvgVukzb5+CW3jtz+BM5P/i
    WglYAyrqmiWGbBDcJNRYSZHa3ppsMhvq/dmyKZ17kj9sVRaJXauejkbhiIYKpOFXdYnPGQEU1sMj
    YNfSzo7h3OtfunFuPuQ+TCTHUetkJHy2cMy3bYsl/diRmvM+dqOJit+uFDVAxxg/j4LDu1q4yHhQ
    ofJ8/kpQNRYDOT1xi/vKPf+XoLwHns9fw/Azv1JCg76kc0uMIA5EzXyCIME0VHUCgYEA8cwQk/he
    Ab8OiUgSc1YRE7ztGFYMBZ838LVUboIX38h4EeCBlsrlNhQoXEbuXh+x1kVKElURwLA8BJoXJMyQ
    fAvi8QWkfTPWGm0b7V0KMdCWW9oM00nU5iVyFWkk2mAn+/j8uvVqlUVEDtWFgQZ/QefPS25jzuDf
    yuZ1fe4Yp2sCgYEAkpvoZ6ECt46Tn2t+4EuE2aSegd8CvzGwGHZeBIt6utfWO6bLr5vHS529qb3d
    KL41019P9oiRR/SSTLZSsVOsAytv1JMEPeoDY3Fxh/GULODkLq2NnapskQP11XlDt7xjazeJsxS8
    s2KP6yeA63dxOZ3iv4C0nCgIJ7gSCe+dp4MCgYBsbhNdF7qoU9Ij8+L6P7VGwakdCbE4cC74zYgA
    SmyEWPSnJ6NVSMVC3AVBZDmOke4A5W+TCvz8CMvRUHxiby23wujRJrOdxboUfatRZTCmKCDVLdIk
    ie5kCpS/TzhMiWRE1WIYQOe76qTbdhr5Qj2dA2PtMqKlaihRZ8l2YGhD4wKBgQCHJ8WzqyJ3F7CN
    2iqIGfaqMfGSZoYAvozJsG1yISeOkiXErjq+dIzg79WGYys8QUYby5VLAJF2VUh+AeLv6OP9tBCP
    Vs0lStO+3Dk+iv3/9X9GbObN/+vAMHd0Siucecbpc7S07Bwd/3IP5kYaTO2LoTsFMmDOSLVj8HRo
    xoZ/gwKBgQCXjMPO9bnv03JYQ3EzJbM1UuokRu0iXRaZ3BzRj3jHBKELrsKBDXNdaJLUJyqDQJE1
    8lJJRQC+JciNA5kFuzdLjwfu4GHIHFXQSBuNdz8BKXPltxjBObhr9ycNeLXWIQnZo0iGQiHc/+6a
    C88cw4gGZtuW+gWRa7QxTtgTNWrbgw==
        -----END PRIVATE KEY-----`
    }



    async task() {
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
            1278, 1273, 1274, 1277, 1279, 1280, 1281, 47
        ]
        // for (let index = 1000; index < 2000; index++) {
        //     await this.dotask(index)
        // }

        for (let id of qd) {
            await this.dotask(id)
            await $.wait(2)
        }

    }




    async dotask(id) { // 做任务 
        let ts = this.ts14()
        let a = this.ck
        let param = this.aes_encrypt(a)
        // console.log(param)

        let e = `{"taskId":${id}}`
        // let aa = `appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230225081835{"taskId":1156}b5d906bfe573ec7b0eb3d9f96d3513ed`
        let p = `appId=${this.appId}&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=${ts}`
        let b = `${p}${e}${this.salt}`
        // console.log(b)
        let sign = this.SHA256withRSA(b)
        // console.log(sign)
        let body = `start_${this.aes_encrypt(e)}`
        // console.log('body: ', body)
        let options = {
            fn: '做任务',
            method: 'post',
            url: `https://xgmf.zuanqianyi.com/glory/free/1601?${p}`,
            headers: {
                'param': param,
                'sign': sign,
                'signtype': '2',
                'content-type': 'application/json; charset=utf-8'
            },
            body: body
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let result = JSON.parse(this.aes_decrypt(resp))
        // console.log(typeof (resp))
        // console.log(result)

        if (result.data.code == 0) {
            // console.log(result.data.message)
            $.log(`${this.idx}: ${id} ==> ${result.data.message}`)
            ok_arr.push(id)
        } else if (result.data.code == 103) {
            // console.log(result.data.message)
            $.log(`${this.idx}: ${result.data.message}`)
        } else if (result.data.code == 102) {
            // console.log(result.data.message)
            $.log(`${this.idx}: ${result.data.message}`)
        } else console.log(`${options.fn}: 失败, ${JSON.stringify(result)} `)

    }


    // https://xgmf.zuanqianyi.com/glory/free/1701?appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230225094419
    async check() { // 查询
        let ts = this.ts14()
        let a = this.ck
        let param = this.aes_encrypt(a)
        // console.log(param)

        let e = `{}`
        // let aa = `appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230225081835{"taskId":1156}b5d906bfe573ec7b0eb3d9f96d3513ed`
        let qs = `appId=${this.appId}&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=${ts}`
        let b = `${qs}${e}${this.salt}`
        // console.log(b)
        let sign = this.SHA256withRSA(b)
        // console.log(sign)
        let body = `start_${this.aes_encrypt(e)}`
        // console.log('body: ', body)


        let options = {
            fn: '查询',
            method: 'post',
            url: `https://xgmf.zuanqianyi.com/glory/free/1701?${qs}`,
            headers: {
                'param': param,
                'sign': sign,
                'signtype': '2',
                'content-type': 'application/json; charset=utf-8'
            },
            body: body
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        // console.log(resp)
        let result = JSON.parse(this.aes_decrypt(resp))
        // console.log(typeof (resp))
        // console.log(result)

        if (result.retCode == 0) {
            // console.log(result.data.message)
            this.coin = result.data.goldCoinNum
            this.cash = result.data.cashAmount
            $.log(`${this.idx}:  ${result.data.wechatBindInfo.nickname}, 金币:${this.coin} == ${this.cash} 元`, { notify: true })
            console.log(this.cash)
            if (this.cash >= 3) {
                await this.cash()
            }
        } else console.log(`${options.fn}: 失败, ${JSON.stringify(result)} `)

    }

    // https://xgmf.zuanqianyi.com/glory/free/1703?appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230306123820
    async cash() { // 提现
        let ts = this.ts14()
        let a = this.ck
        let param = this.aes_encrypt(a)
        // console.log(param)

        let e = `{"amountId":24,"smdid":"${smdid}"}`
        // let aa = `appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230306123820{"amountId":24,"smdid":"DeyJvcyI6ImFuZHJvaWQiLCJlbmNvZGUiOjEsImRhdGEiOiJleUpoTVNJNkltVjRZMlZ3ZEdsdmJpSXNJbUUySWpvaVlXNWtjbTlwWkNJc0ltRTNJam9pTXk0d0xqY2lMQ0poTWlJNklpSXNJbUV4TUNJNklqRXlJaXdpWVRFeklqb2lUVEl4TURKS01sTkRJaXdpWVRrMklqb2lJaXdpWVRFeElqb2lJaXdpWVRrNElqb2lJaXdpWlNJNkltcGhkbUV1YkdGdVp5NUpiR3hsWjJGc1FXTmpaWE56UlhoalpYQjBhVzl1T2lCemJYTmtheUJ1YjNRZ2FXNXBkQ0ZjYmx4MFlYUWdZMjl0TG1semFIVnRaV2t1YzIxaGJuUnBabkpoZFdRdVUyMUJiblJwUm5KaGRXUXVaMlYwUkdWMmFXTmxTV1FvVlc1cmJtOTNiaUJUYjNWeVkyVTZNeklwWEc1Y2RHRjBJSGcwTG1JdVl5aFRiM1Z5WTJWR2FXeGxPaklwWEc1Y2RHRjBJSEUxTG1ZdVoyVjBRWEJ3UkdGMFlTaFRiM1Z5WTJWR2FXeGxPalFwWEc1Y2RHRjBJR0Z1WkhKdmFXUXViM011VFdWemMyRm5aVkYxWlhWbExtNWhkR2wyWlZCdmJHeFBibU5sS0U1aGRHbDJaU0JOWlhSb2IyUXBYRzVjZEdGMElHRnVaSEp2YVdRdWIzTXVUV1Z6YzJGblpWRjFaWFZsTG01bGVIUW9UV1Z6YzJGblpWRjFaWFZsTG1waGRtRTZNek0zS1Z4dVhIUmhkQ0JoYm1SeWIybGtMbTl6TGt4dmIzQmxjaTVzYjI5d1QyNWpaU2hNYjI5d1pYSXVhbUYyWVRveE5qZ3BYRzVjZEdGMElHRnVaSEp2YVdRdWIzTXVURzl2Y0dWeUxteHZiM0FvVEc5dmNHVnlMbXBoZG1FNk1qazVLVnh1WEhSaGRDQmhibVJ5YjJsa0xtOXpMa2hoYm1Sc1pYSlVhSEpsWVdRdWNuVnVLRWhoYm1Sc1pYSlVhSEpsWVdRdWFtRjJZVG8yTnlsY2JpSXNJbUU1TnlJNklpSjkiLCJ0biI6IiIsImVwIjoiIn0="}b5d906bfe573ec7b0eb3d9f96d3513ed`
        let qs = `appId=${this.appId}&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=${ts}`
        let b = `${qs}${e}${this.salt}`
        // console.log(b)
        let sign = this.SHA256withRSA(b)
        // console.log(sign)
        let body = `start_${this.aes_encrypt(e)}`
        // console.log('body: ', body)


        let options = {
            fn: '提现',
            method: 'post',
            url: `https://xgmf.zuanqianyi.com/glory/free/1703?${qs}`,
            headers: {
                'param': param,
                'sign': sign,
                'signtype': '2',
                'content-type': 'application/json; charset=utf-8'
            },
            body: body
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        let result = JSON.parse(this.aes_decrypt(resp))
        // console.log(typeof (resp))
        // console.log(result)

        if (result.retCode == 0) {
            // console.log(result.data.message)
            $.log(`${this.idx}:  提现 3 元, ${result.data.retMsg}`, { notify: true })
        } else console.log(`${options.fn}: 失败, ${JSON.stringify(result)} `)

    }



    aes_encrypt(word) { // aes 加密
        let key = this.key
        let iv = this.iv
        key = crypto.enc.Utf8.parse(key)
        iv = crypto.enc.Utf8.parse(iv)
        let srcs = crypto.enc.Utf8.parse(word)
        // 加密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
        let encrypted = crypto.AES.encrypt(srcs, key, {
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        })
        return crypto.enc.Hex.stringify(encrypted.ciphertext) //返回 Hex
    }



    aes_decrypt(word) {
        let key = this.key
        let iv = this.iv
        key = crypto.enc.Utf8.parse(key)
        iv = crypto.enc.Utf8.parse(iv)
        let base64 = crypto.enc.Hex.parse(word)
        let src = crypto.enc.Base64.stringify(base64)
        // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
        let decrypt = crypto.AES.decrypt(src, key, {
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        })
        let decryptedStr = decrypt.toString(crypto.enc.Utf8)
        return decryptedStr.toString()

    }

    async aes_decrypt_bk(word) {
        console.log(`==========555===`)
        let key = this.key
        let iv = this.iv
        key = crypto.enc.Utf8.parse(key)
        iv = crypto.enc.Utf8.parse(iv)
        let base64 = crypto.enc.Base64.parse(word)
        let src = crypto.enc.Base64.stringify(base64)
        // 解密模式为CBC，补码方式为PKCS5Padding（也就是PKCS7）
        let decrypt = crypto.AES.decrypt(src, key, {
            iv: iv,
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        })
        let decryptedStr = decrypt.toString(crypto.enc.Utf8)
        return decryptedStr.toString()

    }



    SHA256withRSA(inputString) {
        var rs = require("jsrsasign")
        let { KEYUTIL, KJUR, hextob64, hextob64u } = rs
        const key = KEYUTIL.getKey(this.pk)
        // 创建 Signature 对象，设置签名编码算法
        const signature = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
        // 初始化
        signature.init(key)
        // 传入待加密字符串
        signature.updateString(inputString)
        // 生成密文
        const originSign = signature.sign()
        const sign64 = hextob64(originSign)
        // console.log('sign base64 =======', sign64)
        // const sign64u = hextob64u(originSign)
        // console.log('sign base64u=======', sign64u)
        return sign64
    }


    ts14() {
        let date = new Date()
        function up0(m) {
            if (m.toString().length == 1) {
                m = `0${m}`
            }
            return m
        }
        // 直接打印当前时间
        // console.log(date)
        let y = date.getFullYear()
        let mo = date.getMonth() + 1
        mo = up0(mo)
        let d = date.getDate()
        d = up0(d)
        let h = date.getHours() - 8
        h = up0(h)
        let m = date.getMinutes()
        m = up0(m)
        let s = date.getSeconds()
        s = up0(s)
        let aa = `${y}${mo}${d}${h}${m}${s}`
        // console.log(aa)
        return aa

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

        async request(opt) {
            const got = require('got')
            let DEFAULT_TIMEOUT = 8000      // 默认超时时间
            let resp = null, count = 0
            let fn = opt.fn || opt.url
            let resp_opt = opt.resp_opt || 'body'
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
            if (resp_opt == 'body') {
                return Promise.resolve(body)
            } else if (resp_opt == 'hd') {
                return Promise.resolve(headers)
            } else if (resp_opt == 'statusCode') {
                return Promise.resolve(statusCode)
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