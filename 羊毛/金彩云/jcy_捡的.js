/*

抓包access-api-token#access-auth-id作为变量，多账号换行

*/

NAME = `金彩云`;
VALY = ['jcyck']
CK = '02a8ed95f7b4451589a4bd2e5138384a#1f1a7f6db8e00e268fb98b8bc0501751'
LOGS = 0;
usid = 0
Notify = 1


class Bar {
    constructor(str) {
        this.token = str.split('#')[0]
        this.auth = str.split('#')[1]
        this.did = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        this._ = ++usid
        this.f = `小主 [${this._}] `
        this.message = ''
        this.logs = true
    }


//登陆
    async login() {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&debug=0&&device_id=${this.did}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&userId=&&35c782a2`)
        let headers= {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "access-type": "app",
        }
        let body = `{"debug":0,"userId":""}`
        let res = await $.task('post', `https://op-api.cloud.jinhua.com.cn/api/member/login`, headers, body)
        console.log(res)
        if (res.code == 0) {
            this.signkey = res.data.key
            this.tokens = res.data.token
            console.log(`${this.f}登陆成功啦！！`)
            this.logs = true
        } else {
            this.logs = false
        }
    }

//福利中心
    async welfare() {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let res = await $.task('get', `https://op-api.cloud.jinhua.com.cn/api/welfare/info`, headers)
        if (res.code == 0) {
            console.log(`${this.f}当前金币:${res.data.gold},当前余额:${res.data.cash}元`)
        }
    }

//在线任务
    async onlinetask() {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let res = await $.task('get', `https://op-api.cloud.jinhua.com.cn/api/welfare/online`, headers)
        if (res.code == 0) {
            for (let aa of res.data.list) {
                if (aa.complete == 0) {
                    await this.doonlinetask(aa.id, aa.score)
                }
            }
        }
    }

    async doonlinetask(id, score) {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&id=${id}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let body = `{"id":${id}}`
        let res = await $.task('post', `https://op-api.cloud.jinhua.com.cn/api/welfare/online/getGold`, headers, body)
        if (res.code == 0) {
            console.log(`${this.f}领取在线时长奖励成功，领取${score}金币`)
            await $.wait(3000, 6000)
        }
    }

//宝箱任务列表(0,6-23整点任务)
    async boxtask() {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let res = await $.task('get', `https://op-api.cloud.jinhua.com.cn/api/welfare/task/box`, headers)
        if (res.code == 0) {
            for (let aa of res.data.list) {
                const currentTime = new Date();
                const startTime = new Date(aa.startTime);
                const endTime = new Date(aa.endTime);
                if (aa.complete == 0 && currentTime >= startTime && currentTime <= endTime) {
                    await this.doboxtask(aa.id, aa.score)
                }
            }
        }
    }

    async doboxtask(id, score) {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&id=${id}&&nonce_str=${nonce}&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let body = `{"id":${id}}`
        let res = await $.task('post', `https://op-api.cloud.jinhua.com.cn/api/welfare/task/box/getGold`, headers, body)
        console.log(res)
        if (res.code == 0) {
            console.log(`${this.f}整点领取宝箱奖励成功，领取${score}金币`)
            await $.wait(3000, 6000)
        }
    }

//阅读新闻任务
    async readtasklist() {
        let ts = $.time(13)
        let nonce = $.SJS(8, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(4, 1) + '-' + $.SJS(12, 1)
        let sign = $.SHA_Encrypt(1, 'SHA256', `app_id=wxc097803934a957eb&&auth_id=${this.auth}&&device_id=${this.did}&&nonce_str=${nonce}&&page=1&&pageSize=2&&source_type=app&&timestamp=${ts}&&token=${this.token}&&${this.signkey}`)
        let headers = {
            "access-auth-id": this.auth,
            "access-api-signature": sign,
            "access-nonce-str": nonce,
            "access-device-id": this.did,
            "access-timestamp": ts,
            "access-api-token": this.token,
            "access-app-id": "wxc097803934a957eb",
            "authorization": `Bearer ${this.tokens}`,
            "access-type": "app",
        }
        let res = await $.task('get', `https://op-api.cloud.jinhua.com.cn/api/welfare/task/challenge/list?page=1&pageSize=2`, headers)
        console.log(res.data.list)
    }


}

$ = DD()
!(async () => {
    console.log(NAME)
    await $.ExamineCookie()
    await $.Multithreading('login')
    let valid_user_list = $.cookie_list.filter(x => x.logs == true)
    if (valid_user_list.length == 0) {
        console.log(`Cookie格式错误 或 账号被禁封`)
        return
    } else {
        await $.Multithreading('welfare')
        await $.Multithreading('onlinetask')
        await $.Multithreading('boxtask')
        await $.Multithreading('readtasklist')


    }
    let message = [];
    for (let user of $.cookie_list) {
        if (user.message) message.push(user.message);
    }
    if (message.length > 0) await $.SendMsg(message.join('\n'));
})()
    .catch(e => {
        console.log(e)
    })
    .finally(() => {
    })


function DD() {
    return new (class {
        constructor() {
            this.cookie_list = []
            this.message = ''
            this.CryptoJS = require('crypto-js')
            this.NodeRSA = require('node-rsa')
            this.request = require('request')
            this.Sha_Rsa = require('jsrsasign')
        }

        //多线程
        async Multithreading(taskName, id, thread) {
            let workGroup = []
            if (!thread) {
                thread = 1
            }
            while (thread--) {
                for (let user of $.cookie_list) {
                    workGroup.push(user[taskName](id))
                }
            }
            await Promise.allSettled(workGroup)
        }

        //变量检查
        ExamineCookie() {
            let ckStr = process.env[VALY] || CK
            let userCount = 0
            if (ckStr) {
                for (let userCookies of ckStr.split('\n').filter(x => !!x)) {
                    $.cookie_list.push(new Bar(userCookies))
                }
                userCount = $.cookie_list.length
            } else {
                console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
            }
            console.log(`共找到${userCount}个账号`)
            return $.cookie_list
        }

        // 运行模块 get post put delete patch head options
        task(method, taskurl, taskheader, taskbody, taskhost) {
            if (method == 'delete') {
                method = method.toUpperCase()
            } else {
                method = method
            }
            if (method == 'post') {
                delete taskheader['content-type']
                delete taskheader['Content-type']
                delete taskheader['content-Type']
                if ($.safeGet(taskbody)) {
                    taskheader['Content-Type'] = 'application/json;charset=UTF-8'
                } else {
                    taskheader['Content-Type'] = 'application/x-www-form-urlencoded'
                }
                if (taskbody) {
                    taskheader['Content-Length'] = $.lengthInUtf8Bytes(taskbody)
                }
            }
            if (method == 'get') {
                delete taskheader['content-type']
                delete taskheader['Content-type']
                delete taskheader['content-Type']
                delete taskheader['Content-Length']
            }
            taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
            return new Promise(async resolve => {
                if (method.indexOf('T') < 0) {
                    var httpget = {
                        url: taskurl,
                        headers: taskheader,
                        body: taskbody,
                        //timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                } else {
                    var httpget = {
                        url: taskurl,
                        headers: taskheader,
                        form: JSON.parse(taskbody),
                        //timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                }
                if (!taskhost) {
                    delete httpget['proxy']
                }
                this.request[method.toLowerCase()](httpget, (err, response, data) => {
                    try {
                        if (data) {
                            if (LOGS == 1) {
                                console.log(`================ 请求 ================`)
                                console.log(httpget)
                                console.log(`================ 返回 ================`)
                                if ($.safeGet(data)) {
                                    console.log(JSON.parse(data))
                                } else {
                                    console.log(data)
                                }
                            }
                        }
                    } catch (e) {
                        console.log(e, taskurl + '\n' + taskheader)
                    } finally {
                        let res = ''
                        if (!err) {
                            if ($.safeGet(data)) {
                                res = JSON.parse(data)
                            } else if (data.indexOf('/') != -1 && data.indexOf('+') != -1) {
                                //res = $.decrypts(data)
                                res = data
                            } else {
                                res = data
                            }
                        } else {
                            res = taskurl + '   API请求失败，请检查网络重试\n' + err
                        }
                        return resolve(res)
                    }
                })
            })
        }

        async SendMsg(message) {
            if (!message) return;
            if (Notify == 1) {
                var notify = require("./sendNotify");
                await notify.sendNotify(NAME, message);
            } else {
                //  console.log(message);
            }
        }

        //body长度
        lengthInUtf8Bytes(str) {
            let m = encodeURIComponent(str).match(/%[89ABab]/g)
            return str.length + (m ? m.length : 0)
        }

        //随机数组
        randomArr(arr) {
            return arr[parseInt(Math.random() * arr.length, 10)];
        }

        //延迟
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        //当前时间戳s=10位时间戳或13位时间戳
        time(s) {
            if (s == 10) {
                return Math.round(+new Date() / 1000)
            } else {
                return +new Date()
            }
        }

        //时间戳格式化日期
        timenow(str) {
            let date = new Date()
            if (str == undefined) {
                let date = new Date(),
                    N = date.getFullYear() + '-',
                    Y = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                    R = date.getDate() + ' ',
                    S = date.getHours() + ':',
                    F = date.getMinutes() + ':',
                    M = date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
                return N + Y + R + S + F + M
            } else if (str == 0) {
                //年
                return date.getFullYear()
            } else if (str == 1) {
                //月
                return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
            } else if (str == 2) {
                //日
                return date.getDate()
            } else if (str == 3) {
                //时
                return date.getHours()
            } else if (str == 4) {
                //分
                return date.getMinutes()
            } else if (str == 5) {
                //秒
                return date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
            }
        }

        //数据检查
        safeGet(data) {
            try {
                if (typeof JSON.parse(data) == 'object') {
                    return true
                }
            } catch (e) {
                return false
            }
        }

        //随机字符
        SJS(len, t) {
            if (t == 0) {
                let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            } else if (t == 1) {
                let chars = 'qwertyuiopasdfghjklzxcvbnm0123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            } else {
                let chars = '0123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            }
        }

        //  .toUpperCase()  转化大写
        //  .toLowerCase()  转化小写
        //console.log(...new Set(arr))去重
        //KEY = [...new Set(KEY.filter(item => !!item))]
        //filter(item => !!item) 过滤1!=1
        //Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
        //es编码  escape("中文")
        //es解码  unescape("%u4E2D%u6587")
        //URI编码  encodeURI("中文") 不完全
        //URI解码  decodeURI("%E4%B8%AD%E6%96%87")  不完全
        //URIC编码  encodeURIComponent("中文")
        //URIC解码  decodeURIComponent("%E4%B8%AD%E6%96%87")
        //str编码
        encodeUnicode(str) {
            var res = []
            for (var i = 0; i < str.length; i++) {
                res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
            }
            return '\\u' + res.join('\\u')
        }

        base64ToHex(base64) {
            const binaryStr = atob(base64);
            const uint8Array = new Uint8Array(binaryStr.length);
            for (let i = 0; i < binaryStr.length; i++) {
                uint8Array[i] = binaryStr.charCodeAt(i);
            }
            let hex = "";
            for (let i = 0; i < uint8Array.length; i++) {
                const byte = uint8Array[i].toString(16).padStart(2, "0");
                hex += byte;
            }
            return hex;
        }

        //str解码
        decodeUnicode(str) {
            str = str.replace(/\\u/g, '%u')
            return unescape(unescape(str))
        }

        RT(X, Y) {
            return Math.round(Math.random() * (Y - X) + X)
        }

        //去除数组空值 console.log($.arrNull(['A', '', 'B', null, undefined, 'C', '  ']))
        arrNull(arr) {
            var r = arr.filter(s => {
                return s && s.trim()
            })
            return r
        }

        //国际标准时间
        nowtime() {
            return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
        }

        //日期格式化时间戳
        timecs() {
            let newtime = $.nowtime()
            if (JSON.stringify(newtime).indexOf(' ') >= 0) {
                newtime = newtime.replace(' ', 'T')
            }
            return new Date(newtime).getTime() - 8 * 60 * 60 * 1000
        }

        //键值对转json  $.rtjson(str, '&', '=',1)
        rtjson(input, apart, apart2, i) {
            if (i == 0) {
                return JSON.stringify(
                    input.split(apart).reduce((sum, item) => {
                        let temp = item.split(apart2)
                        sum[temp[0].trim()] = temp[1].trim()
                        return sum
                    }, {})
                )
            } else {
                return input.split(apart).reduce((sum, item) => {
                    let temp = item.split(apart2)
                    sum[temp[0].trim()] = temp[1].trim()
                    return sum
                }, {})
            }
        }

        //md5加密 0=32位小写,1=32位大写,2=中间16位小写,3=中间16位大写
        MD5Encrypt(i, str) {
            if (i == 0) {
                return this.CryptoJS.MD5(str).toString().toLowerCase()
            } else if (i == 1) {
                return this.CryptoJS.MD5(str).toString().toUpperCase()
            } else if (i == 2) {
                return this.CryptoJS.MD5(str).toString().substring(8, 24).toLowerCase()
            } else if (i == 3) {
                return this.CryptoJS.MD5(str).toString().substring(8, 24).toUpperCase()
            }
        }

        //SHA类：SHA1,SHA3,SHA224,SHA256,SHA384,SHA512,RIPEMD160
        //SHA类加密方式  使用：SHA_Encrypt(0, 'SHA1', str) 或 SHA_Encrypt(1,'SHA256', str)
        //0表示加密后编码，1直接使用hex格式
        SHA_Encrypt(i, Encrypt, str) {
            if (i == 0) {
                return this.CryptoJS[Encrypt](str).toString(this.CryptoJS.enc.Base64)
            } else {
                return this.CryptoJS[Encrypt](str).toString()
            }
        }

        //HmacSHA类：HmacSHA1,HmacSHA3,HmacSHA224,HmacSHA256,HmacSHA384,HmacSHA512,HmacRIPEMD160
        //0表示加密后编码，1直接使用hex格式
        //SHA类加密方式  使用：SHA_Encrypt(0,'HmacSHA1', str,key) 或 SHA_Encrypt(1,'HmacSHA256', str,key)
        HmacSHA_Encrypt(i, Encrypt, str, key) {
            if (i == 0) {
                return this.CryptoJS[Encrypt](str, key).toString(this.CryptoJS.enc.Base64)
            } else {
                return this.CryptoJS[Encrypt](str, key).toString()
            }
        }

        //Base64 0=编码 1=解码
        Base64(i, str) {
            if (i == 0) {
                return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(str))
            } else {
                return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(str))
            }
        }

        //AES/DES加解密 0=加密  1=解密
        //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')
        DecryptCrypto(i, method, mode, padding, data, key, iv) {
            if (i == 0) {
                const encrypted = this.CryptoJS[method].encrypt(this.CryptoJS.enc.Utf8.parse(data), this.CryptoJS.enc.Utf8.parse(key), {
                    iv: this.CryptoJS.enc.Utf8.parse(iv),
                    mode: this.CryptoJS.mode[mode],
                    padding: this.CryptoJS.pad[padding],
                })
                return encrypted.toString()
            } else {
                const decrypt = this.CryptoJS[method].decrypt(data, this.CryptoJS.enc.Utf8.parse(key), {
                    iv: this.CryptoJS.enc.Utf8.parse(iv),
                    mode: this.CryptoJS.mode[mode],
                    padding: this.CryptoJS.pad[padding],
                })
                return decrypt.toString(this.CryptoJS.enc.Utf8)
            }
        }

        //RSA加密
        RSA(msg, Key) {
            const NodeRSA = require('node-rsa')
            let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
            nodersa.setOptions({encryptionScheme: 'pkcs1'})
            return nodersa.encrypt(msg, 'base64', 'utf8')
        }

        getSHA1withRSA(content) {
            const key = rs.KEYUTIL.getKey(privateKeyString);
            const signature = new rs.KJUR.crypto.Signature({alg: "SHA1withRSA"});
            signature.init(key);
            signature.updateString(content);
            const originSign = signature.sign();
            const sign64u = rs.hextob64u(originSign);
            return sign64u;
        }

        hexToBase64(hex) {
            const bytes = [];
            for (let i = 0; i < hex.length; i += 2) {
                bytes.push(parseInt(hex.substr(i, 2), 16));
            }
            const base64 = btoa(String.fromCharCode(...bytes));
            return base64;
        }

        Sha1withRsa(data) {
            const {KEYUTIL, KJUR, b64utoutf8, utf8tob64} = require('jsrsasign');
            const key = KEYUTIL.getKey(Key);
            const sig = new KJUR.crypto.Signature({alg: 'SHA1withRSA'});
            sig.init(key);
            sig.updateString(data);
            const signatureHex = sig.sign();
            let sign = $.hexToBase64(signatureHex)
            return sign;
        }
    })()
}