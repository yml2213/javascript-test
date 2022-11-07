import requests
from time import sleep
import sys
import random

Bark = ''  # 填写Bark的地址
tz = '0'  # 1为打开通知(默认)  2为关闭通知
# 你的ck   ck格式 hd里面token的值xxx   多账号 xxx@xxx
cookies = 'f53cf712-c676-44f6-ac71-93ed805fca78@f31dbae3-73f6-49b0-84be-f00c55519a90@b82c306b-4ee6-4cf3-980b-5b744b03bc49'
Msg = ''
msg = "吉利汽车app\n"

print(msg)

headers = {
    "Host": "app.geely.com",
    "Accept": "*/*",
    "appVersion": "2.4.0",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-Hans-CN;q=1",
    "platform": "iOS",
    "Content-Length": "2",
    "User-Agent": "ji li qi che/2.4.0 (iPhone; iOS 14.7.1; Scale/3.00)",
    "Connection": "keep-alive",
    "Content-Type": "application/json",
}


def AppSign(i):  # 签到
    urls = 'https://app.geely.com/api/v1/user/sign/'
    headers['token'] = cookie[0]
    global msg
    try:
        result = requests.post(url=urls, headers=headers, data='{ }').json()
        sleep(3)
        if result['code'] == 'success':
            Msg = f"【吉利汽车{i}签到】：成功！ "
            print(Msg.replace('【', '').replace('】', ''))
            msg += Msg
        elif result['code'] == 'error.geely.user.already.signed':
            Msg = f"【吉利汽车{i}签到】：成功！ "
            print(Msg.replace('【', '').replace('】', ''))
            msg += Msg
        else:
            Msg = f"【吉利汽车签到】:失败,检测账号{i}！\n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
            Barktz()
    except Exception as e:
        print(str(e))


def zrw(ii):  # 做任务
    wyy = Wyy()
    headers['token'] = cookie[0]
    urls = 'https://app.geely.com/api/v2/topicContent/create'
    datas = '{"content":"6666","contentType":1}'
    datas = datas.replace("6666", f"{wyy}")
    global msg
    try:
        sleep(10)
        result = requests.post(url=urls, headers=headers,
                               data=datas.encode('utf-8')).json()
        if result['code'] == 'success':
            Msg = f"【吉利汽车{i}发贴】：成功！ "
            print(Msg.replace('【', '').replace('】', ''))
            msg += Msg
            id = result['data']
            datas = '{"content":"666","placeholder":"留下你的精彩评论","parentId":"","sourceId":"123456","sourceType":"2","type":"2","id":"123456","userId":""}'
            datas = datas.replace("666", f"{wyy}").replace("123456", f"{id}")
            print('开始评论')
            sleep(10)
            result = requests.post(
                url='https://app.geely.com/apis/api/v2/comment/publisherComment', headers=headers, data=datas.encode('utf-8')).json()
            if result['code'] == 'success':
                Msg = f"【吉利汽车{i}评论】：成功！ "
                print(Msg.replace('【', '').replace('】', ''))
            print('开始分享')
            sleep(10)
            result = requests.post(
                url='https://app.geely.com/api/v1/share/awardPoint', headers=headers, data='{ }').json()
            if result['code'] == 'success':
                Msg = f"【吉利汽车{i}分享】：成功！ "
                print(Msg.replace('【', '').replace('】', ''))
                msg += Msg
            sc(id)    
        else:
            Msg = f"【任务单获取】:失败,检测账号{i}！\n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
            Barktz()
    except Exception as e:
        print(str(e))


def Wyy():  # 网易云
    urls = 'https://keai.icu/apiwyy/api'
    result = requests.get(url=urls).json()['content']
    return result

def sc(i):  
    urls = 'https://app.geely.com/api/v2/topicContent/deleteContent'
    datas='{"id":"6666"}'
    datas = datas.replace("6666", f"{i}")
    global msg
    try:
        result = requests.post(url=urls, headers=headers,data=datas).json()
    except Exception as e:
        print(str(e))


def Barktz():
    try:
        result = requests.get(url=Bark+msg, headers={}).json()
        if result['code'] == 200:
            print('Bark通知发送成功')
    except Exception as e:
        print(str(e))


if __name__ == '__main__':
    if cookies == '':
        print(f"请写入cookies\n")
    else:
        cookies = cookies.split('@')
        i = 1
        for cookie in cookies:
            cookie = cookie.split('&')
            print(f"当前账号{i}\n")
            AppSign(i)
            sleep(3)
            for ii in range(1, 4):
                 zrw(ii)
            i += 1

sys.exit(0)
