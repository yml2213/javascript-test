// [rule: 京东扫码] 
// [rule: 京东扫码] 
// [author: yuwei]
// [create_at: 2023-01-29 14:08:00]
// [version: v1.0.0]
// [title: 京东扫码]
// [description: ]
// [platform: qq,wx,tg]
// [public: true]
// [price: 0.50]
//=======================================================
try {
    importJs("UserPaly.js")
} catch {
    sendText("未安装UserPaly，请前往应用市场搜索“UserPaly”并安装")
}
var GetImType = GetImType()
var qq = GetUserID();
var qun = GetChatID();
var tongzi = "YounWeriJD2_QR";
var BBK_Address = bucketGet(tongzi, "BBK_Address")
main();
function main() {
    var ispeizhi = bucketGet(tongzi, "IsPeiZhi");
    if (ispeizhi == "false" || ispeizhi == "") {    //是否第一次使用
        if (isAdmin()) {
            sendText("第一次使用本插件，请告知我你的BBK京东扫码登录地址即可，示例：http://123.123.123.123:2081");
            var msg = input(60000)
            if (msg == null || msg == "") {
                sendText("超时，60秒内未回复，退出。")
            } else if (msg == "q" || msg == "Q") {
                sendText("已退出会话。");
            } else {
                bucketSet(tongzi, "BBK_Address", msg)
                bucketSet(tongzi, "IsPeiZhi", "true")
                bucketSet(tongzi, "IsUserLog", "false")
                bucketSet(tongzi, "ULog", "0")
                sendText("配置成功")
            }
        } else {
            sendText("当前插件未初始化配置，请联系管理员");
        }
    } else {
        JD_QrCode();
    }
}
function JD_QrCode() {
    sendText("请使用手机京东App扫码，可保存到相册扫码,“Q”退出会话。")
    var date = new Date(timeFmt);
    var t = date.getTime();
    var img64 = ""
    var ck = "";
    request({
        url: BBK_Address + "/d/getQR?t=" + t,
        method: "get",//网络请求方法get,post,put,delete
        timeOut: 30000//单位为毫秒ms，也可以都小写timeout
    }, function (error, response, header, body) {
        b = JSON.parse(body);
        img64 = b.data.qr;
        var s = JSON.stringify(header);
        var ck = s.match(/usr_(\S*);/)[1];
        ck = "usr_" + ck;
        i = imageDownload(img64)
        sendImage(i["url"])
        GetStatus(ck)

    })
}
function GetStatus(ck) {
    try {
        var a = 0;
        var s = 0;
        var c = input(10000);
        while (s == 0) {
            if (c == "q" || c == "Q") {
                sendText("已退出")
                break;
            } else {
                let timeStamp = new Date().getTime();
                request({
                    url: BBK_Address + "/d/status?t=" + timeStamp,
                    method: "get",//网络请求方法get,post,put,delete
                    timeout: 20000,
                    headers: {
                        "cookie": ck,
                    },
                }, function (error, response, header, body) {
                    var bodyck = JSON.parse(body)
                    if (bodyck.code == "410") {
                        var IsUserLog = bucketGet(tongzi, "IsUserLog")
                        if (IsUserLog == true || IsUserLog == "true") {
                            var ULog = bucketGet(tongzi, "ULog")
                            if (ULog > 1) {
                                var Logs = UpdateLog(qq, ULog)
                                if (Logs == true) {
                                    jiemi(bodyck.data.wskey)
                                    s = 1;
                                }
                            } else {
                                sendText("未配置扣除Log次数")
                            }
                        } else {
                            jiemi(bodyck.data.wskey)
                            s = 1;
                        }
                    }
                    else if (bodyck.code == "500") {
                        sendText("出现问题，请检查配置")
                        notifyMasters("扫码登录出现问题，请检查配置~")
                        s = 1;
                    }
                    else if (bodyck.code == "202") {
                        sendText("您的账号存在风险,请验证后重新扫码")
                        var a = bodyck.errorMsg;
                        a = a.match(/href=\"(\S*)\" /)[1];
                        sendText(a)
                        s = 1;
                    }
                })
            }
            sleep(10000)
            a = a + 1;
            if (a == 5) {
                s = 1;
                sendText("未扫码，退出")
            }
        }
    } catch {
        sendText("出现问题，请检查配置")
        notifyMasters("扫码登录出现问题，请检查配置~")
    }
}
function jiemi(wskey) {
    var pin = wskey.match("(?<=pin=).*?(?=;)");
    var wskey2 = wskey.match("(?<=wskey=).*?(?=;)");
    request({
        url: BBK_Address + "/d/convert?pin=" + pin + "&wskey=" + wskey2 + "&token="+bucketGet(tongzi, "token"),
        method: "get",//网络请求方法get,post,put,delete
        timeout: 20000,
    }, function (error, response, header, body) {
        var a = JSON.parse(body)
        if (a.code == "200") {
            breakIn(a.data)
            sendText("扫码登录成功，每天自动做任务领京豆. 请关闭免密支fu")
        } else {
            sendText("登录失败，请尝试其他方法登录。例如发送微信扫码")
        }
    })
}