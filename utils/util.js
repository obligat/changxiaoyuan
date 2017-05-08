function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function judgeShuKu(searchId) {
  searchId = searchId.trim()
  switch (true) {
    case /^t/i.test(searchId):
      return '计算机通信书库'
    case /^[xrnso]/i.test(searchId):
      return '数理书库'
    case /^h/i.test(searchId):
      return '外文书库'
    case /^f/i.test(searchId):
      return '经济管理书库'
    case /^i/i.test(searchId):
      return '文艺书库'
    case /^[abcdegjk]/i.test(searchId):
      return '社科书库'
    default:
      return ''
  }
}

function getIntervalDays(borrowDay) {
  var today = new Date()
  var borrowDay = new Date(borrowDay)
  var todayTime = today.getTime()
  var borrowDayTime = borrowDay.getTime()
  var times = borrowDayTime - todayTime
  var days = parseInt(times / (1000 * 60 * 60 * 24)) + 1
  return days
}

function isOpenDoor() {
  var today = new Date()
  var hour = today.getHours()
  var minute = today.getMinutes()
  var minutes = hour * 60 + minute
  var bool = isWeekDay()
  if (bool) {
    return (minutes > 840 && minutes < 1290) ? true : false
  } else {
    return (minutes > 480 && minutes < 1290) ? true : false
  }
}

function isWeekDay() {
  var day = new Date()
  var week = day.getDay()
  return (week == 0 || week == 6) ? true : false
}

function handleComma(str) {
  if (str) {
    str = str.split(',')
    while (!str[str.length - 1]) {
      str.pop()
    }
    str = str.join(' / ')
  }
  return str
}

function weixinLogin() {
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
          },
          fail: function (res) {
            console.log('request session_3rd failed.')
          },
          complete: function (res) {
          }
        })
      }
    }
  })
}

function isSessionValid() {

  wx.request({
    url: 'https://wwwxinle.cn/wechatapp/register.php',
    data: {
      session_3rd: wx.getStorageSync('session_3rd')
    },
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log(res.data.res)
      if (res.data.res == 'session已过期') {
        wx.setStorageSync('courseMessage', '')
        weixinLogin()
      }
    }
  })
}

function getOrderInfo() {
  return [[{ name: '鸡汤刀削面', tel: '15891368113', abbr: 'jtdxm' }, { name: '本土农家面', tel: '15991774812', abbr: 'btnjm' }, { name: '蜀香园', tel: '18709185471', abbr: 'sxy' }, { name: '川味小炒', tel: '15594833392', weixin: '1453105640', abbr: 'cwxc' }, { name: '东兴蒸菜套餐', tel: '18191201036', abbr: 'dxzctc' }, { name: '重庆砂锅(十号楼旁边)', tel: '13468603710', abbr: 'cqsg' }, { name: '绝味冒菜', tel: '15238777089', abbr: 'jwmc' }, { name: '汉中米皮(夹馍)', tel: '13572052341', abbr: 'hzmpjm' }, { name: '罐罐面', tel: '13152199626', abbr: 'ggm' }, { name: '小馋虫烩麻食', tel: '13186023510', abbr: 'xcchms' }, { name: '胡辣汤', tel: '18192535818', abbr: 'hlt' }, { name: '南方风味饼', tel: '13637280108', abbr: 'nffwb' }, { name: '重庆小面', tel: '13891944505', abbr: 'cqxm' }, { name: '重庆砂锅(一号楼旁)', tel: '18791984854', abbr: 'cqsg' }, { name: '铁板炒饭', tel: '15891485968', abbr: 'tbcf' }, { name: '面包房(二楼)', tel: '18700941400', abbr: 'mbf' }, { name: '好再来拉面馆', tel: '18133928198', abbr: 'hzllmg' }, { name: '木桶饭', tel: '18324648898', abbr: 'mtf' }, { name: '东北快餐', tel: '15091834552', abbr: 'dbkc' }, { name: '蜀香园小炒', tel: '15291868775', abbr: 'sxyxc' }, { name: '湖南土菜馆', tel: '18629303692', abbr: 'hntcg' }, { name: '重庆鸡公煲', tel: '18710901608', abbr: 'cqjgb' }, { name: '黄焖鸡', tel: '18966898239', abbr: 'hmj' }, { name: '刘记广式快餐', tel: '13772063688', abbr: 'ljgskc' }, { name: '西府削筋面', tel: '15877656302', abbr: 'xfdxm' }, { name: '东北饺子', tel: '18092384410', abbr: 'dbjz' }, { name: '玉米粗粮面', tel: '13289291762', abbr: 'ymclm' }, { name: '重庆冒菜', tel: '18223762288', abbr: 'tddxm' }, { name: '铁蛋刀削面', tel: '15229089316', abbr: 'twjpkrbf' }, { name: '台湾鸡排烤肉拌饭', tel: '13106167758', abbr: 'twjpkrbf' }, { name: '爱尚麻辣烫香锅', tel: '18710498933', abbr: 'asmltxg' }, { name: '楞娃手擀面', tel: '13572012628', abbr: 'nwsgm' }, { name: '湘式阿Q盖浇饭', tel: '13927729685', abbr: 'xsaqgjf' }], [{ name: '云南傣家米线', tel: '1328895525', weixin: '569234179', abbr: 'yndjmx' }, { name: '川味小炒', tel: '15529050812', abbr: 'cwxc' }, { name: '金柳叶刀削面', tel: '13619293162', abbr: 'jlydxm' }, { name: '东北饺子', tel: '13720658019', abbr: 'dbjz' }, { name: '港式粥铁板炒饭', tel: '18291815322', abbr: 'gsztbcf' }, { name: '袁记肉夹馍', tel: '13892827788', abbr: 'yjrjm' }, { name: '傻得冒冒菜', tel: '13299112980', abbr: 'sdmmc' }, { name: '兄弟面屋 ', tel: '13474136133', abbr: 'xdmw' }, { name: '么么哒快餐', tel: '18966842031', abbr: 'mmdkc' }, { name: '溢香园饺子', tel: '18729305228', abbr: 'yxyjz' }, { name: '冷热麻食', tel: '18717372714', abbr: 'lrms' }, { name: '粗粮面(洋芋叉叉粗粮面)', tel: '15609232991', abbr: 'clmyyccclm' }, { name: '岐山擀面皮', tel: '18509291588', abbr: 'qsgmp' }, { name: '金马鸡汤刀削面', tel: '15339268668', abbr: 'jmjtdxm' }, { name: '食话食说快餐', tel: '13259952176', abbr: 'shsskc' }, { name: '西府削筋面(油条)', tel: '15332376980', abbr: 'xfdxm' }, { name: '安徽风味饼', tel: '13289201080', abbr: 'ahfwb' }, { name: '三月半骨汤冒菜', tel: '18240898299', abbr: 'sybgtmc' }, { name: '荆记粥铺', tel: '15891758499', abbr: 'jjzp' }, { name: '南京鸭血粉丝汤', tel: '15979110220', abbr: 'njyxfst' }, { name: '汉中热米皮砂锅', tel: '13324566360', abbr: 'hzrmpsg' }, { name: '四川舌尖道特色拉面馆', tel: '13466994320', abbr: 'scsjdtslmg' }, { name: '复盛隆凉皮', tel: '13669226943', abbr: 'fsllp' }, { name: '川渝大排档', tel: '18295928629', abbr: 'cydpd' }, { name: '炒菜 石锅拌饭 盖浇饭', tel: '18191083280', abbr: 'cssgbfgjf' }, { name: '小碗菜，瓦罐汤', tel: '18700884728', abbr: 'xwcwgt' }, { name: '兰州牛肉拉面', tel: '15398032140', abbr: 'nznrlm' }, { name: '煲仔饭', tel: '18829277763', abbr: 'bzf' }, { name: '夹拣成厨香锅', tel: '18710296710', abbr: 'jjccxg' }, { name: '缘福记小笼包', tel: '15129081363', abbr: 'yfjxlb' }]]
}

function getPhoneInfo() {
  return [
    {
      'title': '通信与信息工程学院',
      'index': 'txyxxgcxy',
      'items': [{ "label": "院长：卢光跃", "index": "lgy", "value": "电话：88166378" }, { "label": "党总支书记、副院长：王大力", "index": "wdl", "value": "电话：88166379" }, { "label": "副书记：唐黎", "index": "tl", "value": "电话：88166152" }, { "label": "副院长：刘颖", "index": "ly", "value": "电话：88166465" }, { "label": "副院长：赵小强", "index": "zxq", "value": "电话：88166380" }, { "label": "副院长：孙爱晶", "index": "saj", "value": "电话：88166380" }]
    },
    {
      'title': '电子工程学院',
      'index': 'dzgcxy',
      'items': [{ "label": "院长：巩稼民", "index": "gjm", "value": "电话：88166262" }, { "label": "党委书记兼副院长：苗忠", "index": "mz", "value": "电话：88166261" }, { "label": "副院长：刘继红", "index": "ljh", "value": "电话：88166263" }, { "label": "副院长：杜慧敏", "index": "dhm", "value": "电话：88166263" }, { "label": "副书记：李莉", "index": "ll", "value": "电话：88166470" }, { "label": "13115工程中心总工程师：李涛", "index": "lt", "value": "电话：88166785" }, { "label": "13115工程中心专职副主任：吕菱", "index": "ll", "value": "电话：88166769" }, { "label": "技术中心副主任：张博", "index": "zb", "value": "电话：88166769" }]
    },
    {
      'title': '计算机学院',
      'index': 'jsjxy',
      'items': [{ "label": "院长：王忠民", "index": "wzm", "value": "电话：88166290" }, { "label": "党委书记、副院长：葛茂", "index": "gm", "value": "电话：88166293" }, { "label": "副院长：王曙燕", "index": "wsy", "value": "电话：88166291" }, { "label": "副院长：周晓辉", "index": "zxh", "value": "电话：88166291" }, { "label": "党委副书记：田东", "index": "td", "value": "电话：88166291" }, { "label": "副院长：翟社平", "index": "zsp", "value": "电话：88166291" }]
    },
    {
      'title': '自动化学院',
      'index': 'zdhxy',
      'items': [{ "label": "院长：王文庆", "index": "wwq", "value": "电话：88166331" }, { "label": "党总支书记、副院长：马斌奇", "index": "mbq", "value": "电话：88166339" }, { "label": "副院长：袁立行", "index": "ylx", "value": "电话：88166330" }, { "label": "副院长：蔡秀梅", "index": "cxm", "value": "电话：88166598" }, { "label": "党总支副书记：卢岩", "index": "ly", "value": "电话：88166596" }]
    },
    {
      'title': '经济与管理学院',
      'index': 'jjyglxy',
      'items': [{ "label": "名誉院长：郭建峰", "index": "gjf", "value": "电话：88166759" }, { "label": "院长：张鸿", "index": "zh", "value": "电话：88166270" }, { "label": "院党委书记、副院长：樊广义", "index": "fgy", "value": "电话：88166023" }, { "label": "常务副院长：楼旭明", "index": "lxm", "value": "电话：88166277" }, { "label": "副院长：李永红", "index": "lyh", "value": "电话：88166113" }, { "label": "副院长：李鹏飞", "index": "lpf", "value": "电话：88166708" }, { "label": "院党委副书记：任辉", "index": "rh", "value": "电话：88166472" }, { "label": "院党委副书记：郭黎", "index": "gl", "value": "电话：85383162" }]
    },
    {
      'title': '理学院',
      'index': 'lxy',
      'items': [{ "label": "院长：徐建刚", "index": "xjg", "value": "电话：88166333" }, { "label": "党委书记、副院长：杨爽", "index": "ys", "value": "电话：88166650" }, { "label": "副院长：高军安", "index": "gja", "value": "电话：88166334" }, { "label": "副院长：廖延娜", "index": "lyn", "value": "电话：88166332" }]
    },
    {
      'title': '人文社科学院',
      'index': 'rwskxy',
      'items': [{ "label": "院长：张学广", "index": "zxg", "value": "电话：88166355" }, { "label": "党委书记兼副院长：王嗣源", "index": "wsy", "value": "电话：88166356" }, { "label": "副院长：王艾青", "index": "waq", "value": "电话：88166090" }]
    },
    {
      'title': '外国语学院',
      'index': 'wgyxy',
      'items': [{ "label": "院长：袁小陆", "index": "yxl", "value": "电话:88166361" }, { "label": "党总支书记、副院长：姜艳萍", "index": "jyp", "value": "电话:88166360" }, { "label": "副院长：陈德", "index": "cd", "value": "电话:88166198" }]
    },
    {
      'title': '数字艺术学院（艺术教育中心）',
      'index': 'szysxy ysjyzx',
      'items': [{ "label": "院长：马力", "index": "ml", "value": "电话：88166069" }, { "label": "院党总支书记：张涛", "index": "zt", "value": "电话：88166063" }, { "label": "副院长：闫兴亚", "index": "yxy", "value": "电话：88166124" }]
    },
    {
      'title': '继续教育学院、职业技术学院',
      'index': 'jxjyxy zyjsxy',
      'items': [{ "label": "院长：薛蓉娜", "index": "xrn", "value": "电话：85383456" }, { "label": "党委书记兼副院长：曹利戈", "index": "clg", "value": "电话：85383204" }, { "label": "副院长：郭琪", "index": "gq", "value": "电话：85383450" }, { "label": "副院长：张宁", "index": "zn", "value": "电话：85383164" }]
    },
    {
      'title': '体育部',
      'index': 'tyb',
      'items': [{ "label": "主任：李静", "index": "lj", "value": "电话：88166241" }, { "label": "副主任：韩伟", "index": "hw", "value": "电话：88166241" }, { "label": "副主任：吴玲珍", "index": "wlz", "value": "电话：88166241" }]
    },
    {
      'title': '物联网与两化融合研究院',
      'index': 'wlwylhrhyjy',
      'items': [{ "label": "院长：朱志祥", "index": "zzx", "value": "电话：85383425" }, { "label": "副院长：陈文艺", "index": "cwy", "value": "电话：85383469" }, { "label": "副院长：祁宗全", "index": "zzq", "value": "电话：85383006" }, { "label": "副院长：魏巍", "index": "ww", "value": "电话：85253977" }, { "label": "副院长：惠小强", "index": "hxq", "value": "电话：85383209" }]
    },
    {
      'title': '马克思主义教育研究院',
      'index': 'mkszyjyyjy',
      'items': [{ "label": "院长：董小龙", "index": "dxl", "value": "电话：88166357" }, { "label": "常务副院长：马智", "index": "mz", "value": "电话：88166092" }]
    },
    {
      'title': '国防教育学院',
      'index': 'gfjyxy',
      'items': [{ "label": "常务副院长：张继荣", "index": "zjr", "value": "电话：88166162" }, { "label": "副院长：黄小梅", "index": "hxm", "value": "电话：88166157" }, { "label": "副院长：梁琨", "index": "lk", "value": "电话：88166071" }, { "label": "副院长：赵补生", "index": "zbs", "value": "电话：88166197" }]
    },
    {
      'title': '国际合作与交流处',
      'index': 'gjhzyjlc',
      'items': [{ "label": "办公室电话", "index": "bgs", "value": "电话/传真：88166107" }]
    },
    {
      'title': '学校办公室',
      'index': 'xxbgs',
      'items': [{ 'label': '主任：郑大远', 'index': 'zdy', 'value': '电话：88166006' }, { 'label': '副主任：刘勇', 'index': 'ly', 'value': '电话：88166007' }, { 'label': '副主任：杨旸', 'index': 'yy', 'value': '电话：88166305' }]
    },
    {
      'title': '教务处',
      'index': 'jwc',
      'items': [{ 'label': '处长：樊相宇', 'index': 'fxy', 'value': '电话：88166161' }, { 'label': '副处长：张继荣', 'index': 'zjr', 'value': '电话：88166162' }, { 'label': '副处长：阴亚芳', 'index': 'yyf', 'value': '电话：88166162' }, { 'label': '副处长：宋金锁', 'index': 'sjs', 'value': '电话：88166163' }, { 'label': '副处长：张二锋', 'index': 'zef', 'value': '电话：88166163' }, { 'label': '评估办副主任：窦彩兰', 'index': 'dcl', 'value': '电话：88166170' }]
    },
    {
      'title': '学生处',
      'index': 'xsc',
      'items': [{ 'label': '部长、处长：樊继福', 'index': 'fjf', 'value': '电话：88166158' }, { 'label': '副部长、副处长：黄小梅', 'index': 'hxm', 'value': '电话：88166157' }, { 'label': '副部长、副处长：梅永刚', 'index': 'myg', 'value': '电话：88166483' }]
    },
    {
      'title': '信息中心',
      'index': 'xxzx',
      'items': [{ 'label': '主任：刘建华', 'index': 'ljh', 'value': '电话：88166594' }, { 'label': '副主任：刘国营', 'index': 'lgy', 'value': '电话：88166129' }]
    },
    {
      'title': '招生就业处',
      'index': 'zsjyc',
      'items': [{ 'label': '处长：巩红', 'index': 'gh', 'value': '电话：88166196' }, { 'label': '副处长：王颖', 'index': 'wy', 'value': '电话：88166195' }, { 'label': '副处长：赵补生', 'index': 'zbs', 'value': '电话：88166199' }, { 'label': '办公室电话', 'index': 'bgs', 'value': '电话：88166193' }]
    },
    {
      'title': '图书馆',
      'index': 'tsg',
      'items': [{ 'label': '馆长：吕建平', 'index': 'ljp', 'value': '电话：88166251' }, { 'label': '副馆长：吴新星', 'index': 'wxx', 'value': '电话：88166389' }, { 'label': '副馆长：宋德义', 'index': 'sdy', 'value': '电话：88166252' }]
    },
    {
      'title': '卫生所',
      'index': 'wss',
      'items': [{ 'label': '所长：段培真', 'index': 'dpz', 'value': '电话：85383190' }, { 'label': '副所长：尚爱梅', 'index': 'sam', 'value': '电话：85383182' }]
    }
  ]
}

module.exports = {
  getPhoneInfo,
  getOrderInfo,
  judgeShuKu,
  handleComma,
  isWeekDay,
  isOpenDoor,
  getIntervalDays,
  weixinLogin,
  isSessionValid,
  formatTime: formatTime
}
