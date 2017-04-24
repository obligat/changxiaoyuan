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

function getIntervalDays(borrowDay) {
  var today = new Date()
  var borrowDay = new Date(borrowDay)
  var todayTime = today.getTime()
  var borrowDayTime = borrowDay.getTime()
  var times = borrowDayTime - todayTime
  var days = parseInt(times / (1000 * 60 * 60 * 24)) + 1
  return days
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

function isSessionValid() {

  wx.request({
    url: 'https://wwwxinle.cn/wechatapp/register.php',
    data: {
      session_3rd: wx.getStorageSync('session_3rd')
    },
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      // success
      if (res.data.res == 'session已过期') {
        weixinLogin()
      }
    },
    fail: function (res) {
      // fail
    },
    complete: function (res) {
      // complete
    }
  })
}

module.exports = {
  getIntervalDays,
  weixinLogin,
  isSessionValid,
  formatTime: formatTime
}
