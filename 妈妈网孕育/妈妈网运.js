/*


 */
VAL = 'mmwyy'
NAME = `妈妈网孕育`
VALY = ['mmwyyurl']
G = '\n Tom  2022.11.12 完成  \n\n频道：https://t.me/tom_ww \n'


$ = Env(NAME)
ntfst = 1 // 0为关闭外部推送，1为12 23 点外部推送
msgst = 2 // 0为关闭通知，1为所有通知，2为12 23 点通知  ， 3为 6 12 18 23 点通知
msgm = 10 // 通知 默认控制在0-10分内
const logs = 0 // 0关闭日志，1原始日志，2格式化，3格式化且解码，
const ckStr = ($.isNode() ? eval(`process.env.${VALY}`) : eval(`$.getdata(${VALY[0]})`)) || '1564672525@https://papi.mama.cn/api/welfare/get_video_reward_token?app_auth_token=7de7f664bb937922bbdf9f69d2193245ba72b700&app_id=3&appkey=pt_iphone&bb_birthday=2023-07-29&bid=54212417&mode=1&open_mmid=dea2f70d1d045fe4e9970aeacff63bac15539054&prepare_pt_date=&rel=1&sign=6643172F9FAFC89F765A736EA32FDCD9&source=2&statistics_app_channel=AppStore&statistics_app_params=eMS2QKXoqjGwi85%2Brgc1CDTMLkPl9fsPozgz//BlaAuOZvoVSefqMzMRGcv6NMi1KsOJ8oA8%2BlloZgIbFfY0uYbNUAnUxr3HlbH1luOZb5SsjoxPplw6s3n8QGPH%2BknE9IbY0mDoGbx%2BY%2BB129can367e0j3Zfq2786jAAlBW0AKPg5df8W4tTDMsa1Kn9V/X5jtCJ8aKNt/gSbiXSZeKQO/cnPe%2BBeTZhh4ITW9dX2pm0M%2BS0N6Hno%2B0TlK3UpPN9p1Hx9vR7ifETnGq1UeIfo3gbtGCjuy4MKAE8piUCDYUb6r7V/zBLkAAO4fO1EZfnpP4SOzS8AdQ1rW6GeHk7h6aho3Yd0NIMFf1zir0PFfg50SHZIgRGY7fHNHWxrq6nezZYB/i8erKR3IbIcQvE1hgs1xfC3XCppxl7teI/3FmE61nFT0igEZULJ5Yg11&statistics_app_source=pt_iphone&t=1668185554&task_name=reward_video&uid=113404606&version=12.10.0';

(K = ''), ($.msge = ''), (DATA = ''), (RZ = '')
if (typeof $request !== 'undefined') {
    if ($request.url.indexOf('member') > -1 && $request.url.indexOf('userInfo') > -1 && $request.url.indexOf('getLoginInfoSpecial') > -1) {
        cks = $request.body
        const ck = cks.split(`"ticket":"`)[1].split(`"`)[0]
        if (ckStr) {
            if (ckStr.indexOf(ck) == -1) {
                ckStr = ckStr + '\n' + ck
                $.setdata(ckStr, VALY)
                ckList = ckStr.split('\n')
                $.msg($.name + ` 获取第${ckList.length}个ck成功: ${ck}`)
            }
        } else {
            $.setdata(ck, VALY)
            $.msg($.name + ` 获取第1个ck成功: ${ck}`)
        }
    }
    $.done()
} else {
    !(async () => {
        ckArr = await $.getCks(ckStr, `${VALY[0]}`)
        $.log(`\n============ 脚本执行 - 北京时间(UTC+8)：${$.nowtime().toLocaleString()} ============\n`)
        $.log(`${G}\n`)
        $.msge += `${G}\n`
        if (ckStr.length == 0) {
            $.msg(NAME, $.time(Number(Date.now())) + `⚠️未获取COOKIE\n请点击前往获取 https://t.me/tom_ww\n`, 'https://t.me/tom_ww', {
                'open-url': 'https://t.me/tom_ww',
            })
            $.done()
        } else {
            acList = ckArr.filter(o => o).map((o, i) => ({
                O: ``,
                ck: i + 1,
                login: true,
                token: "",
                key: o,
                msg: ``,
                noticename: encodeURIComponent(NAME + ' Cookie已失效,请重新上传Cookie'),
                noticeurl: `https://tg.tomtenyears.cf/bot5581957800:AAH--qYkvsIOLdDHh5u8EDK_8S1PU-AdFuY/sendMessage?chat_id=${o.split('@')[0]}&parse_mode=Markdown&text=`,
                urlck: o.split('@')[1],
                header: {},

            }))
            K = `任务🚩`
            if (K == `任务🚩`) {
                for (let ac of acList) {
                    if (ac.key) {
                        await execTask(ac)
                        //   if (ac.login == true) {
                        //     await Task(ac)
                        //   }
                    }
                }
                if (logs >= 3) {
                    console.log(JSON.stringify(acList, null, 3))
                }
            }
            K = `通知🚩`
            if (K == `通知🚩`) {
                $.msge += acList.map(ac => ac.msg).join('\n')
                await $.msgShow()

            }
        }
    })()
        .catch(e => {
            $.log('', `❌ ${NAME}, ${K}: 失败! 原因: ${e}!`, '')
        })
        .finally(() => {
            $.done()
        })
}


async function execTask(ac) {

    O = ac.O = `${$.name + ac.ck}🔔`


    ckcks = `task_name=reward_video&app_id=3&open_mmid=fd4196854db380b47caf9eb6ab396f2ea5&uid=106543772&app_auth_token=7145c7d11a6f05cff1bbc7a3228b266abc6c5646&statistics_app_params=SnbCLQhwvWIr62t81H2HPphAsp8PqvCrN1G587kVMQJV7zWyQvKnvywA34xqCgBFY%252FWsImQdiE%252B4xcvBy94sx%252FaFc738iFn49q62dwDUUBlMUFKFw28V9OfI%252Bg7%252BUVWSqciK8Blx3fkojsPaScxPC2ZaAribYjenjT40%252FDzN2OXTVmkxdWu2mOxmhVJ6ynS%252FYhZ3q%252B%252BRa9fsDF8xHgNcJpfbASJx%252B4%252BKdndPdsmURki7Xow5QrnsJcYte9Fa3Tf8T5ts4gGAuvf%252Fooo%252FGXYHHWRfm%252ByDtJBEaLaZU%252BA6g6S4mghGxvEAO1zz04uMgHz9eaJ2Oy%252FNUS%252BXgIbhuppiuDg%252BmFpGccfhL7yO3NC5mivILF933%252BFCCwkj0ctEIki%252BIHLuU7k0TY9BrUCdzn9PxfOjyQZVtYNLcepEASZZGOXIZmx9hz4XmK8RRRaVPHs8U1T9ZFH0myB2nrs%252BGNsZ3vvS3tBi%252BgxUuYeT9m1Z17BADg8BplbxttAjtziQUBNz&statistics_app_channel=010113mi&statistics_app_source=pt_android&version=12.10.1&source=1&ruid=106543772&mode=2&rel=2&childbirth_status=1&t=1668930880&appkey=pt_android&sign=6FF43337E1736834B86B64E5E1CA1115`
    //ckurl = ckcks.split('?')[1]

    ckck = ckcks.split('&').reduce((sum, item) => {
        let temp = item.split('=')
        sum[temp[0].trim()] = temp[1].trim()
        return sum
    }, {})



    //console.log(DATA);

    spmd5 = `app_auth_token=${ckck.app_auth_token}&app_id=${ckck.app_id}&appkey=${ckck.appkey}&bb_birthday=${ckck.bb_birthday}&bid=${ckck.bid}&mode=${ckck.mode}&open_mmid=${ckck.open_mmid}&prepare_pt_date=&rel=${ckck.rel}&source=${ckck.source}&statistics_app_channel=${ckck.statistics_app_channel}&statistics_app_params=${ckck.statistics_app_params}&statistics_app_source=${ckck.statistics_app_source}&t=${$.ts()}&task_name=reward_video&uid=${ckck.uid}&version=${ckck.version}c0c91f2099c6354461942eb0b31f0e7f`
    console.log(spmd5)
    spmd5 = spmd5.replace(/sign=[^&]+/g, '').replace(/\=/g, '').replace(/\&/g, '').replace(/\//g, '%2F')
    spsign = $.MD5Encrypt(spmd5)

    spurl = `https://papi.mama.cn/api/welfare/get_video_reward_token?app_auth_token=${ckck.app_auth_token}&app_id=${ckck.app_id}&appkey=${ckck.appkey}&bb_birthday=${ckck.bb_birthday}&bid=${ckck.bid}&mode=${ckck.mode}&open_mmid=${ckck.open_mmid}&prepare_pt_date=&rel=${ckck.rel}&sign=${spsign}&source=${ckck.source}&statistics_app_channel=${ckck.statistics_app_channel}&statistics_app_params=${ckck.statistics_app_params}&statistics_app_source=${ckck.statistics_app_source}&t=${$.ts()}&task_name=reward_video&uid=${ckck.uid}&version=${ckck.version}`

    console.log(spurl);

    K = `看视频🚩`
    if (K == `看视频🚩`) {
        await $.task(`get`, spurl, ac.header)
        console.log(DATA);
        if (DATA.code == 0) {
            token = encodeURIComponent(DATA.data.token)
            console.log(token);
            jbmd5 = `app_auth_token=${ckck.app_auth_token}&appkey=${ckck.appkey}&bb_birthday=${ckck.bb_birthday}&bid=${ckck.bid}&mode=${ckck.mode}&open_mmid=${ckck.open_mmid}&prepare_pt_date=&rel=${ckck.rel}&source=${ckck.source}&statistics_app_channel=${ckck.statistics_app_channel}&statistics_app_params=${ckck.statistics_app_params}&statistics_app_source=${ckck.statistics_app_source}&t=${$.ts()}&token=${token}&uid=${ckck.uid}&version=${ckck.version}c0c91f2099c6354461942eb0b31f0e7f`
            jbmd5 = jbmd5.replace(/sign=[^&]+/g, '').replace(/\=/g, '').replace(/\&/g, '').replace(/\//g, '%2F')
            jbsign = $.MD5Encrypt(jbmd5)
            console.log(jbsign)
            jburl = `https://papi.mama.cn/api/welfare/get_video_reward?app_auth_token=${ckck.app_auth_token}&appkey=${ckck.appkey}&bb_birthday=${ckck.bb_birthday}&bid=${ckck.bid}&mode=${ckck.mode}&open_mmid=${ckck.open_mmid}&prepare_pt_date=&rel=${ckck.rel}&sign=${jbsign}&source=${ckck.source}&statistics_app_channel=${ckck.statistics_app_channel}&statistics_app_params=${ckck.statistics_app_params}&statistics_app_source=${ckck.statistics_app_source}&t=${$.ts()}&token=${token}&uid=${ckck.uid}&version=${ckck.version}`
            //  console.log(jburl);
            await $.wait(30000)
            await $.task(`get`, jburl, ac.header)
            console.log(DATA);
        }




        //   if (DATA.code == 200 && DATA.data.paasToken != '') {
        //       ac.nickname = DATA.data.nickname
        //       ac.token = DATA.data.token
        //       ac.paasToken = DATA.data.paasToken
        //       ac.token = {
        //           "content-type": "application/json",
        //           "token": ac.token,
        //           "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.26(0x18001a34) NetType/WIFI Language/zh_CN",
        //           "Referer": "https://servicewechat.com/wx54834006424fda0b/170/page-frame.html"
        //       }
        //       ac.ptoken = {
        //           "content-type": "application/json",
        //           "token": ac.paasToken,
        //           "Referer": "https://servicewechat.com/wx54834006424fda0b/170/page-frame.html"
        //       }
        //    //   

        //       $.RZ(ac, `\n${ac.O}\n========== 【${ac.nickname}】 ==========\n\n`)


        // //  }
        // //   if (DATA.errors.code == 0) {
        // //       console.log(`paasToken 为空 暂停运行`);
        // //       $.done()
        //   } else if (DATA.errors.code == 0) {
        //     ac.login = false
        //     console.log(`Cookie失效，即将TeleGram发送通知`);
        //     await $.task(`get`, `${ac.noticeurl}${ac.noticename}`, {})
        //     console.log(DATA)
        //     if (DATA.result.text) {
        //         console.log(DATA.result.text);
        //     }

        //   $.done()
        // }
    }

}







async function Task(ac) {
    await $.task(`get`, `https://paas.lenovo.com.cn/login-server/getLoginInfo?terminal=WX_APP`, ac.ptoken)
    if (DATA.data.coinsTatal) {
        ac.coinsTatal = DATA.data.coinsTatal
    }
    if (ac.coinsTatal >= 300) {
        msgsc = encodeURIComponent(`${NAME}  用户：${ac.nickname} 现有积分：${ac.coinsTatal}`)
        await $.task(`get`, ac.noticeurl + msgsc, {})
        console.log(DATA)
    }
    K = `任务列表🚩`
    if (K == `任务列表🚩`) {
        await $.task(`get`, `https://baiyingmalladmin.lenovo.com/api/v5/user/profile?is_profile=1`, ac.token)
        ac.tasklist = DATA.data.integralTask
        console.log(ac.tasklist);
        if (DATA.data.integralTask) {
            K = `签到查询🚩`
            if (K == `签到查询🚩`) {
                await $.task(`get`, `https://paas.lenovo.com.cn/event-promotion-server/event/dailyCheckIn/status`, ac.ptoken)
                if (DATA.data.completed != true) {
                    K = `签到🚩`
                    if (K == `签到🚩`) {
                        await $.task(`get`, `https://paas.lenovo.com.cn/event-promotion-server/event/dailyCheckIn`, ac.ptoken)
                        if (DATA.code == '200') {
                            ac.coins = DATA.data.coins
                            ac.dayOfContinuous = DATA.data.dayOfContinuous
                            $.RZ(ac, `【签到】: 成功  获得：${ac.coins} 积分，连续签到 ${ac.dayOfContinuous} 天\n`)
                        }
                    }
                } else {
                    $.RZ(ac, `【签到】: 已签到。\n`)
                }
            }
            for (is of ac.tasklist) {
                names = is.name //任务名
                amount = is.amount //需要完成的任务量
                finishNum = is.finishNum //已完成数量
                if (names == '关注店铺' && amount != finishNum) {
                    K = `店铺id查询🚩`
                    if (K == `店铺id查询🚩`) {
                        await $.task(`post`, `https://shop-pub-gateway.baiying.com.cn/api/goods/v1/getNearbyShopList`, ac.token, `{"keywords":"","page":1,"size":10,"terminal":"wx","distanceOrderType":1,"shopScoreOrderType":"","latitude":23.717542703707522,"longitude":107.99344825119343}`)
                        //console.log(DATA.data);
                        if (DATA.code == 200) {
                            ac.ruidlist = DATA.data
                            for (let i = 0; i < amount - finishNum; i++) {
                                ruId = ac.ruidlist[i + $.RT(0, 5)].ruId
                                console.log(ruId);
                                await $.task(`get`, `https://shop-pub-gateway.baiying.com.cn/api/shop/collect/collectStore/${ruId}`, ac.token)
                                await $.wait($.RT(3000, 5000))
                                await $.task(`get`, `https://shop-pub-gateway.baiying.com.cn/api/shop/collect/collectStore/${ruId}`, ac.token)
                                await $.wait(5000, 8000)
                                if (i == amount - finishNum) {
                                    $.RZ(ac, `【关注店铺】: 完成，获得 15 积分。\n`)
                                }
                            }
                        }
                    }
                }


                if (names == '浏览商品' && amount != finishNum) {
                    K = `商品id查询🚩`
                    if (K == `商品id查询🚩`) {
                        await $.task(`post`, `https://shop-pub-gateway.baiying.com.cn/api/goods/v1/getGoodsList`, ac.token, `{"page":1,"size":10,"terminal":"wx","fourthCatId":"","thirdCatId":"","shopPriceOrderType":"","ifRecommen":1,"salesVolumeOrderType":"","addTimeOrderType":"","active":""}`)
                        //console.log(DATA.data);
                        if (DATA.code == 200) {
                            ac.goodsId = DATA.data
                            for (let i = 0; i < amount - finishNum; i++) {
                                ruId = ac.goodsId[i].goodsId
                                console.log(ruId);
                                await $.task(`post`, `https://baiyingmalladmin.lenovo.com/api/v4/user/plusScore`, ac.token, `{"goods_id":"${ruId}","act":4,"lenovo_parent_id":${ruId}}`)
                                await $.wait($.RT(3000, 5000))
                                console.log(DATA);
                                if (i == amount - finishNum) {
                                    $.RZ(ac, `【浏览商品】: 完成，获得 10 积分。\n`)
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}














function Env(t, e) {
    class s {
        constructor(t) {
            this.env = t
        }
        send(t, e = 'GET') {
            t =
                'string' == typeof t
                    ? {
                        url: t,
                    }
                    : t
            let s = this.get
            return (
                'POST' === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s)
                    })
                })
            )
        }
        get(t) {
            return this.send.call(this.env, t)
        }
        post(t) {
            return this.send.call(this.env, t, 'POST')
        }
        put(t) {
            return this.send.call(this.env, t, 'PUT')
        }
    }
    return new (class {
        constructor(t, e) {
            ; (this.name = t), (this.http = new s(this)), (this.data = null), (this.dataFile = 'box.dat'), (this.logs = []), (this.isMute = !1), (this.isNeedRewrite = !1), (this.logSeparator = '\n'), (this.startTime = new Date().getTime()), Object.assign(this, e), this.log(``, `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
        }
        isNode() {
            return 'undefined' != typeof module && !!module.exports
        }
        isQuanX() {
            return 'undefined' != typeof $task
        }
        isSurge() {
            return 'undefined' != typeof $httpClient && 'undefined' == typeof $loon
        }
        isLoon() {
            return 'undefined' != typeof $loon
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }
        getjson(t, e) {
            let s = e
            const i = this.getdata(t)
            if (i)
                try {
                    s = JSON.parse(this.getdata(t))
                } catch { }
            return s
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }
        getScript(t) {
            return new Promise(e => {
                this.get(
                    {
                        url: t,
                    },
                    (t, s, i) => e(i)
                )
            })
        }
        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata('@chavy_boxjs_userCfgs.httpapi')
                i = i ? i.replace(/\n/g, ``).trim() : i
                let r = this.getdata('@chavy_boxjs_userCfgs.httpapi_timeout')
                    ; (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r)
                const [o, h] = i.split('@'),
                    a = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: {
                            script_text: t,
                            mock_type: 'cron',
                            timeout: r,
                        },
                        headers: {
                            'X-Key': o,
                            Accept: '*/*',
                        },
                    }
                this.post(a, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }
        loaddata() {
            if (!this.isNode()) return {}
            {
                ; (this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'))
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e)
                if (!s && !i) return {}
                {
                    const i = s ? t : e
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                ; (this.fs = this.fs ? this.fs : require('fs')), (this.path = this.path ? this.path : require('path'))
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data)
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, '.$1').split('.')
            let r = t
            for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s
            return r
        }
        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), (e.slice(0, -1).reduce((t, s, i) => (Object(t[s]) === t[s] ? t[s] : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {})), t)[e[e.length - 1]] = s), t)
        }
        getdata(t) {
            let e = this.getval(t)
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : ``
                if (r)
                    try {
                        const t = JSON.parse(r)
                        e = t ? this.lodash_get(t, i, ``) : e
                    } catch (t) {
                        e = ``
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? ('null' === o ? null : o || '{}') : '{}'
                try {
                    const e = JSON.parse(h)
                    this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i))
                } catch (e) {
                    const o = {}
                    this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i))
                }
            } else s = this.setval(t, e)
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? ((this.data = this.loaddata()), this.data[t]) : (this.data && this.data[t]) || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? ((this.data = this.loaddata()), (this.data[e] = t), this.writedata(), !0) : (this.data && this.data[e]) || null
        }
        initGotEnv(t) {
            ; (this.got = this.got ? this.got : require('got')), (this.cktough = this.cktough ? this.cktough : require('tough-cookie')), (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()), t && ((t.headers = t.headers ? t.headers : {}), void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }
        get(t, e = () => { }) {
            t.headers && (delete t.headers['Content-Type'], delete t.headers['Content-Length']),
                this.isSurge() || this.isLoon()
                    ? (this.isSurge() &&
                        this.isNeedRewrite &&
                        ((t.headers = t.headers || {}),
                            Object.assign(t.headers, {
                                'X-Surge-Skip-Scripting': !1,
                            })),
                        $httpClient.get(t, (t, s, i) => {
                            !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i)
                        }))
                    : this.isQuanX()
                        ? (this.isNeedRewrite &&
                            ((t.opts = t.opts || {}),
                                Object.assign(t.opts, {
                                    hints: !1,
                                })),
                            $task.fetch(t).then(
                                t => {
                                    const { statusCode: s, statusCode: i, headers: r, body: o } = t
                                    e(
                                        null,
                                        {
                                            status: s,
                                            statusCode: i,
                                            headers: r,
                                            body: o,
                                        },
                                        o
                                    )
                                },
                                t => e(t)
                            ))
                        : this.isNode() &&
                        (this.initGotEnv(t),
                            this.got(t)
                                .on('redirect', (t, e) => {
                                    try {
                                        if (t.headers['set-cookie']) {
                                            const s = t.headers['set-cookie'].map(this.cktough.Cookie.parse).toString()
                                            this.ckjar.setCookieSync(s, null), (e.cookieJar = this.ckjar)
                                        }
                                    } catch (t) {
                                        this.logErr(t)
                                    }
                                })
                                .then(
                                    t => {
                                        const { statusCode: s, statusCode: i, headers: r, body: o } = t
                                        e(
                                            null,
                                            {
                                                status: s,
                                                statusCode: i,
                                                headers: r,
                                                body: o,
                                            },
                                            o
                                        )
                                    },
                                    t => {
                                        const { message: s, response: i } = t
                                        e(s, i, i && i.body)
                                    }
                                ))
        }
        post(t, e = () => { }) {
            if ((t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'), t.headers && delete t.headers['Content-Length'], this.isSurge() || this.isLoon()))
                this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, {
                            'X-Surge-Skip-Scripting': !1,
                        })),
                    $httpClient.post(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i)
                    })
            else if (this.isQuanX())
                (t.method = 'POST'),
                    this.isNeedRewrite &&
                    ((t.opts = t.opts || {}),
                        Object.assign(t.opts, {
                            hints: !1,
                        })),
                    $task.fetch(t).then(
                        t => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t
                            e(
                                null,
                                {
                                    status: s,
                                    statusCode: i,
                                    headers: r,
                                    body: o,
                                },
                                o
                            )
                        },
                        t => e(t)
                    )
            else if (this.isNode()) {
                this.initGotEnv(t)
                const { url: s, ...i } = t
                this.got.post(s, i).then(
                    t => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t
                        e(
                            null,
                            {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o,
                            },
                            o
                        )
                    },
                    t => {
                        const { message: s, response: i } = t
                        e(s, i, i && i.body)
                    }
                )
            }
        }
        put(t, e = () => { }) {
            if ((t.body && t.headers && !t.headers['Content-Type'] && (t.headers['Content-Type'] = 'application/x-www-form-urlencoded'), t.headers && delete t.headers['Content-Length'], this.isSurge() || this.isLoon()))
                this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, {
                            'X-Surge-Skip-Scripting': !1,
                        })),
                    $httpClient.put(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i)
                    })
            else if (this.isQuanX())
                (t.method = 'PUT'),
                    this.isNeedRewrite &&
                    ((t.opts = t.opts || {}),
                        Object.assign(t.opts, {
                            hints: !1,
                        })),
                    $task.fetch(t).then(
                        t => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t
                            e(
                                null,
                                {
                                    status: s,
                                    statusCode: i,
                                    headers: r,
                                    body: o,
                                },
                                o
                            )
                        },
                        t => e(t)
                    )
            else if (this.isNode()) {
                this.initGotEnv(t)
                const { url: s, ...i } = t
                this.got.put(s, i).then(
                    t => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t
                        e(
                            null,
                            {
                                status: s,
                                statusCode: i,
                                headers: r,
                                body: o,
                            },
                            o
                        )
                    },
                    t => {
                        const { message: s, response: i } = t
                        e(s, i, i && i.body)
                    }
                )
            }
        }
        //当前13位时间戳
        tss() {
            let TS = Math.round(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000).toString()
            if ($.YHS() == 1) {
                TS = TS - 8 * 60 * 60 * 1000
            }
            return TS
        }
        //今天0点时间戳时间戳
        daytime() {
            let t = new Date(new Date().toLocaleDateString()).getTime()
            if ($.YHS() == 1) {
                t = t - 8 * 60 * 60 * 1000
            }
            return t
        }
        //当前10位时间戳
        ts() {
            let TS = ($.tss() / 1000).toFixed(0)
            return TS
        }
        //时间戳格式化日期
        time(t) {
            let date = new Date(t),
                Y = date.getFullYear() + '-',
                M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
                D = date.getDate() + ' ',
                h = date.getHours() + ':',
                m = date.getMinutes() + ':',
                s = date.getSeconds()
            return Y + M + D + h + m + s
        }
        //国际标准时间
        nowtime() {
            let t = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
            return t
        }
        //数据检查
        safeGet(data) {
            try {
                if (typeof JSON.parse(data) == 'object') {
                    return true
                }
            } catch (e) {
                //console.log(e);
                //console.log(`服务器访问数据为空，请检查自身设备网络情况`);
                return false
            }
        }
        //从小到大
        getMins(x) {
            x.sort(function (a, b) {
                return a.accountAmount - b.accountAmount
            })
        }
        //从大到小
        getMaxs(x) {
            x.sort(function (a, b) {
                return b.accountAmount - a.accountAmount
            })
        }
        //从小到大
        getMin(a, b) {
            return a < b ? a : b
        }
        //从大到小
        getMax(a, b) {
            return a < b ? b : a
        }
        //随机字符
        randomString(len) {
            let chars = 'qwertyuiopasdfghjklzxcvbnm01234567890123456789'
            let maxLen = chars.length
            let str = ''
            for (let i = 0; i < len; i++) {
                str += chars.charAt(Math.floor(Math.random() * maxLen))
            }
            return str
        }
        //日期格式化时间戳
        timecs(newtime) {
            if (JSON.stringify(newtime).indexOf(' ') >= 0) {
                newtime = newtime.replace(' ', 'T')
            }
            if ($.YHS() == 0) {
                var date = new Date(newtime).getTime()
            } else {
                var date = new Date(newtime).getTime() - 8 * 60 * 60 * 1000
            }
            return date
        }
        //倒计时
        timedjs(time) {
            if (typeof time == 'number') {
                var TS = Number((time - Date.now()) / 3600000).toFixed(2)
            } else {
                var TS = Number(($.timecs(time.replace('.', '-').replace('.', '-')) - Date.now()) / 3600000).toFixed(2)
            }
            return TS
        }
        //倒计秒
        timedjm(time) {
            if (typeof time == 'number') {
                var TS = Number((time - Date.now()) / 1000).toFixed(2)
            } else {
                var TS = Number(($.timecs(time.replace('.', '-').replace('.', '-')) - Date.now()) / 1000).toFixed(2)
            }
            return TS
        }
        //随机$.udid 大写
        udid() {
            var s = []
            var hexDigits = '0123456789ABCDEF'
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
            }
            s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = '-'
            var uuid = s.join('')
            return uuid
        }
        //随机$.udid 小写
        udid2() {
            function S4() {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
            }
            return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
        }
        //  .toUpperCase()  转化大写
        //  .toLowerCase()  转化小写
        //$.log(...new Set(arr))去重
        //KEY = [...new Set(KEY.filter(item => !!item))]
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
        //日志格式化
        format(str) {
            if (logs == 2) {
                str = JSON.stringify(JSON.parse(decodeURIComponent(str)), null, 2)
            }
            if (logs == 3) {
                str = $.decodeUnicode(JSON.stringify(JSON.parse(str), null, 1))
            }
            return str
        }
        //随机延迟 ceil向上取值$.RT(0, 5)=1 2 3 4 5
        //随机延迟 floor向下取值$.RT(0, 5)=0 1 2 3 4
        //随机延迟 round四舍五入取值$.RT(0, 5)=0 1 2 3 4 5
        //区间随机
        RT(X, Y) {
            let rt = Math.round(Math.random() * Y)
            while (rt < X) {
                return rt
            }
            return rt
        }
        //$.log(sjsz(num))//输出num位的随机不重复数组
        //arr.reverse()数组反序
        sjsz(num) {
            var ary = [] //创建一个空数组用来保存随机数组
            for (var i = 0; i < num; i++) {
                //按照正常排序填充数组
                ary[i] = i + 1
            }
            ary.sort(function () {
                return 0.5 - Math.random() //返回随机正负值
            })
            return ary //返回数组
        }
        //去除空值
        arrNull(arr) {
            Array.prototype.arrNull = function () {
                var str = []
                this.map(function (val, index) {
                    if (val !== '' && val != undefined) {
                        str.push(val)
                    }
                })
                return str
            }
            return arr.arrNull()
        }
        /* 
            foreach方法主要是针对数组而言的，对数组中的每个元素可以执行一次方法
            var array = ['a', 'b', 'c', 'e'];
            array.forEach((i) => {
                console.log(i);
            });
    var array1 = [1, 4, 9, 16];
    const map1 = array1.map(x => {
        if (x == 4) {
            return x * 2;
        }
        return x;
    });
    Math.abs(a) 获得a的绝对值
    parseInt(1.45516121) 返回整数
    */
        arrinx(arr, str, val, num) {
            if (num) {
                var A = arr.find(item => item[val] == str)[num]
            } else if (val) {
                var A = arr.find(item => item[val] == str)
            } else {
                var A = arr
                    .find(item => {
                        return item.indexOf(str) > -1
                    })
                    .trim()
            }
            return A
        }
        //在JSON数组1中去除JSON数组2含有的项
        arrset(arr1, arr2, str, val) {
            if (str == '-') {
                if (val) {
                    var newarr = JSON.stringify(
                        arr1.filter(x => !arr2.some(item => x[val] === item[val])),
                        null,
                        3
                    )
                } else {
                    var newarr = JSON.stringify(
                        arr1.filter(x => !arr2.some(item => x === item)),
                        null,
                        3
                    )
                }
            } else {
                if (val) {
                    var newarr = JSON.stringify(
                        arr1.filter(x => arr2.some(item => x[val] === item[val])),
                        null,
                        3
                    )
                } else {
                    var newarr = JSON.stringify(
                        arr1.filter(x => arr2.some(item => x === item)),
                        null,
                        3
                    )
                }
            }
            return newarr
        }
        //通知
        msgShow() {
            return new Promise(async resolve => {
                if (msgst != 1) {
                    $.log(NAME + '\n' + $.msge)
                }
                if (msgst == 1) {
                    $.msg(NAME, ``, $.msge)
                }
                if (msgst == 2 && ($.nowtime().getHours() === 12 || $.nowtime().getHours() === 23) && $.nowtime().getMinutes() >= 0 && $.nowtime().getMinutes() <= msgm) {
                    $.msg(NAME, ``, $.msge)
                }
                if (msgst == 3 && ($.nowtime().getHours() === 6 || $.nowtime().getHours() === 12 || $.nowtime().getHours() === 18 || $.nowtime().getHours() === 23) && $.nowtime().getMinutes() >= 0 && $.nowtime().getMinutes() <= msgm) {
                    $.msg(NAME, ``, $.msge)
                }
                if (ntfst == 1 && $.isNode() && ($.nowtime().getHours() === 12 || $.nowtime().getHours() === 23) && $.nowtime().getMinutes() >= 0 && $.nowtime().getMinutes() <= msgm) await $.ntf().sendNotify(NAME, $.msge)
                resolve()
            })
        }
        //变量检查
        getCks(ck, str) {
            let ckArr = []
            if (ck) {
                if (ck.indexOf("\n") != -1) {
                    ck.split("\n").forEach((item) => {
                        ckArr.push(item);
                    });
                } else {
                    ckArr.push(ck);
                }
                return ckArr;
            } else {
                console.log(`\n 【${$.name}】：未填写变量 ${str}`)
            }

        }

        //运行模块
        task(method, taskurl, taskheader, taskbody) {
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
                    taskheader['Content-Length'] = taskbody.length
                }
            }
            taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
            return new Promise(async resolve => {
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
                $[method.toLowerCase()](httpget, (err, resp, data) => {
                    try {
                        DATA = ``
                        if (logs == 3) console.log(JSON.stringify(httpget, null, 3))
                        if (err) {
                            if (logs) $.log(`${JSON.stringify(err)}\n${O} ${K}API请求失败，请检查网络重试`)
                        } else {
                            if (data) {
                                if ($.safeGet(data)) {
                                    if (logs) $.log(`${O}, ${K}: ${$.format(data)}`)
                                    DATA = JSON.parse(data)
                                } else {
                                    DATA = decodeUnicode(data)
                                    if (DATA.indexOf('">') >= 0 && DATA.indexOf('</string>') >= 0) {
                                        DATA = JSON.parse(DATA.split('">')[1].split('</string>')[0])
                                        if (logs) $.log(`${O}, ${K}: ${$.format(data.split('">')[1].split('</string>')[0])}`)
                                    } else {
                                        if (logs) $.log(`${O}, ${K}: ${DATA}`)
                                    }
                                }
                            } else {
                                $.log(`服务器返回数据为空`)
                            }
                        }
                    } catch (e) {
                        $.logErr(e, resp)
                    } finally {
                        resolve()
                    }
                })
            })
        }
        //当前日期
        timenow(t) {
            let e = {
                'M+': new Date().getMonth() + 1,
                'd+': new Date().getDate(),
                'H+': new Date().getHours(),
                'm+': new Date().getMinutes(),
                's+': new Date().getSeconds(),
                'q+': Math.floor((new Date().getMonth() + 3) / 3),
                S: new Date().getMilliseconds(),
            }
                ; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (new Date().getFullYear() + ``).substr(4 - RegExp.$1.length)))
            for (let s in e) new RegExp('(' + s + ')').test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ('00' + e[s]).substr((`` + e[s]).length)))
            return t
        }
        //今天
        today() {
            let Y = $.nowtime().getFullYear() + '-',
                M = ($.nowtime().getMonth() + 1 < 10 ? '0' + ($.nowtime().getMonth() + 1) : $.nowtime().getMonth() + 1) + '-',
                D = $.nowtime().getDate() < 10 ? '0' + $.nowtime().getDate() : $.nowtime().getDate(),
                t = Y + M + D
            return t
        }
        //今月
        tomon() {
            let Y = $.nowtime().getFullYear() + '-',
                M = ($.nowtime().getMonth() + 1 < 10 ? '0' + ($.nowtime().getMonth() + 1) : $.nowtime().getMonth() + 1) + '-',
                t = (Y + M).replace(/-/g, ``)
            return t
        }
        //指定时间
        zdsj(s) {
            let Y = $.nowtime().getFullYear() + '-',
                M = ($.nowtime().getMonth() + 1 < 10 ? '0' + ($.nowtime().getMonth() + 1) : $.nowtime().getMonth() + 1) + '-',
                D = $.nowtime().getDate() < 10 ? '0' + $.nowtime().getDate() : $.nowtime().getDate(),
                t = Y + M + D + ` ${s}:00`
            return t
        }
        //键值对转json
        rtjson(input) {
            t = JSON.stringify(
                input.split('\n').reduce((sum, item) => {
                    let temp = item.split(': ')
                    sum[temp[0].trim()] = temp[1].trim()
                    return sum
                }, {}),
                null,
                3
            )
            return t
        }
        ifs(text) {
            let S = [],
                Y = text.split('.')
            S.push(Y.join('.'))
            for (let i = 0; i < Y.length; i++) {
                if (Y[Y.length - 1].indexOf('[') >= 0) {
                    let R = Y[Y.length - 1].split('[')[0]
                    Y.pop()
                    S.push(Y.join('.') + '.' + R)
                    S.push(Y.join('.'))
                } else {
                    Y.pop()
                    S.push(Y.join('.'))
                }
            }
            S = S.reverse().join('&&')
            console.log(S)
            return eval(S)
        }
        msg(e = t, s = ``, i = ``, r) {
            const o = t => {
                if (!t) return t
                if ('string' == typeof t)
                    return this.isLoon()
                        ? t
                        : this.isQuanX()
                            ? {
                                'open-url': t,
                            }
                            : this.isSurge()
                                ? {
                                    url: t,
                                }
                                : void 0
                if ('object' == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t['open-url'],
                            s = t.mediaUrl || t['media-url']
                        return {
                            openUrl: e,
                            mediaUrl: s,
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t['open-url'] || t.url || t.openUrl,
                            s = t['media-url'] || t.mediaUrl
                        return {
                            'open-url': e,
                            'media-url': s,
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t['open-url']
                        return {
                            url: e,
                        }
                    }
                }
            }
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)))
            let h = [``, '==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3==============']
            h.push(e), s && h.push(s), i && h.push(i), console.log(h.join('\n')), (this.logs = this.logs.concat(h))
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon()
            s ? this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log(``, `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3
            this.log(``, `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
        SHA256(n) {
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
        MD5Encrypt(a) {
            function b(a, b) {
                return (a << b) | (a >>> (32 - b))
            }
            function c(a, b) {
                var c, d, e, f, g
                return (e = 2147483648 & a), (f = 2147483648 & b), (c = 1073741824 & a), (d = 1073741824 & b), (g = (1073741823 & a) + (1073741823 & b)), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? (1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f) : g ^ e ^ f
            }
            function d(a, b, c) {
                return (a & b) | (~a & c)
            }
            function e(a, b, c) {
                return (a & c) | (b & ~c)
            }
            function f(a, b, c) {
                return a ^ b ^ c
            }
            function g(a, b, c) {
                return b ^ (a | ~c)
            }
            function h(a, e, f, g, h, i, j) {
                return (a = c(a, c(c(d(e, f, g), h), j))), c(b(a, i), e)
            }
            function i(a, d, f, g, h, i, j) {
                return (a = c(a, c(c(e(d, f, g), h), j))), c(b(a, i), d)
            }
            function j(a, d, e, g, h, i, j) {
                return (a = c(a, c(c(f(d, e, g), h), j))), c(b(a, i), d)
            }
            function k(a, d, e, f, h, i, j) {
                return (a = c(a, c(c(g(d, e, f), h), j))), c(b(a, i), d)
            }
            function l(a) {
                for (var b, c = a.length, d = c + 8, e = (d - (d % 64)) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;) (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (a.charCodeAt(i) << h)), i++
                return (b = (i - (i % 4)) / 4), (h = (i % 4) * 8), (g[b] = g[b] | (128 << h)), (g[f - 2] = c << 3), (g[f - 1] = c >>> 29), g
            }
            function m(a) {
                var b,
                    c,
                    d = '',
                    e = ''
                for (c = 0; 3 >= c; c++) (b = (a >>> (8 * c)) & 255), (e = '0' + b.toString(16)), (d += e.substr(e.length - 2, 2))
                return d
            }
            function n(a) {
                a = a.replace(/\r\n/g, '\n')
                for (var b = '', c = 0; c < a.length; c++) {
                    var d = a.charCodeAt(c)
                    128 > d ? (b += String.fromCharCode(d)) : d > 127 && 2048 > d ? ((b += String.fromCharCode((d >> 6) | 192)), (b += String.fromCharCode((63 & d) | 128))) : ((b += String.fromCharCode((d >> 12) | 224)), (b += String.fromCharCode(((d >> 6) & 63) | 128)), (b += String.fromCharCode((63 & d) | 128)))
                }
                return b
            }
            var o,
                p,
                q,
                r,
                s,
                t,
                u,
                v,
                w,
                x = [],
                y = 7,
                z = 12,
                A = 17,
                B = 22,
                C = 5,
                D = 9,
                E = 14,
                F = 20,
                G = 4,
                H = 11,
                I = 16,
                J = 23,
                K = 6,
                L = 10,
                M = 15,
                N = 21
            for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)
                (p = t),
                    (q = u),
                    (r = v),
                    (s = w),
                    (t = h(t, u, v, w, x[o + 0], y, 3614090360)),
                    (w = h(w, t, u, v, x[o + 1], z, 3905402710)),
                    (v = h(v, w, t, u, x[o + 2], A, 606105819)),
                    (u = h(u, v, w, t, x[o + 3], B, 3250441966)),
                    (t = h(t, u, v, w, x[o + 4], y, 4118548399)),
                    (w = h(w, t, u, v, x[o + 5], z, 1200080426)),
                    (v = h(v, w, t, u, x[o + 6], A, 2821735955)),
                    (u = h(u, v, w, t, x[o + 7], B, 4249261313)),
                    (t = h(t, u, v, w, x[o + 8], y, 1770035416)),
                    (w = h(w, t, u, v, x[o + 9], z, 2336552879)),
                    (v = h(v, w, t, u, x[o + 10], A, 4294925233)),
                    (u = h(u, v, w, t, x[o + 11], B, 2304563134)),
                    (t = h(t, u, v, w, x[o + 12], y, 1804603682)),
                    (w = h(w, t, u, v, x[o + 13], z, 4254626195)),
                    (v = h(v, w, t, u, x[o + 14], A, 2792965006)),
                    (u = h(u, v, w, t, x[o + 15], B, 1236535329)),
                    (t = i(t, u, v, w, x[o + 1], C, 4129170786)),
                    (w = i(w, t, u, v, x[o + 6], D, 3225465664)),
                    (v = i(v, w, t, u, x[o + 11], E, 643717713)),
                    (u = i(u, v, w, t, x[o + 0], F, 3921069994)),
                    (t = i(t, u, v, w, x[o + 5], C, 3593408605)),
                    (w = i(w, t, u, v, x[o + 10], D, 38016083)),
                    (v = i(v, w, t, u, x[o + 15], E, 3634488961)),
                    (u = i(u, v, w, t, x[o + 4], F, 3889429448)),
                    (t = i(t, u, v, w, x[o + 9], C, 568446438)),
                    (w = i(w, t, u, v, x[o + 14], D, 3275163606)),
                    (v = i(v, w, t, u, x[o + 3], E, 4107603335)),
                    (u = i(u, v, w, t, x[o + 8], F, 1163531501)),
                    (t = i(t, u, v, w, x[o + 13], C, 2850285829)),
                    (w = i(w, t, u, v, x[o + 2], D, 4243563512)),
                    (v = i(v, w, t, u, x[o + 7], E, 1735328473)),
                    (u = i(u, v, w, t, x[o + 12], F, 2368359562)),
                    (t = j(t, u, v, w, x[o + 5], G, 4294588738)),
                    (w = j(w, t, u, v, x[o + 8], H, 2272392833)),
                    (v = j(v, w, t, u, x[o + 11], I, 1839030562)),
                    (u = j(u, v, w, t, x[o + 14], J, 4259657740)),
                    (t = j(t, u, v, w, x[o + 1], G, 2763975236)),
                    (w = j(w, t, u, v, x[o + 4], H, 1272893353)),
                    (v = j(v, w, t, u, x[o + 7], I, 4139469664)),
                    (u = j(u, v, w, t, x[o + 10], J, 3200236656)),
                    (t = j(t, u, v, w, x[o + 13], G, 681279174)),
                    (w = j(w, t, u, v, x[o + 0], H, 3936430074)),
                    (v = j(v, w, t, u, x[o + 3], I, 3572445317)),
                    (u = j(u, v, w, t, x[o + 6], J, 76029189)),
                    (t = j(t, u, v, w, x[o + 9], G, 3654602809)),
                    (w = j(w, t, u, v, x[o + 12], H, 3873151461)),
                    (v = j(v, w, t, u, x[o + 15], I, 530742520)),
                    (u = j(u, v, w, t, x[o + 2], J, 3299628645)),
                    (t = k(t, u, v, w, x[o + 0], K, 4096336452)),
                    (w = k(w, t, u, v, x[o + 7], L, 1126891415)),
                    (v = k(v, w, t, u, x[o + 14], M, 2878612391)),
                    (u = k(u, v, w, t, x[o + 5], N, 4237533241)),
                    (t = k(t, u, v, w, x[o + 12], K, 1700485571)),
                    (w = k(w, t, u, v, x[o + 3], L, 2399980690)),
                    (v = k(v, w, t, u, x[o + 10], M, 4293915773)),
                    (u = k(u, v, w, t, x[o + 1], N, 2240044497)),
                    (t = k(t, u, v, w, x[o + 8], K, 1873313359)),
                    (w = k(w, t, u, v, x[o + 15], L, 4264355552)),
                    (v = k(v, w, t, u, x[o + 6], M, 2734768916)),
                    (u = k(u, v, w, t, x[o + 13], N, 1309151649)),
                    (t = k(t, u, v, w, x[o + 4], K, 4149444226)),
                    (w = k(w, t, u, v, x[o + 11], L, 3174756917)),
                    (v = k(v, w, t, u, x[o + 2], M, 718787259)),
                    (u = k(u, v, w, t, x[o + 9], N, 3951481745)),
                    (t = c(t, p)),
                    (u = c(u, q)),
                    (v = c(v, r)),
                    (w = c(w, s))
            var O = m(t) + m(u) + m(v) + m(w)
            return O.toLowerCase().toUpperCase() //转大写.toUpperCase()
        }
        //SHA1
        SHA1Encrypt(msg) {
            function add(x, y) {
                return ((x & 0x7fffffff) + (y & 0x7fffffff)) ^ (x & 0x80000000) ^ (y & 0x80000000)
            }
            function SHA1hex(num) {
                var sHEXChars = '0123456789abcdef'
                var str = ''
                for (var j = 7; j >= 0; j--) str += sHEXChars.charAt((num >> (j * 4)) & 0x0f)
                return str
            }
            function AlignSHA1(sIn) {
                var nblk = ((sIn.length + 8) >> 6) + 1,
                    blks = new Array(nblk * 16)
                for (var i = 0; i < nblk * 16; i++) blks[i] = 0
                for (i = 0; i < sIn.length; i++) blks[i >> 2] |= sIn.charCodeAt(i) << (24 - (i & 3) * 8)
                blks[i >> 2] |= 0x80 << (24 - (i & 3) * 8)
                blks[nblk * 16 - 1] = sIn.length * 8
                return blks
            }
            function rol(num, cnt) {
                return (num << cnt) | (num >>> (32 - cnt))
            }
            function ft(t, b, c, d) {
                if (t < 20) return (b & c) | (~b & d)
                if (t < 40) return b ^ c ^ d
                if (t < 60) return (b & c) | (b & d) | (c & d)
                return b ^ c ^ d
            }
            function kt(t) {
                return t < 20 ? 1518500249 : t < 40 ? 1859775393 : t < 60 ? -1894007588 : -899497514
            }
            var x = AlignSHA1(msg)
            var w = new Array(80)
            var a = 1732584193
            var b = -271733879
            var c = -1732584194
            var d = 271733878
            var e = -1009589776
            for (var i = 0; i < x.length; i += 16) {
                var olda = a
                var oldb = b
                var oldc = c
                var oldd = d
                var olde = e
                for (var j = 0; j < 80; j++) {
                    if (j < 16) w[j] = x[i + j]
                    else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1)
                    t = add(add(rol(a, 5), ft(j, b, c, d)), add(add(e, w[j]), kt(j)))
                    e = d
                    d = c
                    c = rol(b, 30)
                    b = a
                    a = t
                }
                a = add(a, olda)
                b = add(b, oldb)
                c = add(c, oldc)
                d = add(d, oldd)
                e = add(e, olde)
            }
            let SHA1Value = SHA1hex(a) + SHA1hex(b) + SHA1hex(c) + SHA1hex(d) + SHA1hex(e)
            return SHA1Value
        }
        Base64encode(input) {
            var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            var output = ''
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4
            var i = 0
            input = $.Base64utf8encode(input)
            while (i < input.length) {
                chr1 = input.charCodeAt(i++)
                chr2 = input.charCodeAt(i++)
                chr3 = input.charCodeAt(i++)
                enc1 = chr1 >> 2
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                enc4 = chr3 & 63
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }
                output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
            }
            return output
        }
        Base64decode(input) {
            var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
            var output = ''
            var chr1, chr2, chr3
            var enc1, enc2, enc3, enc4
            var i = 0
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
            while (i < input.length) {
                enc1 = _keyStr.indexOf(input.charAt(i++))
                enc2 = _keyStr.indexOf(input.charAt(i++))
                enc3 = _keyStr.indexOf(input.charAt(i++))
                enc4 = _keyStr.indexOf(input.charAt(i++))
                chr1 = (enc1 << 2) | (enc2 >> 4)
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
                chr3 = ((enc3 & 3) << 6) | enc4
                output = output + String.fromCharCode(chr1)
                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2)
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3)
                }
            }
            output = $.Base64utf8decode(output)
            return output
        }
        Base64utf8encode(string) {
            string = string.replace(/\r\n/g, '\n')
            var utftext = ''
            for (var n = 0; n < string.length; n++) {
                var c = string.charCodeAt(n)
                if (c < 128) {
                    utftext += String.fromCharCode(c)
                } else if (c > 127 && c < 2048) {
                    utftext += String.fromCharCode((c >> 6) | 192)
                    utftext += String.fromCharCode((c & 63) | 128)
                } else {
                    utftext += String.fromCharCode((c >> 12) | 224)
                    utftext += String.fromCharCode(((c >> 6) & 63) | 128)
                    utftext += String.fromCharCode((c & 63) | 128)
                }
            }
            return utftext
        }
        Base64utf8decode(utftext) {
            var string = ''
            var i = 0
            let c = 0,
                c1 = 0,
                c2 = 0
            while (i < utftext.length) {
                c = utftext.charCodeAt(i)
                if (c < 128) {
                    string += String.fromCharCode(c)
                    i++
                } else if (c > 191 && c < 224) {
                    let c2 = utftext.charCodeAt(i + 1)
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
                    i += 2
                } else {
                    let c2 = utftext.charCodeAt(i + 1)
                    let c3 = utftext.charCodeAt(i + 2)
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
                    i += 3
                }
            }
            return string
        }
        //AES/DES加解密，CryptoJS
        EncryptCrypto(method, mode, padding, message, key, iv) {
            return CryptoJS[method]
                .encrypt(CryptoJS.enc.Utf8.parse(message), CryptoJS.enc.Utf8.parse(key), {
                    mode: CryptoJS.mode[mode],
                    padding: CryptoJS.pad[padding],
                    iv: CryptoJS.enc.Utf8.parse(iv),
                })
                .ciphertext.toString(CryptoJS.enc.Base64)
        }
        DecryptCrypto(method, mode, padding, message, key, iv) {
            return CryptoJS[method]
                .decrypt(
                    {
                        ciphertext: CryptoJS.enc.Base64.parse(message),
                    },
                    CryptoJS.enc.Utf8.parse(key),
                    {
                        mode: CryptoJS.mode[mode],
                        padding: CryptoJS.pad[padding],
                        iv: CryptoJS.enc.Utf8.parse(iv),
                    }
                )
                .toString(CryptoJS.enc.Utf8)
        }
        //RSA加密
        RSA(msg, key) {
            global.navigator = {
                appName: 'nodejs',
            } // fake the navigator object
            global.window = {} // fake the window object
            const JSEncrypt = require('jsencrypt')
            let enc = new JSEncrypt()
            enc.setPublicKey(key)
            return enc.encrypt(msg).toString()
        }
        YHS() {
            let YHS = $.isNode() ? ($.fse().existsSync('index.js') ? '1' : '0') : `0`
            return YHS
        }
        fse() {
            let fs = this.isNode() ? require('fs') : ''
            return fs
        }
        filename(s) {
            let filename = $.isNode() ? require('path').basename(__filename) : `${s}.js`
            return filename
        }
        ntf(s) {
            let ntf = $.isNode() ? require(`./sendNotify`) : ``
            return ntf
        }
        RZ(ac, s) {
            $.log(s.replace(/【/g, ``).replace(/】/g, ``))
            ac.msg = ac.msg + s
        }
    })(t, e)
}
