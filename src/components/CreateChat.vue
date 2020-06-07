<template>
  <ul class="chat-wrap">
    <li class="chat-item" v-for="item in items" :style="{ width: item.width+'px', height:item.height+'px',left:(item.left)+'px',top: item.top+'px'}">{{item.txt}}</li>
  </ul>
</template>

<script>
  export default {
    name: "Toast",
    props:{
      item: Array
    },
    data() {
      return{
        html: '',
        items:[],
        WIDTH: document.documentElement.clientWidth,
        HEIGHT: document.documentElement.clientHeight,
      }
    },
    methods:{
      sendContent(){
        const index = Math.floor(Math.random() * 10 + 1)
        const top = index * ((this.HEIGHT - 400) / 10)
        this.items.push({
          "width":300,
          "height":30,
          "txt":"hello",
          "duration":3000,
          "left": this.WIDTH,
          top: top< 100 ? 100 : top
        })

      }
    }
  }
</script>

<style scoped>
  .chat-wrap {
    width: 100%;
    height: 500px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
  }
  .chat-item {
    position: absolute;
    left: 375px;
    top: 90px;
    transition: 5s all;
    list-style: none;
  }
</style>