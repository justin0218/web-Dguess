<template>
  <div id="app">
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
<style>
  body{
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
</style>

