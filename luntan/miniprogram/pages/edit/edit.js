const db=wx.cloud.database()
const luntanInfo=db.collection('luntanInfo')

Page({
  data: {
    formats: {},
    readOnly: false,
    placeholder: '开始输入...',
    editorHeight: 300,
    keyboardHeight: 0,
    isIOS: false,    
    
  },

  
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onLoad() {
    const platform = wx.getSystemInfoSync().platform
    const isIOS = platform === 'ios'
    this.setData({ isIOS})
    const that = this
    this.updatePosition(0)
    let keyboardHeight = 0
    wx.onKeyboardHeightChange(res => {
      if (res.height === keyboardHeight) return
      const duration = res.height > 0 ? res.duration * 1000 : 0
      keyboardHeight = res.height
      setTimeout(() => {
        wx.pageScrollTo({
          scrollTop: 0,
          success() {
            that.updatePosition(keyboardHeight)
            that.editorCtx.scrollIntoView()
          }
        })
      }, duration)

    })
  },
  updatePosition(keyboardHeight) {
    const toolbarHeight = 50
    const { windowHeight, platform } = wx.getSystemInfoSync()
    let editorHeight = keyboardHeight > 0 ? (windowHeight - keyboardHeight - toolbarHeight) : windowHeight
    this.setData({ editorHeight, keyboardHeight })
  },
  calNavigationBarAndStatusBar() {
    const systemInfo = wx.getSystemInfoSync()
    const { statusBarHeight, platform } = systemInfo
    const isIOS = platform === 'ios'
    const navigationBarHeight = isIOS ? 44 : 48
    return statusBarHeight + navigationBarHeight
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
    }).exec()
  },
  blur() {
    this.editorCtx.blur()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    //console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {    
    const formats = e.detail
    this.setData({ formats })
  },

  //输入的内容
  onBindinput(e){
    //console.log(e.detail.text)
    this.setData({
      content:e.detail.text
    })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          width: '80%',
          success: function () {
            console.log('insert image success')
          }
        })
      }
    })
  },

  //取消发表内容
  cancel(){
    wx.navigateBack()
  },

  //跳转到下一页
  nexTo(e){
    console.log(e)
    var that=this
    /* console.log(this.data.content)
    console.log(this.data.title) */
    var title=this.data.title;
    var content=this.data.content
    if(this.data.title==null || undefined){
      wx.showToast({
        title: '标题不能为空！',
        icon:"loading",
        duration:1000
      })
    }else if(this.data.content==null || undefined){
      wx.showToast({
        title: '内容不能为空！',
        icon:"loading",
        duration:1000
      })
    }else{
      wx.navigateTo({
        url: '../edit2/edit2?title='+title+'&content='+content,
      })
    }    
  },
  //发表内容
  

  //标题输入框失去焦点
  onBindblur(e){
    //console.log(e.detail.value)
    this.setData({
      title:e.detail.value
    })
  }
})