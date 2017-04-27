// pages/bookDetail/bookDetail.js
var util = require('../../utils/util')
Page({
  data: {
    summary: "编辑推荐:\n“软件开发视频大讲堂”丛书系清华社“视频大讲堂”重点大系之一。该大系包括多个子系列，每个子系列的图书在其同品种的图书中销售名列前茅，其中：\n4个品种荣获“全行业优秀畅销品种”\n1个品种荣获2012年清华大学出版社“专业畅销书”一等奖\n绝大多数品种在“全国计算机零售图书排行榜”同品种排行中名列前茅\n截至目前该大系累计销售超过130万册\n该大系已成为近年来清华社计算机专业基础类零售图书*畅销的品牌之一\n内容简介：\n本书从初学者角度出发，通过通俗易懂的语言、丰富多彩的实例，详细介绍了使用Java语言进行程序开发需要掌握的知识。书中所有知识都结合具体实例进行介绍，涉及的程序代码给出了详细的注释，可以使读者轻松领会Java程序开发的精髓，快速提高开发技能。"
  },
  onLoad: function (options) {
    var summary = this.data.summary.split('\n')
    var shuku = util.judgeShuKu(options.searchId)
    this.setData({
      bookDetail: options,
      summary: summary,
      shuku: shuku
    })

  }
})