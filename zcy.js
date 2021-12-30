/*
邀请码:  XWXW0K   
感谢填写(虽然软件邀请机制不太好)
12.29 完成视频(一)(二)模块  待测试 
平台: node.js   青龙
软件：  走财运app 
收益：  测试中   
注意事项 ： 一定要填写 hd bd 
=============变量=============
export zcyhd = '{"Authorization":"", "User-Agent":""}'
export zcybd1 = ''
export zcybd2 = ''
=============变量获取==========
可以使用圈x(需要把去广告功能关闭)  也可以使用 steam , thor 等工具
圈x为例   开启http抓包
打开app,观看一个视频,然后搜索关键字  step-money.quanxiangweilai.cn/api/gain_common_bonus  
即可找到 Authorization , User-Agent ;
bd是 请求体-文本 查看里面的
视频1  视频2 的 bd 是不同的,请自己抓取后按照格式填写
*/

const $ = new Env('走财运');
const notify = $.isNode() ? require('./sendNotify') : ''; 

/* 
let status;
status = (status = ($.getval(`zcystatus`) || "1")) > 1 ? `${status}` : "";    // 账号扩展字符       
 */

let zcyhdArr = [];     //数组 Array
let zcyhd = { "Authorization": "", "User-Agent": "" };
// let zcyhdstr = $.isNode() ? (process.env.zcyhd ? process.env.zcyhd : "") : ($.getdata('zcyhd') ? $.getdata('zcyhd') : "");   //字符串 str/String 
let zcyhds = "";
let zcybody1 = process.env.zcysp1;      //视频1      bd
let zcybody2 = process.env.zcysp2;      //视频2      bd
let zcybody3 = process.env.zcybs;       //步数测试   bd




let host=`https://step-money.quanxiangweilai.cn`;

//开始运行

!(async () => {
  if (process.env.zcyhd && process.env.zcyhd.indexOf('@') > -1) {
    zcyhdArr = process.env.zcyhd.split('@');
    console.log(`您选择的是用"@"隔开\n`)
  } else {
    zcyhds = [process.env.zcyhd]
  };
  Object.keys(zcyhds).forEach((item) => {
    if (zcyhds[item]) {
      zcyhdArr.push(zcyhds[item])
    }
  })

  console.log(`共${zcyhdArr.length}个账号`)
  for (let k = 0; k < zcyhdArr.length; k++) {
    zcyhd = zcyhdArr[k]
    $.index = k + 1;
    console.log(`\n开始【走财运账户 ${$.index}】`)
    await byxiaopeng()
  }
  
  

  // message() //通知
})()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())

/* 
console.log(`下面是hd`);
console.log(zcyhd);
console.log(`======================================================`);
console.log(`下面是hdarr`);
console.log(zcyhdArr);
console.log(`======================================================`);
 */



//要执行的代码
async function byxiaopeng() {
  await wyy(); 
  await $.wait(2000);        // 延时 2000ms  也就是2秒
  // await sp1();
  await $.wait(2000);        // 延时 2000ms  也就是2秒
  // await sp2();
  await $.wait(2000);        // 延时 2000ms  也就是2秒
  await bs();



}




//每日网抑云
function wyy(timeout = 0) {
  return new Promise((resolve) => {
      let url = {
        url: `https://tenapi.cn/comment/`
      }
      $.get(url, async (err, resp, data) => {
          try {
            data = JSON.parse(data)
            $.log(`\n【网抑云时间】: ${data.data.content}  by--${data.data.song}`);
  
          } catch (e) {
              $.logErr(e, resp);
          } finally {
              resolve()
          }
      }, timeout)
  })
}
 


// 执行视频一 任务  
function sp1(timeout = 0) {
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/gain_common_bonus`,
      headers: {
        'Authorization': JSON.parse(zcyhd).Authorization,
        'User-Agent': JSON.parse(zcyhd)['User-Agent']
        
      },
      body: zcybody1
    }

    // console.log(url);


    $.post(url, async (err, resp, data) => {
      try {

        // console.log(`输出data开始===================`);
        // console.log(data);
        // console.log(`输出data结束===================`);
        
        result = JSON.parse(data);     
        if (result.error_code == 0) {
          $.log(`\n【看视频(一)】：${result.message} 获得能量${result.data.money}`)
          await $.wait(60000)        //// 延时 1分钟
          await sp1();
        } else {
          $.log(`\n【看视频(一】：失败,${result.message}`)
        }
      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)

  })

}



// 看视频2 
function sp2(timeout = 0) {

  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/gain_common_bonus`,
      headers: {
        'Authorization': JSON.parse(zcyhd).Authorization,
        'User-Agent': JSON.parse(zcyhd)['User-Agent']
        
      },
      body: zcybody2
    }

    // console.log(url);


    $.post(url, async (err, resp, data) => {
      try {

        // console.log(`输出data开始===================`);
        // console.log(data);
        // console.log(`输出data结束===================`);

        
        result = JSON.parse(data);     
        if (result.error_code == 0) {
          $.log(`\n【看视频(二)】：${result.message} 获得能量${result.data.money}`)
          await $.wait(2000);
          await sp2();
        } else {
          $.log(`\n【看视频(二】：失败,${result.message}`)
        }

      } catch (e) {
        $.logErr(e, resp);
      } finally {
        resolve()
      }
    }, timeout)
  })
}


// 步数任务  1000步数  
// https://step-money.quanxiangweilai.cn/api/gain_bonus

// account_id=147150&bonus_type=bonus&gain_category=energy&sign=0ac7725635e7cf59be5bafd11e5cd126&step_level=1000     // 自己的步数
// account_id=147150&bonus_type=bonus&gain_category=energy&sign=9e19c74dfc446ef1cf7f32454b5860b0&step_level=2000     // 自己的步数
// account_id=147150&bonus_type=bonus&gain_category=energy&sign=ada9a8fbdd5e1311f6ce8093350189f2&step_level=3000     // 自己的步数  12-24

// account_id=147150&bonus_type=bonus&gain_category=energy&sign=5665010e87fd9c9225995962f818c261&step_level=6000     // 自己的步数 
// account_id=147150&bonus_type=bonus&gain_category=energy&sign=648f77721ef619b324818538544f8205&step_level=8000     // 自己的步数

// 0e1d7d1a520ec74180ea044a53ebc928   7895c5034a1a1942474f3720bae5d8f6 7ea9628b6dcbe6c2a29b341a14b5e08f  7421d388ee8e22831d70a0ccf46d3ad9
// fe9d4d1266ab18b969559a9dc106c80d  b6559221984e02f41b53325d820ae16f

// account_id=147271&bonus_type=bonus&gain_category=energy&geetest_challenge=61dce5afec3a22189a4997af0f142b3054&geetest_seccode=7f7b04457d08bf8e471bdaecc8dff0e5%7Cjordan&geetest_validate=7f7b04457d08bf8e471bdaecc8dff0e5&sign=ac7b48afc66f62506ec69c8ab226ff07&step_level=1000

// account_id=147271&bonus_type=bonus&gain_category=energy&sign=b39467b361f779e17b9a680ffd7846e5&step_level=3000
// account_id=147271&bonus_type=bonus&gain_category=energy&sign=942af1196677c20e3b28122ef0b8e243&step_level=5000     //他 

function bs(timeout = 0) {
  // let m = 'account_id=147150&bonus_type=bonus&gain_category=energy&sign=0ac7725635e7cf59be5bafd11e5cd126&step_level=';
	// let m = 'account_id=147150';
  
  // console.log(n);
  return new Promise((resolve) => {
    let url = {
      url: `${host}/api/gain_bonus`,
      headers: {
      'Authorization': JSON.parse(zcyhd).Authorization,
      'User-Agent': JSON.parse(zcyhd)['User-Agent']
      },
      body: zcybody3
    }

    console.log(url);


    $.post(url, async (err, resp, data) => {
      try {

      console.log(`输出data开始===================`);
      console.log(data);
      console.log(`输出data结束===================`);

      
      result = JSON.parse(data);     
      if (result.error_code == 0) {
        $.log(`\n【🎉🎉🎉 恭喜你鸭 🎉🎉🎉】:${result.message} 获得能量${result.data.money}`)
        await $.wait(660000);      //延迟11分钟
      } else {
        $.log(`\n【🎉 恭喜个屁 🎉】你领取2000步数能量失败🙅🏻了鸭,可能是:${result.message}`)
        await $.wait(2000);      //延迟 2 秒
      }

      } catch (e) {
      $.logErr(e, resp);
      } finally {
      resolve()
      }
    }, timeout)
    })
    
	
}






//固定板块，无需动 
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}