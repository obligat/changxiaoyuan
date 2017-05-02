// pages/feedback/feedback.js
var app = getApp()
Page({
  data: {
    inputValue: ''
  },
  bindFormSubmit: function (e) {
    console.log(e)
    console.log(this.wetoast)
    if (this.data.inputValue) {
      this.wetoast.toast({
        title: '反馈成功',
        duration: 2000
      })
    }
  },
  bindInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  onLoad: function (options) {
    new app.WeToast()
  },
  onReady: function () {

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