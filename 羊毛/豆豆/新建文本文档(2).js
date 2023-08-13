/*
统一茄皇任务

捉包把apig.xiaoyisz.com/qiehuang/ga/public/api/login的body填到tyqhAccount里，多账号换行
注意有的环境可能需要转义(如低版本的青龙面板环境变量)

定时一天2次足够了
cron: 38 1,18 * * *
*/
const $ = new Env("统一茄皇任务")

let envSplitor = ['\n']

let userCookie = ($.isNode() ? process.env.tyqhAccount : $.getdata('tyqhAccount')) || ''

let validUserList = []
let validUserCount = 0
let myAccountList = []

let userList = []
let userIdx = 0
let userCount = 0

let addFriendUpperLimit = 45

let appId = 'wx532ecb3bdaaf92f9'
let defaultUA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.23(0x1800172f) NetType/WIFI Language/zh_CN miniProgram/wx532ecb3bdaaf92f9'
let Referer = 'https://thekingoftomato.ioutu.cn/'
let Origin = 'https://thekingoftomato.ioutu.cn'

let clientKey = 'IfWu0xwXlWgqkIC7DWn20qpo6a30hXX6'
let clientSecret = 'A4rHhUJfMjw2I5CODh5g40Ja1d3Yk1CH'

let confName = {
    0: '[!@$]',
    1: '番茄',
    2: '阳光',
    3: '游戏次数',
    4: '[???]',
    5: '经验',
}
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx
        this.nickName = this.index
        this.valid = false

        this.loginBody = str
        this.auth = ''
        this.canShine = true
        this.canHelp = true
        this.canSteal = true
        this.canAdventure = false
        this.addFriendFlag = true
        this.friendList = []
        this.friendIdList = []
    }

    gen_sign() {
        let param = {
            clientKey,
            clientSecret,
            nonce: $.randomString(16, '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'),
            timestamp: Date.now(),
        }
        let ret = {
            nonce: param.nonce,
            timestamp: param.timestamp,
            signature: MD5Encrypt($.json2str(param, '&')).toUpperCase(),
        }
        return ret
    }

    async taskApi(paramIn = {}) {
        let paramOut = {}
        try {
            let host = paramIn.url.replace('//', '/').split('/')[1]
            let urlObject = {
                url: paramIn.url,
                headers: {
                    'Host': host,
                    'Connection': 'keep-alive',
                    'User-Agent': defaultUA,
                    'Referer': Referer,
                    'Origin': Origin,
                    'Authorization': this.auth,
                },
                timeout: 5000,
            }
            if (paramIn.queryParam) {
                urlObject.url += ('?' + $.json2str(paramIn.queryParam, '&'))
            }
            if (paramIn.body) {
                urlObject.headers['Content-Type'] = paramIn['Content-Type'] || 'application/json'
                if (typeof paramIn.body === 'object') {
                    if (urlObject.headers['Content-Type'].includes('json')) {
                        urlObject.body = JSON.stringify(paramIn.body)
                    } else {
                        urlObject.body = $.json2str(paramIn.body, '&')
                    }
                } else {
                    urlObject.body = paramIn.body
                }
                //urlObject.headers['Content-Length'] = urlObject.body.length
            }
            if (paramIn.urlObjectParam) Object.assign(urlObject, paramIn.urlObjectParam)
            if (paramIn.headerParam) Object.assign(urlObject.headers, paramIn.headerParam)

            paramOut = Object.assign({}, await httpRequest(paramIn.method, urlObject))
            if (paramOut.err) {
                paramOut.statusCode = paramOut?.err?.response?.statusCode
            } else {
                paramOut.statusCode = paramOut?.resp?.statusCode
                if (paramOut?.resp?.body) {
                    try {
                        paramOut.result = JSON.parse(paramOut.resp.body)
                        if (paramOut.result.code == 904) {
                            if (!paramIn.isRetry) {
                                let ret = await this.refreshAuth()
                                if (ret.flag == 1) {
                                    paramIn.isRetry = true
                                    paramOut = await this.taskApi(paramIn)
                                }
                            }
                        }
                    } catch (e) {
                        paramOut.result = paramOut.resp.body
                    }
                } else {
                    if (!paramIn?.allowNullResp) console.log(`请求返回为空: ${paramIn.url}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async login() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'post',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/public/api/login`,
                body: this.loginBody,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.auth = result.data
                    await this.userInfo()
                } else {
                    $.logAndNotify(`登录失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async refreshAuth() {
        let paramOut = {
            flag: 0
        }
        try {
            let urlParam = {
                method: 'post',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/public/api/login`,
                body: this.loginBody,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.auth = result.data
                    paramOut.flag = 1
                    console.log(`账号${this.index}[${this.nickName}]刷新Authorization成功`)
                } else {
                    paramOut.flag = -1
                    console.log(`账号${this.index}[${this.nickName}]刷新Authorization失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async userInfo() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/info`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.valid = true
                    this.userId = result.data.id
                    this.nickName = result.data.nickName
                    this.gameNum = result.data.gaNum
                    this.tomatoNum = result.data.tomatoNum
                    this.sunshine = result.data.sunshineNum
                    console.log(`昵称：${this.nickName}`)
                    console.log(`阳光：${this.sunshine}`)
                    console.log(`番茄：${this.tomatoNum}`)
                    console.log(`游戏次数：${this.gameNum}`)
                    console.log(`等级：${result.data.level}, Exp ${result.data.levelExp}/${result.data.needExp}`)
                } else {
                    console.log(`获取用户数据失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async getUserInfo() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/info`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.gameNum = result.data.gaNum
                    this.tomatoNum = result.data.tomatoNum
                    this.sunshine = result.data.sunshineNum
                } else {
                    console.log(`获取用户数据失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async taskList() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/task/list`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    for (let task of result.data) {
                        if (task.taskType == 1) {
                            this.helpTaskId = task.taskId
                            this.needHelpNum = task.target
                            this.helpedCount = task.completed
                            this.needHelp = this.helpedCount <= this.needHelpNum
                        }
                        switch (task.status) {
                            case 1:
                                console.log(`任务[${task.name}] -- 未完成`)
                                if (task.taskType != 1) {
                                    let num = task.target - task.completed
                                    for (let i = 0; i < num; i++) {
                                        await this.taskReport(task)
                                        await $.wait(1000)
                                    }
                                }
                                break
                            case 2:
                                console.log(`任务[${task.name}] -- 可领取奖励`)
                                await this.drawTaskPrize(task)
                                await $.wait(1000)
                                break
                            case 3:
                                console.log(`任务[${task.name}] -- 已完成`)
                                break
                            default:
                                console.log(`任务[${task.name}] -- 未知状态[${task.status}]`)
                                break
                        }
                    }
                    console.log(`助力任务：${this.helpedCount}/${this.needHelpNum}`)
                } else {
                    console.log(`获取任务列表失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async helpFriend(helpee) {
        let paramOut = {}
        try {
            let queryParam = {
                taskType: 1,
                attachId: helpee.userId,
                taskId: this.helpTaskId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/task/report`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    if (result.data.status == 1 && result.data.nickName) {
                        console.log(`助力账号[${helpee.nickName}]成功`)
                    } else if (result.data.status == 2) {
                        helpee.needHelp = false
                        console.log(`助力账号[${helpee.nickName}]失败：对方助力已满`)
                    } else if (result.data.status == 3) {
                        console.log(`已助力过账号[${helpee.nickName}]`)
                    } else {
                        console.log(`助力账号[${helpee.nickName}]失败[${result.data.status}]`)
                    }
                } else {
                    console.log(`助力账号[${helpee.nickName}]失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async taskReport(task) {
        let paramOut = {}
        try {
            let queryParam = {
                taskType: task.taskType,
                attachId: Date.now(),
                taskId: task.taskId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/task/report`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    switch (result.data.status) {
                        case 1:
                            console.log(`完成任务[${task.name}]成功`)
                            if (result.data.taskStatus == 2) {
                                await this.drawTaskPrize(task)
                            }
                            break
                        case 2:
                            console.log(`完成任务[${task.name}]失败[${result.data.status}]，可能已上报/完成`)
                            break
                        case -2:
                            console.log(`完成任务[${task.name}]失败[${result.data.status}]，不能以这种方式完成`)
                            break
                        default:
                            console.log(`完成任务[${task.name}]失败[${result.data.status}]`)
                            break
                    }
                } else {
                    console.log(`完成任务[${task.name}]失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async drawTaskPrize(task) {
        let paramOut = {}
        try {
            let queryParam = {
                taskId: task.taskId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/task/drawPrize`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    let prize = []
                    let levelUpStr = []
                    for (let item of result.data.infos) {
                        prize.push(`${item.num}${confName[item.type]}`)
                        if (item?.levelUpVo?.packageVo?.infos) {
                            let levelPrize = []
                            for (let levelItem of item.levelUpVo.packageVo.infos) {
                                if (levelItem.type != 0) levelPrize.push(`${levelItem.num}${confName[levelItem.type]}`)
                            }
                            levelUpStr.push(`恭喜升级：${item.levelUpVo.oldLevel} -> ${item.levelUpVo.newLevel}`)
                            levelUpStr.push(`升级获得奖励：${levelPrize.join('，')}`)
                        }
                    }
                    console.log(`领取任务[${task.name}]奖励获得：${prize.join('，')}`)
                    if (levelUpStr.length) console.log(levelUpStr.join('\n'))
                } else {
                    console.log(`领取任务[${task.name}]奖励失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async plantInfo() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/info`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    if (result.data.stage == -1) {
                        console.log(`未开始种植番茄`)
                        await this.plantStart()
                    } else if (result.data.stage == 3 && result.data.currentSunshineNum == result.data.needSunshineNum) {
                        this.plantId = result.data.plantId
                        console.log(`已经可以收获番茄了`)
                        await this.harvest()
                    } else {
                        this.plantId = result.data.plantId
                        console.log(`番茄进度：等级${result.data.stage}，${result.data.currentSunshineNum}/${result.data.needSunshineNum}`)
                    }
                } else {
                    console.log(`查询番茄进度失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async giveSunshine(paramIn = {}) {
        let paramOut = {}
        try {
            let queryParam = {
                plantId: this.plantId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/${paramIn.batch ? 'batchgiveSunshine' : 'giveSunshine'}`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`使用阳光成功，番茄进度：等级${result.data.stage}，${result.data.currentSunshineNum}/${result.data.needSunshineNum}`)
                    if (result.data.currentSunshineNum >= result.data.needSunshineNum) {
                        await this.upgradePlant()
                    }
                } else {
                    console.log(`使用阳光失败：${result.message}`)
                    if (result?.message?.includes('阳光不足')) {
                        this.canShine = false
                    } else if (result?.message?.includes('收获阶段')) {
                        await this.harvest()
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async harvest(paramIn = {}) {
        let paramOut = {}
        try {
            let queryParam = {
                plantId: this.plantId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/harvest`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    let prize = []
                    for (let item of result.data.infos) {
                        prize.push(`${item.num}${confName[item.type]}`)
                    }
                    console.log(`收获番茄获得：${prize.join('，')}`)
                    await this.plantStart()
                } else {
                    console.log(`收获番茄失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async plantStart(paramIn = {}) {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/start`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.plantId = result.data.plantId
                    console.log(`开始种植新番茄`)
                } else {
                    console.log(`种植新番茄失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async upgradePlant(paramIn = {}) {
        let paramOut = {}
        try {
            let queryParam = {
                plantId: this.plantId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/upgrade`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`升级番茄成功，番茄进度：等级${result.data.stage}，${result.data.currentSunshineNum}/${result.data.needSunshineNum}`)
                } else {
                    console.log(`升级番茄失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async challengeStart() {
        let paramOut = {}
        try {
            let queryParam = {
                plantId: this.plantId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/challenge/start`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`模拟开始游戏`)
                    await $.wait(1000)
                    await this.challengeReport(result.data)
                } else {
                    console.log(`模拟开始游戏失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async challengeReport(battleId) {
        let paramOut = {}
        try {
            let costMillisecond = Math.floor(Math.random() * 6000) + 6000
            let bodyParam = {
                battleId,
                result: 1,
                costMillisecond,
            }
            let urlParam = {
                method: 'post',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/challenge/report`,
                body: {
                    battleId,
                    result: 1,
                    costMillisecond,
                },
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    let prize = []
                    for (let item of result.data.infos) {
                        prize.push(`${item.num}${confName[item.type]}`)
                    }
                    console.log(`模拟完成游戏，获得：${prize.join('，')}`)
                } else {
                    console.log(`模拟完成游戏失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async dailyInfo() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/daily/info`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    if (result.data.yesterdaySunshineNum) {
                        console.log(`可以收取${result.data.yesterdaySunshineNum}阳光`)
                        await this.pickup()
                    } else {
                        console.log(`现在没有可收取的阳光，明天可收取${result.data.sunshineNum}阳光`)
                    }
                } else {
                    console.log(`查询可收取阳光失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async pickup() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/daily/pickup`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`成功收取${result.data}阳光`)
                } else {
                    console.log(`收取阳光失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async getFriendList(paramIn = {}) {
        let paramOut = {}
        try {
            let queryParam = {
                page: paramIn.page || 1,
                size: paramIn.size || 50,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/friend/list`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    this.friendList = result.data.content
                    this.friendIdList = this.friendList.map(x => x.userId)
                } else {
                    console.log(`获取好友列表失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async friendRecommend() {
        let paramOut = {}
        try {
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/friend/recommend`,
                queryParam: this.gen_sign(),
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    let taskall = []
                    for (let user of result.data) {
                        taskall.push(this.addFriend(user))
                    }
                    await Promise.all(taskall)
                } else {
                    console.log(`查询推荐好友列表失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async addFriend(user) {
        let paramOut = {}
        try {
            let queryParam = {
                friendUserId: user.userId,
                type: 1,
                addType: 1,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/friend/add`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`添加好友[${user.nickName}]成功`)
                } else {
                    console.log(`添加好友[${user.nickName}]失败：${result.message}`)
                    if (result?.message?.includes('最多添加')) {
                        this.addFriendFlag = false
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async delFriend(user) {
        let paramOut = {}
        try {
            let queryParam = {
                friendUserId: user.userId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/user/friend/del`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`删除好友[${user.nickName}]成功`)
                } else {
                    console.log(`删除好友[${user.nickName}]失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async findFriendPlantId(helpee) {
        let paramOut = {}
        try {
            let queryParam = {
                userId: helpee.userId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `https://apig.xiaoyisz.com/qiehuang/ga/plant/info`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    if (result.data.plantId) {
                        helpee.plantId = result.data.plantId
                        await this.giveSunshineHelp(helpee)
                    }
                } else {
                    console.log(`查询好友plantId失败：${result.message}`)
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async giveSunshineHelp(helpee) {
        let paramOut = {}
        try {
            let queryParam = {
                plantId: helpee.plantId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `http://apig.xiaoyisz.com/qiehuang/ga/plant/giveSunshine`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`助力[${helpee.nickName}]洒阳光成功`)
                    if (result?.data?.levelUpVo?.exp) {
                        console.log(`助力获得了${result.data.levelUpVo.exp}经验，已助力${result.data.helpNum}人`)
                    }
                } else {
                    console.log(`助力[${helpee.nickName}]洒阳光失败：${result.message}`)
                    if (result?.message?.includes('最多助力')) {
                        this.canHelp = false
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async steal(user) {
        let paramOut = {}
        try {
            let queryParam = {
                friendUserId: user.userId,
            }
            let signParam = this.gen_sign()
            Object.assign(queryParam, signParam)
            let urlParam = {
                method: 'get',
                url: `tp://apig.xiaoyisz.com/qiehuang/ga/user/daily/steal`,
                queryParam: queryParam,
            }
            paramOut = Object.assign({}, await this.taskApi(urlParam))
            if (typeof paramOut?.result === 'object') {
                let result = paramOut.result
                if (result.code == 0) {
                    console.log(`偷取到[${user.nickName}]${result.data}阳光`)
                } else {
                    console.log(`偷取[${user.nickName}]阳光失败：${result.message}`)
                    if (result?.message?.includes('最多')) {
                        this.canSteal = false
                    }
                }
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async userStealAndHelpSunshineTask() {
        let paramOut = {}
        try {
            console.log(`============= 账号[${this.index}] =============`)
            await this.getFriendList()
            //先添加自己号的好友
            for (let helpee of validUserList.filter(x => x.index != this.index && !this.friendIdList.includes(x.userId))) {
                await this.addFriend(helpee)
                if (!this.addFriendFlag) break
            }
            //添加随机好友
            await this.getFriendList()
            let friendNum = this.friendList.length
            if (friendNum < addFriendUpperLimit && this.addFriendFlag) {
                let needNum = addFriendUpperLimit - friendNum
                let needRecommendTime = Math.ceil(needNum / 4)
                for (let i = 0; i < needRecommendTime && this.addFriendFlag; i++) {
                    await this.friendRecommend()
                }
            }

            //先助力自己号洒阳光
            await this.getFriendList()
            for (let helpee of this.friendList.filter(x => myAccountList.includes(x.userId) && x.helpAble)) {
                await this.findFriendPlantId(helpee)
                if (!this.canHelp) break
                await $.wait(1000)
            }
            //剩余次数助力随机好友洒阳光
            if (this.canHelp) {
                for (let helpee of this.friendList.filter(x => !myAccountList.includes(x.userId) && x.helpAble)) {
                    await this.findFriendPlantId(helpee)
                    if (!this.canHelp) break
                    await $.wait(1000)
                }
            }
            //偷好友
            for (let user of this.friendList.filter(x => x.stealAble)) {
                await this.steal(user)
                if (!this.canSteal) break
                await $.wait(1000)
            }

            await this.getFriendList()
            //删除多余好友
            let taskall = []
            for (let user of this.friendList.filter(x => !myAccountList.includes(x.userId))) {
                taskall.push(this.delFriend(user))
            }
            await Promise.all(taskall)
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async userHelpTask() {
        let paramOut = {}
        try {
            console.log(`============= 账号[${this.index}] =============`)
            for (let helpee of userList.filter(x => x.index != this.index && x.needHelp)) {
                await this.helpFriend(helpee)
                await $.wait(1000)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }

    async userTask() {
        let paramOut = {}
        try {
            console.log(`\n============= 账号[${this.index}] =============`)
            await this.login()
            if (!this.valid) return
            await this.dailyInfo()
            await this.taskList()
            await this.getUserInfo()
            for (let i = 0; i < this.gameNum; i++) {
                await this.challengeStart()
                await $.wait(1200)
            }
            await this.plantInfo()
            this.canShine = true
            while (this.canShine) {
                await this.giveSunshine({ batch: true })
                await $.wait(1200)
            }
            this.canShine = true
            while (this.canShine) {
                await this.giveSunshine()
                await $.wait(1200)
            }
        } catch (e) {
            console.log(e)
        } finally {
            return Promise.resolve(paramOut)
        }
    }
}

!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite()
    } else {
        if (!(await checkEnv())) return

        console.log('\n---------------- 日常任务 ----------------')
        for (let user of userList) {
            await user.userTask()
        }

        validUserList = userList.filter(x => x.valid)
        validUserCount = validUserList.length

        if (validUserCount > 0) {
            myAccountList = validUserList.map(x => x.userId)

            console.log('\n---------------- 助力任务 ----------------')
            for (let helper of validUserList) {
                await helper.userHelpTask()
            }

            console.log('\n---------------- 助力洒阳光和偷取 ----------------')
            for (let helper of validUserList) {
                await helper.userStealAndHelpSunshineTask()
            }
        }

        await $.showmsg()
    }
})()
    .catch((e) => console.log(e))
    .finally(() => $.done())

///////////////////////////////////////////////////////////////////
async function GetRewrite() {
}

async function checkEnv() {
    if (userCookie) {
        let splitor = envSplitor[0]
        for (let sp of envSplitor) {
            if (userCookie.indexOf(sp) > -1) {
                splitor = sp
                break
            }
        }
        for (let userCookies of userCookie.split(splitor)) {
            if (userCookies) userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
        console.log('未找到CK')
        return
    }

    console.log(`共找到${userCount}个账号`)
    return true
}
////////////////////////////////////////////////////////////////////
async function httpRequest(method, url) {
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            resolve({ err, req, resp })
        })
    })
}
////////////////////////////////////////////////////////////////////
//MD5
function MD5Encrypt(a) { function b(a, b) { return a << b | a >>> 32 - b } function c(a, b) { var c, d, e, f, g; return e = 2147483648 & a, f = 2147483648 & b, c = 1073741824 & a, d = 1073741824 & b, g = (1073741823 & a) + (1073741823 & b), c & d ? 2147483648 ^ g ^ e ^ f : c | d ? 1073741824 & g ? 3221225472 ^ g ^ e ^ f : 1073741824 ^ g ^ e ^ f : g ^ e ^ f } function d(a, b, c) { return a & b | ~a & c } function e(a, b, c) { return a & c | b & ~c } function f(a, b, c) { return a ^ b ^ c } function g(a, b, c) { return b ^ (a | ~c) } function h(a, e, f, g, h, i, j) { return a = c(a, c(c(d(e, f, g), h), j)), c(b(a, i), e) } function i(a, d, f, g, h, i, j) { return a = c(a, c(c(e(d, f, g), h), j)), c(b(a, i), d) } function j(a, d, e, g, h, i, j) { return a = c(a, c(c(f(d, e, g), h), j)), c(b(a, i), d) } function k(a, d, e, f, h, i, j) { return a = c(a, c(c(g(d, e, f), h), j)), c(b(a, i), d) } function l(a) { for (var b, c = a.length, d = c + 8, e = (d - d % 64) / 64, f = 16 * (e + 1), g = new Array(f - 1), h = 0, i = 0; c > i;)b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | a.charCodeAt(i) << h, i++; return b = (i - i % 4) / 4, h = i % 4 * 8, g[b] = g[b] | 128 << h, g[f - 2] = c << 3, g[f - 1] = c >>> 29, g } function m(a) { var b, c, d = "", e = ""; for (c = 0; 3 >= c; c++)b = a >>> 8 * c & 255, e = "0" + b.toString(16), d += e.substr(e.length - 2, 2); return d } function n(a) { a = a.replace(/\r\n/g, "\n"); for (var b = "", c = 0; c < a.length; c++) { var d = a.charCodeAt(c); 128 > d ? b += String.fromCharCode(d) : d > 127 && 2048 > d ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(63 & d | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(63 & d | 128)) } return b } var o, p, q, r, s, t, u, v, w, x = [], y = 7, z = 12, A = 17, B = 22, C = 5, D = 9, E = 14, F = 20, G = 4, H = 11, I = 16, J = 23, K = 6, L = 10, M = 15, N = 21; for (a = n(a), x = l(a), t = 1732584193, u = 4023233417, v = 2562383102, w = 271733878, o = 0; o < x.length; o += 16)p = t, q = u, r = v, s = w, t = h(t, u, v, w, x[o + 0], y, 3614090360), w = h(w, t, u, v, x[o + 1], z, 3905402710), v = h(v, w, t, u, x[o + 2], A, 606105819), u = h(u, v, w, t, x[o + 3], B, 3250441966), t = h(t, u, v, w, x[o + 4], y, 4118548399), w = h(w, t, u, v, x[o + 5], z, 1200080426), v = h(v, w, t, u, x[o + 6], A, 2821735955), u = h(u, v, w, t, x[o + 7], B, 4249261313), t = h(t, u, v, w, x[o + 8], y, 1770035416), w = h(w, t, u, v, x[o + 9], z, 2336552879), v = h(v, w, t, u, x[o + 10], A, 4294925233), u = h(u, v, w, t, x[o + 11], B, 2304563134), t = h(t, u, v, w, x[o + 12], y, 1804603682), w = h(w, t, u, v, x[o + 13], z, 4254626195), v = h(v, w, t, u, x[o + 14], A, 2792965006), u = h(u, v, w, t, x[o + 15], B, 1236535329), t = i(t, u, v, w, x[o + 1], C, 4129170786), w = i(w, t, u, v, x[o + 6], D, 3225465664), v = i(v, w, t, u, x[o + 11], E, 643717713), u = i(u, v, w, t, x[o + 0], F, 3921069994), t = i(t, u, v, w, x[o + 5], C, 3593408605), w = i(w, t, u, v, x[o + 10], D, 38016083), v = i(v, w, t, u, x[o + 15], E, 3634488961), u = i(u, v, w, t, x[o + 4], F, 3889429448), t = i(t, u, v, w, x[o + 9], C, 568446438), w = i(w, t, u, v, x[o + 14], D, 3275163606), v = i(v, w, t, u, x[o + 3], E, 4107603335), u = i(u, v, w, t, x[o + 8], F, 1163531501), t = i(t, u, v, w, x[o + 13], C, 2850285829), w = i(w, t, u, v, x[o + 2], D, 4243563512), v = i(v, w, t, u, x[o + 7], E, 1735328473), u = i(u, v, w, t, x[o + 12], F, 2368359562), t = j(t, u, v, w, x[o + 5], G, 4294588738), w = j(w, t, u, v, x[o + 8], H, 2272392833), v = j(v, w, t, u, x[o + 11], I, 1839030562), u = j(u, v, w, t, x[o + 14], J, 4259657740), t = j(t, u, v, w, x[o + 1], G, 2763975236), w = j(w, t, u, v, x[o + 4], H, 1272893353), v = j(v, w, t, u, x[o + 7], I, 4139469664), u = j(u, v, w, t, x[o + 10], J, 3200236656), t = j(t, u, v, w, x[o + 13], G, 681279174), w = j(w, t, u, v, x[o + 0], H, 3936430074), v = j(v, w, t, u, x[o + 3], I, 3572445317), u = j(u, v, w, t, x[o + 6], J, 76029189), t = j(t, u, v, w, x[o + 9], G, 3654602809), w = j(w, t, u, v, x[o + 12], H, 3873151461), v = j(v, w, t, u, x[o + 15], I, 530742520), u = j(u, v, w, t, x[o + 2], J, 3299628645), t = k(t, u, v, w, x[o + 0], K, 4096336452), w = k(w, t, u, v, x[o + 7], L, 1126891415), v = k(v, w, t, u, x[o + 14], M, 2878612391), u = k(u, v, w, t, x[o + 5], N, 4237533241), t = k(t, u, v, w, x[o + 12], K, 1700485571), w = k(w, t, u, v, x[o + 3], L, 2399980690), v = k(v, w, t, u, x[o + 10], M, 4293915773), u = k(u, v, w, t, x[o + 1], N, 2240044497), t = k(t, u, v, w, x[o + 8], K, 1873313359), w = k(w, t, u, v, x[o + 15], L, 4264355552), v = k(v, w, t, u, x[o + 6], M, 2734768916), u = k(u, v, w, t, x[o + 13], N, 1309151649), t = k(t, u, v, w, x[o + 4], K, 4149444226), w = k(w, t, u, v, x[o + 11], L, 3174756917), v = k(v, w, t, u, x[o + 2], M, 718787259), u = k(u, v, w, t, x[o + 9], N, 3951481745), t = c(t, p), u = c(u, q), v = c(v, r), w = c(w, s); var O = m(t) + m(u) + m(v) + m(w); return O.toLowerCase() }
////////////////////////////////////////////////////////////////////
function Env(name, env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0)
    return new class {
        constructor(name, env) {
            this.nickName = name
            this.notifyStr = ''
            this.startTime = (new Date).getTime()
            Object.assign(this, env)
            console.log(`${this.nickName} 开始运行：\n`)
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports
        }
        isQuanX() {
            return "undefined" != typeof $task
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }
        isLoon() {
            return "undefined" != typeof $loon
        }
        getdata(t) {
            let e = this.getval(t)
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : ""
                if (r)
                    try {
                        const t = JSON.parse(r)
                        e = t ? this.lodash_get(t, i, "") : e
                    } catch (t) {
                        e = ""
                    }
            }
            return e
        }
        setdata(t, e) {
            let s = !1
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}"
                try {
                    const e = JSON.parse(h)
                    this.lodash_set(e, r, t),
                        s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {}
                    this.lodash_set(o, r, t),
                        s = this.setval(JSON.stringify(o), i)
                }
            }
            else {
                s = this.setval(t, e)
            }
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        send(m, t, e = (() => { })) {
            if (m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`)
                return
            }
            if (m == 'get' && t.headers) {
                delete t.headers["Content-Type"]
                delete t.headers["Content-Length"]
            } else if (t.body && t.headers) {
                if (!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded"
            }
            if (this.isSurge() || this.isLoon()) {
                if (this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {}
                    Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                }
                if (m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }).catch(err => console.log(err))
            } else if (this.isQuanX()) {
                t.method = m.toUpperCase(), this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
                    hints: !1
                })),
                    $task.fetch(t).then(t => {
                        const {
                            statusCode: i,
                            request: q,
                            headers: r,
                            body: o
                        } = t
                        e(null, q, {
                            statusCode: i,
                            headers: r,
                            body: o
                        })
                    }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got")
                const {
                    url: s,
                    ...i
                } = t
                this.instance = this.got.extend({
                    followRedirect: false
                })
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        request: q,
                        response: i
                    } = t
                    e(s, q, i)
                })
            }
        }
        time(t, x = null) {
            let xt = x ? new Date(x) : new Date
            let e = {
                "M+": xt.getMonth() + 1,
                "d+": xt.getDate(),
                "h+": xt.getHours(),
                "m+": xt.getMinutes(),
                "s+": xt.getSeconds(),
                "q+": Math.floor((xt.getMonth() + 3) / 3),
                S: xt.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }
        async showmsg() {
            if (!this.notifyStr) return
            let notifyBody = this.nickName + " 运行通知\n\n" + this.notifyStr
            if ($.isNode()) {
                var notify = require('./sendNotify')
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.nickName, notifyBody)
            } else {
                this.msg(notifyBody)
            }
        }
        logAndNotify(str) {
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }
        logAndNotifyWithTime(str) {
            let t = '[' + this.time('hh:mm:ss.S') + ']' + str
            console.log(t)
            this.notifyStr += t
            this.notifyStr += '\n'
        }
        logWithTime(str) {
            console.log('[' + this.time('hh:mm:ss.S') + ']' + str)
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                        : this.isSurge() ? {
                            url: t
                        }
                            : void 0
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"]
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"]
                        return {
                            url: e
                        }
                    }
                }
            }
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)))
            let h = ["", "============== 系统通知 =============="]
            h.push(e),
                s && h.push(s),
                i && h.push(i),
                console.log(h.join("\n"))
        }
        getMin(a, b) {
            return ((a < b) ? a : b)
        }
        getMax(a, b) {
            return ((a < b) ? b : a)
        }
        padStr(num, length, padding = '0') {
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let retStr = ''
            for (let i = 0; i < numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr
        }
        json2str(obj, c, encodeUrl = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c)
        }
        str2json(str, decodeUrl = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue
                let idx = item.indexOf('=')
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }
        randomString(len, charset = 'abcdef0123456789') {
            let str = ''
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random() * charset.length))
            }
            return str
        }
        randomList(a) {
            let idx = Math.floor(Math.random() * a.length)
            return a[idx]
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
                s = (e - this.startTime) / 1e3
            console.log(`\n${this.nickName} 运行结束，共运行了 ${s} 秒！`)
            if (this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name, env)
}
