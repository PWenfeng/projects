// pages/Shop/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navList:[
      {id:"1",iconPath : "like-o",text:"鲜花"},
      {id:"2",iconPath : "like-o",text:"水果"},
      {id:"3",iconPath:"like-o",text:"营养食品"},
      {id:"4",iconPath:"fire-o",text:"土特产"},
      {id:"5",iconPath:"like-o",text:"生活用品"},
      {id:"6",iconPath:"like-o",text:"热卖"},
      {id:"7",iconPath:"like-o",text:"儿童专用"},
      {id:"8",iconPath:"like-o",text:"孕妇专用"},
    ],
    option1: [
      { text: '全部', value: 0 },
      { text: '精选', value: 1 },
      { text: '好评', value: 2 },
    ],
    cardCur: 0,
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
    shopList:[],
    option2: [
      { text: '不限', value: 'a' },
      { text: '2km', value: 'b' },
      { text: '4km', value: 'c' },
    ],
    value1: 0,
    value2: 'a',
    pageNum:1
  },
  cardSwiper(e){
      console.log(e);
  },
  findShop(e){
    let goodsId = e.currentTarget.dataset.gid;
    console.log(goodsId);
    wx.navigateTo({
      url: '/pages/shopDetail/shopDetail?goodId='+goodsId,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.getShopList("袜子",this.data.pageNum,8);
  },
  navSearch(e){
    let searchText = e.target.dataset.lx;
    wx.navigateTo({
      url: '/pages/searchList/searchList?searchText='+searchText,
    })
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
    this.getShopList("袜子",this.data.pageNum,8);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})