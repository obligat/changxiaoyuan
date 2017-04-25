//index.js
var app = getApp()
var sort = require('../../utils/sort')
Page({
  data: {
    username: wx.getStorageSync('username') || '',
    searchInput: '',
    opacity: 1,
    courseMessage: wx.getStorageSync('courseMessage') || '',
  },
  handleKeyInput(e) {
    this.setData({
      searchInput: e.detail.value
    })

    // if (this.data.searchInput) {

    //   wx.navigateTo({
    //     url: '../bookList/bookList?words=' + 'this.data.searchInput',
    //     success: function (res) {
    //       // success
    //     },
    //     fail: function (res) {
    //       // fail
    //     },
    //     complete: function (res) {
    //       // complete
    //     }
    //   })
    // }
    

  },
  handleLogin() {
    wx.navigateTo({
      url: '../loginZhiHuiClass/loginZhiHuiClass'
    })
  },
  clearSearchInput() {
    this.setData({
      searchInput: ''
    })
  },
  handleBorrow() {

    if (wx.getStorageSync('libInfo').username) {
      wx.navigateTo({
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
    } else {
      wx.navigateTo({
        url: '../loginLibrary/loginLibrary',
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
    }
  },
  onLoad: function () {
    console.log('index  onload : username: ' + this.data.username)
    console.log('index onload :courseMessage : ')
    console.log(this.data.courseMessage)
  },
  onShow() {
    if (!this.data.username && wx.getStorageSync('username')) {
      this.setData({
        username: wx.getStorageSync('username')
      })
      var that = this
      wx.request({
        url: 'https://wwwxinle.cn/wechatapp/schedule.php',
        data: {
          session_3rd: wx.getStorageSync('session_3rd')
        },
        method: 'POST',
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log(res)
          var filterResult = sort.filterByWeekNum(res.data.Obj)
          var sortResult = sort.sortByJT_NO(filterResult)
          wx.setStorageSync('courseMessage', sort.formatWeek(sortResult))
          that.setData({
            courseMessage: wx.getStorageSync('courseMessage')
          })
          console.log('index onshow----- courseMessage')
          console.log(that.data.courseMessage)
        }
      })
    } else if (this.data.username && !wx.getStorageSync('username')) {
      this.setData({
        username: ''
      })
      console.log('index onshow: ' + this.data.username)
    }
  }
})
