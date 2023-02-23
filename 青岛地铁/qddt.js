/*
@蛋炒饭
软件名:青岛地铁
变量名:qddtck
需要找到https://api.qd-metro.com开头的，在body里面找到token和deviceCoding，用#链接，多账号换行
定时:每天一次
*/
NAME = `青岛地铁` //名字
VALY = ['qddtck'] //变量名
LOGS = 0 //1开日志，0关闭
CK = ''
var userList = []
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
    this.token = str.split('#')[0]
    this.did = str.split('#')[1]
    this.logs = true
  }

  //用户信息
  async userinfo() {
    let body = `{"token":"${this.token}","deviceCoding":"${this.did}"}`
    let datas = await task('post', `https://api.qd-metro.com/ngscore/user/accInfo`, {}, body)
    if (datas.code == '01') {
      console.log(`【${this.f}】登录成功==>现有总积分${datas.data.totalScore}`)
      this.logs = true
    } else {
      this.logs = false
    }
  }
  //任务列表
  async tasklist() {
    let body = `{"token":"${this.token}","deviceCoding":"${this.did}"}`
    let datas = await task('post', `https://api.qd-metro.com/ngscore/task/taskShowList`, {}, body)
    if (datas.code == '01') {
      for (let aa of datas.data) {
        if (aa.name == '浏览建行个人养老金' && aa.status != 4) {
          this.taskid = aa.id
          await this.view()
        }
        if (aa.name == '浏览建行生活活动' && aa.status != 4) {
          this.taskid = aa.id
          await this.view()
        }
        if (aa.name == '浏览建行快贷业务' && aa.status != 4) {
          this.taskid = aa.id
          await this.view()
        }
        if (aa.name == '浏览建行贵金属' && aa.status != 4) {
          this.taskid = aa.id
          await this.view()
        }
        if (aa.name == '浏览建行哔哩哔哩信用卡' && aa.status != 4) {
          this.taskid = aa.id
          await this.view()
        }
        if (aa.name == '使用钱包乘车' && aa.status != 4) {
          this.taskid = aa.id
          this.doid = 2
          await this.dotask()
        }
      }
    }
  }
  //获取浏览id
  async view() {
    let body = `{"token":"${this.token}","deviceCoding":"${this.did}","taskConfId":${this.taskid}}`
    let datas = await task('post', `https://api.qd-metro.com/ngscore/task/getTaskBrowseConf`, {}, body)
    this.doid = datas.data.id
    await wait(RT(15000, 18000))
    await this.dotask()
  }
  //做任务
  async dotask() {
    let ts = times(13)
    let sign = SHA256withRSA(`${this.taskid}${this.doid}${ts}`).replace(/\_/g, '/').replace(/\-/g, '+')
    let signn = `${sign}` + '=='
    let headers = {
      "Host": "api.qd-metro.com",
      "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2007J1SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/87.0.4280.141 Mobile Safari/537.36;app/qdmetro",
      "Content-Type": "application/json",
      "Origin": "http://appcdn.qd-metro.com",
      "X-Requested-With": "com.sdjictec.qdmetro",
      "Referer": "http://appcdn.qd-metro.com/file/MetroH5/integral/"
    }
    let body = `{"token":"${this.token}","deviceCoding":"${this.did}","taskConfId":${this.taskid},"documentId":${this.doid},"createTime":${ts},"sign":"${signn}","timestamp":""}`
    let datas = await task('post', `https://api.qd-metro.com/ngscore/task/browseDocument`, headers, body)
    if (datas.code == '01') {
      console.log(`【${this.f}】任务${this.taskid}完成，开始领取奖励`)
      await this.finish()
    } else {
      console.log(`【${this.f}】任务${this.taskid}${datas.msg}`)
    }
  }
  //领奖励
  async finish() {
    let body = `{"token":"${this.token}","deviceCoding":"${this.did}","taskConfId":${this.taskid}}`
    let datas = await task('post', `https://api.qd-metro.com/ngscore/task/finishTask`, {}, body)
    if (datas.code == '01') {
      console.log(`【${this.f}】任务${this.taskid}奖励领取成功`)

    } else {
      console.log(`【${this.f}】任务${this.taskid}${datas.msg}`)
    }
  }




} !(async () => {
  console.log(`蛋炒饭偷撸脚本，请勿外传，唯一官方交流频道：https://t.me/+xjTie4yvzm83OTI9`)
  console.log(NAME); checkEnv()
  for (let user of userList) {
    await user.userinfo()
  }
  let validUserList = userList.filter(x => x.logs == true)
  if (validUserList.length == 0) {
    console.log(`呆子，检查一下你的CK是否正确`)
    return
  }
  for (let user of validUserList) {
    //  await user.dotask()
    await user.tasklist()
  }

})()
  .catch(e => {
    console.log(e)
  })
  .finally(() => {
    //$.done()
  })
//取X到Y之间随机整数
function RT(X, Y) {
  return Math.round(Math.random() * (Y - X) + X)
}
//当前13位时间戳
function times(s) {
  if (s == 10) {
    let TS = Math.round(new Date().getTime() / 1000).toString()
    return TS
  } else {
    let TS = new Date().getTime()
    return TS
  }
}
//运行模块 get post put delete patch head options
async function task(method, taskurl, taskheader, taskbody) {
  if (method == 'delete') {
    method = method.toUpperCase()
  } else {
    method = method
  }
  const request = require('request')
  if (method == 'post') {
    delete taskheader['content-type']
    delete taskheader['Content-type']
    delete taskheader['content-Type']
    if (safeGet(taskbody)) {
      taskheader['Content-Type'] = 'application/json;charset=UTF-8'
    } else {
      taskheader['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    if (taskbody) {
      taskheader['Content-Length'] = lengthInUtf8Bytes(taskbody)
    }
  }
  taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
  if (method.indexOf('T') < 0) {
    var httpget = {
      url: taskurl,
      headers: taskheader,
      body: taskbody,
    }
  } else {
    var httpget = {
      url: taskurl,
      headers: taskheader,
      form: JSON.parse(taskbody),
    }
  }
  // console.log(httpget);
  return new Promise(async resolve => {
    request[method.toLowerCase()](httpget, (err, response, data) => {
      try {
        if (LOGS == 1) {
          console.log(`==================请求==================`)
          console.log(httpget)
          console.log(`==================返回==================`)
          console.log(JSON.parse(data))
        }
      } catch (e) {
      } finally {
        if (!err) {
          if (safeGet(data)) {
            data = JSON.parse(data)
          } else {
            data = data
          }
        } else {
          data = taskurl + '   API请求失败，请检查网络重试\n' + err
        }
        return resolve(data)
      }
    })
  })
}

//随机数
function SJS(e) {
  e = e || 32
  var t = '1234567890',
    a = t.length,
    n = ''
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
function SJSxx(e) {
  e = e || 32
  var t = 'abcdefghijklmnopqrstuvwxyz1234567890',
    a = t.length,
    n = ''
  for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
  return n
}
//数据检查
function safeGet(data) {
  try {
    if (typeof JSON.parse(data) == 'object') {
      return true
    }
  } catch (e) {
    return false
  }
}
//body长度
function lengthInUtf8Bytes(str) {
  let m = encodeURIComponent(str).match(/%[89ABab]/g)
  return str.length + (m ? m.length : 0)
}
//变量检查
async function checkEnv() {
  let ckStr = process.env[VALY] || CK
  let userCount = 0
  if (ckStr) {
    for (let userCookies of ckStr.split('\n').filter(x => !!x)) {
      userList.push(new Bar(userCookies))
    }
    userCount = userList.length
  } else {
    console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
  }
  console.log(`共找到${userCount}个账号`)
  return userList
}

//延迟
function wait(t) {
  return new Promise(e => setTimeout(e, t))
}
//base64
function stringToBase64(str) {
  var base64Str = Buffer.from(str).toString('base64')
  return base64Str
}
//AES/DES加解密
function EncryptCrypto(method, mode, padding, data, key, iv) {
  const CryptoJS = require('crypto-js')
  const datas = CryptoJS.enc.Utf8.parse(data)
  const IV = CryptoJS.enc.Utf8.parse(iv)
  const KEY = CryptoJS.enc.Utf8.parse(key)
  const encrypted = CryptoJS[method].encrypt(datas, KEY, {
    iv: IV,
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad[padding],
  })
  return encrypted.toString()
}
function DecryptCrypto(method, mode, padding, datas, key, iv) {
  const CryptoJS = require('crypto-js')
  const IV = CryptoJS.enc.Utf8.parse(iv)
  const KEY = CryptoJS.enc.Utf8.parse(key)
  const decrypt = CryptoJS[method].decrypt(datas, KEY, {
    iv: IV,
    mode: CryptoJS.mode[mode],
    padding: CryptoJS.pad[padding],
  })
  return decrypt.toString(CryptoJS.enc.Utf8)
}
//SHA256withRSA   
function SHA256withRSA(content) {
  const key = rs.KEYUTIL.getKey(privateKeyString)
  const signature = new rs.KJUR.crypto.Signature({ alg: "SHA256withRSA" })
  signature.init(key)
  signature.updateString(content)
  const originSign = signature.sign()
  const sign64u = rs.hextob64u(originSign)
  return sign64u
}
//RSA加密
function RSA(msg, Key) {
  //npm install node-rsa
  const NodeRSA = require('node-rsa')
  let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
  nodersa.setOptions({ encryptionScheme: 'pkcs1' })
  return nodersa.encrypt(msg, 'base64', 'utf8')
}
//SHA1
function SHA1_Encrypt(word) {
  return CryptoJS.SHA1(word).toString()
}
//SHA256
function SHA256(n) {
  const r = 8,
    t = 0
  function o(n, r) {
    const t = (65535 & n) + (65535 & r)
    return (((n >> 16) + (r >> 16) + (t >> 16)) << 16) | (65535 & t)
  }
  function e(n, r) {
    return (n >>> r) | (n << (32 - r))
  }
  function u(n, r) {
    return n >>> r
  }
  function c(n, r, t) {
    return (n & r) ^ (~n & t)
  }
  function f(n, r, t) {
    return (n & r) ^ (n & t) ^ (r & t)
  }
  function i(n) {
    return e(n, 2) ^ e(n, 13) ^ e(n, 22)
  }
  function h(n) {
    return e(n, 6) ^ e(n, 11) ^ e(n, 25)
  }
  function C(n) {
    return e(n, 7) ^ e(n, 18) ^ u(n, 3)
  }
  return (function (n) {
    const r = t ? '0123456789ABCDEF' : '0123456789abcdef'
    let o = ''
    for (let t = 0; t < 4 * n.length; t++) o += r.charAt((n[t >> 2] >> (8 * (3 - (t % 4)) + 4)) & 15) + r.charAt((n[t >> 2] >> (8 * (3 - (t % 4)))) & 15)
    return o
  })(
    (function (n, r) {
      const t = [
        1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921,
        2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
      ],
        a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
        g = new Array(64)
      let l, d, A, S, m, s, b, p, v, w, y, B
      for (n[r >> 5] |= 128 << (24 - (r % 32)), n[15 + (((r + 64) >> 9) << 4)] = r, v = 0; v < n.length; v += 16) {
        for (l = a[0], d = a[1], A = a[2], S = a[3], m = a[4], s = a[5], b = a[6], p = a[7], w = 0; w < 64; w++) (g[w] = w < 16 ? n[w + v] : o(o(o(e((D = g[w - 2]), 17) ^ e(D, 19) ^ u(D, 10), g[w - 7]), C(g[w - 15])), g[w - 16])), (y = o(o(o(o(p, h(m)), c(m, s, b)), t[w]), g[w])), (B = o(i(l), f(l, d, A))), (p = b), (b = s), (s = m), (m = o(S, y)), (S = A), (A = d), (d = l), (l = o(y, B))
          ; (a[0] = o(l, a[0])), (a[1] = o(d, a[1])), (a[2] = o(A, a[2])), (a[3] = o(S, a[3])), (a[4] = o(m, a[4])), (a[5] = o(s, a[5])), (a[6] = o(b, a[6])), (a[7] = o(p, a[7]))
      }
      var D
      return a
    })(
      (function (n) {
        const t = [],
          o = (1 << r) - 1
        for (let e = 0; e < n.length * r; e += r) t[e >> 5] |= (n.charCodeAt(e / r) & o) << (24 - (e % 32))
        return t
      })(
        (n = (function (n) {
          n = n.replace(/\r\n/g, '\n')
          let r = ''
          for (let t = 0; t < n.length; t++) {
            const o = n.charCodeAt(t)
            o < 128 ? (r += String.fromCharCode(o)) : o > 127 && o < 2048 ? ((r += String.fromCharCode((o >> 6) | 192)), (r += String.fromCharCode((63 & o) | 128))) : ((r += String.fromCharCode((o >> 12) | 224)), (r += String.fromCharCode(((o >> 6) & 63) | 128)), (r += String.fromCharCode((63 & o) | 128)))
          }
          return r
        })(n))
      ),
      n.length * r
    )
  )
}
function MD5Encrypt(_) {
  function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase()//.toUpperCase()
}
