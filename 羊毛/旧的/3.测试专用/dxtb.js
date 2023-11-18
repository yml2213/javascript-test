// [rule: raw ([\s\S]*)]


/**
 * @version v1.0.0
 * @create_at 2023-10-28 
 * @rule raw ([\s\S]*)]
 * @priority 100
 * @title yml
 * @admin true
 * @description 群消息单向同步
 * @author yml
 */


// sender
const s = sender

var message = s.param(1)
var chatID = s.getChatId()
var platform = s.getPlatform()
var userID = s.getUserId()
var username = s.getUsername()

// var message = param(1)
// var chatID = GetChatID()
// var imType = ImType()
// var userID = +GetUserID()
// var username = GetUsername()
var spyGroups = [
    // { imType: "qq", groupCode: 100002 }, //QQ群
    // { imType: "tg", groupCode: -1001718225453 }, //TG群
    // { imType: "wx", groupCode: 100002 }, //WX群
]
var forwardGroups = [
    // { imType: "qq", groupCode: 100002 }, //QQ群
    // { imType: "tg", groupCode: -100002 }, //TG群
    { imType: "wx", groupCode: 19288048179 }, //WX群
]

function main() {
    if (["查询", "订阅"].indexOf(message) != -1) { //跳过一些命令
        Continue()
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
            var prefix = "来自" + imType.toUpperCase() + "[" + username + "]的消息:\n"
            for (var i = 0; i < forwardGroups.length; i++) {
                // if (spyGroups[i].imType == imType && chatID == spyGroups[i].groupCode) {
                //     continue
                // }
                forwardGroups[i]["content"] = prefix + message
                push(forwardGroups[i])
            }
        } else {
            Continue()
        }
    } else {
        Continue()
    }
}

main()