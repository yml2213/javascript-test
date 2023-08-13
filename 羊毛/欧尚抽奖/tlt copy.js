const { Worker, isMainThread, workerData } = require('worker_threads')
const axios = require('axios')
const CryptoJS = require('crypto-js')

async function runLotteryWorker(workerIndex) {
    return new Promise(async (resolve, reject) => {
        function generateTimestamp() {
            const date = new Date()
            const year = date.getFullYear()
            const month = padZero(date.getMonth() + 1)
            const day = padZero(date.getDate())
            const hour = padZero(date.getHours())
            const minute = padZero(date.getMinutes())
            const second = padZero(date.getSeconds())
            return `${year}${month}${day}${hour}${minute}${second}`
            function padZero(num) {
                return String(num).padStart(2, '0')
            }
        }

        const ts = 20230813195121
        // const ts = generateTimestamp()
        const openid = '95a2c239a8f443d39a96f359052249aa'
        const token = 'user:app:token:15614832213228f82d3fa0c46d690b418da7a8389e0'
        const type = 'lottery'
        const a = `${ts}js_apibf231becbb1cdda42572a8170b0c374agame${type}appAgent=2&game_id=98&openid=${openid}&token=${token}&tokenAgent=1`
        const sign = CryptoJS.MD5(a).toString().toUpperCase()

        const options = {
            url: 'https://bac.oushangstyle.changan.com.cn/apph5/h5/2.0/common/game/lottery',
            method: 'post',
            headers: {
                Host: 'bac.oushangstyle.changan.com.cn',
                Accept: 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/115.0.5790.166 Mobile Safari/537.36 AgentWeb/5.0.0  UCBrowser/11.6.4.950',
                Origin: 'https://bac.oushangstyle.changan.com.cn',
                'X-Requested-With': 'com.changan.oushangCos1',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                Referer: 'https://bac.oushangstyle.changan.com.cn/h5/marathon/',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
                'Content-Type': 'application/x-www-form-urlencoded',
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
                game_id: '98',
                openid: openid,
                token: token,
                tokenAgent: '1',
                appAgent: '2',
                c: 'game',
                act: 'lottery',
                format: 'json',
                partnerCode: 'js_api',
                timestamp: ts,
                signature: sign,
            },
        }

        try {
            console.log(options)
            const response = await axios(options)
            resolve(response.data)
        } catch (error) {
            reject(error)
        }

        
    })
}

async function lottery(num) {
    const promises = []
    for (let i = 0; i < num; i++) {
        promises.push(runLotteryWorker(i))
    }

    try {
        const results = await Promise.all(promises)
        console.log(results)
    } catch (error) {
        console.error(error)
    }
}

lottery(2) // 执行两个抽奖任务
