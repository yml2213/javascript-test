/*
zte              zte_ck.js

-------------------  青龙-配置文件-复制区域  -------------------
# zte 
export zte_ck="  pwd @   pwd"  

多账号用 换行 或 @ 分割  
抓 iehuangsecond/ga/public/api/login  的 body 里面的信息

tg频道: https://t.me/yml2213_tg  
*/

const $ = Env('zte')
const fs = require('fs')
const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['zte_ck']                //支持多变量
const CryptoJS = require('crypto-js')

//====================================================================================================

process.env.zte_ck = 'admin'

//====================================================================================================






class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        // this.ck = ck.split('#')
        this.pwd = ck
        this.ts13 = $.ts(13)

        this.hd = {
            'Host': 'zte_ck-apig.xiaoyisz.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 12; M2102J2SC Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/111.0.5563.116 Mobile Safari/537.36 XWEB/5175 MMWEBSDK/20230504 MMWEBID/1858 MicroMessenger/8.0.37.2380(0x2800255B) WeChat/arm64 Weixin NetType/WIFI Language/zh_CN ABI/arm64 miniProgram/wx532ecb3bdaaf92f9',
            'X-Requested-With': 'com.tencent.mm',
        }

    }

    async userTask() {
        console.log(`\n=============== ${this.idx} ===============`)

        $.log(`\n-------------- 开始 --------------`)
        await this.login() // 登录
        if (this.ckFlog) {
            $.log(`\n-------------- 任务 --------------`)
            await this.check_ip()   // 查看ip
            await this.close_wlfi() // 关闭
            await $.wait(5)
            await this.open_wlfi() // 打开
            await $.wait(5)
            await this.check_ip()   // 查看ip



        }


    }



    async login() { // 登录 
        let ld = await this.get_ld()
        // console.log(ld)
        let a = CryptoJS.SHA256(this.pwd).toString().toUpperCase()
        let b = `${a}${ld}`
        let pwd = CryptoJS.SHA256(b).toString().toUpperCase()

        let options = {
            fn: '登录',
            method: 'post',
            url: `http://192.168.0.1/goform/goform_set_cmd_process`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Origin': 'http://192.168.0.1',
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Cookie': 'stok=""',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            form: {
                'isTest': 'false',
                'goformId': 'LOGIN',
                'password': pwd
            }
        }
        // console.log(options)
        let resp = await $.request(options, 'all')
        // console.log(resp);
        this.cookie = resp[0]['set-cookie'][0].split(';')[0]
        // console.log(this.cookie);
        resp = resp[1]

        // console.log(resp)
        if (resp.result == 0) {
            $.log(`${this.idx}: ${options.fn} -- 成功,cookie: ${this.cookie}`)
            this.ckFlog = true
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false
    }


    // http://192.168.0.1/goform/goform_set_cmd_process   打开wifi
    async open_wlfi() { // 打开wifi 
        let rd = await this.get_rd()
        // console.log(rd)

        let a = CryptoJS.MD5('BD_MU5001UV1.0.2B13').toString()
        let b = `${a}${rd}`
        let ad = CryptoJS.MD5(b).toString()

        let options = {
            fn: '打开wifi',
            method: 'post',
            url: `http://192.168.0.1/goform/goform_set_cmd_process`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Cookie': this.cookie,
                'Origin': 'http://192.168.0.1',
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            form: {
                'isTest': 'false',
                'notCallback': 'true',
                'goformId': 'CONNECT_NETWORK',
                'AD': ad
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.result == "success") {
            $.log(`${this.idx}: ${options.fn} -- 成功`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://192.168.0.1/goform/goform_set_cmd_process   关闭  
    async close_wlfi() { // 关闭wifi 
        let rd = await this.get_rd()
        // console.log('re: ',rd)

        let a = CryptoJS.MD5('BD_MU5001UV1.0.2B13').toString()
        let b = `${a}${rd}`
        let ad = CryptoJS.MD5(b).toString()

        let options = {
            fn: '关闭wifi',
            method: 'post',
            url: `http://192.168.0.1/goform/goform_set_cmd_process`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Cookie': this.cookie,
                'Origin': 'http://192.168.0.1',
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            form: {
                'isTest': 'false',
                'notCallback': 'true',
                'goformId': 'DISCONNECT_NETWORK',
                'AD': ad
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.result == "success") {
            $.log(`${this.idx}: ${options.fn} -- 成功`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    async get_ld() { // 获取ld 
        let options = {
            fn: '获取ld',
            method: 'get',
            url: `http://192.168.0.1/goform/goform_get_cmd_process?isTest=false&cmd=LD&_=${this.ts13}`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Cookie': this.cookie,
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.LD) {
            return resp.LD
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://192.168.0.1/goform/goform_get_cmd_process?isTest=false&cmd=RD&_=1690338446360
    async get_rd() { // 获取rd
        let options = {
            fn: '获取rd',
            method: 'get',
            url: `http://192.168.0.1/goform/goform_get_cmd_process?isTest=false&cmd=RD&_=${this.ts13}`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Cookie': this.cookie,
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.RD) {
            return resp.RD
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


    // http://192.168.0.1/goform/goform_get_cmd_process?isTest=false&cmd=wifi_onoff_state%2Cguest_switch%2Cwifi_chip1_ssid2_max_access_num%2Cm_SSID2%2Cwifi_chip2_ssid2_max_access_num%2Cwifi_chip1_ssid1_wifi_coverage%2Capn_interface_version%2Cm_ssid_enable%2Cimei%2Cnetwork_type%2Crssi%2Crscp%2Clte_rsrp%2Cimsi%2Csim_imsi%2Ccr_version%2Cwa_version%2Chardware_version%2Cweb_version%2Cwa_inner_version%2Cwifi_chip1_ssid1_max_access_num%2Cwifi_chip1_ssid1_ssid%2Cwifi_chip1_ssid1_auth_mode%2Cwifi_chip1_ssid1_password_encode%2Cwifi_chip2_ssid1_ssid%2Cwifi_chip2_ssid1_auth_mode%2Cm_HideSSID%2Cwifi_chip2_ssid1_password_encode%2Cwifi_chip2_ssid1_max_access_num%2Clan_ipaddr%2Clan_ipaddr%2Cmac_address%2Cmsisdn%2CLocalDomain%2Cwan_ipaddr%2Cstatic_wan_ipaddr%2Cipv6_wan_ipaddr%2Cipv6_pdp_type%2Cipv6_pdp_type_ui%2Cpdp_type%2Cpdp_type_ui%2Copms_wan_mode%2Copms_wan_auto_mode%2Cppp_status%2CZ5g_snr%2CZ5g_rsrp%2Cwan_lte_ca%2Clte_ca_pcell_band%2Clte_ca_pcell_bandwidth%2Clte_ca_scell_band%2Clte_ca_scell_bandwidth%2Clte_ca_pcell_arfcn%2Clte_ca_scell_arfcn%2Clte_multi_ca_scell_info%2Cwan_active_band%2Cwifi_onoff_state%2Cguest_switch%2Cwifi_chip1_ssid2_max_access_num%2Cwifi_chip2_ssid2_max_access_num%2Cwifi_chip1_ssid1_wifi_coverage%2Cwifi_chip1_ssid1_max_access_num%2Cwifi_chip1_ssid1_ssid%2Cwifi_chip1_ssid1_auth_mode%2Cwifi_chip1_ssid1_password_encode%2Cwifi_chip2_ssid1_ssid%2Cwifi_chip2_ssid1_auth_mode%2Cwifi_chip2_ssid1_password_encode%2Cwifi_chip2_ssid1_max_access_num%2Cwifi_chip1_ssid2_ssid%2Cwifi_chip2_ssid2_ssid%2Cwifi_chip1_ssid1_switch_onoff%2Cwifi_chip2_ssid1_switch_onoff%2Cwifi_chip1_ssid2_switch_onoff%2Cwifi_chip2_ssid2_switch_onoff%2CZ5g_SINR%2Cstation_ip_addr&multi_data=1&_=1690339900701
    async check_ip() { // 查看ip
        let options = {
            fn: '查看ip',
            method: 'get',
            url: `http://192.168.0.1/goform/goform_get_cmd_process?isTest=false&cmd=wifi_onoff_state%2Cguest_switch%2Cwifi_chip1_ssid2_max_access_num%2Cm_SSID2%2Cwifi_chip2_ssid2_max_access_num%2Cwifi_chip1_ssid1_wifi_coverage%2Capn_interface_version%2Cm_ssid_enable%2Cimei%2Cnetwork_type%2Crssi%2Crscp%2Clte_rsrp%2Cimsi%2Csim_imsi%2Ccr_version%2Cwa_version%2Chardware_version%2Cweb_version%2Cwa_inner_version%2Cwifi_chip1_ssid1_max_access_num%2Cwifi_chip1_ssid1_ssid%2Cwifi_chip1_ssid1_auth_mode%2Cwifi_chip1_ssid1_password_encode%2Cwifi_chip2_ssid1_ssid%2Cwifi_chip2_ssid1_auth_mode%2Cm_HideSSID%2Cwifi_chip2_ssid1_password_encode%2Cwifi_chip2_ssid1_max_access_num%2Clan_ipaddr%2Clan_ipaddr%2Cmac_address%2Cmsisdn%2CLocalDomain%2Cwan_ipaddr%2Cstatic_wan_ipaddr%2Cipv6_wan_ipaddr%2Cipv6_pdp_type%2Cipv6_pdp_type_ui%2Cpdp_type%2Cpdp_type_ui%2Copms_wan_mode%2Copms_wan_auto_mode%2Cppp_status%2CZ5g_snr%2CZ5g_rsrp%2Cwan_lte_ca%2Clte_ca_pcell_band%2Clte_ca_pcell_bandwidth%2Clte_ca_scell_band%2Clte_ca_scell_bandwidth%2Clte_ca_pcell_arfcn%2Clte_ca_scell_arfcn%2Clte_multi_ca_scell_info%2Cwan_active_band%2Cwifi_onoff_state%2Cguest_switch%2Cwifi_chip1_ssid2_max_access_num%2Cwifi_chip2_ssid2_max_access_num%2Cwifi_chip1_ssid1_wifi_coverage%2Cwifi_chip1_ssid1_max_access_num%2Cwifi_chip1_ssid1_ssid%2Cwifi_chip1_ssid1_auth_mode%2Cwifi_chip1_ssid1_password_encode%2Cwifi_chip2_ssid1_ssid%2Cwifi_chip2_ssid1_auth_mode%2Cwifi_chip2_ssid1_password_encode%2Cwifi_chip2_ssid1_max_access_num%2Cwifi_chip1_ssid2_ssid%2Cwifi_chip2_ssid2_ssid%2Cwifi_chip1_ssid1_switch_onoff%2Cwifi_chip2_ssid1_switch_onoff%2Cwifi_chip1_ssid2_switch_onoff%2Cwifi_chip2_ssid2_switch_onoff%2CZ5g_SINR%2Cstation_ip_addr&multi_data=1&_=${this.ts13}`,
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Accept-Language': 'zh-CN,zh;q=0.9,fr;q=0.8,de;q=0.7,en;q=0.6',
                'Cache-Control': 'no-cache',
                'Cookie': this.cookie,
                'Pragma': 'no-cache',
                'Proxy-Connection': 'keep-alive',
                'Referer': 'http://192.168.0.1/index.html',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.wan_ipaddr) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.wan_ipaddr}`)
            // return resp.wan_ipaddr
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
    }


}


!(async () => {
    // console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
    }


})()
    .catch((e) => console.log(e))
    .finally(() => $.exitNow())


//========================= 2023/06/19 ======================================
function Env(name) {
    return new class {
        constructor(name) {
            this.name = name
            this.startTime = Date.now()
            this.log(`[${this.name}]开始运行`)

            this.notifyStr = []
            this.notifyFlag = true

            this.userIdx = 0
            this.userList = []
            this.userCount = 0
        }

        async request(opt, type = 'body') {
            try {
                const got = require('got')
                let DEFAULT_TIMEOUT = 8 * 1000      // 默认超时时间
                let DEFAULT_RETRY = 2     // 默认重试次数--2
                let resp = null, count = 0
                let fn = opt.fn || opt.url
                opt.timeout = opt.timeout || DEFAULT_TIMEOUT
                opt.retry = opt.retry || { limit: 0 }
                opt.method = opt?.method?.toUpperCase() || 'GET'
                while (count++ < DEFAULT_RETRY) {
                    try {
                        resp = await got(opt)
                        break
                    } catch (e) {
                        if (e.name == 'TimeoutError') {
                            this.log(`[${fn}]请求超时，重试第${count}次`)
                        } else {
                            this.log(`[${fn}]请求错误(${e.message})，重试第${count}次`)
                        }
                    }
                }
                if (resp == null) return Promise.resolve({ statusCode: 'timeout', headers: null, body: null })
                // console.log(resp)
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'cookie') {
                    return Promise.resolve(resp)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'all') {
                    return Promise.resolve([headers, body])
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
            }

        }

        log(msg, options = {}) {
            if (typeof msg == 'object') {
                msg = JSON.stringify(msg)
            }
            let opt = { console: true }
            Object.assign(opt, options)

            if (opt.time) {
                let fmt = opt.fmt || 'hh:mm:ss'
                msg = `[${this.time(fmt)}]` + msg
            }
            if (opt.notify) {
                this.notifyStr.push(msg)
            }
            if (opt.console) {
                console.log(msg)
            }

        }

        read_env(Class) {
            require('dotenv').config()
            let envStrList = ckNames.map(x => process.env[x])
            for (let env_str of envStrList.filter(x => !!x)) {
                let sp = envSplit.filter(x => env_str.includes(x))
                let splitor = sp.length > 0 ? sp[0] : envSplit[0]
                for (let ck of env_str.split(splitor).filter(x => !!x)) {
                    this.userList.push(new Class(ck))
                }
            }
            this.userCount = this.userList.length
            if (!this.userCount) {
                this.log(`未找到变量，请检查变量${ckNames.map(x => '[' + x + ']').join('或')}`, { notify: true })
                return false
            }
            this.log(`共找到${this.userCount}个账号`)
            return true
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
                S: this.padStr(xt.getMilliseconds(), 3)
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (xt.getFullYear() + "").substr(4 - RegExp.$1.length)))
            for (let s in e)
                new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length)))
            return t
        }

        async showmsg() {
            if (!this.notifyFlag) return
            if (!this.notifyStr) return
            if (this.notifyStr.length) return
            let notify = require('./sendNotify')
            this.log('\n============== 推送 ==============')
            await notify.sendNotify(this.name, this.notifyStr.join('\n'))
        }

        padStr(num, length, opt = {}) {
            let padding = opt.padding || '0'
            let mode = opt.mode || 'l'
            let numStr = String(num)
            let numPad = (length > numStr.length) ? (length - numStr.length) : 0
            let pads = ''
            for (let i = 0; i < numPad; i++) {
                pads += padding
            }
            if (mode == 'r') {
                numStr = numStr + pads
            } else {
                numStr = pads + numStr
            }
            return numStr
        }

        json2str(obj, c, encode = false) {
            let ret = []
            for (let keys of Object.keys(obj).sort()) {
                let v = obj[keys]
                if (v && encode) v = encodeURIComponent(v)
                ret.push(keys + '=' + v)
            }
            return ret.join(c)
        }

        str2json(str, decode = false) {
            let ret = {}
            for (let item of str.split('&')) {
                if (!item) continue
                let idx = item.indexOf('=')
                if (idx == -1) continue
                let k = item.substr(0, idx)
                let v = item.substr(idx + 1)
                if (decode) v = decodeURIComponent(v)
                ret[k] = v
            }
            return ret
        }

        phoneNum(phone_num) {
            if (phone_num.length == 11) {
                let data = phone_num.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2")
                return data
            } else {
                return phone_num
            }
        }

        randomInt(min, max) {
            return Math.round(Math.random() * (max - min) + min)
        }

        async yiyan() {
            const got = require('got')
            return new Promise((resolve) => {
                (async () => {
                    try {
                        const response = await got('https://v1.hitokoto.cn')
                        // console.log(response.body)
                        let data = JSON.parse(response.body)
                        let data_ = `[一言]: ${data.hitokoto}  by--${data.from}`
                        // console.log(data_)
                        resolve(data_)
                    } catch (error) {
                        console.log(error.response.body)
                    }
                })()
            })
        }

        ts(type = false, _data = "") {
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

        randomPattern(pattern, charset = 'abcdef0123456789') {
            let str = ''
            for (let chars of pattern) {
                if (chars == 'x') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length))
                } else if (chars == 'X') {
                    str += charset.charAt(Math.floor(Math.random() * charset.length)).toUpperCase()
                } else {
                    str += chars
                }
            }
            return str
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
            $.log(`随机等待 ${t} 秒 ...`)
            return new Promise(e => setTimeout(e, t * 1000))
        }

        async exitNow() {
            await this.showmsg()
            let e = Date.now()
            let s = (e - this.startTime) / 1000
            this.log(`[${this.name}]运行结束，共运行了${s}秒`)
            process.exit(0)
        }
    }(name)
}