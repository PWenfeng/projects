// pages/Cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    checked:false,
    cartsList:[],
    shopcheckedList:[],
    totalPrice:0,
  },
  getTotalPrice(){
      let result=0;
      let cartsList = this.data.cartsList;
      let statusList = this.data.shopcheckedList;

      for(let i = 0; i<statusList.length;i++){
        if(statusList[i].status==true){
          let price = cartsList[i].shopprice;
          let count = cartsList[i].shopcount;
          let num = price*count;
          result+=num;
        }
      }
      this.setData({
        totalPrice:result*100
      })

  },
  selectshop(e){
    let goodid = e.currentTarget.dataset.goodid;
    let list = this.data.shopcheckedList;
    for(let i =0;i<list.length;i++){
      if(list[i].goodid==goodid){
        list[i].status=!list[i].status;
        break;
      }
    }
    this.setData({
      shopcheckedList:list
    })
    this.getTotalPrice();
  },
  selectAll(event){
      let selectList =  this.data.shopcheckedList;
      for(let i = 0;i<selectList.length;i++){
        selectList[i].status = event.detail;
      }
      this.setData({
        shopcheckedList:selectList
      })
      this.setData({
        checked:event.detail
      })
      this.getTotalPrice();
  },
  back(){
    wx.navigateBack({
      delta: 2
    });
  },
  ChangeCount(e){
    let goodid = e.currentTarget.dataset.goodid;
    for(let i=0;i<this.data.cartsList.length;i++){
        if(this.data.cartsList[i].goodid==goodid){
          this.data.cartsList[i].shopcount = e.detail;
          break;
        }
    }
    this.getTotalPrice();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let username = wx.getStorageSync('userinfo').userInfo.nickName;
      this.setData({
        cartsList:wx.getStorageSync(username)
      })
        let shopcheckedList = this.data.shopcheckedList;
      for(let i=0;i<this.data.cartsList.length;i++){
        let goodid = this.data.cartsList[i].goodid;
        console.log(goodid);
        shopcheckedList.push({goodid:goodid,status:false});
      }
      this.setData({
        shopcheckedList:shopcheckedList
      })
  },
  payMoney(e){
    //生成订单
    let cartsList = this.data.cartsList;
    let statusList = this.data.shopcheckedList;
    let orderList = [];
    for(let i = 0; i<statusList.length;i++){
      if(statusList[i].status==true){
        orderList.push(cartsList[i]);
      }
    }
    console.log(orderList);
    let number = parseInt(Math.random()*1000000).toString();
    console.log(number);
    wx.setStorageSync(number, orderList);
    wx.navigateTo({
      url: '/pages/shopPayMoney/shopPayMoney?number='+number,
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