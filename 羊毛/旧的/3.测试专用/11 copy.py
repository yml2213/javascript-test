import requests


requests.packages.urllib3.disable_warnings()


# 自行在携趣上获取，vkey 是短效代理API提取那里，选择完，点击生成连接可以获取
# ukey是在白名单那里可以获取，uid随便一个url都有的

uid = '106015'
ukey = '543A4FE5701DE515A1E54A9E1D8EE4FB'
vkey = '97111DB5379E38E3BC2FF09A1B00A0C7'

# 添加白名单


def add_ip(ip):
    delete_ip()
    api_url = f'http://op.xiequ.cn/IpWhiteList.aspx?uid={uid}&ukey={ukey}&act=add&ip={ip}'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat',
    }
    response = requests.get(url=api_url, headers=headers, verify=False)
    flag = response.text
    if flag == 'success':
        print("添加白名单【{}】成功".format(ip))

# 删除白名单


def delete_ip():
    api_url = f'http://op.xiequ.cn/IpWhiteList.aspx?uid={uid}&ukey={ukey}&act=del&ip=all'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat',
    }
    response = requests.get(url=api_url, headers=headers, verify=False)
    flag = response.text
    if flag == 'success':
        print("删除所有白名单")

# 查看白名单


def check_list():
    api_url = f'http://api.xiequ.cn/VAD/GetIp.aspx?act=get&uid={uid}&vkey={vkey}&num=1&time=30&plat=1&re=0&type=0&so=1&ow=1&spl=1&addr=&db=1'
    headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat',
    }
    response = requests.get(url=api_url, headers=headers, verify=False)
    proxy = response.text
    print(proxy)
    if "请先添加白名单" in proxy:
        addip = proxy.split('：')[1]
        add_ip(addip)
    else:
        print("无需重新添加白名单")


if __name__ == '__main__':
    check_list()
