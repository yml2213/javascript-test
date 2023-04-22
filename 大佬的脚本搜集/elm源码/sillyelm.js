/**
 * @author 小余味
 * @description 🐒这个人很懒什么都没有留下。
 * @origin 小余味
 * @version v2.0.1
 * @create_at 2022-10-18 07:40:14
 * @title 饿了么
 * @public true
 * @rule [参数]饿了
 * @encrypt true
 * @public false
 */
 
const test = new Bucket("YounWeriElm");
const s = sender;
var qq = s.getUserId();
//var qq = "";
var isAdmin = s.isAdmin();
const nickname = s.param("参数")
var index = 1;
var nums5sec = "7b22617365727665723b32223a223965646534636336623932616430616266613137626236353561383164323334434e766176707347454b76667259614f31616e4a72414561447a49794d5451334e444d794e4467354d5441374d6a4330684f6e51426b4144227d";
main();
function main() {
    peizhijiance();
}
function peizhijiance() {
    var ispeizhi = test.get("peizhi");
    if (ispeizhi == "" || ispeizhi == null) {    //是否第一次使用
        var s = sender;
        s.reply("第一次使用本脚本，请稍等正在初始化配置");
        DeletePeiZhi();
        test.set("peizhi", "true");
        PzQlBianLiangName();
    } else {
        blackcheck();
    }
}
function InitializeQl() {
    var IsTrue = 0;
    var QlTongJson = test.get("QLS")
    var QlTongJsonParse = JSON.parse(QlTongJson);
    var QlTongNum = QlTongJsonParse.length;//青龙容器数量
    if (QlTongNum > 0) {
        // console.log(QlTongJson)
        for (i = 0; i < QlTongNum; i++) {
            qldizhi = QlTongJsonParse[i].host;
            qlclient_id = QlTongJsonParse[i].client_id;
            qlclient_secret = QlTongJsonParse[i].client_secret;
            var QlIsdisable = QlTongJsonParse[i].disable;
            if (!QlIsdisable) {
                qltoken(qldizhi, qlclient_id, qlclient_secret);
                var qlnums = qlselectelmnum();
                var qlnumjson = JSON.parse(qlnums)
                var QlRongQiRongLiang = test.get("QlRongQiRongLiang");
                if (qlnumjson.data.length <= QlRongQiRongLiang) {
                    i = 1000;
                }
                else {
                    IsTrue = IsTrue + 1;
                }
            }
        }
        if (IsTrue >= QlTongNum) {
            var s = sender;
            s.reply("当前可用容器余量不足，请联系管理员检查")
            return false;
        }
    } else {
        var s = sender;
        s.reply("当前可用容器不足，请联系管理员检查")
        return false;
    }
}
function ShouQuan(shouquanma) {
    var body = request({
        url: "https://sq.younweri.top/api/card_app/check",
        method: "post",
        body: {
            "appid": "1",
            "card": shouquanma,
        },
    })
    return body.body;
}
function DeletePeiZhi() {
    test.delete("RebotName");
    test.delete("PtShouQuanMa");
    test.delete("DxShouQuanMa");
    test.delete("QlRongQiRongLiang");
    test.delete("QlBianLiangName");
    test.delete("RebotIsImages");
    test.delete("peizhi");
    test.delete("XuanZeTong");
}
function PzQlBianLiangName() {//设置青龙变量名称
    var s = sender;
    s.reply("请在20秒告知我您需要设置的青龙变量名称，例如elmck或elmCookie(输入“q”随时退出会话。)");
    var newS = s.listen(20000)
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次配置。")
        DeletePeiZhi();
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话,当前配置已删除，请重新配置！");
            DeletePeiZhi();
        }
        else {
            var QlBianLiangName = newS.getContent();
            s.reply("设置成功，下面开始配置您的机器人名称");
            test.set("QlBianLiangName", QlBianLiangName);
            PzRebotName();
        }
    }
}
function PzRebotName() {
    var s = sender;
    s.reply("请在20秒告知我您需要设置的机器人名称(输入“q”随时退出会话。)");
    var newS = s.listen(20000)
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次配置。")
        DeletePeiZhi();
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话,当前配置已删除，请重新配置！");
            DeletePeiZhi();
        } else {
            var RebotName = newS.getContent();
            s.reply("设置成功，下面开始配置容器容量")
            test.set("RebotName", RebotName);
            PzQLS();
        }
    }
}
function PzQLS() {
    var s = sender;
    s.reply("请在20秒告知我您需要设置的青龙地址,不要带斜杠(输入“q”随时退出会话。)");
    var newS = s.listen(20000)
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次配置。")
        DeletePeiZhi();
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话,当前配置已删除，请重新配置！");
            DeletePeiZhi();
        } else {
            var QlAddress = newS.getContent();
            s.reply("请在20秒告知我您需要设置的青龙client_id(输入“q”随时退出会话。)");
            var newS = s.listen(20000)
            if (newS == null) {
                s.reply("超时，20秒内未回复，取消本次配置。")
                DeletePeiZhi();
            } else {
                if (newS.getContent() == "q" || newS.getContent() == "Q") {
                    newS.reply("已退出会话,当前配置已删除，请重新配置！");
                    DeletePeiZhi();
                } else {
                    var Qlclient_id = newS.getContent();
                    s.reply("请在20秒告知我您需要设置的青龙client_secret(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，取消本次配置。")
                        DeletePeiZhi();
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,当前配置已删除，请重新配置！");
                            DeletePeiZhi();
                        } else {
                            var Qlclient_secret = newS.getContent();
                            var values = "[{\"host\":\"" + QlAddress + "\",\"client_id\":\"" + Qlclient_id + "\",\"client_secret\":\"" + Qlclient_secret + "\"}]"
                            test.set("QLS", values)
                            var s = sender;
                            s.reply("青龙配置完成，下面开始配置青龙容器容量");
                            PzQlRongQiRongLiang();
                        }
                    }
                }
            }
        }
    }
}
function PzQlRongQiRongLiang() {
    var s = sender;
    s.reply("请在20秒告知我您需要设置的青龙容器容量，别输入错误，否则重新配置！(输入“q”随时退出会话。)");
    var newS = s.listen(20000)
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次配置。")
        DeletePeiZhi();
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话,当前配置已删除，请重新配置！");
            DeletePeiZhi();
        } else {
            var QlRongQiRongLiang = newS.getContent();
            s.reply("设置成功，下面开始配置是否开启机器人发送用户头像")
            test.set("QlRongQiRongLiang", QlRongQiRongLiang);
            PzRebotIsImages();
        }
    }
}
function PzRebotIsImages() {
    var s = sender;
    s.reply("请在20秒告知我机器人是否发送用户头像信息，true/false(输入“q”随时退出会话。)");
    var newS = s.listen(20000)
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次配置。")
        DeletePeiZhi();
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话,当前配置已删除，请重新配置！");
            DeletePeiZhi();
        } else {
            var RebotIsImages = newS.getContent();
            if (RebotIsImages == "true" || RebotIsImages == "false") {
                s.reply("设置成功，插件配置完成，尽情使用吧")
                test.set("RebotIsImages", RebotIsImages);
                PzHelDui();
            } else {
                s.reply("输入错误，机器人默认发送用户头像")
                test.set("RebotIsImages", "true");
                PzHelDui();
            }
        }
    }
}
function UerSillyGrilElmJs() {
    if (nickname == "拉黑") {
        if (isAdmin) {
            var s = sender;
            s.reply("请在告知我需要拉黑的用户ID(输入“q”随时退出会话。)")
            var newS = s.listen(20000)
            if (newS == null) {
                s.reply("超时，20秒内未回复，取消本次记录。")
            } else {
                if (newS.getContent() == "q" || newS.getContent() == "Q") {
                    newS.reply("已退出会话");
                } else {
                    blackset(newS.getContent());
                }
            }
        }
    }
    else if (nickname == "解黑") {
        if (isAdmin) {
            var s = sender;
            s.reply("请在告知我需要解黑的用户ID(输入“q”随时退出会话。)")
            var newS = s.listen(20000)
            if (newS == null) {
                s.reply("超时，20秒内未回复，取消本次记录。")
            } else {
                if (newS.getContent() == "q" || newS.getContent() == "Q") {
                    newS.reply("已退出会话");
                } else {
                    blackdelete(newS.getContent());
                }
            }
        }
    }
    else if (nickname == "管理") {
        if (isAdmin) {
            var s = sender;
            s.reply("饿了么管理菜单\n1.删除所有配置(慎用)\n2.修改普通功能授权码\n3.修改短信功能授权码\n4.修改机器人名称\n5.修改青龙容器容量\n6.修改青龙变量名称\n7.修改是否发送用户头像\n8.修改青龙配置\n发送“q”退出当前会话。")
            var newS = s.listen()
            if (newS == null) {
                s.reply("超时，20秒内未回复，退出当前会话。")
            } else {
                var num = newS.getContent();
                if (num == "q" || num == "Q") {
                    newS.reply("已退出会话");
                } else if (num == "1") {
                    var s = sender;
                    s.reply("已删除所有本插件配置");
                    DeletePeiZhi();
                }
                else if (num == "2") {
                    s.reply("已剔除授权码");
                   
                }
                else if (num == "3") {
                    s.reply("已剔除授权码");
                }
                else if (num == "4") {
                    s.reply("请在20秒告知我您修改的机器人新名称(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，默认不修改配置。")
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,默认不修改配置。");
                        } else {
                            var RebotName = newS.getContent();
                            var s = sender;
                            s.reply("已为您成功更新，当前机器人名称为:" + RebotName);
                            test.delete("RebotName");
                            test.set("RebotName", RebotName);
                        }
                    }
                }
                else if (num == "5") {
                    s.reply("请在20秒告知我新的青龙容器容量(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，默认不修改配置。")
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,默认不修改配置。");
                        } else {
                            var QlRongQiRongLiang = newS.getContent();
                            var s = sender;
                            s.reply("已为您成功更新，当前青龙容量为:" + QlRongQiRongLiang);
                            test.delete("QlRongQiRongLiang");
                            test.set("QlRongQiRongLiang", QlRongQiRongLiang);
                        }
                    }
                }
                else if (num == "6") {
                    s.reply("请在20秒告知我新的青龙变量名称(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，默认不修改配置。")
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,默认不修改配置。");
                        } else {
                            var QlBianLiangName = newS.getContent();
                            var s = sender;
                            s.reply("已为您成功更新，当前青龙变量名称为:" + QlBianLiangName);
                            test.delete("QlBianLiangName");
                            test.set("QlBianLiangName", QlBianLiangName);
                        }
                    }
                }
                else if (num == "7") {
                    s.reply("请在20秒告知我是否发送用户头像true/false(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，默认不修改配置。")
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,默认不修改配置。");
                        } else {
                            var RebotIsImages = newS.getContent();
                            if (RebotIsImages == "true" || RebotIsImages == "false") {
                                var s = sender;
                                s.reply("已为您成功更新，当前是否发送用户头像为:" + RebotIsImages);
                                test.delete("RebotIsImages");
                                test.set("RebotIsImages", RebotIsImages);
                            } else {
                                var s = sender;
                                s.reply("输入错误，默认发送用户头像");
                                test.delete("RebotIsImages");
                                test.set("RebotIsImages", "true");
                            }
                        }
                    }
                }
                else if (num == "8") {
                    var s = sender;
                    s.reply("请在20秒告知我您需要设置的青龙地址,不要带斜杠(输入“q”随时退出会话。)");
                    var newS = s.listen(20000)
                    if (newS == null) {
                        s.reply("超时，20秒内未回复，默认不修改配置。")
                    } else {
                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                            newS.reply("已退出会话,默认不修改配置。");
                        } else {
                            var QlAddress = newS.getContent();
                            s.reply("请在20秒告知我您需要设置的青龙client_id(输入“q”随时退出会话。)");
                            var newS = s.listen(20000)
                            if (newS == null) {
                                s.reply("超时，20秒内未回复，默认不修改配置。")
                            } else {
                                if (newS.getContent() == "q" || newS.getContent() == "Q") {
                                    newS.reply("已退出会话,默认不修改配置。");
                                } else {
                                    var Qlclient_id = newS.getContent();
                                    s.reply("请在20秒告知我您需要设置的青龙client_secret(输入“q”随时退出会话。)");
                                    var newS = s.listen(20000)
                                    if (newS == null) {
                                        s.reply("超时，20秒内未回复，默认不修改配置。")
                                    } else {
                                        if (newS.getContent() == "q" || newS.getContent() == "Q") {
                                            newS.reply("已退出会话,未作修改！");
                                        } else {
                                            var Qlclient_secret = newS.getContent();
                                            var values = "[{\"host\":" + QlAddress + ",\"client_id\":" + Qlclient_id + ",\"client_secret\":" + Qlclient_secret + "}]"
                                            test.delete("QLS")
                                            test.set("QLS", values)
                                            s.reply("青龙配置已修改");
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    var s = sender;
                    s.reply("输入错误，已退出会话。");
                }
            }
        }
    }
    else if (nickname == "查询" || nickname == "记录") {
            if (nickname == "查询") {
                SelectElm();
            }
            if (nickname == "记录") {
                var isInitializeQl = InitializeQl();
                if (isInitializeQl == "false" || isInitializeQl == false) {
                    return;
                } else {
                    InsertElm();
                }
            }
    }
}
function InsertElm() {
    var s = sender;
    s.reply(test.get("RebotName") + "为您服务,请在20秒内发送您的Cookie(输入“q”随时退出会话。)")
    var newS = s.listen(20000)//返回一个sender对象，超时后返回null
    if (newS == null) {
        s.reply("超时，20秒内未回复，取消本次记录。")
    } else {
        if (newS.getContent() == "q" || newS.getContent() == "Q") {
            newS.reply("已退出会话");
        } else {
            try {
                var ck = newS.getContent();
                const messageId = newS.getMessageId();
                s.recallMessage(messageId);
                var elmapibody = elmapi(ck);
                //  console.log(userjson)
                if (elmapibody.indexOf("未登录") >= 0) {
                    s.reply("ck已经失效或有问题，请检查以后在发送~");
                } else {
                    var userjson = JSON.parse(elmapibody);
                    var userid = userjson.user_id;
                    var username = userjson.username;
                    var qlinsertbody = qlinsert(ck, userid, username)
                    var qlinsertbodyjson = JSON.parse(qlinsertbody)
                    if (qlinsertbodyjson.code == "200") {
                        s.reply('上车成功，正在为您查询账号信息~');
                        XinXiZhanShi(ck);
                        //   s.reply("0復制这个 2:/＄dcTj22f＄~.饿了么App【快來領外賣紅包，最高20元，人人都有哦~】");
                    } else {
                        s.reply("上车失败，请检查配置");
                    }
                }
            }
            catch {
                var s = sender;
                s.reply("上车失败，请检查CK是否正确");
            }
        }
    }
}
function SelectElm() {
    s.reply(test.get("RebotName") + "正在为您查询本地所有饿了么资产~")
    var nums = 1;
    var QlTongJson = test.get("QLS");
    var QlTongJsonParse = JSON.parse(QlTongJson);
    var QlTongNum = QlTongJsonParse.length;//青龙容器数量   
    for (i = 0; i < QlTongNum; i++) {
        qldizhi = QlTongJsonParse[i].host;
        qlclient_id = QlTongJsonParse[i].client_id;
        qlclient_secret = QlTongJsonParse[i].client_secret;
        var QlIsdisable = QlTongJsonParse[i].disable;
        if (!QlIsdisable) {
            qltoken(qldizhi, qlclient_id, qlclient_secret);
            var qlselectbody = qlselect(qq);
            var qlckjson = JSON.parse(qlselectbody)
            //  console.log(qlselectbody)
            if (qlckjson.data == "") {
                nums = nums + 1;
            } else {
                for (var key in qlckjson.data) {
                    if (qlckjson.data[key].name == test.get("QlBianLiangName")) {
                        var ck = qlckjson.data[key].value;
                        var id = qlckjson.data[key].id;
                        var remarks = qlckjson.data[key].remarks;
                        remarks = remarks.split("&")[1];
                        var elmapibody = elmapi(ck)
                        var xx = JSON.parse(elmapibody);
                        if (xx.message == "未登录" || xx.message == "未知错误") {
                            s.reply("账号 " + remarks + " 已过期,请重新获取Ck,系统已删除Ck");
                            qldelete(id);
                        } else {
                            XinXiZhanShi(ck);
                        }
                    }
                }
            }
        }
    }
    if (nums > QlTongNum) {
        s.reply(test.get("RebotName") + "提醒您：无本地饿了么账号信息，请您检查是否已上车~");
    }
}
function XinXiZhanShi(ck) {
    var elmapibody = elmapi(ck)
    var xx = JSON.parse(elmapibody);
    var elmxqapibody = elmxqapi(ck);
    var dzxx = JSON.parse(elmxqapibody);
    var d = new Date();
    var nf = d.getFullYear().toString();;
    var yf = d.getMonth() + 1;
    var rf = d.getDate();
    if (rf < 10) {
        rf = "0" + rf;
    }
    var rq = nf + yf;
    var jinridouzi = 0;
    for (var zh in dzxx.records) {
        if (dzxx.records[zh].createdTime.indexOf(nf + "-" + yf + "-" + rf) >= 0) {
            if (dzxx.records[zh].optType == "1") {
                jinridouzi = jinridouzi + dzxx.records[zh].count;
            } else {
                inridouzi = jinridouzi + 0;
            }
        }
    }
    var benyuedouzi = "";
    try {
        benyuedouzi = dzxx.monthAccountInfo[rq].plusCount
    } catch {
        benyuedouzi = "查询异常，请去APP领几个豆子再来查询";
    }
    var zongongdouzi = dzxx.peaCount;
    var pinimg = xx.avatar;
    var userimg = "https://cube.elemecdn.com/" + pinimg.substr(0, 1) + "/" + pinimg.substr(1, 2) + "/" + pinimg.slice(3) + ".jpeg";
    var userid = xx.user_id;
    var username = xx.username;
    var ckzt = "";
    if (xx.is_mobile_valid == true) {
        ckzt = "Cookie有效";
    } else {
        ckzt = "Cookie失效";
    }
    var bbfbody = elmbbfapi(ck);
    var ye = JSON.parse(bbfbody);
    var bbf = ye.data.totalAvailableAmount / 100;
    var isImages = test.get("RebotIsImages")
    if (isImages == true || isImages == "true") {
        s.reply(image(userimg) + "序号:" + index + "\n" + "ID：" + qq + "\n" + "昵称：" + username + "\n" + "饿了么ID：" + userid + "\n" + "Cookie状态：" + ckzt + "\n" + "当前豆豆：" + zongongdouzi + "\n" + "今日收入：" + jinridouzi + "\n" + "本月收入：" + benyuedouzi + "\n" + "笔笔返余额：" + bbf);
    } else {
        s.reply("序号:" + index + "\n" + "ID：" + qq + "\n" + "昵称：" + username + "\n" + "饿了么ID：" + userid + "\n" + "Cookie状态：" + ckzt + "\n" + "当前豆豆：" + zongongdouzi + "\n" + "今日收入：" + jinridouzi + "\n" + "本月收入：" + benyuedouzi + "\n" + "笔笔返余额：" + bbf);
    }
    index = index + 1;
}
var qldizhi = "";
var qlclient_id = "";
var qlclient_secret = "";
var qltokens = "";
var cookie2 = "";
var _tb_token = "";
var _csrf_token = "";
var umidToken = "";
var hsiz = "";
var xsrftoken = "";
var t = "";
//请求饿了么个人信息接口方法
function elmapi(ck) {
    var { body, headers, status } = request({
        url: "https://restapi.ele.me/eus/v5/user_detail",
        method: "get",
        headers: {
            "cookie": ck,
        },
    })
    return body;
}
//请求饿了么豆子详情方法
function elmxqapi(ck) {
    var { body, headers, status } = request({
        url: "https://h5.ele.me/restapi/svip_biz/v1/supervip/foodie/records?offset=0&limit=100&longitude=116.397128&latitude=39.916527",
        method: "get",
        headers: {
            "cookie": ck,
        },
    })
    return body
}
//饿了么笔笔返余额方法
function elmbbfapi(ck) {
    var { body, headers, status } = request({
        url: "https://wallet.ele.me/api/storedcard/queryBalanceBycardType?cardType=platform",
        method: "get",
        headers: {
            "cookie": ck,
        },
    })
    return body;
}
//请求青龙面板返回token方法
function qltoken(qldizhi, qlclient_id, qlclient_secret) {
    var { body, headers, status } = request({
        url: qldizhi + "/open/auth/token?client_id=" + qlclient_id + "&client_secret=" + qlclient_secret,
        method: "get",
    });
    var fhtoken = JSON.parse(body);
    qltokens = fhtoken.data.token;
}
//请求青龙面板查询方法
function qlselect(qq) {
    var { body, headers, status } = request({
        url: qldizhi + "/open/envs?searchValue=" + qq,
        method: "get",
        headers: {
            "Authorization": "Bearer " + qltokens,
        }
    });
    return body;
}
//获取当前容器饿了么CK容量
function qlselectelmnum() {
    var { body, headers, status } = request({
        url: qldizhi + "/open/envs?searchValue=" + test.get("QlBianLiangName"),
        method: "get",
        headers: {
            "Authorization": "Bearer " + qltokens,
        }
    });

    return body;
}
//请求青龙面板更新方法
function qlupdate(ck, id, userid, username) {
    var { body, headers, status } = request({
        url: qldizhi + "/open/envs",
        method: "put",
        body: {
            "name": test.get("QlBianLiangName"),
            "value": ck,
            "id": id,
            "remarks": qq + "@" + userid + "&" + username,
        },
        headers: {
            "Authorization": "Bearer " + qltokens,
        }
    });
    return body;
}
//青龙面板添加方法
function qlinsert(ck, userid, username) {
    var zhanghao = qq + "@" + userid + "&" + username;
    var nums = 1;
    var QlTongJson = test.get("QLS");
    var QlTongJsonParse = JSON.parse(QlTongJson);
    var QlTongNum = QlTongJsonParse.length;//青龙容器数量   
    for (i = 0; i < QlTongNum; i++) {
        qldizhi = QlTongJsonParse[i].host;
        qlclient_id = QlTongJsonParse[i].client_id;
        qlclient_secret = QlTongJsonParse[i].client_secret;
        var QlIsdisable = QlTongJsonParse[i].disable;
        if (!QlIsdisable) {
            qltoken(qldizhi, qlclient_id, qlclient_secret);
            var qlselectbody = qlselect(zhanghao);
            var qlckjson = JSON.parse(qlselectbody)
            //  console.log(qlselectbody)
            if (qlckjson.data.length == "0") {
                nums = nums + 1;
            } else {
                //    console.log("执行更新")
                var aa = qlupdate(ck, qlckjson.data[0].id, userid, username)
                return aa;
            }
        }
    }
    if (nums > QlTongNum) {
        //执行添加
        //   console.log("执行添加")
        var { body, headers, status } = request({
            url: qldizhi + "/open/envs",
            method: "post",
            body: [{
                "name": test.get("QlBianLiangName"),
                "value": ck,
                "remarks": qq + "@" + userid + "&" + username,
            }],
            headers: {
                "Authorization": "Bearer " + qltokens,
            }
        });
        return body;
    }
}
//青龙面板删除方法
function qldelete(id) {
    var body = request({
        url: qldizhi + "/open/envs",
        method: "delete",
        body: [id],
        headers: {
            "Authorization": "Bearer " + qltokens,
        }
    });
}
function blackcheck() {//拉黑查询
    var IsBlack = test.get(qq)
    if (IsBlack == "" || IsBlack == null) {
        UerSillyGrilElmJs();
    }
    else {
        var s = sender;
        s.reply("黑名单用户，请联系管理员解除！")
    }
}
function blackset(laheiid) {//拉黑
    var blackid = laheiid;
    var tip = "true"
    test.set(blackid, tip)
    var s = sender;
    s.reply(RebotName + "提醒您：用户：" + blackid + "，已被拉黑。")

}
function blackdelete(jieheiid) {//解黑

    var blackid = jieheiid;
    test.delete(blackid)
    var s = sender;
    s.reply(RebotName + "提醒您：用户：" + blackid + "，已被仁慈的主人解除了拉黑！")
}