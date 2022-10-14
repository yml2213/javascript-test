const { wait } = require("./utils");


function delay(interval) {

	return new Promise((res, rej) => {
		setTimeout(() => {

			console.log(interval);
			wait(3)

			res(interval)
		}, interval);
	})
}


let tasks = [() => {
	return delay(1000)
}, () => {
	return delay(1003)
}, () => {
	return delay(1005)
}, () => {
	return delay(1002)
}, () => {
	return delay(1004)
}, () => {
	return delay(1006)
}]

// 基于Class实现
function creatRequest(tasks, pool, callback) {
	// 参数的限制与验证
	if (typeof pool === 'function') {
		callback = pool;
		pool = 5
	}
	if (typeof pool !== 'number') pool = 5
	if (typeof callback !== 'function') callback = function () { }
	// -------
	class TaskQueue {
		// 正在运行的个数
		runing = 0;
		// 将所有任务所存在的队列
		queue = [];
		// 存储执行任务(请求)的结果
		results = [];
		pushTask(task) {
			let self = this
			// 将任务推入工作区
			self.queue.push(task)
			// 执行发送请求的逻辑
			self.next()
		}
		next() {
			let self = this
			// 当正在执行的任务数小于并发量的时候继续去拿任务执行
			while (self.runing < pool && self.queue.length) {
				self.runing++;
				// 相当于拿一个任务删除一个任务
				let task = self.queue.shift();
				// 执行请求
				task().then(result => {
					// 将执行结果保存
					self.results.push(result)
				}).finally(() => {
					// 将正在运行的个数清除
					self.runing--
					// 继续执行请求
					self.next()
				})
			}
			// 当没有任务了循环结束
			if (self.runing === 0) callback(self.results)
		}


	}
	// 实例化
	let TQ = new TaskQueue()
	tasks.forEach(task => TQ.pushTask(task))
}


creatRequest(tasks, 6, results => {
	console.log(results);
})
