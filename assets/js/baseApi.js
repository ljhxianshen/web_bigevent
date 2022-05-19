//每次调用$.get(),$.post().$.ajax()函数时 
// 会先调用ajaxPrefilter函数，在这函数中我们能拿到
// 我们给ajax发的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    // console.log(options.url);
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
            Authorization:localStorage.getItem('token')||''
        }
    }
    options.complete=function(res){

        // console.log(res);
        //在complete回调函数中 会使用res.responseJSON拿到服务器响应的数据
        if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
        //强制清空token
        localStorage.removeItem('token')
        //强制跳转登录页面
        location.href='/login.html'
        }
    }
})