// components/searchBox/searchBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    text:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    searchShop(){
      this.triggerEvent("searchValue",this.data.text)
    },
    infoChange(event){
      console.log("值发生改变");
      this.setData({
        text:event.detail.value
      })
    }
  }
})
