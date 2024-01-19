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
                // console.log(res.data)
                // console.log(res.data.length)
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
    let dataEnv = await ql.getEnv()
    // console.log(dataEnv)
    // console.log(dataEnv.length)

    dataEnv = [
        {
            id: 9,
            value: '723756771#16665431356#{"usr":"j184835459","utdid":"ZMDmjRs4Vh4Jw0pd8FZsTacE","token":"a75e7ac2f488881afaba59f9c06657c3","authToken":"15c136fe317185f57fa39e750ae8f32d","nickname":"回风雷阁锻炼滴崔百胜"}',
            timestamp: 'Tue Dec 05 2023 13:02:16 GMT+0800 (China Standard Time)',
            status: 0,
            position: 4499945000000000,
            name: 'qdxs',
            remarks: '723756771',
            createdAt: '2023-12-04T15:41:23.341Z',
            updatedAt: '2023-12-05T05:02:16.171Z'
        },
        {
            id: 12,
            value: '5292953419#12265431356#{"usr":"j185134359","utdid":"ZMsfr1o8VmG9LLEE90Qj98Ih","token":"5b3a00a83565cbb46c581a1b8354e54b","authToken":"c772298aa315ec48269c46cbfba0cc40","nickname":"来炎武城赴约的小茂典"}',
            timestamp: 'Tue Dec 05 2023 00:15:56 GMT+0800 (China Standard Time)',
            status: 0,
            position: 4499940000000000,
            name: 'qdxs',
            remarks: '5292953419',
            createdAt: '2023-12-04T16:15:56.139Z',
            updatedAt: '2023-12-04T16:15:56.139Z'
        },
        {
            id: 15,
            value: '5292953419#16665431356#{"usr":"j185134359","utdid":"ZMsfr1o8VmG9LLEE90Qj98Ih","token":"5b3a00a83565cbb46c581a1b8354e54b","authToken":"c772298aa315ec48269c46cbfba0cc40","nickname":"来炎武城赴约的小茂典"}',
            timestamp: 'Tue Dec 05 2023 00:15:56 GMT+0800 (China Standard Time)',
            status: 0,
            position: 4499940000000000,
            name: 'qdxs',
            remarks: '5292953419',
            createdAt: '2023-12-04T16:15:56.139Z',
            updatedAt: '2023-12-04T16:15:56.139Z'
        },
    ];


    const phoneMap = {};
    const oldItems = [];

    dataEnv.forEach(obj => {
        const phoneNumber = obj.value.split('#')[1]; // Extracting phone number from 'value'
        const createdAt = new Date(obj.createdAt).getTime(); // Converting 'createdAt' to milliseconds

        if (phoneMap[phoneNumber]) {
            const existingTimestamp = new Date(phoneMap[phoneNumber].createdAt).getTime();
            if (createdAt < existingTimestamp) {
                oldItems.push(phoneMap[phoneNumber].id); // Save ID of the older item
                delete phoneMap[phoneNumber]; // Remove the newer item from the map
                phoneMap[phoneNumber] = obj; // Update with the older object
            } else {
                oldItems.push(obj.id); // Save ID of the older item
            }
        } else {
            phoneMap[phoneNumber] = obj; // Add if phone number doesn't exist in the map
        }
    });

    console.log("Old Items' IDs:", oldItems);
    if (oldItems.length){
        // await delete_by_id(oldItems)
    }else {
        console.log(`没有重复项`)
    }

    async function delete_by_id(id) {
        const ql = new Qinglong(ql_hostname, client_id, client_secret)
        await ql.login()
        let res = await ql.deleteEnv(id)
        if (res.code == 200) {
            console.log(`删除重复项 ${id} 成功`)
            return "删除成功"
        }
        return "删除失败, 清联系 @yml2213"
    }


}







(async () => {
    await checkRepeatedEnv()
})()


module.exports = {
    add_data,
}