const axios = require("axios");
// const baseURL = "";
const qs = require("qs");
const fs = require("fs");
const dayjs = require("dayjs");
// 页码最大数
// const maxPage = 7166;
// let page = 6666;
let str = "";
let dataState = {};
axios.defaults.withCredentials = true;
let ua = "";
const timer = dayjs().format("YYYY-MM-DD");
let getNum = 0
const api = axios.create({
  withCredentials: true,
  timeout: 1000 * 60
});
function getList(page) {
  return new Promise((resolve, reject) => {
    api({
      url: baseURL,
      params: { page: page },
    }).then((res) => {
      resolve(res.data);
    });
  });
}

// getList();
async function getToken(ws, pages) {
  const tokenParams = await gent();
  api({
    method: "post",
    headers: {
      "User-Agent": ua,
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'charset': 'UTF-8',
      'accept-encoding': 'br,gzip,deflate',
      cookie: ws,
    },
    url: "https://api.m.jd.com/client.action",
    data: qs.stringify(
      {
        body: "%7B%22to%22%3A%22https%253a%252f%252fplogin.m.jd.com%252fjd-mlogin%252fstatic%252fhtml%252fappjmp_blank.html%22%7D&",
      },
      { encode: false }
    ),
    params: tokenParams,
  }).then((res) => {
    // if (res.data.tokenKey !== "xxx") {

    // }
    getCk(res.data.tokenKey, pages, ws);
  });
}

// 获取参数
function gent() {
  try {
    let urlList = [
      "https://shizuku.ml/",
      "http://43.135.90.23/",
    ];
    let URL = urlList[Math.floor(Math.random() * 2)];
    return new Promise((resolve, reject) => {
      api({
        method: "get",
        headers: {
          authorization: "Bearer Shizuku",
        },
        url: URL + "check_api",
      }).then((res) => {
        ua = res.data["User-Agent"];
        api({
          method: "get",
          headers: {
            authorization: "Bearer Shizuku",
            "User-Agent": ua,
          },
          url: URL + "genToken",
        }).then((res) => {
          resolve(res.data);
        });
      });
    });
  } catch (error) {

  }

}


// 获取ck
function getCk(tokenKey, pages, ws) {

  return new Promise((resolve, reject) => {
    api({
      method: "get",
      headers: {
        "User-Agent":
          "jdapp;iPhone;10.3.2;;;M/5.0;appBuild/167922;jdSupportDarkMode/0;ef/1;ep/%7B%22ciphertype%22%3A5%2C%22cipher%22%3A%7B%22ud%22%3A%22YWDwZQSnYWY4YJKmCQU3DWU5CNCzZtLrDzdwDtKzC2C1YJS3DNq5Dm%3D%3D%22%2C%22sv%22%3A%22CJUkCK%3D%3D%22%2C%22iad%22%3A%22GJK3DtdMGzGjCzK2HI00HOS0BUO3CNcjCOU0DuY4DOTLHUGy%22%7D%2C%22ts%22%3A1641734928%2C%22hdid%22%3A%22JM9F1ywUPwflvMIpYPok0tt5k9kW4ArJEU3lfLhxBqw%3D%22%2C%22version%22%3A%221.0.3%22%2C%22appname%22%3A%22com.360buy.jdmobile%22%2C%22ridx%22%3A-1%7D;Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1;",
        "content-type": "application/x-www-form-urlencoded; charset: UTF-8",
        "Accept-Language": "zh-cn",
        "request-from": "native",
        "X-Requested-with": "XMLHttpRequest",
      },
      url: `https://un.m.jd.com/cgi-bin/app/appjmp?tokenKey=${tokenKey}&to=https%3A%2F%2Fplogin.m.jd.com%2Fjd-mlogin%2Fstatic%2Fhtml%2Fappjmp_blank.html`,
      maxRedirects: 0,
    })
      .then((res) => {
        //   console.log(tokenKey);
        //   console.log(res.headers);
        //   console.log(res.status);
        resolve(res);
      })
      .catch((error) => {
        getNum++
        try {
          const cookie = JSON.stringify(error.response.headers["set-cookie"]);
          if (
            cookie.match(/pt_pin=([^; ]+)(?=;?)/) &&
            cookie.match(/pt_key=([^; ]+)(?=;?)/)[0].indexOf("app_openAA") != -1
          ) {
            str = `${cookie.match(/pt_pin=([^; ]+)(?=;?)/)[0]};${cookie.match(/pt_key=([^; ]+)(?=;?)/)[0]
              };`;
            // fs.appendFileSync("./ck" + pages + ".txt", str + "\r\n");
            // fs.appendFileSync("./wskey" + pages + ".txt", ws + "\r\n");
            verify(str, ws, pages);
          }
          // reject(error);
        } catch (error) {

        }

      });
  });
}

// 验证年兽是否黑号
function verify(ck, ws, pages) {
  // api.interceptors.request.use((config) => {
  //   config.headers["cookie"] = ck;
  //   return config;
  // });
  let num = "";
  for (var i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  axios({
    url: "https://api.m.jd.com/client.action/api?appid=jinlihongbao&functionId=jinli_h5assist&loginType=2&client=jinlihongbao&clientVersion=10.1.4&osVersion=-1",
    method: "post",
    headers: {
      "User-Agent":
        "Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1",
      cookie: ck,
      origin: "https://api.m.jd.com",
      referer:
        "https://h5.m.jd.com/babelDiy/Zeus/2NUvze9e1uWf4amBhe1AV6ynmSuH/index.html",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "com.jingdong.app.mall",
    },
    data:
      "body=" +
      escape(
        JSON.stringify({
          redPacketId: 429510538,
          followShop: 0,
          random: num,
          log: "42588613~8,~0iuxyee",
          sceneid: "JLHBhPageh5",
        })
      ),
  }).then((res) => {
    console.log(res.data.data.result.statusDesc);
    if (res.data.data.result.statusDesc != "活动太火爆") {
      fs.appendFileSync("./正常_11ck" + timer + ".txt", ck + "\r\n");
      fs.appendFileSync("./正常_11wskey" + timer + ".txt", ws + "\r\n");
      return;
    }
  });
}

async function main() {
  fs.readFile('wskey-test.json',
      // 读取文件完成时调用的回调函数
      function (err, data) {
        // json数据
        let jsonData = data;

        // 解析json
        let dataState = JSON.parse(jsonData);

        // console.log(jsonData)
        for (let k = 0; k < dataState.list.length; k++) {
          console.log('当前第' + (k + 1) + '个');
          sleep(500)
          console.log(dataState.list[k].token.replace(/1----/gi, ""))

          getToken(dataState.list[k].token.replace(/1----/gi, ""));


        }
      }
  );
}



// getToken(
//   "pin=jd_sImzJwdyqofP;wskey=AAJgm7F-AEBWlpzdAV-NhBsWQX4mRbeF7bSteydC7XALqyDk4HZQ4E-jSPnBydVDzKSYFWXUdKuIb-EA0sOsjCQyblxQHLcZ;",
//   1
// );
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
main();





//============================================================================================
function Env(t, e) {
  class s {
    constructor(t) {
      this.env = t
    }

    send(t, e = "GET") {
      t = "string" == typeof t ? {url: t} : t;
      let s = this.get;
      return "POST" === e && (s = this.post), new Promise((e, i) => {
        s.call(this, t, (t, s, r) => {
          t ? i(t) : e(s)
        })
      })
    }

    get(t) {
      return this.send.call(this.env, t)
    }

    post(t) {
      return this.send.call(this.env, t, "POST")
    }
  }

  return new class {
    constructor(t, e) {
      this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`)
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

    isShadowrocket() {
      return "undefined" != typeof $rocket
    }

    toObj(t, e = null) {
      try {
        return JSON.parse(t)
      } catch {
        return e
      }
    }

    toStr(t, e = null) {
      try {
        return JSON.stringify(t)
      } catch {
        return e
      }
    }

    getjson(t, e) {
      let s = e;
      const i = this.getdata(t);
      if (i) try {
        s = JSON.parse(this.getdata(t))
      } catch {
      }
      return s
    }

    setjson(t, e) {
      try {
        return this.setdata(JSON.stringify(t), e)
      } catch {
        return !1
      }
    }

    getScript(t) {
      return new Promise(e => {
        this.get({url: t}, (t, s, i) => e(i))
      })
    }

    runScript(t, e) {
      return new Promise(s => {
        let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
        i = i ? i.replace(/\n/g, "").trim() : i;
        let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
        r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
        const [o, h] = i.split("@"), n = {
          url: `http://${h}/v1/scripting/evaluate`,
          body: {script_text: t, mock_type: "cron", timeout: r},
          headers: {"X-Key": o, Accept: "*/*"}
        };
        this.post(n, (t, e, i) => s(i))
      }).catch(t => this.logErr(t))
    }

    loaddata() {
      if (!this.isNode()) return {};
      {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
        if (!s && !i) return {};
        {
          const i = s ? t : e;
          try {
            return JSON.parse(this.fs.readFileSync(i))
          } catch (t) {
            return {}
          }
        }
      }
    }

    writedata() {
      if (this.isNode()) {
        this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
        const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
            s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
        s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
      }
    }

    lodash_get(t, e, s) {
      const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
      let r = t;
      for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
      return r
    }

    lodash_set(t, e, s) {
      return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
    }

    getdata(t) {
      let e = this.getval(t);
      if (/^@/.test(t)) {
        const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
        if (r) try {
          const t = JSON.parse(r);
          e = t ? this.lodash_get(t, i, "") : e
        } catch (t) {
          e = ""
        }
      }
      return e
    }

    setdata(t, e) {
      let s = !1;
      if (/^@/.test(e)) {
        const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
            h = i ? "null" === o ? null : o || "{}" : "{}";
        try {
          const e = JSON.parse(h);
          this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
        } catch (e) {
          const o = {};
          this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
        }
      } else s = this.setval(t, e);
      return s
    }

    getval(t) {
      return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
    }

    setval(t, e) {
      return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
    }

    initGotEnv(t) {
      this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
    }

    get(t, e = (() => {
    })) {
      if (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      }); else if (this.isQuanX()) this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
        const {statusCode: s, statusCode: i, headers: r, body: o} = t;
        e(null, {status: s, statusCode: i, headers: r, body: o}, o)
      }, t => e(t)); else if (this.isNode()) {
        let s = require("iconv-lite");
        this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
          try {
            if (t.headers["set-cookie"]) {
              const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
              s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
            }
          } catch (t) {
            this.logErr(t)
          }
        }).then(t => {
          const {statusCode: i, statusCode: r, headers: o, rawBody: h} = t;
          e(null, {status: i, statusCode: r, headers: o, rawBody: h}, s.decode(h, this.encoding))
        }, t => {
          const {message: i, response: r} = t;
          e(i, r, r && s.decode(r.rawBody, this.encoding))
        })
      }
    }

    post(t, e = (() => {
    })) {
      const s = t.method ? t.method.toLocaleLowerCase() : "post";
      if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient[s](t, (t, s, i) => {
        !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
      }); else if (this.isQuanX()) t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
        const {statusCode: s, statusCode: i, headers: r, body: o} = t;
        e(null, {status: s, statusCode: i, headers: r, body: o}, o)
      }, t => e(t)); else if (this.isNode()) {
        let i = require("iconv-lite");
        this.initGotEnv(t);
        const {url: r, ...o} = t;
        this.got[s](r, o).then(t => {
          const {statusCode: s, statusCode: r, headers: o, rawBody: h} = t;
          e(null, {status: s, statusCode: r, headers: o, rawBody: h}, i.decode(h, this.encoding))
        }, t => {
          const {message: s, response: r} = t;
          e(s, r, r && i.decode(r.rawBody, this.encoding))
        })
      }
    }

    time(t, e = null) {
      const s = e ? new Date(e) : new Date;
      let i = {
        "M+": s.getMonth() + 1,
        "d+": s.getDate(),
        "H+": s.getHours(),
        "m+": s.getMinutes(),
        "s+": s.getSeconds(),
        "q+": Math.floor((s.getMonth() + 3) / 3),
        S: s.getMilliseconds()
      };
      /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
      for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
      return t
    }

    msg(e = t, s = "", i = "", r) {
      const o = t => {
        if (!t) return t;
        if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
        if ("object" == typeof t) {
          if (this.isLoon()) {
            let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
            return {openUrl: e, mediaUrl: s}
          }
          if (this.isQuanX()) {
            let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
            return {"open-url": e, "media-url": s}
          }
          if (this.isSurge()) {
            let e = t.url || t.openUrl || t["open-url"];
            return {url: e}
          }
        }
      };
      if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
        let t = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];
        t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
      }
    }

    log(...t) {
      t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
    }

    logErr(t, e) {
      const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
      s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t)
    }

    wait(t) {
      return new Promise(e => setTimeout(e, t))
    }

    done(t = {}) {
      const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
      this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
    }
  }(t, e)
}