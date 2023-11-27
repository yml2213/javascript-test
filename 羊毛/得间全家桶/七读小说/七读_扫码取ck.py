# -*- coding:UTF-8 -*-

# author:sommuni
# contact: test@test.com
# datetime:2023/7/27 21:37
# software: PyCharm

"""
文件说明：
运行, 微信扫码  将结果复制到脚本里就行了

"""

import base64, requests, time, gzip, datetime, re, hashlib, os, configparser, rsa, sys, webbrowser, random, json, \
    string, collections

from rsa import transform, core
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES
from urllib.parse import unquote, quote_plus
from concurrent import futures
import urllib.parse as urlparse
from Crypto.Hash import SHA as SHA1
from Crypto.Cipher import PKCS1_v1_5 as PKCS1_cipher
from Crypto.Signature import PKCS1_v1_5

DeJian_list = [

{"usr":"j113335843","utdid":"YhfFYv40Xs0DAFiB0SB6yBeH","token":"b6a291a5af95a0f296e3460bef7c4b21","authToken":"1","nickname":0,"zyeid":"d8af628e-1676-4455-976f-d464b16b6df4"},

]


class DeJian:

    def __init__(self):

        # SHA1WithRSA加密sign的公钥
        self.privateKey = "MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAMXGjyS3p+3AVnlBJe5VQ6tC9inh8tVBve4r+yBjC5HQD6th2n3tSyuNVYaNRAFSEq+OENwnwwhjbYUnjLWb+qZscB43K1+4/WlKdvfgwQVXm0ZQ2+jMBf+165UBEEuuWT2WqXeKkkUqPQta5lrt4eFfbo53JcOO4D5fDSGQS5bZAgMBAAECgYAor4I/AXEQXeLsKtTMxMmY77uIPi0gZdfWqUGOFhIJOw4eKZEzGp++I+MWPPVieCnT55vcTmm2zg13uP0fVykmukWqZszG/ZNpPKYleOqnZOqQj7O3au8Ywz18F/pqD++PsUzxRVeXxSOOwmjQ0D2Pe/9yutz62pyiFGAzDsaI6QJBAMn8DeBT3AtcWuONdiHL3yC4NkGJDdyBbMOaWyvrcvUUZr13uS9mZO6pLTN6v9tkmPUdvYxcPTJ9wdGR7NcNPDsCQQD6qluGI2VAlz4s5UoDnelFKrwDPeiruE3I6wsrasK6h37DsAE6OrQgx2dm4yH7ntJHUlJCZ5ay1EBNfEexgQv7AkA1r2vUwxVKY7q4nqHWa8SbgrrRAmePw0qwVreC3erJHyoLk+XBpnqPQKIF+8tAueU5yTTXOLD/WZOJazrDEf5/AkBpwG+Ggu5Xtrcbd8ynA/sDHElf0MGVmNbwOgFnWs42pa1cX6fU6ilOXvIH3TFcF6A9SMS9kThpz9QlHJaek4P7AkAavQillA/wnrha9GsK5UFmzmwNfkjLLW4psAUsXOsqFXWMoxTd0xWuSbuVOzERpbFMBl1VoZQmD9BLSVOTNe+v"
        self.app_name = "七读免费小说"  # config.get(App, "app_name")
        self.wxappid = "wx0488b2337ff4a61a"  # config.get(App, "wxappid")
        self.login_host = "dj.palmestore.com"  # config.get(App, "login_host")
        self.welfare_host = "dj.palmestore.com"  # config.get(App, "welfare_host")
        self.welfare_host = "dj.palmestore.com"
        self.p2 = "136002"
        self.p3 = "25006056"
        self.p21 = "1303"
        self.p25 = "25006056"
        self.p33 = "com.dj.sevenRead"
        self.dl = "5.2.2"

        self.headers = {
            "Host": "dj.palmestore.com",
            "user-agent": "Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)",
            "content-type": "application/x-www-form-urlencoded",
            "accept-encoding": "gzip"
        }

    @classmethod
    def check_config(self):
        dirPath = os.path.dirname(os.path.abspath(__file__))
        configPath = 'DeJian_config.ini'
        filepath = os.path.join(dirPath, configPath)
        config_file = configparser.ConfigParser()
        config_file.read(filepath)
        print(f"==============[DeJian全家桶]================\nConfig校验中......", flush=True)
        section_list = config_file.sections()
        realy_section_list = []
        for section_ in section_list:
            try:
                app_name = config_file.get(section_, "app_name")
                wxappid = config_file.get(section_, "wxappid")
                login_host = config_file.get(section_, "login_host")
                welfare_host = config_file.get(section_, "welfare_host")
                p2 = config_file.get(section_, "p2")
                p3 = config_file.get(section_, "p3")
                p21 = config_file.get(section_, "p21")
                p25 = config_file.get(section_, "p25")
                p33 = config_file.get(section_, "p33")
                dl = config_file.get(section_, "dl")
                realy_section_list.append(section_)
            except Exception as e:
                print(f"Config:[{section_}]config校验失败，{e}", flush=True)
                continue
        return config_file, realy_section_list

    def SHA1WithRSA(self, data, privateKey=""):

        if privateKey == "":
            privateKey = self.privateKey
        if str(type(data)) != "<class 'str'>":
            msg1 = ""
            for key in data:
                msg1 = msg1 + f"{key}={data[key]}&"
            msg1 = msg1[:-1]
        else:
            msg1 = data
        private_keyBytes = base64.b64decode(privateKey)
        priKey = RSA.importKey(private_keyBytes)
        signer = PKCS1_v1_5.new(priKey)
        hash_obj = SHA1.new(msg1.encode('utf-8'))
        signature = str(base64.b64encode(signer.sign(hash_obj)).decode("utf-8"))
        return signature

    # 以下为扫码登陆

    def post_qrcode(self):  # line:16
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 9; PBBT00 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 MMWEBID/3625 MicroMessenger/7.0.17.1720(0x27001134) Process/tools WeChat/arm32 NetType/4G Language/zh_CN ABI/arm64', }  # line:7
        try:  # line:17
            response = requests.post(
                f'http://open.weixin.qq.com/connect/app/qrconnect?appid={self.wxappid}&bundleid=(null)&scope=snsapi_userinfo&state=w&from=message&isappinstalled=0',
                headers=headers).text  # line:20
            auth_qrcode = re.findall('auth_qrcode" src="(.*?)" />', response)[0]  # line:21
            print(f'[{self.app_name}]:打开以下网址微信扫码\n{auth_qrcode}', flush=True)  # line:22
            auth_qrcode = auth_qrcode.split('qrcode/')[1]  # line:23
            return auth_qrcode  # l
            # print(response,flush=True)
            # auth_qrcode = re.findall('uuid: "(.*?)"', response)[0]  # line:21
            # src = f"https://open.weixin.qq.com/connect/confirm?uuid={auth_qrcode}"
            # qr = qrcode.QRCode()
            # qr.border = 1
            # qr.add_data(src)
            # qr.make()
            # qr.print_ascii(out=None, tty=False, invert=False)

            # print(f'{auth_qrcode}', flush=True)  # line:22
            # auth_qrcode = auth_qrcode.split('qrcode/')[1]  # line:23
            # return auth_qrcode  # line:31
        except Exception as e:  # line:32
            print(e, flush=True)  # line:33

    def post_code(self, auth_qrocde):  # line:36
        headers = {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 9; PBBT00 Build/PPR1.180610.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/70.0.3538.110 Mobile Safari/537.36 MMWEBID/3625 MicroMessenger/7.0.17.1720(0x27001134) Process/tools WeChat/arm32 NetType/4G Language/zh_CN ABI/arm64', }  # line:7
        t = int(time.time())  # line:37
        while True:  # line:38
            response = requests.post(
                f'http://long.open.weixin.qq.com/connect/l/qrconnect?uuid={auth_qrocde}&_={t})',
                headers=headers).text  # line:39
            print(response, flush=True)
            if '405' in response:  # line:40
                long_response = re.findall("wx_code='(.*?)';", response)[0]  # line:41
                return long_response  # line:42
            time.sleep(2)  # line:43

    def get_issuedId(self, utdid):
        t = str(int(time.time() * 1000))
        url = f"https://{self.login_host}/dj_user/out/login/issuedId"
        params = {
            "usr": "",
            "rgt": "",
            "p1": f"{utdid}",
            "pc": "10",
            "p2": f"{self.p2}",
            "p3": f"{self.p3}",
            "p4": "501656",
            "p5": "19",
            "p7": "__e2ba088bce115acf",
            "p9": "3",
            "p12": "",
            "p16": "MI+9",
            "p21": f"{self.p21}",
            "p22": "11",
            "p25": f"{self.p25}",
            "p26": "30",
            "p28": "146bdb4427eb2ecd",
            "p30": "",
            "p31": "__e2ba088bce115acf",
            "p33": f"{self.p33}",
            "p34": "Xiaomi",
            "firm": "Xiaomi",
            "d1": f"{self.dl}"
        }
        data = {
            "versionId": f"{self.p25}",
            "device": "MI 9",
            "imei": "____e4ba066bce775acf",
            "timestamp": f"{t}",
            "channelId": f"{self.p2}"
        }
        data['sign'] = self.SHA1WithRSA({k: v for k, v in sorted(data.items())})
        response = requests.post(url, params=params, headers=self.headers, data=data).json()

        # print(response)
        return response['body']['name'], response['body']['zyeId']

    def get_smboxid(self):
        url = "http://fp-it.fengkongcloud.com/deviceprofile/v4"
        data1 = '{"organization":"q8VWRaAq7Qkv7w6EgXDV","os":"android","appId":"qidu","encode":2,"compress":3,"data":"Yg8tu7LrclMENRVAa+ygDSoaUo1ED6NYV3d0dYAnsFiSivRLcAV45NAKzTvZg41Q+fNSqL7qV1Fm2jZhQ\/FtbvRbcMqZTTJVnbT9vymgzmxjPBmH4TiGun9mz89\/GYeHUjQEO3\/9LW74+9fpUolaeKMFoSFNHpvKcyzpJ1AL8wpfxY5D\/6C24JjX2piYr8SdsUbJQY43LV5rZVmH6i2s3JPkFmmq0W2XOPEHSc1gMca1\/y\/NOlVJ6GxRuLuC2SdzXetntTVy2WpDya9dN6mUpb7P1t1+RI76f4iWrzcwghBx3bRHPJVmgrkz6mtUDt+qOlCbEYXNoV1ohOvz\/kk2XhZ9j1KKvsue8TaLrQ7Q4xUnMKVxCQfSymD+c2R+x6LDPqrD\/6Kfu1eakU1b3IZ0cAhoy6sprF4cILmFOvzCw6JSNo8A1Ydnd2x49Q8oHsUR0ZwB0r5l6j0y+CfOM\/ctAGJRcmfG81FFH5QNB7x2Xoy9D1ztH+g8W\/scgb9XW0i3t9IVe1p6G9K9QNnDkAFbeTekBWbGZZQjYs12YkT15yJ3bbYc+nRPdObVgfGabA1pf1wroJGHAwMaxHNRvn1s2RRs9pWWTDgl1uM2SeBIgfypTguobsQRuU7WcHsARbnowbB4ZK7oPpliKgnElE2dNrDHxuHM\/E5iQCgmkYrtfYheD0mCHY8dbiu0U1eCN6\/fWhHzuRoF7zLMpIzV7Sc2YE6a4\/lR2mSNcougmho\/pYpnPiQX6Tj0wlhtuljyz\/EjzbruFGFhwmscX5d9BAWvGYVkJTtFdq+Fo3mhgqjBSw3+qd06TMR\/GuB+1PRPlcYgNba\/BrQNz0psBDXo2sYtFFiTMRkQp\/wvG4HSw+7ycEc5I1DkudtQNSjIzF\/t4vuBWjqZ+RHuCzS5ykpiuMWBE1MmAkKgNPqL3rkYjQCLVa8kWFYGzKsZQLT6H8Qvumr6P9rjoQ1jRzyZoFGMmSbKgWaTgMAJxf\/yUCaskejfEPxFmE3GW8+aQq2CHbRnsxtrvuzb971dVXhXEtyWOrBjWiBYK3FdTQsndghQ1s29oiRH4ekapalIMtx31TxyuLi8zj9fIlz78GoP16uf4uOYcZE8bTNjoXa5LHx1I1\/UBElT\/JUd\/ELlEG7419TftvGr3FW8CxZMalow\/4FOsbRSA8NLZQq2aBuaqyBJkJpzbtdnExsl1a+VV6SmEvUobWhtkkV7ooNkWOL\/g\/EEOkXLUNENp\/L\/ZPtkVbgwlh11TeWceYcluLcM5jLFlwXhErenP4eWRvwVDhNmHApzLjm8CzW2lG3wUVuuML6\/lfifMebXga2WhSxXomwjS7lRuNy3\/QFLBkTvoAXjkL7V87zlUEVgUrHakY80ydZWVYHer9Si15n8Zpz2brDTqLFbZ2unmAniZa0jtAz70t274+wTeZlIk8uQf4cmfARxYOzdnPqcRL+waumHUm4\/bzgNsLbuglMo025oaJmL8qvNxPjEXGT9O7CPvh1+wHEnNTt+irWMiLjBvmGrN7+5eLWS\/1iR37JKPPH2uZDhJ0aK1rH0DKq4d3dHCc2jYpqRNvug3e74ms3ZUreRw1PS9jfpoTCHvVNlJe0oAeJ+H3517SByoQba1yERI\/g4PNJpe7kiFU2k5qtnl\/KYO1iUmYs043xkakyOVhGAuFDylHHqVB\/rkTuOev7bmEnQbnh8tofQVBOO3qiEMmTc3Qh0rI32XDZr+SX4lKYxlIoLDGLQkTF5DGwTVteAf\/AOwzbcphU5ojZqddeeC1UHe3WsxNWVyV\/pLB5uUBFZj42WIucbMWHRQo7JZrIjDRtv7neM5MdAfdVV1Z5mIBWBdwlMocz0JYL96kieuPn9EI\/6iSKSQZV9BS9P7L\/iaeojbfC6Qd+TrTwPgkLs7D2TUQiWYmR7R6ZNqxyOS0a5yMPxMotWqE3SNJqF6trfRVvs8MvgFdbezdftBXVKc9SYzMSCaSghJ99rE44HLzRHXpadjgmeQkeR2Ur7rrdpptOylkVDDzUSgfyrkW6p2nkcSDDcKQkos\/XyXDme0oetglKdM2UmfSzqMJd99Vbqi0VHnYK69dD6Tdf7IC8owdlMT9TwI\/v3sJxFBIbMvizPbKiyYhv1unvSoOhIXgvEodUHnhLr35WFFdhlehegGRypqhWoASQpezL+tbFzdgiiGzCFLQS+sKTvvunv7tfFuq5KNL+G1vnl4++vIoyvh603zJfx3PrsDjAnF22CbUYeLEbvVUGEt6pcYQLU5O9U6r4lT+FjP0LYf1YwJ5NVl9gQRWO+kkJw97CDXUkvsbvEauQqaHPdzc82EzksU9BPV3GuGwANy4t23eQ9Py+zW4FGdML\/VPIYxMu1xbFy94V9YHulf\/0IuBx4IW5a+PbGJpW\/HeA4HS8u0c5BdTnQH9Mfc2e1ypGOOvrEy50uKXodrzxbg7uPnLXcN5lbVa4f6r\/8nGH4ucai3XTRY6MXcSaujCc4wdYOwELqINDWaXnkWdhRXR2mXJPz1U3T51a74KMPgoTgN7gy4e6oCwCVS4DrH\/GnUJdHqG4TpklxVj6LvrW\/xCKVWqWVlj+rktwzKcF29otPrwZM2l3MfpndfF99adok6PZWJQf0X8s6FScYdrJnjIxygejEGJqsBOJGWqKdv0zJ\/\/yNAS\/HyyxvEfw35\/Y2UZ2\/Aa63Y7eakCMzQwFJfLHaKGYj9Wgn63eEVMRkx7yb2I5kcSnV1LihGhru4JmakfB903CYL\/O1HNfujYbkmWBfkqobzuH64UUeQj+psVTOQZig3au9eYR7Va+kTErMPM2Fk486VDucaxVCLU1CmLDqCO6smrsijiaqEXPu8RQfI+RxHEKbqWnYTgoLCe4KxNx2e5Qsg0YPUyB6YxY04sCKI5EeMHoVnco9GwOxCpE0uzyarXbVqNDLXhjHP6AtNC9GWNGtimQoxwnW3zWxopqhRYx\/UUxnDVkeYBC65DVgGgCKTlxT0YtTcwKgjMzLyWi\/WYEHE1YX\/m5GeU3gguKtajAMn9Oekno3UbzVeqMJpX0DPCLe5DmIigDB2kBi\/DSdjGwvb4PVn4CFzvn2Kcn7h83EKXpYGr5YJzjHtS7LVGjg\/2++IxHhAItPb8V7HbEFsbow","tn":"NZ30raQQgcvbqiVizz\/3WK2HzPIRYgaXxxBK72DY1tjPpVYuanNFn8DByukQioN+whywF82Zngdlp+w6KW4wsD\/0H\/DvoCSITP001FOxm+2R\/C+Of0MOr0N+vaxJIib03D51l8XZb5Y0C697Q0X736UQyr+F\/8plwuIhUUBObDuo79v4InZ\/t9QW1RMSVtr8atuNeCs3nqGupCxxwbl7G+XRZTo061tVtqT7jvmQjDa0vvGK2vzQDYicGBZE4h60NaiYtqs+c2Gs5kxnYTWZyXjXOzuauesO0QyMyjx3+XAXVC4uqdn64+JamIwxdD05V3U3MhOxhYl4DXWfgKyNyA==","ep":"g7cfWsrfx2E1OG\/68RV4mhHjbwirs5TvZdWmrYSaKf+kgQDd7wrRaR5PDGpy36ZCvvAMjMJtVvfXzlVfK1U8MQEEnIeqBkrJexmqcWVz4pNVVmDmADpNeR+mOy+OHq0SnaDWWI4N9yFU96n39Gs7nlVE\/9PAm\/wx6wg0fi8xCvcYfMg5Hxh7gw6Hbs1r\/\/aQpHbZwlGKYm5DLP5L5nt5sARi2P1NWRifv9ercQ76iStMwzk\/CNWC\/yj6IyDTnFkKA\/XnvSeaH3i\/WJy6PXr51jP1ZXujV3a5JGWd3426OCL94sBAdWrERL12P0XYNnejPvg0fPibn8e+y2ZOIFyFgg=="}'
        response = requests.post(url, data=data1).json()
        return response['detail']['deviceId']

    def WX_login(self, utdid, name, zyeId):
        t = str(int(time.time() * 1000))
        code = self.post_qrcode()  # line:11
        wx_code = self.post_code(code)  # line:12
        smboxid = urlparse.quote_plus(self.get_smboxid())
        url = f"https://{self.login_host}/dj_user/out/login/loginByOAuthV2"
        params = {
            "zyeid": f"{zyeId}",
            "usr": f"{name}",
            "rgt": "7",
            "p1": f"{utdid}",
            "pc": "10",
            "p2": f"{self.p2}",
            "p3": f"{self.p3}",
            "p4": "501656",
            "p5": "19",
            "p7": "__e2ba088bce115acf",
            "p9": "3",
            "p12": "",
            "p16": "MI+9",
            "p21": f"{self.p21}",
            "p22": "11",
            "p25": f"{self.p25}",
            "p26": "30",
            "p28": "146bdb4427eb2ecd",
            "p30": "",
            "p31": "__e2ba088bce115acf",
            "p33": f"{self.p33}",
            "p34": "Xiaomi",
            "firm": "Xiaomi",
            "d1": f"{self.dl}"
        }
        data = {
            "smboxid": f"{smboxid}",
            "versionId": f"{self.p25}",
            "device": "MI+9",
            "pkgName": f"{self.p33}",
            "userName": f"{name}",
            "uid": f"{wx_code}",
            "imei": "____e4ba066bce775acf",
            "timestamp": f"{t}",
            "utdId": f"{utdid}",
            "loginSource": "%E6%88%91%E7%9A%84_%E9%A9%AC%E4%B8%8A%E7%99%BB%E5%BD%95",
            "authMode": "token",
            "authToken": f"{self.wxappid}://oauth?code={wx_code}&state=ZY_iReader",
            "channelId": f"{self.p2}",
            "platform": "weixin"
        }
        msg = f"authToken={data['authToken']}&channelId={data['channelId']}&device={data['device']}&imei={data['imei']}&pkgName={self.p33}&platform={data['platform']}&timestamp={t}&uid={wx_code}&versionId={self.p25}"
        data['sign'] = self.SHA1WithRSA(msg)
        response = requests.post(url, params=params, headers=self.headers, data=data).json()
        App_params = {}
        try:
            App_params['usr'] = response['body']['userName']
            App_params['utdid'] = utdid
            App_params['zyeid'] = response['body']['zyeId']
            App_params['token'] = response['body']['token']
            App_params['authToken'] = response['body']['authToken']
            App_params['nickname'] = response['body']['usrMsg']['nick']
            print(f"用户[{App_params['nickname']}]登陆成功\n{App_params}", flush=True)
            return App_params
        except:
            print(f"登陆失败\n{response}", flush=True)

    def mobile_login(self):
        """
        流程稍有繁琐，暂时不写，此处先记录流程
        1. 获取name和zyeID
        2.获取数美加密smboxid,先留下curl，后面有需要就写
            curl -X POST -H "Connection:Close" -H "Content-Type:application/octet-stream" -H "Content-Length:4173" -H "User-Agent:Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)" -H "Host:fp-it.fengkongcloud.com" -H "Accept-Encoding:gzip" -d "{"organization":"q8VWRaAq7Qkv7w6EgXDV","os":"android","appId":"qidu","encode":2,"compress":3,"data":"6FmsVq8CHp0uDqym6KoULH85ozRPUrku17BilyC7ygjJ8svWHMAcxm\/u\/ynVsgd7a6Lvb3pYXj7CYyTeoYp0BwUo1NjKC3ywh7F46f8QsFiD6kB56dxcUkz6KGRAKUlGjgYvQFeGtsJW3OM8uRZqErHAtFgWIURtLRpjYxos5H7uGpnTm9TIV2lZQfAL\/WbLl036FF08Td0SMFqV8AySa30PNL5404RiDm9mbITnegh673CY2wRVK+4PvHakAuL+oaky\/H2+O+HtKa0nEzRgzxFzpesq4jGspf39MxfStQfUegHcaFGPYC5ZRcwA7ctUcmfk09ZZpIEStfPNdCzToZut6TBeMUMT9UlRPx6+kefasxM8\/53XKlG+Np9hgsiAY\/r4PMuxlzgNUggycCD46BOWMpqNUlGHe0cS2qJQTa6k56NVDerqL0h+oZe\/UOjFSXbBhVhWQ+uyY92HKzNoVmtq2mwyzt2OyyvBUK2Mh1b8BWea1J1g0dXjQWu6cBUwNE9ajd5etmzDEw6zfKPkLW6HozblIEBmBeyRgxHn7mbG10p8fNVSKNXC89sNYWZ\/HhxKK5oeVZJdktv1BFHBHBP4pJw10XYAvx1raz4PzN4VSTteFdYdCTnwWZTHJFU5ll1rDuSjdaYvGX4s6p9qFV7bUWfPSdrYXlDTvjY5i2I8CCoaKvIYtsr2bAzttLjW33kUNh9qhOYAqYy3DZHkmABh5Cm2MnOHdvycLTU1+8nlUZRbSSe930Iea+e6qPR2GXQfCLefMUyyCFaefNHAWbMZc6U5sA8fQEwt2uskBBYbgoov6f6wdlpJNjeL7Gb9XH\/95NQKHJf3MnmtdYOXWfFJULJsDec4j\/kxdG73RXyx2qF5N2r\/zaFNK9kJBp2rps515NYkWEpgK04fiVlJwGS+mI6ocFI7DTfnzWDjCPPH+U5SCKw84wR34tCL3Mt5bKFtxleaKbx39S+Sdhf3igwVcwH9OGfI2rTIzfSL8gxITNWY0dPbEXZbloVJORu18EwGw3b1Gy+LLXf7c\/r9YamxxUXOFOG067Lp5gT3KT4KY1mY\/KeyVPMcL38ovdaTjFx7+b\/pUnYQOty9SJs1lsKt2qBUJ6TE+hkjP7Mx5V8680qeEFxVk691NJQXHpHqKHLf1kUGWEr1l6hqOctjDuGjwkG5Yab8WIO1p6K4LcgpdICsl7x9gI8qJ+RPz9Mo5O\/P++\/ofHXN3GXf3kvNr5o\/vgQGnp5VTm9sM25dRPBdQMD4+KIM9NmMvJ\/n8YjRaEivmEwYUJJx9n4fzt7VjhmmTk9UZpNpJJ+yMQKOcoQWJw\/TbNbx3d1HV02gBVm617PlY7w\/ZbD6SEVx9iz9fyClKGucRRZWSsModQ3Q01JMn76X6ypASLQxnO15HBdFHEAiyEy01qNWD+Ar2cdCE6q\/1bvpjawU5UbsrRW\/ofLtLdM3TxgZTVf8endPhHn2ndA59\/u3LEgP1Ktor25MiBMV+TTlEQBhUWNqJ8xS7\/SzYAAN2M6LobkTbV0unqqnuWTQ9Cd9sbe5f5K679i86EKpyUpczr\/kp3tBusKEs7nJ3OzO5aMeFezvfeSsF6GoyqbEA\/\/Erd4RYcjAAqZSSH8dzKd44wyr7L3ZIhee5G7tmzByxfxen4RBP96EuWPrdNe2rltjYyokq30VDWe3W+Ho+cVuBr6gekvRO8GE+KNhcbJT2NKJ3pYuF9iIjAIyKlXEwcbj3sdaLEr+Myq9nWjUTP4GRl4wy0hQQm09H3fDPUqkNwjHVIT1A2ezeSDq1EUi0rMwVJM4qpbqOO\/dIonWOC73t+WhqZjip4yvPhlJvKTarTQepLRpVQKDyIXPPHIuzwvY5uUjfEutNDImaBISFtYB\/kTT4UlDyR4HrEBBJq2F3ON5X6FpwEuGK5Mzq2pEHO8vIGFX8kVixXzWh9nMeGRFaOaXt7u77YltlrdcjzHS4pSVUSEhJkUgHm8TyTDALJvJTywZN2rg4nEpTs6QGhP+Mmy1HEtxtgHViE1sxKk88un7uz73OpJ9yLYRu8F4fC9thV77\/UgMrmkhybk7mI6Ystho6o0GK9sf2rY4yZNr6ZpGuddJViqdiQiGQNafT2b9qu1+IpXsngzC50qkjgN5a4nGveklwaHh+4kTheom6K8\/mdalUaY+FiGtfn7KYuuc3XMlYP6Zr1pjKVXrVEC7cxZYHWcSjs65YQhzb5pebqHeQrCQnGPEd2jkxmTL+2b9HMZNAtr+uf2Nn7U0bKSHoDmhVYXOVmvCZq8lSWrOyjoZg+XkTu2wa02LhuUo3414y67iujjHIprKvvNTFDvDu+FIByqiEMiL0L1maW+RothwLvyg7HWCGTO3vK0AWYxUeTxI3RraIvnoxR8VSYoIY0vuQfjAoRY9x7ckigNGKMwqBO1kxdaHGmHkalKR5ZKTnp6DVl\/CJ9JK0bfrsi\/RRmIKO6WsCcKr5XnfRjw7Nampb5utHAM2O\/wAoBzBbUFX7HW0OLlL0AIs7\/IoINrWQevr\/023U0fUvstvbhzE\/qscTHPBmg3KfkH8vCFVrj9p+fOVQanZD37tPw8l8KX2ytqw5MD3TuCt\/FshtQuEQE7+f0nIDOk7g3GucrpVV2VysEageKRXa+DfohiTLGKiyYhRdIyhXPOboU7p7DLXrgvQVLnIgCqKqYfL0hRTY0XL0R5l\/arEwqO0Js\/1P+mmBswa8yD5WsMXTObbsF+CeQdR8nbad2LvQvDw\/V6nup3E2cWGZPYYoFrGVcEQ92B1GnMBGJdd0t12oGOezika8rHEqpfyGpiyTqUJDmBXcldTU9CbERzQ1tivqHlNK50AxuV9l3WI1AkG86s5cV2LIGOXvQY0\/wfiJrhBATBVRDSx5atdVvUkzsc7XcK+fGsXtotUXhUtJUhqKGNncoXg\/FLChDftiYOPCFvc7rMcg5WrV9SNb65bxTdeuRASHgxyAzeUSBDwKZ9yOSdiHTQNta+3O3gfmzff7S2hapxUE6\/oXBapU5R0RDcjCSFys87dNPd8y\/cZBibSQpckTAHzjg3i9iubsXIjh3HtKDuZs6PjjN5Py49MAq7RFvjRB\/APWZup5WhREGnFceg0T8JA6Frpg5SEdzNqiZmEY57SWZcDkMOA\/\/Y\/ohqEAxCaPaaDMiSrqTdguF+hmpWrmZfA\/sZIv8pB8XgzqyirorZFJDf3z8bwwOZXEQ4fG5DCyd9SYyJhCYF3n6Xs64MgZtrFyRE+vX0UYCaIl8t2DFlOdNXEC5QY4xEreOkrN5g7bCUO0BlDiTLuds40q94=","tn":"Iu0j6GzSLHTFN4t440+d3OK\/hmHpF20BSzKQH+M72wSyxYbLJQ\/JeJBiSg5c8Hu63oWtBNytwVq9STZBd+KzHmTWLuV7IMQIw+EVjlJQDxGfbFub34uE1l7+yJVtrngX98WLNKvWsdoW\/DYKekMPU7X9VinjIMqZasFO9FPKwqHgHT7sOQ3GssGHOehPcsVQDg+K8Y1nJPXnmMy7EHjIt6HvTKJesjXeskKaTAUgMUYVDAJxS8pwsj2As8D5YKujXOqN5egsDMEg+oiRUAZ75YGNXjWb6dqK4QaPQmx7ILjMuLrwjV3jKf9mrZCPCZb\/LDoajJTrzmx+FZl4PHdXAg==","ep":"dJepgdhV8N83pVdvwK68Agm2j\/C2tObwEhZRpYToM4Lf0Qb2dIvpujK3tHGP63NHcxIch8DQ\/Cb\/f3+\/xsTlrMroRzoP3qZ+ORE5N9icI9nn3lQc2+8mzmk9+fvHHpH61ZFHeks6NXZZoPW3W6x30cgJmG2Pi7bDr6S2ke2SO7jRr405fbP1eECMb9szdBVDOc6bGjH6EzUpQRqAxW8ZZNtbqJWz43i8gEUjMS+YwtgjPNGDuUGjhKcFNzeikxi4EobAX+KRRoiBLCSOISSg02O7sPGY+RYCeiXaOeEymIOOWo3UXeZpOPdyPrrmDxPGA3cKJsMBv91RGaAe5iwshw=="}" "http://fp-it.fengkongcloud.com/deviceprofile/v4"
        3. 发短信的curl：
            curl --http2 -X POST -H "Host:{self.host}" -H "user-agent:Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)" -H "content-type:application/x-www-form-urlencoded" -H "content-length:500" -H "accept-encoding:gzip" -d "versionId=25006056&device=MI%209&flag=1&imei=____e4ba066bce775acf&sign=EVdykRde6eZF%2FMHzTv4QxQ7j4%2F4yAPKUMN%2BapW1fAbuXzMhdeUTkQcYYZ5Tkpsjy%2Bvt2Vhy2pC9L7tcYnBsl3MUXS6kpdci9Bcv1yMLW2WW%2Fdduh8xeXZ0aoN6Vs7eiodUo3Wh5NLOL0A2tONru65ApXEyzO5TrZqr1hyzrhSC8%3D&timestamp=1690470309557&phone=N3R47mobHia4fu6Z7EwHMri3kFVNRVeLxZeFW8yn0QszKWUFirC9t2sWC3sc5z%2BXb7kiXtuHNdwhTmthGV4RZ%2FBFKRvRoVxSIqPPEULl1fXAAcjkfyt0sWA47RlZgQ6kxXt5GUNsORKIJSc9z8H8ygfbbBs9DxpFKp5dt40SdEQ%3D&times=1&sendType=0&channelId=136002" "https://{self.host}/dj_user/out/sms/sendSms/V2?zyeid=3da31826-980b-42ca-9f6f-c60525518073&usr=j166492833&rgt=7&p1=ZMKHkOILBpUDAD8bg5NP5FEw&pc=10&p2=136002&p3=25006056&p4=501656&p5=19&p7=__e2ba088bce115acf&p9=3&p12=&p16=MI%2B9&p21=1303&p22=11&p25=25006056&p26=30&p28=146bdb4427eb2ecd&p30=&p31=__e2ba088bce115acf&p33=com.dj.sevenRead&p34=Xiaomi&firm=Xiaomi&d1=5.2.2"
            没啥好说的，phone字段RSA加密，同下

        4. 登陆接口的curl
            curl --http2 -X POST -H "Host:{self.host}" -H "user-agent:Dalvik/2.1.0 (Linux; U; Android 11; MI 9 Build/RKQ1.200826.002)" -H "content-type:application/x-www-form-urlencoded" -H "content-length:1069" -H "accept-encoding:gzip" -d "smboxid=BWfSgBfP81jEN3p%252FvQpQTztrFmiRfwYIrY%252BbeiWfbdHbO0nc33t3Of1mEJCHb5dys%252FntBD3P5H%252BE2bFLLv%252F1kRQ%253D%253D&versionId=25006056&device=MI%2B9&userName=j166492833&imei=____e4ba066bce775acf&sign=HhSyve9V601%2BSHYzYCwzpIrx%2BLJ2LMTtUa9XukyuyGcyJ1P6JhsYcJBXl9DiyZqb9e7fRvl5A0qPmQE8yVR52T8aDAROmds96QP3anyd7lZckBgq%2BQr8Y3lCI0PVfJo2KY145oWQTSDT6nNU82TodAMUatPqfhLFbXw8YcdnJ%2FQ%3D&timestamp=1690470323224&pInfo=%7B%22DesKey%22%3A%22SBm69PCqG1MmifF%5C%2Fydqv1lfFTghUy2qPgtW3H77FgQ45LbBkHPJVufYytLdq4qp4GaHTVTJ%2B1cwDvxa9Umt92f91O%2BnPJ1c%5C%2FwW0XCHcK2%5C%2FBmhSuH%5C%2F2S51T1y1So3l2mTq6NbQM592tujchTUcPW%5C%2Fi2nt4O3C9QD3%5C%2FTa%2B4Kzgbcc%3D%22%2C%22Data%22%3A%22U30FR%2BjpKx84LcFvQLIt5MZ81X62mscxtM9zx%2BzLFmcCHgPG%5C%2FB5f%5C%2FA%3D%3D%22%7D&phone=F37PSJa1Ryzh1zj8d%2BapUxSvacj7m%2BZrGcTJF9ePjswVRRgcEBSWEkStBwMXxFzZG8CeoyrqC9DuY87DX65CeuohL%2Bipa4dmiRG%2FdjtYmCs8Ah%2F%2BbcJwvRIgaXCQQnJCV4t4oINt9bInt5z5jWKe%2Fhb8m%2Ful5RMv4kKcv57OZ0A%3D&utdId=ZMKHkOILBpUDAD8bg5NP5FEw&loginSource=%E6%88%91%E7%9A%84_%E9%A9%AC%E4%B8%8A%E7%99%BB%E5%BD%95&channelId=136002" "https://{self.host}/dj_user/out/login/loginByPhoneV3?zyeid=3da31826-980b-42ca-9f6f-c60525518073&usr=j166492833&rgt=7&p1=ZMKHkOILBpUDAD8bg5NP5FEw&pc=10&p2=136002&p3=25006056&p4=501656&p5=19&p7=__e2ba088bce115acf&p9=3&p12=&p16=MI%2B9&p21=1303&p22=11&p25=25006056&p26=30&p28=146bdb4427eb2ecd&p30=&p31=__e2ba088bce115acf&p33=com.dj.sevenRead&p34=Xiaomi&firm=Xiaomi&d1=5.2.2"
        5.参数分析：
            smboxid：树美加密返回
            versionId：self.p25
            device": "MI+9",
            userName: "j166492833",
            imei: "____e4ba066bce775acf",
            sign:SHA1WtihRSA加密  【channelId=136002&device=MI+9&imei=____e4ba066bce775acf&phone=F37PSJa1Ryzh1zj8d+apUxSvacj7m+ZrGcTJF9ePjswVRRgcEBSWEkStBwMXxFzZG8CeoyrqC9DuY87DX65CeuohL+ipa4dmiRG/djtYmCs8Ah/+bcJwvRIgaXCQQnJCV4t4oINt9bInt5z5jWKe/hb8m/ul5RMv4kKcv57OZ0A=&timestamp=1690470323224&versionId=25006056】
            timestamp：没啥好说的
            pInfo：
                DesKey：这个有说法的，RSA加密字符串：96951234，这个是key：MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFxo8kt6ftwFZ5QSXuVUOrQvYp4fLVQb3uK/sgYwuR0A+rYdp97UsrjVWGjUQBUhKvjhDcJ8MIY22FJ4y1m/qmbHAeNytfuP1pSnb34MEFV5tGUNvozAX/teuVARBLrlk9lql3ipJFKj0LWuZa7eHhX26OdyXDjuA+Xw0hkEuW2QIDAQAB
                Data：这个也有说法的，DES/CBC/PKCS5Padding加密字符串：{"phone":"15335445814","pCode":"1008"}，KEY和IV都是96951234
            phone：RSA加密手机号：15335445814，key跟上面一样：MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDFxo8kt6ftwFZ5QSXuVUOrQvYp4fLVQb3uK/sgYwuR0A+rYdp97UsrjVWGjUQBUhKvjhDcJ8MIY22FJ4y1m/qmbHAeNytfuP1pSnb34MEFV5tGUNvozAX/teuVARBLrlk9lql3ipJFKj0LWuZa7eHhX26OdyXDjuA+Xw0hkEuW2QIDAQAB
            utdId：utdId
            loginSource："%E6%88%91%E7%9A%84_%E9%A9%AC%E4%B8%8A%E7%99%BB%E5%BD%95
            channelId：self.p2



        """

    def main_login(self):
        utdid = f"ZM{''.join(random.sample(string.ascii_letters + string.digits, 22))}"  # 生成随机设备utdid
        name, zyeId = self.get_issuedId(utdid)
        self.WX_login(utdid, name, zyeId)


if __name__ == '__main__':
    DeJian().main_login()

