$(function(){
    getUserInfo()
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        // console.log('ok');
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //1.清除本地存储的token
        localStorage.removeItem('token')
            //2.跳转至登录首页
        location.href='/login.html'
        // 这是关闭询问框
        layer.close(index);
    })
})
})
function getUserInfo(){
    $.ajax({
        method:"GET",
        url:'/my/userinfo',
        //headers是请求头配置对象
        // headers:
        // {Authorization:localStorage.getItem('token')||''},
        success:function(res){
            // console.log(res);
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     console.log(res);
        //     //在complete回调函数中 会使用res.responseJSON拿到服务器响应的数据
        //     if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        //     //强制清空token
        //     localStorage.removeItem('token')
        //     //强制跳转登录页面
        //     location.href='/login.html'
        //     }
        // }
    })
}
function renderAvatar(user){
    var name=user.nickname||user.username
    $('#welcome').html('欢迎&nbsp'+name)
    if(user.user_pic!==null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.textavatar').hide()
    }
    else{
        var first=name[0].toUpperCase()
        $('.textavatar').html(first).show()
        $('.layui-nav-img').hide()
    }
}