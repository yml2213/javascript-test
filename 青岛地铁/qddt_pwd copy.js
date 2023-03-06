/**
* @author banxiiay
* @origin yml
* @create_at 2023-02-14 20:53:08
* @description 上海杨浦信登录获取sessionId
* @version v0.0.1
* @title 上海杨浦-取token
* @platform qq wx tg pgm web cron
* @rule shyp ?
* @priority 100
* @public false
* @icon https://hi.kejiwanjia.com/wp-content/uploads/2021/12/favicon.ico
* 启用脚本
* @disable false
*/

// sender
const s = sender

// sender param 获取第1个参数
const phone = s.param(1)
console.log(`第1个参数: ${phone}`)
if (phone.length == 11) {
    console.log(`ok`)
    getCode(phone)

} else {
    console.log(`请输入正确的手机号！`)
    s.reply(`请输入正确的手机号！`)
}


function getCode(phone) {
    let name = "获取验证码"

    // request 网络请求
    var { body, headers, status } = request({
        url: `https://ypapi.shmedia.tech/media-basic-port/api/app/auth/send_validate_code`,
        method: "post",
        headers: {
            "log-header": "I am the log request header.",
            "deviceId": "10694",
            "siteId": "310110",
            "token": "",
            "Content-Type": "application/json; charset\u003dUTF-8",
            "Host": "ypapi.shmedia.tech",
        },
        body: `{"mobile":"${phone}","orderBy":"release_desc","requestType":"2","siteId":"310110"}`,
        allowredirects: false, //不禁止重定向
    })

    // console.log(body)
    let res = JSON.parse(body)
    //console.log(res)
    formToken = res.data.formToken
    if (res.code == 0) {
        //
        s.reply('请在60s内输入验证码:')
        // sender listen 监听用户回复 可以接超时、group和private
        var newS = s.listen(60 * 1000)//返回一个sender对象，超时后返回null
        if (newS == null) {
            s.reply("超时, 60秒内未输入验证码。")
        } else {
            // s.reply(`你回复了：${newS.getContent()}`)
            let code = newS.getContent()
            getToken(phone, code)
        }
    } else {
        s.reply('请稍后再试', res)
    }


}



function getToken(phone, code) {
    let name = "获取"


    var { body, headers, status } = request({
        url: `https://ypapi.shmedia.tech/media-basic-port/api/app/auth/validate_code_login`,
        method: "post",
        // dataType: "json",
        headers: {
            "log-header": "I am the log request header.",
            "deviceId": "10694",
            "siteId": "310110",
            "token": "",
            "Content-Type": "application/json; charset\u003dUTF-8",
            "Host": "ypapi.shmedia.tech",
        },
        body: `{"formToken":"${this.formToken}","mobile":"${phone}","validateCode":"${code}","orderBy":"release_desc","requestType":"2","siteId":"310110"}`,
        allowredirects: false, //不禁止重定向
    })


    console.log(body)
    let res = JSON.parse(body)
    console.log(res)
    s.reply(`上海杨浦--${res.headers.token}--token:\n${res.headers.token}`)
    if (res.code == 0) {
        //  s.reply(`上海杨浦--${res.headers.token}--token:\n${res.headers.token}`)

    } else if (res.code == 1) {
        s.reply(`${res.msg}`)
    } else {
        s.reply('请稍后再试', res)
    }
}

