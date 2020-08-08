// pages/User/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:wx.getStorageSync('userinfo').userInfo,
    navList:[]
  },
  onClose() {
    this.setData({ show: false });
  },

  onSelect(event) {
    console.log(event.detail);
  },
  getInfo(){
    wx.navigateTo({
      url: '/pages/Login/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //注入导航栏菜单
    let data = [
      {id:"1",lefticon:"https://pics.images.ac.cn/image/5ec47f2a8a2b8.html",righticon:"arrow",title:"购物车",navigateUrl:"/pages/Cart/index"},
      {id:"2",lefticon:"https://pics.images.ac.cn/image/5ec47f2a321c0.html",righticon:"arrow",title:"我的订单",navigateUrl:"/pages/Dingdan/index"},
      {id:"3",lefticon:"https://pics.images.ac.cn/image/5ec47f294e2d2.html",righticon:"arrow",title:"我的地址",navigateUrl:"/pages/Address/index"},
      {id:"4",lefticon:"https://pics.images.ac.cn/image/5ec47f2b3919a.html",righticon:"arrow",title:"用户指南",navigateUrl:"/pages/Userhelp/index"},
      {id:"5",lefticon:"https://pics.images.ac.cn/image/5ec47f2b8c2ce.html",righticon:"arrow",title:"我的评价",navigateUrl:"/pages/Pinjia/index"},
      {id:"6",lefticon:"https://pics.images.ac.cn/image/5ec47f29c6454.html",righticon:"arrow",title:"故障报修",navigateUrl:"/pages/Baoxiu/index"},
      {id:"7",lefticon:"https://pics.images.ac.cn/image/5ec47f2ada594.html",righticon:"arrow",title:"客服中心",navigateUrl:"/pages/Kefu/index"},
    ]
    this.setData({
      navList:data
    })

  },

  onTabItemTap(e){
      this.setData({
        userInfo:wx.getStorageSync('userinfo').userInfo
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