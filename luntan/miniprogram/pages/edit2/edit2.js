// pages/edit2/edit2.js
const db=wx.cloud.database()
const luntanInfo=db.collection('luntanInfo')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkboxItems: [
      { name: 'MS', value: '美食' },
      { name: 'ZG', value: '中国' },
      { name: 'GJ', value: '国际' },
      { name: 'KJFY', value: '抗击肺炎' },
      { name: 'DY', value: '电影' },
      { name: 'YX', value: '游戏' },
    ],
  },

  onLoad: function (options) {
    //console.log(options)
    let that=this
    let titleData=options.title
    let contentData=options.content
    that.setData({
      title:titleData,
      content:contentData
    })
  },

  checkboxChange: function (e) {
    var checked = e.detail.value
    var changed = {}
    for (var i = 0; i < this.data.checkboxItems.length; i++) {
      if (checked.indexOf(this.data.checkboxItems[i].name) !== -1) {
        changed['checkboxItems[' + i + '].checked'] = true
      } else {
        changed['checkboxItems[' + i + '].checked'] = false
      }
    }
    this.setData(changed)

    let arr=this.data.checkboxItems
    console.log(arr)
    let tags=[];
    arr.forEach(index => {
      console.log(index.checked==true)
      if(index.checked==true){
        tags.push(index.value)
      }
    });
    //console.log()
    this.setData({
      tags:tags
    })
  },

  //展示图片
  upload:function(){
    wx.chooseImage({
      count:1,
      sizeType:["original",'compressed'],
      sourceType:['album','camera'],
      success:res=>{
        const tempFilePaths=res.tempFilePaths;        
        for(var i=0;i<tempFilePaths.length;i++){
          let randString=Math.floor(Math.random()*100000000000).toString()+'.png'
          /* console.log(randString)
          console.log(tempFilePaths[i]) */

          wx.cloud.uploadFile({
            cloudPath:randString,
            filePath:tempFilePaths[i],
            success:res2=>{
              console.log("2",res2)
              this.setData({
                img:res2.fileID
              }).then(res3=>{
                console.log(res3)
                wx.showToast({
                  title: '上传成功',
                  icon:'success'
                })
              })
                             
            },
            fail:console.error
          })
        }
      },
      fail:err=>{
        console.error(err)
      }
    })
  },

  back(){
    wx.navigateBack()
  },

  publish(){
    if(this.data.img==null){
      wx.showToast({
        title: '请上传图片',
        icon:"loading",
        duration:1000
      })
    }else if(this.data.tags==null){
      wx.showToast({
        title: '请选择标签',
        icon:"loading",
        duration:1000
      })
    }else{
      let time=db.serverDate()
      /* console.log(time) */
      luntanInfo.add({
        data:{
          img:this.data.img,
          title:this.data.title,
          content:this.data.content,
          tags:this.data.tags,
          count:0,
          time:time
        }
      }).then(res=>{
        wx.showToast({
          title: '发布成功',
          icon:"success",
          duration:1000
        })
      })      
    }
  },

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