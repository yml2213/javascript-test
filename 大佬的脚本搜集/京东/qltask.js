// console.log(process.env)

let ckName = 'gqcq'
async function qltask(type, eid) {
    const { getEnvs, getEnvById, DisableCk, EnableCk, getstatus } = require('./ql_yml')
    if (type == 'getEnvs') {
        const envs = await getEnvs(ckName)
        console.log(envs)
        return envs
    } else if (type == 'getEnvById') {
        cookie = await getEnvById(ckName, eid)
        if (cookie) {
            return cookie
        } else return false
    } else if (type == 'DisableCk') {
        const DisableCkBody = await DisableCk(eid)
        if (DisableCkBody.code == 200) {
            console.log(`账号${eid}: 禁用成功  ❌`)
            return true
        } else return false
    } else if (type == 'EnableCk') {
        const DisableCkBody = await EnableCk(eid)
        if (DisableCkBody.code == 200) {
            console.log(`账号${eid}: 启用成功 ✅`)
            return true
        } else return false
    } else if (type == 'getstatus') {
        console.log(`账号${eid}: 111`)
        console.log(getstatus)
        const strnowstatus = await getstatus(eid)
        console.log(`账号${eid}: ${strnowstatus}`)
        if (strnowstatus == 99) {
            console.log(`账号${eid}: 未知错误`)
        } else if (strnowstatus == 0) {
            console.log(`账号${eid}: 状态 -- 已启用 ✅`)
        } else if (strnowstatus == 1) {
            console.log(`账号${eid}: 状态 -- 已禁用 ❌`)
        }
    }

}



async function main() {
    await qltask('getEnvs')
    await qltask('getstatus', 3)
}
main()

