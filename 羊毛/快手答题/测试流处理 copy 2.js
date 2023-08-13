let a = `data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":""}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"答"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"案"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"是"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"A"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":":"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":" "}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"速"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"度"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"滑"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":"冰"}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: {"id":"chatcmpl-ogTB549sjUrIunCiEJTxnK8A","object":"chat.completion.chunk","choices":[{"delta":{"content":""}}],"created":1687070102,"model":"gpt-3.5-turbo"}

data: [DONE]`

const regex = /{"delta":{"content":"([^"]+)"/g
let matches
const result = []

while ((matches = regex.exec(a)) !== null) {
    result.push(matches[1])
}

const finalResult = result.join('')

console.log(finalResult)
