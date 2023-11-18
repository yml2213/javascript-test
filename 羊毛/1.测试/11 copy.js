/*
@蛋炒饭
App：七读小说
变量名：qdxsck
变量：开宝箱，找到https:/1m/zycl/gold/receiveV5?开头的连接，从usr到zysid的值，多账号换行
ck要包含'usr','p1','p2','p3','p4','p5','p7','p9','p16','p21','p22','p25','p26','p28','p29','p30','p31','p33','p34','d1','zyeid','ku','kt','smboxid'
定时：一个小时一次，跑10次一天就行
SJ是每天跑bug的时间，自己定义，默认9点
*/
let SJ_1 = 18
NAME = `七读小说`; VALY = ['qdxsck']
CK = 'usr=j174924563&rgt=7&p1=ZRAJM7m2BL0DAPfjgEB6zhVv&p2=136002&p3=25026056&p4=501656&p5=19&p7=__f9267e3c57362c76&p9=1&p16=M2102J2SC&p21=1303&p22=12&p25=25026056&p26=31&p28=e998cb31be347dc0&p29=&p30=&p31=__f9267e3c57362c76&p34=Xiaomi&p33=com.dj.sevenRead&d1=5.2.6&zyeid=99be9153-79fb-4d45-bf1d-b885d4983977&pca=channel-visit&ku=j174924563&kt=daada922b19c570b4419231f85fa2040&firm=Xiaomi&param=50&sign=M5AZDKybzwfpiEqTC/rM+gjj3oDX95wVF+t4Nz3CLOtPLdRGaZaUkD1yrR3XFGxEzm7ACtgtWKQIYhSxtqvB6hGDZXRTHa6SaejMXxXthbNgBfOFpTuIx5jO0SIQ2vN0ThWrZ7AJXCZ0vW2Kf6eqOI3azV+uQWa82YxTp/SjQ10=&timestamp=1695549820666&type=9&param=50&smboxid=BiR4%2BeJahIraXyllbYj8%2BSFlOa5nIkomK0sq5XhkZ%2F%2BIX%2FLc%2FtYo%2FWUnlLC2L6wlMC6%2BWeaCjG5VwoxFuQdDvTg%3D%3D'
LOGS = 0; usid = 0
var rs = require("jsrsasign")
nowhour = Math.round(new Date().getHours()).toString()
Notify = 0
Key = `-----BEGIN PRIVATE KEY-----
MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMXGjyS3p+3AVnlBJe5VQ6tC9inh8tVBve4r+yBjC5HQD6th2n3tSyuNVYaNRAFSEq+OENwnwwhjbYUnjLWb+qZscB43K1+4/WlKdvfgwQVXm0ZQ2+jMBf+165UBEEuuWT2WqXeKkkUqPQta5lrt4eFfbo53JcOO4D5fDSGQS5bZAgMBAAECgYAor4I/AXEQXeLsKtTMxMmY77uIPi0gZdfWqUGOFhIJOw4eKZEzGp++I+MWPPVieCnT55vcTmm2zg13uP0fVykmukWqZszG/ZNpPKYleOqnZOqQj7O3au8Ywz18F/pqD++PsUzxRVeXxSOOwmjQ0D2Pe/9yutz62pyiFGAzDsaI6QJBAMn8DeBT3AtcWuONdiHL3yC4NkGJDdyBbMOaWyvrcvUUZr13uS9mZO6pLTN6v9tkmPUdvYxcPTJ9wdGR7NcNPDsCQQD6qluGI2VAlz4s5UoDnelFKrwDPeiruE3I6wsrasK6h37DsAE6OrQgx2dm4yH7ntJHUlJCZ5ay1EBNfEexgQv7AkA1r2vUwxVKY7q4nqHWa8SbgrrRAmePw0qwVreC3erJHyoLk+XBpnqPQKIF+8tAueU5yTTXOLD/WZOJazrDEf5/AkBpwG+Ggu5Xtrcbd8ynA/sDHElf0MGVmNbwOgFnWs42pa1cX6fU6ilOXvIH3TFcF6A9SMS9kThpz9QlHJaek4P7AkAavQillA/wnrha9GsK5UFmzmwNfkjLLW4psAUsXOsqFXWMoxTd0xWuSbuVOzERpbFMBl1VoZQmD9BLSVOTNe+v
-----END PRIVATE KEY-----`

function gogogo(o, array, str) {
  const urlObject = new URL("http://test.com?" + str)
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    o[element] = urlObject.searchParams.get(element)
  }
}

class Bar {
  constructor(str) {
    this._ = ++usid
    this.f = `小主 [${this._}] `
    let arr = ['usr', 'p1', 'p2', 'p3', 'p4', 'p5', 'p7', 'p9', 'p16', 'p21', 'p22', 'p25', 'p26', 'p28', 'p29', 'p30', 'p31', 'p33', 'p34', 'd1', 'zyeid', 'ku', 'kt', 'smboxid']
    gogogo(this, arr, str)
    this.message = ''
    this.logs = true
  }

  //签到
  async signin() {
    let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/dailyWelfareV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=3&p16=${this.p16}&p22=10&p25=${this.p25}&p26=29&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&kt=${this.kt}&firm=Xiaomi&source=welfare&signType=2&ecpmMix=0.0&ecpmVideo=0.0&mcTacid=13065&smboxid=${this.smboxid}`, {})
    console.log(datas)
  }
  //签到视频奖励
  async signinvideo() {
    let ts = $.time(13)
    let sig = encodeURIComponent($.Sha1withRsa(`position=SIGN_WINDOW_VIDEO&timestamp=${ts}&usr=${this.usr}`, Key))
    let body = `usr=${this.usr}&sign=${sig}&position=SIGN_WINDOW_VIDEO&timestamp=${ts}`
    let datas = await $.task('post', `https://saad.ms.zhangyue.net/rewarded-video/report?app_id=10116&zysid=${this.zysid}&usr=${this.usr}&rgt=&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=19&p7=${this.p7}&p9=3&p16=${this.p16}&p21=${this.p21}&p22=9&p25=${this.p25}&p26=28&p28=${this.p28}&p29=${this.p29}&p30=__&p31=${this.p31}&p33=${this.p33}&bookId=null&chapterId=null&appId=10114&id=101052&ext=&extraSourceId=0&extraSignDay=0`, {}, body)
    if (datas.code == 0) {
      console.log(`${this.f}签到视频观看成功`)
    }
  }
  //看视频领金币
  async video() {
    let ts = $.time(13)
    let sig = $.Sha1withRsa(`p2=${this.p2}&param=10348&timestamp=${ts}&usr=${this.usr}`, Key)
    let body = `usr=${this.usr}&sign=${sig}&position=VIDEO_BANK&timestamp=${ts}`
    let datas = await $.task('post', `https://dj.palmestore.com/zycl/gold/receiveV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&kt=${this.kt}&firm=Xiaomi&param=10348&sign=${sig}&timestamp=${ts}&type=1002&param=10348&smboxid=${this.smboxid}`, {})
    if (datas.code == 0) {
      console.log(`${this.f}看视频领金币--成功，获得${datas.body.coin}金币`)
    }
  }
  //刷视频
  async videobox() {
    for (let aa of [10132, 10150, 10152, 10182, 10190, 10272, 10330, 10331, 10365, 10410, 10423, 10819, 10988]) {
      let ts = $.time(13)
      let sig = $.Sha1withRsa(`p2=${this.p2}&param=${aa}&timestamp=${ts}&usr=${this.usr}`, Key)
      let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/noticeVideoV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&firm=Xiaomi&param=${aa}&sign=${sig}&timestamp=${ts}&pos=VIDEO_POP_WINDOW&param=${aa}&smboxid=${this.smboxid}`, {})
      if (datas.code == 0) {
        console.log(`${this.f}刷视频---成功，获得${datas.body.goldNum}金币`)
        await $.wait($.RT(5000, 15000))
      }
    }
  }
  async videobox2() {
    for (let i = 0; i < 10; i++) {
      let ts = $.time(13)
      let sig = $.Sha1withRsa(`p2=${this.p2}&param=10047&timestamp=${ts}&usr=${this.usr}`, Key)
      let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/noticeVideoV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&firm=Xiaomi&param=10047&sign=${sig}&timestamp=${ts}&pos=VIDEOSIGNNEW&param=10047&smboxid=${this.smboxid}`, {})
      if (datas.code == 0) {
        console.log(`${this.f}刷视频2---成功，获得${datas.body.goldNum}金币`)
      }
    }
  }
  //看7个视频
  async video8(num) {
    for (let bb = 0; bb < 10; bb++) {
      let ts = $.time(13)
      let sjs = $.SJS(1, 2) + '.' + $.SJS(2, 2)
      let sig = $.Sha1withRsa(`ecpm=${sjs}&timestamp=${ts}&type=1&usr=${this.usr}`, Key)
      let datas = await $.task('get', `https://dj.palmestore.com/zycl/api/gold/moneyChallengeReport?&ecpm=${sjs}&usr=${this.usr}&sign=${sig}&type=1&timestamp=${ts}&zyeid=${this.zyeid}&usr=${this.usr}&rgt=7&p1=${this.p1}&ku=${this.ku}&kt=${this.kt}&pc=10&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=19&p7=${this.p7}&p9=3&p12=&p16=${this.p16}&p21=2010&p22=13&p25=${this.p25}&p26=33&p28=${this.p28}&p30=&p31=${this.p31}&p33=${this.p33}&p34=${this.p34}&firm=Xiaomi&d1=5.2.4`, {})
      if (datas.code == 0) {
        console.log(`${this.f}看视频8---成功，获得${datas.conf.receiveMoney}金币`)
        // await $.wait ($.RT(5000,15000))
      }
    }
  }

  //开宝箱
  async openbox() {
    let ts = $.time(13)
    let sig = $.Sha1withRsa(`p2=${this.p2}&param=50&timestamp=${ts}&usr=${this.usr}`, Key)
    let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/receiveV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&kt=${this.kt}&firm=Xiaomi&param=50&sign=${sig}&timestamp=${ts}&type=9&param=50&smboxid=${this.smboxid}`, {})
    if (datas.code == 0) {
      console.log(`${this.f}开宝箱成功，获得${datas.body.coin}金币`)
      await this.boxvideo()
    }
  }
  //宝箱视频
  async boxvideo() {
    let ts = $.time(13)
    let sig = $.Sha1withRsa(`p2=${this.p2}&param=10182&timestamp=${ts}&usr=${this.usr}`, Key)
    let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/noticeVideoV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&kt=${this.kt}&firm=Xiaomi&param=10182&sign=${sig}&timestamp=${ts}&pos=VIDEO_POP_WINDOW&param=10182&smboxid=${this.smboxid}`, {}, `=`)
    if (datas.code == 0) {
      console.log(`${this.f}宝箱视频,获得${datas.body.goldNum}金币`)
    } else {
      console.log(`${this.f}宝箱视频${datas.msg}`)
    }
  }
  //账户信息
  async userinfo() {
    let datas = await $.task('get', `https://dj.palmestore.com/zycl/gold/indexRefreshV5?usr=${this.usr}&rgt=7&p1=${this.p1}&p2=${this.p2}&p3=${this.p3}&p4=${this.p4}&p5=${this.p5}&p7=${this.p7}&p9=${this.p9}&p16=${this.p16}&p21=${this.p21}&p22=${this.p22}&p25=${this.p25}&p26=${this.p26}&p28=${this.p28}&p31=${this.p31}&p34=${this.p34}&p33=${this.p33}&zyeid=${this.zyeid}&pca=channel-visit&ku=${this.ku}&kt=${this.kt}&firm=Xiaomi`, {})
    if (datas.code == 0) {
      console.log(`${this.f}余额${datas.body.coinAmount.amountTag}`)
      this.message += `${this.f}余额${datas.body.coinAmount.amountTag}`
    }
  }





















} $ = DD()
!(async () => {
  console.log(NAME)
  await $.ExamineCookie()
  await $.Multithreading('signin')
  if (nowhour == SJ_1) {
    await $.Multithreading('videobox')
    await $.Multithreading('videobox2')
  }
  await $.Multithreading('video8')
  await $.Multithreading('openbox')
  await $.Multithreading('video')
  await $.Multithreading('userinfo')
  let message = []
  for (let user of $.cookie_list) {
    if (user.message) message.push(user.message)
  }
  if (message.length > 0) await $.SendMsg(message.join('\n'))
})()
  .catch(e => { console.log(e) })
  .finally(() => { })


function DD() {
  return new (class {
    constructor() {
      this.cookie_list = []
      this.message = ''
      this.CryptoJS = require('crypto-js')
      this.NodeRSA = require('node-rsa')
      this.request = require('request')
      this.Sha_Rsa = require('jsrsasign')
    }
    //多线程
    async Multithreading(taskName, id, thread) {
      let workGroup = []
      if (!thread) {
        thread = 1
      }
      while (thread--) {
        for (let user of $.cookie_list) {
          workGroup.push(user[taskName](id))
        }
      }
      await Promise.allSettled(workGroup)
    }
    //变量检查
    ExamineCookie() {
      let ckStr = process.env[VALY] || CK
      let userCount = 0
      if (ckStr) {
        for (let userCookies of ckStr.split('\n').filter(x => !!x)) {
          $.cookie_list.push(new Bar(userCookies))
        }
        userCount = $.cookie_list.length
      } else {
        console.log(`\n【${NAME}】：未填写变量: ${VALY}`)
      }
      console.log(`共找到${userCount}个账号`)
      return $.cookie_list
    }
    // 运行模块 get post put delete patch head options
    task(method, taskurl, taskheader, taskbody, taskhost) {
      if (method == 'delete') {
        method = method.toUpperCase()
      } else {
        method = method
      }
      if (method == 'post') {
        delete taskheader['content-type']
        delete taskheader['Content-type']
        delete taskheader['content-Type']
        if ($.safeGet(taskbody)) {
          taskheader['Content-Type'] = 'application/json;charset=UTF-8'
        } else {
          taskheader['Content-Type'] = 'application/x-www-form-urlencoded'
        }
        if (taskbody) {
          taskheader['Content-Length'] = $.lengthInUtf8Bytes(taskbody)
        }
      }
      if (method == 'get') {
        delete taskheader['content-type']
        delete taskheader['Content-type']
        delete taskheader['content-Type']
        delete taskheader['Content-Length']
      }
      taskheader['Host'] = taskurl['replace']('//', '/')['split']('/')[1]
      return new Promise(async resolve => {
        if (method.indexOf('T') < 0) {
          var httpget = {
            url: taskurl,
            headers: taskheader,
            body: taskbody,
            //timeout: 6000,
            proxy: 'http://' + taskhost,
          }
        } else {
          var httpget = {
            url: taskurl,
            headers: taskheader,
            form: JSON.parse(taskbody),
            //timeout: 6000,
            proxy: 'http://' + taskhost,
          }
        }
        if (!taskhost) {
          delete httpget['proxy']
        }
        this.request[method.toLowerCase()](httpget, (err, response, data) => {
          try {
            if (data) {
              if (LOGS == 1) {
                console.log(`================ 请求 ================`)
                console.log(httpget)
                console.log(`================ 返回 ================`)
                if ($.safeGet(data)) {
                  console.log(JSON.parse(data))
                } else {
                  console.log(data)
                }
              }
            }
          } catch (e) {
            console.log(e, taskurl + '\n' + taskheader)
          } finally {
            let datas = ''
            if (!err) {
              if ($.safeGet(data)) {
                datas = JSON.parse(data)
              } else if (data.indexOf('/') != -1 && data.indexOf('+') != -1) {
                //datas = $.decrypts(data)
                datas = data
              } else {
                datas = data
              }
            } else {
              datas = taskurl + '   API请求失败，请检查网络重试\n' + err
            }
            return resolve(datas)
          }
        })
      })
    }
    parseHTML(htmlString) {
      const cheerio = require('cheerio')
      const $ = cheerio.load(htmlString)

      // 创建空数组来存储提取的数据
      const data = []

      // 提取任务模块
      const taskModules = $('.task_module')

      // 遍历每个任务模块
      taskModules.each((index, element) => {
        const taskModule = $(element)

        // 提取标题
        const title = taskModule.find('.welfare_title h1').text()

        // 提取任务列表
        const tasks = taskModule.find('.task_list .list_item')

        const tasksData = []

        // 遍历每个任务
        tasks.each((taskIndex, taskElement) => {
          const task = $(taskElement)
          const taskName = task.find('.task_name').text().trim()
          const taskReward = task.find('.havegold').text().trim()
          const taskOther = task.find('.task_other').text().trim()
          const taskObj = {
            name: taskName,
            reward: taskReward,
            other: taskOther
          }
          tasksData.push(taskObj)
        })
        const moduleObj = {
          title: title,
          tasks: tasksData
        }
        data.push(moduleObj)
      })
      return data
    }
    async SendMsg(message) {
      if (!message) return
      if (Notify == 1) {
        var notify = require("./sendNotify")
        await notify.sendNotify(NAME, message)
      } else {
        //  console.log(message);
      }
    }
    //body长度
    lengthInUtf8Bytes(str) {
      let m = encodeURIComponent(str).match(/%[89ABab]/g)
      return str.length + (m ? m.length : 0)
    }
    //随机数组
    randomArr(arr) {
      return arr[parseInt(Math.random() * arr.length, 10)]
    }
    //延迟
    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }
    //当前时间戳s=10位时间戳或13位时间戳
    time(s) {
      if (s == 10) {
        return Math.round(+new Date() / 1000)
      } else {
        return +new Date()
      }
    }
    //时间戳格式化日期
    timenow(str) {
      let date = new Date()
      if (str == undefined) {
        let date = new Date(),
          N = date.getFullYear() + '-',
          Y = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
          R = date.getDate() + ' ',
          S = date.getHours() + ':',
          F = date.getMinutes() + ':',
          M = date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
        return N + Y + R + S + F + M
      } else if (str == 0) {
        //年
        return date.getFullYear()
      } else if (str == 1) {
        //月
        return date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      } else if (str == 2) {
        //日
        return date.getDate()
      } else if (str == 3) {
        //时
        return date.getHours()
      } else if (str == 4) {
        //分
        return date.getMinutes()
      } else if (str == 5) {
        //秒
        return date.getSeconds() + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
      }
    }
    //数据检查
    safeGet(data) {
      try {
        if (typeof JSON.parse(data) == 'object') {
          return true
        }
      } catch (e) {
        return false
      }
    }
    //随机字符
    SJS(len, t) {
      if (t == 0) {
        let chars = 'QWERTYUIOPASDFGHJKLZXCVBNM01234567890123456789'
        let maxLen = chars.length
        let str = ''
        for (let i = 0; i < len; i++) {
          str += chars.charAt(Math.floor(Math.random() * maxLen))
        }
        return str
      } else if (t == 1) {
        let chars = 'qwertyuiopasdfghjklzxcvbnm0123456789'
        let maxLen = chars.length
        let str = ''
        for (let i = 0; i < len; i++) {
          str += chars.charAt(Math.floor(Math.random() * maxLen))
        }
        return str
      } else {
        let chars = '0123456789'
        let maxLen = chars.length
        let str = ''
        for (let i = 0; i < len; i++) {
          str += chars.charAt(Math.floor(Math.random() * maxLen))
        }
        return str
      }
    }
    //随机$.udid  0=大写  1=小写
    udid(str) {
      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      let uuid = S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
      if (str == 0) {
        return uuid.toUpperCase()
      } else {
        return uuid.toLowerCase()
      }
    }
    //  .toUpperCase()  转化大写
    //  .toLowerCase()  转化小写
    //console.log(...new Set(arr))去重
    //KEY = [...new Set(KEY.filter(item => !!item))]
    //filter(item => !!item) 过滤1!=1
    //Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组。
    //es编码  escape("中文")
    //es解码  unescape("%u4E2D%u6587")
    //URI编码  encodeURI("中文") 不完全
    //URI解码  decodeURI("%E4%B8%AD%E6%96%87")  不完全
    //URIC编码  encodeURIComponent("中文")
    //URIC解码  decodeURIComponent("%E4%B8%AD%E6%96%87")
    //str编码
    encodeUnicode(str) {
      var res = []
      for (var i = 0; i < str.length; i++) {
        res[i] = ('00' + str.charCodeAt(i).toString(16)).slice(-4)
      }
      return '\\u' + res.join('\\u')
    }
    base64ToHex(base64) {
      const binaryStr = atob(base64)
      const uint8Array = new Uint8Array(binaryStr.length)
      for (let i = 0; i < binaryStr.length; i++) {
        uint8Array[i] = binaryStr.charCodeAt(i)
      }
      let hex = ""
      for (let i = 0; i < uint8Array.length; i++) {
        const byte = uint8Array[i].toString(16).padStart(2, "0")
        hex += byte
      }
      return hex
    }

    //str解码
    decodeUnicode(str) {
      str = str.replace(/\\u/g, '%u')
      return unescape(unescape(str))
    }
    RT(X, Y) {
      return Math.round(Math.random() * (Y - X) + X)
    }
    //去除数组空值 console.log($.arrNull(['A', '', 'B', null, undefined, 'C', '  ']))
    arrNull(arr) {
      var r = arr.filter(s => {
        return s && s.trim()
      })
      return r
    }
    //国际标准时间
    nowtime() {
      return new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + 8 * 60 * 60 * 1000)
    }
    //日期格式化时间戳
    timecs() {
      let newtime = $.nowtime()
      if (JSON.stringify(newtime).indexOf(' ') >= 0) {
        newtime = newtime.replace(' ', 'T')
      }
      return new Date(newtime).getTime() - 8 * 60 * 60 * 1000
    }
    //键值对转json  $.rtjson(str, '&', '=',1)
    rtjson(input, apart, apart2, i) {
      if (i == 0) {
        return JSON.stringify(
          input.split(apart).reduce((sum, item) => {
            let temp = item.split(apart2)
            sum[temp[0].trim()] = temp[1].trim()
            return sum
          }, {})
        )
      } else {
        return input.split(apart).reduce((sum, item) => {
          let temp = item.split(apart2)
          sum[temp[0].trim()] = temp[1].trim()
          return sum
        }, {})
      }
    }
    //md5加密 0=32位小写,1=32位大写,2=中间16位小写,3=中间16位大写
    MD5Encrypt(i, str) {
      if (i == 0) {
        return this.CryptoJS.MD5(str).toString().toLowerCase()
      } else if (i == 1) {
        return this.CryptoJS.MD5(str).toString().toUpperCase()
      } else if (i == 2) {
        return this.CryptoJS.MD5(str).toString().substring(8, 24).toLowerCase()
      } else if (i == 3) {
        return this.CryptoJS.MD5(str).toString().substring(8, 24).toUpperCase()
      }
    }
    //SHA类：SHA1,SHA3,SHA224,SHA256,SHA384,SHA512,RIPEMD160
    //SHA类加密方式  使用：SHA_Encrypt(0, 'SHA1', str) 或 SHA_Encrypt(1,'SHA256', str)
    //0表示加密后编码，1直接使用hex格式
    SHA_Encrypt(i, Encrypt, str) {
      if (i == 0) {
        return this.CryptoJS[Encrypt](str).toString(this.CryptoJS.enc.Base64)
      } else {
        return this.CryptoJS[Encrypt](str).toString()
      }
    }
    //HmacSHA类：HmacSHA1,HmacSHA3,HmacSHA224,HmacSHA256,HmacSHA384,HmacSHA512,HmacRIPEMD160
    //0表示加密后编码，1直接使用hex格式
    //SHA类加密方式  使用：SHA_Encrypt(0,'HmacSHA1', str,key) 或 SHA_Encrypt(1,'HmacSHA256', str,key)
    HmacSHA_Encrypt(i, Encrypt, str, key) {
      if (i == 0) {
        return this.CryptoJS[Encrypt](str, key).toString(this.CryptoJS.enc.Base64)
      } else {
        return this.CryptoJS[Encrypt](str, key).toString()
      }
    }
    //Base64 0=编码 1=解码
    Base64(i, str) {
      if (i == 0) {
        return this.CryptoJS.enc.Base64.stringify(this.CryptoJS.enc.Utf8.parse(str))
      } else {
        return this.CryptoJS.enc.Utf8.stringify(this.CryptoJS.enc.Base64.parse(str))
      }
    }
    //AES/DES加解密 0=加密  1=解密
    //使用方法：DecryptCrypto(`0`,`AES`, `ECB`, `Pkcs7`, data, 'key', 'iv')
    DecryptCrypto(i, method, mode, padding, data, key, iv) {
      if (i == 0) {
        const encrypted = this.CryptoJS[method].encrypt(this.CryptoJS.enc.Utf8.parse(data), this.CryptoJS.enc.Utf8.parse(key), {
          iv: this.CryptoJS.enc.Utf8.parse(iv),
          mode: this.CryptoJS.mode[mode],
          padding: this.CryptoJS.pad[padding],
        })
        return encrypted.toString()
      } else {
        const decrypt = this.CryptoJS[method].decrypt(data, this.CryptoJS.enc.Utf8.parse(key), {
          iv: this.CryptoJS.enc.Utf8.parse(iv),
          mode: this.CryptoJS.mode[mode],
          padding: this.CryptoJS.pad[padding],
        })
        return decrypt.toString(this.CryptoJS.enc.Utf8)
      }
    }
    //RSA加密
    RSA(msg, Key) {
      const NodeRSA = require('node-rsa')
      let nodersa = new NodeRSA('-----BEGIN PUBLIC KEY-----\n' + Key + '\n-----END PUBLIC KEY-----')
      nodersa.setOptions({ encryptionScheme: 'pkcs1' })
      return nodersa.encrypt(msg, 'base64', 'utf8')
    }
    getSHA256withRSA(content) {
      const key = rs.KEYUTIL.getKey(privateKeyString)
      const signature = new rs.KJUR.crypto.Signature({ alg: "SHA1withRSA" })
      signature.init(key)
      signature.updateString(content)
      const originSign = signature.sign()
      const sign64u = rs.hextob64u(originSign)
      return sign64u
    }
    hexToBase64(hex) {
      const bytes = []
      for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16))
      }
      const base64 = btoa(String.fromCharCode(...bytes))
      return base64
    }
    Sha1withRsa(data) {
      const { KEYUTIL, KJUR, b64utoutf8, utf8tob64 } = require('jsrsasign')
      const key = KEYUTIL.getKey(Key)
      const sig = new KJUR.crypto.Signature({ alg: 'SHA1withRSA' })
      sig.init(key)
      sig.updateString(data)
      const signatureHex = sig.sign()
      let sign = $.hexToBase64(signatureHex)
      return sign
    }
  })()
}