NAME = `找找看`
VALY = ['zzk_cookie']

$ = TomEnv()
CK = ''

LOGS = 1 //0 日志
DECODE = 1 //0 cookie解码

class Bar {
  constructor(str) {
    this.cookie = str
    //this.ckck = $.rtjson(str, '&', '=', 1)
  }

  async user_info() {
    let data = await $.task(`post`, `https://qfapi.zzk.cn/wap_api/public/index`, { Cookie: this.cookie }, 'data=%7B%7D')
    // console.log('data: ', data);
    if (data.debug == 0) {
      this.login = true
      this.nickname = data.user.username //名字
      this.phone = data.user.phone //号码
      this.bearerToken = data.user.bearerToken
      console.log(`用户:${this.nickname} -- ${this.phone} 获取token成功`)
    } else {
      this.login = false
      console.log(`获取token失败`)
    }
  }
  async user_sign() {
    if (this.login == true) {
      let data = await $.task(`get`, `https://qfapi.zzk.cn/store/assign/sign`, { Authorization: `Bearer ${this.bearerToken}` })
      if (data.ret == 0) {
        console.log(`用户:${this.nickname}  签到成功`)
      }
    }
  }
  async user_draw_list() {
    if (this.login == true) {
      let body = `{"page":1}`
      let headers = await this.head(body)
      let data = await $.task(`post`, `https://qfapi.zzk.cn/v5_0/evnelope/user-evnelope`, headers, body)
      if (data.ret == 0) {
        for (let is of data.data) {
          if (is.status == 1) {
            let user_envelope_id = is.user_envelope_id
            let envelope_id = is.envelope_id
            let body = `{"envelop_id":${envelope_id},"from_list":1,"user_envelope_id":${user_envelope_id},"source":"","scheme":""}`
            let headers = await this.head(body)
            let datas = await $.task(`post`, `https://qfapi.zzk.cn/v5_0/evnelope/consume-v2`, headers, body)
            console.log(`用户:${this.nickname}  领取红包====成功`)
            await $.wait(3000)
          }
        }
        // console.log(`用户:${this.nickname}  签到成功，获得: ${data.data.reward.cash} 元`)
      }
    }
  }
  async task_List() {
    if (this.login == true) {
      let data = await $.task(`get`, `https://www.app.zzk.cn/v5_0/encourage/index`, { Cookie: this.cookie, Referer: 'https://www.app.zzk.cn/inspire-view/taskCenter/index' })
        // console.log(data)
        console.log(`用户:${this.nickname}  现金余额：${data.data.encourage}`)
      for (let is of data.data.list) {
        if (is.title == '每日签到' && is.type == 0) {
          this.user_sign()
        } else if (is.desc == '每日参与浏览，即可获得奖励' && is.btn_type != 3) {
          this.read_number_i = Number(is.title.split('(')[1].split(')')[0].split('/')[0])
          this.read_number_o = Number(is.title.split('(')[1].split(')')[0].split('/')[1])
          console.log('每日浏览：' + this.read_number_i + '/' + this.read_number_o)
          this.task_view = false
          await this.user_taskList()
        } else if (is.desc == '每日参与点赞，即可获得奖励' && is.btn_type != 3) {
          this.read_number_i = Number(is.title.split('(')[1].split(')')[0].split('/')[0])
          this.read_number_o = Number(is.title.split('(')[1].split(')')[0].split('/')[1])
          console.log('每日点赞：' + this.read_number_i + '/' + this.read_number_o)
          this.task_like = false
          await this.user_taskList()
        }
      }
    }
  }
  async user_taskList() {
    if (this.login == true) {
      let data = await $.task(`get`, `https://qfapi.zzk.cn/v5_0/home/tab-data?area_code=&channel_id=5&city=&cursor=0&page=${$.RT(1, 9)}&tab_id=15`, { Authorization: `Bearer ${this.bearerToken}` })
      //  console.log(data.data.feed)  文章id
      this.read_list = []
      for (let is of data.data.feed) {
        let title = is.data.title
        let id = is.data.id
        this.read_list.push(id + '#' + title)
      }
      console.log(`用户:${this.nickname}  获取文章列表成功`)
      await this.user_taskLists()
    }
  }
  async user_taskLists() {
    if (this.login == true) {
      for (let i = this.read_number_i; i < this.read_number_o; i++) {
        let dd = $.RT(0, this.read_list.length)
        let id = this.read_list[dd].split('#')[0]
        let title = this.read_list[dd].split('#')[1]
        let headers = await this.head()
        let data = await $.task(`get`, `https://qfapi.zzk.cn/v5_0/wap/view-thread-advance?tid=${id}&isSeeMaster=0&replyOrder=0&viewpid=0&supportOrder=2&isAdmin=0`, headers)
        if (data.data.params) {
          let touid = data.data.params.touid
          if (this.task_view == false) {
            let body = `{"tid":${id},"circle":${i + 1}}`
            let headers = await this.head(body)
            let datas = await $.task(`post`, `https://qfapi.zzk.cn/v5_0/encourage/task-view-complete`, headers, body)
            if (datas.ret == 0) {
              await $.wait($.RT(1000, 3000))
              console.log(`用户:${this.nickname}  阅读==${title}==成功`)
              await $.wait($.RT(15000, 20000))
            } else {
              console.log(`用户:${this.nickname}  阅读 失败 手速太快了哦`)
              await $.wait($.RT(20000, 30000))
            }
          }
          if (this.task_like == false) {
            let body = `{"tid":${id},"touid":${touid},"type":1,"threadtitle":"${title}","position":1}`
            let headers = await this.head(body)
            let datai = await $.task(`post`, `https://qfapi.zzk.cn/v5_0/forum/ping-thread`, headers, body)
            if (datai.ret == 0) {
              console.log(`用户:${this.nickname}  点赞==${title}==成功`)
            } else {
              console.log(`用户:${this.nickname}  点赞==${title}==` + datai.text)
            }
          }
        }
      }
    }
  }

  async head(body) {
    let nonce = $.randomString(32, 1)
    let time = $.time(13)
    if (body == '') {
      this.sign = $.MD5Encrypt(1, nonce + '5e9cd6bf0aff497aa5dfc9ae9ca37564' + time)
    } else {
      this.sign = $.MD5Encrypt(1, body + nonce + '5e9cd6bf0aff497aa5dfc9ae9ca37564' + time)
    }
    let headers = {
      'User-Agent': `Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/18C66;QianFan;ZHAOZHAOKAN;iOS;iPhone 7;iOS 14.3`,
      Cookie: this.cookie,
      nonce: nonce,
      timestamp: time,
      codeSign: this.sign,
      Authorization: 'Bearer ' + this.bearerToken,
    }
    return headers
  }
}