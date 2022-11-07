aa = `

curl -H "Host: jzz.secxun.com" -H "token: 91649b691dfe731b7847e4a19f48f0ee" -H "content-type: application/json;charset=utf-8" -H "Accept: application/json, text/plain, */*" -H "User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.29(0x18001d35) NetType/WIFI Language/zh_CN" -H "Referer: https://servicewechat.com/wx1382447db32207b0/25/page-frame.html" --data-binary "{\"appid\":\"wx1382447db32207b0\",\"unionid\":\"oqiNg6G1Lhlv1AS9HvGLLFF66odY\",\"close\":false}" --compressed "https://jzz.secxun.com/jzz-miniprogram-article-service/jzz/mini/guide"






`
console.log();
let token = aa.split('"token: ')[1].split('"')[0]
let appid = aa.split('appid\":\"')[1].split('\"')[0]
let unionid = aa.split('unionid\":\"')[1].split('\"')[0]
console.log(`${appid}&${token}&${unionid}`);