// 使用请求Node.js模块处理获取请求的示例
// 引入request模块
const request = require("request");

//对资源“http://www.google.com" 发出get请求 
request("http://www.66ip.cn/mo.php?sxb=&tqsl=100&port=&export=&ktip=&sxa=&submit=%CC%E1++%C8%A1&textarea=http%3A%2F%2Fwww.66ip.cn%2F%3Fsxb%3D%26tqsl%3D100%26ports%255B%255D2%3D%26ktip%3D%26sxa%3D%26radio%3Dradio%26submit%3D%25CC%25E1%2B%2B%25C8%25A1", function (error, response, body) {
	// console.log(response.body);

	try {
		if (error) throw error;
		if (/meta.*charset=gb2312/.test(body)) {
		}
		var ret = body.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,4}/g);
		console.log(ret);
	} catch (e) {
		console.log(e);
	}
});



