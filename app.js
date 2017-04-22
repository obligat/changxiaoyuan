//app.js
App({
  onLaunch: function () {
    var that = this
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    wx.getSystemInfo({
      success: function (res) {
        that.globalData.modelMessage = res
        console.log(that.globalData.modelMessage)
      }
    })

    // wx.login({
    //   success: function (res) {
    //     if (res.code) {
    //       wx.request({
    //         url: 'https://wwwxinle.cn/wechatapp/get_session.php',
    //         data: {
    //           code: res.code
    //         },
    //         method: 'POST',
    //         header: {
    //           "content-type": "application/x-www-form-urlencoded"
    //         },
    //         success: function (res) {
    //           wx.setStorageSync('session_3rd', res.data.session_3rd)
    //           console.log('now request session_3rd is  ' + wx.getStorageSync('session_3rd'))
    //         },
    //         fail: function (res) {
    //           console.log('request session_3rd failed.')
    //         },
    //         complete: function (res) {

    //         }
    //       })
    //     }
    //   },
    //   fail: function (res) {
    //     // fail
    //   },
    //   complete: function (res) {
    //     // complete
    //   }
    // })

    wx.checkSession({
      success: function () {
        console.log('checkSession is valid.')

      },
      fail: function () {
        console.log('checkSession is not valid.')
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
          },
          fail: function (res) {
            // fail
          },
          complete: function (res) {
            // complete
          }
        })
      }
    })

  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    modelMessage: ''
  }
})