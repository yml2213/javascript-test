var request = require('request')
var options = {
    'method': 'POST',
    'url': 'https://wlkdapi.zhongchuanjukan.com/article/read',
    'headers': {
        'sppid': 'efeb405acb7f489d009029ff9f52cd8c',
        'User-Agent': 'Apifox/1.0.0 (https://www.apifox.cn)',
        'content-type': 'application/json; charset=UTF-8'
    },
    body: '{"artClassify":0,"artId":"818254426","sensorX":"4.5813534E-4","sensorY":"-6.1084546E-4","sensorZ":"-1.5271181E-4","appversion":"2.0.9","appversioncode":"209","brand":"Xiaomi","channel":"SC_XIAOMI_A","darkmode":1,"device_userid":"","imei":"","model":"M2102J2SC","oaid":"e998cb31be347dc0","optime":1678436829,"os":"android","osversion":"12","osversioncode":"31","smid":"-1","sysname":"wlkd","token":"eb75339a06ca4585b0fd9d24acb0ac03","userid":"d0a1c840f929497a8ea6f97be0f16a57"}'

}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})