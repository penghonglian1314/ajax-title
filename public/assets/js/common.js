$('#logout').on('click', function () {
  var ifConfirm = confirm('您真的要退出吗？')
  // confirm方法的返回值
  if (ifConfirm) {
    $.ajax({
      type: "post",
      url: '/logout',
      success: function () {
        location.href = 'login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
})
function formateData(date) {
  date = new Date(date)
  return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + (date.getDate())
}

// $.ajax({
//   type: 'get',
//   url: '/login/status',
//   success: function (response) {
//     console.log(response);

//   }
// })

// $.ajax({
//   type: 'get',
//   url: '/users/' + userId,
//   success: function (response) {
//     // console.log(response);
//     $('.avatar').attr('src', response.avatar)
//     $('.profile .name').html(response.nickName)

//   }
// })

