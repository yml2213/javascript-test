var axios = require("axios").default;

var options = {
  method: 'POST',
  url: 'https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx',
  headers: {
    Host: 'apph5.manmanbuy.com',
    Accept: 'application/json, text/javascript, */*; q=0.01',
    'X-Requested-With': 'XMLHttpRequest',
    'Sec-Fetch-Site': 'same-origin',
    'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
    'Sec-Fetch-Mode': 'cors',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    Origin: 'https://apph5.manmanbuy.com',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 - mmbWebBrowse - ios',
    Referer: 'https://apph5.manmanbuy.com/h5/zhuanpan/index.aspx?m_from=renwu_banner',
    'Sec-Fetch-Dest': 'empty',
    'content-type': 'application/x-www-form-urlencoded',
    'Cookie': 'free0tip_739D8F35-E693-40AA-B776-B70DD16ED365=true; Hm_lpvt_6ec3897e953d5d9e4b44b232cac821b9=1701540686; Hm_lvt_6ec3897e953d5d9e4b44b232cac821b9=1701538954,1701540468; ASP.NET_SessionId=hhzcm2ucrph3fzf3xd2d21yk; log-uid=4316c3e3ce344a6994ae9ccc01124595; addTaskUserInterface%b3%e9%bd%b1%bd%d3%bf%daonekey_5664699EQ=2023/12/3 1:42:46; 60014_mmbuser=CgVRVVZTVzFWBQFdUgMKXAYCAFVSAwEHWgsCDgEGAAMLDwJRBwBTWw%3d%3d',
  },
  data: {action: 'get_award', orderId: '2624596'}
};

axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});