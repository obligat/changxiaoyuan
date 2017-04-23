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
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          console.log(res)
          if (res.data.msg) {
            that.setData({
              errorMsg: res.data.msg
            })
          } else if (res.data) {
            try {
              wx.setStorageSync('libInfo', {
                username: username,
                password: password,
                borrowInfo: res.data.data
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
                url: '../borrow/borrow',
                success: function (res) {
                  // success
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })
            }, 1000)
          }
        },
        fail: function (res) {
          // fail
          console.log('login lib fail.')
        },
        complete: function (res) {
          // complete
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
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})