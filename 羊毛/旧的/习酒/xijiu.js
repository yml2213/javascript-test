/*
习酒 小程序             cron 0 1,6,12,18,22 * * *  xijiu.js


23/3/18    修改原有脚本


-------------------  青龙-配置文件-复制区域  -------------------
# 习酒
export xijiu=" login_code # 兑换类型 # 手机号  @  login_code # 兑换类型 # 手机号 "  

多账号用 换行 或 @ 分割  

兑换类型   ---  联通卡 - 'lt', 移动卡 - 'yd', 电信卡 - 'dx'

抓 apimallwm.exijiu.com 的 login_code 就行了
tg频道: https://t.me/yml2213_tg  
*/
const $ = Env('习酒')
const notify = require('./sendNotify')
const crypto = require('crypto-js')

const envSplit = ['\n', '&', '@']     //支持多种分割，但要保证变量里不存在这个字符
const ckNames = ['xijiu']                //支持多变量

//====================================================================================================
let DEFAULT_RETRY = 1           // 默认重试次数
//====================================================================================================


class UserClass {
    constructor(ck) {
        this.idx = `账号[${++$.userIdx}]`
        this.ckFlog = true
        this.ck = ck.split('#')
        this.login_code = this.ck[0]
        this.dh_typy = this.ck[1]
        this.phoen = this.ck[2]


        this.dUA = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat'

        this.hd_xcx = {
            'Host': 'xcx.exijiu.com',
            'User-Agent': this.dUA,
            'login_code': this.login_code,
            'Authorization': '',
        }

        this.hd_api = {
            'Host': 'apimallwm.exijiu.com',
            'User-Agent': this.dUA,
            'login_code': this.login_code,
            'Authorization': '',
        }


    }

    async userTask() { // 个人信息
        console.log(`\n=============== ${this.idx} ===============`)
        await this.Info()

        if (this.ckFlog) {
            $.log(`\n-------------- 任务列表 --------------`)
            await this.tasklist()

            $.log(`\n-------------- 其他任务 --------------`)
            await this.adjust()

        }
    }

    async Info() { // 个人信息
        let options = {
            fn: '个人信息',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/getJifenShopMemberInfo`,
            headers: {
                'Host': 'xcx.exijiu.com',
                'User-Agent': this.dUA,
                'login_code': this.login_code,
            },
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.id = resp.data.id
            this.phone_no = resp.data.phone_no
            this.integration = resp.data.integration
            // console.log(this.uid, this.name)
            $.log(`${this.idx}: ${options.fn} 成功 🎉, 手机号:${$.phoneNum(this.phone_no)}, 积分:${this.integration}`, { notify: true })
            this.ckFlog = true
            await $.wait(2)
            await this.getJwt()
        } else if (resp.code == -1) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`, { notify: true })
            this.ckFlog = false
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`), this.ckFlog = false

    }

    async getJwt() { // 获取新jwt
        let options = {
            fn: '获取新jwt',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/getJwt`,
            headers: {
                'Host': 'xcx.exijiu.com',
                'User-Agent': this.dUA,
                'login_code': this.login_code,
            }
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            this.jwt = resp.data.jwt
            this.hd_xcx.Authorization = resp.data.jwt
            this.hd_api.Authorization = resp.data.jwt
            await this.refresh()
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async refresh() { // 刷新
        let options = {
            fn: '刷新',
            method: 'get',
            url: `https://apimallwm.exijiu.com/anti-channeling/public/index.php/api/v2/Member/hasDataMsCenterUser`,
            headers: this.hd_xcx
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.code == 0) {
            $.log(`${this.idx}: ${options.fn} 成功, 新的: ${this.jwt}`)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    async tasklist() { // 任务列表
        try {
            let options = {
                fn: '任务列表',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/tasks/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let lists = resp.data

                for (const list of lists) {
                    // console.log(list)
                    let { id, name, code, limit_num, is_daily, is_complete } = list

                    if (is_complete == 0) {
                        switch (name) {
                            case '每日一答':
                                // await this.answer_survey()
                                break

                            case '分享':
                                await this.garden_share()
                                break

                            case '查看有机高粱实景相册':
                                await this.view_organic_sorghum()
                                break

                            case '完善个人信息':
                                // await this.complete_member_info()
                                break

                            default:
                                break
                        }
                    } else {
                        $.log(`${this.idx}: ${name}, 已完成`)
                    }
                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 任务列表-其他任务
    async tasklist_other() {

        await this.is_change_phone()       // 判断是否种兑换话费

        await this.dailySign()     // 签到查询
        await this.do_sign()     // 签到查询

        await this.harvestAll()     // 尝试 收获所有成熟作物
        await this.adjust()     // 调度任务

    }


    // 调度任务 种啥  是否制曲   是否制酒   浇水/施肥
    async adjust(type = 0) {
        if (type == 0) {
            await this.inventory_info()

            // 种植调度
            // 1 高粱 - sorghum    2 小麦 - wheat
            if (await this.is_null()) {
                if (this.wheat == 0) {
                    $.log(`${this.idx}: 发现空地, 即将种植 小麦`)
                    await this.do_wheat()  // 种小麦
                } else {
                    if (this.sorghum / 20 > this.wheat) {
                        $.log(`${this.idx}: 发现空地, 即将种植 小麦`)
                        await this.do_wheat()  // 种小麦
                    } else {
                        $.log(`${this.idx}: 发现空地, 即将种植 高粱`)
                        await this.do_sorghum()  // 种高粱
                    }
                }
            } else {
                $.log(`${this.idx}: 暂时没有空地, 跳过种植`)
            }

        } else if (type == 1) {  // 浇水/施肥 专用循环
            await this.harvestAll()     // 尝试 收获所有成熟作物
            await this.inventory_info()     // 刷新数量

            // 种植调度
            // 1 高粱 - sorghum    2 小麦 - wheat
            if (await this.is_null()) {
                if (this.wheat == 0) {
                    $.log(`${this.idx}: 发现空地, 即将种植 小麦`)
                    await this.do_wheat()  // 种小麦
                } else {
                    if (this.sorghum / 20 > this.wheat) {
                        $.log(`${this.idx}: 发现空地, 即将种植 小麦`)
                        await this.do_wheat()  // 种小麦
                    } else {
                        $.log(`${this.idx}: 发现空地, 即将种植 高粱`)
                        await this.do_sorghum()  // 种高粱
                    }
                }
            } else {
                $.log(`${this.idx}: 暂时没有空地, 跳过种植`)
            }





        }

        // 制曲 调度
        if (this.wheat > 100 && this.wine_yeast == 0) {
            $.log(`${this.idx}: 满足 制曲 条件, 即将 制曲`)
            await this.makeWineYeast()  // 制曲
        }

        // 制酒 调度
        await this.gardenmemberwine()  // 查询有无可以收获的酒

        // 兑换积分
        if (this.wine > 0) {
            await this.exchange(this.wine)
        }

    }


    // 仓库    (水 高粱 小麦 酒曲 酒 数量)
    async inventory_info() {
        try {
            let options = {
                fn: '仓库',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/Gardenmemberinfo/getMemberInfo`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                this.integration = resp.data.integration
                this.sorghum = resp.data.sorghum  // 高粱
                this.wheat = resp.data.wheat    // 小麦
                this.wine_yeast = resp.data.wine_yeast // 酒曲
                this.wine = resp.data.wine

                this.water = resp.data.water
                this.manure = resp.data.manure

                $.log(`${this.idx}: ${options.fn}当前状态   积分:${this.integration}, 高粱:${this.sorghum}, 小麦:${this.wheat}, 酒曲:${this.wine_yeast}, 酒:${this.wine}, 水:${this.water} 桶, 肥料: ${this.manure} 袋`)




            } else console.log(`${this.idx}: ${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    async is_change_phone() { // 判断是否种兑换话费
        if (this.phoen.length == 11) {
            if (this.integration >= 10000) {
                $.log(`${this.idx}: 积分 ${this.integration}, 可换三网 100元 话费, 即将自动更换`, { notify: true })
                if (this.dh_typy == 'lt') {
                    let a = `goods_code=1001-LT&id=61610&phone=${this.phoen}`
                    await this.do_change_phone(a)    // 联通话费
                } else if (this.dh_typy == 'yd') {
                    let a = `goods_code=1001-YD&id=61615&phone=${this.phoen}`
                    await this.do_change_phone(a)  // 移动话费
                } else if (this.dh_typy == 'dx') {
                    let a = `goods_code=1001-DX&id=61605&phone=${this.phoen}`
                    await this.do_change_phone(a)  // 电信话费
                } else {
                    $.log(`${this.idx}: 兑换话费变量设置错误，不执行`)
                }
            } else {
                $.log(`${this.idx}: 积分 ${this.integration} 太少了, 攒攒再来换吧!`)

            }
        } else {
            $.log(`${this.idx}: 未设置兑换话费变量，不执行`)
        }
    }

    async do_change_phone(a) { // 兑换话费
        let options = {
            fn: '兑换话费',
            method: 'post',
            url: `https://apimallwm.exijiu.com/oforders`,
            headers: {
                "Host": "apimallwm.exijiu.com",
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": this.dUA,
                "Authorization": this.jwt,
            },
            form: $.str2json(a)
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            $.log(`${this.idx}: ${options.fn} --  ${resp.msg}`, { notify: true })
        } else if (resp.err == 40040) {
            $.log(`${this.idx}: ${options.fn} --  ${resp.msg}`, { notify: true })
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    // 判断土地 是否为空
    async is_null() {
        let options = {
            fn: '土地是否为空',
            method: 'get',
            url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
            headers: this.hd_api
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            let lists = resp.data
            for (let i = 0; i < lists.length; i++) {
                const element = lists[i]
                if (element.status != -1) {  // 排除未开发的土地
                    if (element.status == 0) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    // 种植小麦
    async do_wheat() {
        try {
            let options = {
                fn: '种植小麦',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let list = resp.data
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status != -1) {
                        // console.log(list[i])
                        // $.log(`${this.idx}: ${list[i].serial_number} 号田下次成熟时间：${list[i].crop_time}`)
                        let typeid = list[i].id
                        await this.seed(typeid, 2)  // 种植物 1 高粱     2 小麦

                    }
                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }


    // 种植高粱
    async do_sorghum() {
        try {
            let options = {
                fn: '种植高粱',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let list = resp.data
                for (let i = 0; i < list.length; i++) {
                    if (list[i].status != -1) {
                        // $.log(`${this.idx}: ${list[i].serial_number} 号田下次成熟时间：${list[i].crop_time}`)
                        let typeid = list[i].id
                        await this.seed(typeid, 1)  // 种植物 1 高粱     2 小麦
                    }
                }

            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }



    // 种植物  1 高粱     2 小麦
    async seed(id, type) {
        try {
            let options = {
                fn: '尝试种植物',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/sorghum/seed`,
                headers: {
                    'authorization': this.jwt,
                    'login_code': this.login_code,
                    'User-Agent': this.dUA,
                    'Referer': ' https://servicewechat.com/wx489f950decfeb93e/246/page-frame.html',

                },
                form: {
                    'id': id,
                    'type': type
                }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 预计 ${resp.data.crop_time} 成熟`)
                // 浇水/施肥  调度
                if (this.water > 0) {
                    await this.get_landId(1)  // 浇水
                }
                if (this.manure > 0) {
                    await this.get_landId(2)  // 施肥  
                }
            } else if (resp.err == 61010) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}   请先手动种植一次后再跑脚本`)
            } else if (resp.err == 4032) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 收获所有成熟作物
    async harvestAll() {
        try {
            let options = {
                fn: '收获所有成熟作物',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/Sorghum/harvestAll`,
                headers: this.hd_api,
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
                await this.inventory_info()  // 判断种什么
            } else if (resp.err == 4041) {      // 没有已成熟的作物!
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

        } catch (e) {
            console.log(e)
        }

    }


    async gardenmemberwine() { // 制酒    用高粱 + 酒曲
        try {
            let options = {
                fn: '制酒',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/gardenmemberwine/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                if (resp.total == 1) {
                    if (resp.data[0].status == 4) {
                        $.log(`${this.idx}: 已成熟 可以收取, 去收获,  时间: ${resp.data[0].crop_time}, ID: ${resp.data[0].id}`)
                        await this.harvestWine(resp.data[0].id)  // 收取 制酒
                    } else {
                        $.log(`${this.idx}: 制酒成熟时间：${resp.data[0].crop_time}, ID: ${resp.data[0].id}`)
                    }
                } else if (resp.total == 0) {
                    if (this.wine_yeast > 0 && this.sorghum > 200) {
                        $.log(`${this.idx}: 满足 制酒 条件, 即将 制酒`)
                        await this.makeWine()  // 开启 制酒
                    } else {
                        $.log(`${this.idx}: 不满足 制酒 条件, 跳过 制酒`)
                    }
                } else {
                    $.log(`${this.idx}: 未知错误`)
                }
            } else console.log(`${this.idx}: ${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (error) {
            console.log(error)
        }



    }

    async harvestWine(id) { // 收取 制酒
        let options = {
            fn: '制酒收获',
            method: 'get',
            url: `https://apimallwm.exijiu.com/garden/gardenmemberwine/harvestWine?id=${id}`,
            headers: this.hd_api
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            $.log(`${this.idx}: ${options.fn} -- ${resp.msg}, 自动开始下一次制酒`)
            await $.wait(3)
            await this.adjust()  // 调度
        } else console.log(`${this.idx}: ${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    // 开启 制酒
    async makeWine() {
        try {
            let options = {
                fn: '开启制酒',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/gardenmemberwine/makeWine`,
                headers: this.hd_api,
                form: { "volumn": 200 }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else if (resp.err == 3071) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 开启 制曲
    async makeWineYeast() {
        try {
            let options = {
                fn: '制曲',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/wheat/makeWineYeast`,
                headers: this.hd_api,
                json: { "volumn": 100 }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else if (resp.err == 3071) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }


    // 每日一答
    async answer_survey() {
        try {
            let options = {
                fn: '每日一答',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/Gardenquestiontask/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let { ansid, answer } = resp.data[0]
                await $.wait(2)
                await this.do_answer(ansid, answer)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 回答问题
    // https://apimallwm.exijiu.com/garden/Gardenquestiontask/answerResults?answer=%5B%7B%22itemid%22%3A21%2C%22selected%22%3A%22B%22%7D%5D
    async do_answer(ansid, answer) {
        try {
            let options = {
                fn: '回答问题',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/Gardenquestiontask/answerResults?answer=%5B%7B%22itemid%22%3A${ansid}%2C%22selected%22%3A%22${answer}%22%7D%5D`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }


    // 分享
    async garden_share() {
        try {
            let options = {
                fn: '分享',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/gardenmemberinfo/dailyShare`,
                headers: this.hd_api,
                json: {}
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 查看有机高粱实景相册
    async view_organic_sorghum() {
        try {
            let options = {
                fn: '查看有机高粱实景相册',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/realscene/reward`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else if (resp.err == 4032) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 签到小程序中的
    async dailySign() {
        try {
            let options = {
                fn: '小程序签到',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/sign/dailySign`,
                headers: this.hd_api,
                json: ''
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn}  ${resp.data.tips}, ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 签到有礼 中的  签到表 
    // https://apimallwm.exijiu.com/member/signin/sign
    async do_sign() {
        try {
            let options = {
                fn: '签到有礼',
                method: 'post',
                url: `https://apimallwm.exijiu.com/member/signin/sign`,
                headers: this.hd_api,
                json: 'from=miniprogram_index'
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn}  ${resp.msg}`)
                await $.wait(2)
            } else if (resp.err == 5001) {
                $.log(`${this.idx}: ${options.fn}  ${resp.msg}`)
                await $.wait(1)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 浇水/施肥  获取土地id
    async get_landId(type) {
        try {
            let options = {
                fn: '浇水/施肥',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
                headers: this.hd_api
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                let lists = resp.data
                for (const list of lists) {
                    // console.log(list)
                    let { status, id } = list
                    if (status != -1) {
                        if (type == 1) {
                            await this.watering(id)     // 浇水
                        } else if (type == 2) {
                            await this.manuring(id)     // 施肥
                        }
                        await this.adjust(1)
                    }
                }
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 浇水
    async watering(id) {
        try {
            let options = {
                fn: '浇水',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/sorghum/watering`,
                headers: this.hd_api,
                json: { "id": id }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} --  ${resp.msg}, 当前已浇水次数 ${resp.data.water_num}, 当前已施肥次数 ${resp.data.manure_num}`)

                await $.wait($.randomInt(5, 10))
            } else if (resp.err == 4032) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }


    // 施肥
    async manuring(id) {
        try {
            let options = {
                fn: '施肥',
                method: 'post',
                url: `https://apimallwm.exijiu.com/garden/sorghum/manuring`,
                headers: this.hd_api,
                json: { "id": id }
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} --  ${resp.msg}, 当前已浇水次数 ${resp.data.water_num}, 当前已施肥次数 ${resp.data.manure_num}`)

                await $.wait($.randomInt(5, 10))
            } else if (resp.err == 4032) {
                $.log(`${this.idx}: ${options.fn} -- ${resp.msg}`)
            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }

    // 兑换积分
    async exchange(n) {
        try {
            let options = {
                fn: '兑换积分',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/Gardenjifenshop/exchange?wine=${n}`,
                headers: this.hd_api,
            }
            // console.log(options)
            let resp = await $.request(options)
            // console.log(resp)
            if (resp.err == 0) {
                $.log(`${this.idx}: ${options.fn} --  ${resp.msg}`)


            } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)
        } catch (e) {
            console.log(e)
        }

    }






}


!(async () => {
    console.log(await $.yiyan())
    if ($.read_env(UserClass)) {
        // await userTasks()
        for (let user of $.userList) {
            await user.userTask()
        }
    }


})()
    .catch((e) => $.log(e))
    .finally(() => $.exitNow())


//===============================================================
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
                let DEFAULT_TIMEOUT = 8000      // 默认超时时间
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
                let { statusCode, headers, body } = resp
                if (body) try {
                    body = JSON.parse(body)
                } catch {
                }
                if (type == 'body') {
                    return Promise.resolve(body)
                } else if (type == 'hd') {
                    return Promise.resolve(headers)
                } else if (type == 'statusCode') {
                    return Promise.resolve(statusCode)
                }
            } catch (error) {
                console.log(error)
            }


        }

        log(msg, options = {}) {
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

        async taskThread(taskName, conf, opt = {}) {
            while (conf.idx < $.userList.length) {
                let user = $.userList[conf.idx++]
                await user[taskName](opt)
            }
        }

        async threadManager(taskName, thread) {
            let taskAll = []
            let taskConf = { idx: 0 }
            while (thread--) {
                taskAll.push(this.taskThread(taskName, taskConf))
            }
            await Promise.all(taskAll)
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
            $.log(`账号[${$.userIdx}]: 随机等待 ${t} 秒 ...`)
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