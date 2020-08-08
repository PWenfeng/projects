// pages/Address/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['安徽省', '合肥市', '包河区'],
    addressList:[]
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  addAddress(e){
     //将新地址存入缓存
    let ad = e.detail.value;
    let list = this.data.addressList;
    let adds = {
      id:(new Date()).getTime(),
      name:ad.name,
      tel:ad.tel,
      address:ad.address,
      addressDetail:ad.addressDetail,
      defaultAddress:false
    }
    list.push(adds);
    this.setData({
      addressList:list
    })
    wx.setStorageSync('addressList', this.data.addressList);
  },
  selectaddress(e){
      let addressId = e.currentTarget.dataset.addressid;
      let list = this.data.addressList;
      for(let i =0;i<list.length;i++){
        if(list[i].id==addressId){
          list[i].defaultAddress=true;
        }else{
          list[i].defaultAddress=false;
        }
      }
      this.setData({
        addressList:list
      })
      wx.setStorageSync('addressList', this.data.addressList);
  },
  back(){
    wx.navigateBack({
      delta: 2
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let addressList = wx.getStorageSync('addressList')||[];
    this.setData({
      addressList:addressList
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