spmd5 = `app_auth_token=${ckck.app_auth_token}&app_id=${ckck.app_id}&appkey=${ckck.appkey}&bb_birthday=${ckck.bb_birthday}&bid=${ckck.bid}&mode=${ckck.mode}&open_mmid=${ckck.open_mmid}&prepare_pt_date=&rel=${ckck.rel}&source=${ckck.source}&statistics_app_channel=${ckck.statistics_app_channel}&statistics_app_params=${ckck.statistics_app_params}&statistics_app_source=${ckck.statistics_app_source}&t=${$.ts()}&task_name=reward_video&uid=${ckck.uid}&version=${ckck.version}c0c91f2099c6354461942eb0b31f0e7f`

spmd5 = spmd5.replace(/sign=[^&]+/g, '').replace(/\=/g, '').replace(/\&/g, '').replace(/\//g, '%2F')
spsign = $.MD5Encrypt(spmd5)
