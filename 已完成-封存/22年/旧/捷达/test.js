/*
@jack 猿星球

注册和下载地址
https://www.yuanxingqiu.info/web/download/#/download?inviteCode=LR3MVW3

10000猿分  大概 8块钱  有人收 要自己找人 脚本一天2000左右 猿分

注册后抓包app.yuanxingqiu.info域名

accessToken的值和deviceToken的值  

全部都在请求的header里面

以accessToken#deviceToken 隔开

填入变量yxqCookie里面

多账户回车分割  定时一小时一次 或者半小时一次
const $ = new Env("猿星球");
*/
const $ = new Env("猿星球");
let envSplitor = ['\n']
let ckName = 'yxqCookie'
let userCookie = ($.isNode() ? process.env[ckName] : $.getdata(ckName)) || '';

let userList = []
let userIdx = 0
let userCount = 0

const defaultUA = 'okhttp/3.14.7'

///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx
        this.name = this.index
        this.cFlag = 0
        this.ck = str.split('#')
        this.t = this.ck[0]
        this.j = this.ck[1]
        this.w = 'Y^F`DTG3tC$ABaw@#z8@Am7mfeP@piypbjjP@i^r)r6YxMmcER6tNBjw$kLdAMX3'
    }

    get_sign(k, x, t, b) {
        if (k == 1) var str = `appNonce=${x}&appTimeStamp=${t}1&signSercetKey=${this.w}${x}`
        if (k == 2) var str = `appNonce=${x}&appTimeStamp=${t}1&${b}&signSercetKey=${this.w}${x}`
        if (k == 3) var str = `adPlatform=&appNonce=${x}&appTimeStamp=${t}1&${b}&signSercetKey=${this.w}${x}`
        let sign = MD5Encrypt(str).toUpperCase()
        return sign
    }

    async taskApi(paramIn = {}) {
        let paramOut = {}
        try {
            let host = paramIn.url.replace('//', '/').split('/')[1]
            let url = paramIn.url
            if (paramIn.queryParam) url += '?' + $.json2str(paramIn.queryParam, '&', true)
            let urlObject = {
                url: url,
                headers: {
                    "Connection": "close",
                    "appVersion": "1.3.6",
                    "androidVersion": "29",
                    "appType": "android",
                    "appName": "yuanXingQiu",
                    "appTheme": "background_white",
                    "deviceToken": this.j,
                    "accessToken": this.t,
                    "Content-Type": "application/json;charset=utf-8",
                    "Content-Length": "144",
                    "Host": host,
                    "User-Agent": defaultUA
                },
                timeout: 5000,
            }
            if (paramIn.body) {
                urlObject.headers['Content-Type'] = paramIn['Content-Type'] || 'application/json;charset=UTF-8'
                if (typeof paramIn.body === 'object') {
                    if (urlObject.headers['Content-Type'].includes('json')) {
                        urlObject.body = JSON.stringify(paramIn.body)
                    } else {
                        for (let key in paramIn.body) {
                            if (typeof paramIn.body[key] === 'object') {
                                paramIn.body[key] = JSON.stringify(paramIn.body[key])
                            }
                        }
                        urlObject.body = $.json2str(paramIn.body, '&')
                    }
                } else {
                    urlObject.body = paramIn.body
                }
                urlObject.headers['Content-Length'] = urlObject.body ? Buffer.byteLength(urlObject.body, 'utf8') : 0
            }
            if (paramIn.urlObjectParam) Object.assign(urlObject, paramIn.urlObjectParam)
            if (paramIn.headerParam) Object.assign(urlObject.headers, paramIn.headerParam)
            paramOut = Object.assign({}, await httpRequest(paramIn.method, urlObject))
            if (paramOut.err) {
                paramOut.statusCode = paramOut?.err?.response?.statusCode
            } else {
                paramOut.statusCode = paramOut?.resp?.statusCode
                if (paramOut?.resp?.body) {
                    if (typeof paramOut.resp.body === 'object') {
                        paramOut.result = paramOut.resp.body
                    } else {
                        try {
                            paramOut.result = JSON.parse(paramOut.resp.body)
                        } catch (e) {
                            console.log(`[${paramIn.fn}]没有返回json数据`)
                            paramOut.result = paramOut.resp.body
                        }
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async queryUserIntegral() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let sign = this.get_sign(1, x, t)
            let urlParam = {
                fn: '查账号状态：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/userIntegral/queryUserIntegral`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 100) {
                    console.log(` ${urlParam.fn} CK 正常`)
                } else {
                    console.log(` ${urlParam.fn} 账号无效，CK可能失效`)
                    this.cFlag = 1
                }
            } else {
                console.log(` ${urlParam.fn} 账号无效：${result.msg}`)
                this.cFlag = 1
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async signIn() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let j = 'positionType=1'
            let sign = this.get_sign(2, x, t, j)
            let urlParam = {
                fn: '每日签到：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/signIn/signIn`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                    positionType: '1'
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 100) console.log(` ${urlParam.fn} 奖励 ` + result.data.amount + '\n')
                if (result.code == 400) console.log(` ${urlParam.fn} ` + result.msg + '\n')
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }


    async queryMyAccountByAssetType() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let sign = this.get_sign(1, x, t)
            let urlParam = {
                fn: '查我的收益：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/account/queryMyAccountByAssetType`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 100) {
                    console.log(` ${urlParam.fn} 我的猿分: ` + result.data.account.balance + '\n')
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async queryGameCoin() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let sign = this.get_sign(1, x, t)
            let urlParam = {
                fn: 'queryMyAccountByAssetType',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/gameCoin/queryGameCoin`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 100) {
                    let m = result.data.list
                    for (let i of m) this.id = i.id, await this.getGameCoin()
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async getGameCoin() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let j = 'id=' + this.id
            let sign = this.get_sign(2, x, t, j)
            let urlParam = {
                fn: '四个首页广告：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/gameCoin/getGameCoin`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                    id: this.id
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                100 == result.code && console.log(` ${urlParam.fn} 领取${result.msg}  得到: ${result.data.preAward} 猿分`)
                400 == result.code && console.log(` ${urlParam.fn} ${result.msg}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async welfareDailyList() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let j = 'pageNo=1&pageSize=2147483647'
            let sign = this.get_sign(2, x, t, j)
            let urlParam = {
                fn: '首页列表-任务：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/welfareDaily/welfareDailyList`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                    pageNo: '1',
                    pageSize: '2147483647',
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                let x = result.data.pageInfo.list
                for (let i of x) console.log(`\n ${urlParam.fn} ` + i.welfareDailyId, i.welfareDailyName, ' 任务进度 ' + i.completionCount, '/ ' + i.count),
                    this.id = i.welfareDailyId,
                    this.k = i.count - i.completionCount,
                0 !== this.k && await this.addWelfareDailyTask(),
                0 == this.k && console.log(` ${urlParam.fn} 任务已完成 `),
                1 == i.isAward && console.log(` ${urlParam.fn} ${i.welfareDailyName}  任务奖励已领取 `),
                2 == i.isAward && await this.sendWelfareDailyAward()
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async addWelfareDailyTask() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let j = `welfareDailyId=${this.id}`
            let sign = this.get_sign(2, x, t, j)
            let urlParam = {
                fn: 'TaskALL ：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/welfareDaily/addWelfareDailyTask`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                    welfareDailyId: this.id
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 100) console.log(` ${urlParam.fn} 做任务：${result.msg} `)
                if (result.code == 400) console.log(` ${urlParam.fn} ${result.msg}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async sendWelfareDailyAward() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()

            let j = `welfareDailyId=${this.id}`
            let sign = this.get_sign(2, x, t, j)
            let urlParam = {
                fn: '领取任务奖励：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/welfareDaily/sendWelfareDailyAward`,
                body: {
                    appNonce: x,
                    appSign: sign,
                    appTimeStamp: t,
                    welfareDailyId: this.id
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                100 == result.code && console.log(` ${urlParam.fn} 领取奖励 ${result.data.amount} 领取 ${result.msg}`)
                400 == result.code && console.log(` ${urlParam.fn} 领取 ${result.msg}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async addWelfareRecord() {
        let paramOut = {}
        try {
            let x = $.randomString(32), t = Date.now()
            let j = 'welfareType=1'
            let sign = this.get_sign(3, x, t, j)
            let urlParam = {
                fn: '圈圈视频奖励：',
                method: 'post',
                url: `https://app.yuanxingqiu.info/api/welfareAdvertisement/addWelfareRecord`,
                body: `{"adPlatform":"","appNonce":"${x}","appSign":"${sign}","appTimeStamp":"${t}","welfareType":1}`
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                100 == result.code && console.log(`\n ${urlParam.fn} 领取 ${result.data.amount}猿分 领取 ${result.msg}\n`)
                if (400 == result.code) {
                    console.log(`\n ${urlParam.fn}  今日已全部领取\n`)
                    if (result.msg == '今日领取已受限，请前往其他位置领取') {
                        this.fx = 1
                    }
                }
            }

        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async userTask() {
        let paramOut = {}
        try {
            console.log(`\n============= 账号[${this.index}] =============\n`)
            await this.queryUserIntegral()
            if (1 !== this.cFlag) {
                await this.queryMyAccountByAssetType()
                await this.signIn()
                await this.queryGameCoin()
                await this.welfareDailyList()
                let abc = [...new Array(5).keys()]
                for (let a of abc) {
                    await this.addWelfareRecord()
                    if (this.fx == 1) break
                    let waittime = Math.floor(Math.random() * 30000) + 50000;
                    console.log(` 圈圈视频奖励 等待 ${waittime / 1000}秒...`)
                    await $.wait(waittime);
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }
}

!(async () => {
    if (!checkEnv()) return;
    for (let user of userList) {
        await user.userTask()
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())

////////////////////////////////////////////////////////////////////
function checkEnv() {
    if (userCookie) {
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for (let userCookies of userCookie.split(splitor)) {
            if (userCookies) userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
        console.log(`未找到CK: ${ckName}`)
        return false;
    }

    console.log(`共找到${userCount}个账号`)
    return true
}

////////////////////////////////////////////////////////////////////
async function httpRequest(method, url) {
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            resolve({err, req, resp})
        })
    });
}

////////////////////////////////////////////////////////////////////
function MD5Encrypt(a) {
    function b(a, b) {
        return a << b | a >>> 32 - b
    }

    function c(a, b) {
        var c, d, e, f, g;
        return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f
    }

    function d(a, b, c) {
        return a & b | ~a & c
    }

    function e(a, b, c) {
        return a & c | b & ~c
    }

    function f(a, b, c) {
        return a ^ b ^ c
    }

    function g(a, b, c) {
        return b ^ (a | ~c)
    }

    function h(a, e, f, g, h, i, j) {
        return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e)
    }

    function i(a, d, f, g, h, i, j) {
        return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d)
    }

    function j(a, d, e, g, h, i, j) {
        return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d)
    }

    function k(a, d, e, f, h, i, j) {
        return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d)
    }

    function l(a) {
        for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++;
        return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g
    }

    function m(a) {
        var b, c, d = "", e = "";
        for (c = 0; 3 >= c; c++) b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2);
        return d
    }

    function n(a) {
        a = a.replace(/\r\n/g, "\n");
        for (var b = "", c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128))
        }
        return b
    }

    var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11,
        I = 16, J = 23, K = 6, L = 10, M = 15, N = 21;
    for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16) p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s);
    var O = m(t) + m(u) + m(v) + m(w);
    return O.toLowerCase()
}

////////////////////////////////////////////////////////////////////
function Env(e, s) {
    return "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0), new class {
        constructor(e, s) {
            this.name = e, this.notifyStr = "", this.startTime = (new Date).getTime(), Object.assign(this, s), console.log(`${this.name} 开始运行：
`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        getdata(e) {
            let s = this.getval(e);
            if (/^@/.test(e)) {
                let [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), n = i ? this.getval(i) : "";
                if (n) try {
                    let o = JSON.parse(n);
                    s = o ? this.lodash_get(o, r, "") : s
                } catch (l) {
                    s = ""
                }
            }
            return s
        }

        setdata(e, s) {
            let i = !1;
            if (/^@/.test(s)) {
                let [, r, n] = /^@(.*?)\.(.*?)$/.exec(s), o = this.getval(r);
                try {
                    let l = JSON.parse(r ? "null" === o ? null : o || "{}" : "{}");
                    this.lodash_set(l, n, e), i = this.setval(JSON.stringify(l), r)
                } catch (a) {
                    let h = {};
                    this.lodash_set(h, n, e), i = this.setval(JSON.stringify(h), r)
                }
            } else i = this.setval(e, s);
            return i
        }

        getval(e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(e) : this.isQuanX() ? $prefs.valueForKey(e) : this.isNode() ? (this.data = this.loaddata(), this.data[e]) : this.data && this.data[e] || null
        }

        setval(e, s) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(e, s) : this.isQuanX() ? $prefs.setValueForKey(e, s) : this.isNode() ? (this.data = this.loaddata(), this.data[s] = e, this.writedata(), !0) : this.data && this.data[s] || null
        }

        send(e, s, i = () => {
        }) {
            if ("get" != e && "post" != e && "put" != e && "delete" != e) {
                console.log(`无效的http方法：${e}`);
                return
            }
            if ("get" == e && s.headers ? (delete s.headers["Content-Type"], delete s.headers["Content-Length"]) : s.body && s.headers && !s.headers["Content-Type"] && (s.headers["Content-Type"] = "application/x-www-form-urlencoded"), this.isSurge() || this.isLoon()) {
                this.isSurge() && this.isNeedRewrite && (s.headers = s.headers || {}, Object.assign(s.headers, {"X-Surge-Skip-Scripting": !1}));
                let r = {method: e, url: s.url, headers: s.headers, timeout: s.timeout, data: s.body};
                "get" == e && delete r.data, $axios(r).then(e => {
                    let {status: s, request: r, headers: n, data: o} = e;
                    i(null, r, {statusCode: s, headers: n, body: o})
                }).catch(e => console.log(e))
            } else if (this.isQuanX()) s.method = e.toUpperCase(), this.isNeedRewrite && (s.opts = s.opts || {}, Object.assign(s.opts, {hints: !1})), $task.fetch(s).then(e => {
                let {statusCode: s, request: r, headers: n, body: o} = e;
                i(null, r, {statusCode: s, headers: n, body: o})
            }, e => i(e)); else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                let {url: n, ...o} = s;
                this.instance = this.got.extend({followRedirect: !1}), this.instance[e](n, o).then(e => {
                    let {statusCode: s, request: r, headers: n, body: o} = e;
                    i(null, r, {statusCode: s, headers: n, body: o})
                }, e => {
                    let {message: s, request: r, response: n} = e;
                    i(s, r, n)
                })
            }
        }

        time(e, s = null) {
            let i = s ? new Date(s) : new Date, r = {
                "M+": i.getMonth() + 1,
                "d+": i.getDate(),
                "h+": i.getHours(),
                "m+": i.getMinutes(),
                "s+": i.getSeconds(),
                "q+": Math.floor((i.getMonth() + 3) / 3),
                S: i.getMilliseconds()
            };
            for (let n in /(y+)/.test(e) && (e = e.replace(RegExp.$1, (i.getFullYear() + "").substr(4 - RegExp.$1.length))), r) RegExp("(" + n + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? r[n] : ("00" + r[n]).substr(("" + r[n]).length)));
            return e
        }

        async showmsg() {
            if (!this.notifyStr) return;
            let e = this.name + " 运行通知\n\n" + this.notifyStr;
            if ($.isNode()) {
                var s = require("./sendNotify");
                console.log("\n============== 推送 =============="), await s.sendNotify(this.name, e)
            } else this.msg(e)
        }

        logAndNotify(e) {
            console.log(e), this.notifyStr += e, this.notifyStr += "\n"
        }

        logAndNotifyWithTime(e) {
            let s = "[" + this.time("hh:mm:ss.S") + "]" + e;
            console.log(s), this.notifyStr += s, this.notifyStr += "\n"
        }

        logWithTime(e) {
            console.log("[" + this.time("hh:mm:ss.S") + "]" + e)
        }

        msg(e = t, s = "", i = "", r) {
            let n = e => {
                if (!e) return e;
                if ("string" == typeof e) return this.isLoon() ? e : this.isQuanX() ? {"open-url": e} : this.isSurge() ? {url: e} : void 0;
                if ("object" == typeof e) {
                    if (this.isLoon()) {
                        let s;
                        return {openUrl: e.openUrl || e.url || e["open-url"], mediaUrl: e.mediaUrl || e["media-url"]}
                    }
                    if (this.isQuanX()) {
                        let i;
                        return {
                            "open-url": e["open-url"] || e.url || e.openUrl,
                            "media-url": e["media-url"] || e.mediaUrl
                        }
                    }
                    if (this.isSurge()) return {url: e.url || e.openUrl || e["open-url"]}
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, n(r)) : this.isQuanX() && $notify(e, s, i, n(r)));
            let o = ["", "============== 系统通知 =============="];
            o.push(e), s && o.push(s), i && o.push(i), console.log(o.join("\n"))
        }

        getMin(e, s) {
            return e < s ? e : s
        }

        getMax(e, s) {
            return e < s ? s : e
        }

        padStr(e, s, i = "0") {
            let r = String(e), n = s > r.length ? s - r.length : 0, o = "";
            for (let l = 0; l < n; l++) o += i;
            return o + r
        }

        json2str(e, s, i = !1) {
            let r = [];
            for (let n of Object.keys(e).sort()) {
                let o = e[n];
                o && i && (o = encodeURIComponent(o)), r.push(n + "=" + o)
            }
            return r.join(s)
        }

        str2json(e, s = !1) {
            let i = {};
            for (let r of e.split("&")) {
                if (!r) continue;
                let n = r.indexOf("=");
                if (-1 == n) continue;
                let o = r.substr(0, n), l = r.substr(n + 1);
                s && (l = decodeURIComponent(l)), i[o] = l
            }
            return i
        }

        randomPattern(e, s = "abcdef0123456789") {
            let i = "";
            for (let r of e) "x" == r ? i += s.charAt(Math.floor(Math.random() * s.length)) : "X" == r ? i += s.charAt(Math.floor(Math.random() * s.length)).toUpperCase() : i += r;
            return i
        }

        randomString(e, s = "abcdef0123456789") {
            let i = "";
            for (let r = 0; r < e; r++) i += s.charAt(Math.floor(Math.random() * s.length));
            return i
        }

        randomList(e) {
            return e[Math.floor(Math.random() * e.length)]
        }

        wait(e) {
            return new Promise(s => setTimeout(s, e))
        }

        done(e = {}) {
            let s = (new Date).getTime(), i = (s - this.startTime) / 1e3;
            console.log(`
${this.name} 运行结束，共运行了 ${i} 秒！`), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(e)
        }
    }(e, s)
}
