<!--这是app家长版个人中心页面-->

<template>
  <div id="mine">
    <van-list>
      <van-cell id="van-cell" is-link to="/details">
        <div class="van-skeleton">
          <div
            class="van-skeleton__avatar van-skeleton__avatar--cover"
            style="width: 54px; height: 54px;"
          ></div>
          <span id="parents_name">{{name}}</span>
        </div>
        <van-icon id="right_icon" slot="right-icon" name="arrow" />
      </van-cell>
    </van-list>
    <router-link to="/dingyue">
    <div role="button" tabindex="0" class="van-cell van-cell--clickable">
      <div class="van-cell__title">
        <img id="dy_icon" :src="imgurl2" width="28px"/>
        <span class="custom-title">订阅</span>
      </div>
      <div class="van-cell__value">
        <span>还剩{{day}}天</span>
      </div>
      <i class="van-icon van-icon-arrow van-cell__right-icon">
        <!---->
      </i>
    </div>
    </router-link>
    <!--<van-cell title="拍照解题" icon="" is-link />-->
    <van-cell title="我的班级" is-link to="/banji">
      <template slot="title">
        <img id="left_icon" :src="imgurl5" />
        <span class="custom-title">我的班级</span>
      </template>
    </van-cell>
    <van-cell title="已购课程" is-link to="/goumai">
      <template slot="title">
        <img id="left_icon" :src="imgurl3" />
        <span class="custom-title">已购课程</span>
      </template>
    </van-cell>
    <van-cell title="优惠劵" value="1张" is-link to="/youhui">
      <template slot="title">
        <img id="left_icon" :src="imgurl6" />
        <span class="custom-title">优惠劵</span>
      </template>
    </van-cell>
    <van-cell title="使用说明" is-link to="/faq">
      <template slot="title">
        <img id="left_icon" :src="imgurl4" />
        <span class="custom-title">使用说明</span>
      </template>
    </van-cell>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  data() {
    return {
      name: "小明",
      checked: true,
      visible: false,
      day:0,
      imgurl: "./../images/账号头像.png",
      imgurl2: "../images/dingyue.png",
      imgurl3: "../images/gouwudai.png",
      imgurl4: "../images/shuqian.png",
      imgurl5: "../images/youhuiquan.png",
      imgurl6: "../images/youhuiquan_1.png"
    };
  },
  methods: {},
  /*computed:mapState({
    day:state=>state.day
  }),*/
  created(){
    if(localStorage.day!=null){
      this.day=localStorage.day;
    }else{
      this.day=0;
    }
  }
};
</script>
<style scoped>
* {
  font-size: 16px;
  margin: 0 auto;
}
#mine {
  background-color: rgb(255, 255, 255);
}
.van-skeleton {
  padding: 0px;
  text-align: center;
}
#parents_name {
  line-height: 54px;
  font-weight: 800;
}
.van-list {
  height: 160px;
  background-image: url("./../images/{C40FFE63-2B2C-114F-01B0-9E405FD1C733}.jpg");
  background-size: cover;
  margin-bottom: 48px;
}
#van-cell {
  background-color: rgb(255, 255, 255);
  width: 95%;
  height: 60%;
  border-radius: 2px;
  box-shadow: 1px 1px 3px rgba(245, 234, 234, 0.9);
  position: relative;
  top: 80px;
}
.van-cell {
  height: 48px;
}
.van-skeleton {
  float: left;
  padding-top: 10px;
}
#right_icon {
  line-height: 72px;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.van-cell > img {
  position: relative;
  left: -200px;
}
#left_icon {
  height: 100%;
}
#dy_icon{
  background-image: url('./../images/dingyue.png');
  background-size: 28px;
  background-repeat: no-repeat;
}
.custom-title {
  position: relative;
  top: -5px;
  padding-left: 4px;
}
.van-skeleton__avatar {
  background-image: url("./../images/touxiang.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>