//每次调用$.get(),$.post().$.ajax()函数时 
// 会先调用ajaxPrefilter函数，在这函数中我们能拿到
// 我们给ajax发的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
    console.log(options.url);
})