/*
@蛋炒饭
软件名:青岛地铁查询E卡卡密
变量名:qddtck
手机号#登陆密码，多账号换行
定时:需要的时候运行一次
*/
NAME = `青岛地铁` //名字
VALY = ['qddtck'] //变量名
LOGS = 0 //1开日志，0关闭
Notify = 0
CK = '13754650804#qddt123456'
var rs = require("jsrsasign")
usid = 0
var privateKeyString = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7iUFO+72knVUvymgXNvR7Tpv1
J/krOQeV8pFxBkmtCvfVwkpu5nsthPyxt0rYlKnRQQZlFkVlr7cT62drLHZicDSi0ojvSmEhpNAQ
lue9HWXPhob4dXgxpGsRmCSYiv8naHsyRiApR9O2lvzNa6WK4MP/Tfo9phVk5Ipa3HCiVZY3YSd7
cWAImyrY9fsFSOvc1zd0k2vmkPE0nKAI+l5Mv7eAglPYfDw6oRXwGEjdGVtRduyfmy5YeyLEbNIR
cFhHiHHoWcQvByEAgXbjOKG/Om3hsA3eeUw70f+9sMdv7uwZm6E1Y50TnQzsP03Co4WpPEVH0+zM
VoAIigrjL0YNAgMBAAECggEAHphx8zTW57hTYYygFsl8cXGNuB1hZU/UkP4WBF6GPpj/ffxIsHch
uXds0oGY0GTQn7cAGBXeFIzqTXGmWbHTTpQHwliexotX9WkyGMLF4/Cb35OPCZIAnfi5DxHHRqvG
nONK1hTiwllZjPxtGgZp55Jr54cNQGmMK/2tJM26AoG0OtT+55/ZBxHTtm0j08DhfyYdjHPYGZJz
nmZ/oQqjeI0eZQZe+h5ojKNqxGvhDiybgpIfkQvwVJhcbXiRYvQs1QnwxKOjm8dUCkn+do24H17x
ouw4NML9sm3zCW48yXQwWcP45h27bvmu7z2iVhq1lo50sWg710EG9bBNfc1rcQKBgQDyDK6+sm7k
NYO98A3xjp/GVmJ6Mp+6moWmI+fKDVEGb2chcdO5slKrBb1XX2TQRJS10K6yc0zntuTNVfJRAPpN
lyQV9ndGvUbWwRFEu8DETW05NCnd9SQwgQoSG1TcS6fqUqpQV9wJvnoFUJSP9uRnxBiVGyyeSzte
LMvjCpU33wKBgQDGWEFbK69u69QH3RsgI+V0Dthr+ySF+VTRaeprfrhFfuZzVhwqd3Cpjj8HpL/7
XzTT4Gt33tZudbT02VY71QtzuPH2psoP5P2vP8XMbj1hM5Jgl71G+BnEKNUDlLqVn8zzE76Woi7y
5Yj7U7ppCx94qDod7tuqEzvt4nbrponvkwKBgQCJ4gmlXhXncEi06Uu4IAwKOulsPOxaq22Y3/lJ
U16lsM5p8eKvdNK8088xN4lBTt/71n298AqOMNST1/LqjAkKLCAFVtpJdMcmzOKeaen8qTKgFIQJ
CX1tGAT5nZIwz/Q+eorEq9gPwO7XmjiW7gjcx4tNXSaEocyW8CPRGRU5twKBgGNUB0bVFcICr+hQ
PilWUK5SUOeimaPOPT+yPwceKsICzv2rfed2cSE4bzAwvUPxZc9FcAxTuCcRI1ILFThZdKa7U9El
rcNP9gsxcKjz/CEVZpSg6NUFokGuAR8N+HK92DFTDfr5tXFGqdbTE2NPgq818ATVfYQqpbR32P4i
JKmpAoGAMUvAjv2uAf46ucQiTiABAhFKXMTIco3EJm9HTuWkB55RJ6RT08AT3ZdzlD9o4/kS2sFy
/f2h6kU+FQeGSFufArfhDMgqQhTOBZGo+8lDQ8BqJgQEumSKjseWy2m8azPbmR9SvpR00104A1AY
ZDX4+KE3pBYDhZiC44tDPOW99OI=
-----END PRIVATE KEY-----`

class Bar {
  constructor(str) {
    this._ = ++usid
    this.f = `账号 [${this._}] `
    this.phone = str.split('#')[0]
    this.pwd = $.MD5Encrypt(0, str.split('#')[1])
    this.device = $.SJS(16, 1)
    this.version = '4.1.5_VersionCode_415'
    this.message = ''
    this.logs = true
  }
  //get_iv
  async get_iv() {
    let headers = {
      'User-Agent': 'okhttp/3.12.0',
    }
    let body = `language=ZH&deviceCoding=${this.device}&model=M2011K2C&token=&version=${this.version}&systemversion=11&platform=android&needVerifyCode=false&isLogin=false&phone=${this.phone}`
    let datas = await $.task('post', `https://api.qd-metro.com/ngcustomer/Login/loginRandom`, headers, body)
    this.iv = datas.data.whatIsThis
    await this.login()
  }
  //登陆
  async login() {
    let iv = this.iv
    let sign = encodeURIComponent($.DecryptCrypto(0, `AES`, `CBC`, `Pkcs7`, `{"phone":"${this.phone}","password":"${this.pwd}"}`, '1wTD3U39b53qv8ck', iv))
    let body = `language=ZH&deviceCoding=${this.device}&model=M2011K2C&token=&version=${this.version}&systemversion=11&platform=android&phone=${this.phone}&param=${sign}`
    let datas = await $.task('post', `https://api.qd-metro.com/ngcustomer/Login/loginByPassword`, {}, body)
    if (datas.respcod == '01') {
      let p1 = $.DecryptCrypto(1, `AES`, `CBC`, `Pkcs7`, `${datas.data.param1}`, '1wTD3U39b53qv8ck', iv)
      this.token = p1.split('"token":"')[1].split('",')[0]
      this.userId = p1.split('"userId":"')[1].split('",')[0]
      this.logs = true
    } else {
      this.logs = false
    }
  }
  //get mtoken
  async mtoken() {
    let options = {
      method: 'post',
      url: `https://api.qd-metro.com/ngcustomer/authorization/getToken`,
      headers: {
        'Content-Type': `multipart/form-data; boundary=----WebKitFormBoundaryUebJPsCsuWUIALLo`,
      },
      formData: {
        'token': `${this.token}`,
        'deviceCoding': `${this.device}`,
        'merchantNo': `DL08XF18DC`
      }
    }
    let datas = await $.httpRequest(options)
    let resp = JSON.parse(datas)
    if (resp.respcod == '01') {
      this.metoken = resp.data.merchantToken
      await this.gettoken()
    }
  }
  //get token
  async gettoken() {
    let body = `{"reqBody":{"merchantToken":"${this.metoken}"},"reqHead":{"apiVersion":"","platform":"","token":"","version":"","model":"","merchantNo":"","systemversion":"","deviceCoding":""}}`
    let datas = await $.task('post', `https://gateway.lcago.cn:9195/user/token/getToken`, {}, body)
    if (datas.code == '00000') {
      this.token = datas.data.token
      // await this.order()
      await this.ddid()
    }
  }
  //获取订单ID
  async ddid() {
    let body = `{"reqHead":{"apiVersion":"","platform":"","token":"${this.token}","version":"","model":"","merchantNo":"","systemversion":"","deviceCoding":""},"reqBody":{"status":"","pageNum":1,"pageSize":10}}`
    let datas = await $.task('post', `https://gateway.lcago.cn:9195/trade/order/findOrderList`, {}, body)
    // console.log(datas)
    for (let bb of datas.data.list) {
      this.ordern = bb.orderNo
      await this.detail()
    }
  }
  //查看卡密
  async detail() {
    let body = `{"reqHead":{"apiVersion":"","platform":"","token":"${this.token}","version":"","model":"","merchantNo":"","systemversion":"","deviceCoding":""},"reqBody":{"orderNo":"${this.ordern}"}}`
    let datas = await $.task('post', `https://gateway.lcago.cn:9195/trade/order/getOrderDetail`, {}, body)
    if (datas.code == '00000') {
      console.log(`【${this.f}】兑换日期：${datas.data.payTime},${datas.data.skuName}：${datas.data.cdKey}`)
      this.message += `【${this.f}】兑换日期：${datas.data.payTime},${datas.data.skuName}：${datas.data.cdKey}`
    }
  }







} $ = DD()
!(async () => {
  console.log(NAME)
  await $.ExamineCookie()
  await $.Multithreading('get_iv')
  let valid_user_list = $.cookie_list.filter(x => x.logs == true)
  if (valid_user_list.length == 0) {
    console.log(`Cookie格式错误 或 账号被禁封`)
    return
  } else {
    await $.Multithreading('mtoken')
  }
  let message = []
  for (let user of $.cookie_list) {
    if (user.message) message.push(user.message)
  }
  if (message.length > 0) await $.SendMsg(message.join('\n'))
})()
  .catch(e => { console.log(e) })
  .finally(() => { })


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
            let datas = ''
            if (!err) {
              if ($.safeGet(data)) {
                datas = JSON.parse(data)
              } else if (data.indexOf('/') != -1 && data.indexOf('+') != -1) {
                datas = $.decrypts(data)
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
    async SendMsg(message) {
      if (!message) return
      if (Notify == 1) {
        var notify = require("./sendNotify")
        await notify.sendNotify(NAME, message)
      } else {
        //  console.log(message);
      }
    }
    //request请求封装
    async httpRequest(options) {
      delete options.fn
      var request = require('request')
      return new Promise((resolve) => {
        request(options, function (error, response) {
          if (error) throw new Error(error)
          let data = response.body
          resolve(data)
        })
      })
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
      nodersa.setOptions({ encryptionScheme: 'pkcs1' })
      return nodersa.encrypt(msg, 'base64', 'utf8')
    }
    SHA256withRSA(content) {
      const key = rs.KEYUTIL.getKey(privateKeyString)
      const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" })
      signature.init(key)
      signature.updateString(content)
      const originSign = signature.sign()
      const sign64u = rs.hextob64u(originSign)
      return sign64u
    }
  })()
}