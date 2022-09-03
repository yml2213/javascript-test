
/**
 * 时间戳 转 日期
 */
function tmtoDate(time = +new Date()) {
	if (time.toString().length == 13) {
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	} else if (time.toString().length == 10) {
		time = time * 1000;
		var date = new Date(time + 8 * 3600 * 1000);
		return date.toJSON().substr(0, 19).replace('T', ' ');
	}
}

console.log(tmtoDate(1656827825385));
console.log(tmtoDate(1656827825));






