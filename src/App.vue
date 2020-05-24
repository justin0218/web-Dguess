<template>
  <div id="app">
    <div>我是app vue：{{d}}}</div>
    <router-view></router-view>
  </div>
</template>
<script src="./libs/reconnecting-websocket.js"></script>
<script>
  import Event from "./libs/g";
  export default {
    name: 'App',
    data(){
      return {
        d:""
      }
    },
    created() {
      let self = this
      Event.on("test",function (res) {
        self.d = res
      })
    }
  }
</script>

