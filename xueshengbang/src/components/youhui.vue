<!--这是优惠券页面-->

<template>
  <div>
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">优惠券</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <van-tabs id="youhui_tag">
      <van-tab title="可用">
        <van-swipe-cell v-for="item in youhuilist" :key="item.price">
          <div class="coupons van-cell van-cell--center left-title">
            <div id="youhui_title">
              <h2 style="line-height:46px;">￥{{item.price}}</h2>
              <h4>{{item.state1}}</h4>
            </div>
            <div id="youhui_content">
              <h3>{{item.title}}</h3>
              <p>
                {{item.time}}
                <span style="color:red">仅剩2天</span>
              </p>
              <span>{{item.state2}}</span>
              <p id="youhuiprice">立即使用</p>
            </div>
          </div>
          <van-button
            slot="right"
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="dellist(item)"
          />
        </van-swipe-cell>
      </van-tab>
      <van-tab title="不可用">
        <div
          class="coupons2 van-cell van-cell--center left-title"
          v-for="item in youhuilist"
          :key="item.price"
        >
          <div id="youhui_title">
            <h2 style="line-height:46px;">￥{{item.price}}</h2>
            <h4>{{item.state1}}</h4>
          </div>
          <div id="youhui_content">
            <h3>{{item.title}}</h3>
            <p>
              {{item.time}}
              <span style="color:red">已过期</span>
            </p>
            <span>{{item.state2}}</span>
            <p id="bky_youhuiprice">未使用</p>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      youhuilist: [
        {
          price: 10,
          state1: "满19元可用",
          title: "数学开学抢跑",
          time: "2020.03.16到期 ",
          state2: "三年级数学开学抢跑"
        }
      ]
    };
  },
  methods: {
    dellist(item) {
      this.youhuilist.splice(item, 1);
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
#youhui_tag {
  width: 95%;
  margin: 0 auto;
}
.coupons {
  margin: 0 auto;
  margin-top: 10px;
  width: 95%;
  height: 120px;
  position: relative;
  background: radial-gradient(
        circle at right top,
        transparent 6px,
        rgb(238, 134, 97) 0
      )
      top left / 28% 51% no-repeat,
    radial-gradient(
        circle at right bottom,
        transparent 6px,
        rgb(238, 134, 97) 0
      )
      bottom left / 28% 51% no-repeat,
    radial-gradient(
      circle at left top, 
      transparent 6px,
       #eeeeee 0) 
       top right /  72% 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 6px, #eeeeee 0) bottom
      right / 72% 51% no-repeat;
  filter: drop-shadow(3px 3px 3px rgba(155, 151, 151, 0.3));
}
.coupons2 {
  margin: 0 auto;
  top: 10px;
  width: 95%;
  height: 120px;
  position: relative;
  background: radial-gradient(
        circle at right top,
        transparent 6px,
        rgb(138, 138, 138) 0
      )
      top left / 28% 51% no-repeat,
    radial-gradient(
        circle at right bottom,
        transparent 6px,
        rgb(139, 139, 139) 0
      )
      bottom left / 28% 51% no-repeat,
    radial-gradient(circle at left top, transparent 6px, #eeeeee 0) top right /
      72% 51% no-repeat,
    radial-gradient(circle at left bottom, transparent 6px, #eeeeee 0) bottom
      right / 72% 51% no-repeat;
  filter: drop-shadow(3px 3px 3px rgba(155, 151, 151, 0.3));
}
.left-title{
  padding-left: 0px;
}
#youhui_list {
  height: 100px;
  box-shadow: 2px 2px 4px #f7f6f6bb;
  width: 95%;
  margin: 0 auto;
}
#youhui_title {
  height: 100%;
  width: 30%;
  text-align: center;
  color: white;
}
#youhui_title > h2 {
  font-size: 32px;
}
#youhui_title > h4 {
  line-height: 30px;
}
#youhui_content {
  margin-left: 10px;
  width: 70%;
}
#youhuiprice {
  width: 64px;
  height: 24px;
  background-color: red;
  position: absolute;
  right: 10px;
  bottom: 72px;
  border-radius: 2px;
  text-align: center;
  color: white;
}
#bky_youhuiprice {
  width: 64px;
  height: 24px;
  background-color: rgb(153, 153, 153);
  position: absolute;
  right: 10px;
  bottom: 72px;
  border-radius: 2px;
  text-align: center;
  color: white;
}
.goods-card {
  margin: 0;
  background-color: white;
}

.delete-button {
  height: 120px;
}
</style>