/*
如果读取变量soy_rlsp_data为真和在变量中找到@字符,那么变量app_soy_rlsp_data就等于读取的变量重写组成的  数组  。app_soy_rlsp_data 这个变量需要声明，一般在前面声明，

知识点：&& 意思为和或者(而且) 一般判断中使用，
知识点：被寻找的文本.indexOf('要寻找的文本')为寻找文本，一般在判断中使用，该函数返回一个 数字 ，等于-1是就说明被寻找的文本中找不到要寻找的文本，大-1时就是找到
var str="Hello world, welcome to the universe.";
var n=str.indexOf("welcome");  //输出 13

知识点：split('@')，用于把一个字符串分割成字符串数组
var str=`a:1@b:2@c:3`;
var n=str.split("@");
console.log(n);
// n 输出一个数组的值:
[ 'a:1', 'b:2', 'c:3' ]

如：此代码中，读取变量中找到@字符，那么就用@为分割符进行分割后在组成数组
示例：账号1@账号2@账号3
得到就是 ['账号1','账号2','账号3']

其他的以次类推
*/


let app_soy_rlsp_data = [1, 2, 3];

let soy_rlsp_data = undefined;

if (process.env.soy_rlsp_data && process.env.soy_rlsp_data.indexOf('@') > -1) {
    app_soy_rlsp_data = process.env.soy_rlsp_data.split('@');
} else if (process.env.soy_rlsp_data && process.env.soy_rlsp_data.indexOf('\n') > -1) {
    app_soy_rlsp_data = process.env.env.soy_rlsp_data.split('\n');
} else if (process.env.soy_rlsp_data && process.env.soy_rlsp_data.indexOf('#') > -1) {
    app_soy_rlsp_data = process.env.soy_rlsp_data.split('#');
} else {
    app_soy_rlsp_data = process.env.soy_rlsp_data.split();
}
;


console.log(`-------- 共 ${app_soy_rlsp_data.length} 个账号 --------`)

console.log(
    `\n=== 脚本执行 - 北京时间(UTC+8)：${new Date(
        new Date().getTime() +
        new Date().getTimezoneOffset() * 60 * 1000 +
        8 * 60 * 60 * 1000
    ).toLocaleString()} ===\n`);


// 注释: 以账号数量为循环次数
// 知识点: for (i = 0; i < app_soy_rlsp_data.length; i++) {}
// for为循环意思
// i 和 $.index 为全局变量，脚本后面对面不能在设置和这个一样
// i < app_soy_rlsp_data.length 循环次数和条件，也就是说如果账号数量大 i 时他才执行要执行的板块，如果条件不满足则不执行
// i++每执行后会记录已执行次数，就算是说开始i=0时，你执行一个后那么i就等于1，执行第二个账号后那么1就等于2依次类推，也就是在i的基础上+1
// rl_taskCenter(1)为执行某个版块里面内容，await为等待完成，则等待rl_taskCenter(1)板块执行完成再执行下个，如果多个板块可在下行添加即可，rl_taskCenter(1)括号里面的1是指在执行板块时传入一个参数（就是数据啥的意思）给板块使用
!(async () => {
    for (i = 0; i < app_soy_rlsp_data.length; i++) {
        $.index = i + 1;
        console.log(`\n----- 开始【第 ${$.index} 个账号】-----`)
        //执行某个板块
        await rl_taskCenter(1)
    }


})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())


// 板块一般写在主体外面，需要执行时执行它即可
function rl_taskCenter() {
    // get 请求
    function rl_taskCenter() {
        let Request_data = Get_request(`signIn/isSignIn?uid=${soy_mmyp_user_id}`)  // 个人定义板块，后面说明
        return new Promise((resolve, reject) => {                // 固定，不需要动

            // 知识点：$.get为网络get请求
            // Request_data为定义的局部变量，其实这里面有2个参数，格式为
            // {
            //     url:`${host}`,
            //         headers:{”xxx":"xxx","xxx":"xxx"},
            // }
            //             url为请求连接，headers为请求头，这个又是一个json格式，也就是说抓包请求头时复制粘贴后需要加处理
            //             如：Authorization:xxx
            //             user_id:xxx
            //             Content-Type: application/json
            //             这里面就有3个数据了，那么就需要处理
            // ”Authorization“:”xxx“，”user_id“:”xxx“，“Content-Type”: application/json”
            // 然后多个数据用英文逗号连接即可
            //             可以直接用
            //             $.get({
            //                 url:`xxx`,
            //                 headers:{”xxx":"xxx","xxx":"xxx"},
            //         }, async(error, response, data) => {

            // $.get(Request_data, async(error, response, data) => {
            //     中error为网络请求失败（404之类的）的数据，response为返回的请求头，data为正常返回的数据
            //
            //     subTitle+=为把之前的变量值和这次的变量合并起来
            //
            //     JSON.parse(data)把返回的数据转成json格式，当然是json格式的数据才行，否则会提示错误

            $.get(Request_data, async (error, response, data) => {
                try {
                    if (error) {
                        //这里时访问失败,如访问网络出现404之类的
                        console.log(`\n【soy脚本提示---账号 ${$.index} 签到状态】: 网络请求失败`)
                        subTitle += `\n【soy脚本提示---账号 ${$.index} 签到状态】: 网络请求失败`
                    } else {
                        //这里时正常返回数据板块
                        //console.log(data)
                        //let result = JSON.parse(data)


                    }
                } catch (e) {
                    //$.logErr(e, response);
                    console.log(e, response)
                } finally {
                    resolve();
                }
            })
        })
    }

    /*注释:
        let Request_data=Get_request(`signIn/isSignIn?uid=${soy_mmyp_user_id}`)
    中个人定义板块，后面说明

    return new Promise((resolve, reject) => {
        为固定，不需要动

        $.get(Request_data, async(error, response, data) => {
            知识点：$.get为网络get请求
            Request_data为定义的局部变量，其实这里面有2个参数，格式为
            {
                url:`${host}`,
                    headers:{”xxx":"xxx","xxx":"xxx"},
            }
                url为请求连接，headers为请求头，这个又是一个json格式，也就是说抓包请求头时复制粘贴后需要加处理
                如：Authorization:xxx
                user_id:xxx
                Content-Type: application/json
                这里面就有3个数据了，那么就需要处理
”Authorization“:”xxx“，”user_id“:”xxx“，“Content-Type”: application/json”
然后多个数据用英文逗号连接即可
                可以直接用
                $.get({
                    url:`xxx`,
                    headers:{”xxx":"xxx","xxx":"xxx"},
            }, async(error, response, data) => {

                $.get(Request_data, async(error, response, data) => {
                    中error为网络请求失败（404之类的）的数据，response为fa返回的请求头，data为正常返回的数据

                    subTitle+=为把之前的变量值和这次的变量合并起来

                    JSON.parse(data)把返回的数据转成json格式，当然是json格式的数据才行，否则会提示错误
    */


    // post 请求

    function Post_request(url,body){
        return {
            url:`${host}${url}`,
            headers:{"Host": "market.haowusong.com","Connection": "keep-alive","Content-Length": body.length,"User-Agent": soy_mmyp_UA,"Content-Type": "application/x-www-form-urlencoded","Origin": "https://cdn.wuxiantao.net","X-Requested-With": "com.mmyp.timeoflove","Referer":`https://cdn.wuxiantao.net/farm/h621/index.html?token=sdk_${soy_mmyp_token}`},
            body:body,
        };
    };
}









