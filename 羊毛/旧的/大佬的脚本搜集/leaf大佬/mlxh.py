# -*- coding: utf-8 -*-
"""
美丽西湖 
刷话费

抓包p.cztv.com 域名 请求里面的sessionId 填入变量 或者文件里面
"""
import asyncio
import datetime
import hashlib
import json
import logging
import os
import random
import sys
import time
import traceback

import aiohttp
import nest_asyncio
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

SCRIPT_NAME = '美丽西湖'
# CK文件, 优先读这个, 一行一个CK, 不跑的CK在开头加#
ck_file = './mlxh_ck.txt'
# CK环境变量, 没有CK文件就读这个
ck_name = 'mlxh_cookie'

MAX_CONCURRENCY = 7  # 最大并发数
PROXY = ''  # 代理  http://192.168.1.103:8888

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(__name__)

default_max_retry = 5
default_timeout = 5
default_content_type = 'application/json'
default_UA = 'ShiGuangJiaSwift/1.1.4 (cn.shiguangjia.www; build:2; iOS 15.0.0) Alamofire/5.6.2'
user_index = 1
user_list = []
ans_dict = {}

ALL_DIGIT = '0123456789'
ALL_OCT = '01234567'
ALL_HEX = '0123456789abcdef'
ALL_ALPHABET = 'qwertyuiopasdfghjklzxcvbnm'
ppm =[15, 37]
ppr =[8003, 8004, 8008]
def json_dumps(data):
    return json.dumps(data, separators=(',', ':'), ensure_ascii=False)


def randomstr(length: int) -> str:
    randomstr = ''.join(random.choices(ALL_DIGIT + ALL_ALPHABET, k=length))
    return randomstr


def randomnum(length=6) -> int:
    randomnum = ''.join(random.choices(ALL_DIGIT, k=length))
    return randomnum

def md5(data):
    return hashlib.md5(data.encode('utf-8')).hexdigest()

def ts(length=13):
    now = time.time()
    diff = length - 10
    if diff > 0:
        for _ in range(0, diff):
            now = now * 10
    elif diff < 0:
        for _ in range(0, -diff):
            now = now // 10
    return int(now)


def get_time_str(**opt):
    ret = ''
    try:
        fmt = opt.get('fmt', '%Y-%m-%d %H:%M:%S')
        timestamp = opt.get('t', 0)
        if int(timestamp) > 0:
            t_str = str(timestamp)
            if len(t_str) == 10:
                from_time = datetime.datetime.fromtimestamp(int(timestamp))
            elif len(t_str) == 13:
                from_time = datetime.datetime.fromtimestamp(
                    int(timestamp) // 1000)
            else:
                logger.error('时间戳长度错误: {t}')
                return ret
        else:
            from_time = datetime.datetime.now()
        ret = from_time.strftime(fmt)
    except Exception as e:
        logger.error('时间格式化字符串错误: ' + e)
    return ret


def random_pattern(pattern, **opt):
    ret = ''
    char_set = opt.get('char_set', ALL_HEX)
    for c in pattern:
        if c == 'x':
            ret += random.choice(char_set).lower()
        elif c == 'X':
            ret += random.choice(char_set).upper()
        else:
            ret += c
    return ret


class HttpClass:
    def __init__(c):
        global user_index
        c.index = user_index
        user_index += 1
        c.name = ''
        c.valid = False
        c.session = aiohttp.ClientSession()

    def __del__(c):
        asyncio.run(c.session.close())

    def info(c, msg):
        logger.info(
            f"[{get_time_str()}][{SCRIPT_NAME}]账号[{c.index}]{'['+c.name+']' if c.name else ''}{msg}")

    def error(c, msg):
        logger.error(
            f"[{get_time_str()}][{SCRIPT_NAME}]账号[{c.index}]{'['+c.name+']' if c.name else ''}{msg}")

    async def http_request(c, opt):
        status_code = -1
        result = {}
        resp = None
        try:
            proxy = opt.pop('proxy', PROXY)
            method = opt.get('method', 'get')
            url = opt.get('url')
            fn = opt.get('fn', url)
            params = opt.get('params', {})
            c.pyt = c.h["Content-Type"]
            content_type = c.pyt
            headers = {
                'Content-Type': content_type,
            }
            cookie = opt.get('cookie', None)
            if cookie is not None:
                headers['Cookie'] = cookie
            opt_headers = opt.get('headers', {})

            headers.update(opt_headers)

            timeout = opt.get('timeout', default_timeout)
            max_retry = opt.get('max_retry', default_max_retry)
            data = opt.get('data', '')
            if data:
                if 'json' in content_type:
                    data = json_dumps(data)
                else:
                    if isinstance(data, dict):
                        for key in data:
                            if isinstance(data[key], dict) or isinstance(data[key], list):
                                data[key] = json_dumps(data[key])
            session = opt.get('session', c.session)
            for retry_count in range(max_retry + 1):
                try:
                    if retry_count > 0:
                        c.info(f"[{fn}]请求失败, 重试第{retry_count}次")
                    resp = await session.request(method=method, url=url, params=params, headers=headers,
                                                 data=data, timeout=timeout, proxy=proxy)
                    break
                except (asyncio.TimeoutError, aiohttp.client_exceptions.ClientConnectorError, aiohttp.client_exceptions.ServerDisconnectedError, aiohttp.client_exceptions.ClientOSError, ConnectionAbortedError):
                    if retry_count >= max_retry:
                        c.info(f"[{fn}]请求超时, 已超过最大重试次数")
                except:
                    logger.error(traceback.format_exc())
                    break
            if resp:
                status_code = resp.status
                result = await resp.text()
                if status_code != 200:
                    c.error(f"[{fn}]返回[{status_code}]{result}")
                try:
                    result = json.loads(result)
                except:
                    pass
                if not result:
                    result = {}
        except:
            logger.error(traceback.format_exc())
        finally:
            return resp, status_code, result


class UserClass(HttpClass):
    def __init__(c, ck):
        super(UserClass, c).__init__()
        c.i=ck
        c.f=0
        c.h = {
  "Host": "p.cztv.com",
  "sessionId": c.i,
  "Content-Type": "application/json",
  "Cookie": "acw_tc=dd82c02c16707378734605943e5911a5f7be067965cc3c8c2ad60f8eff",
  "Connection": "keep-alive",
  "Accept": "*/*",
  "User-Agent": "",
  "Accept-Language": "zh-Hans-CN;q=1.0, ja-CN;q=0.9",
  "Accept-Encoding": "gzip;q=1.0, compress;q=0.5"
}
    async def getUserInfo(c):
        fn = sys._getframe().f_code.co_name
        c.ts=f'{ts(13)}'
        c.md5=md5(f'556b7f514beb5d1ab1b4e11956ceae8a{c.ts}41')
        http_param = {'fn': fn,
                      'url': f'https://p.cztv.com/api/activity/social/getUserInfo',
                      'method': 'post',
                      'data': {"ts":c.ts,"sourceId":41,"md5Val":c.md5},
                      }
        c.session.headers.update(c.h)
        resp, status_code, r = await c.http_request(http_param)
        if status_code ==200:
            a =r['data']['nickName']
            await c.myPoints()
            msg =f'用户{a} '+f' 积分 {c.a}'
            c.info(msg)
            await c.addLoginPoint()

    async def myPoints(c):
        fn = sys._getframe().f_code.co_name
        c.ts=f'{ts(13)}'
        c.md5=md5(f'556b7f514beb5d1ab1b4e11956ceae8a{c.ts}41')
        http_param = {'fn': fn,
                      'url': f'https://p.cztv.com/api/activity/mall/points/myPoints',
                      'method': 'post',
                      'data': {"ts":c.ts,"sourceId":41,"md5Val":c.md5},
                      }
        c.session.headers.update(c.h)
        resp, status_code, r = await c.http_request(http_param)
        if status_code ==200:
            a,b =r['data']['integration'],r['data']['todayIntegration']
            c.a=a
            return b      

    async def addLoginPoint(c):
        fn = sys._getframe().f_code.co_name
        c.ts=f'{ts(13)}'
        c.md5=md5(f'556b7f514beb5d1ab1b4e11956ceae8a{c.ts}41')
        http_param = {'fn': fn,
                      'url': f'https://p.cztv.com/api/v1/points/addLoginPoint',
                      'method': 'post',
                      'data': {"ts":c.ts,"sourceId":41,"md5Val":c.md5},
                      }
        c.session.headers.update(c.h)
        resp, status_code, r = await c.http_request(http_param)
        if status_code ==200:
            if r['code'] ==200:
                a,b =r['data']['point'],r['data']['continuousLoginNum']
                msg=f'签到得到 {a} 已签到{b}天'
                c.info(msg)
            else:
                a =r['msg']
                c.info(a)

    async def done(c):
        for i in ppm:
            for a in range(99):
                c.action=i
                c.dataId= random.randint(200000, 340000)
                m = await c.add()
                if m is False:
                    break
                r =random.randint(15, 35)
                c.info(f'随机休息{r}秒')
                await asyncio.sleep(r)
                

        for i in ppr:
            for a in range(99):
                c.action=i
                c.dataId= random.randint(200000, 340000)
                m = await c.add()
                if m is False:
                    break
                r =random.randint(3, 5)
                c.info(f'随机休息{r}秒')
                await asyncio.sleep(r)
                
    async def add(c):
        ret = True
        fn = sys._getframe().f_code.co_name
        c.ts=ts(13)
        c.md5=md5(f'556b7f514beb5d1ab1b4e11956ceae8a{c.ts}{c.action}{c.dataId}41')
        a ={"action":c.action,"dataId":f"{c.dataId}","sourceId":41,"md5":f"{c.md5}","ts":f"{c.ts}"}
        http_param = {'fn': fn,
                      'url': f'https://p.cztv.com/api/activity/mall/points/action/add',
                      'method': 'post',
                      'data': a,
                      }
        c.session.headers.update(c.h)
        resp, status_code, r = await c.http_request(http_param)
        if status_code ==200:
            if r['code'] == '200':
                a,b =r['data']['point'],r['data']['ruleName']
                sac =await c.myPoints()
                msg=f'任务{b} 得到 {a} 今日积分{sac}'
                c.info(msg)
                c.f = 0
            else :
                c.info(f'此任务次数已达上限')
                ret = False
        return ret
                
                
    async def user_task(c):
        await c.getUserInfo()
        tasks = [c.done() for i in range(1)]
        await asyncio.gather(*tasks)
        


async def task_thread(user_config):
    while user_config['idx'] < len(user_list):
        user = user_list[user_config['idx']]
        user_config['idx'] += 1
        await user.user_task()


async def main():
    if os.path.exists(ck_file):
        with open(file=ck_file, mode='r', encoding='utf-8') as f:
            ck_str = f.read().replace('\r', '')
    else:
        ck_str = os.environ.get(ck_name, '')
    if not ck_str:
        logger.error(f"[{get_time_str()}][{SCRIPT_NAME}]没有找到ck文件或环境变量")
        return
    ck_list = ck_str.split('\n')
    global user_list
    user_list = [UserClass(ck)
                 for ck in ck_list if ck and not ck.startswith('#')]
    logger.info(
        f"[{get_time_str()}][{SCRIPT_NAME}]共找到了[{len(user_list)}]个有效CK")
    loop = asyncio.get_event_loop()
    user_config = {'idx': 0}
    task_list = [loop.create_task(task_thread(user_config))
                 for _ in range(MAX_CONCURRENCY)]
    await asyncio.gather(*task_list)


if __name__ == '__main__':
    nest_asyncio.apply()
    time_start = ts(13)
    logger.info(f'[{get_time_str()}][{SCRIPT_NAME}]开始运行')
    asyncio.run(main())
    time_end = ts(13)
    time_diff = time_end - time_start
    logger.info(
        f'[{get_time_str()}][{SCRIPT_NAME}]运行结束, 共运行了{time_diff/1000}秒\n')
