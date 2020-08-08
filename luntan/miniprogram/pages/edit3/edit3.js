// pages/edit3/edit3.js
const db = wx.cloud.database()
const userInfo = db.collection('luntan-userInfo')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

    //修改用户个性签名
    bindTextAreaBlur: function(e) {
      /* console.log(e.detail.value)
      console.log(this.data.id) */
      let _id=this.data.id
      if(e.detail.value!==""){
        userInfo.doc(_id).update({
          data:{
            sign:e.detail.value
          }
        }).then(res=>{
          //console.log(res)
        }).catch(console.error)
      }      
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userInfo.where({
      _openid:options.id
    }).get().then(res=>{
      this.setData({
        id:res.data[0]._id
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