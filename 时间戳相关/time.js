let ts = Math.round(new Date().getTime()).toString();
console.log(ts); // 13 位时间戳

let ts1 = Math.round(new Date().getTime() / 1000).toString();
console.log(ts1); // 10 位时间戳


let time = new Date();
let y = time.getFullYear();
let m = time.getMonth() + 1;
let d = time.getDate();
m = m.toString();
d = d.toString();
if (m.length == 1) {
	m = `0${m}`
}
if (d.length == 1) {
	d = `0${d}`
}

console.log(m + '-' + d);  // 20220501



// Js获取当前日期时间及其它操作
var myDate = new Date();
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours();       //获取当前小时数(0-23)
myDate.getMinutes();     //获取当前分钟数(0-59)
myDate.getSeconds();     //获取当前秒数(0-59)
myDate.getMilliseconds();    //获取当前毫秒数(0-999)
myDate.toLocaleDateString();     //获取当前日期
var mytime = myDate.toLocaleTimeString();     //获取当前时间
myDate.toLocaleString();        //获取日期与时间




// 10位时间戳秒转换为标准时间 10位时间戳乘以1000
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000)
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
	const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
	return Y + M + D + h + m + s
}
// 13位时间戳毫秒不用乘以1000
function timestampToTimeLong(timestamp) {
	var date = new Date(timestamp)
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
	const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
	const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
	return Y + M + D + h + m + s
}


