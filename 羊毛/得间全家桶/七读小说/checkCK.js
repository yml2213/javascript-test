// 青龙配置
const ql_hostname = "http://81.70.196.85:5506"
const client_id = "Mp7bB0_NJzrF"
const client_secret = "KNntfoluXF3q1Rg_kozb3kMu"


class Qinglong {
    constructor(ql_hostname, client_id, client_secret) {
        this.ql_hostname = ql_hostname
        this.ql_api = this.ql_hostname + "/open"
        this.client_id = client_id
        this.client_secret = client_secret
    }

    // get_token 登录
    async login() {
        try {
            let options = {
                "method": "get",
                "url": `${this.ql_api}/auth/token?client_id=${this.client_id}&client_secret=${this.client_secret}`,
                "headers": {},
            }
            // console.log(options);
            let res = await this.http_req(options)
            // console.log(res);
            if (res.code == 200) {
                this.token = res.data.token
            } else if (res.code == 400) {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getEnv() {
        try {
            let options = {
                "method": "get",
                "url": `${this.ql_api}/envs`,
                "headers": {
                    authorization: `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
            }
            // console.log(options);
            let res = await this.http_req(options)
            // console.log(res);
            if (res.code == 200) {
                console.log(res.data)
                console.log(res.data.length)
                return res.data
            } else if (res.code == 400) {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    async addEnv(data) {
        try {
            let options = {
                "method": "POST",
                "url": `${this.ql_api}/envs`,
                "headers": {
                    "authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            // console.log(options);
            let res = await this.http_req(options)
            console.log(res)
            console.log(JSON.stringify(res))
            if (res.code == 200) {
                // console.log(`添加成功`)
                // console.log(res.data);
                return {code: 0, data: res.data}
                // return res.data
            } else if (res.code == 400) {
                console.log(res.message, "ck重复")
                // return "ck重复, 请确认后再上传!"
                return {code: 1, data: "ck重复, 请确认后再上传!"}
            }
        } catch (error) {
            console.log(`未知错误\n${error}`)
            return {code: 1, data: error}
        }
    }


    async checkRepeatedEnv(data) {
        try {
            let options = {
                "method": "POST",
                "url": `${this.ql_api}/envs`,
                "headers": {
                    "authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            // console.log(options);
            let res = await this.http_req(options)
            console.log(res)
            console.log(JSON.stringify(res))
            if (res.code == 200) {
                // console.log(`添加成功`)
                // console.log(res.data);
                return {code: 0, data: res.data}
                // return res.data
            } else if (res.code == 400) {
                console.log(res.message, "ck重复")
                // return "ck重复, 请确认后再上传!"
                return {code: 1, data: "ck重复, 请确认后再上传!"}
            }
        } catch (error) {
            console.log(`未知错误\n${error}`)
            return {code: 1, data: error}
        }
    }

    async deleteEnv(data) {
        try {
            let options = {
                "method": "DELETE",
                "url": `${this.ql_api}/envs`,
                "headers": {
                    "authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            // console.log(options);
            let res = await this.http_req(options)
            console.log(res)
            if (res.code == 200) {
                console.log(`删除成功`)
            } else if (res.code == 400) {
                console.log(res.message)
            }
        } catch (error) {
            console.log(`未知错误\n${error}`)

        }
    }


    async putEnv(data) {
        try {
            let options = {
                "method": "PUT",
                "url": `${this.ql_api}/envs`,
                "headers": {
                    "authorization": `Bearer ${this.token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
            // console.log(options);
            let res = await this.http_req(options)
            console.log(res)
            if (res.code == 200) {
                console.log(`更新成功`)
            } else if (res.code == 400) {
                console.log(res.message)
            }
        } catch (error) {
            console.log(`未知错误\n${error}`)

        }
    }

    async http_req(options) {
        const request = require("request")

        return new Promise((resolve, reject) => {

            function isJsonString(str) {
                if (typeof str == "string") {
                    try {
                        if (typeof JSON.parse(str) == "object") {
                            return true
                        }
                    } catch (e) {
                        return false
                    }
                }
                return false
            }

            request(options, function (error, response) {
                if (error) throw new Error(error)
                // response.body
                let data = response.body
                try {
                    if (typeof data == "string") {
                        if (isJsonString(data)) {
                            resolve(JSON.parse(data))
                        } else {
                            resolve(data)
                        }
                    } else {
                        resolve(data)
                    }
                } catch (e) {
                    console.log(error, response)
                    reject(error)
                }
            })
        })
    }


}


async function add_data(remark, value) {
    let ql_data = [{
        "value": value,
        "name": "qdxs",
        "remarks": remark,
    }]
    const ql = new Qinglong(ql_hostname, client_id, client_secret)
    await ql.login()
    // console.log(data_ql)
    return await ql.addEnv(ql_data)
}

async function checkRepeatedEnv(remark, value) {
    console.log(`===`)
    const ql = new Qinglong(ql_hostname, client_id, client_secret)
    await ql.login()
    console.log(data_ql)
    // let ql_data = [{
    //     "value": value,
    //     "name": "qdxs",
    //     "remarks": remark,
    // }]
    // const ql = new Qinglong(ql_hostname, client_id, client_secret)
    // await ql.login()
    // // console.log(data_ql)
    // return await ql.addEnv(ql_data)
}


(async () => {
    console.log(await checkRepeatedEnv())
})()


module.exports = {
    add_data,
}