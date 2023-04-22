/*
@蛋炒饭
APP：卡嘉，变量名：kjck
将手机号#登录密码填入变量，多账号换行隔开
功能：签到、评论、分享、发动态，得积分可以在商城兑换实物
定时：一天一次
*/
NAME = `卡嘉`; VALY = ['kjck']
CK = ''
LOGS = 0
commentid = ['学到了', '厉害', '加油哦', '牛', '666', '真的大开眼界了', '一定要好好学习', '惊呆', '格局打开了']

class Bar {
    constructor(str) {
        this.phone = str.split(`#`)[0]
        this.pwd = $.MD5(1, str.split(`#`)[1])
        this.logs = true
        this.comtext = $.randomArr(commentid)
    }
    //登陆
    async login() {
        let body = `{"password":"${this.pwd}","userCode":"${this.phone}"}`
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/jac-admin/admin/userBaseInformation/userLogin`, {}, body)
        if (resp.code == 0) {
            this.no = resp.data.no
            this.name = resp.data.userName
            this.token = resp.data.token
            console.log(`【${this.name}】登陆成功`)
            this.logs = true
        } else {
            this.logs = false
        }
    }
    //签到
    async signin() {
        let body = `{"ruleStr":"SIGN_IN","serviceTypeStr":"SERVICE_FIXED","no":"${this.no}"}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/pluto-membership/integral-gather/addintegral-signIn`, headers, body)
        if (resp.code == 0) {
            console.log(`【${this.name}】签到成功`)
            await $.wait($.RT(15000, 25000))
        } else {
            console.log(`【${this.name}】签到失败`)
        }
    }
    //发布动态
    async moment() {
        await this.dailyoneword()
        let body = `{"uid":"${this.no}","message":"#打卡##${this.word}","imgUrls":"","userLabelCategoryId":791}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/moment/add`, headers, body)
        if (resp.status == 1) {
            console.log(`【${this.name}】发布动态成功`)
            await $.wait($.RT(15000, 25000))
        } else {
            console.log(`【${this.name}】发布动态失败`)
        }
    }
    //文章列表
    async readlist() {
        let body = `{"isNew":1,"uid":"${this.no}","pageNo":${$.RT(1, 100)},"length":5,"labelIds":["VB2018071807034444249"]}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/recommend/recommendList`, headers, body)
        this.list = resp.data
    }
    //分享文章
    async share() {
        await this.readlist()
        let rid = this.list[$.RT(0, 4)].id
        let body = `{"ruleStr":"SHARING_FORWARDING","serviceTypeStr":"SERVICE_FIXED","no":"${this.no}","lid":${rid},"shareflag":""}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/pluto-membership/integral-gather/addintegral-sharingForwarding`, headers, body)
        if (resp.code == 0) {
            console.log(`【${this.name}】分享成功`)
            await $.wait($.RT(15000, 25000))
        } else {
            console.log(`【${this.name}】分享失败`)
        }
    }
    //评论文章
    async comment() {
        await this.readlist()
        let rid = this.list[$.RT(0, 4)].id
        let body = `{"uid":"${this.no}","lid":"${rid}","message":"${this.comtext}"}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/dk-dm-portal-api/userComment/informationComment`, headers, body)
        if (resp.status == 1) {
            console.log(`【${this.name}】评论成功`)
            await $.wait($.RT(15000, 25000))
        } else {
            console.log(`【${this.name}】评论失败`)
        }
    }
    //每日一言
    async dailyoneword() {
        let resp = await $.task('get', `https://v1.jinrishici.com/all.json`, {})
        this.word = resp.content
    }
    //用户信息
    async userinfo() {
        let body = `{"no":"${this.no}"}`
        let headers = {
            channelID: `3`,
            timaToken: this.token,
        }
        let resp = await $.task('post', `https://jacsupperapp.jac.com.cn/zkapi/pluto-membership/plutomembership/integralCount/searchIntegralCountList`, headers, body)
        console.log(`【${this.name}】积分 ${resp.data[0].count}`)
    }

} $ = DD()
!(async () => {
    console.log(`蛋炒饭偷撸脚本，请勿外传，神秘口令：aHR0cHMlM0EvL3QubWUvK05aTGFpVWZHcnl0aE5qSmw=`)
    await $.ExamineCookie()
    if ($.cookie_list.length < 4) {
        await $.Multithreading('login')
        let valid_user_list = $.cookie_list.filter(x => x.logs == true)
        if (valid_user_list.length == 0) {
            console.log(`Cookie格式错误 或 账号被禁封`)
            return
        } else {
            await $.Multithreading('signin')
            await $.Multithreading('moment', 0, 4)
            await $.Multithreading('share')
            await $.Multithreading('comment', 0, 4)
            await $.Multithreading('userinfo')
        }
    } else {
        console.log(`账号数量超过3，请减少账号数量后重试！`)
    }
})()
    .catch(e => { console.log(e) })
    .finally(() => { })


function DD() {
    return new (class {
        constructor() {
            this.cookie_list = []
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
                        let resp = ''
                        if (!err) {
                            if ($.safeGet(data)) {
                                resp = JSON.parse(data)
                            } else if (data.indexOf('/') != -1 && data.indexOf('+') != -1) {
                                resp = $.decrypts(data)
                            } else {
                                resp = data
                            }
                        } else {
                            resp = taskurl + '   API请求失败，请检查网络重试\n' + err
                        }
                        return resolve(resp)
                    }
                })
            })
        }
        //解密
        decrypts(data) {
            //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')
            try {
                return JSON.parse($.DecryptCrypto(0, `AES`, `ECB`, `Pkcs7`, data, this.key1, this.iv))
            } catch (e) {
                return JSON.parse($.DecryptCrypto(0, `AES`, `ECB`, `Pkcs7`, data, this.key2, this.iv))
            }
        }
        //body长度
        lengthInUtf8Bytes(str) {
            let m = encodeURIComponent(str).match(/%[89ABab]/g)
            return str.length + (m ? m.length : 0)
        }
        //随机数组
        randomArr(arr) {
            return arr[parseInt(Math.random() * arr.length, 10)]
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
        //随机$.udid  0=大写  1=小写
        udid(str) {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            let uuid = S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
            if (str == 0) {
                return uuid.toUpperCase()
            } else {
                return uuid.toLowerCase()
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
        MD5(i, str) {
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
            nodersa.setOptions({ encryptionScheme: 'pkcs1' })
            return nodersa.encrypt(msg, 'base64', 'utf8')
        }
        SHA_RSA(str, Keys) {
            let key = this.Sha_Rsa.KEYUTIL.getKey('-----BEGIN PRIVATE KEY-----\n' + $.getNewline(Keys, 76) + '\n-----END PRIVATE KEY-----')
            let signature = new this.Sha_Rsa.KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
            signature.init(key)
            signature.updateString(str)
            let originSign = signature.sign()
            let sign64u = this.Sha_Rsa.hextob64u(originSign)
            return sign64u
        }
    })()
}