$(function () {
  var layer = layui.layer;
    var form=layui.form
    var laypage = layui.laypage;
  // 定义时间过滤器
  template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date);
    var y = padZero(dt.getFullYear());
    var m = padZero(dt.getMonth()+1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  function padZero(n) {
    return n < 10 ? "0" + n : n;
  }
  var q = {
    pagenum: 1, //页码值
    pagesize: 2, //每页显示多少数据
    cate_id: "", //文章分类的ID
    state: "", //文章的状态
  };
  //
  initTable();
  initCate()
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        // 使用模板引擎调用数据
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
        renderPage(res.total)
        layer.msg("获取文章列表成功");
      },
    });
  }
  
  //初始化分类文章的方法
  function initCate(){
      $.ajax({
          method:'GET',
          url:'/my/article/cates',
          success:function(res){
            if(res.status!==0){
                return layer.msg('获取分类文章失败')
            }
            layer.msg('获取分类文章成功')
            var htmlStr=template('tpl-cate',res)
            $('[name=cate_id]').html(htmlStr)
            //通知layui重新渲染表单
            form.render()
          }
      })
  }
  //为筛选表单绑定submit事件
  $('#form-search').on('submit',function(e){
      e.preventDefault()
      var cate_id=$('[name=cate_id]').val()
      var state=$('[name=state]').val()
      //为查询参数对象中q对应的参数赋值
      q.cate_id=cate_id
      q.state=state
      //根据最新的查询数据渲染最新的表单数据
      initTable()
  })

//   定义渲染分页的方法
function renderPage(total){
    // 调用laypage.render方法来渲染
    laypage.render({
        elem: 'pageBox',
        // 显示数据总条数
        count: total,
        // 每页显示多少条数据
        limit:q.pagesize,
        // 设置默认选中的分页
        curr:q.pagenum,
        layout:['count','limit','prev','page','next','skip'],
        limits:[2,3,5,10],
        // 分页发生的时候，触发jump回调
        jump:function(obj,first){
            q.pagenum=obj.curr
            q.pagesize=obj.limit
            //根据最新的q获取最新的数据列表，并渲染数据列表
            //首次不执行
            if(!first){
            initTable()
            }
        }
    })
        
    
}
//通过代理的形式  为删除按钮 绑定事件
$('tbody').on('click','#btn-delete',function(e){
    var len=$('#btn-delete').length
    var id=$(this).attr('data-id')
    e.preventDefault()
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
        //do something
        $.ajax({
            method:"GET",
            url:'/my/article/delete/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.msg('删除数据失败')
                }
                layer.msg('删除数据成功')
                if(len===1){
                    q.pagenum=q.pagenum===1?1:q.pagenum-1
                }
                initTable()
            }
        })
        layer.close(index);
      });
})
});
