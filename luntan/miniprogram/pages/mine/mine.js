// pages/mine/mine.js
const db = wx.cloud.database()
const userInfo = db.collection('luntan-userInfo')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //获取用户信息
    show: false,
    userList:[],
    focus: false,
    buttons: [
      {
        type: 'primary',
        className: '',
        text: '微信登录授权',
        value: 1,
      }
    ]
  },

  //获取用户信息
  onLoad: function (options) { 
    wx.cloud.callFunction({
      name:"getUserInfo",
      complete:res=>{
        userInfo.where({
          _openid:res.result.openId
        }).count().then(res=>{
          if(res.total==0){
            this.setData({
              show:true
            })
            /* userInfo.add({
              data:result.detail.userInfo,
            }) */
          }else{
            userInfo.where({
              _openid:options.id
            }).get().then(res=>{
              this.setData({
                userList:res.data[0],
                id:res.data[0]._id
              })
            })
            
          }
        }).catch(err=>{
          console.error(err)
        })
      }
    })
  },

  toEdit3(){
    wx.navigateTo({
      url: '../edit3/edit3',
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
   * 生命周期函数--监听页面卸载
   */

})