let pl = require('request');
let headers = { };
let uid= 452326;
let options = {
    url: 'https://app.site.10yan.com.cn/index.php?s=/Api/Newsv4/newslist&page=1&type=reply&source=android',
    headers: headers
};
function callback(error, response, body1) {
    if (!error && response.statusCode == 200) {
        // console.log(body);
        let wz_daat = JSON.parse(body1);

        for (let i = 1; i < 3; i++) {
            wzid = wz_daat.list[i].contentid
            console.log(wzid)

            //  开始发送评论
            let request = require('request');
            let headers = { };
            let options = {
                url: `https://app.site.10yan.com.cn/index.php?s=/Api/Article/artReply/&actiontype=12&contentid=${wzid}&reply=十堰越来越好了！&uid=${uid}&source=android&build=145`,
                headers: headers
            };
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                }
            }
            request(options, callback);

            // 获取评论列表
            let request1 = require('request');
            let headers1 = { };
            let options1 = {
                url: `https://app.site.10yan.com.cn/index.php?s=/Api/Article/index/&contentid=${wzid}&page=1&uid=${uid}`,
                headers: headers1
            };
            function callback(error, response, body2) {
                if (!error && response.statusCode == 200) {
                    // console.log(body2);
                    var wzpl_data = JSON.parse(body2);
                    for (let i = 0; i < wzpl_data.list.length; i++) {
                        wzpl = wzpl_data.list[i].userid;
                        console.log(wzpl)
                        if (wzpl == `${uid}`) {
                            console.log(`====111=====`)
                            console.log(wzpl_data.list[i].pid)
                            console.log(`=====22=====`)
                            rid = wzpl_data.list[i].pid

                            // 删除评论
                            let request = require('request');
                            let headers = {    };
                            let dataString = `rid=${rid}&uid=${uid}&source=android&ver=6.2.3&build=145`;

                            var options = {
                                url: 'https://app.site.10yan.com.cn/index.php?s=/Api/Article/delReply/',
                                method: 'POST',
                                headers: headers,
                                body: dataString
                            };

                            function callback(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    console.log(body);
                                }
                            }

                            request(options, callback);



                        }
                    }

                }
            }
            request(options1, callback);


        }

    }
}
pl(options, callback);

