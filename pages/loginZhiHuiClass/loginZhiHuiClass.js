// pages/loginZhiHuiClass/loginZhiHuiClass.js
var app = getApp()
Page({
  data: {
    username: '',
    password: '',
    hasUsernameInput: false,
    hasPasswordInput: false,
    errorMsg: ''
  },
  formSubmit: function (e) {
    console.log(e)
    var that = this
    wx.request({
      url: 'https://wwwxinle.cn/wechatapp/register.php',
      data: {
        id: e.detail.value.username,
        password: e.detail.value.password,
        session_3rd: wx.getStorageSync('session_3rd')
      },
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res)
        if (res.data.res == "绑定成功") {

          wx.showToast({
            title: '绑定成功',
            icon: 'success',
            duration: 2000
          })
          wx.setStorageSync('username', e.detail.value.username)

          setTimeout(function () {
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
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

        } if (res.data.mid_res == "学号或密码错误") {
          that.setData({
            errorMsg: res.data.mid_res
          })
        } if (res.data.res == "绑定失败") {
          wx.showToast({
            title: '绑定失败',
            duration: 2000
          })
        }
      }
    })
  },

  bindUsernameInput: function (e) {
    this.setData({
      username: e.detail.value,
      hasUsernameInput: true,
      errorMsg: ''
    })
    if (e.detail.value == '') {
      this.setData({
        hasUsernameInput: false
      })
    }
  },

  bindPasswordInput: function (e) {
    this.setData({
      password: e.detail.value,
      hasPasswordInput: true,
      errorMsg: ''
    })
    if (e.detail.value == '') {
      this.setData({
        hasPasswordInput: false
      })
    }
  },

  clearUsernameInput: function (e) {
    this.setData({
      username: '',
      hasUsernameInput: false,
      errorMsg: ''
    })
  },

  clearPasswordInput: function (e) {
    this.setData({
      password: '',
      hasPasswordInput: false,
      errorMsg: ''
    })
  },

  onLoad: function () {
    console.log(this.data)

  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    console.log('loginZhiHuiClass app.globalData.isBindAccount : ' + app.globalData.isBindAccount)
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})