// 10位时间戳秒转换为标准时间 10位时间戳乘以1000
function timestampToTime(timestamp) {
	var date = new Date(timestamp * 1000)
	var Y = date.getFullYear() + '-'
	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
	const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
	return Y + M + D
}

console.log(timestampToTime(1652167200));



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

console.log(y + '-' + m + '-' + d);  // 20220501