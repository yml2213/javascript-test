!(async () => {
	if (typeof $request !== "undefined") {  // 严格不相等
		await GetRewrite();
		console.log(`111`);
	} else {
		console.log(`222`);


		// await initAccountInfo();
		// await RunMultiUser();
	}
})()
	
