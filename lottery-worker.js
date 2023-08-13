self.onmessage = function(event) {
    const workerIndex = event.data;
    
    // 在这里编写抽奖逻辑
    // 使用 workerIndex 区分不同的任务
  
    const result = `抽奖任务 ${workerIndex} 完成`;
    self.postMessage(result);
  }
  