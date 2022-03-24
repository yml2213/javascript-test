/*
邀请码:  003584319
感谢填写! 感谢填写!! 感谢填写!!!
1.15 阅读文章
平台:   青龙
软件:  东方头条
收益:  10000金币=1元
[Script]
cron "20 6-20 * * *" https://raw.githubusercontent.com/yml2213/javascript/master/dftt/dfttwz.js,tag=东方头条文章

注意事项 ： 一定要仔细阅读一下内容
=============青龙变量格式=============
export dfttua=''
export dfttwzbd='params=XXXXX'
=============青龙变量实例=============
export dfttua='Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148'
export dfttwzbd='params=H0QHGzkHERoCAFZeRCAbKicMAh1HWEYWGwc2BwwMHEdORoPFxbvL+UFeRwAXRE5WbkVRUUBWQlZeTFZzUQQAEQwQRlxMTGhHV1JFUEJIRAAHAAAAEQQABkZcVlZzUQwQBQwSDUROVigaAwpQSVYICBNWZVFUUkRLTVJTQUFuQVVaR1ZDXERYVjwaERpQX1aC0/qR0uSA2/BHWEYXHRB9SUciAhUnEAkGEW1BVVJDUVZIRBcALFFfQUNTQFZUR0JtS11BXkcbF0ROVjYcFkFeRwcJIhECNhAAKhZHTkZUREZtQ1RSRldHVVFFQ2tFUlcRARAGVRZGbhBWVkJXTVwAQUE6RlwHQlJEXV8WRG5HXVAXB0MFB0QWOkdXW1BJVgUWBAU2F0dZUCQEFDUAGy0WV1FCVEVQRFhWLBwDFxwEGQFETlYbNTE3OyonRkpWGCtRX0EXLT42LURNLiQzJTsqMxBVJyMnGTYnOx8VHiwjIQoHHy03IwYwDSI+DkMJOyM9JhYEH00lKTJWCDMaFAcgIzc7Kzs3FzkjFkIiCiUsOh8/IjIgNQM6Ng4bKCEQBTVFNiYRDw8iBiAyVy48GTQxCBkSFjMFTSQOTlhBXkcaCwIRB31JRzgJOVYRFBgSLRwIP1BfKEYSGwErGgQMLkdYOEQADS8WOUFIOVYKAwMHA1FJP1AQBggSGyh9STlBGhEAFFwoKANcOT8uShlVSAAAcRALPy45WwkJFh0zFjk/LkpGVlZFRWpCUFJHVURcV0FaNwcIDy5HWDhEGhs7FjlBSFREGUoPKH0GFw8UFxsJOlZOA1ERDAcRHQUJKFZzL0cXCxUROEROKH0dABQBOVZIOlYBLR8RDC5HTjhEHAArA18/LjlbODooWzJCSxcGSxcKOigocB4KARsJETg6KFttQVVSQ1BFUVdBRG9LVFZcDQAJCihWcy9HDR0BEThETkZvDjhBXkcCARRWTn1BS1VcUFZIRBsRMlFfQTYjIDBEWFYrGggGADoAHRYRVmVRCwYFFisQDxkRLVFJQR0WKxIDBgc2HAtBSEcdKzVURWpdV0FeRxgFElZOfUBTTURRQlVeRkdqRlBaRlZNRkpWFS8DERoCAB0ARE5WGzUxN1BJVg0LEVZlUSRWMyFAVyRGWW02UCdfUTFWJFk2a0dcTkcnMFNeNzBmSlwnQ0dYRgUFHTtRX0EzFQQ3EhsGOlFJQRAEBwEVABUrGgoNUF9WChMYGH1fRwIcAQYLDxA9O1FfQUJVRFRWRERvXlVTQlVZVFZERHJDVVNCSERUVkREb0NVU0JVREZKVhA6BQwAF0dORg8kHDAdAFJGSUZGGw=='
=============变量解释==========
dfttua:UA 这个不需要解释了吧
dfttwzbd:变量中的xxxx是你的body包数据,,可以从 关键词 read_news 包里找到所有变量

=============变量获取==========
懒得写了，自己研究吧
不会的请百度或者群里求助：QQ群：1001401060  tg：科技玩家@我即可

*/
// https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news
const $ = new Env('东方头条文章');
const host = 'yuedu4.dftoutiao.com';
const notify = $.isNode() ? require('./sendNotify') : '';
let dfttua = process.env.dfttua;
let body = process.env.dfttwzbd;
//==================================================这里自定义阅读文章数量==================================================
let num = 30;   //阅读数量（默认30）
//==================================================这里自定义阅读文章数量==================================================
//开始运行
!(async () => {
    console.log(`交流群:1001401060  by-yml`);
    await yml()

})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

// https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news
//这里是要执行的代码     ====== 如果有您不需要的  请自行注释  使用 // 注释就行 ========
async function yml() {
    await wyy();
    for (let i = 0; i < num; i++) {
        if (i < num) {
            let u = i + 1;
            console.log(`正在阅读第${u}篇,请耐心等待！`);
            await wz();
        }
    }


//每日网抑云
    function wyy(timeout = 3 * 1000) {
        return new Promise((resolve) => {
            let url = {
                url: `https://keai.icu/apiwyy/api`
            }
            $.get(url, async (err, resp, data) => {
                try {
                    data = JSON.parse(data)
                    $.log(`\n【网抑云时间】: ${data.content}  by--${data.music}`);

                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            }, timeout)
        })
    }


// https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news
// 阅读文章任务
    function wz(timeout = 0) {
        return new Promise((resolve) => {
            let url = {
                url: `https://${host}/index/Yuedutimer/read_news`,
                headers: {
                    'User-Agent': dfttua
                },
                body: body
            }
            // console.log(url);
            $.post(url, async (err, resp, data) => {
                try {
                    // console.log(`输出data开始===================`);
                    // console.log(data);
                    // console.log(`输出data结束===================`);

                    result = JSON.parse(data);
                    if (result.err_code == 0) {
                        $.log(`\n【🎉🎉🎉 恭喜您鸭 🎉🎉🎉】阅读文章: 成功 ✅ 了呢 , 获得金币${result.bonus}枚!！`)
                        await $.wait(60 * 1000);
                    } else {
                        $.log(`\n【🎉 恭喜个屁 🎉】阅读文章:失败 ❌ 了呢,原因可能是是:${result.msg}`)
                        await $.wait(5 * 1000);

                    }
                } catch (e) {
                    $.logErr(e, resp);
                } finally {
                    resolve()
                }
            }, timeout)

        })


    }
}




