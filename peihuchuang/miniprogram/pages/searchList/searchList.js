// pages/searchList/searchList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      searchText:"",
      cardCur: 1,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    pageNum:1,
    shopList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        searchText:options.searchText
      })
      this.getShopList(options.searchText,this.data.pageNum,8);
  },
  back(){
    wx.navigateBack({
      delta: 2
    });
  },
  findShop(e){
    let goodsId = e.currentTarget.dataset.gid;
    console.log(goodsId);
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?goodId='+goodsId,
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.setData({
      pageNum:++this.data.pageNum
    })
    this.getShopList("袜子",this.data.pageNum,8);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})