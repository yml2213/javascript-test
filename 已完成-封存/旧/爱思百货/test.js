function startLimitPool(tasks, max, callback) {
	const result = Array.from({ length: max })
	Promise.all(Array.from({ length: max }).map((index) => {
		return new Promise(resolve => {
			function runTask() {
				if (tasks.length <= 0) {
					resolve()
					return
				}
				const task = tasks.shift()
				task().then((res) => {
					result[index] = res
					runTask()
				})
			}
			runTask()
		})
	})).then(() => callback(result))
}
