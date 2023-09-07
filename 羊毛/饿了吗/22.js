let a = `%7B%22authorizationRequest%22%3A%22%7B%5C%22utdid%5C%22%3A%5C%22Y42%2B4F1cueIDAEdAXbkehql4%5C%22%2C%5C%22useLiteProcess%5C%22%3A%5C%22true%5C%22%2C%5C%22localSite%5C%22%3A%5C%22alipay%5C%22%2C%5C%22scene%5C%22%3A%5C%22alipay_client_login%5C%22%2C%5C%22locale%5C%22%3A%5C%22zh_CN%5C%22%2C%5C%22sdkTraceId%5C%22%3A%5C%22login1693531832%5C%22%2C%5C%22appName%5C%22%3A%5C%2223086819%5C%22%2C%5C%22userToken%5C%22%3A%5C%22CN-SPLIT-ARCIDiIDVUNDMgEBOL2E9PKkMUABShAeXrb0Qb_r-TYlHNAMcJb8QdH1mIm-cp1Kn3TFgHra01nhfSs%5C%22%2C%5C%22appVersion%5C%22%3A%5C%2210.5.16%5C%22%2C%5C%22targetSite%5C%22%3A%5C%22taobao%5C%22%2C%5C%22sdkVersion%5C%22%3A%5C%22iOS_3.0.12.0%5C%22%2C%5C%22miniAppId%5C%22%3A%5C%222021001110676437%5C%22%7D%22%2C%22riskControlInfo%22%3A%22%7B%5C%22wua%5C%22%3A%5C%22UF20_LzzPQ4xUwssmO7hmqRPqcTB0jPw2N1ksrgwShihCjwn8o%5C%5C%5C%2FViMed1XL3A4tdMfxYfqcq1AoM5H%2BqnR%2Bvp%2BaRk3rM6%2BEowlKXn5WrcX8Pj%5C%5C%5C%2FNdgj1kRkINLiD9pit1lCARX5FwvmrNCouXOtcQRomdfgU6vM1G6NqV7Ou4AO0ejjrw0tYJH%5C%5C%5C%2FUwkzCIOct0NNrjd4Dr0dUbbcK8BalfitR3parfOdA7Z2nIBkqVk8kmFQrN1TVxPd0BgViHxZfw%5C%5C%5C%2FL6ZmpcC4kaJ%2BVbQrZtFizfS%2Bkg%3D%3D%5C%22%2C%5C%22umidToken%5C%22%3A%5C%22FdtLaLtLOpzjwDUAADe%5C%5C%5C%2FGx3CAAAgnzEe%5C%22%2C%5C%22deviceModel%5C%22%3A%5C%22iPhone14%2C2%5C%22%2C%5C%22apdId%5C%22%3A%5C%22FdtLaLtLOpzjwDUAADe%5C%5C%5C%2FGx3CAAAgnzEe%5C%22%2C%5C%22t%5C%22%3A%5C%221693531832977%5C%22%7D%22%7D`


let b = decodeURIComponent(a)
console.log(`======== b =========\n${b}`)
console.log(typeof b)


let d = `{"authorizationRequest":"{\\"utdid\\":\\"Y42+4F1cueIDAEdAXbkehql4\\",\\"useLiteProcess\\":\\"true\\",\\"localSite\\":\\"alipay\\",\\"scene\\":\\"alipay_client_login\\",\\"locale\\":\\"zh_CN\\",\\"sdkTraceId\\":\\"login1693531832\\",\\"appName\\":\\"23086819\\",\\"userToken\\":\\"CN-SPLIT-ARCIDiIDVUNDMgEBOL2E9PKkMUABShAeXrb0Qb_r-TYlHNAMcJb8QdH1mIm-cp1Kn3TFgHra01nhfSs\\",\\"appVersion\\":\\"10.5.16\\",\\"targetSite\\":\\"taobao\\",\\"sdkVersion\\":\\"iOS_3.0.12.0\\",\\"miniAppId\\":\\"2021001110676437\\"}","riskControlInfo":"{\\"wua\\":\\"UF20_LzzPQ4xUwssmO7hmqRPqcTB0jPw2N1ksrgwShihCjwn8o\\\\\\/ViMed1XL3A4tdMfxYfqcq1AoM5H+qnR+vp+aRk3rM6+EowlKXn5WrcX8Pj\\\\\\/Ndgj1kRkINLiD9pit1lCARX5FwvmrNCouXOtcQRomdfgU6vM1G6NqV7Ou4AO0ejjrw0tYJH\\\\\\/UwkzCIOct0NNrjd4Dr0dUbbcK8BalfitR3parfOdA7Z2nIBkqVk8kmFQrN1TVxPd0BgViHxZfw\\\\\\/L6ZmpcC4kaJ+VbQrZtFizfS+kg==\\",\\"umidToken\\":\\"FdtLaLtLOpzjwDUAADe\\\\\\/Gx3CAAAgnzEe\\",\\"deviceModel\\":\\"iPhone14,2\\",\\"apdId\\":\\"FdtLaLtLOpzjwDUAADe\\\\\\/Gx3CAAAgnzEe\\",\\"t\\":\\"1693531832977\\"}"}`


console.log(`======== d =========\n${d}`)




console.log(b == d)