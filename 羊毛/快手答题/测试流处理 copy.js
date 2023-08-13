const got = require('got')

const sendMessage = async () => {
    try {
        const responseStream = await got.stream.post('https://wxblog.xyz/api/blog/free/v1/chat/completions', {
            headers: {
                'Authorization': 'Bearer TWpJeE16STVNREl3TVVCeGNTNWpiMjA9',
                'Content-Type': 'application/json',
            },
            json: {
                "messages": [{
                    "role": "user",
                    "content": `你是一个答题机器人,我会给你题目以及选项,你直接回答正确答案代号即可(A/B/C/D);
                        题目: 澳大利亚运动员黑嘉嘉 (曾)是什么运动的选手?
                        选项:A:速度滑冰,B:飞镖 ,C:围棋,D:障碍滑雪`}],
                "stream": true,
                "model": "gpt-3.5-turbo",
                "temperature": 0.5,
                "presence_penalty": 2
            }

        })

        const chunks = []

        // 处理数据流事件
        responseStream.on('data', (chunk) => {
            chunks.push(chunk)
        })

        // 处理错误事件
        responseStream.on('error', (error) => {
            console.error('请求出错', error)
        })

        // 处理结束事件
        responseStream.on('end', () => {
            const content = Buffer.concat(chunks).toString()
            // console.log(`===================`)
            // console.log(content)
            // console.log(`===================`)

            const regex = /{"delta":{"content":"([^"]+)"/g
            let matches
            const result = []

            while ((matches = regex.exec(content)) !== null) {
                result.push(matches[1])
            }

            const finalResult = result.join('')

            console.log(finalResult)

        })

        // 不将响应流导入标准输出流，而是手动调用 responseStream.resume() 方法
        responseStream.resume()
    } catch (error) {
        console.error('请求出错', error)
    }
}

sendMessage()
