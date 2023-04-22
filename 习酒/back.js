// ==================== 暂时不用 ====================

`一)活动流程
第一步: 种植有机高粱或小麦, 每次成熟可收获对应作物100斤:
第二步: 拥有足够的小麦后进入制曲页面进行制曲, 100斤小麦可
制造10块酒曲:
第三步: 拥有足够的高染和酒曲后进入制酒页面进行制酒, 200斤
高粱和1块酒曲可酿40L酒:
第第四步: 酿好的酒可在种植页面中兑换积分:
第五步: 积分可抽奖或兑换礼品。
（二)有机高梁/小麦成熟（可加速成长）
作物的成长经历为: 播种-小苗（ 2.5小时)-大苗（ 2.5小时）-成熟, 
浇水1次或施肥1次可减少0.5小时。
（三)制曲
拥有足够的小麦后进入制曲页面进行制曲, 100斤小麦可制造10块
酒曲, 每次最多可投放1000斤小麦制曲。
(四)制酒（ 2.5小时成熟, 不可加速）
拥有足够的高粱和酒曲后进入制酒页面进行制酒, 每200斤高粱加
1块酒曲可酿40L酒, 每次最高可投放5000斤高粱。
（五）)怎么把酒兑换成积分
点击酿酒的气泡就可以收下酿好的酒, 然后进入种植地点击兑换商
城, 输入酒的毫升数兑换积分, 1L酒兑换1积分。
(六)怎么抽奖
点击活动页面的抽奖, 参与抽奖, 100积分抽一次, 奖品如下: 

100斤小麦 == 10 块酒曲

1 块酒曲  + 200斤高粱 ==40 L 酒  == 40 积分



`



class q {

    // 是否种植小麦
    async is_wheat() {
        let options = {
            fn: '是否种植小麦',
            method: 'get',
            url: `https://apimallwm.exijiu.com/garden/gardenmemberinfo/getMemberInfo`,
            headers: this.hd_api
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) {
            if (resp.data.wine_yeast <= 2) {
                await this.do_wheat() //种植小麦
            }
            // $.log(`${this.idx}: ${options.fn} 成功 `)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }

    async is_mature() { // 判断是否成熟  可收获
        let options = {
            fn: '是否成熟',
            method: 'get',
            url: `https://apimallwm.exijiu.com/garden/sorghum/index`,
            headers: this.hd_api
        }
        // console.log(options)
        let resp = await $.request(options)
        // console.log(resp)
        if (resp.err == 0) { // 1 高粱     2 小麦
            let lists = resp.data
            for (let i = 0; i < lists.length; i++) {
                const element = lists[i]
                let name = element.type == 1 ? '高粱' : '小麦'
                if (element.status != -1) {  // 排除未开发的土地
                    if (element.status == 2) {
                        $.log(`${this.idx}: 第 ${i + 1} 块田地, ${name} 已成熟, 尝试自动收获(${element.id})`)
                        await this.harvest(element.id)
                    } else if (element.status != 2) {
                        $.log(`${this.idx}: 第 ${i + 1} 块田地, ${name} 未成熟, 预计 ${element.crop_time} 成熟`)
                    }
                }

            }


            if (resp.data.wine_yeast <= 2) {
                await this.do_wheat() //种植小麦
            }
            // $.log(`${this.idx}: ${options.fn} 成功 `)
        } else console.log(`${options.fn}: 失败,  ${JSON.stringify(resp)}`)

    }


    // 收获   https://apimallwm.exijiu.com/garden/sorghum/harvest
    async harvest(id) {
        try {
            let options = {
                fn: '收获',
                method: 'get',
                url: `https://apimallwm.exijiu.com/garden/sorghum/harvest`,
                headers: this.hd_api,
                json: { "id": id }
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



    // 判断时间 大小
    ts_vs(a) {
        // 获取当前时间 b, 自定义时间 a
        let b = new Date()
        a = a.replace("-", "/")
        a = new Date(Date.parse(a))
        if (a > b) {
            console.log('自定义时间大于当前时间, 还未发生')
            return true
        } else {
            console.log('自定义时间小于当前时间, 已经过去')
            return false
        }
    }

}


