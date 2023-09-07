var request = require('request')


let bd_data = `{"authorizationRequest":"{\\"utdid\\":\\"Y42+4F1cueIDAEdAXbkehql4\\",\\"useLiteProcess\\":\\"true\\",\\"localSite\\":\\"alipay\\",\\"scene\\":\\"alipay_client_login\\",\\"locale\\":\\"zh_CN\\",\\"sdkTraceId\\":\\"login1693531832\\",\\"appName\\":\\"23086819\\",\\"userToken\\":\\"CN-SPLIT-ARCIDiIDVUNDMgEBOL2E9PKkMUABShAeXrb0Qb_r-TYlHNAMcJb8QdH1mIm-cp1Kn3TFgHra01nhfSs\\",\\"appVersion\\":\\"10.5.16\\",\\"targetSite\\":\\"taobao\\",\\"sdkVersion\\":\\"iOS_3.0.12.0\\",\\"miniAppId\\":\\"2021001110676437\\"}","riskControlInfo":"{\\"wua\\":\\"UF20_LzzPQ4xUwssmO7hmqRPqcTB0jPw2N1ksrgwShihCjwn8o\\\\\\/ViMed1XL3A4tdMfxYfqcq1AoM5H+qnR+vp+aRk3rM6+EowlKXn5WrcX8Pj\\\\\\/Ndgj1kRkINLiD9pit1lCARX5FwvmrNCouXOtcQRomdfgU6vM1G6NqV7Ou4AO0ejjrw0tYJH\\\\\\/UwkzCIOct0NNrjd4Dr0dUbbcK8BalfitR3parfOdA7Z2nIBkqVk8kmFQrN1TVxPd0BgViHxZfw\\\\\\/L6ZmpcC4kaJ+VbQrZtFizfS+kg==\\",\\"umidToken\\":\\"FdtLaLtLOpzjwDUAADe\\\\\\/Gx3CAAAgnzEe\\",\\"deviceModel\\":\\"iPhone14,2\\",\\"apdId\\":\\"FdtLaLtLOpzjwDUAADe\\\\\\/Gx3CAAAgnzEe\\",\\"t\\":\\"1693531832977\\"}"}`

// console.log(encodeURIComponent(bd_data))


var options = {
    'method': 'POST',
    'url': 'https://guide-acs.m.taobao.com/gw/mtop.taobao.mloginservice.oauthlogin/1.0?rnd=7917B7954A1A538BA316C792023FA457',
    'headers': {
        'x-pv': '6.3',
        'User-Agent': 'MTOPSDK%2F1.9.3.48%20%28iOS%3B16.5.1%3BApple%3BiPhone14%2C2%29',
        'x-page-name': 'TBHomeViewController',
        'f-refer': 'mtop',
        'x-sgext': 'JAu9%2BNmrAVQa1QdC59GcUviIyIzbicyNwY%2Fbicue24zOhMuIy4jPi8meyI3IjciNyI3IjciNyI3IjduN243bjcieyI3IjduN24zbjtuM247biduM243bjciNyI3bj5zc247bhduN',
        'x-app-ver': '10.5.16',
        'x-utdid': 'Y42%2B4F1cueIDAEdAXbkehql4',
        'x-uid': '1983408518',
        'x-devid': 'Asbwnk36q1HqwjyTGI4cecWFsCHwmKEM-UXPY_8BZKxp',
        'x-mini-wua': 'iuwR5AzYxItYin6OVUcYoFuC3M8bd9gYEQ%2FSVzbCLJM9UWudr7gbX9wlTLXhY7PZzKEXuXzHy1%2Bu9WrnRY60IedR3gC7wbM2bPdhrw4WQ4VS7n5u2CSt3u2jL0dgPGvENwvL0G9%2B5yU%2B1995Y9xYez%2FlF',
        'x-sign': 'izDdOU002xAAItJAqA7HOz7PlqXw8tJC3Fk6lO6ksuEzH2b0WfZh6xx%2B0RLSQamzY57yQtBLIVM5%2BMYGcTOe9nMGcOLSUtJC0lLSQt',
        'x-appkey': '23086819',
        'x-sid': '1501d8a8541b0dd656ce00986650a413',
        'x-features': '11',
        'x-umt': 'FdtLaLtLOpzjwDUAADe%2FGx3CAAAgnzEe',
        'Accept-Language': 'zh-CN,zh-Hans;q=0.9',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'x-ttid': 'apple-iphone%40alipay_iphone_10.5.16.6000',
        'x-t': '1693535795'
      },
    body: `data=%7B%22authorizationRequest%22%3A%22%7B%5C%22locale%5C%22%3A%5C%22zh_CN%5C%22%2C%5C%22appVersion%5C%22%3A%5C%2210.5.16%5C%22%2C%5C%22useLiteProcess%5C%22%3A%5C%22true%5C%22%2C%5C%22targetSite%5C%22%3A%5C%22eleme%5C%22%2C%5C%22sdkVersion%5C%22%3A%5C%22iOS_3.0.12.0%5C%22%2C%5C%22appName%5C%22%3A%5C%2223086819%5C%22%2C%5C%22miniAppId%5C%22%3A%5C%222021001110676437%5C%22%2C%5C%22sdkTraceId%5C%22%3A%5C%22login1693535795%5C%22%2C%5C%22userToken%5C%22%3A%5C%22CN-SPLIT-ARCIDiIDVUNDMgEBOJb05fSkMUABShCUJndMU_C2a9XHId2VwDR5RsMaamt_XS3n5Ikx12AnkvL8Y6A%5C%22%2C%5C%22localSite%5C%22%3A%5C%22alipay%5C%22%2C%5C%22utdid%5C%22%3A%5C%22Y42%2B4F1cueIDAEdAXbkehql4%5C%22%7D%22%2C%22riskControlInfo%22%3A%22%7B%5C%22wua%5C%22%3A%5C%22UF20_h9T2SEcriaRJ2R5yIWGO6SIK4aiA4RfohkQJ0pK9YoIDMk2M%2BBHfD%2BPcf6LCN7CYMfR7kVwrbngH2MuuZvrioIpH60RVUx6d56G3aFBv5DiD9pB7Opastr4ywHeTwdeQoQ%5C%5C%5C%2FzRLGpwJvmBOVMWFd0knAm0t%2BtOWI5pQxxbFA8UZSWPPBBsFqIu3oWZe4SY4NP%2BW%2BPNcZ6ZYQBxnEr%2B49QiUpiWcL2C2E19I%5C%5C%5C%2F3ZM6Ayf3pw5Bopi5%2BL1AWKj9OmQMAxNDLvwWrBAvJZMmqgPsbAPiPxm8mx0%5C%5C%5C%2F4hCsRMRajwFY%3D%5C%22%2C%5C%22umidToken%5C%22%3A%5C%22FdtLaLtLOpzjwDUAADe%5C%5C%5C%2FGx3CAAAgnzEe%5C%22%2C%5C%22deviceModel%5C%22%3A%5C%22iPhone14%2C2%5C%22%2C%5C%22apdId%5C%22%3A%5C%22FdtLaLtLOpzjwDUAADe%5C%5C%5C%2FGx3CAAAgnzEe%5C%22%2C%5C%22t%5C%22%3A%5C%221693535795810%5C%22%7D%22%7D`

}

console.log(options)
request(options, function (error, response) {
    if (error) throw new Error(error)
    console.log(response.body)
})
