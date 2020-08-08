// pages/shopDetail/shopDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetail:"",
    show: false,
    shopCount:1
  },
  openChoise(){
    this.setData({
      show:true
    })
  },
  onChange(e){
    this.setData({
      shopCount:e.detail
    })
  },
  onClose(){
      this.setData({
        show:false
      })
  },
  onClickPhone() {
    wx.makePhoneCall(
      {
        phoneNumber: '15395116666'
      }
    )
  },
  addCart(){
    let username = wx.getStorageSync('userinfo').userInfo.nickName;
    let carts=wx.getStorageSync(username)||[];
    let shopinfo = {goodid:this.data.shopDetail.goods_id,shopimg:this.data.shopDetail.goods_small_logo,shopprice:this.data.shopDetail.goods_price,shopcount:this.data.shopCount,shopname:this.data.shopDetail.goods_name}
    let addflag = true;
    for(let i=0;i<carts.length;i++){
      if(carts[i].goodid==this.data.shopDetail.goods_id)
      {
        carts[i].shopcount+=this.data.shopCount;
        addflag = false;
        break;
      }
    }
    if(addflag){
      carts.push(shopinfo);
    }
   wx.setStorageSync(username, carts)
    console.log(wx.getStorageSync(username));
    wx.showToast({
      title: '添加购物车成功',
    })
  },
  onClickButton() {
    Toast('点击按钮');
  },
  back(){
    wx.navigateBack({
      delta: 2
    });
  },
  redirectCart(){
    wx.navigateTo({
      url: '/pages/Cart/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      let goodsId = options.goodId;
      this.getShopDetail(goodsId);
  },
  getShopDetail(goodsId){
    let that = this;
    wx.request({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/detail?goods_id=${goodsId}`,
      success(result){
        console.log(result);
        that.setData({
          shopDetail:result.data.message
        })
      }
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