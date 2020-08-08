<!--这是订阅页面-->

<template>
  <div id="dingyue">
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">订阅成长手册</div>
      <div class="van-nav-bar__right"></div>
    </div>

    <div id="dy_shouce" class="van-cell van-cell--center">
      <div class="van-cell__title">
        <span style="font-weight:600;font-size:20px">{{name}}</span>
        <div class="van-cell__label">
          <span class="dy" :class="{hj:ishj,bj:isbj,zs:iszs}">{{dy}}</span>
        </div>
      </div>
      <div>
        <span id="dy_button" @click="showpay">立即订阅</span>
        <van-action-sheet v-model="showpop" :actions="actions" @select="onSelect">
          <p class="youhui">
            <span class="state">订阅立减</span>
            <span style="color:red">10</span>元
          </p>
          <p class="wxpay">
            <span class="pays" @click="pay" :class="{back:isback}">
              <span v-show="flag">微信支付 ￥{{money}}</span>
              <van-icon v-show="success" class="pay_suc" name="passed" color="#07c160" size="32" />
              <van-loading v-show="showloading" size="32px" />
              <span v-show="showloading">加载中...</span>
            </span>
          </p>
          <p class="footer">
            支付完成即视为同意
            <span class="state2">《支付服务协议》</span>
          </p>
        </van-action-sheet>
      </div>
    </div>
    <!--图表-->
    <div class="charts">
      <div class="chart" id="chart">
        <div class="line" id="line"></div>
        <div class="pie" id="pie"></div>
      </div>
    </div>

    <h3 class="dy_title">订阅成长手册即可获得</h3>
    <van-dialog v-model="showdialog" show-cancel-button>
      <h3 class="dl_content">您还没有加入班级，点击入班查看孩子成长手册</h3>
    </van-dialog>
    <van-row class="dytu" type="flex" justify="center">
      <van-col span="6" class="iconfont" @click="line">
        &#xe654;
        <span style="line-height:32px">折线图</span>
      </van-col>
      <van-col span="6" class="iconfont" @click="pie">
        &#xe655;
        <span style="line-height:32px">柱形图</span>
      </van-col>
    </van-row>
    <van-row class="dytu" type="flex" justify="center">
      <van-col span="6" class="iconfont" @click="showPopup">
        &#xe71d;
        <span>全面分析成长手册</span>
      </van-col>
      <van-col span="6" class="iconfont">
        &#xe768;
        <span>订阅专属身份标识</span>
      </van-col>
    </van-row>
    <footer class="dy_footer">
      <p>本成长手册由学生Bang提供</p>
      <p>解释权归学生Bang所有,与老师无关</p>
    </footer>
    <van-popup
      v-model="show2"
      closeable
      close-icon-position="top-left"
      position="right"
      :style="{ width:'100%',height:'100%'}"
    >
      <h2 id="til">本周得分分布情况</h2>
      <div id="bar"></div>
      <div id="pin">
        <h3 id="stat">{{name}}本{{week}}表现最佳</h3>
        <h4>本周总体表现{{exp}},{{enc}}</h4>
      </div>
    </van-popup>
  </div>
</template>
<script>
var echarts = require("echarts");

export default {
  data() {
    return {
      dy: "未订阅",
      option: null,
      showdialog: false,
      showpop: false,
      money: 19.88,
      showloading: false,
      success: false,
      isback: false,
      flag: true,
      show2: false,
      name: "小明",
      week: "",
      exp: "",
      enc: "",
      tatol: 0,
      ishj: false,
      isbj: false,
      iszs: false,
      day: 0,
      actions: [
        { name: "￥30.0/月", number: 30.0 },
        { name: "￥45.0/季", number: 15.0 },
        { name: "￥120.0/年", number: 9.99 }
      ]
    };
  },
  mounted() {
    this.drawline();
  },
  updated() {
    if (this.show2 == true) {
      this.drawline2();
    }
  },
  methods: {
    drawline() {
      var dom = document.getElementById("line");

      var myChart = echarts.init(dom);
      var app = {};
      this.option = {
        xAxis: {
          type: "category",
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [20, 15, 20, 15, 20, 30, 26],
            type: "line"
          }
        ]
      };
      if (this.option && typeof this.option === "object") {
        myChart.setOption(this.option, true);
      }

      var pieChart = echarts.init(document.getElementById("pie"));
      var option2 = {
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ],
            roseType: "angle",
            itemStyle: {
              normal: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      pieChart.setOption(option2);
    },

    showpay() {
      this.showpop = true;
    },
    onSelect(item, index) {
      this.show = false;
      if (item.number == 30.0) {
        this.money = item.number.toFixed(2) - 10;
      } else if (item.number == 15.0) {
        this.money = (item.number * 3).toFixed(2) - 10;
      } else {
        this.money = (item.number * 12).toFixed(2) - 10;
      }
    },
    pay() {
      this.flag = false;
      this.showloading = true;
      let close1 = window.setTimeout(() => {
        this.showloading = false;
        this.isback = true;
        this.success = true;
      }, 3000);
      let close2 = window.setTimeout(() => {
        this.showpop = false;
        this.flag = true;
        this.isback = false;
        this.success = false;
        this.$toast.success("支付成功");

        //会员
        this.tatol += this.money;
        console.log(typeof(this.tatol))
        if (this.tatol >= 0 && this.tatol < 50) {
          this.dy = "黄金会员";
          this.ishj = true;
          this.isbj = false;
          this.iszs = false;
        } else if (this.tatol >= 50 && this.tatol < 150) {
          this.dy = "铂金会员";
          this.isbj = true;
          this.iszs = false;
          this.ishj = false;
        } else {
          this.dy = "钻石会员";
          this.isbj = false;
          this.iszs = true;
          this.ishj = false;
        }
        let tatol=JSON.stringify(this.tatol)
        localStorage.setItem("tatol", tatol);
        //传值到个人中心
        if (this.money == 20.0) {
          this.day += 30;
        } else if (this.money == 35.0) {
          this.day += 90;
        } else {
          this.day += 360;
        }
        let day = this.day;
        this.$store.commit("getday", day);
        localStorage.setItem("day", day);
      }, 3500);
    },
    pie() {
      let chart = document.getElementById("chart");
      chart.style.position = "relative";
      chart.style.left = "-100%";
    },
    line() {
      let chart = document.getElementById("chart");
      chart.style.position = "relative";
      chart.style.left = "0";
    },
    drawline2() {
      var barChart = echarts.init(document.getElementById("bar"));
      // 指定图表的配置项和数据
      var option3 = {
        tooltip: {},
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {},
        series: [
          {
            type: "bar",
            data: [5, 20, 36, 10, 10, 20, 23],
            itemStyle: {
              color: "rgb(27,55,99)"
            },
            emphasis: {
              itemStyle: {
                // 高亮时点的颜色
                color: "rgb(82,165,255)"
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      barChart.setOption(option3);

      var ser = option3.series[0].data;
      let dat = option3.xAxis.data;
      var index = 0;

      //评价
      for (var i = 0; i < ser.length; i++) {
        if (ser[i] > ser[i + 1]) {
          index = i;
        }
        tatol = tatol + parseInt(ser[i]);
      }
      this.week = dat[index];
      var tatol = 0;
      for (var i = 0; i < ser.length; i++) {
        tatol += parseInt(ser[i]);
      }
      if (tatol < 70) {
        this.exp = "很差";
        this.enc = "希望下周表现更好";
      } else if (70 <= tatol < 140) {
        this.exp = "一般";
        this.enc = "还要继续努力";
      } else {
        this.exp = "优秀";
        this.enc = "继续表现";
      }
    },
    showPopup() {
      this.show2 = true;
    }
  },
  created() {
    if (localStorage.day != null || localStorage.tatol != null) {
      let day2 = parseInt(localStorage.day);
      this.day = day2;
      let tatol2=JSON.parse(localStorage.tatol);
      this.tatol = tatol2;
      if (this.tatol >= 0 && this.tatol < 50) {
        this.dy = "黄金会员";
        this.ishj = true;
        this.isbj = false;
        this.iszs = false;
      } else if (this.tatol >= 50 && this.tatol < 150) {
        this.dy = "铂金会员";
        this.isbj = true;
        this.iszs = false;
        this.ishj = false;
      } else if (this.tatol >= 150){
        this.dy = "钻石会员";
        this.isbj = false;
        this.iszs = true;
        this.ishj = false;
      }
    }
  }
};
</script>
<style scoped>
* {
  margin: 0 auto;
}
.van-icon-arrow-left {
  font-size: 18px;
  font-weight: 600;
}
/*#dingyue{
  background-color: rgb(16,27,47);
}
.van-nav-bar{
  background-color: rgb(16,27,47);
}*/
.van-nav-bar__title {
  font-size: 16px;
  font-weight: 600;
}
#dy_shouce {
  background-color: rgb(92, 140, 247);
  width: 95%;
  border-radius: 6px;
  color: white;
  font-size: 16px;
  height: 100px;
}
#dy_button {
  background-color: rgb(243, 182, 26);
  padding: 4px 8px;
  text-align: center;
  border-radius: 2px;
  color: dimgray;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.van-dialog {
  border-radius: 8px;
  height: 120px;
  padding: 28px;
  width: 60%;
}
.dl_content {
  margin-bottom: 30px;
}
.van-popup--bottom.van-popup--round {
  border-radius: 6px 6px 0 0;
}
.van-action-sheet__item {
  height: 60px;
  width: calc(100% / 3 - 12px);
  float: left;
  border: 1px solid rgb(214, 214, 214);
  border-radius: 4px;
  margin: 6px;
  margin-top: 30px;
}
.van-action-sheet__item:hover {
  border: 1px solid rgb(15, 99, 209);
  color: rgb(15, 99, 209);
}
.wxpay {
  text-align: center;
  list-style: 60px;
  height: 80px;
  float: left;
  width: 100%;
  margin: 0 auto;
}
.pays {
  background-color: rgb(24, 167, 24);
  padding: 10px 30%;
  border-radius: 32px;
  position: relative;
  top: 20px;
  color: white;
}
.van-loading {
  display: inline-block;
  color: white;
  position: relative;
  top: -2px;
}
.pay_suc {
  position: relative;
  top: 8px;
}
.back {
  background-color: white;
  padding: 12px 36%;
  border-radius: 32px;
  border: 1px solid rgb(24, 167, 24);
}
.youhui {
  width: 95%;
}
.state {
  color: rgb(15, 99, 209);
}
.footer {
  text-align: center;
  font-size: 14px;
  position: relative;
  top: -14px;
  float: left;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.dytu {
  height: 80px;
  width: 90%;
}
.dytu > .van-col {
  padding: 20px;
  width: 50%;
  font-size: 32px;
  border: 1px solid rgb(0, 0, 107);
  border-radius: 0px;
  background-color: darkblue;
  color: rgb(15, 99, 209);
}
.iconfont > span {
  font-size: 14px;
  float: right;
  width: 72%;
  height: 100%;
  position: relative;
  left: 6px;
  color: rgb(150, 150, 150);
}
.line {
  float: left;
  width: 50%;
  height: 385px;
}
.pie {
  float: left;
  width: 50%;
  height: 385px;
}
.charts {
  width: 100%;
  height: 385px;
  overflow: hidden;
}
.chart {
  width: 200%;
  height: 385px;
  transition: 0.5s;
}
.dy_title {
  text-align: center;
  height: 48px;
  line-height: 48px;
}
.dy_footer {
  text-align: center;
  height: 48px;
  line-height: 18px;
  margin: 20px 0;
  font-size: 12px;
}
#bar {
  width: 100%;
  height: 420px;
  text-align: center;
}
#pin {
  width: 90%;
  height: 120px;
  background-color: black;
  text-align: center;

  border-radius: 6px;
}
#til {
  margin-top: 72px;
  text-align: center;
}
#stat {
  color: white;
  line-height: 20px;
  padding-top: 36px;
  margin-bottom: 6px;
}
#pin > h4 {
  color: rgb(214, 214, 214);
}
.dy {
  padding: 4px 10px;
  border-radius: 4px;
  border: 1px solid rgb(255, 255, 255);
  position: relative;
  top: 10px;
  color: rgb(255, 255, 255);
  font-size: 14px;
  font-weight: 700;
}
.hj {
  color: yellow;
  border: 1px solid yellow;
}
.zs {
  color: rgb(51, 94, 173);
  border: 1px solid rgb(51, 94, 173);
}
.bj {
  color: rgba(255, 248, 248, 0.815);
  border: 1px solid rgba(255, 248, 248, 0.815);
}
</style>