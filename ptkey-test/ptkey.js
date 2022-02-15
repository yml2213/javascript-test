//[rule: 呼叫东哥]

importJs('./md5')
const request = require('request');
const s = Sender;
//  声明变量 mobile、appid、qversion、country_code
var mobile, smscode, gsalt;
var appid = 959;
var qversion = '1.0.0';
var country_code = 86;



// timestamp
var ts = Date.now();

var sub_cmd = 1;
var gsign = `9591.0.0${ts}361sb2cwlYyaCSN1KUv5RHG3tmqxfEb8NKN`;
gsign = MD5(gsign);

var d = `client_ver=1.0.0&gsign=${gsign}&appid=959&return_page=https%3A%2F%2Fcrpl.jd.com%2Fn%2Fmine%3FpartnerId%3DWBTF0KYY%26ADTAG%3Dkyy_mrqd%26token%3D&cmd=36&sdk_ver=1.0.0&sub_cmd=1&qversion=1.0.0&ts=${ts}`;
var l = d.length;
// 构造请求, post
var options = {
    "url": "https://qapplogin.m.jd.com/cgi-bin/qapp/quick",
    "method": "post",
    "headers": {
        "host": "qapplogin.m.jd.com",
        "user-agent": "Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({'packageName':'com.vivo.hybrid','type':'deeplink','extra':{}})",
        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
        "content-length": l,
    },
    "form": d,
};
request(options, (error, response) => {
    if (error || response.statusCode != 200) {
        s.Reply("第一次请求出错，" + error + response.statusCode);
    }
    var body = response.body
    var err_code = body.match(/"err_code":(\d+),/)[1];
    
    if (Number(err_code) == 0) {
        gsalt = body.match(/"gsalt":"(.*?)",/)[1];
        var guid = body.match(/"guid":"(.*?)",/)[1];
        var lsid = body.match(/"lsid":"(.*?)",/)[1];
        var rsa_modulus = body.match(/rsa_modulus":"(.*?)"},/)[1];
        var ck = `guid=${guid};  lsid=${lsid};  gsalt=${gsalt};  rsa_modulus=${rsa_modulus};`;
        s.Reply(ck);
        // 开始第二次请求
        s.Reply("请输入手机号：");
        mobile = input();
        var ts = Date.now();
        var sub_cmd = 2;
        // gsign=$(echo -n $appid$qversion$ts"36"$sub_cmd$gsalt | md5sum | cut -d ' ' -f1)
        var gsign = `9591.0.0${ts}362${gsalt}`;
        gsign = MD5(gsign)
        // sign=$(echo -n $appid$qversion$country_code$mobile'4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj' | md5sum | cut -d ' ' -f1);
        var sign = `9591.0.086${mobile}4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj`;
        sign = MD5(sign);
        var d = `country_code=86&client_ver=1.0.0&gsign=${gsign}&appid=959&mobile=${mobile}&sign=${sign}&cmd=36&sub_cmd=2&qversion=1.0.0&ts=${ts}`;
        var l = d.length;
        // 构造请求, post
        var options = {
            "url": "https://qapplogin.m.jd.com/cgi-bin/qapp/quick",
            "method": "post",
            "headers": {
                "HOST": "qapplogin.m.jd.com",
                "user-agent": "Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({'packageName':'com.vivo.hybrid','type':'deeplink','extra':{}})",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                "content-type": "application/x-www-form-urlencoded; charset=utf-8",
                "content-length": l,
                "cookie": ck,
            },
            "form": d,
        };
        request(options, (error, response) => {
            if (error || response.statusCode != 200) {
                s.Reply("第二次请求错误");
            }
            var body = response.body;
            // s.Reply(body);
            var err_msg = body.match(/"err_msg":"(.*?)"/)[1];
            
            if (err_msg.includes("重试")) {
                s.Reply(err_msg);
            } else {
                // 第三次请求
                s.Reply("请输入验证码：")
                smscode = input();
                var ts = Date.now();
                var sub_cmd = 3;
                var gsign = `9591.0.0${ts}363${gsalt}`;
                gsign = MD5(gsign);
                var d = `country_code=86&client_ver=1.0.0&gsign=${gsign}&smscode=${smscode}&appid=959&mobile=${mobile}&cmd=36&sub_cmd=3&qversion=1.0.0&ts=${ts}`;
                var l = d.length;
                // 构造请求, post
                var options = {
                    "url": "https://qapplogin.m.jd.com/cgi-bin/qapp/quick",
                    "method": "post",
                    "headers": {
                        "HOST": "qapplogin.m.jd.com",
                        "user-agent": "Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({'packageName':'com.vivo.hybrid','type':'deeplink','extra':{}})",
                        "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
                        "content-type": "application/x-www-form-urlencoded; charset=utf-8",
                        "content-length": l,
                        "cookie": ck,
                    },
                    "form": d,
                };
                request(options, (error, response) => {
                    if (error || response.statusCode!=200) {
                        s.Reply("第三次请求错误");
                    }
                    var body = response.body;
                    // var ptkey = body.match(/""/)
                    s.Reply(body);
                })
            }
            
        })
    } else {
        s.Reply("第一次请求错误：" + body.replace("{", "").replace("}", ""));
    };
});


// 发送手机验证码

// function sc() {
    
//     var ts = Date.now();
//     var sub_cmd = 2;
//     // gsign=$(echo -n $appid$qversion$ts"36"$sub_cmd$gsalt | md5sum | cut -d ' ' -f1)
//     var gsign = `${appid}${qversion}${ts}36${sub_cmd}${gsalt}`;
//     gsign = MD5(gsign)
//     // sign=$(echo -n $appid$qversion$country_code$mobile'4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj' | md5sum | cut -d ' ' -f1);
//     var sign = `${appid}${qversion}${country_code}${mobile}4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj`;
//     sign = MD5(sign);
//     var d = `country_code=${country_code}&client_ver=1.0.0&gsign=${gsign}&appid=${appid}&mobile=${mobile}&sign=${sign}&cmd=36&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
//     var l = d.length;
//     // 构造请求, post
//     var options = {
//         "url": "https://qapplogin.m.jd.com/cgi-bin/qapp/quick",
//         "method": "post",
//         "headers": {
//             "HOST": "qapplogin.m.jd.com",
//             "user-agent": "Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({'packageName':'com.vivo.hybrid','type':'deeplink','extra':{}})",
//             "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
//             "content-type": "application/x-www-form-urlencoded; charset=utf-8",
//             "content-length": l,
//             "cookie": ck(),
//         },
//         "form": d,
//     };
//     request(options, (error, response) => {
//         if (error || response.statusCode!=200) {
//             s.Reply(error, response.statusCode);
//         }
//         var body = response.body;

//         s.Reply(body);
//         var err_msg = body.match(/"err_msg":"(.*?)"/)[1];
//         s.Reply(err_msg);
//     })
    
// }

// 获取ptkey

// function pt() {
    
//     var ts = Date.now();
//     // var smscode = Number();
//     var sub_cmd = 3;
//     var gsign = `${appid}${qversion}${ts}"36"${sub_cmd}${gsalt}`;
//     gsign = MD5(gsign);
//     var d = `country_code=${country_code}&client_ver=1.0.0&gsign=${gsign}&smscode=${smscode}&appid=${appid}&mobile=${mobile}&cmd=36&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
//     var l = d.length;
//     // 构造请求, post
//     var options = {
//         "url": "https://qapplogin.m.jd.com/cgi-bin/qapp/quick",
//         "method": "post",
//         "headers": {
//             "HOST": "qapplogin.m.jd.com",
//             "user-agent": "Mozilla/5.0 (Linux; Android 10; V1838T Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/98.0.4758.87 Mobile Safari/537.36 hap/1.9/vivo com.vivo.hybrid/1.9.6.302 com.jd.crplandroidhap/1.0.3 ({'packageName':'com.vivo.hybrid','type':'deeplink','extra':{}})",
//             "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
//             "content-type": "application/x-www-form-urlencoded; charset=utf-8",
//             "content-length": l,
//             "cookie": ck(),
//         },
//         "form": d,
//     };
//     request(options, (error, response) => {
//         if (error || response.statusCode!=200) {
//             s.Reply(error, response.statusCode);
//         }
//         var body = response.body;
//         // var ptkey = body.match(/""/)
//         s.Reply(body);
//     })
// }
