/**
 * @version v1.0.0
 * @create_at 2023-06-17 09:52:53
 * @rule 爱快重拨
 * @priority 100
 * @title yml
 * @admin true
 * @description 爱快重拨-傻妞插件
 * @author yml
 */


// sender
const s = sender

// 抓包iKuai得到的登录body
var login = {
    "username": "admin",
    "passwd": "f2078a935856aa634ebf150090f919c7",
    "pass": "c2FsdF8xMW1hcnM2Mjc3",
    "remember_password": false
}
// iKuai的ip地址
var iphost = "http://192.168.124.2"
// 不要动
var msg = s.getContent()
var cookie = ""
s.reply("完了 芭比Q了 重拨吧~")


function pppoe() {
    s.reply("开始重拨了鸭...")
    var url = iphost + "/Action/call"
    var body = {
        "param": {
            "id": 1
        },
        "action": "link_pppoe_reconnect",
        "func_name": "wan"
    }
    var down = post(url, body)
    for (var x = 0; x < 5; x++) {
        if (down.ErrMsg == "Success") {
            var stop = "线路重启成功"
            break
        } else {
            var stop = "线路重启失败"
            var down = post(url, body)
        }
    }
    s.reply(stop)
}

function check_ip() {
    s.reply("开始查询ip...")
    var url = iphost + "/Action/call"
    var body = { "func_name": "wan", "action": "show", "param": { "id": "1", "TYPE": "support_wisp,total,data,lte_antenna_support" } }
    var down = post(url, body)
    if (down.Result = 30000) {
        var ip_ = down.Data.data[0].pppoe_ip_addr
        s.reply(`当前ip: ${ip_}`)
    } else {
        s.reply(`查询失败`)
    }
}


function main() {
    var url = iphost + "/Action/login"
    request({
        "url": url,
        "method": "post",
        "dataType": "json",
        "body": JSON.stringify(login)
    }, function (error, response, body) {
        var content = response.headers["Set-Cookie"]
        var pattern = /sess_key=(.*);\s/
        cookie = pattern.exec(content) + "username=" + login.username + "; login=1"
    })
    check_ip()
    pppoe()
}


function post(url, body) {
    var jsons = request({
        "url": url,
        "method": "post",
        "dataType": "json",
        "headers": {
            "Cookie": cookie
        },
        "body": JSON.stringify(body)
    })
    return jsons
}
main()