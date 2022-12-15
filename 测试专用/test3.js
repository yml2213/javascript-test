
const $ = new Env('追书神器免费版 ')
const notify = $.isNode() ? require('./sendNotify') : ''

const debug = 1 //0为关闭调试，1为打开调试,默认为0
let status
let result = ''

status = (status = $.getval('zssqmfbzppstatus') || '1') > 1 ? `${status}` : '' // 账号扩展字符
let zssqmfbzppArr = []
let zssqmfbzpp = $.isNode() ? process.env.zssqmfbzpp ? process.env.zssqmfbzpp : '' : $.getdata('zssqmfbzpp') ? $.getdata('zssqmfbzpp') : ''

let zssqmfbzpps = ''

let tz = $.getval('zssqmfbzpptz') || '1'
$.message = ''
let tingzhi = 0
//开始运行
!(async () => {
    if (typeof $request !== 'undefined') {
        kzjd()
    } else {
        if (!$.isNode()) {
            zssqmfbzppArr.push($.getdata('zssqmfbzpp'))

            let count = $.getval('zssqmfbzppcount') || '1'
            zssqmfbzppArr = zssqmfbzpp.split('\n')

            for (let i = 2; i <= count; i++) {
                zssqmfbzppArr.push($.getdata(`zssqmfbzpp${i}`))

            }
            if (!zssqmfbzppArr[0]) {
                $.log(`\n【提示】：请填写变量zssqmfbzpp 再运行\n`)
                $.message += `\n【提示】：请填写变量zssqmfbzpp 再运行\n`
            } else {
                console.log(
                    `-------------共${zssqmfbzppArr.length}个账号-------------\n`
                )
            }
            for (let i = 0; i < zssqmfbzppArr.length; i++) {
                if (zssqmfbzppArr[i]) {
                    zssqmfbzpp = zssqmfbzppArr[i]

                    $.index = i + 1
                    console.log(`\n开始【追书神器免费版 账户 ${$.index}】`)

                    await kzjb()
                }
            }
        } else {
            if (process.env.zssqmfbzpp && process.env.zssqmfbzpp.indexOf('\n') > -1) {
                zssqmfbzppArr = process.env.zssqmfbzpp.split('\n')
            } else {
                zssqmfbzpps = [process.env.zssqmfbzpp]
            }
            Object.keys(zssqmfbzpps).forEach((item) => {
                if (zssqmfbzpps[item]) {
                    zssqmfbzppArr.push(zssqmfbzpps[item])
                }
            })


            if (!zssqmfbzppArr[0]) {
                $.log(`\n【提示】：请填写变量zssqmfbzpp 再运行\n  `)
                $.message += `\n【提示】：请填写变量zssqmfbzpp 再运行\n`
            } else {
                console.log(
                    `-------------共${zssqmfbzppArr.length}个账号-------------\n`
                )
            }
            for (let k = 0; k < zssqmfbzppArr.length; k++) {
                zssqmfbzpp = zssqmfbzppArr[k]

                $.index = k + 1
                console.log(`\n开始【追书神器免费版 账户 ${$.index}】`)
                //  $.message +=`\n【追书神器免费版 账户 ${$.zh}】`
                await kzjb()
            }
        }
    }
    message() //通知
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
async function kzjb() {
    token = zssqmfbzpp.split('#')[0]


    //用户
    await info()
    await $.wait(1000)


    //签到
    await qd()
    await $.wait(1000)

    //签到翻倍
    await qdfb()
    await $.wait(1000)

    //答题王者
    console.log(` \n--------开始任务答题王者--------\n `)
    for (let x = 0; x < 5; x++) {
        $.index = x + 1
        await dtwz()
        await $.wait(5000)
        if (tingzhi == 1) break
    }
    await $.wait(5000)

    //成语大赢家
    console.log(` \n--------开始任务成语大赢家--------\n `)
    for (let x = 0; x < 15; x++) {
        $.index = x + 1
        await cydyj()
        await $.wait(5000)
        if (tingzhi == 1) break
    }
    await $.wait(5000)


    //惊喜砸金蛋
    console.log(` \n--------开始任务惊喜砸金蛋--------\n `)
    for (let x = 0; x < 10; x++) {
        $.index = x + 1
        await jxzjd()
        await $.wait(5000)
        if (tingzhi == 1) break
    }
    await $.wait(5000)



    //扭蛋敲敲看
    console.log(` \n--------开始任务扭蛋敲敲看--------\n `)
    for (let x = 0; x < 6; x++) {
        $.index = x + 1
        await ndqqk()
        await $.wait(5000)
        if (tingzhi == 1) break
    }
    await $.wait(5000)







}
//签到
function qd(timeout = 0) {

    return new Promise((resolve) => {
        let url = {
            url: `https://goldcoin.zhuishushenqi.com/user/do-sign?token=${token}`,
            headers: {
                "Host": "goldcoin.zhuishushenqi.com",
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
                "Origin": "https://h5.zhuishushenqi.com",
                "X-Requested-With": "com.ushaqi.zhuishushenqi.adfree",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Referer": "https://h5.zhuishushenqi.com/",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
            },

        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.ok == true) {
                    console.log(` 签到成功获得：${data.gold}金币🎉`)
                } else if (data.ok == false) {

                    console.log(`今日已签到`)

                }

            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//签到翻倍
function qdfb(timeout = 0) {

    return new Promise((resolve) => {

        let url = {
            url: `https://goldcoin.zhuishushenqi.com/tasks/videoAdGift?b-zssq=MDRjZjRmNWI2ZDhjMjllOQ==`,
            headers: {
                "Host": "goldcoin.zhuishushenqi.com",
                "Connection": "keep-alive",
                "Content-Length": "332",
                "Accept": "application/json, text/plain, */*",
                "B-Zssq": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
                "Content-Type": "application/x-www-form-urlencoded",
                "Origin": "https://h5.zhuishushenqi.com",
                "X-Requested-With": "com.ushaqi.zhuishushenqi.adfree",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Referer": "https://h5.zhuishushenqi.com/",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            body: `version=3&adType=videoSign&token=${token}&data=o0SECTVGC9KuJXHwTII9oVq9n0MifkBoJU345cFRL8dl0IW09y%2BB3ASCRiOc4pGGH1S4Qo6uW2VW3R1vuAq3bA%3D%3D&app=zhuishuFree&rate=4`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)
                if (data.ok == true) {
                    console.log(` 获得：${data.data.awardTip}🎉`)
                } else if (data.ok == false) {

                    console.log(`今日签到已翻倍`)

                }





            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//答题王者
function dtwz(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://goldcoinnew.zhuishushenqi.com/redPacket/completeTask?token=${token}`,
            headers: {
                "Host": "goldcoinnew.zhuishushenqi.com",
                "Connection": "keep-alive",
                "Content-Length": "111",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (Linux; Android 11; M2007J3SC Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.210 Mobile Safari/537.36",
                "Content-Type": "application/json;charset=UTF-8",
                "Origin": "https://h5.zhuishushenqi.com",
                "X-Requested-With": "com.ushaqi.zhuishushenqi.adfree",
                "Sec-Fetch-Site": "same-site",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Dest": "empty",
                "Referer": "https://h5.zhuishushenqi.com/",
                "Accept-Encoding": "gzip, deflate",
                "Accept-Language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
            },
            body: `{"action":"rw-self-datiwangzhe","channel":"FVivo","position":"goldTask","taskVersion":2001,"version":"3.23.10"}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.ecode == 0) {

                    console.log(`答题：成功🎉\n获得：${data.data.gold.rewardText}🎉`)


                } else if (data.ecode == 50110) {

                    console.log(`今日已全部答完`)


                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//成语大赢家
function cydyj(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `http://goldcoin.zhuishushenqi.com/thirdpartypromotion/addUserReward`,
            headers: {
                "X-Device-Id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "X-User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-android-id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "B-Zssq": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-app-name": "zhuishuFree",
                "Host": "goldcoin.zhuishushenqi.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": "381",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip"
            },
            body: `token=${token}&promotionId=60116a16998a8da38bcaf155&data=eqp9IS4Ek2yBwLMPQIewk5l3tn0bG5Q6L2%2FQpI%2B1oJ6mQYPxTuXhJvVO7ODMDIrv2BGe%2BaHqDFir%0AVASwDNoA4g%3D%3D%0A&app=free&platfrom=android&deviceId=04cf4f5b6d8c29e9`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {

                    console.log(`参与：${data.msg}🎉\n获得：${data.data.gold}金币🎉`)


                } else if (data.ok == false) {

                    console.log(`${data.msg}`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//惊喜砸金蛋
function jxzjd(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `http://goldcoin.zhuishushenqi.com/thirdpartypromotion/addUserReward`,
            headers: {
                "X-Device-Id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "X-User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-android-id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "B-Zssq": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-app-name": "zhuishuFree",
                "Host": "goldcoin.zhuishushenqi.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": "381",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip"
            },
            body: `token=${token}&promotionId=60116a16998a8da38bcaf156&data=eqp9IS4Ek2yBwLMPQIewk5l3tn0bG5Q6L2%2FQpI%2B1oJ6mQYPxTuXhJvVO7ODMDIrvVDedgm60xwsx%0AyEWBoun4xA%3D%3D%0A&app=free&platfrom=android&deviceId=04cf4f5b6d8c29e9`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {

                    console.log(`参与：${data.msg}🎉\n获得：${data.data.gold}金币🎉`)


                } else if (data.ok == false) {

                    console.log(`${data.msg}`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//扭蛋敲敲看
function ndqqk(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `http://goldcoin.zhuishushenqi.com/thirdpartypromotion/addUserReward`,
            headers: {
                "X-Device-Id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "X-User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-android-id": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "B-Zssq": "MDRjZjRmNWI2ZDhjMjllOQ==",
                "User-Agent": "ZhuiShuShenQi/3.23.10 (Android 11; Xiaomi Apollo / Redmi M2007J3SC; )[preload=false;locale=zh_CN;clientidbase=]",
                "x-app-name": "zhuishuFree",
                "Host": "goldcoin.zhuishushenqi.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": "381",
                "Connection": "Keep-Alive",
                "Accept-Encoding": "gzip"
            },
            body: `token=${token}&&promotionId=60116a16998a8da38bcaf157&data=eqp9IS4Ek2yBwLMPQIewk5l3tn0bG5Q6L2%2FQpI%2B1oJ6mQYPxTuXhJvVO7ODMDIrvtihTuvRhIlTe%0ADGOdwcEUVQ%3D%3D%0A&app=free&platfrom=android&deviceId=04cf4f5b6d8c29e9`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.code == 0) {

                    console.log(`参与：${data.msg}🎉\n获得：${data.data.gold}金币🎉`)


                } else if (data.ok == false) {

                    console.log(`${data.msg}`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//用户信息
function info(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://goldcoin.zhuishushenqi.com/account?token=${token}`,
            headers: {
                "Host": "goldcoinnew.zhuishushenqi.com",
                "Origin": "https://h5.zhuishushenqi.com",
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9",
                "Referer": "https://h5.zhuishushenqi.com/",
                "Accept-Encoding": "gzip, deflate, br"
            },
            // body: ``,
        }
        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data) {
                    ye = data.info.balance
                    console.log(`用户：${data.info.nickname}🎉\n余额：${ye}\n绑定提现账号：${data.info.zhifubao}`)
                    $.message += (`\n用户：${data.info.nickname}\n绑定提现账号：${data.info.zhifubao}\n余额：${ye}🎉\n`)
                    if (ye >= 30) {
                        await tx()
                        await $.wait(1000)
                    }

                } else {

                    console.log(`参数错误`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//tx
function tx(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://goldcoin.zhuishushenqi.com/v3/enchashment`,
            headers: {
                "Host": "goldcoin.zhuishushenqi.com",
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "https://h5.zhuishushenqi.com",
                "Accept-Encoding": "gzip, deflate, br",
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Referer": "https://h5.zhuishushenqi.com/",
                "Content-Length": "403",
                "Accept-Language": "zh-CN,zh-Hans;q=0.9"
            },
            body: `{"amount":30,"channel":"2","shuomeiId":"BqDpWXVLwsnoiUlUlk3c1xu6pqMdT8\/gYH0OZgWSTkoABZgPIR+PDhPQNaC9VpQde219cgn59Ee9YYdiVDu4XAQ==","appName":"zhuishu","platform":"101","mark":"normal","token":"${token}","type":"alipay","closeShare":""}`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data) {

                    console.log(`提现：${data.msg}🎉`)
                    $.message += (`   提现：${data.msg}🎉\n`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//通知
async function message() {
    if (tz == 1) {
        $.msg($.name, '', $.message)
    }
    if ($.isNode()) {
        await notify.sendNotify($.name, $.message)
    }
}




//env模块    不要动  
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = 'GET') { t = 'string' == typeof t ? { url: t } : t; let s = this.get; return 'POST' === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, 'POST') } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = 'box.dat', this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = '\n', this.startTime = (new Date).getTime(), Object.assign(this, e), this.log('', `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return 'undefined' != typeof module && !!module.exports } isQuanX() { return 'undefined' != typeof $task } isSurge() { return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon } isLoon() { return 'undefined' != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata('@chavy_boxjs_userCfgs.httpapi'); i = i ? i.replace(/\n/g, '').trim() : i; let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout'); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split('@'), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: 'cron', timeout: r }, headers: { 'X-Key': o, Accept: '*/*' } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require('fs'), this.path = this.path ? this.path : require('path'); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require('fs'), this.path = this.path ? this.path : require('path'); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, '.$1').split('.'); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ''; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, '') : e } catch (t) { e = '' } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? 'null' === o ? null : o || '{}' : '{}'; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require('got'), this.cktough = this.cktough ? this.cktough : require('tough-cookie'), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length']), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on('redirect', (t, e) => { try { if (t.headers['set-cookie']) { const s = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'), t.headers && delete t.headers['Content-Length'], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { 'X-Surge-Skip-Scripting': !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = 'POST', this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { 'M+': (new Date).getMonth() + 1, 'd+': (new Date).getDate(), 'H+': (new Date).getHours(), 'm+': (new Date).getMinutes(), 's+': (new Date).getSeconds(), 'q+': Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + '').substr(4 - RegExp.$1.length))); for (let s in e) new RegExp('(' + s + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ('00' + e[s]).substr(('' + e[s]).length))); return t } msg(e = t, s = '', i = '', r) { const o = t => { if (!t) return t; if ('string' == typeof t) return this.isLoon() ? t : this.isQuanX() ? { 'open-url': t } : this.isSurge() ? { url: t } : void 0; if ('object' == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t['open-url'], s = t.mediaUrl || t['media-url']; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t['open-url'] || t.url || t.openUrl, s = t['media-url'] || t.mediaUrl; return { 'open-url': e, 'media-url': s } } if (this.isSurge()) { let e = t.url || t.openUrl || t['open-url']; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ['', '==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============']; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join('\n')), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log('', `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log('', `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }