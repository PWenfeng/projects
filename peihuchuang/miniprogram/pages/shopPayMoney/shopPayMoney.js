// pages/shopPayMoney/shopPayMoney.js
import wepay from '../../wechartPay/pay'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      canshu:"",
      orderList:[],
      defaultAddress:{},
      totalMoney:0
  },
  redirectAddress(){
      wx.navigateTo({
        url: '/pages/Address/index',
      })
  },
  back(){
    wx.navigateBack({
      delta: 2
    });
    //从缓存中清除订单
    wx.removeStorageSync(this.data.canshu);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onSubmit(){
      console.log("准备支付");
      //let pay = this.wechartPay();
      //支付参数
      let orderInfo = {
                        //订单总价格
                        order_price:this.data.totalMoney,
                        //收货地址
                        consignee_addr:this.data.defaultAddress,
                        //订单数组
                        goods:this.data.orderList
                      }
      let pay = wepay(orderInfo);
      //支付实例
      // wx.requestPayment({
      //   timeStamp: '1564730510',
      //   nonceStr: 'SReWbt3nEmpJo3tr',
      //   package: 'prepay_id=wx02152148991420a3b39a90811023326800',
      //   signType: 'MD5',
      //   paySign: '3A6943C3B865FA2B2C825CDCB33C5304',
      //   success (res) {console.log(res) },
      //   fail (res) {console.log(res) }
      // })
      wx.requestPayment({
        //时间戳
        timeStamp: pay.timeStamp,
        //随机字符串
        nonceStr: pay.nonceStr,
        //统一下单接口返回的 prepay_id 参数值
        package: pay.package,
        //签名算法
        signType: 'MD5',
        //签名
        paySign: pay.paySign,
        success (res) {
          console.log(res)
          //跳转到订单页面
          //根据订单编号查询订单信息

         },
        fail (res) {console.log(res) }
      })
  },
  onLoad: function (options) {
        this.setData({
          canshu:options.number
        })
        console.log(this.data.canshu);
        //初始化默认地址
        this.initaddressData();
        //初始化订单数据
        let list = wx.getStorageSync(this.data.canshu)||[];
        this.setData({
          orderList:list
        })
        //计算订单合计金额
        let totalMoney = 0;
        for(let i =0;i<list.length;i++){
          let result = list[i].shopprice*list[i].shopcount
          totalMoney+=result;
        }
        this.setData({
          totalMoney:totalMoney
        })

  },

  initaddressData(){
    let that = this;
 //读取默认地址
 let list = wx.getStorageSync('addressList')||[];
 for(let i = 0;i<list.length;i++){
     if(list[i].defaultAddress==true){
         that.setData({
           defaultAddress : list[i]
         })
         break;
     }
 }
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
    this.initaddressData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
      console.log("隐藏");
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