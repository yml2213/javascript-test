var request = require('request')


function a(id) {
    var options = {
        'method': 'POST',
        'url': 'https://apph5.manmanbuy.com/renwu/index.aspx',
        'headers': {
            'X-Requested-With': 'XMLHttpRequest',
            'Cookie': '60014_mmbuser=CgBWAA8ADGhSDVMEAAwBVFEPAQNUBFMODVFXVlUNDwhWVFUNUwgADg%3d%3d; log-uid=0721a02e84304e64b059035ec289af95; ASP.NET_SessionId=xtaloyyb3sw0oyu2ajeyb5ys; Hm_lvt_6ec3897e953d5d9e4b44b232cac821b9=1676438179; Hm_lpvt_6ec3897e953d5d9e4b44b232cac821b9=1676700402',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        form: {
            'action': 'get_jifen',
            'username': 'mob_4543015QQ',
            'taskId': id,
            'isAjaxInvoke': 'true'
        }
    }
    request(options, function (error, response) {
        if (error) throw new Error(error)
        // console.log(response.body)
        if (response.body.code == 1) {
            console.log(response.body)

        }
    })
}

for (let index = 0; index < 100; index++) {
    a(index)
}