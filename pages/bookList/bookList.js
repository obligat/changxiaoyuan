// pages/bookList/bookList.js
var util = require('../../utils/util')
Page({
  data: {
    searchInput: '',
    opacity: 1,
    timeTip: '',
    isOpenDoor: false,
    isWeekDay: false,
    animationData: {},
    books: [],
    page: 0
  },
  handleKeyInput(e) {
    this.setData({
      searchInput: e.detail.value
    })
    var keyword = e.detail.value
    var that = this
    if (keyword) {
      wx.request({
        url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + encodeURIComponent(keyword),
        data: {},
        method: 'GET',
        success: function (res) {
          res.data.books.forEach(function (item) {
            item.author = util.handleComma(item.author)
            return item
          })
          that.setData({
            books: res.data.books,
            page: res.data.nowpage,
            searchInput: keyword
          })
        }
      })
    }

  },
  hiddenTip() {
    var animation = wx.createAnimation()
    animation.height(0).opacity(0).step()
    this.setData({
      animationData: animation.export()
    })
  },
  clearSearchInput() {
    this.setData({
      searchInput: ''
    })
  },
  onReachBottom() {
    var page = this.data.page + 1
    var keyword = this.data.searchInput
    var that = this
    this.setData({
      page: page
    })
    wx.request({
      url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + keyword + '&page=' + page,
      data: {},
      method: 'GET',
      success: function (res) {
        console.log('onreachbottom ====')
        console.log(res.data)
        res.data.books.forEach(function (item) {
          item.author = util.handleComma(item.author)
          return item
        })
        that.setData({
          books: that.data.books.concat(res.data.books),
          page: res.data.nowpage,
          searchInput: keyword
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
    this.setData({
      searchInput: decodeURIComponent(options.words)
    })
    wx.request({
      url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + options.words,
      data: {},
      method: 'GET',
      success: function (res) {
        res.data.books.forEach(function (item) {
          item.author = util.handleComma(item.author)
          return item
        })
        that.setData({
          books: res.data.books
        })
      }
    })
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
  }
})