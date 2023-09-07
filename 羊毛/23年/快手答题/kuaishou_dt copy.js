

let opt = ['中国', '塞拉利昂', '毛里求斯', '津巴布韦']

let res4 = '正确答案是 "中国}'



function getJsonStr(jsonString) {
    const regex = /"answer".*:.*"(.*)"/gm
    const match = jsonString.match(regex)

    if (match) {
        const answer = match[0]
        // console.log(answer); // 输出: 中国
        return `{${answer}}`
    } else {
        console.log("未找到匹配的内容")
        return false
    }
}

try {
    if (getJsonStr(res4)) {
        let aa = JSON.parse(getJsonStr(res4))
        // console.log(aa)
        let answer = aa.answer
        if (opt.includes(answer)) {
            let answer_index = opt.indexOf(answer)
            // console.log(index)
            console.log(`gpt 选择答案: 本次选择 ${answer_index}--${answer}`)
            console.log({ 'index': answer_index, 'answer': answer })
            return { 'index': answer_index, 'answer': answer }
        } else {
            let b = $.randomInt(0, 3)
            console.log(`gpt 不行了 开始随机答案: 本次选择${b}`)
            return { 'index': b, 'answer': opt[b] }
        }

    } else {
        for (let option of opt) {
            function checkOptionExistence(option, string) {
                return string.includes(option)
            }
            let optionExists = checkOptionExistence(option, res4)
            if (optionExists) {
                let answer = option
                let answer_index = opt.indexOf(answer)
                console.log(`gpt 选择答案: 本次选择 ${answer_index}--${answer}`)
                console.log({ 'index': answer_index, 'answer': answer })
                return { 'index': answer_index, 'answer': answer }

            } else {
                // let b = $.randomInt(0, 3)
                console.log(`gpt 不行了 --2 开始随机答案: 本次选择`)
                // return { 'index': b, 'answer': opt[b] }
            }

        }
    }

} catch (error) {
    console.log('11', error)

}








function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}