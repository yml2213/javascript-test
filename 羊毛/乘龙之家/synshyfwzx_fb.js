const zlib = require('zlib')

function decode(data) {
    const decodedData = Buffer.from(data, 'base64')
    const decompressedData = zlib.gunzipSync(decodedData).toString()
    return decompressedData
}


function encode(data) {

    const compressedData = zlib.gzipSync(data)
    const encodedData = Buffer.from(compressedData).toString('base64')
    return encodedData
}

// 示例用法
const aa = `H4sIAAAAAAAAAO1Ty4rbMBT9FznL1PgVx8ku9AEuHVoIQwulGMWS4ztJJCPJCZ4h0NIPKIWu2kW33XTR3UDp3zRD+xeV7KQTM5OsZzEr46Nzr3TOvef1BUqUwOksAYKGDwLfiXzX9d0uUrCgaOiGA38QRRr3HANWhQZRUyFhysoCdREBqYClqu6Ben4vDDU651NgbQgzzqoFL2UDZ/1eFIQD4tFB3+sRVzOAUKZAAZVoeIE6298qwYwIDuRg3TXzxrVr/RSY1O30N1lQlXNzmnJCTWV9iEbNBVsgWVIhgTN9ENqebd7ewUWxB/t2YAc7NqEKw7zuubAlZZILSbDCNmZ4XilIpb0VYEsys0cTaRxU44b5SDNHL2LLqm19vNRCYqao0LWWdTvXPsNLbFlu4PeNPmpq9PWdsR7JqRkJF6BtwPODhhWCF1T8NzrFQgAVmvv78vvmy68/7z79ffvZ6ONyT7XrGWihnTNqTzzX8Z5644cNr+2iTAWlLFkBUbneIydyNDgR2gfNexWPnp/Ee7ScwjTXEjw/cI563b6E0CWk9PBWmD4Mm0VGVz+/Xf34uvnwcXP5/siUzdqfc0YTnmWSKpOJaPciINsR5+eV/rcnwM4As2ntCWZlpudUitrFa4EryAANlSip/mFUrbiYJdscvYyfxLu3tPdSDzXJ5qXMkxs5dL11t5Va1+m5vu8Eg/C21Ibt1N7H9e7E9VRS8czov8/jXc+jWVmZZCCkSgiumgbHQuqv3/wDp97C3FwHAAA=`
let a=decode(aa)


console.log(a)



