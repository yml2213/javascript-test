# -*- coding: utf-8 -*-
"""
MSA

"""
import asyncio
import base64
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

SCRIPT_NAME = '车生活'
# CK文件, 优先读这个, 一行一个CK, 不跑的CK在开头加#
ck_file = './测试.txt'
# CK环境变量, 没有CK文件就读这个
ck_name = 'rxcshck'
MAX_CONCURRENCY = 23  # 最大并发数
PROXY = ''  # 代理  http://192.168.1.103:8888

logging.basicConfig(
    level=logging.INFO,
    format="%(message)s",
    datefmt="%H:%M:%S"
)
logger = logging.getLogger(__name__)
lo = print
default_max_retry = 8
default_timeout = 15
user_index = 1
user_list = []
ALL_DIGIT = '0123456789'
ALL_OCT = '01234567'
ALL_HEX = '0123456789abcdef'
ALL_ALPHABET = 'qwertyuiopasdfghjklzxcvbnm'
ALL_DLPHABET = 'QWERTYUIOPASDGFJKLMNBVCXZ'


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


def randomXstr(length: int) -> str:
    randomstr = ''.join(random.choices(ALL_DIGIT + ALL_DLPHABET, k=length))
    return randomstr


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


def b64encode(Y_str):
    encodestr = base64.b64encode(Y_str.encode('utf-8'))
    return encodestr


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

    def io(c, msg):
        logger.info(
            f"账号[{c.index}]{'['+c.name+']' if c.name else ''}{msg}")

    def er(c, msg):
        logger.error(
            f"[{SCRIPT_NAME}]账号[{c.index}]{'['+c.name+']' if c.name else ''}{msg}")

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
            if "Content-Type" in c.h:
                c.pyt = c.h["Content-Type"]
            else:
                c.pyt = 'application/x-www-form-urlencoded'
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
                        c.io(f"[{fn}]请求失败, 重试第{retry_count}次")
                    resp = await session.request(method=method, url=url, params=params, headers=headers,
                                                 data=data, timeout=timeout, proxy=proxy)
                    break
                except (asyncio.TimeoutError, aiohttp.client_exceptions.ClientConnectorError, aiohttp.client_exceptions.ServerDisconnectedError, aiohttp.client_exceptions.ClientOSError, ConnectionAbortedError):
                    if retry_count >= max_retry:
                        c.io(f"[{fn}]请求超时, 已超过最大重试次数")
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
        c.ck = ck
        c.tm = ts()
        c.sign = md5(f"{c.ck}{c.tm}nQAuszOdxUlbGkM4")
        c.h = {
            "User-Agent": 'MicroMessenger/8.0.32(0x18002038)',
            'tenantId': '619669306447261696',
            'activityId': '621950054462152705',
            'accountId': f"{c.ck}",
            'timestamp': f"{c.tm}",
            'sign': f"{c.sign}",
        }
        c.session.headers.update(c.h)

    async def pointsmall(c, w):
        fn = sys._getframe().f_code.co_name
        http_param = {'fn': fn,
                      'url': f'https://channel.cheryfs.cn/archer/activity-api/pointsmall/exchangeCard?pointsMallCardId={w}&exchangeCount=1&mallOrderInputVoStr=%7B%22person%22:%22%22,%22phone%22:%22%22,%22province%22:%22%22,%22city%22:%22%22,%22area%22:%22%22,%22address%22:%22%22,%22remark%22:%22%22%7D&channel=1&exchangeType=0&exchangeNeedPoints=188&exchangeNeedMoney=0&cardGoodsItemIds=',
                      'method': 'get',
                      'data': '',
                      }
        c.session.headers.update(c.h)
        resp, status_code, res = await c.http_request(http_param)
        print(w)
        print(c.index, datetime.datetime.now(), '\n', res, '\n')

    async def queryPointsMallCardList(c):
        fn = sys._getframe().f_code.co_name
        http_param = {'fn': fn,
                      'url': f'https://channel.cheryfs.cn/archer/activity-api/pointsmall/queryPointsMallCardList?isGroup=false',
                      'method': 'get',
                      'data': '',
                      }
        c.session.headers.update(c.h)
        resp, status_code, res = await c.http_request(http_param)
        for a in res['result']['全部']:
            print(
                f"红包ID {a['id']} 红包ID {a['cardId']} 红包{a['cardName']} 所需积分{a['exchangePointsValue']}")

    async def user_task(c):
        await c.queryPointsMallCardList()
        tasks = [c.pointsmall(647894196522340352) for i in range(5)]
        await asyncio.gather(*tasks)
        tasks = [c.pointsmall(622187928306601984) for i in range(5)]
        await asyncio.gather(*tasks)
        tasks = [c.pointsmall(622188100122075136) for i in range(5)]
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
        #
        ck_str = os.environ.get(ck_name, '9bf3adc47fc1ae7db8a223221d3f658e4465a668c9bb58696d20846af2afa283@460a5835739eba98a405f65ffab6e628ad1b46373dfb65f1472abad8a23bae41@aa4ffae231f4534365eec6af45b5897a92cb22ebb2c19833114d3474f00cfbc7@cd814b2a19879a98b8cd2cf45d72e90b086acaecfa1f26f5df07f2bdffb8f969@3ab1d25971f7a0f3241d844f00df935ff88e0ab3a48d375ac41c2025e8ce573f')
    if not ck_str:
        logger.error(f"[{SCRIPT_NAME}]没有找到ck文件或环境变量\n")
        return
    envSplitor = ['\n', '@']
    for a in envSplitor:
        if ck_str.find(a) > -1:
            splitor = a
            ck_list = ck_str.split(splitor)
            break
        else:
            ck_list = ck_str.split('\n')
    global user_list
    user_list = [UserClass(cookie) for cookie in ck_list if cookie]
    logger.info(
        f"[{SCRIPT_NAME}]共找到了[{len(user_list)}]个有效CK\n")
    loop = asyncio.get_event_loop()
    user_config = {'idx': 0}
    task_list = [loop.create_task(task_thread(user_config))
                 for _ in range(MAX_CONCURRENCY)]
    await asyncio.gather(*task_list)


if __name__ == '__main__':
    nest_asyncio.apply()
    time_start = ts(13)
    logger.info(f'[{get_time_str()}][{SCRIPT_NAME}]开始运行\n')
    asyncio.run(main())
    time_end = ts(13)
    time_diff = time_end - time_start
    logger.info(
        f'\n[{get_time_str()}][{SCRIPT_NAME}]运行结束, 共运行了{time_diff/1000}秒\n')
