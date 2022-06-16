/*
养牛换宝

捉包把token填到ynhbCookie，多账号换行或者@或者&隔开

cron: 4-59/5 * * * *
const $ = new Env("养牛换宝")
*/
const $ = new Env("养牛换宝");

let envSplitor = ['\n','@','&']
let httpResult, httpReq, httpResp

let userCookie = ($.isNode() ? process.env.ynhbCookie : $.getdata('ynhbCookie')) || '';
let userList = []

let userIdx = 0
let userCount = 0
///////////////////////////////////////////////////////////////////
class UserInfo {
    constructor(str) {
        this.index = ++userIdx
        this.name = this.index
        this.valid = false
        
        this.token = str
        this.needVideo = false
    }
    
    getParam(action,contr,doStr="distribute") {
        return {
            "i": "16",
            "t": "0",
            "v": "1.1.7",
            "from": "wxapp",
            "c": "entry",
            "a": "wxapp",
            "do": doStr,
            "m": "bh_cat",
            "sign": "6767167deadbee2333deafbeef709394",
            "token": this.token,
            "version": "1.0.43",
            "action": action,
            "contr": contr,
        }
    }
    
    async home(isNotify=false) {
        try {
            let param = this.getParam("home","index")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                this.name = result?.info?.member?.nickname
                this.currency = parseFloat(result?.info?.member?.currency)
                this.foodstuff = result?.info?.member?.foodstuff
                this.id = result?.info?.member?.id
                this.openid = result?.info?.member?.openid
                if(isNotify) {
                    $.logAndNotify(`昵称：${this.name}`)
                    $.logAndNotify(`牛币：${this.currency}`)
                    $.logAndNotify(`牛奶：${this.foodstuff}`)
                } else {
                    console.log(`昵称：${this.name}`)
                    console.log(`牛币：${this.currency}`)
                    console.log(`牛奶：${this.foodstuff}`)
                    console.log(`激励视频任务：${result.info.look_num}/${result.info.config.daily_video_num}`)
                    if(result.info.look_num < result.info.config.daily_video_num && result.info.video_time == 0) {
                        this.needVideo = true
                    }
                }
            } else {
                console.log(`账号[${this.name}]CK失效: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async collect(type) {
        try {
            let param = this.getParam("upcurrency","my")
            param.collect = type
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]成功收取${result.info.collect_currency}牛币`)
            } else {
                console.log(`账号[${this.name}]收取牛币失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async sign() {
        try {
            let param = this.getParam("sign","my")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]签到成功`)
            } else {
                console.log(`账号[${this.name}]签到失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async signDouble() {
        try {
            let param = this.getParam("signDouble","my")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]签到翻倍成功`)
            } else {
                console.log(`账号[${this.name}]签到翻倍失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async daily() {
        try {
            let param = this.getParam("daily","food")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                if(result?.info?.member?.foodstuff) {
                    console.log(`账号[${this.name}]收取牛奶成功，剩余牛奶${result.info.member.foodstuff}`)
                } else {
                    console.log(`账号[${this.name}]收取牛奶失败，没有可收取的牛奶`)
                }
            } else {
                console.log(`账号[${this.name}]收取牛奶失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async feed() {
        try {
            let param = this.getParam("feed","my")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]喂食成功，增加生产时间${result.info.add_time}秒`)
            } else {
                console.log(`账号[${this.name}]喂食失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async completeTask(task_id) {
        try {
            let param = this.getParam("complete","task")
            param.task_id = task_id
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]完成任务[${task_id}]成功${result.info.msg}`)
            } else {
                console.log(`账号[${this.name}]完成任务[${task_id}]失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async getTaskList() {
        try {
            let param = this.getParam("index","task")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                for(let keys in result.info.task) {
                    for(let item of result.info.task[keys]) {
                        console.log(`任务[${item.id}]: ${item.title}`)
                        await this.completeTask(item.id);
                    }
                }
            } else {
                console.log(`账号[${this.name}]获取任务列表失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async video() {
        try {
            let param = this.getParam("video","food")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                console.log(`账号[${this.name}]看视频获得${result.info.video_currency}牛奶`)
            } else {
                console.log(`账号[${this.name}]看视频失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async getExcangeList() {
        try {
            let param = this.getParam("goods","shop")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                for(let item of result.info.goods.sort(function(a,b) {return parseFloat(b.bag_money)-parseFloat(a.bag_money)})) {
                    if(item.exchange_number > this.currency) continue;
                    if(item.exchange_number >= 50000) continue;
                    await this.exchange(item)
                }
            } else {
                console.log(`账号[${this.name}]获取兑换列表失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async exchange(item) {
        try {
            let param = this.getParam("","","exchange")
            param.id = item.id
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                this.currency -= item.exchange_number
                console.log(`账号[${this.name}]兑换[${item.goods_name}]成功`)
            } else {
                console.log(`账号[${this.name}]兑换[${item.goods_name}]失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async getWithdrawList() {
        try {
            let param = this.getParam("cash","my")
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                this.cash = parseFloat(result.info.member.cash)
                for(let item of result.info.moneys.sort(function(a,b) {return parseFloat(b.money)-parseFloat(a.money)})) {
                    if(parseFloat(item.money) > this.cash) continue;
                    if(parseFloat(item.money) >= 5.0) continue;
                    await this.withdraw(item)
                }
            } else {
                console.log(`账号[${this.name}]获取提现列表失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async withdraw(item) {
        try {
            let param = this.getParam("withdrawals","my")
            param.id = item.id
            let url = `https://xyx.zlzw188.com/app/index.php?${$.json2str(param,'&')}`
            let body = ``
            let urlObject = populateUrlObject(url,this.cookie,body)
            await httpRequest('get',urlObject)
            let result = httpResult;
            if(!result) return
            //console.log(result)
            if(result.status==1) {
                this.cash -= parseFloat(item.money)
                console.log(`账号[${this.name}]提现[${item.money}元]成功`)
            } else {
                console.log(`账号[${this.name}]提现[${item.money}元]失败: ${result.info}`)
            }
        } catch(e) {
            console.log(e)
        } finally {
            return new Promise((resolve) => {resolve(1)});
        }
    }
    
    async userTask() {
        console.log(`\n============= 账号[${this.index}] =============`)
        await this.home();
        await this.collect(1);
        await this.collect(2);
        await this.sign();
        await this.signDouble();
        await this.getTaskList();
        if(this.needVideo) await this.video();
        await this.daily();
        await this.feed();
        await this.getExcangeList();
        await this.getWithdrawList();
    }
}

!(async () => {
    if (typeof $request !== "undefined") {
        await GetRewrite()
    }else {
        if(!(await checkEnv())) return;
        
        for(let user of userList) {
            await user.userTask(); 
        }
    }
})()
.catch((e) => console.log(e))
.finally(() => $.done())

///////////////////////////////////////////////////////////////////
async function checkEnv() {
    if(userCookie) {
        let splitor = envSplitor[0];
        for(let sp of envSplitor) {
            if(userCookie.indexOf(sp) > -1) {
                splitor = sp;
                break;
            }
        }
        for(let userCookies of userCookie.split(splitor)) {
            if(userCookies) userList.push(new UserInfo(userCookies))
        }
        userCount = userList.length
    } else {
        console.log('未找到CK')
        return;
    }
    
    console.log(`共找到${userCount}个账号`)
    return true
}
////////////////////////////////////////////////////////////////////
function populateUrlObject(url,cookie,body=''){
    let host = url.replace('//','/').split('/')[1]
    let urlObject = {
        url: url,
        headers: {
            'Host': host,
            'Connection': 'keep-alive',
            'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.23(0x18001726) NetType/WIFI Language/zh_CN',
            'Referer': 'https://servicewechat.com/wx9ec970c78cf0153b/6/page-frame.html',
        },
        timeout: 5000,
    }
    if(body) {
        urlObject.body = body
        urlObject.headers['Content-Type'] =  'application/x-www-form-urlencoded'
        //urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
    }
    return urlObject;
}

async function httpRequest(method,url) {
    httpResult = null, httpReq = null, httpResp = null;
    return new Promise((resolve) => {
        $.send(method, url, async (err, req, resp) => {
            try {
                httpReq = req;
                httpResp = resp;
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                } else {
                    if(resp.body) {
                        if(typeof resp.body == "object") {
                            httpResult = resp.body;
                        } else {
                            try {
                                httpResult = JSON.parse(resp.body);
                            } catch (e) {
                                httpResult = resp.body;
                            }
                        }
                    }
                }
            } catch (e) {
                console.log(e);
            } finally {
                resolve();
            }
        });
    });
}

////////////////////////////////////////////////////////////////////
//AES/DES加解密，CryptoJS
function EncryptCrypto(method,mode,padding,message,key,iv) {
    return CryptoJS[method].encrypt(
        CryptoJS.enc.Utf8.parse(message), 
        CryptoJS.enc.Utf8.parse(key), 
        {mode:CryptoJS.mode[mode], padding:CryptoJS.pad[padding], iv:CryptoJS.enc.Utf8.parse(iv)}
    ).ciphertext.toString(CryptoJS.enc.Base64);
}
function DecryptCrypto(method,mode,padding,message,key,iv) {
    return CryptoJS[method].decrypt(
        {ciphertext: CryptoJS.enc.Base64.parse(message)}, 
        CryptoJS.enc.Utf8.parse(key), 
        {mode:CryptoJS.mode[mode], padding:CryptoJS.pad[padding], iv:CryptoJS.enc.Utf8.parse(iv)}
    ).toString(CryptoJS.enc.Utf8);
}
//Base64加解密
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
//MD5
function MD5Encrypt(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}
//SHA1
function SHA1Encrypt(msg){function add(x,y){return((x&0x7FFFFFFF)+(y&0x7FFFFFFF))^(x&0x80000000)^(y&0x80000000);}function SHA1hex(num){var sHEXChars="0123456789abcdef";var str="";for(var j=7;j>=0;j--)str+=sHEXChars.charAt((num>>(j*4))&0x0F);return str;}function AlignSHA1(sIn){var nblk=((sIn.length+8)>>6)+1,blks=new Array(nblk*16);for(var i=0;i<nblk*16;i++)blks[i]=0;for(i=0;i<sIn.length;i++)blks[i>>2]|=sIn.charCodeAt(i)<<(24-(i&3)*8);blks[i>>2]|=0x80<<(24-(i&3)*8);blks[nblk*16-1]=sIn.length*8;return blks;}function rol(num,cnt){return(num<<cnt)|(num>>>(32-cnt));}function ft(t,b,c,d){if(t<20)return(b&c)|((~b)&d);if(t<40)return b^c^d;if(t<60)return(b&c)|(b&d)|(c&d);return b^c^d;}function kt(t){return(t<20)?1518500249:(t<40)?1859775393:(t<60)?-1894007588:-899497514;}var x=AlignSHA1(msg);var w=new Array(80);var a=1732584193;var b=-271733879;var c=-1732584194;var d=271733878;var e=-1009589776;for(var i=0;i<x.length;i+=16){var olda=a;var oldb=b;var oldc=c;var oldd=d;var olde=e;for(var j=0;j<80;j++){if(j<16)w[j]=x[i+j];else w[j]=rol(w[j-3]^w[j-8]^w[j-14]^w[j-16],1);t=add(add(rol(a,5),ft(j,b,c,d)),add(add(e,w[j]),kt(j)));e=d;d=c;c=rol(b,30);b=a;a=t;}a=add(a,olda);b=add(b,oldb);c=add(c,oldc);d=add(d,oldd);e=add(e,olde);}SHA1Value=SHA1hex(a)+SHA1hex(b)+SHA1hex(c)+SHA1hex(d)+SHA1hex(e);return SHA1Value;}
//SHA256
function SHA256(n){const r=8,t=0;function o(n,r){const t=(65535&n)+(65535&r);return(n>>16)+(r>>16)+(t>>16)<<16|65535&t}function e(n,r){return n>>>r|n<<32-r}function u(n,r){return n>>>r}function c(n,r,t){return n&r^~n&t}function f(n,r,t){return n&r^n&t^r&t}function i(n){return e(n,2)^e(n,13)^e(n,22)}function h(n){return e(n,6)^e(n,11)^e(n,25)}function C(n){return e(n,7)^e(n,18)^u(n,3)}return function(n){const r=t?"0123456789ABCDEF":"0123456789abcdef";let o="";for(let t=0;t<4*n.length;t++)o+=r.charAt(n[t>>2]>>8*(3-t%4)+4&15)+r.charAt(n[t>>2]>>8*(3-t%4)&15);return o}(function(n,r){const t=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],a=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225],g=new Array(64);let l,d,A,S,m,s,b,p,v,w,y,B;for(n[r>>5]|=128<<24-r%32,n[15+(r+64>>9<<4)]=r,v=0;v<n.length;v+=16){for(l=a[0],d=a[1],A=a[2],S=a[3],m=a[4],s=a[5],b=a[6],p=a[7],w=0;w<64;w++)g[w]=w<16?n[w+v]:o(o(o(e(D=g[w-2],17)^e(D,19)^u(D,10),g[w-7]),C(g[w-15])),g[w-16]),y=o(o(o(o(p,h(m)),c(m,s,b)),t[w]),g[w]),B=o(i(l),f(l,d,A)),p=b,b=s,s=m,m=o(S,y),S=A,A=d,d=l,l=o(y,B);a[0]=o(l,a[0]),a[1]=o(d,a[1]),a[2]=o(A,a[2]),a[3]=o(S,a[3]),a[4]=o(m,a[4]),a[5]=o(s,a[5]),a[6]=o(b,a[6]),a[7]=o(p,a[7])}var D;return a}(function(n){const t=[],o=(1<<r)-1;for(let e=0;e<n.length*r;e+=r)t[e>>5]|=(n.charCodeAt(e/r)&o)<<24-e%32;return t}(n=function(n){n=n.replace(/\r\n/g,"\n");let r="";for(let t=0;t<n.length;t++){const o=n.charCodeAt(t);o<128?r+=String.fromCharCode(o):o>127&&o<2048?(r+=String.fromCharCode(o>>6|192),r+=String.fromCharCode(63&o|128)):(r+=String.fromCharCode(o>>12|224),r+=String.fromCharCode(o>>6&63|128),r+=String.fromCharCode(63&o|128))}return r}(n)),n.length*r))}
////////////////////////////////////////////////////////////////////
function Env(name,env) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
    return new class {
        constructor(name,env) {
            this.name = name
            this.notifyStr = ''
            this.startTime = (new Date).getTime()
            Object.assign(this,env)
            console.log(`${this.name} 开始运行：\n`)
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
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const[, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                r = s ? this.getval(s) : "";
                if (r)
                    try {
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
                const[, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                o = this.getval(i),
                h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t),
                    s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t),
                    s = this.setval(JSON.stringify(o), i)
                }
            }
            else {
                s = this.setval(t, e);
            }
            return s
        }
        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }
        send(m, t, e = (() => {})) {
            if(m != 'get' && m != 'post' && m != 'put' && m != 'delete') {
                console.log(`无效的http方法：${m}`);
                return;
            }
            if(m == 'get' && t.headers) {
                delete t.headers["Content-Type"];
                delete t.headers["Content-Length"];
            } else if(t.body && t.headers) {
                if(!t.headers["Content-Type"]) t.headers["Content-Type"] = "application/x-www-form-urlencoded";
            }
            if(this.isSurge() || this.isLoon()) {
                if(this.isSurge() && this.isNeedRewrite) {
                    t.headers = t.headers || {};
                    Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1});
                }
                let conf = {
                    method: m,
                    url: t.url,
                    headers: t.headers,
                    timeout: t.timeout,
                    data: t.body
                };
                if(m == 'get') delete conf.data
                $axios(conf).then(t => {
                    const {
                        status: i,
                        request: q,
                        headers: r,
                        data: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    });
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
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => e(t))
            } else if (this.isNode()) {
                this.got = this.got ? this.got : require("got");
                const {
                    url: s,
                    ...i
                } = t;
                this.instance = this.got.extend({
                    followRedirect: false
                });
                this.instance[m](s, i).then(t => {
                    const {
                        statusCode: i,
                        request: q,
                        headers: r,
                        body: o
                    } = t;
                    e(null, q, {
                        statusCode: i,
                        headers: r,
                        body: o
                    })
                }, t => {
                    const {
                        message: s,
                        response: i
                    } = t;
                    e(s, i, i && i.body)
                })
            }
        }
        time(t) {
            let e = {
                "M+": (new Date).getMonth() + 1,
                "d+": (new Date).getDate(),
                "h+": (new Date).getHours(),
                "m+": (new Date).getMinutes(),
                "s+": (new Date).getSeconds(),
                "q+": Math.floor(((new Date).getMonth() + 3) / 3),
                S: (new Date).getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)));
            return t
        }
        async showmsg() {
            if(!this.notifyStr) return;
            let notifyBody = this.name + " 运行通知\n\n" + this.notifyStr
            if($.isNode()){
                var notify = require('./sendNotify');
                console.log('\n============== 推送 ==============')
                await notify.sendNotify(this.name, notifyBody);
            } else {
                this.msg(notifyBody);
            }
        }
        logAndNotify(str) {
            console.log(str)
            this.notifyStr += str
            this.notifyStr += '\n'
        }
        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t)
                    return t;
                if ("string" == typeof t)
                    return this.isLoon() ? t : this.isQuanX() ? {
                        "open-url": t
                    }
                 : this.isSurge() ? {
                    url: t
                }
                 : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                        s = t.mediaUrl || t["media-url"];
                        return {
                            openUrl: e,
                            mediaUrl: s
                        }
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                        s = t["media-url"] || t.mediaUrl;
                        return {
                            "open-url": e,
                            "media-url": s
                        }
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {
                            url: e
                        }
                    }
                }
            };
            this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r)));
            let h = ["", "============== 系统通知 =============="];
            h.push(e),
            s && h.push(s),
            i && h.push(i),
            console.log(h.join("\n"))
        }
        getMin(a,b){
            return ((a<b) ? a : b)
        }
        getMax(a,b){
            return ((a<b) ? b : a)
        }
        padStr(num,length,padding='0') {
            let numStr = String(num)
            let numPad = (length>numStr.length) ? (length-numStr.length) : 0
            let retStr = ''
            for(let i=0; i<numPad; i++) {
                retStr += padding
            }
            retStr += numStr
            return retStr;
        }
        json2str(obj,c,encodeUrl=false) {
            let ret = []
            for(let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if(v && encodeUrl) v = encodeURIComponent(v)
                ret.push(keys+'='+v)
            }
            return ret.join(c);
        }
        str2json(str,decodeUrl=false) {
            let ret = {}
            for(let item of str.split('&')) {
                if(!item) continue;
                let idx = item.indexOf('=')
                if(idx == -1) continue;
                let k = item.substr(0,idx)
                let v = item.substr(idx+1)
                if(decodeUrl) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret;
        }
        randomString(len,charset='abcdef0123456789') {
            let str = '';
            for (let i = 0; i < len; i++) {
                str += charset.charAt(Math.floor(Math.random()*charset.length));
            }
            return str;
        }
        randomList(a) {
            let idx = Math.floor(Math.random()*a.length)
            return a[idx]
        }
        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }
        done(t = {}) {
            const e = (new Date).getTime(),
            s = (e - this.startTime) / 1e3;
            console.log(`\n${this.name} 运行结束，共运行了 ${s} 秒！`)
            if(this.isSurge() || this.isQuanX() || this.isLoon()) $done(t)
        }
    }(name,env)
}
