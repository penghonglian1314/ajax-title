

$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function (response) {
    console.log(response);
    var randomTpl = `
    {{each data}}
          <li>
            <a href="detail.html?id={{$value._id}}">
              <p class="title">{{$value.title}}</p>
              <p class="reading">阅读({{$value.meta.views}})</p>
              <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
              </div>
            </a>
          </li>
    {{/each}}
    `
    var html = template.render(randomTpl, { data: response })
    $('#randomBox').html(html)
  }
})


$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function (response) {
    // console.log(response);
    var commentTpl = `
    {{each data}}
  <li>
    <a href="javascript:;">
      <div class="avatar">
        <img src="{{$value.avatar}}" alt="">
      </div>
      <div class="txt">
        <p>
          <span>{{$value.author.nickName}}</span>{{$imports.formateData($value.createAt)}}说:
        </p>
        <p>{{$value.content}}</p>
      </div>
    </a>
  </li>
  {{/each}}
    `

    var html = template.render(commentTpl, { data: response })
    $('#commentBox').html(html)
  }
})

function formateData(date) {
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}

$.ajax({
  type: 'get',
  url: '/categories',
  success: function (response) {
    // console.log(response);
    var navTpl = `
    {{each data}}
   <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
   `
    var html = template.render(navTpl, { data: response })
    $('#navBox').html(html)
    $('#topNavBox').html(html)
  }
})


function getUrlParams(name) {
  var paramsAry = location.search.substr(1).split('&')
  for (var i = 0; i < paramsAry.length; i++) {
    var tmp = paramsAry[i].split('=')
    if (tmp[0] == name) {
      return tmp[1]
    }
  }
  return -1
}


// 获取搜索表单，并且为表单添加事件
$('.search form').on('submit', function () {
  var keys = $(this).find('.keys').val()
  // console.log(keys);
  // 跳转到搜索结果页面，并且将用户输入的内容传递到搜索页面
  location.href = "/search.html?key=" + keys

  return false
})