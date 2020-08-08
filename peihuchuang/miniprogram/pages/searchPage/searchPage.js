// pages/searchPage/searchPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageNum:1,
    shopList:[],
    searchText:""
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
    this.getShopList(this.data.searchText,this.data.pageNum,8);
  },
  findShop(e){
    let goodsId = e.currentTarget.dataset.gid;
    console.log(goodsId);
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?goodId='+goodsId,
    })
  },
  searchValue(text){
    console.log(text.detail);
      this.setData({
        searchText:text.detail,
        shopList:[],
        pageNum:1
      })
      this.getShopList(this.data.searchText,this.data.pageNum,8)

  },
  getShopList(query,pagenum,pagesize){
    let that = this;
    wx.request({
      url: `https://api-hmugo-web.itheima.net/api/public/v1/goods/search?query=${query}&pagenum=${pagenum}&pagesize=${pagesize}`,
      success(result){
        let infos = that.data.shopList;
        let netInfo = result.data.message.goods;
        for(let i = 0 ; i<netInfo.length;i++){
          infos.push(netInfo[i]);
        }
        that.setData({
          shopList:infos
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
    this.setData({
      pageNum:++this.data.pageNum
    })
    this.getShopList(this.data.searchText,this.data.pageNum,8);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})