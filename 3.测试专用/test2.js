/*
@蛋炒饭
APP：番茄免费小说
完成：签到、签到翻倍、开宝箱、宝箱翻倍、看广告视频、领取三餐奖励、三餐奖励翻倍、领取阅读时长奖励
变量名：fqmfxsck
安卓抓包：https://i-hl.snssdk.com/luckycat开头的，在cookie里面找到sessionid，在url里面找到iid和device_id，将sessionid#iid#device_id填入变量，多账号@隔开。
苹果抓包：https://i.snssdk.com/开头的，在cookie里面找到sessionid，在url里面找到iid和device_id，将sessionid#iid#device_id填入变量，多账号@隔开。
区别：苹果部分任务是没有的，做不了。安卓比较全
定时：18 8-22 * * *
*/
NAME = `番茄免费小说` //名字
VALY = ['fqmfxsck'] //变量名
LOGS = 0 //1开日志，0关闭
CK = ''
var userList = []
nowhour = Math.round(new Date().getHours()).toString()
class Bar {
    constructor(str) {
        this.p = str.split('#')[0]
        this.iid = str.split('#')[1]
        this.deviceid = str.split('#')[2]
        this.logs = true
    }
    //用户信息
    async userinfo() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let datas = await task('get', `https://api5-normal-hl.fqnovel.com/reading/user/info/v/?check_idfa=false&code=0&ac=wifi&channel=wandoujia&aid=1967&app_name=novelapp&device_platform=android&ssmix=a&device_brand=Xiaomi&language=zh&os_api=30&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1`, headers)
        if (datas.code == 0) {
            this.name = datas.data.user_name
            console.log(`【${this.name}】登录成功`)
            this.logs = true
        } else {
            this.log = false
        }
    }
    //任务列表
    async tasklist() {
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let datas = await task('get', `https://i-hl.snssdk.com/luckycat/novel/v2/task/page?scene=act_goldenmonth&act_version=1&_request_from=web&manifest_version_code=330&gender=0&comment_tag_c=3&luckycat_version_code=300026&language=zh&resolution=1440*3007&update_version_code=30032&status_bar_height=39&os_api=30&dpi=560&oaid=77af036e6114fd65&ac=wifi&os_version=11&version_code=330&vip_state=0&category_style=1&app_name=novelapp&luckycat_version_name=3.3.0&version_name=3.3.0.32&new_bookshelf=false&device_brand=Xiaomi&ssmix=a&device_platform=android&aid=1967`, headers)
        if (datas.err_no == 0) {
            for (let list of datas.data.task_list_v2) {
                if (list.name == '看广告赚金币' && list.done_percent < 100) {
                    await this.viewvideo()
                } else if (list.profit_desc == '吃饭补贴' && list.done_percent < 100) {
                    if (nowhour >= 5 && nowhour <= 9) {
                        this.meal = `{"meal_type":0}`
                        await this.eat()
                    } else if (nowhour >= 11 && nowhour <= 14) {
                        this.meal = `{"meal_type":1}`
                        await this.eat()
                    } else if (nowhour >= 17 && nowhour <= 20) {
                        this.meal = `{"meal_type":2}`
                        await this.eat()
                    } else if (nowhour >= 21 && nowhour <= 24) {
                        this.meal = `{"meal_type":3}`
                        await this.eat()
                    }
                } else if (list.profit_desc == '签到' && list.done_percent < 100) {
                    await this.signin()
                } else if (list.profit_desc == '阅读5分钟' && list.done_percent < 100) {
                    this.ydsc = `5m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读2分钟' && list.done_percent < 100) {
                    this.ydsc = `2m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读10分钟' && list.done_percent < 100) {
                    this.ydsc = `10m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读30分钟' && list.done_percent < 100) {
                    this.ydsc = `30m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读60分钟' && list.done_percent < 100) {
                    this.ydsc = `60m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读120分钟' && list.done_percent < 100) {
                    this.ydsc = `120m`
                    await this.readtime()
                } else if (list.profit_desc == '阅读180分钟' && list.done_percent < 100) {
                    this.ydsc = `180m`
                    await this.readtime()
                }
            }
        } else {
            console.log(`【${this.name}】未获取到任务列表，请稍后重试`)
        }
    }
    //开宝箱
    async openbox() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/treasure_task?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】开宝箱成功，获得${datas.data.amount}金币`)
            await wait(RT(20000, 30000))
            await this.boxvideo()
        } else {
            console.log(`【${this.name}】 开宝箱结果${datas.err_tips}`)
        }
    }
    //看宝箱视频
    async boxvideo() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{"from":"gold_coin_reward_dialog_open_treasure"}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_treasure_box?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】看宝箱视频成功，获得${datas.data.amount}金币`)
        } else {
            console.log(`【${this.name}】看宝箱视频结果${datas.err_tips}`)
        }
    }
    //看视频
    async viewvideo() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{"from":"task_list"}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/excitation_ad?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】看视频成功，获得${datas.data.amount}金币`)
            await wait(RT(20000, 30000))
        } else {
            console.log(`【${this.name}】 看视频结果${datas.err_tips}`)
        }
    }
    //领取吃饭补贴
    async eat() {
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/meal?_request_from=web&new_bookshelf=false&ac=wifi&aid=1967&app_name=novelapp&version_code=300&version_name=3.0.0.32&device_platform=android&ssmix=a&device_brand=Xiaomi&language=zh&os_api=30&os_version=11&openudid=c1ad0d7fd6238e3a&manifest_version_code=300&resolution=1440*3007&dpi=560&update_version_code=30032&_rticket=1675348202727&gender=0&comment_tag_c=3&vip_state=0&category_style=1`, headers, this.meal)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】领取吃饭补贴成功，获得${datas.data.amount}金币`)
            await wait(RT(20000, 30000))
            await this.eatvideo()
        } else {
            console.log(`【${this.name}】领取吃饭补贴结果${datas.err_tips}`)
        }
    }
    //看吃饭补贴视频
    async eatvideo() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{"from":"gold_coin_reward_dialog_open_treasure"}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_meal?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】看吃饭补贴视频成功，获得${datas.data.amount}金币`)
        } else {
            console.log(`【${this.name}】看吃饭补贴视频结果${datas.err_tips}`)
        }
    }
    //签到
    async signin() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{"from":"gold_coin_reward_dialog_open_treasure"}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/sign_in?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】签到成功，获得${datas.data.amount}金币`)
            await this.signinvideo()
        } else {
            console.log(`【${this.name}】领取签到奖励结果${datas.err_tips}`)
        }
    }
    //领取签到视频奖励
    async signinvideo() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{"from":"gold_coin_reward_dialog_open_treasure"}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/excitation_ad_signin?aid=1967&ssmix=a&os_api=30&os_version=11&manifest_version_code=340&update_version_code=34032&_rticket=${ts}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&luckycat_version_name=3.0.0-rc.33&luckycat_version_code=300033&status_bar_height=39&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】看签到激励视频成功，获得${datas.data.amount}金币`)
        } else {
            console.log(`【${this.name}】看签到激励视频结果${datas.err_tips}`)
        }
    }
    //阅读时长奖励
    async readtime() {
        let ts = times(13)
        let headers = {
            'cookie': `uid_tt=${this.p}`,
            'cookie': `sid_tt=${this.p}`,
            'cookie': `sessionid=${this.p}`,
            'cookie': `sessionid_ss=${this.p}`,
            'accept': `application/json; charset=utf-8`,
        }
        let body = `{}`
        let datas = await task('post', `https://i-hl.snssdk.com/luckycat/novel/v1/task/done/daily_read_${this.ydsc}?iid=${this.iid}&device_id=${this.deviceid}&ac=wifi&mac_address=4C%3AF2%3A02%3AEF%3AA0%3A9E&channel=wandoujia&aid=1967&app_name=novelapp&version_code=330&version_name=3.3.0.32&device_platform=android&ssmix=a&device_type=M2011K2C&device_brand=Xiaomi&language=zh&os_api=30&os_version=11&openudid=c1ad0d7fd6238e3a&manifest_version_code=330&resolution=1440*3007&dpi=560&update_version_code=33032&_rticket=${ts}&_rticket=${ts + 35000000}&gender=0&comment_tag_c=3&vip_state=0&category_style=1&oaid=77af036e6114fd65&cdid=43af445a-a648-4f28-8733-d5617fdd29ff&act_token=oCvSOY00GRzjTFctkMV_wtlVijvJyt3yVWjJHVShtsXQmtEcg4KO7dJaKHooUrrKWsWavJOCLpa8t4DIzzTsoA&act_hash=04f383e94ebfb3eee81705688cc763bc&cookie_base=iYGhFYBG-xG3baX_PR2oE41vZCjeqA-JVmIUW8akhVBs49zynK-RnWXpc0cOmemXy8rsn1mJu9zGYdWatWigGQ&cookie_data=VO_f7SpGnWp4H2KArTYxUQ&luckycat_version_name=3.0.0-rc.26&luckycat_version_code=300026&status_bar_height=39&ip=192.168.0.117&new_bookshelf=true`, headers, body)
        if (datas.err_no == 0) {
            console.log(`【${this.name}】模拟阅读${this.ydsc}成功，获得${datas.data.amount}金币`)
        } else {
            console.log(`【${this.name}】模拟阅读${this.ydsc}结果${datas.err_tips}`)
        }
    }


} !(async () => {
    console.log(`蛋炒饭美食交流群：https://t.me/+xjTie4yvzm83OTI9`)
    console.log(NAME); checkEnv()
    for (let user of userList) {
        await user.userinfo()
    }
    let validUserList = userList.filter(x => x.logs == true)
    if (validUserList.length == 0) {
        console.log(`${NAME} 登录失败，检查你的cookie`)
        return
    }
    for (let user of validUserList) {
        await user.tasklist()
        await user.openbox()
    }





})()
    .catch(e => {
        console.log(e)
    })
    .finally(() => {
        //$.done()
    })
//取X到Y之间随机整数
function RT(X, Y) {
    return Math.round(Math.random() * (Y - X) + X)
}
//当前13位时间戳
function times(s) {
    if (s == 10) {
        let TS = Math.round(new Date().getTime() / 1000).toString()
        return TS
    } else {
        let TS = new Date().getTime()
        return TS
    }
}
//运行模块 get post put delete patch head options
async function task(method, taskurl, taskheader, taskbody) {
    if (method == 'delete') {
        method = method.toUpperCase()
    } else {
        method = method
    }
    const request = require('request')
    if (method == 'post') {
        delete taskheader['content-type']
        delete taskheader['Content-type']
        delete taskheader['content-Type']
        if (safeGet(taskbody)) {
            taskheader['Content-Type'] = 'application/json;charset=UTF-8'
        } else {
            taskheader['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (taskbody) {
            taskheader['Content-Length'] = lengthInUtf8Bytes(taskbody)
        }
    }
    taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
    if (method.indexOf('T') < 0) {
        var httpget = {
            url: taskurl,
            headers: taskheader,
            body: taskbody,
        }
    } else {
        var httpget = {
            url: taskurl,
            headers: taskheader,
            form: JSON.parse(taskbody),
        }
    }
    // console.log(httpget);
    return new Promise(async resolve => {
        request[method.toLowerCase()](httpget, (err, response, data) => {
            try {
                if (LOGS == 1) {
                    console.log(`==================请求==================`)
                    console.log(httpget)
                    console.log(`==================返回==================`)
                    console.log(JSON.parse(data))
                }
            } catch (e) {
            } finally {
                if (!err) {
                    if (safeGet(data)) {
                        data = JSON.parse(data)
                    } else {
                        data = data
                    }
                } else {
                    data = taskurl + '   API请求失败，请检查网络重试\n' + err
                }
                return resolve(data)
            }
        })
    })
}

//随机数
function SJS(e) {
    e = e || 32
    var t = '1234567890',
        a = t.length,
        n = ''
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
}
function SJSxx(e) {
    e = e || 32
    var t = 'abcdefghijklmnopqrstuvwxyz1234567890',
        a = t.length,
        n = ''
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a))
    return n
}
//数据检查
function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == 'object') {
            return true
        }
    } catch (e) {
        return false
    }
}
//body长度
function lengthInUtf8Bytes(str) {
    let m = encodeURIComponent(str).match(/%[89ABab]/g)
    return str.length + (m ? m.length : 0)
}
//变量检查
async function checkEnv() {
    let ckStr = process.env[VALY] || CK
    let userCount = 0
    if (ckStr) {
        if (ckStr.indexOf('@')) {
            console.log(`\n您选择的是使用 '@' 分割`)
            for (let userCookies of ckStr.split('@').filter(x => !!x)) {
                userList.push(new Bar(userCookies))
            }
        } else if (ckStr.indexOf('\n')) {
            console.log(`\n您选择的是使用 '换行' 分割`)
            for (let userCookies of ckStr.split('\n').filter(x => !!x)) {
                userList.push(new Bar(userCookies))
            }
        }

        userCount = userList.length
    } else {
        console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
    }
    console.log(`共找到${userCount}个账号`)
    return userList
}

//延迟
function wait(t) {
    return new Promise(e => setTimeout(e, t))
}
//base64
function stringToBase64(str) {
    var base64Str = Buffer.from(str).toString('base64')
    return base64Str
}
//AES/DES加解密
function AESEncrypt(method, mode, padding, data, key, iv) {
    const CryptoJS = require('crypto-js')
    const datas = CryptoJS.enc.Utf8.parse(data)
    const IV = CryptoJS.enc.Utf8.parse(iv)
    const KEY = CryptoJS.enc.Utf8.parse(key)
    const encrypted = CryptoJS[method].encrypt(datas, KEY, {
        iv: IV,
        mode: CryptoJS.mode[mode],
        padding: CryptoJS.pad[padding],
    })
    return encrypted.toString()
}
function AESDecrypt(method, mode, padding, datas, key, iv) {
    const CryptoJS = require('crypto-js')
    const IV = CryptoJS.enc.Utf8.parse(iv)
    const KEY = CryptoJS.enc.Utf8.parse(key)
    const decrypt = CryptoJS[method].decrypt(datas, KEY, {
        iv: IV,
        mode: CryptoJS.mode[mode],
        padding: CryptoJS.pad[padding],
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
}
//RSA加密
function RSA(msg, Key) {
    //npm install node-rsa
    const NodeRSA = require('node-rsa')
    let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
    nodersa.setOptions({ encryptionScheme: 'pkcs1' })
    return nodersa.encrypt(msg, 'base64', 'utf8')
}
//SHA1
function SHA1_Encrypt(word) {
    return CryptoJS.SHA1(word).toString()
}
//SHA256
function SHA256(n) {
    const r = 8,
        t = 0
    function o(n, r) {
        const t = (65535 & n) + (65535 & r)
        return (((n >> 16) + (r >> 16) + (t >> 16)) << 16) | (65535 & t)
    }
    function e(n, r) {
        return (n >>> r) | (n << (32 - r))
    }
    function u(n, r) {
        return n >>> r
    }
    function c(n, r, t) {
        return (n & r) ^ (~n & t)
    }
    function f(n, r, t) {
        return (n & r) ^ (n & t) ^ (r & t)
    }
    function i(n) {
        return e(n, 2) ^ e(n, 13) ^ e(n, 22)
    }
    function h(n) {
        return e(n, 6) ^ e(n, 11) ^ e(n, 25)
    }
    function C(n) {
        return e(n, 7) ^ e(n, 18) ^ u(n, 3)
    }
    return (function (n) {
        const r = t ? '0123456789ABCDEF' : '0123456789abcdef'
        let o = ''
        for (let t = 0; t < 4 * n.length; t++) o += r.charAt((n[t >> 2] >> (8 * (3 - (t % 4)) + 4)) & 15) + r.charAt((n[t >> 2] >> (8 * (3 - (t % 4)))) & 15)
        return o
    })(
        (function (n, r) {
            const t = [
                1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921,
                2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298,
            ],
                a = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                g = new Array(64)
            let l, d, A, S, m, s, b, p, v, w, y, B
            for (n[r >> 5] |= 128 << (24 - (r % 32)), n[15 + (((r + 64) >> 9) << 4)] = r, v = 0; v < n.length; v += 16) {
                for (l = a[0], d = a[1], A = a[2], S = a[3], m = a[4], s = a[5], b = a[6], p = a[7], w = 0; w < 64; w++) (g[w] = w < 16 ? n[w + v] : o(o(o(e((D = g[w - 2]), 17) ^ e(D, 19) ^ u(D, 10), g[w - 7]), C(g[w - 15])), g[w - 16])), (y = o(o(o(o(p, h(m)), c(m, s, b)), t[w]), g[w])), (B = o(i(l), f(l, d, A))), (p = b), (b = s), (s = m), (m = o(S, y)), (S = A), (A = d), (d = l), (l = o(y, B))
                    ; (a[0] = o(l, a[0])), (a[1] = o(d, a[1])), (a[2] = o(A, a[2])), (a[3] = o(S, a[3])), (a[4] = o(m, a[4])), (a[5] = o(s, a[5])), (a[6] = o(b, a[6])), (a[7] = o(p, a[7]))
            }
            var D
            return a
        })(
            (function (n) {
                const t = [],
                    o = (1 << r) - 1
                for (let e = 0; e < n.length * r; e += r) t[e >> 5] |= (n.charCodeAt(e / r) & o) << (24 - (e % 32))
                return t
            })(
                (n = (function (n) {
                    n = n.replace(/\r\n/g, '\n')
                    let r = ''
                    for (let t = 0; t < n.length; t++) {
                        const o = n.charCodeAt(t)
                        o < 128 ? (r += String.fromCharCode(o)) : o > 127 && o < 2048 ? ((r += String.fromCharCode((o >> 6) | 192)), (r += String.fromCharCode((63 & o) | 128))) : ((r += String.fromCharCode((o >> 12) | 224)), (r += String.fromCharCode(((o >> 6) & 63) | 128)), (r += String.fromCharCode((63 & o) | 128)))
                    }
                    return r
                })(n))
            ),
            n.length * r
        )
    )
}
function MD5Encrypt(_) {
    function $(_, $) { return _ << $ | _ >>> 32 - $ } function r(_, $) { var r, n, o, t, e; return o = 2147483648 & _, t = 2147483648 & $, r = 1073741824 & _, n = 1073741824 & $, e = (1073741823 & _) + (1073741823 & $), r & n ? 2147483648 ^ e ^ o ^ t : r | n ? 1073741824 & e ? 3221225472 ^ e ^ o ^ t : 1073741824 ^ e ^ o ^ t : e ^ o ^ t } function n(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) & (C = o) | ~f & t, e), a)), r($(_, u), n) } function o(_, n, o, t, e, u, a) { var f, C, c; return _ = r(_, r(r((f = n, C = o, f & (c = t) | C & ~c), e), a)), r($(_, u), n) } function t(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n) ^ (C = o) ^ t, e), a)), r($(_, u), n) } function e(_, n, o, t, e, u, a) { var f, C; return _ = r(_, r(r((f = n, (C = o) ^ (f | ~t)), e), a)), r($(_, u), n) } function u(_) { var $, r = "", n = ""; for ($ = 0; 3 >= $; $++)r += (n = "0" + (_ >>> 8 * $ & 255).toString(16)).substr(n.length - 2, 2); return r } var a, f, C, c, h, i, v, d, g, m = []; for (m = function (_) { for (var $, r = _.length, n = r + 8, o = 16 * ((n - n % 64) / 64 + 1), t = Array(o - 1), e = 0, u = 0; r > u;)$ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | _.charCodeAt(u) << e, u++; return $ = (u - u % 4) / 4, e = u % 4 * 8, t[$] = t[$] | 128 << e, t[o - 2] = r << 3, t[o - 1] = r >>> 29, t }(_ = function (_) { _ = _.replace(/\r\n/g, "\n"); for (var $ = "", r = 0; r < _.length; r++) { var n = _.charCodeAt(r); 128 > n ? $ += String.fromCharCode(n) : n > 127 && 2048 > n ? ($ += String.fromCharCode(n >> 6 | 192), $ += String.fromCharCode(63 & n | 128)) : ($ += String.fromCharCode(n >> 12 | 224), $ += String.fromCharCode(n >> 6 & 63 | 128), $ += String.fromCharCode(63 & n | 128)) } return $ }(_)), i = 1732584193, v = 4023233417, d = 2562383102, g = 271733878, a = 0; a < m.length; a += 16)f = i, C = v, c = d, h = g, i = n(i, v, d, g, m[a + 0], 7, 3614090360), g = n(g, i, v, d, m[a + 1], 12, 3905402710), d = n(d, g, i, v, m[a + 2], 17, 606105819), v = n(v, d, g, i, m[a + 3], 22, 3250441966), i = n(i, v, d, g, m[a + 4], 7, 4118548399), g = n(g, i, v, d, m[a + 5], 12, 1200080426), d = n(d, g, i, v, m[a + 6], 17, 2821735955), v = n(v, d, g, i, m[a + 7], 22, 4249261313), i = n(i, v, d, g, m[a + 8], 7, 1770035416), g = n(g, i, v, d, m[a + 9], 12, 2336552879), d = n(d, g, i, v, m[a + 10], 17, 4294925233), v = n(v, d, g, i, m[a + 11], 22, 2304563134), i = n(i, v, d, g, m[a + 12], 7, 1804603682), g = n(g, i, v, d, m[a + 13], 12, 4254626195), d = n(d, g, i, v, m[a + 14], 17, 2792965006), v = n(v, d, g, i, m[a + 15], 22, 1236535329), i = o(i, v, d, g, m[a + 1], 5, 4129170786), g = o(g, i, v, d, m[a + 6], 9, 3225465664), d = o(d, g, i, v, m[a + 11], 14, 643717713), v = o(v, d, g, i, m[a + 0], 20, 3921069994), i = o(i, v, d, g, m[a + 5], 5, 3593408605), g = o(g, i, v, d, m[a + 10], 9, 38016083), d = o(d, g, i, v, m[a + 15], 14, 3634488961), v = o(v, d, g, i, m[a + 4], 20, 3889429448), i = o(i, v, d, g, m[a + 9], 5, 568446438), g = o(g, i, v, d, m[a + 14], 9, 3275163606), d = o(d, g, i, v, m[a + 3], 14, 4107603335), v = o(v, d, g, i, m[a + 8], 20, 1163531501), i = o(i, v, d, g, m[a + 13], 5, 2850285829), g = o(g, i, v, d, m[a + 2], 9, 4243563512), d = o(d, g, i, v, m[a + 7], 14, 1735328473), v = o(v, d, g, i, m[a + 12], 20, 2368359562), i = t(i, v, d, g, m[a + 5], 4, 4294588738), g = t(g, i, v, d, m[a + 8], 11, 2272392833), d = t(d, g, i, v, m[a + 11], 16, 1839030562), v = t(v, d, g, i, m[a + 14], 23, 4259657740), i = t(i, v, d, g, m[a + 1], 4, 2763975236), g = t(g, i, v, d, m[a + 4], 11, 1272893353), d = t(d, g, i, v, m[a + 7], 16, 4139469664), v = t(v, d, g, i, m[a + 10], 23, 3200236656), i = t(i, v, d, g, m[a + 13], 4, 681279174), g = t(g, i, v, d, m[a + 0], 11, 3936430074), d = t(d, g, i, v, m[a + 3], 16, 3572445317), v = t(v, d, g, i, m[a + 6], 23, 76029189), i = t(i, v, d, g, m[a + 9], 4, 3654602809), g = t(g, i, v, d, m[a + 12], 11, 3873151461), d = t(d, g, i, v, m[a + 15], 16, 530742520), v = t(v, d, g, i, m[a + 2], 23, 3299628645), i = e(i, v, d, g, m[a + 0], 6, 4096336452), g = e(g, i, v, d, m[a + 7], 10, 1126891415), d = e(d, g, i, v, m[a + 14], 15, 2878612391), v = e(v, d, g, i, m[a + 5], 21, 4237533241), i = e(i, v, d, g, m[a + 12], 6, 1700485571), g = e(g, i, v, d, m[a + 3], 10, 2399980690), d = e(d, g, i, v, m[a + 10], 15, 4293915773), v = e(v, d, g, i, m[a + 1], 21, 2240044497), i = e(i, v, d, g, m[a + 8], 6, 1873313359), g = e(g, i, v, d, m[a + 15], 10, 4264355552), d = e(d, g, i, v, m[a + 6], 15, 2734768916), v = e(v, d, g, i, m[a + 13], 21, 1309151649), i = e(i, v, d, g, m[a + 4], 6, 4149444226), g = e(g, i, v, d, m[a + 11], 10, 3174756917), d = e(d, g, i, v, m[a + 2], 15, 718787259), v = e(v, d, g, i, m[a + 9], 21, 3951481745), i = r(i, f), v = r(v, C), d = r(d, c), g = r(g, h); return (u(i) + u(v) + u(d) + u(g)).toLowerCase()//.toUpperCase()
}
