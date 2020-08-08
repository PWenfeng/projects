<!--这是使用说明页面-->

<template>
  <div>
    <div class="van-nav-bar van-hairline--bottom">
      <router-link to="/mine">
        <div class="van-nav-bar__left">
          <i class="van-icon van-icon-arrow-left van-nav-bar__arrow" />
        </div>
      </router-link>
      <div class="van-nav-bar__title van-ellipsis">使用说明</div>
      <div class="van-nav-bar__right"></div>
    </div>
    <div id="instructions">
      <van-search v-model="search" placeholder="请输入搜索关键词">{{searchlist}}</van-search>
      <p id="all_qust">全部问题</p>
      <router-link to="ques">
        <div
          role="button"
          tabindex="0"
          class="van-cell van-cell--clickable"
          v-for="item in searchdata"
          :key="item.type"
          @click="handlist(item)"
        >
          <div class="van-cell__title">
            <span>{{item.title}}</span>
          </div>
          <i class="van-icon van-icon-arrow van-cell__right-icon"></i>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      search: "",
      searchdata: "",
      list: [
        { "title": "家长如何提交作业？",
          "qus":"1、找到老师发布的待提交的作业：","resolve":"广播站-待办事项  点击“作业” ",
          "qus2":"2、完成待提交的作业并提交：","resolve2":"点击“提交作业” 按照要求提交作业",
          "other":"如果没有“提交作业”按钮， 可与布置作业老师确认是否发布作业时有勾选“需在线提交”"
        },
        { "title": "家长如何提交打卡？",
           "qus":"1、找到老师发布的待打卡任务","resolve":"广播站-待办事项 点击打卡 ",
          "qus2":"2、找到对应的打卡任务，按照打卡要求，提交打卡","resolve2":"点击“立即打卡” 按照要求提交打卡即可",
        },
        { "title": "如果两个孩子在同一个班级怎么办？",
           "qus":"班级优化大师家长端，一个账号在同一个班级内仅能关注一个孩子。",
          "other":"如果您刚巧自己两个或多个孩子在同一个班级，请用您配偶或者其他亲属的手机号码再注册一个账号，加入该班级中关注另一个孩子就可以了。"
        },
        { "title": "什么是订阅？",
          "qus":"订阅功能是班级优化大师提供的一项增值服务，现已全面升级，每周都会推送孩子的成长手册哦！",
          "resolve":"订阅后，点击得分卡片，查看自己孩子的智能评测报告",
          "qus2":"订阅内容包含：","resolve2":"本周得分比例分布 本周得分曲线 本周最多表扬类型&本周最多待改进类型",
          "other":"家长如果不订阅，也不会影响基础功能的使用（查看老师发送的点评、接受老师发送的公告及消息、与老师私聊等）"
        },
        { "title": "家长如何退出班级？", 
          "qus":"点击【首页】点击顶部的孩子姓名 在弹窗中选择【退出当前班级】",
        },
        { "title": "身份注册错了怎么办？",
          "qus":"如果您是老师，误将自己的身份注册成了家长","resolve":"请将app升级至v2.7.5版本 点击【我】-顶部的【设置】-选择【切换为老师身份】 ",
          "qus2":"如果您是学生家长，勾选了错误的学生姓名","resolve2":"1.先退出当前班级：点击【通讯录】-顶部【班级】-【退出班级】 2.再重新进入一下班级，勾选正确的学生姓名即可",
        },
        { "title": "如果家长绑定错了孩子怎么办？",
           "resolve":"1.退出班级---家长可以点击【首页】中的孩子的姓名，在弹窗中选择退出当前班级",
           "resolve2":"2.勾选正确的孩子姓名，重新加入班级-----在APP首页，点击加入班级，输入班级希希号，勾选您的孩子重新加入班级即可。"
        },
        { "title": "家长能看到班里别的学生的情况吗？",
          "qus":"为了保护孩子的隐私，家长仅能看到自己孩子的在校表现情况",
          "resolve":"只有班级中的老师才有权限查看所有学生的表现情况",
          "qus2":"但是家长可以启动【订阅】功能，可以随时查看到自己孩子在班级的详细分析，以及与班上的同学相比，闪光点与待改进点，并且系统会给出孩子的改进建议",
          "resolve2":"订阅功能为按月订阅，到期不会自动扣费，请放心订阅",        
        },
        { "title": "家长如何加入班级？",
           "qus":"如果您当前未加入任何班级：",
           "resolve":"则可以在课堂首页上点击“加入班级”按钮 在跳出页面中输入6位数字的班级希希号 勾选您孩子的姓名或者手动输入您的孩子即可进入班级",
          "qus2":"如果您已经加入了一个班级：",
          "resolve2":"则可以在课堂首页上点击左上角学生的卡通头像 点击下拉菜单中的添加孩子/加入班级 输入6位数字的班级希希号进入班级",        
        },
      ],

    };
  },
  methods: {
    handlist(item){
      this.$store.commit('setsendlist',{
        sendlist:item
      });
    }
  },
  computed: {
    searchlist() {
      var search = this.search;
      if (search) {
        this.searchdata = this.list.filter(function(product) {
          // 每一项数据
          // console.log(product)
          return Object.keys(product).some(function(key) {
            // 每一项数据的参数名
            // console.log(key)
            return (
              String(product[key])
                // toLowerCase() 方法用于把字符串转换为小写。
                .toLowerCase()
                // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
                .indexOf(search) > -1
            );
          });
        });
      } else if (search.length === 0) {
        this.searchdata = this.list;
      } else {
        return this.searchdata;
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
.van-nav-bar__title {
  font-size: 16px;
  font-weight: 600;
}
#instructions {
  width: 100%;
  height: 685px;
  background-color: rgb(245, 245, 245);
}
#all_qust {
  width: 95%;
  margin: 12px;
  color: rgb(92, 92, 92);
}
.van-cell--clickable {
  font-size: 16px;
}
</style>