import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import mine from '../components/mine.vue'
import details from '../components/details.vue'
import dingyue from '../components/dingyue.vue'
import banji from '../components/banji.vue'
import goumai from '../components/goumai.vue'
import youhui from '../components/youhui.vue'
import faq from '../components/faq.vue'
import ques from '../components/ques.vue'

const router=new VueRouter({
    routes:[
        {path:"/",redirect:"mine"},
        {path:"/mine",component:mine},
        {path:"/details",component:details},
        {path:"/dingyue",component:dingyue},
        {path:"/banji",component:banji},
        {path:"/goumai",component:goumai},
        {path:"/youhui",component:youhui},
        {path:"/faq",component:faq},
        {path:"/ques",component:ques,meta:{keepAlive:false}}
    ]
});

export default router;