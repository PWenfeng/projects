// pages/content/content.js
const db = wx.cloud.database()
const luntanInfo = db.collection('luntanInfo')
const goodsInfo = db.collection('luntan-goodsInfo')
const history = db.collection('luntan-history')
Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
  //时间处理函数
  _formatTime(time_t) {
    var data = time_t.getFullYear() + "年" + time_t.getMonth() + "月" + time_t.getDate() + "日"
    /* var time=time_t.getHours()+"时"+time_t.getMinutes()+"分"+time_t.getSeconds()+"秒" */
    return data /* +time */
  },

  //获得点击的内容详情
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    this.getLuntaninfo()
  },

  //获得论坛信息
  getLuntaninfo() {
    let id = this.data.id
    luntanInfo.doc(id).update({
      data: {
        count: db.command.inc(1)
      }
    })

    //获得点击首页的详情
    luntanInfo.doc(id).get().then(res => {

      this.setData({
        content: res.data,
        time: this._formatTime(res.data.time),
      })

      console.log(res.data)
      history.add({
        data: {
          content: res.data.content,
          count: res.data.count,
          desc: res.data.desc,
          img: res.data.img,
          ispay: true,
          price: res.data.price,
          time: res.data.time,
          title: res.data.title
        }
      }).then(res => {
        console.log("sy添加成功")
      })

    }).catch(res => {
      goodsInfo.get().then(res => {
        console.log(res)
        this.getGoodsInfo()
      })
    })
  },

  //获得付费商品信息
  getGoodsInfo() {
    let id = this.data.id
    goodsInfo.doc(id).update({
      data: {
        count: db.command.inc(1)
      }
    })

    //获得点击订阅的详情
    goodsInfo.doc(id).get().then(res => {
      console.log(res.data)
      this.setData({
        content: res.data,
        time: res.data.time,
      })

      history.add({
        data: {
          content: res.data.content,
          count: res.data.count,
          desc: res.data.desc,
          img: res.data.img,
          ispay: true,
          price: res.data.price,
          time: res.data.time,
          title: res.data.title
        }
      }).then(res => {
        console.log("dy添加成功")
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})