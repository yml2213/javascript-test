//@title 快手答题
//@cron 14 8-18 * * *


/*
快手答题              kuaishou_dt.js

-------------------  青龙-配置文件-复制区域  -------------------
# 快手答题 
export kuaishou_dt=" cookie @ cookie "  
export kuaishou_dt_code="你的卡密"    需要购买卡密请前往: http://menglei.xyz:56789/    

多账号用 换行 或 @ 分割  
抓 https://encourage.kuaishou.com  的 的 cookie

tg频道: https://t.me/yml2213_tg  
*/

// process.env.kuaishou_dt = ''

const $ = Env('快手答题');
const fs = require('fs');
const envSplit = ['\n', '&', '@'];     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['kuaishou_dt'];                //支持多变量
const CryptoJS = require('crypto-js');
require('dotenv').config();
const kuaishou_dt_code = process.env.kuaishou_dt_code;



//====================================================================================================

//====================================================================================================

class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`;
        this.ckFlog = true;
        // this.ck = ck.split('#')
        this.ck = ck;
        this.ts13 = $.ts(13);

        this.hd = {
            'Host': 'encourage.kuaishou.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/90.0.4430.226 KsWebView/1.8.90.612 (rel) Mobile Safari/537.36 Yoda/3.1.4-rc1 ksNebula/11.4.40.5686 OS_PRO_BIT/64 MAX_PHY_MEM/11598 AZPREFIX/zw ICFO/0 StatusHT/32 TitleHT/44 NetType/WIFI ISLP/0 ISDM/0 ISLB/0 locale/zh-cn CT/0 ISLM/-1',
            'X-Requested-With': 'com.kuaishou.nebula',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Dest': 'empty',
            'Cookie': this.ck,
            'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
        };

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`);

        $.log(`\n-------------- 开始验证卡密 --------------`);
        await this.auth(); // 验证

        if (this.ckFlog) {
            $.log(`\n-------------- 开始答题 --------------`);


            await this.start_dt(); // 开始答题

        }


    }



    async auth() { // 验证 
        let options = {
            fn: '卡密验证',
            method: 'get',
            url: `http://81.70.196.85:7006/ksjsb/auth`,
            headers: {
                'voucherCode': kuaishou_dt_code
            }
        };
        // console.log(options)
        let resp = await $.request(options);
        // console.log(resp)
        if (resp.code == 200) {
            if (resp.message != '您是永久卡密！') {
                $.log(`${this.idx}: ${options.fn}, 卡密次数:${resp.message}`);
            } else {
                $.log(`${this.idx}: ${options.fn}, 卡密次数:${resp.message}, 欢迎尊贵的永久卡密用户!`);
            }
            this.ckFlog = true;
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${options.fn} 失败:${resp.message}, 请检查卡密是否正确, 购买卡密请前往: 'http://menglei.xyz:56789/'`, { notify: true }), this.ckFlog = false;
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false;
    }



    async start_dt() { // 开始答题 
        let options = {
            fn: '开始答题',
            method: 'get',
            url: `https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/kickoff?reKickoff=false&sigCatVer=1`,
            headers: this.hd,

        };
        // console.log(options)
        let resp = await $.request(options);
        // console.log(resp)
        if (resp.result == 1 && resp.data.roundId) {

            this.roundId = resp.data.roundId;
            this.questionDetail = resp.data.questionDetail;
            this.question = resp.data.questionDetail.question;
            this.opt = resp.data.questionDetail.options;
            this.index = resp.data.questionDetail.index;
            this.total = resp.data.questionDetail.total;

            await this.next(this.index, this.question, this.opt, this.roundId);

            this.ckFlog = true;
        } else if (resp.result == 103703) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.error_msg}`);
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false;
    }


    async upload(question, opt, roundId, index, answer, nswer_index, type = 'gpt') { // 上传答案 
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
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Cookie': this.ck,
                'content-type': 'application/json'
            },
            json: {
                "roundId": roundId,
                "index": index,
                "answer": nswer_index
            }
        };
        // console.log(options)
        let resp = await $.request(options);
        // console.log(resp)

        if (type == 'gpt') {
            if (resp.result == 1 && resp.data.answerDetail.correct) {

                if (index == 9) {
                    await this.up_qs(question, opt, roundId, answer);
                    $.log(`${this.idx}: 恭喜你个狗子, 10 道题全对了, 当前金币:${resp.data.amount.current}`);
                } else {
                    this.roundId = resp.data.nextQuestionDetail.roundId;
                    this.questionDetail = resp.data.nextQuestionDetail.questionDetail;
                    this.question = resp.data.nextQuestionDetail.questionDetail.question;
                    this.opt = resp.data.nextQuestionDetail.questionDetail.options;
                    this.index = resp.data.nextQuestionDetail.questionDetail.index;
                    // this.total = resp.data.nextQuestionDetail.questionDetail.total

                    await this.up_qs(question, opt, roundId, answer);
                    $.log(`${this.idx}: ${options.fn} 第 ${index + 1} 题 -- 回答正确, 上传服务器题库, 当前金币:${resp.data.amount.current}`);

                    await this.next(this.index, this.question, this.opt, this.roundId);
                }

            } else if (resp.result == 1 && resp.data.answerDetail.correct == false) {
                $.log(`${this.idx}:  第 ${index + 1} 题 -- 回答错误, 已经将正确答案上传服务器题库, 下次就不会错了鸭!`);
                await this.up_qs(question, opt, roundId, resp.data.answerDetail.correctAnswer);
                console.log(JSON.stringify(resp));
            } else console.log(`${options.fn}: 失败, ${JSON.stringify(options)} ${JSON.stringify(resp)}`);
        } else if (type == 'database') {
            if (resp.result == 1 && resp.data.answerDetail.correct) {
                if (index == 9) {
                    $.log(`${this.idx}: 恭喜你个狗子, 10 道题全对了, 当前金币:${resp.data.amount.current}`);
                } else {
                    this.roundId = resp.data.nextQuestionDetail.roundId;
                    this.questionDetail = resp.data.nextQuestionDetail.questionDetail;
                    this.question = resp.data.nextQuestionDetail.questionDetail.question;
                    this.opt = resp.data.nextQuestionDetail.questionDetail.options;
                    this.index = resp.data.nextQuestionDetail.questionDetail.index;
                    // this.total = resp.data.nextQuestionDetail.questionDetail.total

                    $.log(`${this.idx}: ${options.fn} 第 ${index + 1} 题 -- 回答正确, 当前金币:${resp.data.amount.current}`);
                    await this.next(this.index, this.question, this.opt, this.roundId);
                }

            } else if (resp.result == 1 && resp.data.answerDetail.correct == false) {
                $.log(`${this.idx}:  第 ${index + 1} 题 -- 回答错误, 请检查数据库答案`);
                console.log(JSON.stringify(resp));
            } else console.log(`${options.fn}: 失败, ${JSON.stringify(options)} ${JSON.stringify(resp)}`);

        }


    }

    // https://encourage.kuaishou.com/rest/n/encourage/game/quiz/round/answer/upload?__NS_sig3=c9d99eaee03b5bfefe949796ff9ad837302f4fea88888a8a8584879d&sigCatVer=1
    async next(index, question, opt, roundId) { // 答题逻辑

        $.log(`\n\n\n${this.idx}:  第 ${index + 1} 题 -- 问题:${question} -- 选项:[${this.opt}]`);

        $.log(`${this.idx}: 开始查询数据库...`);
        let database_data = await this.checkDatabase(question, opt);
        if (database_data) {
            // console.log(database_data)
            let answer_index = opt.indexOf(database_data.answer);
            let answer = database_data.answer;

            await $.wait($.randomInt(3, 5));
            await this.upload(question, opt, roundId, index, answer, answer_index, 'database');
        } else {

            $.log(`${this.idx}: 开始查询数据库(2)...`);
            let database_data_2 = await this.checkDatabase_2(question, opt);
            if (database_data_2) {
                let answer_index = opt.indexOf(database_data_2);
                if (answer_index == -1) {
                    let isNumber = !isNaN(database_data_2.trim());
                    console.log(isNumber);
                    // console.log(`返回结果为数字`);
                    database_data_2 = Number(database_data_2);
                    answer_index = opt.indexOf(database_data_2);
                }
                let answer = database_data_2;
                await $.wait($.randomInt(3, 5));
                await this.upload(question, opt, roundId, index, answer, answer_index, 'gpt');
            } else {
                try {
                    $.log(`${this.idx}: gpt 时间...`);
                    let answer_data = await this.to_gpt(question, opt);
                    let answer_index = answer_data.index;
                    let answer = answer_data.answer;
                    await this.upload(question, opt, roundId, index, answer, answer_index, 'gpt');
                } catch (error) {
                    console.log(error);
                }
            }

        }

    }




    async to_gpt(question, opt) {

        let data = `你是一个答题机器人,我会给你题目以及选项,你直接回答正确答案的即可;
        题目: ${question},  选项:${opt}`;
        let res1 = await this.gpt4(data);
        let res2 = await this.gpt1(data);
        // let res3 = await this.gpt2(data)
        // let resArr = [res1, res2]
        let resArr = [res1, res2];
        console.log(resArr);
        let gpt4_data = `你是一个总结机器人,我会给你选项,再加上你的理解   返回问题的正确答案; 参考选项${resArr},  需回答题目: ${question},  题目选项:${opt};请返回我正确答案;使用以下json字符串格式返回:{answer:xxxxx}`;

        try {
            let res4 = await this.gpt2(gpt4_data);
            // console.log(`================ gpt 返回 =================`)
            // console.log(res4)
            // console.log(typeof res4)
            // console.log(`================ =======================`)

            if (typeof res4 == 'object') {
                // console.log(`是对象`)
                let answer = res4.answer;
                if (opt.includes(answer)) {
                    answer_index = opt.indexOf(answer);
                    // console.log(index)
                    console.log(`gpt 选择答案: 本次选择 ${answer_index}--${answer}`);
                    console.log({ 'index': answer_index, 'answer': answer });
                    return { 'index': answer_index, 'answer': answer };
                } else {
                    let b = $.randomInt(0, 3);
                    console.log(`gpt 不行了--1 开始随机答案: 本次选择${b}`);
                    return { 'index': b, 'answer': opt[b] };
                }
            } else if (typeof res4 == 'string') {
                function getJsonStr(jsonString) {
                    const regex = /"answer".*:.*"(.*)"/gm;
                    const match = jsonString.match(regex);

                    if (match) {
                        const answer = match[0];
                        // console.log(answer); // 输出: 中国
                        return `{${answer}}`;
                    } else {
                        // console.log("未找到匹配的内容")
                        return false;
                    }
                }

                if (getJsonStr(res4)) {
                    let aa = JSON.parse(getJsonStr(res4));
                    // console.log(aa)
                    let answer = aa.answer;
                    if (opt.includes(answer)) {
                        let answer_index = opt.indexOf(answer);
                        // console.log(index)
                        console.log(`gpt 选择答案: 本次选择 ${answer_index}--${answer}`);
                        console.log({ 'index': answer_index, 'answer': answer });
                        return { 'index': answer_index, 'answer': answer };
                    } else {
                        let b = $.randomInt(0, 3);
                        console.log(`gpt 不行了 开始随机答案: 本次选择${b}`);
                        return { 'index': b, 'answer': opt[b] };
                    }

                } else {
                    for (let option of opt) {
                        function checkOptionExistence(option, string) {
                            return string.includes(option);
                        }
                        let optionExists = checkOptionExistence(option, res4);
                        if (optionExists) {
                            let answer = option;
                            let answer_index = opt.indexOf(answer);
                            console.log(`gpt 选择答案: 本次选择 ${answer_index}--${answer}`);
                            console.log({ 'index': answer_index, 'answer': answer });
                            return { 'index': answer_index, 'answer': answer };

                        } else {
                            let b = $.randomInt(0, 3);
                            console.log(`gpt 不行了 --2 开始随机答案: 本次选择 ${b}`);
                            return { 'index': b, 'answer': opt[b] };
                        }

                    }
                }



            } else if (res4 == undefined) {
                let b = $.randomInt(0, 3);
                console.log(`gpt 不行了 --3 开始随机答案: 本次选择${b}`);
                return { 'index': b, 'answer': opt[b] };

            } else {
                let b = $.randomInt(0, 3);
                console.log(`gpt 不行了 --4 开始随机答案: 本次选择${b}`);
                return { 'index': b, 'answer': opt[b] };
            }


        } catch (error) {
            console.log(error);
        }

    }


    async checkDatabase(question, opt) {
        const options = {
            method: 'get',
            url: `http://81.70.196.85:7006/ksjsb/question?str=${question}`,
            headers: {
                'Content-Type': 'application/json',
                "voucherCode": kuaishou_dt_code
            }

        };

        let resp = await $.request(options);
        // console.log(resp)
        if (resp.code == 200) {
            $.log(`${this.idx}: ${this.question}   ❀❀❀数据库支援来了❀❀❀ `);
            $.log(`${this.idx}: ${resp.message}`);
            return resp.data;
        } else if (resp.code == 404) {
            $.log(`${this.idx}: ${this.question} 数据库没有这个题`);
            $.log(`${this.idx}: ${resp.message}`);
            return false;
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`);
    }

    async checkDatabase_2(question, opt) {

        let data = question.replace('？', '?');
        const options = {
            method: 'post',
            url: `https://csss.kanshangni.cn/duquAA.php`,
            headers: {
                'User-Agent': 'test',
                'Host': 'csss.kanshangni.cn',
                'Connection': 'Keep-Alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
            form: {
                'timu': data
            }

        };

        let resp = await $.request(options);
        // console.log(resp);
        if (resp) {
            $.log(`${this.idx}: ${question}   ❀❀❀数据库(2)支援来了❀❀❀ `);
            return resp;
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`);
        // if (resp.code == 200) {
        //     $.log(`${this.idx}: ${this.question}   ❀❀❀数据库(2)支援来了❀❀❀ `);
        //     $.log(`${this.idx}: ${resp.message}`);
        //     return resp.data;
        // } else if (resp.code == 404) {
        //     $.log(`${this.idx}: ${this.question} 数据库(2)没有这个题`);
        //     $.log(`${this.idx}: ${resp.message}`);
        //     return false;
        // } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`);
    }


    async up_qs(question, opt, roundId, answer) {
        const options = {
            method: 'post',
            url: `http://81.70.196.85:7006/ksjsb`,
            headers: {
                'Content-Type': 'application/json'
            },
            json: {
                "question": question, //题目
                "options": opt, //选项
                "answer": answer, //答案
                "roundId": roundId //roundId
            }
        };

        let resp = await $.request(options);
        // console.log(resp)
        if (resp.code == 200 && resp.message == "成功！") {
            $.log(`${this.idx}: ${question} -- [${opt}]; 答案:${answer}, 上传数据库成功...`);
        } else if (resp.code == 202 && resp.message == "存在重复题目") {
            $.log(`${this.idx}: ${resp.message}`);
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`);
    }

    async gpt1(data) { // 在问 https://www.zaiwen.top  {"message":[{"role":"user","content":"1112\n"}],"mode":"v3.5","key":null}
        const got = require('got');
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
            timeout: 10 * 1000
        };

        try {
            const response = await got(options);
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            // console.log('gpt1--www.zaiwen.top :', response.body)
            return response.body;

        } catch (error) {
            console.error('请求出错：', error.message);
        }
    }


    async gpt2(data) { // https://chat.yqcloud.top
        const got = require('got');
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
            timeout: 10 * 1000
        };

        try {
            const response = await got(options);
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            console.log('gpt2--chat.yqcloud.top :', response.body);
            return response.body;
        } catch (error) {
            console.error('请求出错：', error.message);
        }
    }

    async gpt3(data) { // https://chatd.free2gpt.xyz/  {"messages":[{"role":"user","content":"123"}],"time":1690544881175,"pass":null,"sign":"2b5d0140bd4c6b36fb5780ff7bcd257787f29e4b4ad4fcda0a22582fc923e917"} {t: 1690544881175, m: '123'}
        const got = require('got');

        // let ts13 = '1690545234320'
        let ts13 = $.ts(13);
        let r = `${ts13}:${data}:`;
        let sign = this.getSign(r);
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
            timeout: 10 * 1000
        };

        try {
            const response = await got(options);
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            // console.log('gpt3--chatd.free2gpt.xyz :', response.body)
            return response.body;
        } catch (error) {
            console.error('请求出错：', error.message);
        }
    }
    async gpt4(data) { // https://macio.cc/
        const got = require('got');
        // let ts13 = '1690544424824'
        let ts13 = $.ts(13);
        let r = `${ts13}:${data}:undefined`;
        let sign = this.getSign(r);
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
        };

        try {
            // console.log(options)
            const response = await got(options);
            // 处理响应
            // console.log('响应状态码：', response.statusCode)
            // console.log('gpt4-- macio.cc :', response.body)
            return response.body;
        } catch (error) {
            console.error('请求出错：', error.message);
        }
    }




    getSign(r) {
        // console.log(r)
        let hash = CryptoJS.SHA256(r);
        const byteArray = CryptoJS.enc.Hex.parse(hash.toString());
        let byte32Array = CryptoJS.lib.WordArray.create(byteArray.words, 32).toString();
        // console.log(byte32Array)
        return byte32Array;
    }



}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask();
        }
    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.exitNow());


//========================= 2023/06/19 ======================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name;
            this.startTime = Date.now();
            this.log(`[${this.name}]开始运行`);

            this.notifyStr = [];
            this.notifyFlag = true;

            this.userIdx = 0;
            this.userList = [];
            this.userCount = 0;
        }

        async request(opt, type = 'body') {
            try {
                const got = require('got');
                let DEFAULT_TIMEOUT = 8 * 1000;      // 默认超时时间
                let DEFAULT_RETRY = 2;     // 默认重试次数--2
                let resp = null, count = 0;
                let fn = opt.fn || opt.url;
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT;
                opt.retry = opt.retry || { limit: 0 };
                opt.method = opt?.method?.toUpperCase() || 'GET';
                while (count++ < DEFAULT_RETRY) {
                    try {
                        resp = await got(opt);
                        break;
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`);
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`);
                        }
                    }
                }
                if (resp == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null });
                // console.log(resp)
                let { statusCode, headers, body } = resp;
                if (body) try {
                    body = JSON.parse(body);
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body);
                } else if (type == 'cookie') {
                    return Promise.resolve(resp);
                } else if (type == 'hd') {
                    return Promise.resolve(headers);
                } else if (type == 'all') {
                    return Promise.resolve([headers, body]);
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode);
                }
            } catch (error) {
                console.log(error);
            }

        }

        log(msg, options = {}) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg);
            }
            let opt = { console: true };
            Object.assign(opt, options);

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss';
                msg = `[${this.time(fmt)}]` + msg;
            }
            if (opt.notify) {
                this.notifyStr.push(msg);
            }
            if (opt.console) {
                console.log(msg);
            }

        }

        read_env(Class) {
            require('dotenv').config();
            let envStrList = ckNames.map(x => process.env[x]);
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplit.filter(x => env_str.includes(x));
                let splitor = sp.length > 0 ? sp[0] : envSplit[0];
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
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t;
        }

        async showmsg() {
            if (!this.notifyFlag) return;
            if (!this.notifyStr) return;
            if (this.notifyStr.length) return;
            let notify = require('../sendNotify');
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

        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
                return data;
            } else {
                return phone_num;
            }
        }

        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min);
        }

        async yiyan() {
            const got = require('got');
            return new Promise((resolve) => {
                (async () => {
                    try {
                        const response = await got('https://v1.hitokoto.cn');
                        // console.log(response.body)
                        let data = JSON.parse(response.body);
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`;
                        // console.log(data_)
                        resolve(data_);
                    } catch (error) {
                        console.log(error.response.body);
                    }
                })();
            });
        }

        ts(type = false, _data = "") {
            let myDate = new Date();
            let a = "";
            switch (type) {
                case 10:
                    a = Math.round(new Date().getTime() / 1000).toString();
                    break;
                case 13:
                    a = Math.round(new Date().getTime()).toString();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "m":
                    a = myDate.getMinutes();
                    break;
                case "y":
                    a = myDate.getFullYear();
                    break;
                case "h":
                    a = myDate.getHours();
                    break;
                case "mo":
                    a = myDate.getMonth();
                    break;
                case "d":
                    a = myDate.getDate();
                    break;
                case "ts2Data":
                    if (_data != "") {
                        time = _data;
                        if (time.toString().length == 13) {
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        } else if (time.toString().length == 10) {
                            time = time * 1000;
                            let date = new Date(time + 8 * 3600 * 1000);
                            a = date.toJSON().substr(0, 19).replace("T", " ");
                        }
                    }
                    break;
                default:
                    a = "未知错误,请检查";
                    break;
            }
            return a;
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


        wait(t) {
            $.log(`随机等待 ${t} 秒 ...`);
            return new Promise(e => setTimeout(e, t * 1000));
        }

        async exitNow() {
            await this.showmsg();
            let e = Date.now();
            let s = (e - this.startTime) / 1000;
            this.log(`[${this.name}]运行结束，共运行了${s}秒`);
            process.exit(0);
        }
    }(name);
}