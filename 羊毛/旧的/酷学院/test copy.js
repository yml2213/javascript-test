var request = require('request')
var options = {
    'method': 'POST',
    'url': 'https://jacsupperapp.jac.com.cn/zkapi/jac-admin/admin/userBaseInformation/userLogin',
    'headers': {
        'channelID': '3',
        'Host': 'jacsupperapp.jac.com.cn',
        'User-Agent': 'okhttp/3.10.0',
        'Content-Type': 'application/json; charset=utf-8'
    },
    body: '{"password":"98134fb4e18de4dd42ad1cd8fba5fb4b","userCode":"15614832213"}'

}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})