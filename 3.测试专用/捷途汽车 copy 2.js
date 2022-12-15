/*
 * @author yml
 * @origin yml
 * @create_at 2022-11-29 23:03:34
 * @description 宝山汇短信登录获取token
 * @version v0.0.1
 * @title 宝山汇-取token
 * @platform qq wx tg pgm web cron
 * @rule bsh ?
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

    // request 网络请求
    var { body, headers, status } = request({
        url: `https://bsapi.shmedia.tech/media-basic-port/api/app/auth/send_validate_code`,
        method: "post",
        headers: {
            'log-header': 'I am the log request header.',
            'deviceId': '10596',
            'siteId': '310113',
            'token': '',
            'Host': 'bsapi.shmedia.tech',
            'Connection': 'Keep-Alive',
            'User-Agent': 'okhttp/3.14.2',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "mobile": phone,
            "orderBy": "release_desc",
            "requestType": 2,
            "siteId": 310113,
        }),
        allowredirects: false, //不禁止重定向
    })

    console.log(body)
    let res = JSON.parse(body)
    if (res.code == 0) {
        let formToken = res.data.formToken
        s.reply('请在60s内输入验证码:')
        // sender listen 监听用户回复 可以接超时、group和private
        var newS = s.listen(60 * 1000)//返回一个sender对象，超时后返回null
        if (newS == null) {
            s.reply("超时, 60秒内未输入验证码。")
        } else {
            // s.reply(`你回复了：${newS.getContent()}`)
            let code = newS.getContent()
            getToken(phone, code, formToken)
        }
    } else if (res.code == 1) {
        s.reply(res.msg)
    } else {
        s.reply('请稍后再试', res)
    }


}



function getToken(phone, code, formToken) {
    var { body, headers, status } = request({
        url: `https://bsapi.shmedia.tech/media-basic-port/api/app/auth/validate_code_login`,
        method: "post",
        headers: {
            'log-header': 'I am the log request header.',
            'deviceId': '10596',
            'siteId': '310113',
            'token': '',
            'Host': 'bsapi.shmedia.tech',
            'Connection': 'Keep-Alive',
            'User-Agent': 'okhttp/3.14.2',
            'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            "formToken": formToken,
            "mobile": phone,
            "validateCode": code,
            "orderBy": "release_desc",
            "requestType": "2",
            "siteId": "310113"
        }),
        allowredirects: false, //不禁止重定向
    })


    console.log(body)
    let res = JSON.parse(body)
    // console.log(res)
    console.log(headers)
    console.log(`=========`)
    console.log(headers.Token)

    if (res.code == 0) {
        s.reply(`您的token:\n${headers.Token}`)
        console.log(headers)


    } else if (res.code == 1) {
        s.reply(res.msg)
    } else {
        s.reply('请稍后再试', res)
    }
}



