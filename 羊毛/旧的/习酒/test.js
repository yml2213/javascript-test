var request = require('request')


async function dh() {
    return new Promise((resolve) => {
        var options = {
            'method': 'POST',
            'url': 'https://apimallwm.exijiu.com/oforders',
            'headers': {
                'authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJbmZvIjp7ImlkIjo4MDU2NzYxfSwiZXhwaXJlVGltZSI6MTY3OTQzMjQwM30.O_0fId6jnVOXaxxh6ToYgKkeXQEKZBUCjNad7KPeQbU',
                'charset': 'utf-8',
                'login_code': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1bmlvbmlkIjoib0E0b0QxWnFjTFhTazZaX1k4cUZSQzhHT1UxdyIsInVzZXJfaWQiOjAsImV4cGlyZSI6MTY3OTczMjcxOH0.ts_Zh782HPpjYiUz6ArRm7cgA0yXrvTnABwyAUzjCm0',
                'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)'
            },
            formData: {
                'goods_code': '1001-DX',
                'id': '61605',
                'phone': '13754650804'
            }
        }
        request(options, function (error, response) {
            if (error) throw new Error(error)
            // console.log(response.body)
            let resp = response.body
            resolve(resp)
        })
    })

}

async function test() {
    let a = JSON.parse(await dh())
    // console.log(a.err)
    if (a.err == 5001) {
        console.log(a)
        await wait(3)
        await test()
    } else {
        console.log(`===============================`)
        console.log(a)
    }
    // console.log(a)






}

test()


async function wait(t) {
    return new Promise(e => setTimeout(e, t * 1000))
}