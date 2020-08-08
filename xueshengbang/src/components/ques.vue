<!--这是教程攻略页面-->

<template>
  <div>
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/faq">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">教程攻略</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <div id="ques">
      <h1>{{this.list.title}}</h1>
      <h2>{{this.list.qus}}</h2>
      <p>{{this.list.resolve}}</p>
      <h2>{{this.list.qus2}}</h2>
      <p>{{this.list.resolve2}}</p>
      <p>{{this.list.other}}</p>
      <div id="ques_icon">
        <p class="ques_icon" @click="tag" :class={border:isborder}>
          <span class="van-icon van-icon-good-job good_icon" :class={color:iscolor} /><span class="good_ques" :class={color:iscolor}>已解决</span>
        </p>
        <p class="ques_icon"  @click="tag2" :class={border:border} >
          <i class="van-icon van-icon-good-job bad_icon" :class={color:color}></i><span class="bad_ques" :class={color:color}>未解决</span>
        </p>  
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      iscolor:false,
      isborder:false,
      color:false,
      border:false,
    };
  },
  methods:{
    tag:function(){
      if(this.color==false && this.iscolor==false){
        this.iscolor=true;
        this.isborder=true
      }
    },
    tag2(){
      if(this.color==false && this.iscolor==false){
        this.color=true;
        this.border=true
      }
    }
  },
  created() {   
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") &&
      this.$store.replaceState(
        Object.assign(
          this.$store.state,
          JSON.parse(localStorage.getItem("userMsg"))
        )
      );
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("userMsg", JSON.stringify(this.$store.state.sendlist));
    });
  },
  computed: mapState({
    list: state => state.sendlist
  }),
};
</script>
<style scoped>
* {
  margin: 0 auto;
  font-size: 16px;
}
.van-icon-arrow-left {
  font-size: 18px;
  font-weight: 600;
}
.van-nav-bar__title {
  font-weight: 600;
}
#ques {
  width: 95%;
  height: 200px;
}
#ques > h1,
h2,
p {
  margin: 10px 0;
}
#ques>h1{
  border-bottom: 1px solid rgb(175, 173, 173);
  line-height: 42px;
}
#ques_icon{
  width: 70%;
  text-align: center;
  height: 60px;
}
.good_icon,.bad_icon{
  font-size: 32px;
  color: rgb(183, 183, 207);   
}
.bad_icon{
  transform: rotate(180deg);
}
.ques_icon{
  width:40%;
  float:left;
  border-radius: 4px;  
  border: 1px solid rgb(129, 126, 126);
  margin-left: 18px;
}
.good_ques,.bad_ques{
  position: relative;
  top: -6px;
  left: 4px;
  color: rgb(185, 185, 214); 
}
.color{
  color: rgb(9, 129, 209);
}
.border{
  border: 1px solid rgb(9, 129, 209);
}
</style>
