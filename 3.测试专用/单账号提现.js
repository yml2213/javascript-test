$(function () {
    /**
     * 双击禁止选中字
     */
    $('body').attr('onselectstart', 'return false')
    $('body').attr('style', '-moz-user-select : none;')
    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
        var r = window.location.search.substr(1).match(reg)
        if (r != null) return unescape(r[2]); return null
    }
    $('#isMobile').val(GetQueryString('mobile') ? GetQueryString('mobile') : '')
    function gVerify() {
        //初始化验证码
        return verifyCode = new GVerify({
            id: "btnPicCode",
            type: "number"
        })
    }
    gVerify()
    // 验证图片二维码
    $('.rw_pic').blur(function () {

        var rwMeg = $('#picCode').val()
        var isRight = verifyCode.validate(rwMeg)
        if (isRight) {
            $('.pic-error').addClass("pic-error-show")
        } else {
            $('.pic-error').removeClass("pic-error-show")
        }
    })
    // 验证手机号
    $('.phone').blur(function () {
        var phone = $(".phone").val()
        var myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        var flag = false
        var message = ""
        // console.log(phone)
        if (phone == '') {
            message = "手机号码不能为空！"
        } else if (phone.length != 11) {
            message = "请输入有效的手机号码！"
        } else if (!myreg.test(phone)) {
            message = "请输入有效的手机号码！"
        } else {
            flag = true
        }
        if (!flag) {
            $('.phone-error').removeClass("phone-error-show")
            // console.log(12)
            //提示错误效果
            //jQuery("#phoneDiv").removeClass().addClass("ui-form-item has-error");
            //jQuery("#phoneP").html("");
            //jQuery("#phoneP").html("<i class=\"icon-error ui-margin-right10\">&nbsp;<\/i>" message);
            //jQuery("#phone").focus();
        } else {
            $('.phone-error').addClass("phone-error-show")
            // console.log(3)
            //提示正确效果
            //jQuery("#phoneDiv").removeClass().addClass("ui-form-item has-success");
            //jQuery("#phoneP").html("");
            //jQuery("#phoneP").html("<i class=\"icon-success ui-margin-right10\">&nbsp;<\/i>该手机号码可用");
        }
    })
    // 点击获取验证码
    $('.meg_btn').on('tap', function () {
        var rwMeg = $('#picCode').val()
        var isRight = verifyCode.validate(rwMeg)
        var phone = $(".phone").val()
        var myreg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        var isPhone = myreg.test(phone)
        if (!phone) {
            mui.toast('请输入手机号')
            return
        }
        if (!rwMeg) {
            mui.toast('请输入验证码')
            return
        }
        if (isRight && isPhone) {
            var phone = $(".phone").val()
            var encrypt = '陕汽重卡'
            var MD5 = md5(encrypt)
            var time = 60
            // modalLoading.change(1);
            getJson('/user/doSendLoginCode.do', {
                mobile: phone,
                encrypt: MD5
            }, function (res) {
                // modalLoading.change(-1);
                console.log(res)
                if (res.success) {
                    mui.toast('验证码发送成功...')
                    var jishi = setInterval(function () {
                        if (time == 0) {
                            clearInterval(jishi)
                            $('.meg_btn').text('获取验证码')
                        } else {
                            $('.meg_btn').text(time-- + 'S')
                        }
                    }, 1000)
                } else {
                    $('#graphic_code').attr('src', "/images/kaptcha.jpg?t=" + Math.random())
                    mui.alert(res.errorMessage)
                }
            })
        } else {
            mui.toast('图形验证码或手机号不正确')
            gVerify()
        }
    })
    // 输入密码验证
    $('#pwdOld').blur(function () {
        var reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\\|\:\;\"\'\<\>\?\,\.\/])[A-Za-z\d\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\\|\:\;\"\'\<\>\?\,\.\/]{6,12}$/
        var str = $('#pwdOld').val()
        console.log(reg.test(str), str.length)
        if (reg.test(str)) {
            $('.pwdOld-error').addClass('pwdOld-error-show')
        } else {
            $('.pwdOld-error').removeClass('pwdOld-error-show')
        }
    })
    //校验密码
    $('#pwdRe').blur(function () {
        if ($('#pwdRe').val() === $('#pwdOld').val()) {
            $('.pwdRe-error').addClass('pwdRe-error-show')
        } else {
            $('.pwdRe-error').removeClass('pwdRe-error-show')
        }
    })
    //用户协议
    $('#userLink').on('tap', function () {
        toNewPage(vars.clientRoot + '/apppage/user_function/about_us/userAgreement.html')
    })
    // 表单验证
    var pwdOldRegVal = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\\|\:\;\"\'\<\>\?\,\.\/])[A-Za-z\d\~\`\!\@\#\$\%\^\&\*\(\)\_\-\+\=\{\}\[\]\\\\|\:\;\"\'\<\>\?\,\.\/]{6,12}$/
    let falg = false
    $('#registeBtn').on('tap', function () {
        if (falg) return
        var lastReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!lastReg.test($(".phone").val())) {
            mui.toast('请输入正确手机号')
            return
        } else if (!verifyCode.validate($('#picCode').val())) {
            mui.toast('请输入正确验证码')
            return
        } else if (!$('#code').val()) {
            mui.toast('请输入正确短信验证码')
            return
        } else if (!pwdOldRegVal.test($('#pwdOld').val())) {
            mui.toast('请输入正确密码格式')
            return
        } else if (!$('#pwdRe').val()) {
            mui.toast('密码不能为空')
            return
        } else if (!$('#isMobile').val()) {
            mui.toast('邀请人手机号不能为空')
            return
        } else if (!$('#btnChb').prop('checked')) {
            mui.toast('请勾选协议')
            return
        } else {
            falg = true
            modalLoading.change(1)
            getJson('/user/doInviteRegister.do', {
                mobile: $(".phone").val(),
                code: $('#code').val(),
                pwd: $('#pwdOld').val(),
                repwd: $('#pwdRe').val(),
                inviteMobile: $('#isMobile').val()
            }, function (res) {
                modalLoading.change(-1)
                console.log(res)
                if (res.data) {
                    mui.toast('注册成功')
                    console.log(res.data)
                    toNewPage(vars.clientRoot + '/apppage/downloadPage/downloadPage.html')
                } else {
                    mui.toast('手机号已被注册！')
                }
                falg = false
            })
        }
    })
    $('#goDownload').on('tap', function () {
        toNewPage(vars.clientRoot + '/apppage/downloadPage/downloadPage.html')
    })
    // $('.rw_pic').val();
})