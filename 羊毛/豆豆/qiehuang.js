var request = require('request')
var options = {
    'method': 'GET',
    'url': 'https://fhda1v6s.act.tmuact.com/activity/api.php?m=front&subm=lottery&action=drawprize&preview=0&lat=&lng=',
    'headers': {
        'Host': 'fhda1v6s.act.tmuact.com',
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_2_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_nanhu;1.0.2;Appstore;native_app',
        'Referer': 'https://fhda1v6s.act.tmuact.com/lottery/index.html',
        'Accept-Language': 'zh-cn',
        'X-Requested-With': 'XMLHttpRequest',
        'Cookie': 'PHPSESSID=r6qc0sldtg27l7k4ua6mcvaoh5; acw_tc=76b20ff116902850494287796e2aaff0e161d33e758f853247ee497ffb3a4a'
    }
}
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})