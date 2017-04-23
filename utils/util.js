function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function weixinLogin() {
  wx.login({
    success: function (res) {
      if (res.code) {
        wx.request({
          url: 'https://wwwxinle.cn/wechatapp/get_session.php',
          data: {
            code: res.code
          },
          method: 'POST',
          header: {
            "content-type": "application/x-www-form-urlencoded"
          },
          success: function (res) {
            wx.setStorageSync('session_3rd', res.data.session_3rd)
            console.log('now request session_3rd is  ' + wx.getStorageSync('session_3rd'))
          },
          fail: function (res) {
            console.log('request session_3rd failed.')
          },
          complete: function (res) {
          }
        })
      }
    }
  })
}

module.exports = {
  weixinLogin,
  formatTime: formatTime
}
