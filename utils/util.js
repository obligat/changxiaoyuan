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

function judgeShuKu(searchId) {
  searchId = searchId.trim()
  switch (true) {
    case /^t/i.test(searchId):
      return '计算机通信书库'
    case /^[xrnso]/i.test(searchId):
      return '数理书库'
    case /^h/i.test(searchId):
      return '外文书库'
    case /^f/i.test(searchId):
      return '经济管理书库'
    case /^i/i.test(searchId):
      return '文艺书库'
    case /^[abcdegjk]/i.test(searchId):
      return '社科书库'
    default:
      return ''
  }
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

function isOpenDoor() {
  var today = new Date()
  var hour = today.getHours()
  var minute = today.getMinutes()
  var minutes = hour * 60 + minute
  var bool = isWeekDay()
  if (bool) {
    return (minutes > 840 && minutes < 1290) ? true : false
  } else {
    return (minutes > 480 && minutes < 1290) ? true : false
  }
}

function isWeekDay() {
  var day = new Date()
  var week = day.getDay()
  return (week == 0 || week == 6) ? true : false
}

function handleComma(str) {
  if (str) {
    str = str.split(',')
    while (!str[str.length - 1]) {
      str.pop()
    }
    str = str.join(' / ')
  }
  return str
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
      if (res.data.res == 'session已过期') {
        weixinLogin()
      }
    }
  })
}

module.exports = {
  judgeShuKu,
  handleComma,
  isWeekDay,
  isOpenDoor,
  getIntervalDays,
  weixinLogin,
  isSessionValid,
  formatTime: formatTime
}
