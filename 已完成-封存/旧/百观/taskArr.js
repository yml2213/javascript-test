taskArr = [
  {
    id: 786,
    name: "每日签到",
    finish_times: 1,
    frequency: 1,
    experience: 20,
    integral: 20,
    completed: 1,
    member_task_type: 1,
  },
  {
    id: 780,
    name: "新闻资讯阅读",
    finish_times: 1,
    frequency: 3,
    experience: 30,
    integral: 30,
    completed: 0,
    member_task_type: 2,
  },
  {
    id: 777,
    name: "分享资讯给好友",
    finish_times: 0,
    frequency: 3,
    experience: 50,
    integral: 50,
    completed: 0,
    member_task_type: 3,
  },
  {
    id: 779,
    name: "新闻资讯评论",
    finish_times: 0,
    frequency: 3,
    experience: 100,
    integral: 100,
    completed: 0,
    member_task_type: 4,
  },
  {
    id: 778,
    name: "新闻资讯点赞",
    finish_times: 0,
    frequency: 3,
    experience: 30,
    integral: 30,
    completed: 0,
    member_task_type: 5,
  },
  {
    id: 776,
    name: "使用本地服务",
    finish_times: 0,
    frequency: 1,
    experience: 50,
    integral: 50,
    completed: 0,
    member_task_type: 6,
  },
  {
    id: 787,
    name: "邀请好友",
    finish_times: 0,
    frequency: 1,
    experience: 50,
    integral: 50,
    completed: 0,
    member_task_type: 7,
  },
  {
    id: 782,
    name: "社区帖子分享",
    finish_times: 0,
    frequency: 5,
    experience: 30,
    integral: 30,
    completed: 0,
    member_task_type: 14,
  },
  {
    id: 784,
    name: "社区帖子点赞",
    finish_times: 0,
    frequency: 5,
    experience: 30,
    integral: 30,
    completed: 0,
    member_task_type: 15,
  },
];

for (let index = 1; index < taskArr.length; index++) {
  let name = taskArr[index].name;
  let task_type=taskArr[index].member_task_type;
  if (taskArr[index].finish_times < taskArr[index].frequency) {
    // console.log(name);
    console.log(`    进行中任务: ${name}:  ${taskArr[index].finish_times} / ${taskArr[index].frequency}`);
    // msg += `\n    新闻资讯阅读: 进度 ${result.data.rst.nick_name} , ${taskArr[1].finish_times}/${taskArr[1].frequency}`;
    let num = taskArr[index].frequency - taskArr[index].finish_times;
    for (let j = 0; j < num; j++) {
      console.log(`    开始第 ${j + 1} 次 ${name}`);
      // await dotask(name, task_type);
      console.log(name);
      console.log(task_type);

    }
  } else if (taskArr[index].finish_times == taskArr[index].frequency) {
    // console.log(name);
    console.log(
      `    已完成任务: ${name}:  ${taskArr[index].finish_times} / ${taskArr[index].frequency}`
    );
    // msg += `\n    ${name}:  未签到 ,去签到喽!`;
  }
}

// if (result.data.rst.user_task_list.finish_times < result.data.rst.user_task_list.finish_times) {
// 	console.log(`    签到: ${result.data.rst.nick_name} 未签到 ,去签到喽!`);
// 	msg += `\n    签到: ${result.data.rst.nick_name} 未签到 ,去签到喽!`;
// } else if (result.data.rst.user_task_list.finish_times == result.data.rst.user_task_list.finish_times) {
// 	console.log(`    签到: ${result.data.rst.nick_name} 今天以及签到了 ,明天再来吧!`);
// 	msg += `\n    签到: ${result.data.rst.nick_name} 今天以及签到了 ,明天再来吧!`;
// }
