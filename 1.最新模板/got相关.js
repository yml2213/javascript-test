var gotSend = require('got') //使用import也可以 import gotSend from 'got';
let FormData = require('form-data') //传递form使用
try {
    let url = "http://www.apipost.cn"
    //比较懒得 url不想输http的用这一段处理
    if (url.substr(0, 7).toLowerCase() == "http://"
        || url.substr(0, 8).toLowerCase() == "https://") {
        url = url
    } else {
        url = "http://" + url
    }
    let form = new FormData()
    form.append('my_file', fs.createReadStream('/foo/bar.jpg'))
    form.append("a", 1)
    let options = {
        url: url,
        method: "POST", //请求方式 get post... 不多介绍了
        headers: { //需要啥传啥 我列了几个常用的，不需要删除即可
            "cookie": "aaa=%E4%BD%A0%E5%A5%BD;yyyyy=nihao;", //请求携带的cookie 这里我是自己代码拼的，官网用的是tough-cookie 
            "content-type": "application/json", //编码类型 不同的content-type传递方式不相同 下面传参时会介绍
            "Origin": "http://www.apipost.cn" //请求来源 可以使用WHATWG 接口在url里获得new URL() 
        },
        responseType: "buffer",  //解析响应的方式默认(text) text，json，buffer 这里我使用buffer 因为buffer可以更自由的判断响应体的类型
        followRedirect: true, //是否遵循重定向响应 默认(true)
        timeout: 25000, //请求超时时间 好像还可以比较详细的设置 需要的分细的去官网看把
        rejectUnauthorized: true, //检测到无效的SSL证书时，引发错误.默认（true） false是忽略无效证书错误
        //下面是携带参数了，划重点 根据不同的content-type选择一个即可
        json: { a: 1 }, //application/json时使用 支持类型 object| Array | number | string | boolean | null
        body: form,//multipart/form-data时使用 多个参数继续append即可。
        form: { a: 1 }, //application/x-www-form-urlencoded时使用 类型只能是对象object
        // http2:true, //根据ALPN协议选择HTTP/2 默认(http 1.1) 这里我还在研究
        // isStream:true //返回的是Stream流 默认false 返回的是Promise http2好像要配合这个使用
    }
    let got = gotSend(options) //如果需要取消请求，把变量在全局声明 掉用got.cancel() 就可以取消请求
    got.then(response => {
        //请求成功 具体业务具体判断statusCode
        if (response.statusCode) {
            //这里就拿到response 请求的参数在response.request.options 里 很齐全
            //响应体 response.body
            //响应头 response.headers
            //.....  需要什么可以打印出来看看 
        }
    }).catch(error => {
        //请求发生错误 
    })
} catch (error) {
    //请求发生错误 
}
