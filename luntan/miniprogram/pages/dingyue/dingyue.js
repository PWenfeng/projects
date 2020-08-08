var base64 = require("../../images/base64");
const db=wx.cloud.database()
const goodsInfo=db.collection('luntan-goodsInfo')

Page({
    data:{
    },
    onLoad: function(){
      this.setData({
          icon20: base64.icon20,
          icon60: base64.icon60
      });

      goodsInfo.get().then(res=>{
        this.setData({
          goods:res.data
        })
      })
    },

    toDetail(e){
      var _id=e.currentTarget.id
      goodsInfo.doc(_id).get().then(res=>{
        console.log(res)
        let ispay=res.data.ispay
        if(ispay===true){
          wx.navigateTo({
            url: '../content/content?id='+_id,
          })
        }else{
          wx.showLoading({
            title: '请先支付',          
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 1000)
  
        }
      })
      
      
    }
});