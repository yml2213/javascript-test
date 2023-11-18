
const fs = require('fs')
const crypto = require('crypto')
const https = require('https')

let f_name = 'kuaishou_dt_sign_v2.jsc'
let f_name_md5 = 'a26279560717ffb0cbc1f36291fda9f7'

console.log('------------------------- 开始检测脚本执行环境 -----------------------------\n')
// console.log(process.version)
if (process.version == 'v18.17.1' && process.env.QL_BRANCH == 'v2.16.3') {
  console.log(`环境检测通过了鸭 √`)

  let pwd = process.env.PWD
  // console.log(pwd)

  fs.readdir(pwd, (err, files) => {
    if (err) {
      console.log(`读取目录 ${pwd} 失败：`, err)
      return
    }
    // 检查文件数组中是否包含指定文件
    if (files.includes(f_name)) {
      console.log(`找到文件 ${f_name}, 开始执行脚本!`)
      require('bytenode')
      require(`./${f_name}`)
    } else {
      console.log(`指定文件 ${f_name} 不存在, 开始下载文件!`)


      const fileUrl = `https://raw.githubusercontent.com/yml2213/javascript/master/ks/2.16.3/${f_name}` // 文件下载地址
      const filePath = `./${f_name}` // 下载后的文件

      // 创建一个可写流，将下载的二进制数据写入目标文件
      const targetStream = fs.createWriteStream(filePath)

      // 发起 HTTP 请求，获取文件内容
      https.get(fileUrl, (response) => {
        // 将响应管道到可写流中，实现下载操作
        response.pipe(targetStream)

        // 监听下载完成事件
        targetStream.on('finish', () => {
          console.log(`文件 ${f_name} 下载完成, 即将校验md5`)
          calculateMD5(filePath)
            .then((md5) => {
              console.log(`下载文件的 MD5 值为: ${md5}`)
              // 进行后续操作，比较 MD5 值等等
              if (md5 == f_name_md5) {
                console.log(`文件 ${f_name},md5校验成功, 请重新运行本脚本即可`)
              } else {
                console.log(`文件 ${f_name}--${md5},下载完成, 但是md5值不对, 请自行上传文件!`)
              }
            })
            .catch((error) => {
              console.error('计算 MD5 值时出错:', error)
            })
        })
      })
    }
  })

} else {
  console.log(`您的青龙版本: ${process.env.QL_BRANCH} 或 您的 node 版本 ${process.version} 不对, 请检查!`)
}


function calculateMD5(filePath) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(filePath)
    const hash = crypto.createHash('md5')

    stream.on('data', (data) => {
      hash.update(data)
    })

    stream.on('end', () => {
      const md5 = hash.digest('hex')
      resolve(md5)
    })

    stream.on('error', (error) => {
      reject(error)
    })
  })
}