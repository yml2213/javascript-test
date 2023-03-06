var rs = require("jsrsasign")
let { KEYUTIL, KJUR, hextob64, hextob64u } = rs

// import { KEYUTIL, KJUR, hextob64, hextob64u } from 'jsrsasign';


const privateKeyString = `-----BEGIN PRIVATE KEY-----MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCKeaOFPXGp7N80uoPzQ8Ncz9fyPM8fvKj52szC4bSFWuS66ZZdo/vHFj4zLahQ2slL/begQfGSC4elaaX1wpFgEbyucYyulDOcHz0O5vvQDtySpnEu4b3AX2JfhQKtEJdK1pwDgzV+uLi0T2wBua7NADyiVL9J1KiVrywDKN+pclgVy2+sqK1wKWWKMha2HS/NlqfmNyxCdvnTuE6D20lIsPUmrkE2ZwkrlqivHTI4gWh6ONqjtPSd76lhgBV2svO9D7aMRz96BcV4XVqYdBXzbArOmd/rfXFWty6spGqqCBcHX79QUwarNVWrK7cprPZMatx3Y4N5pIait/F9c3jBAgMBAAECggEBAIfJmdDJHNF9Zq8lCskcNNGpOl/ew1iivqwro0ii3Us7gznKXtm6OOXT6PB0oC2RLX1n8Y2jvIfy6HQK8mPZBIdJPVVuIX778tPwSgZ3+IvgVukzb5+CW3jtz+BM5P/iWglYAyrqmiWGbBDcJNRYSZHa3ppsMhvq/dmyKZ17kj9sVRaJXauejkbhiIYKpOFXdYnPGQEU1sMjYNfSzo7h3OtfunFuPuQ+TCTHUetkJHy2cMy3bYsl/diRmvM+dqOJit+uFDVAxxg/j4LDu1q4yHhQofJ8/kpQNRYDOT1xi/vKPf+XoLwHns9fw/Azv1JCg76kc0uMIA5EzXyCIME0VHUCgYEA8cwQk/heAb8OiUgSc1YRE7ztGFYMBZ838LVUboIX38h4EeCBlsrlNhQoXEbuXh+x1kVKElURwLA8BJoXJMyQfAvi8QWkfTPWGm0b7V0KMdCWW9oM00nU5iVyFWkk2mAn+/j8uvVqlUVEDtWFgQZ/QefPS25jzuDfyuZ1fe4Yp2sCgYEAkpvoZ6ECt46Tn2t+4EuE2aSegd8CvzGwGHZeBIt6utfWO6bLr5vHS529qb3dKL41019P9oiRR/SSTLZSsVOsAytv1JMEPeoDY3Fxh/GULODkLq2NnapskQP11XlDt7xjazeJsxS8s2KP6yeA63dxOZ3iv4C0nCgIJ7gSCe+dp4MCgYBsbhNdF7qoU9Ij8+L6P7VGwakdCbE4cC74zYgASmyEWPSnJ6NVSMVC3AVBZDmOke4A5W+TCvz8CMvRUHxiby23wujRJrOdxboUfatRZTCmKCDVLdIkie5kCpS/TzhMiWRE1WIYQOe76qTbdhr5Qj2dA2PtMqKlaihRZ8l2YGhD4wKBgQCHJ8WzqyJ3F7CN2iqIGfaqMfGSZoYAvozJsG1yISeOkiXErjq+dIzg79WGYys8QUYby5VLAJF2VUh+AeLv6OP9tBCPVs0lStO+3Dk+iv3/9X9GbObN/+vAMHd0Siucecbpc7S07Bwd/3IP5kYaTO2LoTsFMmDOSLVj8HRoxoZ/gwKBgQCXjMPO9bnv03JYQ3EzJbM1UuokRu0iXRaZ3BzRj3jHBKELrsKBDXNdaJLUJyqDQJE18lJJRQC+JciNA5kFuzdLjwfu4GHIHFXQSBuNdz8BKXPltxjBObhr9ycNeLXWIQnZo0iGQiHc/+6aC88cw4gGZtuW+gWRa7QxTtgTNWrbgw==
-----END PRIVATE KEY-----`

function sha256withRSA(inputString) {
    const key = KEYUTIL.getKey(privateKeyString)
    // 创建 Signature 对象，设置签名编码算法
    const signature = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' })
    // 初始化
    signature.init(key)
    // 传入待加密字符串
    signature.updateString(inputString)
    // 生成密文
    const originSign = signature.sign()
    const sign64 = hextob64(originSign)
    // console.log('sign base64 =======', sign64)
    // const sign64u = hextob64u(originSign)
    // console.log('sign base64u=======', sign64u)
    return sign64
}


let a = 'appId=105291391&country=CN&lang=zh_CN&ver=10100143&appVer=1.1.0.143&timestamp=20230225050908{"signText":1}b5d906bfe573ec7b0eb3d9f96d3513ed'
console.log(sha256withRSA(a))
