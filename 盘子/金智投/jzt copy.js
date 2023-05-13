var request = require('request')
var options = {
    'method': 'GET',
    'url': 'http://45.119.96.156:30955/index/user/cash',
    'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'zh-CN,zh;q=0.9',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Pragma': 'no-cache',
        'Referer': 'http://45.119.96.156:30955/index/user',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
        'Cookie': 'sf458128c=k50iie8c4jgvr4bfhsdjn0iam5'
    }
}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})