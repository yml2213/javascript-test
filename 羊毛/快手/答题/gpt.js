let database_data = {
    "question": "1983年的《少女慈禧》是哪国/地区的电视剧？",
    "options": [
        "中国香港",
        "萨摩亚",
        "津巴布韦",
        "阿塞拜疆"
    ],
    "answer": "中国香港",
    "roundId": "2DMtUKJl4WhSPQtPk7wllzqv7UZBPuoO"
}

let answer_index = database_data.options.indexOf(database_data.answer)
let answer = database_data.answer

console.log(answer_index)
console.log(answer)



// if (opt.includes(this.answer)) {
//     this.answer_index = opt.indexOf(this.answer)
//     // console.log(index)
//     console.log(`gpt 选择答案: 本次选择 ${this.answer_index}--${this.answer}`)
//     console.log({ 'index': this.answer_index, 'answer': this.answer })
//     return { 'index': this.answer_index, 'answer': this.answer }
// } 