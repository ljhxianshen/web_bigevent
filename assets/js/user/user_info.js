$(function(){
    var form=layui.form
    form.verify({})
    nickname=function(value){
        if(value.length>6){
            return '昵称长度必须在1~6个之间'
        }
    }
    initUserInfo()
    //初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('获取用户信息失败!')
                }
                console.log(res);
                // 调用formUserInfo给表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    $('#btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    //监听表单提交的数据
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户数据失败!')
                }
                layer.msg('更新用户数据成功')
                window.parents.getUserInfo()
            }
        })
    })
})