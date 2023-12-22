/* 
50 9 * * 3
注意填写UA值！！！
*/
const CodeName = "东方雪铁龙打印"
const env = "dfxtltk"
const envSplit = [","]
const fs = require("fs")
const CryptoJS = require("crypto-js")
require("dotenv").config()
let sendLog = []
const mode = 1    // 并发-2   顺序-1
const runMax = 1  // 最大并发数量
const ckFile = `${env}.txt`
//====================================================================================================
const ck_ = ``  // 快速测试, 直接填入ck即可测试
const UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
const groupName = '法式星期三'
const contentName = '秒杀专区'
const filePath = 'dfxtlOrderck.txt'
//====================================================================================================

class User {
    constructor(str, id) {
        this.index = id
        this.ckFlog = true
        this.ck_ = str.split("|")
        this.token = this.ck_[0]
        this.state = this.ck_[1]
        if (this.state == 1) {
            this.SourceApp = "DC"
            this.SourceAppVer = "5.0.0"
            this.key = "D4K1VVPIDGBAQ3FAM0K8LD"
        } else {
            this.SourceApp = "DP"
            this.SourceAppVer = "1.0.0"
            this.key = "C4M9WWPRDGQBB3FVM9K8KD"
        }
    }

    async userTask() {
        this.arrx = []
        await this.userinfo()
        await wait(1)
        if (this.ckFlog) {
            await this.Address()
            await wait(1)
            await this.list()
            await wait(1)
        }
    }


    async userinfo() {
        const options = {
            method: "get",
            url: `https://gateway-sapp.dpca.com.cn/api-u/v1/user/info/get`,
            headers: {
                Authorization: this.token,
                Sign: CryptoJS.SHA256(new Date().getTime() + "IMD7192783674488628bc742859a7849ec9a924c979afa5a00"),
                AppId: 'IMD719278367448862',
                SourceApp: this.SourceApp,
                SourceType: 'ANDROID',
                'Content-Type': 'application/json',
                SourceAppVer: this.SourceAppVer,
                TimeStamp: new Date().getTime(),
                Host: 'gateway-sapp.dpca.com.cn',
                Connection: 'Keep-Alive',
                'Accept-Encoding': 'gzip',
                'User-Agent': 'okhttp/4.2.2',
                'content-type': 'application/json'
            }
        }
        // console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        // console.log(res)
        if (res.code == 0) {
            let a = (this.state == 1) ? "雪铁龙" : "标致";
            this.log(`${a}用户：【${res.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")}】 积分：${res.data.usableScore}`)
            this.phone = res.data.phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
        } else {
            this.log(res)
            return this.ckFlog = false
        }

    }
    async Address() {
        const options = {
            method: "post",
            url: `https://gateway-sapp.dpca.com.cn/api-mall/v1/app/userAddress/queryAddressByCondition`,
            headers: {
                Host: 'gateway-sapp.dpca.com.cn',
                Connection: 'keep-alive',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                SourceAppVer: '1360',
                SourceType: 'ANDROID',
                Authorization: this.token,
                SourceApp: this.SourceApp,
                Accept: 'application/json, text/plain, */*',
                TimeStamp: new Date().getTime(),
                'User-Agent': UA,
                AppId: 'IMD719278367448862',
                Sign: CryptoJS.SHA256(new Date().getTime() + "IMD7192783674488628bc742859a7849ec9a924c979afa5a00"),
                Origin: 'https://h5-sapp.dpca.com.cn',
                'X-Requested-With': 'com.loong.citroen',
                'Sec-Fetch-Site': 'same-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                Referer: 'https://h5-sapp.dpca.com.cn/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        }
        // console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        // console.log(JSON.stringify(res))
        if (res.code == 0) {
            if (res.data.length != 0) {
                this.addressId = res.data[0].id
                this.receiverName = res.data[0].receiverName
                this.receiverPhone = res.data[0].receiverPhone
                this.provinceCode = res.data[0].provinceCode
                this.provinceName = res.data[0].provinceName
                this.cityCode = res.data[0].cityCode
                this.cityName = res.data[0].cityName
                this.districtCode = res.data[0].districtCode
                this.districtName = res.data[0].districtName
                this.address = res.data[0].address
                this.isDefault = res.data[0].isDefault
            }
        } else {
            this.log(res)
        }

    }

    async list() {
        const options = {
            method: "get",
            url: `https://gateway-sapp.dpca.com.cn/api-mall/v1/app/mallConfig/selectHomePageData?id=`,
            headers: {
                Authorization: this.token,
                Sign: CryptoJS.SHA256(new Date().getTime() + "IMD7192783674488628bc742859a7849ec9a924c979afa5a00"),
                AppId: 'IMD719278367448862',
                SourceApp: this.SourceApp,
                SourceType: 'ANDROID',
                'Content-Type': 'application/json',
                SourceAppVer: this.SourceAppVer,
                TimeStamp: new Date().getTime(),
                Host: 'gateway-sapp.dpca.com.cn',
                Connection: 'Keep-Alive',
                'Accept-Encoding': 'gzip',
                'User-Agent': 'okhttp/4.2.2',
                'content-type': 'application/json'
            }
        }
        // console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        //console.log(JSON.stringify(res))
        if (res.code == 0) {
            const foundGroup = res.data.group.find(task => task.groupName === groupName);
            if (foundGroup) {
                const foundContent = foundGroup.content.find(tasks => tasks.contentName === contentName);
                if (foundContent) {
                    for (const list of foundContent.detailes) {
                        this.categoryId = list.categoryId
                        this.commodityId = list.commodityId
                        this.title = list.title
                        this.itemPrice = list.itemPrice
                        this.itemScore = list.itemScore
                        this.log(list.title + "  库存：" + list.stock + "  " + list.zeroStockTextContent);
                        await this.detail()
                        await wait(1)
                    }
                }
            }
        } else {
            this.log(res)
        }

    }

    async detail() {
        const options = {
            method: "get",
            url: `https://gateway-sapp.dpca.com.cn/api-mall/v1/mall/app/userCommodity/detail?categoryId=${this.categoryId}&commodityId=${this.commodityId}&title=${this.title}&cashPayFlag=0&scorePayFlag=1&itemPrice=${this.itemPrice}&itemScore=${this.itemScore}&spikeActive=0`,
            headers: {
                Host: 'gateway-sapp.dpca.com.cn',
                Connection: 'keep-alive',
                Pragma: 'no-cache',
                'Cache-Control': 'no-cache',
                SourceAppVer: '1360',
                SourceType: 'ANDROID',
                Authorization: this.token,
                SourceApp: this.SourceApp,
                Accept: 'application/json, text/plain, */*',
                TimeStamp: new Date().getTime(),
                'User-Agent': UA,
                AppId: 'IMD719278367448862',
                Sign: CryptoJS.SHA256(new Date().getTime() + "IMD7192783674488628bc742859a7849ec9a924c979afa5a00"),
                Origin: 'https://h5-sapp.dpca.com.cn',
                'X-Requested-With': 'com.loong.citroen',
                'Sec-Fetch-Site': 'same-site',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Dest': 'empty',
                Referer: 'https://h5-sapp.dpca.com.cn/',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7'
            }
        }
        // console.log(options)
        this.hd = options.headers
        let { res } = await requestPromise(options)
        // console.log(res)
        if (res.code == 0) {
            this.commodityId = res.data.id
            this.title = res.data.title
            this.majorPictureUrl = res.data.majorPictureUrl
            this.skuId = res.data.skuList[0].id
            this.stock = res.data.skuList[0].stock
            this.itemScore = "3"
            this.specsName = res.data.skuList[0].specsName
            this.shipMethod = res.data.shipMethodList[0].code
            this.commodityType = res.data.commodityType
            this.discount = 100
            if (this.title.includes("月卡")) {
                this.abc = 1
            } else {
                this.abc = 0
            }


            let taskString = this.token + '|' + this.addressId + '|' + this.commodityId + '|' + this.title + '|' + this.majorPictureUrl + '|' + this.skuId + '|' + this.stock + '|' + this.discount + '|' + this.itemScore + '|' + this.receiverName + '|' + this.receiverPhone + '|' + this.provinceCode + '|' + this.provinceName + '|' + this.cityCode + '|' + this.cityName + '|' + this.districtCode + '|' + this.districtName + '|' + this.address + '|' + this.isDefault + '|' + this.specsName + '|' + this.shipMethod + '|' + this.commodityType + '|' + this.state + '|' + this.abc + '|' + this.phone
            fs.appendFileSync(filePath, taskString + '\n', 'utf-8');
            this.log('打印成功')
        } else {
            this.log(res)
        }

    }

    log(message, p = 0) {
        if (mode === 1 && !this.hasLogged) {
            console.log(`\n${"•".repeat(12)}  ${this.index} ${"•".repeat(12)}\n`)
            this.hasLogged = true
        }
        console.log(`${this.index} ${typeof message === "object" ? JSON.stringify(message) : message}`)
        if (p) {
            sendLog.push(`${this.index} ${message}`)
        }
    }

}
async function requestPromise(options) {
    const got = require("got")
    let response, body, headers, res
    try {
        if (options.method.toUpperCase() === "GET") delete options.json, options.body, options.from
        response = await got(options, {
            followRedirect: false,
            https: { rejectUnauthorized: false },
            timeout: 13000,
        })
    } catch (error) {
        response = error.response
    }
    if (response) {
        body = response.body
        headers = response.headers
        if (body) {
            try {
                res = JSON.parse(body)
            } catch (e) {
                res = body
            }
        }
    }
    return { headers, res }
}

class UserList {
    constructor(env) {
        this.env = env
        this.userList = []
        this.logPrefix = `\n[环境检测 ${this.env}]`
        this.mode = mode
    }

    1

    checkEnv() {
        try {
            let UserData = ""
            if (ckFile !== "" && fs.existsSync(ckFile)) {
                UserData = UserData.concat(fs.readFileSync(`./${ckFile}`, "utf-8").split("\n") || [])
                console.log(`ck文件[ ${ckFile} ]加载成功`)
            } else {
                console.log(`ck文件[ ${ckFile} ]不存在, 调用青龙环境变量`)
                UserData = process.env[env] || ck_
            }
            if (!UserData || UserData.trim() === "") {
                console.log(`${this.logPrefix} 没有找到账号信息`)
                return false
            }
            this.userList = UserData
                .split(new RegExp(envSplit.join("|")))
                .filter((cookie) => cookie.trim() !== "")
                .map((cookie, index) => new User(cookie.trim(), `账号[${index + 1}]`))
            const userCount = this.userList.length
            console.log(`${this.logPrefix} ${userCount > 0 ? `找到 ${userCount} 个账号\n` : "没有找到账号\n"}`)
            return true

        } catch (e) {
            console.log(e)
        }
    }

    async runTask() {
        if (!this.checkEnv()) {
            return
        }
        console.log(`[任务 ${CodeName}] 开始运行`)
        if (this.mode === 2) {  // 并发
            const taskQueue = []
            const concurrency = runMax
            for (const user of this.userList) {
                while (taskQueue.length >= concurrency) {
                    await Promise.race(taskQueue)
                }
                const promise = user.userTask()
                taskQueue.push(promise)
                promise.finally(() => {
                    taskQueue.splice(taskQueue.indexOf(promise), 1)
                })
                if (taskQueue.length < concurrency) {
                    continue
                }
                await Promise.race(taskQueue)
            }
            await Promise.allSettled(taskQueue)
        } else {
            for (const user of this.userList) {
                await user.userTask()
            }
        }
    }

}

(async () => {
    const s = Date.now()
    const userList = new UserList(env)
    await Checkfile()
    await userList.runTask()
    const e = Date.now()
    await done(s, e)
})().catch(console.error)
function Checkfile() {
    console.log('检查文件 ' + filePath + ' 是否存在')
    if (!fs.existsSync(filePath)) {
        console.log('文件 ' + filePath + ' 不存在，开始创建...')
        try {
            fs.writeFileSync(filePath, '', 'utf-8');
            console.log('文件 ' + filePath + ' 已成功创建');
        } catch (err) {
            console.error('创建文件时出错:', err);
        }
    } else {
        console.log('文件 ' + filePath + ' 已存在，无需创建');
    }
    console.log('开始删除 ' + filePath + ' 文件...')
    fs.unlinkSync(filePath)
    console.log('文件 ' + filePath + ' 删除成功')
}

function done(s, e) {
    const el = (e - s) / 1000
    console.log(`\n[任务执行完毕 ${CodeName}] 耗时：${el.toFixed(2)}秒`)
    process.exit(0)
}

function wait(seconds) {
    //console.log(`等待 ${seconds} 秒`)
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function ts(type = false, _data = "") {
    let myDate = new Date()
    let a = ""
    switch (type) {
        case 10:
            a = Math.round(new Date().getTime() / 1000).toString()
            break
        case 13:
            a = Math.round(new Date().getTime()).toString()
            break
        case "h":
            a = myDate.getHours()
            break
        case "m":
            a = myDate.getMinutes()
            break
        case "y":
            a = myDate.getFullYear()
            break
        case "h":
            a = myDate.getHours()
            break
        case "mo":
            a = myDate.getMonth()
            break
        case "d":
            a = myDate.getDate()
            break
        case "ts2Data":
            if (_data != "") {
                time = _data
                if (time.toString().length == 13) {
                    let date = new Date(time + 8 * 3600 * 1000)
                    a = date.toJSON().substr(0, 19).replace("T", " ")
                } else if (time.toString().length == 10) {
                    time = time * 1000
                    let date = new Date(time + 8 * 3600 * 1000)
                    a = date.toJSON().substr(0, 19).replace("T", " ")
                }
            }
            break
        default:
            a = "未知错误,请检查"
            break
    }
    return a
}

function randomString(length, options = { xx: true, dx: true, sz: true }) {
    let charset = ""
    if (options.xx) {
        charset += "abcdefghijklmnopqrstuvwxyz"
    }
    if (options.dx) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    }
    if (options.sz) {
        charset += "0123456789"
    }
    let res = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length)
        res += charset.charAt(randomIndex)
    }
    return res
}





function aesEncrypt(t,k) {
    function generateKeyAndIV() {
        let timestamp = Date.parse(new Date).toString();
        timestamp = timestamp.substr(0, 10);
        let keyPart = timestamp.slice(-2) + timestamp.slice(2, 8) + timestamp.slice(0, 2);
        return {
            key: k + keyPart,//
            iv: btoa(keyPart),  // Base64
        };
    }

    let encryptionInfo = generateKeyAndIV();
    let key = CryptoJS.enc.Utf8.parse(encryptionInfo.key);
    let iv = CryptoJS.enc.Utf8.parse(encryptionInfo.iv);
    let plainText = CryptoJS.enc.Utf8.parse(t);

    let encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    });

    return {
        encryptedText: encrypted.toString(),
        iv: encryptionInfo.iv,
    };
}