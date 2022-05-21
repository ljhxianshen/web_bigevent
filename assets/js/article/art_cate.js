$(function () {
  //获取文章分类的列表
  var layer = layui.layer;
  var form = layui.form;
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var htmlStr = template("tpl-table", res);
        $("tbody").html(htmlStr);
      },
    });
  }
  //点击添加文章分类
  var indexAdd = null;
  $("#btnAddCate").on("click", function () {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#add-cate").html(),
    });
  });
  // 因为add-form是动态添加的，需要给body委托事件

  $("body").on("submit", "#add-form", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("添加数据失败");
        }
        initArtCateList();
        layer.close(indexAdd);
        layer.msg("添加数据成功");
      },
    });
  });

  // 给编辑按钮添加编辑事件
  var indexEdit = null;
  // 通过代理的形式 给btn-edit绑定点击事件
  $("tbody").on("click", "#btn-edit", function () {
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#edit-cate").html(),
    });
    var id = $(this).attr("data-id");
    //   发起请求获取参数
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val("form-edit", res.data);
      },
    });
  });
  //    通过代理的形式  给修改分类的表单绑定submit事件
  $("body").on("submit", "#edit-form", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("更新数据失败");
        }
        layer.msg("更新数据成功！");
        layer.close(indexEdit);
        initArtCateList();
      },
    });
  });
  //通过代理的形式  给删除表单按钮绑定删除事件

  $("tbody").on("click", "#btn-delete", function (e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    layer.confirm("确认删除?", { icon: 3, title: "提示" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/deletecate/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg("删除分类失败");
          }
          layer.msg("删除分类成功");
          layer.close(index);
          initArtCateList();
        },
      });
    });
  });
});
