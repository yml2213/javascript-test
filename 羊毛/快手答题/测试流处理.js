const got = require('got')
const { pipeline } = require('stream');

(async () => {
    try {
        const responseStream = await got.stream.post('https://wxblog.xyz/api/blog/sendmessage', {
            headers: {
                'Pragma': 'no-cache',
                'Cookie': 'connect.sid=s%3AKEs_H83Uhocrr1HvhYDWdGCJsFh2hqhK.w0VLCnvE0dlQ8iBxOOEb6w0gPugAYU9GaPNqzi9aW5I',
                'Content-Type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',

            },
            json: {
                "content": "你可以做啥",
                "time": 1690550355264
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
            // console.log(content)
            const regex = /{"index":\d,"delta":{"content":"([^"]+)"/g
            const matches = [...content.matchAll(regex)]
            let result = ''

            for (let i = 0; i < matches.length; i++) {
                const match = matches[i]
                const content = match[1]
                result += content
            }
            console.log(result)

        })

        // 使用 pipeline 将响应流导入标准输出流
        pipeline(responseStream, process.stdout, (error) => {
            if (error) {
                console.error('管道出错', error)
            }
        })
    } catch (error) {
        console.error('请求出错', error)
    }
})()
