#!/bin/env python3
# -*- coding: utf-8 -*
'''





=================================以下代码不懂不要随便乱动=================================


'''

#1为飞鱼，2位他信
jm_flag = 2
username = ''
passwd = ''
#星空代理url，输出txt格式
api_url = 'http://api2.xkdaili.com/tools/XApi.ashx?apikey=XK80880F1059E5FA0126&qty=1&format=txt&split=0&sign=30e2a64d8686954bc405b98a1d11dd28'
#项目ID  他信35085，飞鱼55327
sid = '35085'
#虚拟号码，1为虚拟，2位实体卡，留空为不限制
ascription = ''
invite_limit_times = 3
tokens = []
account = 1

try:
    import requests
    import json,sys,os,re
    import time,datetime,random
    import hashlib
    from urllib import parse
    import string
    import base64
    import hashlib
    import hmac,httpx
except Exception as e:
    print(e)

requests.packages.urllib3.disable_warnings()


pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
path = pwd + "env.sh"
today = datetime.datetime.now().strftime('%Y-%m-%d')
mor_time ='08:00:00.00000000'
moringtime = '{} {}'.format (today, mor_time)
tomorrow = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')

def printT(s):
    print("[【{0}】]: {1}".format(datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), s))
    sys.stdout.flush()


def getEnvs(label):
    try:
        if label == 'True' or label == 'yes' or label == 'true' or label == 'Yes':
            return True
        elif label == 'False' or label == 'no' or label == 'false' or label == 'No':
            return False
    except:
        pass
    try:
        if '.' in label:
            return float(label)
        elif '&' in label:
            return label.split('&')
        elif '@' in label:
            return label.split('@')
        else:
            return int(label)
    except:
        return label


## 获取通知服务
class msg (object):
    def __init__(self, m=''):
        self.str_msg = m
        self.message ()

    def message(self):
        global msg_info
        printT (self.str_msg)
        try:
            msg_info = "{}\n{}".format (msg_info, self.str_msg)
        except:
            msg_info = "{}".format (self.str_msg)
        sys.stdout.flush ()  # 这代码的作用就是刷新缓冲区。
        # 当我们打印一些字符时，并不是调用print函数后就立即打印的。一般会先将字符送到缓冲区，然后再打印。
        # 这就存在一个问题，如果你想等时间间隔的打印一些字符，但由于缓冲区没满，不会打印。就需要采取一些手段。如每次打印后强行刷新缓冲区。

    def getsendNotify(self, a=0):
        if a == 0:
            a += 1
        try:
            url = 'https://gitee.com/curtinlv/Public/raw/master/sendNotify.py'
            response = requests.get (url)
            if 'curtinlv' in response.text:
                with open ('sendNotify.py', "w+", encoding="utf-8") as f:
                    f.write (response.text)
            else:
                if a < 5:
                    a += 1
                    return self.getsendNotify (a)
                else:
                    pass
        except:
            if a < 5:
                a += 1
                return self.getsendNotify (a)
            else:
                pass

    def main(self):
        global send
        cur_path = os.path.abspath (os.path.dirname (__file__))
        sys.path.append (cur_path)
        if os.path.exists (cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except:
                self.getsendNotify ()
                try:
                    from sendNotify import send
                except:
                    printT ("加载通知服务失败~")
        else:
            self.getsendNotify ()
            try:
                from sendNotify import send
            except:
                printT ("加载通知服务失败~")
        ###################


msg ().main ()
nowtime = int (round (time.time () * 1000))



def md5_encode(encode_data):

    # print(encode_data)

    md5=hashlib.md5()   # 应用MD5算法

    data = encode_data

    md5.update(data.encode('utf-8'))

    # print(md5.hexdigest().upper())

    return md5.hexdigest()

#DES加密
# s = '哈哈'.encode ()  # 这里中文要转成字节， 英文好像不用
def DES_encrypt(s):
    DES_KEY = "hzydbsv5"
    des_obj = des (DES_KEY, CBC, DES_KEY, padmode=PAD_PKCS5)  # 初始化一个des对象，参数是秘钥，加密方式，偏移， 填充方式
    s = s.encode ()  # 这里中文要转成字节
    secret_bytes = des_obj.encrypt (s)  # 用对象的encrypt方法加密
    return secret_bytes.hex ()

#DES解密
def DES_decrypt(secret_bytes):
    DES_KEY = "hzydbsv5"
    des_obj = des (DES_KEY, CBC, DES_KEY, padmode=PAD_PKCS5)  # 初始化一个des对象，参数是秘钥，加密方式，偏移， 填充方式
    secret_bytes = bytes.fromhex (secret_bytes)  # 这里中文要转成字节
    s = des_obj.decrypt (secret_bytes)  # 用对象的decrypt方法解密
    return s.decode ()

def calculate_hmac_sha256(key, message):
    # 将密钥和消息转换为字节数据
    key_bytes = key.encode ('utf-8')
    message_bytes = message.encode ('utf-8')
    # 创建一个 hmac 对象，并使用 SHA-256 哈希算法
    hmac_sha256 = hmac.new (key_bytes, message_bytes, hashlib.sha256)
    # 获取计算得到的哈希值
    hash_value = hmac_sha256.hexdigest ()
    return hash_value

def get_comment():
    url = f'https://v1.jinrishici.com/all.json'
    response = requests.get (url=url, verify=False)
    result = response.json ()
    content = result['content']
    return content


def random_string(length):
    letters_digits = string.ascii_letters + string.digits
    return ''.join(random.choice(letters_digits) for i in range(length))


def xk_proxy(url):

    try:
        headers = {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.116 Safari/537.36 QBCore/4.0.1301.400 QQBrowser/9.0.2524.400 Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat',
        }
        response = requests.get (url=url, headers=headers, verify=False)
        result = response.text
        # print(result)
        if result:
            proxy_ip = result.split(':')[0]
            proxy_port = result.split(':')[1]
            print(f"代理IP为{proxy_ip}:{proxy_port}")
            proxy = {
                'http': f'http://{proxy_ip}:{proxy_port}',
                # 'https': f'https://{proxy_ip}：{proxy_port}'
            }
        response1 = requests.get ('http://httpbin.org/ip',headers=headers,proxies=proxy, timeout=5,verify=False)
        # print(response1.text)
        return proxy
    except:
        print("IP不可用，重新获取")
        return ''




#飞鱼
def fy_login():
    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.haozhuma.com/sms/?api=login&user={username}&pass={passwd}"
        response = requests.get (url=url, headers=headers ,verify=False,timeout=10)
        result = response.json ()
        # print(result)
        token = result['token']
        return token
    except Exception as e:
        print ("飞鱼登录失败")
        exit()

#获取余额
def fy_info(token):
    try:
        timestamp = int (round (time.time ()))
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.haozhuma.com/sms/?api=getSummary&token={token}"
        response = requests.get (url, headers=headers,verify=False,timeout=10)
        result = response.json ()
        # print(result)
        money = result['money']
        print(f"账号余额{money}")
    except:
        print ("查询余额失败")


#获取手机号
def fy_get_num(token):
        try:
            headers = {
                "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
            }
            url = f"http://api.haozhuma.com/sms/?api=getPhone&token={token}&sid={sid}&ascription={ascription}&author=kevinxfh2022"
            response = requests.get (url, headers=headers,verify=False,timeout=10)
            result = response.json()
            # print(result)
            phone = result['phone']
            print(f"获取号码为：{phone}")
            return phone
        except:
            print("获取手机失败，请重新尝试")
            fy_release_num (token)
            exit()

#获取验证码
def fy_get_code(token,phone):
    flag = 0
    for i in range(12):
        try:
            headers = {
                "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
            }
            url = f"http://api.haozhuma.com/sms/?api=getMessage&token={token}&sid={sid}&phone={phone}"
            response = requests.get (url, headers=headers,verify=False,timeout=10)
            result = response.json()
            # print(result)
            code1 = result['code']
            if code1 == '-1':
                print("等待验证码")
                if i <= 11:
                    time.sleep (20)
            else:
                sms = result['sms']
                r = re.compile (r'验证码是(\d+)，', re.M | re.S | re.I)
                code = r.findall (sms)[0]
                print(f"获取验证码为：{code}")
                time.sleep (10)
                flag = 1
                return code
        except:
            print("获取验证码失败，重新连接")
    if flag == 0:
        fy_release_num (token)

#释放手机
def fy_release_num(token):
    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.haozhuma.com/sms/?api=cancelAllRecv&token={token}"
        response = requests.get (url, headers=headers,verify=False,timeout=10)
        result = response.json ()
        code = result['code']
        if code == '0' or code == '200':
            print("释放全部号码成功")
    except:
        print("释放全部号码失败")


#他信
def tx_login():
    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.my531.com/Login/?username={username}&password={passwd}&type=json"
        response = requests.get (url, headers=headers,verify=False,timeout=10)
        print(response.text)
        result = response.json ()
        # print(result)
        money = result['data']['money']
        token = result['data']['token']
        print(f"账号余额：{money}")
        return token

    except Exception as e:
        print ("他信登录失败")
        exit()

#获取手机号
def tx_get_num(token):

    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.my531.com/GetPhone/?token={token}&id={sid}&card={ascription}&type=json"
        response = requests.get (url, headers=headers,verify=False,timeout=10)
        result = response.json()
        # print(result)
        phone = result['data']
        print(f"获取号码为：{phone}")
        return phone
    except:
        print("获取手机失败，请重新尝试")
        exit()

#获取验证码
def tx_get_code(token,phone):
    flag = 0
    for i in range(12):
        try:
            headers = {
                "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
            }
            url = f"http://api.my531.com/GetMsg/?token={token}&id={sid}&phone={phone}&dev=kevinxfh2022&type=json"
            response = requests.get (url, headers=headers,verify=False,timeout=10)
            result = response.json()
            # print(result)
            sms = result['data']
            stat = result['stat']
            if stat == False:
                print("等待验证码")
                if i <= 11:
                    time.sleep (20)
            else:
                r = re.compile (r'验证码是(\d+)，', re.M | re.S | re.I)
                code = r.findall (sms)[0]
                print(f"获取验证码为：{code}")
                time.sleep (10)
                flag = 1
                return code
        except:
            print("获取验证码失败，重新连接")
    if flag == 0:
        tx_release_num(token,phone)
        return ''

#释放手机
def tx_release_num(token,phone):
    try:
        headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
        }
        url = f"http://api.my531.com/Cancel/?token={token}&id={sid}&phone={phone}&type=json"
        response = requests.get (url, headers=headers,verify=False,timeout=10)
        result = response.json ()
        stat = result['stat']
        if stat == True:
            print(f"释放号码{phone}成功")
        else:
            message = result['message']
            print(message)
    except:
        print("释放号码失败")


#获取id
def get_id(Authorization):
    try:
        headers = {
            "Host": "week.rabtv.cn",
            "accept": "application/json, text/plain, */*",
            "authorization": f"Bearer {Authorization}",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; Redmi Note 5; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.147 Mobile Safari/537.36;xsb_ruian;xsb_ruian;2.31.742;native_app",
            "origin": "https://app.rabtv.cn",
            "x-requested-with": "com.test.android.app.ruian",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://app.rabtv.cn/",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        url = "https://week.rabtv.cn/v1/user/information"
        response = requests.get(url, headers=headers,verify=False)
        resulst = response.json()
        id = resulst['data']['id']
        coins_id = resulst['o']['id']
        return id,coins_id
    except Exception as e:
        print ("查询id失败")

#邀请
def invite(id):
    invite_times = 1
    while True:
        try:
            # 生成一个随机的 32 位字符串
            # Authorization = random_string(32)
            Authorization = '1e589197dc4a09e0d10283f158ef9af6'
            headers = {
                "Host": "week.rabtv.cn",
                "accept": "application/json, text/plain, */*",
                "origin": "https://app.rabtv.cn",
                "content-type": "application/x-www-form-urlencoded",
                "authorization": f"Bearer {Authorization}",
                "referer": "https://app.rabtv.cn/",
                "accept-language": "zh-CN,zh-Hans;q=0.9",
                "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.25 (KHTML, like Gecko) Mobile/15E148;;xsb;xsb_ruian;1.3.1;Appstore;native_app"
            }
            url = "https://week.rabtv.cn/v1/record/do"
            data = {
                "user_id": id
            }
            response = requests.post(url, headers=headers, data=data,verify=False)
            print(response.json())
            if "code\":0," not in response.text:
                print(response.json())
                invite_times += 1
                time.sleep(2)
                if  invite_limit_times <= invite_times:
                    break

        except Exception as e:
            print ("邀请失败")
            # pass


#
def exchange(Authorization,id):
        headers = {
            "Host": "week.rabtv.cn",
            "accept": "application/json, text/plain, */*",
            "authorization": f"Bearer {Authorization}",
            "user-agent": "Mozilla/5.0 (Linux; Android 8.1.0; Redmi Note 5; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.147 Mobile Safari/537.36;xsb_ruian;xsb_ruian;2.31.742;native_app",
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://app.rabtv.cn",
            "x-requested-with": "com.test.android.app.ruian",
            "sec-fetch-site": "same-site",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://app.rabtv.cn/",
            "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7"
        }
        url = "https://week.rabtv.cn/v1/user/doRedBag"
        data = {
            "id": id
        }
        response = requests.post(url, headers=headers, data=data)
        print(response.json())

#初始化app包
def app_init():
    REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
        4) + '-' + random_string (12)
    headers = {
        "Cache-Control": "no-cache",
        "User-Agent": "ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X",
        "X-REQUEST-ID": REQUEST_ID.lower(),
        "Host": "passport.tmuyun.com"
    }
    url = "https://passport.tmuyun.com/web/init"
    params = {
        "client_id": "10004"
    }
    response = requests.get (url, headers=headers, params=params)
    result = response.json()
    key = result['data']['client']['signature_key']
    # print(key)
    return key

#验证是否新号
def isexist(phone,key):
    # try:
        REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
            4) + '-' + random_string (12)
        # key = "OVwrqZuT0tnsaEeMoj8E"
        str = f'get%%/web/account/check_phone_number?client_id=10004&phone_number={phone}%%{REQUEST_ID}%%'
        xsign = calculate_hmac_sha256(key,str)
        headers = {
            "Cache-Control": "no-cache",
            "User-Agent": "ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X",
            "X-REQUEST-ID": REQUEST_ID.lower(),
            "X-SIGNATURE": xsign,
            # "COOKIE": "SESSION=NDJiNGUxZDUtNTlhNi00ZjQ0LWFkOTQtNWZiZDAyNjZjOTU0; Path=/; HttpOnly; SameSite=Lax",
            "Host": "passport.tmuyun.com"
        }
        url = "https://passport.tmuyun.com/web/account/check_phone_number"
        params = {
            "client_id": "10004",
            "phone_number": phone
        }
        response = requests.get (url, headers=headers, params=params,verify=False)
        result = response.json()
        exist = result['data']['exist']
        # print(exist)
        if exist == True:
            code = get_captch(phone,key)
            send_code (phone, code,key)
        else:
            print("该号码不是新号，不注册")
    # except:
    #     msg("判断是否新号失败")



def get_code(str):
    resp = requests.post ("http://35.201.145.83:11000/ocr/b64/text", data=base64.b64encode(str).decode())
    result = resp.text
    # print ("验证码：" + result)
    return result


#获取图形验证码
def get_captch(phone,key):
    try:
        REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
            4) + '-' + random_string (12)
        # key = "OVwrqZuT0tnsaEeMoj8E"
        str = f'post%%/web/security/send_security_code?client_id=10004&phone_number={phone}%%{REQUEST_ID}%%'
        xsign = calculate_hmac_sha256 (key, str)
        headers = {
            "Cache-Control": "no-cache",
            "User-Agent": "ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X",
            "X-REQUEST-ID": REQUEST_ID.lower(),
            "X-SIGNATURE": xsign,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            # "COOKIE": "SESSION=NDJiNGUxZDUtNTlhNi00ZjQ0LWFkOTQtNWZiZDAyNjZjOTU0; Path=/; HttpOnly; SameSite=Lax",
            "Host": "passport.tmuyun.com"
        }
        url = "https://passport.tmuyun.com/web/security/send_security_code"
        data = {
            "client_id": "10004",
            "phone_number": phone
        }
        response = requests.post (url, headers=headers, data=data)
        # print(response.text)
        REQUEST_ID = random_string(8) + '-' + random_string(4) + '-' + random_string(4) + '-' + random_string(4) + '-' + random_string(12)
        headers = {
            "Cache-Control": "no-cache",
            "User-Agent": "ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X",
            "X-REQUEST-ID": REQUEST_ID.lower(),
            # "COOKIE": "SESSION=NDJiNGUxZDUtNTlhNi00ZjQ0LWFkOTQtNWZiZDAyNjZjOTU0; Path=/; HttpOnly; SameSite=Lax",
            "Host": "passport.tmuyun.com"
        }
        url = "https://passport.tmuyun.com/web/security/captcha_image"
        response = requests.get (url, headers=headers)
        code = get_code(response.content)
        return code
    except:
        msg("获取图形验证码失败")


def send_code(phone,code,key):
    REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
        4) + '-' + random_string (12)
    # REQUEST_ID = 'c1c06a5a-4f43-4141-81ad-' + random_string (12)
    print(REQUEST_ID.lower())
    # key = "P09ar7pp6DrAQRn1OTtT"
    str = f'post%%/web/security/send_security_code?captcha={code}&client_id=10004&phone_number={phone}%%{REQUEST_ID}%%'.lower()
    print(str)
    xsign = calculate_hmac_sha256 (key, str)
    url = "https://passport.tmuyun.com/web/security/send_security_code"

    payload = f"captcha={code}&client_id=10004&phone_number={phone}"
    headers = {
        'Cache-Control': 'no-cache',
        'User-Agent': 'ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X',
        'X-REQUEST-ID': REQUEST_ID.lower(),
        'X-SIGNATURE': xsign,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        # 'COOKIE': 'SESSION=MzVhMjEwNDUtZDc0Zi00ZWZiLWI4MGYtZDcyZTZlMTBhYmVm; Path=/; HttpOnly; SameSite=Lax; acw_tc=2f624a3d16944393500047668e339352eae1e97cf1d3a14bb91f0c3ee62261',
        'Host': 'passport.tmuyun.com'
    }

    response = requests.request ("POST", url, headers=headers, data=payload)
    result = response.json()
    print(result)
    code1 = result['code']
    if code1 == 0:
        print("发送验证码成功")


def login(phone,code,key):
    REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
        4) + '-' + random_string (12)
    # key = "OVwrqZuT0tnsaEeMoj8E"
    str = f'post%%/web/oauth/security_code_auth?client_id=10004&phone_number={phone}&security_code={code}%%{REQUEST_ID}%%'
    xsign = calculate_hmac_sha256 (key, str)
    headers = {
        "Cache-Control": "no-cache",
        "User-Agent": "ANDROID;8.1.0;10004;2.31.742;1.0;null;MI 5X",
        "X-REQUEST-ID": REQUEST_ID.lower(),
        "X-SIGNATURE": xsign,
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        # "COOKIE": "SESSION=NDJiNGUxZDUtNTlhNi00ZjQ0LWFkOTQtNWZiZDAyNjZjOTU0; Path=/; HttpOnly; SameSite=Lax",
        "Host": "passport.tmuyun.com"
    }
    url = "https://passport.tmuyun.com/web/oauth/security_code_auth"
    data = {
        "client_id": "10004",
        "phone_number": phone,
        "security_code": code
    }
    response = requests.post (url, headers=headers, data=data)
    cookie = response.headers.get("Set-Cookie")
    cookie = cookie.split(';')[0]
    print(cookie)


def get_info():
    REQUEST_ID = random_string (8) + '-' + random_string (4) + '-' + random_string (4) + '-' + random_string (
        4) + '-' + random_string (12)

    timestamp = int (round (time.time () * 1000))
    str = f'/api/zbtxz/login&&64f46657f34e1663311c627c&&{REQUEST_ID}&&{timestamp}&&FR*r!isE5W&&48'
    xsign = hashlib.sha256 (str.encode ('utf-8')).hexdigest ()

    headers = {
        # "X-SESSION-ID": "64f46657f34e1663311c627c",
        "X-REQUEST-ID": REQUEST_ID.lower(),
        "X-TIMESTAMP": str(timestamp),
        "X-SIGNATURE": xsign,
        "X-TENANT-ID": "48",
        "User-Agent": "2.31.742;ffffffff-cbf4-4579-0000-0000345aaddd;Xiaomi MI 5X;Android;8.1.0;Release",
        "Cache-Control": "no-cache",
        "Host": "vapp.tmuyun.com"
    }
    url = "https://vapp.tmuyun.com/api/zbtxz/login"
    data = {
        "check_token": "",
        "code": "DCRPj4WveCIxHmiMW1tfUEyn",
        "token": "",
        "type": "-1",
        "union_id": ""
    }
    response = requests.post (url, headers=headers, data=data)


if __name__ == '__main__':
    global msg_info
    # proxy = xk_proxy(api_url)
    # proxy = ''
    # if jm_flag == 1:
    #     token = fy_login ()
    #     fy_info (token)
    #     phone = fy_get_num (token)
    #     print (phone)
    #     code = fy_get_code (token, phone)
    # elif jm_flag == 2:
    #     token = tx_login ()
    #     phone = tx_get_num (token)
    #     print (phone)
    #     code = tx_get_code (token, phone)
    #
    # for Authorization in tokens:
    #     id,coins_id = get_id(Authorization)
    #     invite(id)
    #     exchange(Authorization,coins_id)
    key = app_init ()
    isexist('13580886706',key)