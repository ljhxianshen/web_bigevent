$(function(){
    //点击去注册账号
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
        
    })
    //点击去登录账户
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
        
    })
    //从layui中获取form表单
    var form=layui.form
    var layer=layui.layer
    // 通过form.verity自定义正则表达式
    form.verify({
        // 自定义一个pwd校验规则
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位,且不能出现空格'
          ] ,
        //   通过形参拿到再次密码框的内容value
        repwd: function(value){
            var pwd=$('.reg-box [name=password]').val()
            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    //监听注册表单的事件
    $('#form_reg').on('submit',function(e){
        //1.阻止默认提交行为
        e.preventDefault()
        //2.发起ajax请求
        var data={username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser',data,function(res){
        if(res.status!==0){
            return layer.msg('res.message');
        }
        layer.msg('注册成功');
        $('#link_login').click()
        })
    })
    //监听登录表单的事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            //快速获取表单的值
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败');
                }
                layer.msg('登录成功')
                //将登录成功的token字符串，保存到localStorage
                localStorage.setItem('token',res.token)
                // 快速跳转到index.html主页
                location.href='/index.html'
            }
        }  
        )
    })
})