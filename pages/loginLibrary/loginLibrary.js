// pages/loginLibrary/loginLibrary.js
Page({
  data: {
    username: '',
    password: '',
    errorMsg: ''
  },
  formSubmit(e) {
    var that = this
    var username = e.detail.value.username
    var password = e.detail.value.password
    if (!username || !password) {

    } else {
      wx.request({
        url: 'https://libapi.changxiaoyuan.com/index.php?do=user&username=' + username + '&password=' + password,
        data: {},
        method: 'GET',
        success: function (res) {
          if (res.data.msg) {
            that.setData({
              errorMsg: res.data.msg
            })
          } else if (res.data) {
            try {
              wx.setStorageSync('libInfo', {
                username: username,
                password: password
              })
            } catch (e) {
              console.log(e)
            }
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.redirectTo({
                url: '../borrow/borrow'
              })
            }, 1000)
          }
        }
      })
    }
  },
  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value,
      errorMsg: ''
    })
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value,
      errorMsg: ''
    })
  },

  clearUsernameInput: function (e) {
    this.setData({
      username: '',
      errorMsg: ''
    })
  },

  clearPasswordInput: function (e) {
    this.setData({
      password: '',
      errorMsg: ''
    })
  }
})