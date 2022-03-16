let pl = require('request');
const request = require("request");
let headers = { };
let uid= 452326;
let options = {
    url: 'https://app.site.10yan.com.cn/index.php?s=/Api/Newsv4/newslist&page=1&type=reply&source=android',
    headers: headers
};
function callback(error, response, body1) {
    if (!error && response.statusCode == 200) {
        // console.log(body);
        let wz_data = JSON.parse(body1);

        for (let i = 1; i < 3; i++) {
            wzid = wz_data.list[i].contentid
            console.log(wzid)

            //  开始发送评论
            let request = require('request');
            let headers = {
                'User-Agent': 'Apipost client Runtime/+https://www.apipost.cn/',
                'Content-Type': 'application/x-www-form-urlencoded'
            };
            let options = {
                url: `https://app.site.10yan.com.cn/index.php?s=/Api/Article/artReply/&actiontype=12&contentid=${wzid}&reply=十堰越来越好了！&uid=${uid}&source=android&build=145`,
                headers: headers
            };
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                }
            }



        }

    }
}
pl(options, callback);

