var postId = getUrlParams('id')
var review;
$.ajax({
  type: 'get',
  url: '/posts/' + postId,
  success: function (response) {
    // console.log(response);
    var html = template('postTpl', response)
    // console.log(html);
    $('#postBox').html(html)

  }
})

$('#postBox').on('click', '#like', function () {
  $.ajax({
    type: 'post',
    url: '/posts/fabulous/' + postId,
    success: function (response) {
      console.log(response);
      // alert('点赞成功，感谢您的支持')
      $('#like').html('赞' + '(' + response.meta.likes + ')')
      location.reload()

    }
  })
})

// 获取网站的配置信息
$.ajax({
  type: 'get',
  url: '/settings',
  success: function (response) {
    console.log(response);

    review = response.review
    // console.log(review);
    if (response.comment) {
      // 管理员开启了评论功能，渲染模板
      var html = template('commentTpl', { data: response })
      $('#comment').html(html)
    }

  }
})


$('#comment').on('submit', 'form', function () {
  // 组织表单的默认提交行为
  var content = $(this).find('textarea').val()
  // alert(content)
  var state;
  if (review) {
    state = 0
  } else {
    state = 1
  }
  $.ajax({
    type: 'get',
    url: '/comments',
    data: {
      content: content,
      post: postId,
      state: state
    },
    success: function (response) {
      console.log(response);

      alert('评论成功')
      location.reload()
    },
    error: function () {
      alert('评论失败')
    }

  })
  return false
})