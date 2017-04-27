// pages/bookList/bookList.js
var util = require('../../utils/util')
var app = getApp()
Page({
  data: {
    searchInput: '',
    opacity: 1,
    timeTip: '',
    isOpenDoor: false,
    isWeekDay: false,
    animationData: '',
    books: [],
    page: 1,
    allPages: 0,
    all: 0
  },
  handleKeyInput(e) {
    this.setData({
      searchInput: e.detail.value
    })
    var keyword = e.detail.value
    var that = this
    console.log('https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + encodeURIComponent(keyword))
    if (keyword) {
      wx.request({
        url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + encodeURIComponent(keyword),
        data: {},
        method: 'GET',
        success: function (res) {
          console.log(res)
          if (res.data.books.length) {
            res.data.books.forEach(function (item) {
              item.author = util.handleComma(item.author)
              return item
            })
            that.setData({
              books: res.data.books,
              page: res.data.nowpage,
              searchInput: keyword,
              allPages: res.data.allpage,
              all: res.data.all
            })
          }
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
    console.log(this.data.animationData)
  },
  clearSearchInput() {
    this.setData({
      searchInput: ''
    })
  },
  onReachBottom() {
    if (this.data.page < this.data.allPages) {
      wx.showLoading({
        title: 'loading...'
      })
      var page = this.data.page + 1
      var keyword = this.data.searchInput
      var that = this
      this.setData({
        page: page
      })
      wx.request({
        url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + encodeURIComponent(keyword) + '&page=' + page,
        data: {},
        method: 'GET',
        success: function (res) {
          wx.hideLoading()
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
          console.log(that.data)
        }
      })
    } else {
      this.wetoast.toast({
        title: '总共 ' + this.data.all + ' 条记录，您都看完啦',
        duration: 2000
      })
    }
  },
  onLoad: function (options) {
    console.log('ooooooooooooooo')
    console.log(this.data)
    new app.WeToast()
    wx.showLoading({
      title: 'loading...'
    })
    var that = this
    this.setData({
      searchInput: decodeURIComponent(options.words)
    })
    console.log('https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + options.words)
    wx.request({
      url: 'https://libapi.changxiaoyuan.com/index.php?do=search&keyword=' + options.words,
      data: {},
      method: 'GET',
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        if (res.data.books.length) {
          res.data.books.forEach(function (item) {
            item.author = util.handleComma(item.author)
            return item
          })
          that.setData({
            books: res.data.books,
            allPages: res.data.allpage,
            all: res.data.all
          })

        } else {
          that.wetoast.toast({
            title: '没有找到您要找的书',
            duration: 2000
          })
          that.setData({
            searchInput: ''
          })
        }
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