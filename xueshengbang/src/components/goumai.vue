<!--这是已购课程页面-->

<template>
  <div>
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">已购课程</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <div id="guomai_list" class="van-cell van-cell--center" v-for="item in guomailist" :key="item.course">
      <div id="goumai_title">
        <h2 style="line-height:46px;">{{item.course}}</h2>
        <h4>{{item.grade}}</h4>
      </div>
      <div id="goumai_content">
            <h3>{{item.class}}</h3>
            <p>{{item.state}}</p>
            <span style="color:red">{{item.number}}</span>人正在已报名
            <p id="guomaiprice">￥{{item.price}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            guomailist:[
                {course:"数学",grade:"小学三年级",class:"三年级数学开学抢跑特训班",state:"课上精讲课后实战，学霸赢在开学",number:150,price:19}
            ]
        }
    }
};
</script>
<style scoped>
* {
  margin: 0;
}
.van-icon-arrow-left {
  font-size: 18px;
  font-weight: 600;
}
.van-nav-bar__title {
  font-size: 16px;
  font-weight: 600;
}
#guomai_list{
    height:  100px;
    box-shadow: 2px 2px 4px #f7f6f6bb;
    width: 95%;
    margin:0 auto;
}
#goumai_title{
    background-color: rgb(120, 38, 197);
    display: inline-block;
    height: 100%;
    width: 80px;
    border-radius: 4px;
    text-align: center;
    position: relative;
    right: 10px;
}
#goumai_title>h2{
    line-height:42px;
    border-bottom: 2px solid rgb(245,215,113);
    width: 90%;
    margin: 0 auto;
}
#goumai_title>h4{
    line-height: 30px;
}
#goumai_content{
    margin-left: 0px;
}
#guomaiprice{
    width: 48px;
    height: 24px;
    background-color: red;
    position: absolute;
    right: 0;
    bottom: 10px;
    border-radius: 18px 0 0 18px;
    text-align: center;
    color: white;
}
</style>