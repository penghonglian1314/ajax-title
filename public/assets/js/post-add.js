
// 根据浏览器地址栏中是否有参数来判断是添加文章操作还是修改文章的操作，因为这是一个频繁的操作，所以需要调用函数
$.ajax({
  type: 'get',
  url: '/categories',

  success: function (response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response })
    // console.log(html);
    $('#category').html(html)

  }

})

$('#feature').on('change', function () {
  // 获取管理获得到的文件
  var file = this.files[0]
  // 创建formdata实现二进制文件上传
  var formData = new FormData()
  // 第一个是上传的图片名称，这是定义的，将管理员选择到的文件传递到formdata中
  formData.append('cover', file)
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // console.log(response);
      $('#thumbnail').val(response[0].cover)

    }
  })
})

$('#addFormse').on('submit', function () {
  var formData = $(this).serialize()
  // console.log(formData);
  
  $.ajax({
    type: 'post',
    url: "/posts",
    data: formData,
    success: function () {
      alert(1)
      location.href = '/admin/posts.html'
    }
  })
  return false
})

var id = getUrlParams('id')
if (id != -1) {
  // 根据文章获取详细信息
  $.ajax({
    type: "get",
    url: '/posts/' + id,
    success: function (response) {
      // console.log(response);
      $.ajax({
        url: '/categories',
        type: 'get',
        success: function (categories) {
          response.categories = categories;
          // console.log(response)
          var html = template('modifyTpl', response)
          // console.log(html);
          $("#parentBox").html(html)
        }
      })

    }
  })
}
function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')

  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=')
    // console.log(tmp);
    if (tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1
}

$('#parentBox').on('submit', '#modifyForm', function () {
  var formData = $(this).serialize()
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',
    url: '/posts/' + id,
    data: formData,
    success: function () {
      location.href = "/admin/posts.html"

    }
  })
  return false

})