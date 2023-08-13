task = {
	1: {
		type: 1,
		title: "观看作品赚硬币",
		step: {
			1: {
				coins: 2,
				condition: 180,
				com_status: 13,
				finish_progress: 180,
				base_time: 60,
			},
			2: {
				coins: 10,
				condition: 300,
				com_status: 13,
				finish_progress: 300,
				base_time: 60,
			},
			3: {
				coins: 20,
				condition: 600,
				com_status: 13,
				finish_progress: 600,
				base_time: 60,
			},
		},
		finish_step: 3,
	},
	2: {
		type: 2,
		title: "观看直播10分钟",
		step: {
			1: { coins: 50, condition: 600, com_status: 13, finish_progress: 600 },
		},
		finish_step: 1,
	},
	3: {
		type: 3,
		title: "关注3个用户",
		step: {
			1: { coins: 10, condition: 3, com_status: 13, finish_progress: 3 },
		},
		finish_step: 1,
	},
	4: {
		type: 4,
		title: "点赞3个作品",
		step: { 1: { coins: 5, condition: 3, com_status: 13, finish_progress: 3 } },
		finish_step: 1,
	},
	5: {
		type: 5,
		title: "评论3个作品",
		step: { 1: { coins: 5, condition: 3, com_status: 11, finish_progress: 0 } },
		finish_step: 1,
	},
	6: {
		type: 6,
		title: "发布1个作品",
		step: {
			1: { coins: 100, condition: 1, com_status: 11, finish_progress: 0 },
		},
		finish_step: 1,
	},
};
