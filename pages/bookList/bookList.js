// pages/bookList/bookList.js
var util = require('../../utils/util')
Page({
  data: {
    searchInput: '',
    opacity: 1,
    timeTip: '',
    isOpenDoor: false,
    isWeekDay: false
  },
  handleKeyInput(e) {
    this.setData({
      searchInput: e.detail.value
    })
    var keyword = e.detail.value
    if (keyword) {
      wx.request({
        url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + keyword,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function (res) {
          // success
          console.log(res)
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
  onLoad: function (options) {
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    var boolean = util.isOpenDoor()
    var isWeekDay = util.isWeekDay()
    if (boolean) {
      this.setData({
        isOpenDoor: true
      })
    }
    if (isWeekDay) {
      this.setData({
        isWeekDay: true
      })
    }
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})