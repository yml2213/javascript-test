/**
 * lcapp=sessionid#需要兑换的手机号
 */

/////////////////////////////////////////////
//这里的内容尽量改一下，UA里面的值按顺序填下去，最后一个18不用改
let appVer = '1.3.3'
let id = '00000000-698f-731d-ffff-ffffbd95214c'
let phoneVer = 'Vivo V1824A'
let osType = 'Android'
let osVer = '10'
let channelType = 'Release'
let tenantId = 18
///////////////////////////////////////////////
const $ = new Env('仑传');
const got = require('got');
const fs = require('fs')
const envPrefix = 'lcapp'
const envSplitor = ['\n', '&', '@'] //支持多种分割，但要保证变量里不存在这个字符
const ckNames = [envPrefix + ''] //可以支持多变量

const MAX_THREAD = parseInt(process.env[envPrefix + 'Thread']) || 20; //默认最大并发数
const DEFAULT_TIMEOUT = 8000, DEFAULT_RETRY = 3;
class BasicClass {
    constructor() {
        this.index = $.userIdx++;
        this.name = '';
        this.valid = true;

        //设置got的默认超时等参数
        this.got = got.extend({
            retry: { limit: 0 },
            timeout: DEFAULT_TIMEOUT,
            followRedirect: false,
        })
    }
    //给每个账户打印前面加上自己的名字
    log(msg, opt = {}) {
        var m = '', n = $.userCount.toString().length;;
        if (this.index) m += `账号[${$.padStr(this.index, n)}]`;
        if (this.name) m += `[${this.name}]`;
        $.log(m + msg, opt);
    }
    //使用自己的got实例发包,可以实现设置每个账号自己的默认UA等
    async request(opt) {
        var resp = null, count = 0;
        var fn = opt.fn || opt.url;
        opt.method = opt?.method?.toUpperCase() || 'GET';
        while (count++ < DEFAULT_RETRY) {
            try {
                var err = null;
                const errcodes = ['ECONNRESET', 'EADDRINUSE', 'ENOTFOUND', 'EAI_AGAIN'];
                await this.got(opt).then(t => {
                    resp = t
                }, e => {
                    err = e;
                    resp = e.response;
                });
                if (err) {
                    if (err.name == 'TimeoutError') {
                        this.log(`[${fn}]请求超时(${err.code})，重试第${count}次`);
                    } else if (errcodes.includes(err.code)) {
                        this.log(`[${fn}]请求错误(${err.code})，重试第${count}次`);
                    } else {
                        let statusCode = resp?.statusCode || -1;
                        this.log(`[${fn}]请求错误(${err.message}), 返回[${statusCode}]`);
                        break;
                    }
                } else {
                    break;
                }
            } catch (e) {
                this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`);
            };
        }
        let { statusCode = -1, headers = null, body = null } = resp;
        if (body) try { body = JSON.parse(body); } catch { };
        return { statusCode, headers, result: body };
    }
}
let http = new BasicClass();

class UserClass extends BasicClass {
    constructor(ck) {
        super()
        this.ck = ck.split('#')
        this.sessionid = this.ck[0]
        this.dhphone = this.ck[1]

        this.got = this.got.extend({
            headers: {},
        })
    }
    //做任务逻辑
    async userTask() {
        $.log(`\n============= 账号[${this.index}] =============`);
        await this.info();
        await this.loginUrl();
    }

    async info () {
        let url = '/api/user_mumber/account_detail'
        let REQUEST = $.randomPattern('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
        let ts13 = Math.round(new Date().getTime()).toString()
        let sign = SHA256(`${url}&&${this.sessionid}&&${REQUEST}&&${ts13}&&FR*r!isE5W&&${tenantId}`)
        try {
            let options = {
                fn: '用户信息',
                method: 'get',
                url: 'https://vapp.tmuyun.com' + url,
                headers: {
                    "X-SESSION-ID": this.sessionid,
                    "X-REQUEST-ID": REQUEST,
                    "X-TIMESTAMP": ts13,
                    "X-SIGNATURE": sign,
                    "X-TENANT-ID": tenantId,
                    "User-Agent": `${appVer};${id};${phoneVer};${osType};${osVer};${channelType}`,
                    "Host": "vapp.tmuyun.com",
                    'Connection': 'keep-alive'
                }
            }
    
          let { result } = await this.request(options)
    
          if (result.code == 0) {
            this.log('账户:['+result.data.rst.phone_number.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2") +']'+ '  积分余额：' + result.data.rst.total_integral)
               if(result.data.rst.total_integral >= 6000){
                    this.is = 1
               }else{
                this.is = 0
               }
          } else {
            this.log(JSON.stringify(result))
          }
        } catch (e) {
          console.log(e)
        }
      }
    async loginUrl () {
        let url = '/api/duiba/score_mall_login'
        let REQUEST = $.randomPattern('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
        let ts13 = Math.round(new Date().getTime()).toString()
        let sign = SHA256(`${url}&&${this.sessionid}&&${REQUEST}&&${ts13}&&FR*r!isE5W&&${tenantId}`)
        try {
            let options = {
                fn: '获取登录url',
                method: 'get',
                url: 'https://vapp.tmuyun.com/api/duiba/score_mall_login',
                headers: {
                    "X-SESSION-ID": this.sessionid,
                    "X-REQUEST-ID": REQUEST,
                    "X-TIMESTAMP": ts13,
                    "X-SIGNATURE": sign,
                    "X-TENANT-ID": tenantId,
                    "User-Agent": `${appVer};${id};${phoneVer};${osType};${osVer};${channelType}`,
                    "Host": "vapp.tmuyun.com",
                    'Connection': 'keep-alive'
                }
            }
    
          let { result } = await this.request(options)
          if (result.code == 0) {
            this.url = result.data.url

            await $.wait(1000);
            await this.autologin()
            //    this.log(JSON.stringify(result))
          } else {
            this.log(JSON.stringify(result))
          }
        } catch (e) {
          console.log(e)
        }
      }
    
      async autologin () {
        try {
          let options = {
            fn: '获取cookie',
            method: 'get',
            url: this.url,
            headers: {
                "Host": "www.duiba.com.cn",
                "Connection": "keep-alive",
                "Pragma": "no-cache",
                "Cache-Control": "no-cache",
                "Upgrade-Insecure-Requests": "1",
                "User-Agent": "Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36;xsb_beilun;xsb_beilun;1.3.3;native_app",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
                "Referer": "http://www.duiba.com.cn/",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            }
          }
          let { headers } = await this.request(options)
          if (headers) {
            let a = headers['set-cookie'][0].split('wdata4=')[1].split(';')[0]
            let b = headers['set-cookie'][1].split('w_ts=')[1].split(';')[0]
            let c = headers['set-cookie'][2].split('_ac=')[1].split(';')[0]
            let d = headers['set-cookie'][3].split('tokenId=')[1].split(';')[0]
            let e = headers['set-cookie'][4].split('wdata3=')[1].split(';')[0]
            let f = headers['set-cookie'][5].split('createdAtToday=')[1].split(';')[0]
            let g = headers['set-cookie'][6].split('isNotLoginUser=')[1].split(';')[0]
            this.Cookie = `wdata4=${a}; w_ts=${b};_ac=${c}; tokenId=${d}; wdata3=${e}; createdAtToday=${f}; isNotLoginUser=${g}`
        await this.sjhxx()
          } else {
            let { result } = await this.request(options)
            this.log(JSON.stringify(result))
          }
        } catch (e) {
          console.log(e)
        }
      }
    
      async sjhxx () {
      
        try {
          let options = {
            fn: '手机号信息',
            method: 'get',
            url: `http://92867.activity-42.m.duiba.com.cn/phone/reg?tel=${this.dhphone}`,
            headers: {
              'user-agent':
                'Mozilla/5.0 (Linux; Android 10; V1824A Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/74.0.3729.186 Mobile Safari/537.36;xsb_beilun;xsb_beilun;1.3.3;native_app',
              Cookie: this.Cookie
            }
          }
          let { result } = await this.request(options)
          if (result) {
            this.phoneProvince = result.data.province //省份
            this.phoneCatName = result.data.catName //运营商
            if(this.is == 1){
                fs.appendFile("lcapp.txt", this.Cookie+'#'+this.dhphone+'#'+this.phoneProvince+'#'+this.phoneCatName+'\n', (err, data) => {
                    if (err) throw err;
                });
                await $.wait(1000);
                this.log(`打印信息成功`)
            }else if(this.is == 0){
             this.log(`用户积分不足`)
            }
   
         //    this.log(this.phoneProvince+this.phoneCatName)
  
          } else {
            this.log(JSON.stringify(result))
          }
        } catch (e) {
          console.log(e)
        }
      }
}

!(async () => {
    $.log(`正在创建文件，请稍后...`);
    //创建文件
    fs.appendFile("lcapp.txt", ' ', (err, data) => { if (err) throw err;
        //删除文件
        fs.unlink('lcapp.txt', (err) => { if (err) throw err;  }); });
        await $.wait(2000)

    //封装的读取变量方法, 可以自己另外写也可以直接用, 读取到的账号会存入 $.userList 中
    $.read_env(UserClass);




    //正常的做任务流程
    for (let user of $.userList) {
        await user.userTask();
    }

    //封装的并发方法, 想试的把下面的//删掉
    //await $.threadTask('userTask',MAX_THREAD);

})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


function Env(name) {
    return new class {
        constructor(name) {
            this.name = name;
            this.startTime = Date.now();
            this.log(`[${this.name}]开始运行\n`, { time: true });
            this.notifyStr = [];
            this.notifyFlag = true;
            this.userIdx = 0;
            this.userList = [];
            this.userCount = 0;
        }
        log(msg, options = {}) {
            let opt = { console: true };
            Object.assign(opt, options);
            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss';
                msg = `[${this.time(fmt)}]` + msg;
            }
            if (opt.notify) this.notifyStr.push(msg);
            if (opt.console) console.log(msg);
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
        read_env(Class) {
            let envStrList = ckNames.map(x => process.env[x]);
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplitor.filter(x => env_str.includes(x));
                let splitor = sp.length > 0 ? sp[0] : envSplitor[0];
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck));
                }
            }
            this.userCount = this.userList.length;
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true });
                return false;
            }
            this.log(`共找到${this.userCount}个账号`);
            return true;
        }
        async threads(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++];
                if (!user.valid) continue;
                await user[taskName](opt);
            }
        }
        async threadTask(taskName, thread) {
            let taskAll = [];
            let taskConf = { idx: 0 };
            while (thread--) taskAll.push(this.threads(taskName, taskConf));
            await Promise.all(taskAll);
        }
        time(t, x = null) {
            let xt = x ? new Date(x) : new Date;
            let e = {
                "M+": xt.getMonth() + 1,
                "d+": xt.getDate(),
                "h+": xt.getHours(),
                "m+": xt.getMinutes(),
                "s+": xt.getSeconds(),
                "q+": Math.floor((xt.getMonth() + 3) / 3),
                S: this.padStr(xt.getMilliseconds(), 3)
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t;
        }
        async showmsg() {
            if (!this.notifyFlag) return;
            if (!this.notifyStr.length) return;
            var notify = require('./sendNotify');
            this.log('\n============== 推送 ==============');
            await notify.sendNotify(this.name, this.notifyStr.join('\n'));
        }
        padStr(num, length, opt = {}) {
            let padding = opt.padding || '0';
            let mode = opt.mode || 'l';
            let numStr = String(num);
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0;
            let pads = '';
            for (let i = 0; i < numPad; i++) {
                pads += padding;
            }
            if (mode == 'r') {
                numStr = numStr + pads;
            } else {
                numStr = pads + numStr;
            }
            return numStr;
        }
        json2str(obj, c, encode = false) {
            let ret = [];
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys];
                if (v && encode) v = encodeURIComponent(v);
                ret.push(keys + '=' + v);
            }
            return ret.join(c);
        }
        str2json(str, decode = false) {
            let ret = {};
            for (let item of str.split('&')) {
                if (!item) continue;
                let idx = item.indexOf('=');
                if (idx == -1) continue;
                let k = item.substr(0, idx);
                let v = item.substr(idx + 1);
                if (decode) v = decodeURIComponent(v);
                ret[k] = v;
            }
            return ret;
        }
        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = '';
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length));
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase();
                } else {
                    str += chars;
                }
            }
            return str;
        }
        randomString(len, charset = 'abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }
        randomList(a) {
            let idx = Math.floor(Math.random() * a.length);
            return a[idx];
        }
        sjsz(len, charset = '0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t));
        }
        async exitNow() {
            await this.showmsg();
            let e = Date.now();
            let s = (e - this.startTime) / 1000;
            this.log('');
            this.log(`[${this.name}]运行结束，共运行了${s}秒`, { time: true });
            process.exit(0);
        }
    }
        (name)
}

/**
 * 格式化时间戳为YYYYMMDD
 */
function tszh(d) {
    let date = new Date(d);
    //console.log(date)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    let c = year + '' + month + '' + day;
    return c;

}
function phone_num(phone_num) {
    if (phone_num.length == 11) {
        let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
        return data;
    } else {
        return phone_num;
    }
}
function SHA256(n) { const r = 8, t = 0; function o(n, r) { const t = (65535 & n) + (65535 & r); return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t } function e(n, r) { return n >>> r | n << 32 - r } function u(n, r) { return n >>> r } function c(n, r, t) { return n & r ^ ~n & t } function f(n, r, t) { return n & r ^ n & t ^ r & t } function i(n) { return e(n, 2) ^ e(n, 13) ^ e(n, 22) } function h(n) { return e(n, 6) ^ e(n, 11) ^ e(n, 25) } function C(n) { return e(n, 7) ^ e(n, 18) ^ u(n, 3) } return function (n) { const r = t ? "0123456789ABCDEF" : "0123456789abcdef"; let o = ""; for (let t = 0; t < 4 * n.length; t++)o += r.charAt(n[t >> 2] >> 8 * (3 - t % 4) + 4 & 15) + r.charAt(n[t >> 2] >> 8 * (3 - t % 4) & 15); return o }(function (n, r) { const t = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], g = new Array(64); let l, d, A, S, m, s, b, p, v, w, y, B; for (n[r >> 5] |= 128 << 24 - r % 32, n[15 + (r + 64 >> 9 << 4)] = r, v = 0; v < n.length; v += 16) { for (l = a[0], d = a[1], A = a[2], S = a[3], m = a[4], s = a[5], b = a[6], p = a[7], w = 0; w < 64; w++)g[w] = w < 16 ? n[w + v] : o(o(o(e(D = g[w - 2], 17) ^ e(D, 19) ^ u(D, 10), g[w - 7]), C(g[w - 15])), g[w - 16]), y = o(o(o(o(p, h(m)), c(m, s, b)), t[w]), g[w]), B = o(i(l), f(l, d, A)), p = b, b = s, s = m, m = o(S, y), S = A, A = d, d = l, l = o(y, B); a[0] = o(l, a[0]), a[1] = o(d, a[1]), a[2] = o(A, a[2]), a[3] = o(S, a[3]), a[4] = o(m, a[4]), a[5] = o(s, a[5]), a[6] = o(b, a[6]), a[7] = o(p, a[7]) } var D; return a }(function (n) { const t = [], o = (1 << r) - 1; for (let e = 0; e < n.length * r; e += r)t[e >> 5] |= (n.charCodeAt(e / r) & o) << 24 - e % 32; return t }(n = function (n) { n = n.replace(/\r\n/g, "\n"); let r = ""; for (let t = 0; t < n.length; t++) { const o = n.charCodeAt(t); o < 128 ? r += String.fromCharCode(o) : o > 127 && o < 2048 ? (r += String.fromCharCode(o >> 6 | 192), r += String.fromCharCode(63 & o | 128)) : (r += String.fromCharCode(o >> 12 | 224), r += String.fromCharCode(o >> 6 & 63 | 128), r += String.fromCharCode(63 & o | 128)) } return r }(n)), n.length * r)) }