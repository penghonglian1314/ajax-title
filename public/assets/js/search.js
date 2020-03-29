var key = getUrlParams('key')
$.ajax({
  type: 'get',
  url: '/posts/search/' + key,
  success: function (response) {
    console.log(response);
    var html = template('searchTpl', { data: response })
    $('#searchBox').html(html)
    $('#categoryTitle').html(response.title)
  }
})
