const db = wx.cloud.database()
const luntanInfo = db.collection('luntanInfo')
const app = getApp()
var base64 = require("../../images/base64");

Page({
  data: {
    tabs: [],
    activeTab: 0,
    icon20: base64.icon20,
    icon60: base64.icon60,
    tabsInfo: [],
  },

  onLoad: function (options) {

    //获取轮播图
    luntanInfo.orderBy('count', 'desc').limit(3).get().then(res => {
      this.setData({
        bannerImg: res.data
      })
    })

    var tabsInfo = this.data.tabsInfo
    luntanInfo.where({
      tags: "美食"
    }).get().then(res2 => {
      //console.log("美食", res2.data)
      tabsInfo[0] = res2
    })

    luntanInfo.where({
      tags: "中国"
    }).get().then(res2 => {
      //console.log("中国", res2.data)
      tabsInfo[1] = res2
    })

    luntanInfo.where({
      tags: "国际"
    }).get().then(res2 => {
      //console.log("国际", res2.data)
      tabsInfo[2] = res2
    })

    luntanInfo.where({
      tags: "抗击肺炎"
    }).get().then(res2 => {
      //console.log("抗击肺炎", res2.data)
      tabsInfo[3] = res2
    })

    luntanInfo.where({
      tags: "电影"
    }).get().then(res2 => {
      //console.log("电影", res2.data)
      tabsInfo[4] = res2
    })

    luntanInfo.where({
      tags: "游戏"
    }).get().then(res2 => {
      //console.log("游戏", res2.data)
      tabsInfo[5] = res2
    }).then(res => {
      //console.log(tabsInfo)
      this.setData({
        tabs: app.globalData.checkboxItems,
        tabsContent: tabsInfo[0],
        'seletId': 0
      })
    })
  },

  //点击标签，切换频道
  choose(e) {
    let index = e.currentTarget.dataset.index
    wx.showLoading({
        title: '加载中...',
      }),
      this.setData({
        tabsContent: this.data.tabsInfo[index],
        'seletId': index
      }, res => {
        wx.hideLoading()
      })
  },

  //跳转到发表页
  navigatorTo() {
    wx.navigateTo({
      url: '../edit/edit',
    })
  },

})