// pages/yellowpage/yellowpage.js
var util = require('../../utils/util')
Page({
  data: {
    searchInput: '',
    opacity: 1,
    xuriyuan: '',
    meishisquare: '',
    phoneInfo: '',
    matchedXuriyuan: [],
    matchedMeishisquare: [],
    matchedPhoneInfo: [],
    current: 1
  },
  handleKeyInput(e) {
    var input = e.detail.value
    var matchedXuriyuan = []
    var matchedMeishisquare = []
    var matchedPhoneInfo = []
    var array = []
    var college = null
    this.setData({
      searchInput: input
    })
    var pattern = new RegExp(input)
    if (input && this.data.current == 1) {
      this.data.xuriyuan.forEach(function (item) {
        if (pattern.test(item.abbr)) {
          matchedXuriyuan.push(item)
        }
      })
      this.data.meishisquare.forEach(function (item) {
        if (pattern.test(item.abbr)) {
          matchedMeishisquare.push(item)
        }
      })
    } else if (input && this.data.current == 2) {
      this.data.phoneInfo.forEach(function (item) {
        var items = []
        if (pattern.test(item.index)) {
          matchedPhoneInfo.push(item)
        }
        item.items.forEach(function (i) {
          if (pattern.test(i.index)) {
            items.push({ label: i.label, value: i.value })
            college = Object.assign({}, { title: item.title }, { items: items })
          }
        })
        if (college) {
          array.push(college)
        }
      })
      if (array.length) {
        matchedPhoneInfo = [...new Set(array)]
      }
    }
    this.setData({
      matchedXuriyuan: matchedXuriyuan,
      matchedMeishisquare: matchedMeishisquare,
      matchedPhoneInfo
    })
  },
  clearSearchInput() {
    this.setData({
      searchInput: ''
    })
  },
  handleTap1() {
    this.setData({
      current: 1,
      searchInput: ''
    })
  },
  handleTap2() {
    this.setData({
      current: 2,
      searchInput: ''
    })
  },
  onLoad: function (options) {
    var data = util.getOrderInfo()
    var phoneInfo = util.getPhoneInfo()
    this.setData({
      xuriyuan: data[0],
      meishisquare: data[1],
      phoneInfo
    })
  }
})