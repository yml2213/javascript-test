NAME = `青岛地铁`
VALY = ['qddt_cookie']

CK = ''

LOGS = 1 //0 日志
DECODE = 1 //0 cookie解码

$ = Tom()
class tom {
    constructor(str) {
        this.login = true
        this.user_name = str.split('||')[0]
        this.notify = str.split('||')[2]
        this.token = str.split('||')[1].split('@')[0]
        this.deviceCoding = str.split('||')[1].split('@')[1]
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;app/qdmetro;app_version/4.1.4',
            Origin: 'https://appcdn.qd-metro.com',
            Referer: 'https://appcdn.qd-metro.com/file/MetroH5/integral/',
        }
        this.key =
            'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7iUFO+72knVUvymgXNvR7Tpv1J/krOQeV8pFxBkmtCvfVwkpu5nsthPyxt0rYlKnRQQZlFkVlr7cT62drLHZicDSi0ojvSmEhpNAQlue9HWXPhob4dXgxpGsRmCSYiv8naHsyRiApR9O2lvzNa6WK4MP/Tfo9phVk5Ipa3HCiVZY3YSd7cWAImyrY9fsFSOvc1zd0k2vmkPE0nKAI+l5Mv7eAglPYfDw6oRXwGEjdGVtRduyfmy5YeyLEbNIRcFhHiHHoWcQvByEAgXbjOKG/Om3hsA3eeUw70f+9sMdv7uwZm6E1Y50TnQzsP03Co4WpPEVH0+zMVoAIigrjL0YNAgMBAAECggEAHphx8zTW57hTYYygFsl8cXGNuB1hZU/UkP4WBF6GPpj/ffxIsHchuXds0oGY0GTQn7cAGBXeFIzqTXGmWbHTTpQHwliexotX9WkyGMLF4/Cb35OPCZIAnfi5DxHHRqvGnONK1hTiwllZjPxtGgZp55Jr54cNQGmMK/2tJM26AoG0OtT+55/ZBxHTtm0j08DhfyYdjHPYGZJznmZ/oQqjeI0eZQZe+h5ojKNqxGvhDiybgpIfkQvwVJhcbXiRYvQs1QnwxKOjm8dUCkn+do24H17xouw4NML9sm3zCW48yXQwWcP45h27bvmu7z2iVhq1lo50sWg710EG9bBNfc1rcQKBgQDyDK6+sm7kNYO98A3xjp/GVmJ6Mp+6moWmI+fKDVEGb2chcdO5slKrBb1XX2TQRJS10K6yc0zntuTNVfJRAPpNlyQV9ndGvUbWwRFEu8DETW05NCnd9SQwgQoSG1TcS6fqUqpQV9wJvnoFUJSP9uRnxBiVGyyeSzteLMvjCpU33wKBgQDGWEFbK69u69QH3RsgI+V0Dthr+ySF+VTRaeprfrhFfuZzVhwqd3Cpjj8HpL/7XzTT4Gt33tZudbT02VY71QtzuPH2psoP5P2vP8XMbj1hM5Jgl71G+BnEKNUDlLqVn8zzE76Woi7y5Yj7U7ppCx94qDod7tuqEzvt4nbrponvkwKBgQCJ4gmlXhXncEi06Uu4IAwKOulsPOxaq22Y3/lJU16lsM5p8eKvdNK8088xN4lBTt/71n298AqOMNST1/LqjAkKLCAFVtpJdMcmzOKeaen8qTKgFIQJCX1tGAT5nZIwz/Q+eorEq9gPwO7XmjiW7gjcx4tNXSaEocyW8CPRGRU5twKBgGNUB0bVFcICr+hQPilWUK5SUOeimaPOPT+yPwceKsICzv2rfed2cSE4bzAwvUPxZc9FcAxTuCcRI1ILFThZdKa7U9ElrcNP9gsxcKjz/CEVZpSg6NUFokGuAR8N+HK92DFTDfr5tXFGqdbTE2NPgq818ATVfYQqpbR32P4iJKmpAoGAMUvAjv2uAf46ucQiTiABAhFKXMTIco3EJm9HTuWkB55RJ6RT08AT3ZdzlD9o4/kS2sFy/f2h6kU+FQeGSFufArfhDMgqQhTOBZGo+8lDQ8BqJgQEumSKjseWy2m8azPbmR9SvpR00104A1AYZDX4+KE3pBYDhZiC44tDPOW99OI='
        this.message = ''
    }

    async user_info(i) {
        let DATA = await $.task(`post`, `https://api.qd-metro.com/ngscore/user/accInfo`, this.headers, `{"token":"${this.token}","deviceCoding":"${this.deviceCoding}"}`)
        if (DATA.code == '01' && DATA.msg == '查询成功') {
            this.totalScore = DATA.data.totalScore
            console.log(`用户：${this.user_name}  现有积分：${this.totalScore}`)
            if (i == 0 && this.totalScore >= 630) {
                this.message += `\n用户：${this.user_name},现有积分：${this.totalScore},可以兑换e卡了`
                await this.user_showmsg()
            }
            this.login = true
        } else {
            this.login = false
        }
    }
    async user_task_list() {
        if (this.login == true) {
            let DATA = await $.task(`post`, `https://api.qd-metro.com/ngscore/task/taskShowList`, this.headers, `{"token":"${this.token}","deviceCoding":"${this.deviceCoding}"}`)
            if (DATA.code == '01' && DATA.success == true) {
                for (let is of DATA.data) {
                    this.name = is.name
                    let status = is.status
                    if (this.name != '使用钱包乘车' && status != 4) {
                        this.taskid = is.id
                        await this.user_task_Browse()
                    } else if (this.name != '使用钱包乘车' && status == 4) {
                        console.log(`用户：${this.user_name}   已完成` + this.name)
                    }
                }
            }
        }
    }
    async user_task_Browse() {
        if (this.login == true) {
            console.log(`用户：${this.user_name}  正在执行任务：${this.name}`)
            let DATA = await $.task(`post`, `https://api.qd-metro.com/ngscore/task/getTaskBrowseConf`, this.headers, `{"token":"${this.token}","deviceCoding":"${this.deviceCoding}","taskConfId":${this.taskid}}`)
            if (DATA.code == '01' && DATA.success == true) {
                await $.wait(DATA.data.finishTime * 1000)
                await this.browseDocument(DATA.data.id)
            }
        }
    }
    async browseDocument(id) {
        let time = $.time(13)
        let sign = $.SHA_RSA(`${this.taskid}${id}${time}`, this.key).replace(/\_/g, '/').replace(/\-/g, '+') + '=='
        let DATA = await $.task(`post`, `https://api.qd-metro.com/ngscore/task/browseDocument`, this.headers, `{"token":"${this.token}","deviceCoding":"${this.deviceCoding}","taskConfId":${this.taskid},"documentId":${id},"createTime":${time},"sign":"${sign}","timestamp":""}`)
        if (DATA.success == true && DATA.code == '01') {
            await $.wait(1000)
            let data = await $.task(`post`, `https://api.qd-metro.com/ngscore/task/finishTask`, this.headers, `{"token":"${this.token}","deviceCoding":"${this.deviceCoding}","taskConfId":${this.taskid}}`)
            if (data.success == true && data.code == '01') {
                console.log(`用户：${this.user_name}  任务完成，领取奖励成功`)
            }
        }
    }
    async user_showmsg() {
        if (this.notify != 'off') {
            await $.showmsg(this.notify, this.message)
        }
    }
}

!(async () => {
    await $.ExamineCookie()

    console.log(`\n================ 用户信息 ================`)
    await $.Multithreading('user_info')

    let valid_user_list = $.cookie_list.filter(x => x.login == true)
    if (valid_user_list.length == 0) {
        console.log(`Cookie格式错误 或 账号被禁封`)
        return
    } else {
        console.log(`\n================ 任务列表 ================`)
        await $.Multithreading('user_task_list')
    }
    for (let user of $.cookie_list) {
        user.user_info(0)
    }
    await $.Multithreading('user_showmsg')
})()
    .catch(e => {
        console.log(e)
    })
    .finally(() => { })

function Tom() {
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
            let ckStr = process.env[VALY] || CK || require('./TomCookie')
            if (ckStr == process.env[VALY] || ckStr == CK) {
                console.log(`================= Cookie模式：环境变量 =================`)
                if (ckStr) {
                    for (let User_Cookies of ckStr.split('&').filter(x => !!x)) {
                        if (DECODE == 0) {
                            this.cookie_list.push(new tom(decodeURIComponent(User_Cookies)))
                        } else {
                            this.cookie_list.push(new tom(User_Cookies))
                        }
                    }
                } else {
                    console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
                }
                console.log(`共找到 ${this.cookie_list.length || 0} 个账号`)
                return this.cookie_list
            }
            if (ckStr == require('./TomCookie')) {
                console.log(`================= Cookie模式：文件模式 =================`)
                if (ckStr.TomCookie[VALY]) {
                    for (let is = 1; is <= ckStr.TomCookie[VALY].length; is++) {
                        let User_Cookies = ckStr.TomCookie[VALY][is - 1].cookie_key
                        let User_Name = ckStr.TomCookie[VALY][is - 1].cookie_name
                        let User_Notify = ckStr.TomCookie[VALY][is - 1].cookie_notify
                        if (User_Cookies != '') {
                            if (User_Name == '') {
                                User_Name = `账号${is}`
                            }
                            if (User_Notify == '') {
                                User_Notify = `off`
                            }
                            if (DECODE == 0) {
                                this.cookie_list.push(new tom(decodeURIComponent(User_Name + '||' + User_Cookies + '||' + User_Notify)))
                            } else {
                                this.cookie_list.push(new tom(User_Name + '||' + User_Cookies + '||' + User_Notify))
                            }
                        }
                    }
                }
                console.log(`共找到 ${this.cookie_list.length || 0} 个账号`)
                return this.cookie_list
            }
        }
        // 运行模块 get post put delete patch head options
        // let qq = $.task('get','url',{},'',ip)
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
                        timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                } else {
                    var httpget = {
                        url: taskurl,
                        headers: taskheader,
                        form: JSON.parse(taskbody),
                        timeout: 6000,
                        proxy: 'http://' + taskhost,
                    }
                }
                if (!taskhost) {
                    delete httpget['proxy']
                }
                this.request[method.toLowerCase()](httpget, (err, response, data) => {
                    try {
                        if (data) {
                            if (LOGS == 0) {
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
                        let datas = ''
                        if (!err) {
                            if ($.safeGet(data)) {
                                datas = JSON.parse(data)
                            } else {
                                datas = data
                            }
                        } else {
                            datas = taskurl + '   API请求失败，请检查网络重试\n' + err
                        }
                        return resolve(datas)
                    }
                })
            })
        }

        //数组中随机取出N个不重复的数据
        getArrayItems(arr, num) {
            var temp_array = new Array()
            for (var index in arr) {
                temp_array.push(arr[index])
            }
            var return_array = new Array()
            for (var i = 0; i < num; i++) {
                if (temp_array.length > 0) {
                    var arrIndex = Math.floor(Math.random() * temp_array.length)
                    return_array[i] = temp_array[arrIndex]
                    temp_array.splice(arrIndex, 1)
                } else {
                    break
                }
            }
            return return_array
        }
        //body长度
        lengthInUtf8Bytes(str) {
            let m = encodeURIComponent(str).match(/%[89ABab]/g)
            return str.length + (m ? m.length : 0)
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
        randomString(len, t) {
            if (t == 0) {
                let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789'
                let maxLen = chars.length
                let str = ''
                for (let i = 0; i < len; i++) {
                    str += chars.charAt(Math.floor(Math.random() * maxLen))
                }
                return str
            } else {
                let chars = 'qwertyuiopasdfghjklzxcvbnm01234567890123456789QWERTYUIOPASDFGHJKLZXCVBNM'
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
        //随机延迟 ceil向上取值$.RT(0, 5)=1 2 3 4 5
        //随机延迟 floor向下取值$.RT(0, 5)=0 1 2 3 4
        //随机延迟 round四舍五入取值$.RT(0, 5)=0 1 2 3 4 5
        //区间随机
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
        RSA(str, Key) {
            return new this.NodeRSA('-----BEGIN PUBLIC KEY-----\n' + $.getNewline(Key, 64) + '\n-----END PUBLIC KEY-----').encrypt(str, 'base64', 'utf8')
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
        //字符自动换行
        getNewline(data, id) {
            let str = new String(data)
            let bytesCount = 0
            let s = ''
            for (let i = 0, n = str.length; i < n; i++) {
                let c = str.charCodeAt(i)
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                    bytesCount += 1
                } else {
                    bytesCount += 2
                }
                s += str.charAt(i)
                if (bytesCount >= id) {
                    s = s + '\n'
                    bytesCount = 0
                }
            }
            return s
        }
        //通知
        async showmsg(url, message) {
            if (!message) return
            //   var notify = require('./sendNotify')
            let data = await $.task('get', `${url}${encodeURIComponent(NAME)}/${encodeURIComponent(message)}`, { 'Content-Type': 'application/x-www-form-urlencoded' })
            //console.log(data)
            //  await notify.sendNotify(NAME, message)
        }
    })()
}
