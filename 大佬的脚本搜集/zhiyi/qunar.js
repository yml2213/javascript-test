const cookieName = '去哪儿'
const cookieKey = "_q=U.ukfzycx7636; _s=s_37BUXELXL6GMGQJNH7WNZOOXCA; _t=27429998; _v=kWWe9aZkP11ohy6x8waipvLqEc2J2ttkYP90eOCGKxjRSmFFnfC-THgxOUNMIzp1XZ2YtaGO9OLNg8Y5Tl3q27bZQaWMSK8hQpMSLw_ZBvQ1Ivvny8p89qPkizANXoNRJNlNC_Pg-WZkFQmghSZP9r0rGaZ7SA4M0O2G67i5ZqJI; csrfToken=W270jcyK0zSbiq7; QN271=1c8bf68f-5d8d-4c31-a566-25dc1ccd905f; QN270=D65E75AC-E533-4CA9-B04E-80A3D6412625%2C80011249%2CC1001%2CD3462CF3-1B75-E0E6-2023-44B0AB8A608D%2C10010%2CD65E75AC-E533-4CA9-B04E-80A3D6412625; q_ckey=dT11a2Z6eWN4NzYzNiZrPUM3MzA4ODVCNjQyMUUxM0VBMEU5OTk1OUMxOTE0RDkxJnQ9MTYxNTk2MzIyODk2OCZkPWVqYWJob3N0Mg==; QN233=; _i=DFiEud08EcA7NJV6-ez03UdW6f6w; _vi=DNz7ZUhus7gIax10LxJU_bTzNitiqnw7ae-EUNJbbu2ZR59DwaT8u9rxmXOha9XNtYHcque8mms_7OG1jowpc9K_dHGr-7XOfCW4FpTw2DVFKJKmJ9XChYItvV487YTJ1LoVxLuiJexQb4RspNG9xoGw5jcOGDRTgxPE-PnHZsWe; fid=6f332942-29a0-44a4-b88a-638e05cbba03; QN601=f9ddb5610a920c1fb6cfdbe29cbddf72; QN300=m.flight.qunar.com; QN48=tc_577b018e202a9e67_1783b78cfde_ae2f; QN1=G/a4t26k4JlyMM4o5RMzaA=="
const chavy = init()
const cookieVal = JSON.parse(chavy.getdata(cookieKey))

sign()

function sign() {
  let url = { url: `https://user.qunar.com/webapi/member/signNewIndex.htm`, headers: cookieVal }
  url.body = `channel=app&platform=ios`
  chavy.post(url, (error, response, data) => {
    chavy.log(`${cookieName}, data: ${data}`)
    let result = JSON.parse(data)
    const title = `${cookieName}`
    let subTitle = ``
    let detail = ``
    if (result.errcode == 200) {
      if (result.data.modalInfo.title) {
        subTitle = '签到结果: 成功'
        detail = `${result.data.unit}: ${result.data.preferential.counts}个, 共签: ${result.data.total}天, 连签: ${result.data.continuous}天, 说明: ${result.data.modalInfo.title}`
      } else {
        subTitle = '签到结果: 成功 (重复签到)'
        detail = `${result.data.unit}: ${result.data.preferential.counts}个, 共签: ${result.data.total}天, 连签: ${result.data.continuous}天`
      }
    } else {
      subTitle = '签到结果: 失败'
      detail = `编码: ${result.errcode}, 说明: ${result.errmsg}`
    }
    chavy.msg(title, subTitle, detail)
  })

  chavy.done()
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
