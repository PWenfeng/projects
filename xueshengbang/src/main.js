import Vue from 'vue'
import app from './app.vue'
import router from './js/routers'
import store from './js/store'
import Vant from 'vant';
import 'vant/lib/index.css';
import '../iconfont/iconfont.css'


Vue.use(Vant);

const vm=new Vue({
    el:"#app",
    router,
    store,
    render:h=>h(app)
});

