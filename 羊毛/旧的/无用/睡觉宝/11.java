 
 
 
  com.qinlian.sleeptreasure.data.remote.AppApiHelper.3 v1_4 = new Function() {


            public ObservableSource apply(TimeStampBean arg4) throws Exception {
                if(arg4 != null && arg4.getData() != null && arg4.getOk() == 1) {

                    String v1 = String.valueOf(arg4.getData().getTimeStamp());

                    return (
						(PostRequestBuilder)

						((PostRequestBuilder)((PostRequestBuilder)((PostRequestBuilder)Rx2AndroidNetworking.post(Urls.CURRENT_URL + "task/dayReward").addHeaders("ua", "")).addBodyParameter("type", String.valueOf(arg4))).addBodyParameter("timeStamp", v1))

						.addBodyParameter(
							"sign", MD5.getMD5(UserInfoUtils.getLoginData().getUserInfo().getId() + "49lfdkislkcsiT8A" + arg4.getData().getTimeStamp() + UserInfoUtils.getLoginData().getUserInfo().getAccessToken())
							)
						
						).build().getObjectObservable(NewRewardBean.class);
                }

                return null;
            }

        };


// a|12|2.0.5|ql_sleep|c0a2b2d0a23d5f3eunknown|1080|2206|0|918350|1667830960000|c1a4a6ec34ae57b901ac8c0369f5f894|bdf51191fc1f9e0eea9b3cc7c34ca079|Xiaomi




91835049lfdkislkcsiT8A1667829048da3877cf38e505d1f80c371efa736351

