const axios = require('axios')
const CryptoJS = require('crypto-js')



// 模拟抽奖函数
function lottery() {
    return new Promise(async (resolve, reject) => {
        // // 模拟抽奖逻辑
        // // 假设抽奖结果是一个随机的数字
        // const result = Math.floor(Math.random() * 100)
        // // 模拟抽奖结果返回
        // setTimeout(() => {
        //     resolve(result)
        // }, 1000)
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
            console.log(`===========`)

            console.log(response.data)
            console.log(`===========`)
            resolve(response.data)
        } catch (error) {
            reject(error)
        }



    })
}

async function runLottery(num) {
    // 创建一个数组用于保存所有抽奖任务的Promise对象
    const promises = []

    // 启动多个并发抽奖任务
    for (let i = 0; i < num; i++) {
        promises.push(lottery())
    }

    // 等待所有抽奖任务完成
    const results = await Promise.all(promises)

    // 处理抽奖结果
    results.forEach((result, index) => {
        console.log(`抽奖${index + 1}的结果是：${result}`)
    })
}

// 示例：启动5个并发抽奖任务
runLottery(1)