//[rule: 呼叫东哥]

// importJs('./md5')
const request = require('request');
const s = Sender;
//  声明变量 mobile、appid、qversion、country_code
var mobile, smscode, gsalt;
var appid = 959;
var qversion = '1.0.0';
var country_code = 86;


function ck() {

    var ts = Date.now();

    var sub_cmd = 1;
    var gsign = `${appid}${qversion}${ts}36${sub_cmd}sb2cwlYyaCSN1KUv5RHG3tmqxfEb8NKN`;
    gsign = MD5(gsign);
    //  d = "client_ver=1.0.0&gsign=$gsign&appid=$appid&return_page=https%3A%2F%2Fcrpl.jd.com%2Fn%2Fmine%3FpartnerId%3DWBTF0KYY%26ADTAG%3Dkyy_mrqd%26token%3D&cmd=36&sdk_ver=1.0.0&sub_cmd=$sub_cmd&qversion=$qversion&ts=$ts"
    var d = `client_ver=1.0.0&gsign=${gsign}&appid=${appid}&return_page=https%3A%2F%2Fcrpl.jd.com%2Fn%2Fmine%3FpartnerId%3DWBTF0KYY%26ADTAG%3Dkyy_mrqd%26token%3D&cmd=36&sdk_ver=1.0.0&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
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
            "accept-encoding": "",
        },
        "body": d,
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

            // 开始第二次请求
            s.Reply("请输入手机号：");
            mobile = input();
            var ts = Date.now();
            var sub_cmd = 2;
            // gsign=$(echo -n $appid$qversion$ts"36"$sub_cmd$gsalt | md5sum | cut -d ' ' -f1)
            var gsign = `${appid}${qversion}${ts}36${sub_cmd}${gsalt}`;
            gsign = MD5(gsign)
            // sign=$(echo -n $appid$qversion$country_code$mobile'4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj' | md5sum | cut -d ' ' -f1);
            var sign = `${appid}${qversion}${country_code}${mobile}4dtyyzKF3w6o54fJZnmeW3bVHl0$PbXj`;
            sign = MD5(sign);
            //  d = "country_code=$country_code&client_ver=1.0.0&gsign=$gsign&appid=$appid&mobile=$mobile&sign=$sign&cmd=36&sub_cmd=$sub_cmd&qversion=$qversion&ts=$ts"
            var d = `country_code=${country_code}&client_ver=1.0.0&gsign=${gsign}&appid=${appid}&mobile=${mobile}&sign=${sign}&cmd=36&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
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
                    "accept-encoding": "",
                },
                "body": d,
            };
            request(options, (error, response) => {
                if (error || response.statusCode != 200) {
                    s.Reply("第二次请求错误");
                }

                var body = response.body;
                // s.Reply(body);
                var err_code = body.match(/"err_code":(\d+),/)[1];
                var err_msg = body.match(/"err_msg":"(.*?)"/)[1];
                if (err_code != 0) {
                    s.Reply(err_msg);
                } else {
                    // 第三次请求
                    s.Reply("请输入验证码：")
                    smscode = input();
                    var ts = Date.now();
                    var sub_cmd = 3;
                    var gsign = `${appid}${qversion}${ts}"36"${sub_cmd}${gsalt}`;
                    gsign = MD5(gsign);
                    // d = "country_code=$country_code&client_ver=1.0.0&gsign=$gsign&smscode=$smscode&appid=$appid&mobile=$mobile&cmd=36&sub_cmd=$sub_cmd&qversion=$qversion&ts=$ts"
                    var d = `country_code=${country_code}&client_ver=1.0.0&gsign=${gsign}&smscode=${smscode}&appid=${appid}&mobile=${mobile}&cmd=36&sub_cmd=${sub_cmd}&qversion=${qversion}&ts=${ts}`;
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
                        "body": d,
                    };
                    request(options, (error, response) => {
                        if (error || response.statusCode != 200) {
                            s.Reply("第三次请求错误");
                        }
                        var body = response.body;
                        var err_code = body.match(/"err_code":(\d+),/)[1];
                        var err_msg = body.match(/"err_msg":"(.*?)"/)[1];
                        if (err_code != 0) {
                            s.Reply(err_msg);
                        } else {
                            var ptkey = body.match(/"pt_key":"(.*?)",/)[1];
                            var ptpin = body.match(/"pt_pin":"(.*?)",/)[1];
                            ptpin = encodeURI(ptpin);
                            s.Reply(`pt_key=${ptkey};pt_pin=${ptpin};`);
                        }

                    })
                }

            })
        } else {
            s.Reply("第一次请求错误，错误代码：" + err_code);
        };

    });

}

ck()



function MD5(sMessage) {
    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) {
        return (x & y) | ((~x) & z);
    }
    function G(x, y, z) {
        return (x & z) | (y & (~z));
    }
    function H(x, y, z) {
        return (x ^ y ^ z);
    }
    function I(x, y, z) {
        return (y ^ (x | (~z)));
    }
    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    }
    function ConvertToWordArray(sMessage) {
        var lWordCount;
        var lMessageLength = sMessage.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (sMessage.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }
    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }
    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;
    // Steps 1 and 2. Append padding bits and length and convert to words
    x = ConvertToWordArray(sMessage);
    // Step 3. Initialise
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
    // Step 4. Process the message in 16-word blocks
    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA); b = AddUnsigned(b, BB); c = AddUnsigned(c, CC); d = AddUnsigned(d, DD);
    }
    // Step 5. Output the 128 bit digest
    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
    return temp.toLowerCase();
}