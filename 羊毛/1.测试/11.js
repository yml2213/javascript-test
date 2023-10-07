/**
* @author yml
* @version v1.0.0
* @create_at 2022-09-07 14:16:41
* @description 群消息单向同步，自己配置采集群（spyGroups）；转发群（forwardGroups）；disable选项 改为false即可食用
* @title 消息单向同步
* @platform qq wx tg pgm web
* @rule raw ([\s\S]*)
* @priority 100
* @disable false
* @admin false
* @public false
* @icon https://s3.bmp.ovh/imgs/2022/09/09/a5d38d08fc40a62c.png
*/


//sender
const s = sender
const sillyGirl = new SillyGirl()


var message = s.param(1)
var chatID = s.getChatId()
var imType = s.getPlatform()
var userID = s.getUserId()
var username = s.getUsername()

console.log(`${message},${chatID},${imType},${userID},${username}`)


var spyGroups = [ // 消息采集群
    // { imType: "qq", groupCode: 100002 }, //QQ群
    { imType: "wx", groupCode: 18435763800 }, //WX群
    // { imType: "wx", groupCode: 100002 }, //WX群
]
var forwardGroups = [ // 消息转发群
    // { imType: "qq", groupCode: 100002 }, //QQ群
    // { imType: "tg", groupCode: -100002 }, //TG群
    { imType: "wx", groupCode: 18092458654 }, //WX群-平凡
    { imType: "wx", groupCode: 19550248253 }, //WX群-家里人的京东群
    { imType: "wx", groupCode: 18031149683 }, //WX群-京东羊毛大群

]

function main() {
    if (["查询", "订阅"].indexOf(message) != -1) { //跳过一些命令
        s.continue()
        return
    }
    if (chatID) {
        var go = false
        for (var i = 0; i < spyGroups.length; i++) {
            if (spyGroups[i].imType == imType && chatID == spyGroups[i].groupCode) {
                go = true
                break
            }
        }
        if (go) {


            console.log(`================11===========`)
            var prefix = "来自" + imType.toUpperCase() + "[" + username + "]的消息:\n"
            for (let j = 0; j < forwardGroups.length; j++) {
                if (spyGroups[i].imType == imType && chatID == spyGroups[i].groupCode) {
                    s.continue()
                }
                forwardGroups[j]["content"] = prefix + message
                console.log(forwardGroups[j].content)

                console.log(forwardGroups[j])

                sillyGirl.push({
                    imType: "wx",
                    groupCode: "19550248253",
                    content: "teccc"
                })


            }
        } else {
            s.continue()
        }
    } else {
        s.continue()
    }
}

main()
