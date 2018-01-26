<style>
 .cur{
     text-decoration: line-through;
     color: #cccc;
     }
</style>

<template>
        <li>
            <input type="checkbox" :checked="item.done" @click="chage(item)" >
            <span :class="{cur:item.done}" @dblclick="showIn" v-if="showInput">{{item.title}}</span>
            <input @blur="chage(item);showIn()" v-if="!showInput" type="text" v-focus v-model="item.title">
            <button @click="del(item.id)">删除</button>
        </li>
</template>
<script>
    export default{
        props:['item'],
        data(){
            return {
               
                showInput:true
            }
        },
        methods:{
            del(id){
                this.$store.dispatch('DEL',id)
            },
            showIn(){
                    this.showInput=!this.showInput
            },
            chage(item){
                console.log(item)
                this.$store.dispatch("CHENGE",item)
            }
        },
        directives:{
            focus:{
                inserted(el){
                    el.focus()
                }
            }
        }
    }
</script>