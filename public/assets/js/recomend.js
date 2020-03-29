// 这是一个公共区域，所以需要
$.ajax({
  type: 'get',
  url: '/posts/recommend',
  success: function (response) {
    // console.log(response);
    var recommendTpl = `
    {{each data}}
            <li>
            <a href="detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
    {{/each}}
    `;
    var html = template.render(recommendTpl, { data: response })
    // console.log(html);
    $('#recommendBox').html(html)

  }
})