let res = `

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>

</title><meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0" /><meta name="apple-mobile-web-app-capable" content="yes" /><meta name="format-detection" content="telephone=no" /><link href="Styles/base.css" type="text/css" /><link href="css/font-awesome.min.css" rel="stylesheet" type="text/css" /><link href="css/bootstrap.min.css" rel="stylesheet" type="text/css" /><link href="css/bootstrap-theme.min.css" rel="stylesheet" type="text/css" /><link href="css/templatemo_style.css" rel="stylesheet" type="text/css" />
    <script src="js/jquery-3.2.1.min.js"></script>
    <style type="text/css">
        ul
        {
            width: 100%;
            margin-left: -20px;
        }
        ul li
        {
            width: 25%;
            float: left;
            margin-left: 0px;
            list-style-type: none;
            text-align: center;
        }
        img
        {
            width: 60px;
            height: 60px;
        }
        .img_100
        {
            width: 100px;
            height: 100px;
            margin-top: 50px;
        }
        a:link
        {
            color: #000000;
            text-decoration: none;
        }
        a:visited
        {
            color: #000000;
            text-decoration: none;
        }
        a:hover
        {
            color: #000000;
            text-decoration: none;
        }
        .div-left
        {
            text-align: left;
            margin-left: 2px;
            margin-right: 2px;
        }
        .btn-100
        {
            width: 99%;
            background-color: #004e98;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: #FFF;
            border-radius: 15px 15px 15px 15px;
            border: 0;
        }
    </style>
    <script type="text/javascript">
        function openLink(b) {
            var a = window.location.href;
            var s = a.indexOf("?");
            var t = a.substring(s + 1); // t就是?后面的东西了
            var link = 'http://' + window.location.host + '/' + b + '.aspx?' + t;
            //return link;
            //window.location.href(link);
            window.location.href = link;
        }
    </script>
    <script type="text/javascript">
        $(function () {
            $(document).ready(function () {
                $("#txt_x_tjyf").focus();
            });

//            $("#txt_x_tjyf").click(function () {
//                if ($("#txt_x_tjyf").val().toString() != "" && $("#txt_x_tjyf").val().toString().length == 6) {
//                    location.href = window.location.href;
//                }
//                else if ($("#txt_x_tjyf").val().toString().length == 6) {
//                    $("#txt_x_tjyf").val("").focus();
//                }
//                else {
//                    $("#txt_x_tjyf").focus();                
//                }
//            });

        })
        
    </script>
</head>
<body>
    <form method="post" action="./myWageMore.aspx?id=5a+34+46+45+37+49+69+55+30+41+6f+3d" id="form1">
<div class="aspNetHidden">
<input type="hidden" name="__VIEWSTATE" id="__VIEWSTATE" value="/wEPDwULLTE1MDQ4MDI4MDVkZA0Az1lAE4sRQCv0ctnEzyDleDNOzzX6w51km6so+Xid" />
</div>

<div class="aspNetHidden">

	<input type="hidden" name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="B566EE8C" />
	<input type="hidden" name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="/wEdAAP5smIqu5/by4OqU9qUj/33cyAkZOHjUDDp10UZc/DOIM34O/GfAV4V4n0wgFZHr3dLN4Y4ZhvETSUwX4bhyNZSnu+xJoY7YILDdT7Ai1zrHQ==" />
</div>
    <div style="width: 100%; height: 100%; text-align: center;">
        <div style="width: 100%; height: 100px; background: #004e98;">
            <span style="line-height: 65px; color: #fff; font-size: xx-large; font-weight: 100;">
                工资查询系统</span><br />
            <!--span style="line-height: 15px; color: #fff; font-size: 100%; font-weight: 100; margin-top: 0px;">
                员工编号：</span> <span style="line-height: 15px; color: #fff; font-size: 110%; font-weight: 300;
                    margin-top: 0px;">
                    <!--%=pub_x_ygbh%--></span> &nbsp;&nbsp;&nbsp;&nbsp; <span style="line-height: 15px; color: #fff;
                        font-size: 100%; font-weight: 100; margin-top: 0px;">姓名：</span> <span style="line-height: 15px;
                            color: #fff; font-size: 100%; font-weight: 300; margin-top: 0px;">
                            杨梦磊</span>
            <!--img alt="" src="images/logo.png" class="img_100" /-->
        </div>
        <div style="width: 100%; height: 80px; text-align: center;">
            <ul>
                <li><a href="javascript:openLink('myWage')">
                    <img alt="" src="images/icon2.png" /><br />
                    我的工资</a></li>
                <li><a href="javascript:openLink('perInfo')">
                    <img alt="" src="images/icon1.png" /><br />
                    个人信息</a></li>
                <li><a href="javascript:openLink('pwdEdit')">
                    <img alt="" src="images/icon4.png" /><br />
                    修改密码</a></li>
                <li><a href="clearCookie.aspx">
                    <img alt="" src="images/icon3.png" /><br />
                    安全退出</a></li>
            </ul>
        </div>
        <hr />
        <div style="width: 100%;">
            <div class="input-group">
                <input name="txt_x_tjyf" type="text" value="202308" id="txt_x_tjyf" placeholder="请输入要查询的月份，样例：201701" class="form-control" style="" />
                <span class="input-group-btn">
                    
                    
                    <input type="submit" name="Button1" value="查询" id="Button1" class="btn btn-default" />
                    <!---->
                </span>
            </div>
            <!-- /input-group -->
        </div>
        <!-- /.col-lg-6 -->
        <div style="margin-left: 5px;">
            <!--内容页-->
            <!--h2 style="margin-left: 5px; text-align: left">
                我的工资</h2-->
            <div style="width: 100%; height: 100%;overflow:auto;"">
                <table style=width: 100%; height: 100%; line-height: 150%>
        <tr style=height: 60px>
            <td colspan=4 align=center>
                <strong>月份：2023年08月</strong>
            </td>
        </tr>
        <tr><td colspan=4 align=center>&nbsp;</td></tr>
        <tr align=left>
            <td style=width: 25%;>
                岗位工资：
            </td>
            <td style=width: 25%;>
                4425.81
            </td>
            <td style=width: 25%;>
                公休日工资：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
        </tr>
        <tr><td colspan=4 align=center>&nbsp;</td></tr>
        <tr align=left>
            <td style=width: 25%;>
                岗位补贴：
            </td>
            <td style=width: 25%;>
                100.00
            </td>
            <td style=width: 25%;>
                学历补贴：
            </td>
            <td style=width: 25%;>
                130.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                技能补贴：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                区域补贴：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                全勤奖：
            </td>
            <td style=width: 25%;>
                50.00
            </td>
            <td style=width: 25%;>
                夜餐金额：
            </td>
            <td style=width: 25%;>
                80.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                加班工资：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                生活补贴：
            </td>
            <td style=width: 25%;>
                50.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                备注一：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                备注二：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
        </tr>
        <tr align=left>
            <td>
                降温费：
            </td>
            <td>
                300.00
            </td>
            <td>
               奖励金额：</td>
            <td>
                769.69</td>
        </tr>
        <tr align=left>
        <td style=width: 25%;>
                独生子女费：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                餐补：
            </td>
            <td style=width: 25%;>
                200.00
            </td>               
        </tr>
        <tr align=left>
        <td style=width: 25%;>
                项目奖励金：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                工龄补贴：
            </td>
            <td style=width: 25%;>
                0.00
            </td>               
        </tr>
        <tr><td colspan=4 align=center>&nbsp;</td></tr>
        <tr align=left>
            <td style=width: 25%;>
                卫生费（-）：
            </td>
            <td style=width: 25%;>
                15.00
            </td>
            <td style=width: 25%;>
                水电费（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                收视费（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                本月保险（-）：
            </td>
            <td style=width: 25%;>
                455.93
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                房款（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                房款利息（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                其他扣款（-）：
            </td>
            <td style=width: 25%;>
                130.00
            </td>
            <td style=width: 25%;>
                所得税（-）：</td>
            <td style=width: 25%;>
                0.00</td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                物业费（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                补交保险（-）：</td>
            <td style=width: 25%;>
                0.00</td>
        </tr>
        <tr align=left>
            <td style=width: 25%;>
                车位费（-）：
            </td>
            <td style=width: 25%;>
                0.00
            </td>
            <td style=width: 25%;>
                </td>
            <td style=width: 25%;>
                </td>
        </tr>
        <tr><td colspan=4 align=center>&nbsp;</td></tr>
        <tr align=left>
            <td style=width: 25%;>
                工资实发：
            </td>
            <td style=width: 25%;>
                5504.57
            </td>
            <td style=width: 25%;>
                &nbsp;</td>
            <td style=width: 25%;>
                &nbsp;</td>
        </tr>
        <tr style=height: 60px>
            <td colspan=4>
                <strong>注意：如对工资有疑问，请咨询所属人力资源科！</strong>
            </td>
        </tr>
    </table></div>
        </div>
    </div>
    </form>
</body>
</html>
`
const { JSDOM } = require('jsdom');
let div = `<div style="width: 100%; height: 100%;overflow:auto;">

<table style=width: 100%; height: 100%; line-height: 150%> <tr style=height: 60px> <td colspan=4 align=center> <strong>月份：2023年08月</strong> </td> </tr> <tr><td colspan=4 align=center> </td></tr> <tr align=left> <td style=width: 25%;> 岗位工资： </td> <td style=width: 25%;> 4425.81 </td> <td style=width: 25%;> 公休日工资： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr><td colspan=4 align=center> </td></tr> <tr align=left> <td style=width: 25%;> 岗位补贴： </td> <td style=width: 25%;> 100.00 </td> <td style=width: 25%;> 学历补贴： </td> <td style=width: 25%;> 130.00 </td> </tr> <tr align=left> <td style=width: 25%;> 技能补贴： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 区域补贴： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr align=left> <td style=width: 25%;> 全勤奖： </td> <td style=width: 25%;> 50.00 </td> <td style=width: 25%;> 夜餐金额： </td> <td style=width: 25%;> 80.00 </td> </tr> <tr align=left> <td style=width: 25%;> 加班工资： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 生活补贴： </td> <td style=width: 25%;> 50.00 </td> </tr> <tr align=left> <td style=width: 25%;> 备注一： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 备注二： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr align=left> <td> 降温费： </td> <td> 300.00 </td> <td> 奖励金额：</td> <td> 769.69</td> </tr> <tr align=left> <td style=width: 25%;> 独生子女费： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 餐补： </td> <td style=width: 25%;> 200.00 </td> </tr> <tr align=left> <td style=width: 25%;> 项目奖励金： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 工龄补贴： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr><td colspan=4 align=center> </td></tr> <tr align=left> <td style=width: 25%;> 卫生费（-）： </td> <td style=width: 25%;> 15.00 </td> <td style=width: 25%;> 水电费（-）： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr align=left> <td style=width: 25%;> 收视费（-）： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 本月保险（-）： </td> <td style=width: 25%;> 455.93 </td> </tr> <tr align=left> <td style=width: 25%;> 房款（-）： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 房款利息（-）： </td> <td style=width: 25%;> 0.00 </td> </tr> <tr align=left> <td style=width: 25%;> 其他扣款（-）： </td> <td style=width: 25%;> 130.00 </td> <td style=width: 25%;> 所得税（-）：</td> <td style=width: 25%;> 0.00</td> </tr> <tr align=left> <td style=width: 25%;> 物业费（-）： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> 补交保险（-）：</td> <td style=width: 25%;> 0.00</td> </tr> <tr align=left> <td style=width: 25%;> 车位费（-）： </td> <td style=width: 25%;> 0.00 </td> <td style=width: 25%;> </td> <td style=width: 25%;> </td> </tr> <tr><td colspan=4 align=center> </td></tr> <tr align=left> <td style=width: 25%;> 工资实发： </td> <td style=width: 25%;> 5504.57 </td> <td style=width: 25%;> </td> <td style=width: 25%;> </td> </tr> <tr style=height: 60px> <td colspan=4> <strong>注意：如对工资有疑问，请咨询所属人力资源科！</strong> </td> </tr> </table></div>;`

const table = document.querySelector('div table');
const rows = table.querySelectorAll('tr');
const salaryInfo = {};
rows.forEach(row => {
const cells = row.querySelectorAll('td');
if (cells.length === 4) {
const key = cells[0].textContent.trim();
const value = cells[1].textContent.trim();
salaryInfo[key] = value;
}
});
console.log(salaryInfo);
