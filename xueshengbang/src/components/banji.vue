<!--这是班级建设页面-->

<template>
  <div>
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">班级建设</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <div id="banji_part">
      <h3>如何参与班级建设</h3>
      <van-row type="flex">
        <van-col id="banji_icon" span="6" v-for="item in imgurl" :key="item.state">
          <van-image width="48px" height="48px" :src="item.img" />
          <p>{{item.state}}</p>
        </van-col>
      </van-row>
    </div>
    <van-list>
      <van-cell id="banji_name">
        <h3>支持老师建设班级</h3>
        <span>今日还剩{{flower}}/3鲜花</span>
      </van-cell>
      <div
        role="button"
        tabindex="0"
        class="van-cell van-cell--clickable"
        v-for="item in banjilist"
        :key="item.name"
        @click="check(item)"
      >
        <div class="van-cell__title">
          <div id="zs_img">
            <img :src="item.img" />
          </div>
          <div id="zs_title" @click="showPopup">
            <span class="custom-title">
              <strong>{{item.name}}</strong>
              ({{item.identity}})
            </span>
            <div class="van-cell__label">赠送鲜花x{{count}}</div>
          </div>
        </div>
        <div class="van-cell__value">
          <span id="present" @click="present">赠送鲜花</span>
        </div>
      </div>
      <van-popup
        v-model="show2"
        closeable
        close-icon-position="top-left"
        position="right"
        :style="{ width:'100%',height:'100%' }"
      >
        <div class="van-image--round" id="pop_img" style="width: 72px; height: 72px;">
          <img :src="img" class="van-image__img" />
        </div>
        <p class="pop_name">
          {{name}}
          <span>{{identity2}}</span>
        </p>
        <van-tabs class="content">
          <van-tab title="家长赠送记录">
            <div
              role="button"
              tabindex="0"
              class="van-cell van-cell--clickable"
              id="present_list"
              v-for="item in presentlist"
              :key="item.id"
            >
              <div class="van-cell__title">
                <div id="tab_img">
                  <img :src="img2" class="van-image__img" style="height:48px;width:48px" />
                </div>
                <div id="tab_title">
                  <span class="custom-title">
                    <strong>+1</strong>
                  </span>
                  <div class="van-cell__label" style="font-size:14px">{{item.time}}</div>
                </div>
              </div>
              <div class="van-cell__value">
                <strong id="present2">赠送鲜花</strong>
              </div>
            </div>
          </van-tab>
          <van-tab title="总换物品记录">总换记录</van-tab>
        </van-tabs>
        <footer class="pop_footer" @click="present2">赠送鲜花</footer>
      </van-popup>
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "test1",
      show2: false,
      count: 0,
      flower: 3,
      teacher_name: "",
      identity: "",
      identity2: "",
      id:0,
      time:"",
      img: "./../images/touxiang.jpg",
      img2: "../images/鲜花.png",
      imgurl: [
        { img: "./../images/班费icon.png", state: "交班费" },
        { img: "./../images/赠品icon.png", state: "赠送老师礼物" },
        { img: "./../images/评选icon.png", state: "评选优秀班级" }
      ],
      banjilist: [
        { img: "./../images/账号头像.png", name: "小明", identity: "班主任" }
      ],
      presentlist: [],
    };
  },
  methods: {
    showPopup() {
      this.show2 = true;
    },
    present() {
      if (this.flower > 0) {
        this.count++;
        this.flower--;

        Date.prototype.format = function(fmt) {
          var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            S: this.getMilliseconds() //毫秒
          };

          if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              (this.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
          }

          for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
              fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length == 1
                  ? o[k]
                  : ("00" + o[k]).substr(("" + o[k]).length)
              );
            }
          }

          return fmt;
        };

        var now = new Date();
        var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
        var time = new Date().format(
          "yyyy/MM/dd hh:mm:ss"
        );

        this.id++;
        this.time=time;
        let timearr={id:this.id,time:this.time};
        this.presentlist.push(timearr);
      }
    },
    present2() {
      this.present();
    },
    check(item) {
      this.img = item.img;
      this.name = item.name;
      this.identity2 = item.identity;
    }
  }
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
#banji {
  background-color: rgb(246, 246, 246);
}
#banji_part {
  width: 95%;
}
#banji_part > h3 {
  border-left: 2px solid rgb(25, 139, 250);
  padding-left: 6px;
  margin-top: 10px;
}
#banji_name > .van-cell__value--alone > h3 {
  border-left: 2px solid rgb(25, 139, 250);
  padding-left: 6px;
  margin-top: 10px;
  float: left;
}
#banji_name > .van-cell__value--alone > span {
  float: right;
  line-height: 36px;
}
#banji_icon {
  margin-top: 20px;
  text-align: center;
}
#banji_icon > p {
  margin-top: 6px;
  font-size: 14px;
}
.van-cell__value {
  text-align: left;
}
.van-tabs__nav--card .van-tab.van-tab--active {
  background-color: rgb(19, 117, 216);
}
#pop_img {
  text-align: center;
  width: 100%;
  height: 120px;
  margin-top: 60px;
}
.pop_name {
  text-align: center;
  height: 36px;
  line-height: 36px;
}
.content {
  text-align: center;
  width: 95%;
}
.pop_footer {
  position: absolute;
  bottom: 0px;
  height: 60px;
  width: 100%;
  background-color: rgb(29, 32, 187);
  color: white;
  text-align: center;
  line-height: 60px;
  font-size: 16px;
  font-weight: 500;
}
.van-image__img {
  background-repeat: no-repeat;
}
#zs_img {
  float: left;
  margin-right: 10px;
}
#zs_title {
  float: left;
}
#present,
#present2 {
  text-align: right;
  position: absolute;
  right: 0px;
  top: 10px;
  padding: 8px 12px;
  line-height: 100%;
}
#present {
  background-color: dodgerblue;
  color: white;
  border-radius: 20px;
}
#tab_img {
  float: left;
  margin-right: 10px;
}
#present_list {
  background-color: rgb(240, 240, 247);
}
#tab_title {
  text-align: left;
}
</style>