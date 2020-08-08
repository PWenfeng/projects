import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        sendlist:[],
        dy:'',
    },
    actions:{
        
    },
    mutations:{
        setsendlist(state,payload){
            state.sendlist=payload.sendlist;
        },
        getday(state,day){
            state.day=localStorage.day;
        }
    },
});
