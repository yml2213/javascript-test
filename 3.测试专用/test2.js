async  yiyan() {
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




async function t() {
    let a = await yiyan()
    console.log(a)
}
t()



