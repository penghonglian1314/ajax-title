// 当表单发生提交行为的时候，阻止表单的默认提交行为
$('#userForm').on('submit', function () {
  // 获取用户在表单中输入的内容，并且将内容格式化为参数字符串
  var formData = $(this).serialize();
  $.ajax({
    type: 'post',
    url: '/users',
    data: formData,
    success: function () {
      // 页面刷新，说明添加成功了
      location.reload();
    },
    error: function () {
      alert('添加用户失败')
    }

  })
  // 阻止表单默认提交行为
  return false

})
// 
$('#avatar').on('change', function () {
  // 存储在来一个列表中
  // console.log(this.files[0]);
  var formData = new FormData()
  // 当图片上传成功之后，返回的地址，就是第一个参数
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    // 告诉$ajax方法不要解析请求参数，因为现在是上传文件
    processData: false,
    // 不设置请求参数的类型
    contentType: false,
    success: function (response) {
      console.log(response);
      // 实现头像预览功能
      $('#preview').attr('src', response[0].avatar)
      // 将图片地址存储在浏览器中，最后提交到服务器里面
      $('#hiddenAvatar').val(response[0].avatar)
    }
  })
})
$('#modifyBox').on('change', '#avatar', function () {
  var formData = new FormData()
  formData.append('avatar', this.files[0])
  $.ajax({
    type: 'post',
    url: '/upload',
    data: formData,
    // 告诉$ajax方法不要解析请求参数，因为现在是上传文件
    processData: false,
    // 不设置请求参数的类型
    contentType: false,
    success: function (response) {
      // console.log(response);
      // 实现头像预览功能
      $('#preview').attr('src', response[0].avatar)
      // 将图片地址存储在浏览器中，最后提交到服务器里面
      $('#hiddenAvatar').val(response[0].avatar)
    }
  })
});
// 向服务器端发送请求，索要用户列表信息，使用模板引擎来实现
$.ajax({
  type: 'get',
  url: '/users',
  success: function (response) {
    // console.log(response);
    var html = template('userTpl', { data: response })
    // console.log(html);
    $('#userBox').html(html)

  }
})
$('#userBox').on('click', '.edit', function () {
  var id = $(this).attr('data-id')
  // console.log(id);
  $.ajax({
    type: 'get',
    url: '/users/' + id,
    success: function (response) {
      // console.log(response);
      var html = template('modifyTpl', response)
      // console.log(html);
      $('#modifyBox').html(html);


    }
  })

})
$('#modifyBox').on('submit', '#modifyForm', function () {
  var formData = $(this).serialize();
  // console.log(formData);
  var id = $(this).attr('data-id')
  $.ajax({
    type: 'put',
    url: '/users/' + id,
    data: formData,
    success: function (response) {
      // console.log(response);
      location.reload()
      // var html = template('userTpl', response)
    }
  })
  return false
})
$('#userBox').on('click', '.delete', function () {
  if (confirm('您真的要删除用户吗')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete',
      url: '/users/' + id,
      success: function () {
        location.reload()
      }
    })
  }
})

var selectAll = $('#selectAll')
var deleteMany = $('#deleteMany')
selectAll.on('change', function () {
  // 用prop来获取checked属性
  var status = $(this).prop('checked');
  // console.log(status);
  // alert(status)
  $("#userBox").find('input').prop('checked', status)
  if (status) {
    deleteMany.show()
  }
  else {
    deleteMany.hide()
  }

})
$("#userBox").on('change', '.userStatus', function () {
  // 获取到所有用户，在所有的用户中过滤选中的用户，若选中的用户域所有用户相等，总复选框也要被选上
  var inputs = $('#userBox').find('input')
  // var selectAll = document.querySelector('#selectAll')
  if (inputs.length == inputs.filter(':checked').length) {
    selectAll.prop('checked', true)
  }
  else {
    selectAll.prop('checked', false)
  }
  // 选中的复选框大于0就说明要显示复选框
  if (inputs.filter(':checked').length > 0) {
    deleteMany.show()
  } else {
    deleteMany.hide()
  }
  $.ajax({
    type: 'delete',
    url: '/users/:id',
    success: function () {

    }
  })
})

deleteMany.on('click', function () {
  var ids = [];
  var checkedUser = $('#userBox').find('input').filter(':checked');
  // 循环复选框，从复选框中获取data-id
  checkedUser.each(function (index, element) {
    ids.push($(element).attr('data-id'));
  })
  if (confirm('您真的确定要进行批量删除操作吗')) {
    $.ajax({
      type: 'delete',
      url: '/users/' + ids.join('-'),
      success: function () {
        location.reload()
      }
    })
  }
})



