$.ajax({
  type: 'get',
  url: '/comments',
  success: function (response) {
    // console.log(response);
    var html = template('commentsTpl', response)
    // console.log(html);
    $('#commentsBox').html(html)
    var pageHtml = template('pageTpl', response)
    console.log(pageHtml);
    $('#pageBox').html(html)

  }
})

function changePage(page) {
  $.ajax({
    type: 'get',
    url: '/comments',
    data: { page: page },
    success: function (response) {
      console.log(response);
      var html = template('commentsTpl', response)
      // console.log(html);
      $('#commentsBox').html(html)
      var pageHtml = template('pageTpl', response)
      // console.log(pageHtml);
      $('#pageBox').html(html)

    }
  })
}

$('#commentsBox').on('click', '.status', function () {
  var status = $(this).attr('data-status')
  var id = $(this).attr('data-id')
  $.ajax({
    url: '/comments/' + id,
    type: 'put',
    data: {
      state: status == 0 ? 1 : 0
    }
  })
})

$('#commentsBox').on('click', 'delete', function () {
  if (confirm('您真的要删除这条评论吗？')) {
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'delete',
      url: '/comments/' + id,
      success: function () {
        location.reload()
      }
    })
  }


})