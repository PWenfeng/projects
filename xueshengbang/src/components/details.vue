<!--这是个人信息页面-->

<template>
  <div id="details">
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">个人信息</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <van-cell title="账号" value="123****6789" />
    <van-cell title="名字" is-link :value="username" @click="showPopup" />
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <div class="van-nav-bar van-hairline--bottom">
        <div class="van-nav-bar__left" @click="close">取消</div>
        <div class="van-nav-bar__title van-ellipsis">姓名</div>
        <div class="van-nav-bar__right" @click="save">保存</div>
      </div>
      <van-field class="input_name" v-model="name" placeholder="请输入用户名" />
    </van-popup>
    <van-cell title="所在地" is-link :value="local" readonly clickable @click="showPicker = true" />
    <van-popup v-model="showPicker" position="bottom">
      <van-picker show-toolbar title="选择地区" :columns="columns" @change="onChange" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
    <van-cell title="微信号" value="学生Bang" />
    <van-cell id="instru_tag" title="切换为老师身份" is-link />
  </div>
</template>
<script>
import Vue from 'vue';
import { Picker } from 'vant';

Vue.use(Picker);

const citys = {
  浙江: [
    "杭州市",
    "宁波市",
    "温州市",
    "嘉兴市",
    "湖州市",
    "绍兴市",
    "金华市",
    "衢州市",
    "舟山市",
    "台州市",
    "丽水市"
  ],
  福建: [
    "福州市",
    "厦门市",
    "莆田市",
    "三明市",
    "泉州市",
    "漳州市",
    "南平市",
    "龙岩市",
    "宁德市"
  ],
  安徽: [
    "合肥市",
    "芜湖市",
    "蚌埠市",
    "淮南市",
    "马鞍山市",
    "淮北市",
    "铜陵市",
    "安庆市",
    "黄山市",
    "滁州市",
    "阜阳市",
    "宿州市",
    "六安市",
    "亳州市",
    "池州市",
    "宣城市"
  ],
  吉林: [
    "长春市",
    "吉林市",
    "四平市",
    "辽源市",
    "通化市",
    "白山市",
    "松原市",
    "白城市",
    "延边"
  ],
  河南: [
    "郑州市",
    "开封市",
    "洛阳市",
    "平顶山市",
    "安阳市",
    "鹤壁市",
    "新乡市",
    "焦作市",
    "济源市",
    "濮阳市",
    "许昌市",
    "漯河市",
    "三门峡市",
    "南阳市",
    "商丘市",
    "信阳市",
    "周口市",
    "驻马店市"
  ],
  湖北: [
    "武汉市",
    "黄石市",
    "十堰市",
    "宜昌市",
    "襄阳市",
    "鄂州市",
    "荆门市",
    "孝感市",
    "荆州市",
    "黄冈市",
    "咸宁市",
    "随州市",
    "恩施",
    "仙桃市",
    "潜江市",
    "天门市",
    "神农架林区"
  ],
  四川: [
    "成都市",
    "自贡市",
    "攀枝花市",
    "泸州市",
    "德阳市",
    "绵阳市",
    "广元市",
    "遂宁市",
    "内江市",
    "乐山市",
    "南充市",
    "眉山市",
    "宜宾市",
    "广安市",
    "达州市",
    "雅安市",
    "巴中市",
    "资阳市",
    "阿坝",
    "甘孜",
    "凉山"
  ]
};

export default {
  data() {
    return {
      showPicker: false,
      local: "",
      columns: [{ values: Object.keys(citys) }, { values: citys["浙江"] }],
      show: false,
      name: "",
      username: "",
      local2:[''],
    };
  },
  methods: {    
    onChange(picker, values) {
      this.local2.push(this.local)              
      picker.setColumnValues(1, citys[values[0]]);
      this.local = values[0] + " " + values[1];
      let local = this.local;
      localStorage.setItem("local", local);
    },
    onCancel(){
      this.local=this.local2[0];
      this.local2=[''];
      let local = this.local;
      
      localStorage.setItem("local", local);
      this.showPicker=false;            
    },
    onConfirm(){
      this.showPicker=false;
      this.local2=[''];
    },
    showPopup() {
      (this.name = ""), (this.show = true);
    },
    close() {
      this.show = false;
    },
    save() {
      if (this.name != "") {
        this.username = this.name;
        this.show = false;
        let username = this.username;
        localStorage.setItem("username", username);
      } else {
        this.$toast({
          message: "输入内容不能为空！",
          icon: "warning-o",
        });
      }
    }
  },
  created() {
    if (localStorage.username != null || localStorage.local != null) {
      this.username = localStorage.username; 
      this.local = localStorage.local;
    }
  }
};
</script>
<style scoped>
#details {
  background-color: rgb(246, 246, 246);
}
* {
  font-size: 16px;
}
#instru_tag {
  margin-top: 10px;
}
.van-cell:not(:last-child)::after {
  border-bottom: 0px;
}
.van-icon-arrow-left {
  font-size: 18px;
  font-weight: 600;
}
.van-nav-bar__title {
  font-size: 16px;
  font-weight: 600;
}
.van-popup {
  background-color: rgb(245, 245, 245);
}
.input_name {
  margin-top: 10px;
}
</style>