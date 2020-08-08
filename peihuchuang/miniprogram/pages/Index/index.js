// pages/Index/index.js
var ok = 'http://vcast-resource.cdn.bcebos.com/vcast-resource/fff53f62-2893-4168-b94a-42df6200ca53.mp3';//开锁成功过
var fail = 'http://boscdn.bpc.baidu.com/v1/developer/ed213a54-35cf-4688-9245-764f84a1ff56.mp3';//开锁失败
var backOk = 'http://vcast-resource.cdn.bcebos.com/vcast-resource/2709d461-ba21-4af3-a02f-b7fb0a3a9333.mp3';//关锁成功
var backFail = 'http://vcast-resource.cdn.bcebos.com/vcast-resource/94f18a72-8854-48e0-9cfa-6c8143b0558e.mp3';//关锁失败
var welcome = 'http://vcast-resource.cdn.bcebos.com/vcast-resource/51222e73-8772-4f71-aa79-1c288ac90f55.mp3'//欢迎语
 //生成了一段16字节的内存区域，开启的区域不可被直接操作，需要在空间下添加一个操作的视图
let buffer = new ArrayBuffer(16);
//一个二进制字节缓存区 array buffer 的“解释器”——它知道如何在读取或写入时正确地转换字节码
let dataView = new DataView(buffer)
//向开拓16位空间中写入Uint8类型的指令【获取蓝牙锁令牌】
dataView.setUint8(0, 0xCA)
dataView.setUint8(1, 0xFB)
dataView.setUint8(2, 0x4A)
dataView.setUint8(3, 0xC9)
dataView.setUint8(4, 0x88)
dataView.setUint8(5, 0x96)
dataView.setUint8(6, 0x6A)
dataView.setUint8(7, 0x67)
dataView.setUint8(8, 0x63)
dataView.setUint8(9, 0x39)
dataView.setUint8(10, 0xFE)
dataView.setUint8(11, 0x49)
dataView.setUint8(12, 0x07)
dataView.setUint8(13, 0x05)
dataView.setUint8(14, 0xB1)
dataView.setUint8(15, 0xF9)

var macId = null; //蓝牙锁id，用来操作订单
var tokenArr; //解密后的密文数组
Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperList:[{
      id: 0,
      type: 'image',
      url: 'https://img.zcool.cn/community/01b2be5da434b9a801204cd0e4e644.png@1280w_1l_2o_100sh.png'
    }],
    //被操做的蓝牙设备编号
    deviceId:"",
    //扫描到的蓝牙设备码
    mac:"",
    //操作的指令
    cmd:"openlock", //closelock
    //按钮的信息
    btnInfo:"扫码租床",
    //开锁时间
    openlockTime:"",
    //结算金额
    result:""
  },
  //扫码
  saoma(){
    let that = this;
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        let bluemac = res.result;
        console.log("蓝牙设备码：",bluemac);
        that.setData({
          //0C:1C:57:AB:A4:61
          mac:bluemac
        })
        console.log("下面开始开启蓝牙的操作");
        that.showToast("搜索设备...");
          that.searchBlue(bluemac)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //http://localhost:8080/findresultMoneybyshebeiId?shebeiId=123456
   
    //语音播报
    this.play(welcome);
    //授权操作
    wx.showModal({
      title: '是否授权？',
      content: '请先登录授权小程序，否则无法使用设备。',
      success (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/Login/index',
          })
        } 
      }
    })
    //更改指令状态

  },
  showToast(info){
    wx.showLoading({
      title: info,
      mask:true
    })
  },
  //微信播放远程媒体音频
  play(e) {
    //生成一个音频播放器
    const innerAudioContext = wx.createInnerAudioContext()
    //设置自动播放
    innerAudioContext.autoplay = true
    //设置播放地址
    innerAudioContext.src = e
    //音频开启
    innerAudioContext.onPlay(() => {console.log("播放成功")})
    //开启失败的回调
    innerAudioContext.onError((res) => {console.log("播放失败",res)})
  },
   searchBlue(e){
    var that = this;
      //获取适配器【查看蓝牙是否开启】
      wx.openBluetoothAdapter({
        success: function(res){
          // success
          console.log("-----蓝牙开启----------");
           console.log(res);
            //开启蓝牙搜索功能
         wx.startBluetoothDevicesDiscovery({
          success: function(res){
            console.log("-----蓝牙搜索功能成功--------------");
            },
           fail: function(res) {
            // fail
            console.log("---------蓝牙搜索开启失败------------");
            console.log(res);
   }
 })
          
        },
        fail: function(res) {
           console.log("-----蓝牙未开启----------");
          // fail
           console.log(res);
        }
      })
      // 搜索蓝牙设备
      let count = 0;
      //循环获取蓝牙设备
      let getDei = setInterval(() => {
        //必须要开启蓝牙搜索功能
        wx.getBluetoothDevices({
          //会自动将扫描到的蓝牙设备添加带列表中
          success: function(res){
            console.log(res);
             that.setData({
               //这个列表包含了之前已扫到的设备
             list:res.devices
             });
            //每次将获得设备列表进行判断
             let list = that.data.list;
             //开锁的设备的mac地址：0C:1C:57:AB:A4:61  || E6:9E:61:FC:02:BA
             for (var i = 0; i < list.length; i++){
               //advertisData字段不为空的是我们设备
              if (list[i].advertisData != null){
                   //根据advertisData 取出mac进行拼接
                   let bf = list[i].advertisData.slice(2, 12);
                  /*
                  var a = 'foo';
                  // 数组的非变更方法,即不改变原有数组的方法
                  var b = Array.prototype.join.call(a, '-');
                  var c = Array.prototype.map.call(a, v => v.toUpperCase()).join()
                  var d = Array.prototype.slice.call(a);
                  console.log(b); // 'f-o-o'
                  console.log(c); // 'FOO'
                  console.log(d); // ['f', 'o', 'o']
                  // 数组的可变更方法,即能够改变原有数组的方法
                  var e = Array.prototype.reverse.call(a);
                  */  
                   let MAC = Array.prototype.map.call(new Uint8Array(bf), x => ('00' + x.toString(16)).slice(-2)).join(':');
                   //匹配蓝牙
                   console.log("解析出的设备MAC",MAC);
                   //"0C:1C:57:AB:A4:61" 通过扫码动态获得
                   if (MAC.toUpperCase().slice(0, 17) == e) {
                     //关闭蓝牙搜索
                    wx.stopBluetoothDevicesDiscovery({
                      success: function(res) {},
                      fail: function(res) {}
                    }) 
                    //清空计时器和计数器
                    clearInterval(getDei);
                    count=0;
                    //将匹配上的设备ID 交给全局
                    that.setData({
                      deviceId: list[i].deviceId
                    });
                    //开启蓝牙连接准备发起蓝牙通信
                    wx.createBLEConnection({
                      deviceId: that.data.deviceId,
                      success: function(res) {
                        // console.log('连接蓝牙成功')
                        //获取蓝牙设备所有服务(service)
                        wx.getBLEDeviceServices({
                          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
                          deviceId: that.data.deviceId,
                          success(res) {
                            //获取蓝牙设备某个服务中所有特征值(characteristic)
                            wx.getBLEDeviceCharacteristics({
                              deviceId: that.data.deviceId,
                              // 这里的 serviceId 需要在 getBLEDeviceServices 接口中获取
                              serviceId: '0000FEE7-0000-1000-8000-00805F9B34FB',
                              success(res) {
                                //启用低功耗蓝牙设备特征值变化时的 notify 功能
                                wx.notifyBLECharacteristicValueChange({
                                  state: true,
                                  deviceId: that.data.deviceId,
                                  serviceId: '0000fee7-0000-1000-8000-00805f9b34fb'.toUpperCase(),
                                  //ReadData UUID
                                  characteristicId: '000036f6-0000-1000-8000-00805f9b34fb'.toUpperCase(),
                                  //监听开启成功
                                  success: function(res) {
                                   //监听低功耗蓝牙设备的特征值变化事件
                                    wx.onBLECharacteristicValueChange(function(res) {
                                      // console.log(res)
                                      //将监听到得值转成Uint8
                                      var arr = new Uint8Array(res.value)
                                      // console.log(Array.from(arr).slice(0, 16))
                                      console.log("监听到的特征值："+arr);
                                      //将特征值发给后台进行验证，并获得密钥
                                      wx.request({
                                        url: 'https://mingmai.hzyytech.com/decode',//用来解密
                                        header: {
                                          'contentType': "application/json;charsetset=UTF-8"
                                        },
                                        method: 'post',
                                        data: Array.from(arr).slice(0, 16),
                                        success(res) {
                                          tokenArr = res.data
                                          console.log("后台提供的密钥",tokenArr);
                                          if (tokenArr == null) {
                                            wx.hideLoading()
                                            wx.showModal({
                                              title: '提示',
                                              content: '缺少开锁密钥',
                                              showCancel: false
                                            })
                                            wx.closeBLEConnection({
                                              deviceId: that.data.deviceId
                                            })
                                            wx.hideLoading();
                                            return
                                          }
                                          //获取蓝牙令牌成功
                                          if (tokenArr[0] == 6) {
                                            //发送开锁指令
                                            if(that.getCmd(that.data.deviceId)!=""){
                                              //向服务器随便发送一个请求，正常返回再发送蓝牙指令[网络脉搏]

                                              that.sendOpenLockCommand(that.getCmd(that.data.deviceId))
                                            }else{
                                              that.sendOpenLockCommand("openlock");
                                            }
                                            
                                          } else if (tokenArr[0] == 5 && tokenArr[1] == 2 && tokenArr[2] == 1 && tokenArr[3] == 0) {
                                            wx.showModal({
                                              title: '通知',
                                              content: '开锁成功,请拉出设备使用',
                                              showCancel: false
                                            })
                                            //将设备的状态保存,以操作的设备编号作为key
                                            wx.setStorageSync(that.data.deviceId, "open");
                                            //更改按钮提示信息
                                            let d = new Date();
                                            let NowTime=`${d.getFullYear()}-${(parseInt(d.getMonth())+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")} ${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}:${d.getSeconds().toString().padStart(2,"0")}`;
                                            that.setData({
                                              btnInfo:"扫码结算",
                                              openlockTime:NowTime,
                                              result:5
                                            })
                                            //将开锁信息发送给服务器
                                            //--------------------------------------发送蓝牙开启信息给服务器----------------------------------------
                                            //设备Id，userid[缓存]
                                            let userid = wx.getStorageSync('userinfo').iv;
                                            let shebeiid = that.data.deviceId;
                                            let result = that.useBlueRequest(`http://www.static.gold:3034/addBlue?shebeiid=${shebeiid}&userid=laozhang&startTime=${NowTime}`)  
                                            //把设备开启的时间保存
                                            let blueStartimeinfo = {shebeiid:"shebeiid",startTime:NowTime};
                                            wx.setStorageSync("blueStartimeinfo",blueStartimeinfo);
                                            wx.hideLoading();
                                            //执行语音提示
                                            that.play(ok)
                                            //删除连接过后的蓝牙Id,做好二次指令的准备
                                            wx.closeBLEConnection({
                                              deviceId: that.data.deviceId
                                            })     
                                          } else if (tokenArr[0] == 2 && tokenArr[0] == 2 && tokenArr[0] == 1) { //electric 成功【检测电量】
                                            // console.log(tokenArr[3])
                                            that.setData({
                                              electric: tokenArr[3]
                                            })
                                          } else if (tokenArr[0] == 5 && tokenArr[1] == 2 && tokenArr[2] == 1 && tokenArr[3] == 1) {
                                            wx.showModal({
                                              title: '警告',
                                              content: '开锁失败',
                                              showCancel: false
                                            })
                                            wx.hideLoading();
                                            that.play(fail)
                                           
                                            wx.closeBLEConnection({
                                              deviceId: that.data.deviceId
                                            })
                                            //注意！文档是错误的！
                                          } else if (tokenArr[0] == 5 && tokenArr[1] == 8 ||tokenArr[1] == 3 && tokenArr[2] == 1 && tokenArr[3] == 0) {
                                           
                                            //更改按钮提示信息
                                            that.setData({
                                              btnInfo:"扫码租床"
                                            })
                                            //将设备的状态保存,以操作的设备编号作为key
                                            wx.setStorageSync(that.data.deviceId, "close");
                                            that.play(backOk)
                                            wx.hideLoading()
                                            that.setData({
                                              sheBei: false
                                            })
                                            //-------------------------------------------------结算蓝牙使用的金额-------------------------------------------------
                                            let d = new Date();
                                            let stopTime=`${d.getFullYear()}-${(parseInt(d.getMonth())+1).toString().padStart(2,"0")}-${d.getDate().toString().padStart(2,"0")} ${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}:${d.getSeconds().toString().padStart(2,"0")}`;
                                            let shebeiid = that.data.deviceId;
                                            let startTime = wx.getStorageSync('blueStartimeinfo').startTime
                                            //改变金额
                                            //解决改变金额和结算的异步转同步
                                            //that.useBlueRequest(`http://www.static.gold:3034/getResultMoney?startTime=${startTime}&stopTime=${stopTime}&shebeiId=${shebeiid}`)

                                            that.createPromise(`http://www.static.gold:3034/getResultMoney?startTime=${startTime}&stopTime=${stopTime}&shebeiId=${shebeiid}`)
                                              .then(result=>{
                                                       let jiesuan = that.useBlueRequest(`http://www.static.gold:3034/findresultMoneybyshebeiId?shebeiId=${that.data.deviceId}`,true)
                                    
                                              },function(err){
                                                  console.log("改变金额失败",err);
                                              })
                                            // wx.setStorageSync("status", false); //已经开锁 
                                            wx.closeBLEConnection({
                                              deviceId: that.data.deviceId
                                            })
                                          
                                        
                                                               
                                          } else if (tokenArr[0] == 5 && tokenArr[1] == 8 && tokenArr[2] == 1 && tokenArr[3] == 1) {
                                            wx.showModal({
                                              title: '警告',
                                              content: '关锁失败',
                                              showCancel: false
                                            })
                                            that.play(backFail)
                                            wx.hideLoading()
                                            wx.closeBLEConnection({
                                              deviceId: that.data.deviceId
                                            })
                                          }
                                        },
                                        fail(e){
                                          console.log(e);
                                        }
                                      })
                                    })
                                  },
                                })
                                //发起第一次密文[获取蓝牙的令牌]，并触发蓝牙监听事件
                                wx.writeBLECharacteristicValue({
                                  deviceId: that.data.deviceId,
                                  serviceId: '0000fee7-0000-1000-8000-00805f9b34fb'.toUpperCase(),
                                  // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
                                  characteristicId: '000036f5-0000-1000-8000-00805f9b34fb'.toUpperCase(),
                                  // 这里的value是ArrayBuffer类型
                                  value: buffer,
                                  success(res) {
                                    // console.log('writeBLECharacteristicValue success', res.errMsg)
                                  }
                                })
                              }
                            })
                          }
                        })
                      },
                      fail(err) {
                        // console.log(err)
                        // console.log('startScanCode失败')
                        wx.hideLoading()
                        if (err.errCode == 10013) {
                          wx.showModal({
                            title: '提示',
                            content: '请扫码正确的器械条码',
                            showCancel: false
                          })
                          return
                        }
                        if (err.errCode == 10003) {
                          wx.showModal({
                            title: '提示',
                            content: '请打开蓝牙后重试',
                            showCancel: false
                          })
                          return
                        }
                        if (err.errCode == 10012) {
                          wx.showModal({
                            title: '提示',
                            content: '连接超时',
                            showCancel: false
                          })
                          return
                        }
                        if (err.errCode == 10002) {
                          wx.showModal({
                            title: '提示',
                            content: '未找到指定设备',
                            showCancel: false
                          })
                          return
                        }
                      }
                    })

                  }
              }
             }
            if(count>=10){
              console.log("----结束搜索，没有可以匹配的设备----");
              clearInterval(getDei);
              //关闭所有和蓝牙相关操作
              count=0;
              console.log(that.data.list);
            }
             count++;
          },
          fail: function(res) {
            // fail
          },
          complete: function(res) {
            // complete
          }
        }) 
      }, 1000); 
  },
  //自动生成指令，返回cmd
  getCmd(deviceId){
      let blueStatus = wx.getStorageSync(deviceId);
      console.log("缓存中的设备状态:",blueStatus);
      if(blueStatus=="close"){
        return "openlock"
      }else if(blueStatus=="open"){
        return "closelock"
      }
      return "";
  },
  //发送给蓝牙的指令操作
  sendOpenLockCommand(cmd) {
    wx.hideLoading();
    if(cmd==="openlock"){
      this.showToast("正在开锁...");
    }else{
      this.showToast("正在关锁...");
    }
    var that = this
    let buffer = new ArrayBuffer(16)
    var cmdArr;
    if (cmd == 'openlock') {   //开锁密码是000000  0x30
      cmdArr = [0x05, 0x01, 0x06, 0x30, 0x30, 0x30, 0x30, 0x30, 0x30, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x00, 0x00, 0x00]

    } else if (cmd == 'electric') { //电量 密码=令牌
      cmdArr = [2, 1, 1, 1, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x30, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x00, 0x00, 0x00]
    } else if (cmd == 'closelock') { //关锁 密码=令牌
      cmdArr = [0x05, 0x0C, 0x01, 0x01, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x30, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x00, 0x00, 0x00]

    } else if (cmd == 'ddd') { //关锁 密码=令牌
      cmdArr = [0x0E, 0x0C, 0x01, 0x01, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x30, tokenArr[3], tokenArr[4], tokenArr[5], tokenArr[6], 0x00, 0x00, 0x00]

    }
    wx.request({
      url:'https://mingmai.hzyytech.com/encode',//用来加密
      header: {
        contentType: "application/json;charsetset=UTF-8"
      },
      method: 'post',
      data: cmdArr,
      success(res) {
        var sendArr = res.data
        console.log("密文",sendArr);
        // console.log(res)
        //开启一个16字节的空间
        let buffer = new ArrayBuffer(16)
        let dataView = new DataView(buffer)
        for (let i = 0; i < 16; i++) {
          //把加密后的指令按顺序放到空间中
          dataView.setUint8(i, sendArr[i])
        }
        //向低功耗蓝牙设备特征值中写入二进制数据
        wx.writeBLECharacteristicValue({
          deviceId: that.data.deviceId,
          serviceId: '0000fee7-0000-1000-8000-00805f9b34fb'.toUpperCase(),
          // 这里的 characteristicId 需要在 getBLEDeviceCharacteristics 接口中获取
          characteristicId: '000036f5-0000-1000-8000-00805f9b34fb'.toUpperCase(),
          // 这里的value是ArrayBuffer类型
          value: buffer,
          success(res) {
            // console.log('writeBLECharacteristicValue success', res.errMsg)
          }
        })
      }
    })
  },
  scanCode(e){
    console.log("开始扫码");
    wx.scanCode({
      onlyFromCamera: true,
      success (res) {
        //可以获得商品二维码的真实信息【连接，产品信息。。。。】 再做处理
        //{result: "老张真的帅", charSet: "UTF-8", 
        //errMsg: "scanCode:ok", scanType: "QR_CODE", rawData: "77u/6ICB5byg55yf55qE5biF"}
        console.log(res)
      }
    })
  },
  useBlueRequest(url,flag){
    wx.cloud.callFunction({
      // 要调用的云函数名称
      name: 'getblue',
      // 传递给云函数的event参数
      data: {
        url:url
      }
    }).then(res => {
      console.log("服务器返回信息",res);
      if(flag==true){
        wx.showModal({
          title: '结算',
          content: `您要支付的金额是：${res.result[0].resultMoney}元`,
          success (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              //微信支付
              
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }else{
        return res;
      }
    
    }).catch(err => {
      //
      console.log(err);
    })
  },
   createPromise(url){
     let that = this;
    return  new Promise((ok,errors)=>{
      let result =  that.useBlueRequest(url);
          ok(result);
    });
}
})