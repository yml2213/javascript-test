/*
快手答题              kuaishou_dt.js

-------------------  青龙-配置文件-复制区域  -------------------
# 快手答题 
export kuaishou_dt=" cookie @ cookie "  

多账号用 换行 或 @ 分割  
抓 iehuangsecond/ga/public/api/login  的 body 里面的信息

tg频道: https://t.me/yml2213_tg  
*/

// process.env.kuaishou_dt = ''

const $ = Env('快手答题')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['kuaishou_dt']                //支持多变量
const CryptoJS = require('crypto-js')

//====================================================================================================

let questions = {}
//====================================================================================================






class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        // this.ck = ck.split('#')
        this.ck = ck
        this.ts13 = $.ts(13)

        this.hd = {
            'Host': 'encourage.kuaishou.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.612 (rel) Mobile Safari/537.36 Yoda/3.1.4-rc1 ksNebula/11.4.40.5686 OS_PRO_BIT/64 MAX_PHY_MEM/11598 AZPREFIX/zw ICFO/0 StatusHT/32 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn CT/0 ISLM/-1',
            'X-Requested-With': 'com.kuaishou.nebula',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Dest': 'empty',
            // 'Referer': 'https://encourage.kuaishou.com/activity/qa?fid=3623810913&cc=panelPoster&followRefer=151&shareMethod=PICTURE&kpn=NEBULA&subBiz=QA_MAIN&shareToken=X8yOp3SqySHS1V2&shareId=17551723453111&shareMode=APP&originShareId=17551723453111&layoutType=4&shareObjectId=3623810913&shareUrlOpened=0&timestamp=1690346196103',
            'Cookie': this.ck,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        await this.start_dt() // 开始答题

        // this.question = '1989年的《三狼奇案》是哪国/地区的电影?'
        // this.opt = ['塞拉利昂', '阿塞拜', '爱沙尼亚', '中国香港']

        // await this.to_gpt(this.question, this.opt)


        // if (this.ckFlog) {
        //     $.log(`\n-------------- 任务 --------------`)
        //     // await this.check_ip()   // 查看ip
        //     // await this.close_wlfi() // 关闭
        //     // await $.wait(5)
        //     // await this.open_wlfi() // 打开
        //     // await $.wait(5)
        //     // await this.check_ip()   // 查看ip



        // }


    }



    async start_dt() { // 开始答题 
        let options = {
            fn: '开始答题',
            method: 'get',
            url: `https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/kickoff?reKickoff=false&sigCatVer=1`,
            headers: this.hd,

        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.result == 1 && resp.data.roundId) {

            this.roundId = resp.data.roundId
            this.questionDetail = resp.data.questionDetail
            this.question = resp.data.questionDetail.question
            this.opt = resp.data.questionDetail.options
            this.index = resp.data.questionDetail.index
            this.total = resp.data.questionDetail.total


            this.answer = await this.to_gpt(this.question, this.opt)

            $.log(`${this.idx}: ${options.fn} -- 成功, ${this.question}: ${this.opt}, gpt 时间...`)
            await this.upload(this.roundId, this.index, this.answer)


            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }


    // https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=c9d99eaee03b5bfefe949796ff9ad837302f4fea88888a8a8584879d&sigCatVer=1
    async upload(roundId, index, answer) { // 上传答案 
        let options = {
            fn: '上传答案',
            method: 'post',
            url: `https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?sigCatVer=1`,
            headers: {
                'Host': 'encourage.kuaishou.com',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.612 (rel) Mobile Safari/537.36 Yoda/3.1.4-rc1 ksNebula/11.4.40.5686 OS_PRO_BIT/64 MAX_PHY_MEM/11598 AZPREFIX/zw ICFO/0 StatusHT/32 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn CT/0 ISLM/-1',
                'Accept': '*/*',
                'Origin': 'https://encourage.kuaishou.com',
                'X-Requested-With': 'com.kuaishou.nebula',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                // 'Referer': 'https://encourage.kuaishou.com/activity/qa?fid=3623810913&cc=panelPoster&followRefer=151&shareMethod=PICTURE&kpn=NEBULA&subBiz=QA_MAIN&shareToken=X8yOp3SqySHS1V2&shareId=17551723453111&shareMode=APP&originShareId=17551723453111&layoutType=4&shareObjectId=3623810913&shareUrlOpened=0&timestamp=1690346196103',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cookie': this.ck,
                'content-type': 'application/json'
            },
            json: {
                "roundId": roundId,
                "index": index,
                "answer": answer
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.result == 1 && resp.data.nextQuestionDetail) {

            this.roundId = resp.data.nextQuestionDetail.roundId
            this.questionDetail = resp.data.nextQuestionDetail.questionDetail
            this.question = resp.data.nextQuestionDetail.questionDetail.question
            this.opt = resp.data.nextQuestionDetail.questionDetail.options
            this.index = resp.data.nextQuestionDetail.questionDetail.index
            // this.total = resp.data.nextQuestionDetail.questionDetail.total

            $.log(`${this.idx}: ${options.fn} ${index} -- ok, 继续答题,下一题:${this.question}--${this.opt}, 当前金币:${resp.data.amount.current}`)
            await $.wait($.randomInt(3, 5))

            let answer = await this.to_gpt(this.question, this.opt)
            if (answer.length == 1) {
                await this.upload(this.roundId, this.index, answer)
            } else {
                console.log(answer)
            }



        } else if (resp.result == 1 && resp.data.nextQuestionDetail == null) {
            $.log(`${this.idx}: ${options.fn} 完成答题`)
            console.log(JSON.stringify(resp))



        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }





    async to_gpt(question, opt) {
        let ts13 = $.ts(13)

        Number(ts13) = {
            ques: question,
            opt: opt
        }
        questions[Number(ts13)] = Number(ts13)
        console.log(questions)



        let data = `你是一个答题机器人,我会给你题目以及选项,你直接回答正确答案的序号即可,选项是一个数组,第一项是0,第二项是1,第三项是2,第四项是3, 无需解释,只需要回答一个序号, 不需要题目,只要返回一个数字序号即可;
        题目: ${question},  选项:${opt}`
        let res1 = await this.gpt1(data)  // 在问 https://www.zaiwen.to
        let res2 = await this.gpt2(data)
        let res3 = await this.gpt3(data)
        let res4 = await this.gpt4(data)
        // let res5 = await this.gpt5(data)

        // console.log(res2)
        // // console.log(res3)
        // // console.log(res4)
        let resArr = [res1, res2, res3, res4]
        console.log(resArr)
        let a = this.findMostFrequent(resArr)
        console.log(a)
        if (a) {
            console.log(`开始综合答案: 本次选择${a}`)
            return a
        } else {
            let b = $.randomInt(0, 3)
            console.log(`gpt 不行了 开始随机答案: 本次选择${b}`)
            return b
        }
    }




    async gpt1(data) { // 在问 https://www.zaiwen.top  {"message":[{"role":"user","content":"1112\n"}],"mode":"v3.5","key":null}
        const got = require('got')
        const options = {
            method: 'post',
            url: `https://www.gaosijiaoyu.cn/message`,
            headers: {
                'Accept': '*/*',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Origin': 'https://www.zaiwen.top',
                'Pragma': 'no-cache',
                'Referer': 'https://www.zaiwen.top/',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'cross-site',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'Content-Type': 'application/json'
            },
            json: { "message": [{ "role": "user", "content": data }], "mode": "v3.5", "key": null },
            timeout: 15 * 1000
        }

        try {
            const response = await got(options)
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            console.log('gpt1--www.zaiwen.top :', response.body)
            if (response.body.length == 1) {
                return response.body
            } else {
                let result = this.checkArrayElement(response.body)
                if (result) {
                    return result
                } else {
                    return false
                }
            }
        } catch (error) {
            console.error('请求出错：', error.message)
        }
    }


    async gpt2(data) { // https://chat.yqcloud.top
        const got = require('got')
        const options = {
            method: 'post',
            url: `https://api.aichatos.cloud/api/generateStream`,
            headers: {
                'authority': 'api.aichatos.cloud',
                'accept': 'application/json, text/plain, */*',
                'accept-language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'cache-control': 'no-cache',
                'origin': 'https://chat.yqcloud.top',
                'pragma': 'no-cache',
                'referer': 'https://chat.yqcloud.top/',
                'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'cross-site',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'content-type': 'application/json'
            },
            json: {
                "prompt": data,
                "userId": "#/chat/1690509306711",
                "network": true,
                "system": "",
                "withoutContext": false,
                "stream": false
            },
            timeout: 15 * 1000
        }

        try {
            const response = await got(options)

            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            console.log('gpt2--chat.yqcloud.top :', response.body)

            if (response.body.length == 1) {
                return response.body
            } else {

                let result = this.checkArrayElement(response.body)
                if (result) {
                    return result
                } else {
                    return false
                }

            }
        } catch (error) {
            console.error('请求出错：', error.message)
        }
    }

    async gpt3(data) { // https://chatd.free2gpt.xyz/  {"messages":[{"role":"user","content":"123"}],"time":1690544881175,"pass":null,"sign":"2b5d0140bd4c6b36fb5780ff7bcd257787f29e4b4ad4fcda0a22582fc923e917"} {t: 1690544881175, m: '123'}
        const got = require('got')

        // let ts13 = '1690545234320'
        let ts13 = $.ts(13)
        let r = `${ts13}:${data}:`
        let sign = this.getSign(r)
        // console.log(sign)
        const options = {
            method: 'post',
            url: `https://chatd.free2gpt.xyz/api/generate`,
            headers: {
                'authority': 'chatd.free2gpt.xyz',
                'accept': '*/*',
                'accept-language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'cache-control': 'no-cache',
                'origin': 'https://chatd.free2gpt.xyz',
                'pragma': 'no-cache',
                'referer': 'https://chatd.free2gpt.xyz/',
                'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'content-type': 'text/plain;charset=UTF-8'
            },
            json: { "messages": [{ "role": "user", "content": data }], "time": ts13, "pass": null, "sign": sign },
            timeout: 15 * 1000
        }

        try {
            const response = await got(options)

            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            console.log('gpt3--chatd.free2gpt.xyz :', response.body)
            if (response.body.length == 1) {
                return response.body
            } else {
                let result = this.checkArrayElement(response.body)
                if (result) {
                    return result
                } else {
                    return false
                }
            }
        } catch (error) {
            console.error('请求出错：', error.message)
        }
    }

    async gpt4(data) { // https://macio.cc/
        const got = require('got')
        // let ts13 = '1690544424824'
        let ts13 = $.ts(13)
        let r = `${ts13}:${data}:undefined`
        let sign = this.getSign(r)
        // console.log(data)
        const options = {
            method: 'post',
            url: `https://macio.cc/api/generate`,
            headers: {
                'authority': 'macio.cc',
                'accept': '*/*',
                'accept-language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'cache-control': 'no-cache',
                'origin': 'https://macio.cc',
                'pragma': 'no-cache',
                'referer': 'https://macio.cc/',
                // 'Cookie': '__51vcke__K1UIcdDHtxHuO31e=c1407a92-11e3-5e3a-b400-39fd64bc2ddf; __51vuft__K1UIcdDHtxHuO31e=1690535601149; __51uvsct__K1UIcdDHtxHuO31e=2; __vtins__K1UIcdDHtxHuO31e=%7B%22sid%22%3A%20%22e9bc36c1-5281-5ec0-9b76-a441c51bf62c%22%2C%20%22vd%22%3A%202%2C%20%22stt%22%3A%201459382%2C%20%22dr%22%3A%201459382%2C%20%22expires%22%3A%201690541477979%2C%20%22ct%22%3A%201690539677979%7D',
                'sec-ch-ua': '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
                'content-type': 'text/plain;charset=UTF-8'
            },
            json: { "messages": [{ "role": "user", "content": data }], "time": ts13, "pass": null, "sign": sign },
            timeout: 15 * 1000
        }

        try {
            // console.log(options)
            const response = await got(options)
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            console.log('gpt5-- macio.cc :', response.body)
            if (response.body.length == 1) {
                return response.body
            } else {
                let result = this.checkArrayElement(response.body)
                if (result) {
                    return result
                } else {
                    return false
                }
            }
        } catch (error) {
            console.error('请求出错：', error.message)
        }
    }





    getSign(r) {
        // console.log(r)
        let hash = CryptoJS.SHA256(r)
        const byteArray = CryptoJS.enc.Hex.parse(hash.toString())
        let byte32Array = CryptoJS.lib.WordArray.create(byteArray.words, 32).toString()
        // console.log(byte32Array)
        return byte32Array
    }

    checkArrayElement(a) {
        console.log(`本次检查 ${a}`)
        let b = [0, 1, 2, 3]
        for (let i = 0; i < b.length; i++) {
            if (a.includes(b[i].toString())) {
                console.log(`返回: ${b[i]}`)
                return b[i]
            }
        }
        return false
    }


    findMostFrequent(arr) {  // 寻找数组出现最多的一项
        let count = {}
        let maxCount = 0
        let mostFrequent

        for (let num of arr) {
            if (count[num]) {
                count[num]++
            } else {
                count[num] = 1
            }

            if (count[num] > maxCount) {
                maxCount = count[num]
                mostFrequent = num
            }
        }

        return mostFrequent
    }

}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.exitNow())


//========================= 2023/06/19 ======================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8 * 1000      // 默认超时时间
                let DEFAULT_RETRY = 2     // 默认重试次数--2
                let resp = null, count = 0
                let fn = opt.fn || opt.url
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
                // console.log(resp)
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(resp)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'all') {
                    return Promise.resolve([headers, body])
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
            }

        }

        log(msg, options = {}) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
            let opt = { console: true }
            Object.assign(opt, options)

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) {
                this.notifyStr.push(msg)
            }
            if (opt.console) {
                console.log(msg)
            }

        }

        read_env(Class) {
            require('dotenv').config()
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplit.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplit[0]
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck))
                }
            }
            this.userCount = this.userList.length
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true })
                return false
            }
            this.log(`共找到${this.userCount}个账号`)
            return true
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
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }

        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr) return
            if (this.notifyStr.length) return
            let notify = require('./sendNotify')
            this.log('\n============== 推送 ==============')
            await notify.sendNotify(this.name, this.notifyStr.join('\n'))
        }

        padStr(num, length, opt = {}) {
            let padding = opt.padding || '0'
            let mode = opt.mode || 'l'
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let pads = ''
            for (let i = 0; i < numPad; i++) {
                pads += padding
            }
            if (mode == 'r') {
                numStr = numStr + pads
            } else {
                numStr = pads + numStr
            }
            return numStr
        }

        json2str(obj, c, encode = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encode) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c)
        }

        str2json(str, decode = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue
                let idx = item.indexOf('=')
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decode) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }

        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                return data
            } else {
                return phone_num
            }
        }

        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        async yiyan() {
            const got = require('got')
            return new Promise((resolve) => {
                (async () => {
                    try {
                        const response = await got('https://v1.hitokoto.cn')
                        // console.log(response.body)
                        let data = JSON.parse(response.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.response.body)
                    }
                })()
            })
        }

        ts(type = false, _data = "") {
            let myDate = new Date()
            let a = ""
            switch (type) {
                case 10:
                    a = Math.round(new Date().getTime() / 1000).toString()
                    break
                case 13:
                    a = Math.round(new Date().getTime()).toString()
                    break
                case "h":
                    a = myDate.getHours()
                    break
                case "m":
                    a = myDate.getMinutes()
                    break
                case "y":
                    a = myDate.getFullYear()
                    break
                case "h":
                    a = myDate.getHours()
                    break
                case "mo":
                    a = myDate.getMonth()
                    break
                case "d":
                    a = myDate.getDate()
                    break
                case "ts2Data":
                    if (_data != "") {
                        time = _data
                        if (time.toString().length == 13) {
                            let date = new Date(time + 8 * 3600 * 1000)
                            a = date.toJSON().substr(0, 19).replace("T", " ")
                        } else if (time.toString().length == 10) {
                            time = time * 1000
                            let date = new Date(time + 8 * 3600 * 1000)
                            a = date.toJSON().substr(0, 19).replace("T", " ")
                        }
                    }
                    break
                default:
                    a = "未知错误,请检查"
                    break
            }
            return a
        }

        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length))
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase()
                } else {
                    str += chars
                }
            }
            return str
        }

        randomString(len, charset = 'abcdef0123456789') {
            let str = ''
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            return str
        }

        randomList(a) {
            let idx = Math.floor(Math.random() * a.length)
            return a[idx]
        }


        wait(t) {
            $.log(`随机等待 ${t} 秒 ...`)
            return new Promise(e => setTimeout(e, t * 1000))
        }

        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}