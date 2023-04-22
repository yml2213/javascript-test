/**
 * @title qinglong_updataCk
 * @create_at 2022-12-26 10:01:26
 * @module true
 * @description ??这个人很懒什么都没有留下。
 * @author 小小 & yml
 * @version v1.0.0
 */

const qinglong = require("qinglong")


let host = "http://192.168.1.200:5504"
let client_id = "d9_P79hhWNi4"
let client_secret = "m-BGxtdEjKOKqephU6i33E1O"


/**
 * 添加或更新ck
 */
function addOrUpdateCk(remarks, ckName, ck) {

    let token = qinglong.Get_QL_Token(host, client_id, client_secret)
    // s.reply("获取到token：" + JSON.stringify(token))
    let searchKey = encodeURI(remarks)
    let envs = Get_QL_Envs(host, token, searchKey)
    // s.reply("查询到环境变量：" + JSON.stringify(envs))
    console.log(envs)
    searchKey = remarks
    console.log(searchKey)

    let env = [{ name: ckName, value: ck, remarks: searchKey }]
    if (envs.length > 0) {
        let id = envs[0].id
        s.reply("更新环境变量：" + JSON.stringify(env))
        qinglong.Update_QL_Env(host, token, id, ckName, ck, searchKey)
        s.reply("更新完成")

    } else {
        console.log("env", JSON.stringify(env))
        s.reply("添加环境变量：" + JSON.stringify(env))
        qinglong.Add_QL_Envs(host, token, env)
        s.reply("添加完成")

    }


}


//获取所有青龙环境变量,成功返回环境变量对象数组
function Get_QL_Envs(host, token, searchValue) {
    try {
        let url = host + "/open/envs"
        if (searchValue) {
            url += "?searchValue=" + searchValue
        }
        console.log(url)
        let data = request({
            url: url,
            method: "get",
            headers: {
                accept: "application/json",
                Authorization: token.token_type + " " + token.token
            }
        })
        return JSON.parse(data.body).data
    }
    catch (err) {
        return null
    }
}



module.exports = {
    addOrUpdate: addOrUpdateCk,

}