// [rule: 登录] 
// [rule: 登陆] 
// [author: yuwei]
// [create_at: 2023-01-29 14:08:00]
// [version: v1.0.1]
// [title: 萝卜登录]
// [description: 本插件需使用萝卜JD面板，没有面板的请勿使用”]
// [platform: qq,wx,tg]
// [public: true]
// [price: 0.50]
//=======================================================

var GetImType = GetImType()
var qq = GetUserID();
var qun = GetChatID();
var isAdmin = isAdmin();
var tongzi = "YounWeriJD_LB";
var LuoBo_Address = bucketGet(tongzi, "LuoBo_Address")
sendText("请发送“微信扫码”或者“京东扫码”即可")
function main() {
    var ispeizhi = bucketGet(tongzi, "IsPeiZhi");
    if (ispeizhi == "false" || ispeizhi == "") {    //是否第一次使用
        if (isAdmin) {
            sendText("第一次使用本插件，请告知我你的萝卜京东面板地址即可，请把萝卜面板青龙配置修改成错误的，否则CK会重复记录，示例：http://萝卜面板地址:端口/");
            var msg = input(60000)
            if (msg == null || msg == "") {
                sendText("超时，60秒内未回复，退出。")
            } else if (msg == "q" || msg == "Q") {
                sendText("已退出会话。");
            } else {
                bucketSet(tongzi, "LuoBo_Address", msg)
                bucketSet(tongzi, "IsPeiZhi", "true")
                sendText("配置成功")
            }
        } else {
            sendText("当前插件未初始化配置，请联系管理员");
        }
    } else {
        JD_QrCode();
    }
}
function ShuRu() {
    var msg = input(60000, 6000)
    if (msg == null) {
        sendText("超时，60秒内未回复，取消本次配置。")
        return false
    } else if (msg == "q" || msg == "Q") {
        sendText("已退出会话");
        return false
    } else {
        return msg;
    }

}
function JD_QrCode() {
    sendText("请告知我您的11位手机号码。")
    var pcode = ShuRu();
    if (pcode == false || pcode == "false") {
        return
    } else {
        request({
            url: LuoBo_Address + "api/SendSMS",
            method: "post",//网络请求方法get,post,put,delete
            timeOut: 30000,//单位为毫秒ms，也可以都小写timeout
            body: { "Phone": pcode, "qlkey": 1 }
        }, function (error, response, header, body) {
            var r1 = JSON.parse(body);
            if (r1.success == "true" || r1.success == true) {
                sendText("请告知我你收到的6位验证码")
                var sms = ShuRu();
                if (sms == false || sms == "false") {
                    return
                } else {
                    request({
                        url: LuoBo_Address + "api/VerifyCode",
                        method: "post",//网络请求方法get,post,put,delete
                        timeOut: 30000,//单位为毫秒ms，也可以都小写timeout
                        body: { "Phone": pcode, "QQ": "", "qlkey": 1, "Code": sms }
                    }, function (error, response, header, body) {
                        var r2 = JSON.parse(body)
                        if (r2.success == "true" || r2.success == true) {
                            if (r2.data.qlid == pcode && r2.data.nickname != "") {
                                request({
                                    url: LuoBo_Address + "api/User?qlid=" + pcode + "&qlkey=undefined",
                                    method: "get",//网络请求方法get,post,put,delete
                                }, function (error, response, header, body) {
                                    var r3 = JSON.parse(body)
                                    if (r3.success == "true" || r3.success == true) {
                                        breakIn(r3.data.ck)
                                        sendText("登录成功，发送查询即可")
                                    }
                                })
                            } else {
                                sendText(r2.message)
                            }
                        } else {
                            sendText(r2.message)
                        }
                    })
                }
            } else {
                sendText(r1.message)
            }
        })
    }
}