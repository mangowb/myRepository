$(function () {
    //模块切换
    $('#signIn').on("click", () => {
        $('.container').removeClass("right-panel-active");
        createCode(4);
    });

    $('#signUp').on("click", () => {
        $('.container').addClass("right-panel-active");
        createCode(4);
    });

    //页面加载时，生成随机验证码
    createCode(4);
    //生成验证码的方法
    var code = "";
    function createCode(length) {
        code = "";
        var codeLength = parseInt(length); //验证码的长度
        //所有候选组成验证码的字符，当然也可以用中文的
        var codeChars = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
        //循环组成验证码的字符串
        for (var i = 0; i < codeLength; i++) {
            //获取随机验证码下标
            var charNum = Math.floor(Math.random() * 35);
            //组合成指定字符验证码
            code += codeChars[charNum];
        }
        //将生成验证码赋值到显示区
        document.getElementById("checkCode").innerHTML = code;
    }
    // 验证验证码是否正确
    function validate() {
        var inputCode = document.getElementById("inputCode").value.toUpperCase();
        if (inputCode.length <= 0) {
            layer.msg("请输入验证码！");
            return false;
        }
        else if (inputCode != code) {
            layer.msg("请输入正确的验证码!");
            createCode(4);
            return false;
        }
        return true;
    }

    // 从 layui 中获取 form 对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位,且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可

            var pwd = $('#form1 [name="password"]').val();
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form1').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        // 2. 发起Ajax的POST请求
        var data = { nickname: $('#form1 [name=nickname]').val(), phone: $('#form1 [name=phone]').val(), password: $('#form1 [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录！')
        })
    })

    // 监听登录表单的提交事件
    $('#form2').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault();
        if (validate() === true) {
            // 2. 发起Ajax的POST请求
            var data = { phone: $('#form2 [name=phone]').val(), password: $('#form2 [name=password]').val() }
            $.post('/api/login', data, function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                // location.href = './homePage.html?UserID='+res.body[0].UserID;
                location.href = './homePage.html';
            })
        }

    })


    // $('.form2_btn').on('click', () => {
    //     validate();
    // })

})


