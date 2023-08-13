#!/bin/env python3
# -*- coding: utf-8 -*

'''

奖券世界app自动任务
教程：

购买一次建筑，抓取url，https://android-api.lucklyworld.com/api/index/buy?uid=xxxx&version=2.5.0,查看headers的文本body，
复制下来写到buy_body。

然后点击自动合成，观看视频，看完后返回。抓取url，https://android-api.lucklyworld.com/api/privilege/combine/opened?uid=xxx&version=2.5.0，
查看headers的文本body，复制下来写到auto_combine_body。

上面两个url，随便一个查看headers，复制token，写到jqsj_token。一共3个变量。
多账号用&隔开。

'''





jqsj_token = ''
account = 1
auto_combine_body = ''
buy_body = ''
'''


=================================以下代码不懂不要随便乱动=================================


'''
uid = ''
jqsj_tokens = ''
auto_combine_bodys = ''
buy_bodys = ''

try:
    import requests
    import json,sys,os,re
    import time,datetime,random
except Exception as e:
    print(e)

requests.packages.urllib3.disable_warnings()


pwd = os.path.dirname(os.path.abspath(__file__)) + os.sep
path = pwd + "env.sh"
today = datetime.datetime.now().strftime('%Y-%m-%d')
tomorrow = (datetime.datetime.now() + datetime.timedelta(days=1)).strftime('%Y-%m-%d')
mor_time ='08:00:00.00000000'
moringtime = '{} {}'.format (today, mor_time)




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

##############      在pycharm测试ql环境用，实际用下面的代码运行      #########

# with open(path, "r+", encoding="utf-8") as f:
#     ck = f.read()
#     tokens = ck
#     if "DiDi_token" in ck:
#         r = re.compile (r'DiDi_token="(.*?)"', re.M | re.S | re.I)
#         tokens = r.findall(ck)
#         tokens = tokens[0].split ('&')
#         if len (tokens) == 1:
#             DiDi_token = tokens[0]
#             tokens = ''
#     #     print(tokens)
#     #     tokens = jqsj_token[3]
#         else:
#             DiDi_token = tokens[0]
#     printT ("已获取并使用ck环境 token")
#
# with open(path, "r+", encoding="utf-8") as f:
#     ck = f.read()
#     jqsj_token = ck
#     if "jqsj_token" in ck:
#         r = re.compile (r'jqsj_token="(.*?)"', re.M | re.S | re.I)
#         jqsj_token = r.findall (ck)
#         jqsj_token = jqsj_token[0].split('&')
#     if len(jqsj_token) == 1:
#         jqsj_token = jqsj_token[0]
#         jqsj_token = ''
#     #     print(jqsj_token)
#     #     jqsj_token = jqsj_token[3]
#     else:
#         jqsj_token = jqsj_token[0]
#     printT ("已获取并使用ck环境 jqsj_token")

########################################################################



if "jqsj_token" in os.environ:
    if "&" in os.environ["jqsj_token"]:
        jqsj_tokens = os.environ["jqsj_token"]
        jqsj_tokens = jqsj_tokens.split ('&')
        # jqsj_token = temporary[0]
        printT ("已获取并使用Env环境jqsj_tokens")
    else:
        jqsj_token = os.environ["jqsj_token"]
        printT ("已获取并使用Env环境jqsj_token")
else:
    print("检查变量jqsj_token是否已填写")

if "auto_combine_body" in os.environ:
    if "&" in os.environ["auto_combine_body"]:
        auto_combine_bodys = os.environ["auto_combine_body"]
        auto_combine_bodys = auto_combine_bodys.split ('&')
        # jqsj_token = temporary[0]
        printT ("已获取并使用Env环境auto_combine_bodys")
    else:
        auto_combine_body = os.environ["auto_combine_body"]
        printT ("已获取并使用Env环境auto_combine_body")
else:
    print("检查变量auto_combine_body是否已填写")

if "buy_body" in os.environ:
    if "&" in os.environ["auto_combine_body"]:
        buy_bodys = os.environ["auto_combine_body"]
        buy_bodys = buy_bodys.split ('&')
        # jqsj_token = temporary[0]
        printT ("已获取并使用Env环境buy_bodys")
    else:
        buy_body = os.environ["buy_body"]
        printT ("已获取并使用Env环境buy_body")
else:
    print("检查变量buy_body是否已填写")

## 获取通知服务
class msg(object):
    def __init__(self, m=''):
        self.str_msg = m
        self.message()
    def message(self):
        global msg_info
        printT(self.str_msg)
        try:
            msg_info = "{}\n{}".format(msg_info, self.str_msg)
        except:
            msg_info = "{}".format(self.str_msg)
        sys.stdout.flush()           #这代码的作用就是刷新缓冲区。
                                     # 当我们打印一些字符时，并不是调用print函数后就立即打印的。一般会先将字符送到缓冲区，然后再打印。
                                     # 这就存在一个问题，如果你想等时间间隔的打印一些字符，但由于缓冲区没满，不会打印。就需要采取一些手段。如每次打印后强行刷新缓冲区。
    def getsendNotify(self, a=0):
        if a == 0:
            a += 1
        try:
            url = 'https://gitee.com/curtinlv/Public/raw/master/sendNotify.py'
            response = requests.get(url)
            if 'curtinlv' in response.text:
                with open('sendNotify.py', "w+", encoding="utf-8") as f:
                    f.write(response.text)
            else:
                if a < 5:
                    a += 1
                    return self.getsendNotify(a)
                else:
                    pass
        except:
            if a < 5:
                a += 1
                return self.getsendNotify(a)
            else:
                pass
    def main(self):
        global send
        cur_path = os.path.abspath(os.path.dirname(__file__))
        sys.path.append(cur_path)
        if os.path.exists(cur_path + "/sendNotify.py"):
            try:
                from sendNotify import send
            except:
                self.getsendNotify()
                try:
                    from sendNotify import send
                except:
                    printT("加载通知服务失败~")
        else:
            self.getsendNotify()
            try:
                from sendNotify import send
            except:
                printT("加载通知服务失败~")
        ###################
msg().main()
nowtime = int(round(time.time() * 1000))




#合成
def auto_combine(jqsj_token,auto_combine_body):
    uid = ''.join (random.sample ('01234657890123456789', 6))  # 281474990465673
    try:
        url = f'https://android-api.lucklyworld.com/api/privilege/combine/opened?uid={uid}&version=2.5.0'
        headers = {
            "user-agent": f"com.caike.ticket/2.5.0 (Linux; U; Android 5.1.1; zh-cn) (official; 20500)",
            "Channel": "official",
            "test-encrypt": "1",
            "Content-Type": "application/octet-stream; charset=utf-8",
            "Accept-Encoding": "gzip",
            "host": "android-api.lucklyworld.com",
            "token": f"{jqsj_token}",
            "Connection":"Keep-Alive",
        }
        data = auto_combine_body
        response = requests.post (url=url, headers=headers, verify=False, data=data)  # 获取响应请求头
        if response.status_code == 200:
            msg ("【账号{0}】开启自动合成，持续5分钟".format(account))

    except Exception as e:
        print(e)
        # pass



#买
def buy(jqsj_token,auto_combine_body,buy_body):
    uid = ''.join (random.sample ('01234657890123456789', 6))  # 281474990465673
    for i in range(10):
        try:
            url = f'https://android-api.lucklyworld.com/api/index/buy?uid={uid}&version=2.5.0'
            headers = {
                "user-agent": f"com.caike.ticket/2.5.0 (Linux; U; Android 5.1.1; zh-cn) (official; 20500)",
                "Channel": "official",
                "test-encrypt": "1",
                "Accept-Encoding": "gzip",
                "host": "android-api.lucklyworld.com",
                "token":f"{jqsj_token}"
            }
            data = buy_body
            response = requests.post (url=url, headers=headers, verify=False,data=data)    #获取响应请求头
            result = response.text
            # print(result)
            time.sleep(5)
            if "errorCode" in result:
                result = response.json ()
                message = result['message']
                if "数量已满" in message:
                    print ("【账号{0}】无法购买建筑，数量已满".format (account))
                    auto_combine(jqsj_token,auto_combine_body)
                    break
            else:
                printT("【账号{0}】购买建筑成功".format(account))
        except Exception as e:
            # print(e)
            pass
    auto_combine(jqsj_token,auto_combine_body)







if __name__ == '__main__':

    print("============脚本只支持青龙新版=============\n")
    print("具体教程以文本模式打开文件，查看顶部教程\n\n")
    print("============奖券世界自动任务脚本==============")
    if jqsj_token != '':
        # imei = ''.join (random.sample ('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 32))
        buy(jqsj_token,auto_combine_body,buy_body)


    elif jqsj_tokens != '':
        for i,j,k in zip(jqsj_tokens,auto_combine_bodys,buy_bodys):             #同时遍历两个list，需要用ZIP打包
            # imei = ''.join (random.sample ('123456789abcdef123456789abcdef123456789abcdef123456789abcdef', 32))
            buy(i,j,k)
            account += 1
    else:
        print ("检查变量jqsj_token是否已填写")

    if "合成" in msg_info:
        send("奖券世界自动任务", msg_info)
    # elif "过期" in msg_info:
    #     send("奖券世界自动任务", msg_info)