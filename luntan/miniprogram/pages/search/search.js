// pages/search/search.js
/* import CustomPage from '../../base/CustomPage' */
const db = wx.cloud.database()
const luntanInfo = db.collection('luntanInfo')
Page({
  data: {

  },
  onLoad(options) {
    luntanInfo.orderBy('count', 'desc').limit(6).get().then(res => {
      //console.log(res.data)
      this.setData({
        hotData: res.data
      })
    })
  }

})