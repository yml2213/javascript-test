





let $ = new Env('picovr助手', 'picovr', {
    author: '\n\n  特别感谢小小大佬新模板   本脚本 by_yml',
    notify: 2
})
let http = new Http('https://bbs.picovr.com', {
    'Content-Type': 'application/json'
})


class UserInfo extends User {
    constructor(index, ck) {
        super(index)
        this.cookie = ck
    }
    getHeaders() {
        return {
            Cookie: this.cookie
        }
    }

    /**
     * 主入口
     */
    async main() {
        await this.signIn()
        await this.taskList()
    }
    /**
     * 查看收益的实现
     */
    async balance() {
        await this.points()
    }

    async signIn() {
        let name = '签到'
        let body = ''
        let resp = await http.post('ttarch/api/growth/v1/checkin/create?app_id=264482', this.getHeaders(), body)
        // console.log(resp)

        let {
            score,
            status
        } = resp.data.point_records[0]
        if (resp.err_no == 0 && status == 0) {
            console.log(`账号 ${this.index} : 成功, 获得 ${score} 积分`)
        } else if (status == 2) {
            console.log(`账号${this.index}: 今天已经签到过了鸭，明天再来吧!`)
        } else console.log(`${name}: 失败 ❌ 了呢,原因未知!`), console.log(resp)
    }


    async taskList() {
        let name = '获取首页文章'
        let resp = await http.get('ttarch/api/content/v1/content/list_by_pool_page', this.getHeaders(), {
            app_id: 264482,
            page_size: 20,
            page_index: 1,
            pool_type: 0,
            category_id: 152,
            item_type: 2,
            sort_type: 1,
            service_id: 0,
            lang: 'zh-Hans-CN'
        })
        // console.log(resp)
        await userGqcqRespLog(name, this, resp, () => {
            return success200(resp, async () => {
                let data = resp.data
                let d = time$1.date()
                let mo = time$1.month()
                let a = `${mo} 月 ${d} 日`
                for (let index = 0; index < data.length; index++) {
                    const element = data[index]
                    if (element.content.name.indexOf(a) > -1) {
                        console.log(`${a} 的文章获取成功`, element.content.item_id)
                        this.item_id = element.content.item_id
                        await this.getComment(element.content.item_id)
                    }
                }
            })
        })
    }

    async getComment(id) {
        let name = '获取评论'
        let resp = await http.get('ttarch/api/interact/v1/comment/list_with_top', this.getHeaders(), {
            app_id: 264482,
            page_size: 10,
            item_id: id,
            item_type: 2,
            comment_id: '',
            service_id: 0,
            lang: 'zh-Hans-CN'
        })

        // console.log(name, resp)
        await userGqcqRespLog(name, this, resp, () => {
            return success200(resp, async () => {
                let data = resp.data
                // console.log(data[0].comment.content)
                await this.doComment(data[0].comment.content)
            })
        })
    }


    async doComment(text) {
        let name = '执行评论'
        let body = {
            comment: {
                item_type: 2,
                item_id: this.item_id,
                content: text,
                rec_list: []
            }
        }

        let hd = this.getHeaders()
        let resp = await http.post(
            'ttarch/api/interact/v1/comment/create?app_id=264482&service_id=0&lang=zh-Hans-CN',
            hd,
            body
        )
        // console.log(name, resp)
        await userGqcqRespLog(name, this, resp, () => {
            return success200(resp, async () => {
                console.log(`准备评论:  内容 --- ${text}`)
                if (!resp.err_msg) {
                    console.log(`${name}:成功`)
                } else {
                    console.log(`${name}: 失败\n${resp} `)
                }
            })
        })
    }

    async points() {
        let name = '查询积分'
        // app_id = 264482 & user_id=2933937750156011 & service_id=0 & lang=zh - Hans - CN
        let resp = await http.get('ttarch/api/growth/v1/user/get', this.getHeaders(), {
            app_id: 264482,
            // user_id: 2933937750156011,
            service_id: 0,
            lang: 'zh-Hans-CN'
        }
        )
        // console.log(name, resp)
        await userGqcqRespLog(name, this, resp, () => {
            return success200(resp, async () => {
                this.sendLog(`${name}: 您有 ${resp.data.growth_info.point} 积分`)
            })
        })
    }


}











