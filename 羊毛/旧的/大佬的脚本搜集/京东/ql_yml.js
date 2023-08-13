'use strict'

const got = require('got')
require('dotenv').config()
const { readFile } = require('fs/promises')
const path = require('path')

const qlDir = '/ql'
const fs = require('fs')
let Fileexists = fs.existsSync('/ql/data/config/auth.json')
let authFile = ""
if (Fileexists)
    authFile = "/ql/data/config/auth.json"
else
    authFile = "/ql/config/auth.json"
//const authFile = path.join(qlDir, 'config/auth.json');

const api = got.extend({
    prefixUrl: 'http://127.0.0.1:5600',
    retry: { limit: 0 },
})

async function getToken() {
    const authConfig = JSON.parse(await readFile(authFile))
    return authConfig.token
}

module.exports.getEnvs = async (ckName) => {
    const token = await getToken()
    const body = await api({
        url: 'api/envs',
        searchParams: {
            searchValue: ckName,
            t: Date.now(),
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
        },
    }).json()
    return body.data
}


module.exports.DisableCk = async (eid) => {
    const token = await getToken()
    const body = await api({
        method: 'put',
        url: 'api/envs/disable',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}

module.exports.DisableCk_ByCk = async (ckName, ck_) => {
    const token = await getToken()
    let eid = await this.getIdByCk(ckName, ck_)
    if (eid) {
        const body = await api({
            method: 'put',
            url: 'api/envs/disable',
            params: { t: Date.now() },
            body: JSON.stringify([eid]),
            headers: {
                Accept: 'application/json',
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json;charset=UTF-8',
            },
        }).json()
        return body
    } else return false

}

// 获取 id 通过 ck 
module.exports.getIdByCk = async (ckName, ck_) => {
    const envs = await this.getEnvs(ckName)
    let tempck = '', tempid = 0
    for (let i = 0; i < envs.length; i++) {
        tempck = envs[i].value, tempid = 0
        if (envs[i]._id) {
            tempid = envs[i]._id
        }
        if (envs[i].id) {
            tempid = envs[i].id
        }
        if (tempck == ck_) {
            return tempid
        }
    }
    return ""
}

module.exports.EnableCk = async (eid) => {
    const token = await getToken()
    const body = await api({
        method: 'put',
        url: 'api/envs/enable',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}

module.exports.getstatus = async (ckName, eid) => {
    const envs = await this.getEnvs(ckName)
    var tempid = 0
    for (let i = 0; i < envs.length; i++) {
        tempid = 0
        if (envs[i]._id) {
            tempid = envs[i]._id
        }
        if (envs[i].id) {
            tempid = envs[i].id
        }
        if (tempid == eid) {
            console.log(`=======getstatus=====`)
            console.log(eid)
            console.log(`=======getstatus end=====`)
            return envs[i].status
        }
    }
    return 99
}

module.exports.getEnvById = async (ckName, eid) => {
    const envs = await this.getEnvs(ckName)
    var tempid = 0
    for (let i = 0; i < envs.length; i++) {
        tempid = 0
        if (envs[i]._id) {
            tempid = envs[i]._id
        }
        if (envs[i].id) {
            tempid = envs[i].id
        }
        if (tempid == eid) {
            return envs[i].value
        }
    }
    return ""
}



module.exports.getEnvByPtPin = async (ckName, Ptpin) => {
    const envs = await this.getEnvs(ckName)
    for (let i = 0; i < envs.length; i++) {
        var tempptpin = decodeURIComponent(envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/) && envs[i].value.match(/pt_pin=([^; ]+)(?=;?)/)[1])
        if (tempptpin == Ptpin) {
            return envs[i]
        }
    }
    return ""
}

module.exports.delEnv = async (eid) => {
    const token = await getToken()
    const body = await api({
        method: 'delete',
        url: 'api/envs',
        params: { t: Date.now() },
        body: JSON.stringify([eid]),
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}

module.exports.getEnvsCount = async (ckName) => {
    const data = await this.getEnvs(ckName)
    return data.length
}

module.exports.addEnv = async (ckName, cookie, remarks) => {
    const token = await getToken()
    const body = await api({
        method: 'post',
        url: 'api/envs',
        params: { t: Date.now() },
        json: [{
            name: ckName,
            value: cookie,
            remarks,
        }],
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}

module.exports.updateEnv = async (ckName, cookie, eid, remarks) => {
    const token = await getToken()
    const body = await api({
        method: 'put',
        url: 'api/envs',
        params: { t: Date.now() },
        json: {
            name: ckName,
            value: cookie,
            _id: eid,
            remarks,
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}

module.exports.updateEnv11 = async (ckName, cookie, eid, remarks) => {
    const token = await getToken()
    const body = await api({
        method: 'put',
        url: 'api/envs',
        params: { t: Date.now() },
        json: {
            name: ckName,
            value: cookie,
            id: eid,
            remarks,
        },
        headers: {
            Accept: 'application/json',
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json;charset=UTF-8',
        },
    }).json()
    return body
}