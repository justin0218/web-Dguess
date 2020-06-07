<template>
    <button @click="joinRoom">进入房间</button>
</template>

<script>
    export default {
        name: "roomList",
      data(){
          return{

          }
      },
      methods:{
          // 进入房间
          joinRoom() {
            this.$router.push({
              path: '/gameRoom'
            })
          }
      }
    }
</script>

<style scoped>

</style>