
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app.vue'
Vue.use(Vuex)
const store=new Vuex.Store({
    state:{
        todos:[]
    },
    mutations:{
        GETALL(state,paylad){
            state.todos=paylad
         },
        ADD(state, paylad) {
            state.todos.push(paylad) 
         },
        DEL(state, paylad) {
             state.todos=state.todos.filter(item=>item.id!=paylad)
        },
        CHENGE(state, paylad) {
          state.todos = state.todos.map(item=>{
              if(item.id==paylad.id){
                  return paylad
              }
              return item
          })
        }
    },
    actions:{
        async GETALL({commit}){
            var data=await fetch("/todos").then(data=>data.json())
            commit("GETALL",data)
        },
        //增加
        async ADD({ commit }, paylad) {
           await fetch("/todos",{
                'method':'POST',
                'headers':{'Content-Type':'application/json'},
                'body': JSON.stringify(paylad)
            })
            commit("ADD", paylad)
        },
        //刪除
        async DEL({ commit }, paylad) {
             await fetch("/todos/" + paylad,{
                'method': 'DELETE'
            })
            commit("DEL", paylad)
        },
        async CHENGE({ commit }, paylad) { 
            var data=await fetch("/todos/"+paylad.id, {
                'method': 'PATCH',
                'headers': { 'Content-Type': 'application/json' },
                'body': JSON.stringify({title:paylad.title,done:!paylad.done})
            }).then(data=>data.json())
           commit("CHENGE", data)
        }
    },
    getters:{
        done:(state)=>{
           return state.todos.filter(item=>item.done==true)
          
        },
        undone: (state) => {
           return state.todos.filter(item=>item.done == false)
        }
    }
})
new Vue({
    el:"#app",
    store,
    components:{
        app
    }
})