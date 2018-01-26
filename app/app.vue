<style>
    ul{
        list-style: none;
    }
    li{
        margin: 20px;
    }
   
</style>

<template>
    <div>
        <input type="text" v-model="txt" v-on:keyup.enter="add" >
        <button @click="add">添加</button>
        <ul>
            <li is="todoli" v-for="item in todos" :key="item.id" :item="item"></li>
        </ul>
        <div>
            <button @click="Sshow('ALL')">ALL{{this.$store.state.todos.length}}</button>
            <button @click="Sshow('DONE')">DONE{{this.$store.getters.done.length}}</button>
            <button @click="Sshow('UNDONE')">UNDONE{{this.$store.getters.undone.length}}</button>
        </div>
    </div>
</template>
<script>
import todoli from './components/todoli.vue'
    export default {
        data(){
            return {
                txt:'',
               show:'ALL'
            }
        },
        created(){
            this.$store.dispatch("GETALL")
          console.log(this.$store.state,22222)
        },
        computed:{
            todos(){
                if(this.show=='ALL'){
                    return this.$store.state.todos
                }else if(this.show=='DONE'){
                    return this.$store.getters.done
                }else if(this.show=='UNDONE'){
                    return this.$store.getters.undone
                }
            }
        },
        methods:{
            //增加请求
            add(){
                if(this.txt==''){return}
                //id
                var id=''
                for (var i = 0; i < 8; i++) {
                    id+=~~[Math.random()*8]
                 }
                 
                 var data={title:this.txt,id:id,done:false}
              this.$store.dispatch("ADD",data)
              this.txt=""
            },
            Sshow(TYPE){
                this.show=TYPE
            }
        },
        components:{
            todoli
        }
    }
</script>
