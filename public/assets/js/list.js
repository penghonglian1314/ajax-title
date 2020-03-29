var categoryId = getUrlParams('categoryId')

// 根据分类id获取文章列表
$.ajax({
  url: '/posts/category/' + categoryId,
  type: 'get',
  success: function (response) {
    // console.log(response);
    var html = template('listTpl', { data: response })
    $('#listBox').html(html)
  }
})

function formateData(date) {
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}

// 根据分类id获取分类详细信息
$.ajax({
  type: 'get',
  url: '/categories/' + categoryId,
  success: function (response) {
    // console.log(response);
    $('#categoryTitle').html(response.title)

  }
})