$.ajax({
  type: 'get',
  url: '/posts',
  success: function (response) {
    // console.log(response);
    var html = template('postsTpl', response)
    // console.log(html);
    $('#postsBox').html(html)
    var page = template('pageTpl', response)
    $('#page').html(page)
  }
})

// 处理日期格式
function formateData(date) {
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}

function changePage(page) {
  $.ajax({
    type: 'get',
    url: '/posts',
    data: {
      page: page
    },
    success: function (response) {
      console.log(response);
      var html = template('postsTpl', response)
      // console.log(html);
      $('#postsBox').html(html)
      var page = template('pageTpl', response)
      $('#page').html(page)
    }
  })
}

$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    // console.log(response);
    var html = template('categoryTpl', { data: response });
    // console.log(html);
    $('#categoryBox').html(html)
  }
})

$('#filterForm').on('submit', function () {
  // alert(1)
  var formData = $(this).serialize()
  console.log(formData);

  // 向服务器端传递请求
  $.ajax({
    type: 'get',
    url: '/posts',
    data: formData,
    success: function (response) {
      console.log(response);
      var html = template('postsTpl', response)
      // console.log(html);
      $('#postsBox').html(html)
      var page = template('pageTpl', response)
      $('#page').html(page)
    }
  })
  return false
})

$('#postsBox').on('click', '.delete', function () {
  var id = $(this).attr('data-id')
  if (confirm('您真的要进行删除操作吗？')) {
    $.ajax({
      type: 'delete',
      url: '/posts/' + id,
      success: function () {
        location.reload()
      }
    })
  }
})