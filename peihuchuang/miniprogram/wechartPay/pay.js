export default function(orderInfo){
  console.log("微信支付调用");
    let userinfo = wx.getStorageSync('userinfo');
    let code = wx.getStorageSync('userCode');
      //获取用户令牌
      wx.request({
        url: 'https://api-hmugo-web.itheima.net/api/public/v1/users/wxlogin',
        data:{encryptedData:userinfo.encryptedData,rawData:userinfo.rawData,iv:userinfo.iv,signature:userinfo.signature,code:code},
        method:'POST',
        dataType :'json',
        success(res){
          //获取后台提供能令牌
          let token= res.data.message.token
          //创建订单
          wx.request({
            url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/create',
            header:{Authorization:token},
            method:'POST',
            data:{order_price:orderInfo.order_price,consignee_addr:orderInfo.consignee_addr,goods:orderInfo.goods},
            success(res){
              //获取订单创建成功后的订单编号
                  let orderNumber = res.data.message.order_number;
                  //保存订单编号到本地
                  let orederList = wx.getStorageSync('orderList')||[];
                  orederList.push(orderNumber);
                  wx.setStorageSync('orderList', orederList)
                  //获取该订单的支付参数
              wx.request({
                url: 'https://api-hmugo-web.itheima.net/api/public/v1/my/orders/req_unifiedorder',
                method:'POST',
                header:{Authorization:token},
                data:{order_number:orderNumber},
                success(res){
                  let pay = res.data.message.pay;
                  /*
                  "pay": {
                        "timeStamp": "1564730510",
                          "nonceStr": "SReWbt3nEmpJo3tr",
                          "package": "prepay_id=wx02152148991420a3b39a90811023326800",
                          "signType": "MD5",
                          "paySign": "3A6943C3B865FA2B2C825CDCB33C5304"
                          }
                  */
                  return pay;
                }

              })

            }
          })
          
        }
      })
}