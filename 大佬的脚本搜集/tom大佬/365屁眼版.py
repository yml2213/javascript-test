import hashlib
from numpy import sign
import requests
from time import sleep
import sys
import random
import time
import datetime


Bark = ''  # 填写Bark的地址
tz = '1'  # 1为打开通知(默认)  2为关闭通知

cookies = ''# 你的ck   ck格式 xxx&ccc  多账号 xxx&ccc@xxx&ccc


headers = {
    "Referer": "https//servicewechat.com/wx95b9feef72e1a67d/139/page-frame.html",
    "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 14_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.22(0x1800162a) NetType/4G Language/zh_CN",
    "Version-Xcx": "v6.9.5",
    "content-type": "application/json"
}
Msg = ''
msg = "365淘房屁眼通红版\n"
print(msg)

dzrw = ''
ids = ''


def get_timestamp():
    datetime_object = datetime.datetime.now()
    now_timetuple = datetime_object.timetuple()
    now_second = time.mktime(now_timetuple)
    time_stamp = int(now_second*1000 + datetime_object.microsecond/1000)
    return time_stamp


def Sign():
    urls = 'https://tfxcx.house365.com/api/Tfqqdapi/getChance?city=nj&active_id=217&task_type=qiandao&task_id=0&user_3rdsession=' + \
        cookie[0]+'&xcxversion=v6.9.5'
    timess = f'{get_timestamp()}'
    rnd = ''.join(random.sample(
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', 32))
    s = f'house365xcxv6.9.5{timess}{rnd}'
    m = hashlib.md5()
    m.update(s.encode(encoding='utf8'))
    md5 = m.hexdigest()
    headers["Host"] = "tfxcx.house365.com"
    headers['Token-Xcx'] = md5
    headers['Random-Xcx'] = rnd
    headers['Timestmp-Xcx'] = timess
    global msg
    try:
        result = requests.get(url=urls, headers=headers).json()
        # print(result)
        if result['code'] == 1:
            Msg = f"【签到任务】：{result['data']['msg']} \n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += Msg
        else:
            Msg = f"【app签到】:{result['data']['msg']} \n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
    except Exception as e:
        print(str(e))


def TaskList():
    urls = 'https://tfxcx.house365.com/api/Tfqqdapi/zanPostsList?city=nj&active_id=217&task_id=66&user_3rdsession=' + \
        cookie[0]+'&xcxversion=v6.9.5'
    timess = f'{get_timestamp()}'
    rnd = ''.join(random.sample(
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', 32))
    s = f'house365xcxv6.9.5{timess}{rnd}'
    m = hashlib.md5()
    m.update(s.encode(encoding='utf8'))
    md5 = m.hexdigest()
    headers["Host"] = "tfxcx.house365.com"
    headers['Token-Xcx'] = md5
    headers['Random-Xcx'] = rnd
    headers['Timestmp-Xcx'] = timess
    global msg
    try:
        result = requests.get(url=urls, headers=headers).json()
        if result['code'] == 1:
            Msg = f"【获取点赞列表】：成功"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
            dzlist = result['data']['result']
            i = 0
            for dzrw in dzlist:
                print(f"进行第{i+1}次点赞")
                ids = dzrw['id']
                print(ids)
                body = f'id={ids}&act=1&type=2&user_3rdsession={cookie[0]}&xcxversion=v6.9.5'
                dz(body)
                ts = random.randint(2, 5)
                print(f"等待{ts}秒")
                sleep(ts)
                i += 1
        else:
            Msg = f"【app签到】:{result['data']['msg']} \n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
    except Exception as e:
        print(str(e))


def dz(body):
    urls = 'https://mapi.house365.com/tfxcxnew2.0/v6/tfq_comment.php?method=Commentzan'
    timess = f'{get_timestamp()}'
    rnd = ''.join(random.sample(
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678', 32))
    headers["Host"] = "mapi.house365.com"
    headers['Random-Xcx'] = rnd
    headers['Timestmp-Xcx'] = timess
    headers['content-type'] = 'application/x-www-form-urlencoded'
    global msg
    try:
        result = requests.post(url=urls, headers=headers, data=body).json()
        if result['code'] == 1:
            Msg = f"【点赞任务】：{result['msg']} \n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
        else:
            Msg = f"【点赞任务】:{result['msg']} \n"
            print(Msg.replace('【', '').replace('】', ''))
            msg += str(Msg)
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
            Sign()
            ts = random.randint(2, 5)
            print(f"等待{ts}秒")
            sleep(ts)
            TaskList()
            # ts = random.randint(2, 5)
            # print(f"等待{ts}秒")
            # sleep(ts)
            # addTask()
            # ts = random.randint(2, 5)
            # print(f"等待{ts}秒")
            # sleep(ts)
            # Award()
            # ts = random.randint(2, 5)
            # print(f"等待{ts}秒")
            # sleep(ts)
            i += 1

            if Bark != '':
                if tz == '1':
                    Barktz()


sys.exit(0)
