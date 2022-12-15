/*
诗画浦江

账号密码填写到 shpj 里，多账号用换行或@或&隔开
格式：账号#密码

cron: 17 7,20 * * *
const $ = new Env("诗画浦江")
*/
const $ = new Env("诗画浦江");
const Notify = 1;
const notify = require("./sendNotify");

const envSplitor = ['\n', '&', '@'] //支持多种分割
const ckNames = ['shpj'] //支持多变量

let userCookieList = ckNames.map(x => ($.isNode() ? process.env[x] : $.getdata(x)) || '');

let userList = []
let userIdx = 0
let userCount = 0

const comment_word_list = ['努力评论', '来点积分', '火哥厉害']

const defaultContentType = 'application/x-www-form-urlencoded'

const appVer = '1.2.2'
const phoneVer = 'iPhone13,2'
const osType = 'IOS'
const osVer = '15.0'
const channelType = 'Appstore'

const tenantId = 14
const client_id = 12
let channel = ["5f103ebaad61a40f3c8cce88", "622b01cdfe3fc10794f6c747", "61b1aea9ad61a42065f901c9", "5cc2cc821b011b18ee37591b", "5cc2cca7b1985017d6fef816", "5cc2cc56b1985017d6fef814", "5d075f1e1b011b68176a8a00", "5cc2cc981b011b18ee37591c", "5d52be161b011b137b853d18", "5cc2ccbe1b011b18ee37591d", "5cc02969b1985017d6fef804"]

const salt = 'FR*r!isE5W'
global.window = {};
const NodeRSA = require('node-rsa');
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx
        this.name = this.index
        this.valid = false

        let info = str.split('#')
        this.phone = info[0]
        this.pwd = info[1]
        this.channel_id = randomArr(channel)
        this.sessionId = '6378302ab77d2e7e53d7da31'
        this.uuid = randomUUID()
        this.UA = [appVer, this.uuid, phoneVer, osType, osVer, channelType].join(';')
        this.articleList = []
    }

    async taskApi(paramIn = {}) {
        let paramOut = {}
        try {
            let host = paramIn.url.replace('//', '/').split('/')[1]
            let url = paramIn.url
            let path = url.split(host)[1].split('?')[0]
            if (paramIn.queryParam) url += '?' + $.json2str(paramIn.queryParam, '&', true);
            let reqId = randomUUID()
            let t = Date.now()
            let sign = SHA256(`${path}&&${this.sessionId}&&${reqId}&&${t}&&${salt}&&${tenantId}`)
            let urlObject = {
                url: url,
                headers: {
                    'Host': host,
                    'User-Agent': this.UA,
                    'X-SESSION-ID': this.sessionId,
                    'X-REQUEST-ID': reqId,
                    'X-TIMESTAMP': t,
                    'X-TENANT-ID': tenantId,
                    'X-SIGNATURE': sign,
                    'Connection': 'keep-alive',
                },
                timeout: 5000,
            }
            if (paramIn.body) {
                urlObject.headers['Content-Type'] = paramIn['Content-Type'] || defaultContentType
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
                if ($.isNode()) {
                    urlObject.headers['Content-Length'] = urlObject.body ? Buffer.byteLength(urlObject.body, 'utf8') : 0
                } else {
                    urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
                }
            }
            if (paramIn.urlObjectParam) Object.assign(urlObject, paramIn.urlObjectParam);
            if (paramIn.headerParam) Object.assign(urlObject.headers, paramIn.headerParam);
            if (paramIn.debugIn) console.log(urlObject);
            paramOut = Object.assign({}, await httpRequest(paramIn.method, urlObject))
            paramOut.statusCode = paramOut?.err?.response?.statusCode || paramOut?.resp?.statusCode
            if (paramOut.statusCode != 200) {
                console.log(`[${paramIn.fn}]返回[${paramOut.statusCode}]`)
            }
            if (paramIn.debugOut) {
                if (paramOut?.resp?.headers['set-cookie']) {
                    console.log(paramOut?.resp?.headers['set-cookie'])
                }
                if (paramOut?.resp?.body) {
                    console.log(paramOut?.resp?.body)
                }
            }
            if (paramOut?.resp?.body) {
                if (typeof paramOut.resp.body === 'object') {
                    paramOut.result = paramOut.resp.body || {}
                } else {
                    try {
                        paramOut.result = JSON.parse(paramOut.resp.body) || {}
                    } catch (e) {
                        //console.log(`[${paramIn.fn}]没有返回json数据`)
                        paramOut.result = paramOut.resp.body || {}
                    }
                }
            } else {
                paramOut.result = {}
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async credentialAuth() {
        let paramOut = {}
        try {
            let encryptedPwd = aesencrypt(this.pwd)
            let urlParam = {
                fn: 'credentialAuth',
                method: 'post',
                url: `https://passport.tmuyun.com/web/oauth/credential_auth`,
                body: {
                    client_id,
                    password: encodeURIComponent(encryptedPwd),
                    phone_number: this.phone,
                },
                //debugIn: true,
            }
            //  console.log(urlParam)
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                await this.login(result.data.authorization_code.code)
            } else {
                console.log(`账号[${this.index}]密码登录失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async login(code) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'login',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/zbtxz/login`,
                body: {
                    code,
                    token: '',
                    type: -1,
                    union_id: '',
                }
            }
            //  console.log(urlParam)
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            // console.log(result)
            if (result.code == 0) {
                this.valid = true
                this.sessionId = result.data.session.id
                console.log(`账号[${this.index}]登录成功，SESSION-ID: ${this.sessionId}`)
            } else {
                console.log(`账号[${this.index}]票据登录失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async account_detail() {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'account_detail',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/user_mumber/account_detail`,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                this.point = result.data.rst.total_integral
                this.accountId = result.data.rst.id
                this.refCode = result.data.rst.ref_code
                this.phone = result.data.rst.phone_number
                console.log(`手机: ${this.phone}`)
                console.log(`积分: ${this.point}`)
                console.log(`ID: ${this.accountId}`)
                console.log(`推荐码: ${this.refCode}`)
            } else {
                console.log(`账号[${this.index}]查询账号失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async doSign() {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'doSign',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/user_mumber/sign`,
                //debugIn: true,
                //debugOut: true,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                console.log(`签到成功`)
            } else {
                console.log(`签到失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async doTask(task) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'doTask',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/user_mumber/doTask`,
                body: {
                    member_type: task.member_task_type,
                },
                //debugIn: true,
                //debugOut: true,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                if (result?.data?.score_notify) {
                    console.log(`完成任务[${result.data.score_notify.name}]获得${result.data.score_notify.integral}积分，${result.data.score_notify.experience}经验`)
                } else {
                    console.log(`完成任务[${task.name}]成功`)
                }
            } else {
                console.log(`完成任务[${task.name}]失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async getArticleList(paramIn = {}) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'getArticleList',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/article/channel_list?channel_id=${this.channel_id}&is_new=1&size=50`,

                //debugIn: true,
                //debugOut: true,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                this.articleList = result?.data?.article_list || []
                this.articleList = this.articleList.sort(function () { return Math.random() - 0.5 })
            } else {
                console.log(`获取文章列表失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async readArticle(article) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'readArticle',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/article/detail`,
                queryParam: {
                    id: article.id,
                    url_Path: '/webDetails/news',
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                console.log(`阅读文章成功`)
            } else {
                console.log(`阅读文章失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async createComment(article) {
        let paramOut = {}
        try {
            let command_str = $.randomList(comment_word_list) + $.randomString(4, '0123456789')
            let urlParam = {
                fn: 'createComment',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/comment/create`,
                body: {
                    channel_article_id: article.id,
                    content: encodeURIComponent(command_str),
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                console.log(`评论文章成功`)
            } else {
                console.log(`评论文章失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async deleteComment(comment_id) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'deleteComment',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/comment/delete`,
                body: { comment_id }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                console.log(`删除文章评论[${comment_id}]成功`)
            } else {
                console.log(`删除文章评论[${comment_id}]失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async like(article) {
        let paramOut = {}
        try {
            let command_str = $.randomList(comment_word_list) + $.randomString(4, '0123456789')
            let urlParam = {
                fn: 'like',
                method: 'post',
                url: `https://vapp.tmuyun.com/api/favorite/like`,
                body: {
                    action: 1,
                    id: article.id,
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                console.log(`点赞文章成功`)
            } else {
                console.log(`点赞文章失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async getCommentList(article) {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'getCommentList',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/comment/list`,
                queryParam: {
                    channel_article_id: article.id,
                    size: 20,
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                let comment_list = result?.data?.comment_list || []
                for (let item of comment_list.filter(x => x.account_id == this.accountId)) {
                    await this.deleteComment(item.id)
                }
            } else {
                console.log(`获取文章[${article.id}]评论失败: ${result.message}`)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut);
        }
    }

    async getTaskList() {
        let paramOut = {}
        try {
            let urlParam = {
                fn: 'getTaskList',
                method: 'get',
                url: `https://vapp.tmuyun.com/api/user_mumber/numberCenter`,
                queryParam: {
                    is_new: 1,
                }
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            let result = paramOut.result
            //console.log(result)
            if (result.code == 0) {
                for (let days of (result.data?.daily_sign_info?.daily_sign_list?.filter(x => x.current == '今天') || [])) {
                    console.log(`今天${days.signed ? '已' : '未'}签到`)
                    if (!days.signed) {
                        await this.doSign();
                    }
                }
                let taskList = result?.data.rst?.user_task_list || []
                for (let task of taskList) {
                    console.log(`${task.name} -- ${task.finish_times}/${task.frequency}，${task.completed ? '已' : '未'}完成`)
                }
                await this.getArticleList()
                for (let task of taskList.filter(x => !x.completed)) {
                    for (let i = task.finish_times; i < task.frequency; i++) {
                        let art = null
                        switch (task.member_task_type) {
                            case 2: //新闻资讯阅读
                                if (!this.articleList.length) break;
                                art = this.articleList[i]
                                await this.readArticle(art)
                                break;
                            case 4: //新闻资讯评论
                                if (!this.articleList.length) break;
                                art = this.articleList[i]
                                await this.createComment(art)
                                await this.getCommentList(art)
                                break;
                            case 5: //新闻资讯点赞
                                if (!this.articleList.length) break;
                                art = this.articleList[i]
                                await this.like(art)
                                break;
                            case 7: //邀请好友
                                break;
                            case 3: //分享资讯给好友
                            case 6: //使用本地服务
                            default:
                                await this.doTask(task)
                                break;
                        }
                    }
                }
            } else {
                console.log(`查询签到状态失败: ${result.message}`)
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
            console.log(`\n============= 账号[${this.index}] =============`)
            await this.credentialAuth();
            if (!this.valid) return Promise.resolve(paramOut);
            await this.account_detail();
            await this.getTaskList();
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
        await user.userTask();
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())

///////////////////////////////////////////////////////////////////
function randomUUID() {
    return $.randomPattern('XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX')
}

function checkEnv() {
    for (let userCookie of userCookieList) {
        if (!userCookie) continue;
        let splitor = envSplitor[0];
        for (let sp of envSplitor) {
            if (userCookie.includes(sp)) {
                splitor = sp;
                break;
            }
        }
        for (let userCookies of userCookie.split(splitor).filter(x => !!x)) {
            userList.push(new UserInfo(userCookies))
        }
    }
    userCount = userList.length

    if (!userCount) {
        console.log(`未找到CK，请检查变量${ckNames.join('或')}`)
        return false;
    }

    console.log(`共找到${userCount}个账号`)
    return true
}
function aesencrypt(data) {
    const publicKey = "-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD6XO7e9YeAOs+cFqwa7ETJ+WXizPqQeXv68i5vqw9pFREsrqiBTRcg7wB0RIp3rJkDpaeVJLsZqYm5TW7FWx/iOiXFc+zCPvaKZric2dXCw27EvlH5rq+zwIPDAJHGAfnn1nmQH7wR3PCatEIb8pz5GFlTHMlluw4ZYmnOwg+thwIDAQAB-----END PUBLIC KEY-----";
    const nodersa = new NodeRSA(publicKey);
    nodersa.setOptions({ encryptionScheme: 'pkcs1' });
    const encrypted = nodersa.encrypt(data, 'base64');
    return encrypted;
}
////////////////////////////////////////////////////////////////////
async function httpRequest(method, url) {
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            resolve({ err, req, resp })
        })
    });
}
function randomArr(arr) {
    return arr[parseInt(Math.random() * arr.length, 10)];
}
////////////////////////////////////////////////////////////////////
//SHA256
function SHA256(n) { const r = 8, t = 0; function o(n, r) { const t = (65535 & n) + (65535 & r); return (n >> 16) + (r >> 16) + (t >> 16) << 16 | 65535 & t } function e(n, r) { return n >>> r | n << 32 - r } function u(n, r) { return n >>> r } function c(n, r, t) { return n & r ^ ~n & t } function f(n, r, t) { return n & r ^ n & t ^ r & t } function i(n) { return e(n, 2) ^ e(n, 13) ^ e(n, 22) } function h(n) { return e(n, 6) ^ e(n, 11) ^ e(n, 25) } function C(n) { return e(n, 7) ^ e(n, 18) ^ u(n, 3) } return function (n) { const r = t ? "0123456789ABCDEF" : "0123456789abcdef"; let o = ""; for (let t = 0; t < 4 * n.length; t++)o += r.charAt(n[t >> 2] >> 8 * (3 - t % 4) + 4 & 15) + r.charAt(n[t >> 2] >> 8 * (3 - t % 4) & 15); return o }(function (n, r) { const t = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298], a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225], g = new Array(64); let l, d, A, S, m, s, b, p, v, w, y, B; for (n[r >> 5] |= 128 << 24 - r % 32, n[15 + (r + 64 >> 9 << 4)] = r, v = 0; v < n.length; v += 16) { for (l = a[0], d = a[1], A = a[2], S = a[3], m = a[4], s = a[5], b = a[6], p = a[7], w = 0; w < 64; w++)g[w] = w < 16 ? n[w + v] : o(o(o(e(D = g[w - 2], 17) ^ e(D, 19) ^ u(D, 10), g[w - 7]), C(g[w - 15])), g[w - 16]), y = o(o(o(o(p, h(m)), c(m, s, b)), t[w]), g[w]), B = o(i(l), f(l, d, A)), p = b, b = s, s = m, m = o(S, y), S = A, A = d, d = l, l = o(y, B); a[0] = o(l, a[0]), a[1] = o(d, a[1]), a[2] = o(A, a[2]), a[3] = o(S, a[3]), a[4] = o(m, a[4]), a[5] = o(s, a[5]), a[6] = o(b, a[6]), a[7] = o(p, a[7]) } var D; return a }(function (n) { const t = [], o = (1 << r) - 1; for (let e = 0; e < n.length * r; e += r)t[e >> 5] |= (n.charCodeAt(e / r) & o) << 24 - e % 32; return t }(n = function (n) { n = n.replace(/\r\n/g, "\n"); let r = ""; for (let t = 0; t < n.length; t++) { const o = n.charCodeAt(t); o < 128 ? r += String.fromCharCode(o) : o > 127 && o < 2048 ? (r += String.fromCharCode(o >> 6 | 192), r += String.fromCharCode(63 & o | 128)) : (r += String.fromCharCode(o >> 12 | 224), r += String.fromCharCode(o >> 6 & 63 | 128), r += String.fromCharCode(63 & o | 128)) } return r }(n)), n.length * r)) }
////////////////////////////////////////////////////////////////////
function Env(name, env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name, env) {
            this.name = name
            this.notifyStr = ''
            this.notifyFlag = false
            this.startTime = (new Date).getTime()
            Object.assign(this, env)
            console.log(`${this.name} 开始运行：\n`)
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
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            }
            else {
                s = this.setval(t, e);
            }
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        send(m, t, e = (() => { })) {
            if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if (m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if (t.body && t.headers) {
                if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 });
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if (m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })),
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: i,
                            request: q,
                            headers: r,
                            body: o
                        } = t;
                        e(null, q, {
                            statusCode: i,
                            headers: r,
                            body: o
                        })
                    }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        request: q,
                        response: i
                    } = t;
                    e(s, q, i)
                })
            }
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
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        async showmsg() {
            if (!this.notifyFlag) return;
            if (!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
            if ($.isNode()) {
                var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }
        logAndNotify(str, flag = true) {
            if (flag) this.notifyFlag = true
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }
        logAndNotifyWithTime(str, flag = true) {
            if (flag) this.notifyFlag = true
            let t = '[' + this.time('hh:mm:ss.S') + ']' + str
            console.log(t)
            this.notifyStr += t
            this.notifyStr += '\n'
        }
        logWithTime(str) {
            console.log('[' + this.time('hh:mm:ss.S') + ']' + str)
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n"))
        }
        getMin(a, b) {
            return ((a < b) ? a : b)
        }
        getMax(a, b) {
            return ((a < b) ? b : a)
        }
        padStr(num, length, padding = '0') {
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let retStr = ''
            for (let i = 0; i < numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr;
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c);
        }
        str2json(str, decodeUrl = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue;
                let idx = item.indexOf('=')
                if (idx == -1) continue;
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret;
        }
        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length));
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase();
                } else {
                    str += chars
                }
            }
            return str
        }
        randomString(len, charset = 'abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return str;
        }
        randomList(a) {
            let idx = Math.floor(Math.random() * a.length)
            return a[idx]
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        async done(t = {}) {
            await this.showmsg();
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
            if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name, env)
}
