<template>
  <div class="color-pannel" v-show="showColorBoard">
    <section class="color—box"></section>
    <div class="color"></div>
  </div>
</template>

<script>
  export default {
    name: "colorBoard",
    props:{
      showColorBoard : Boolean
    },
    data() {
      return {
        color:''
      }
    },
    created() {

    },
    mounted() {
      this.colorPanel()
    },
    methods:{
      colorPanel() {
        let n = 0;
        const hex = ['FF', 'CC', '99', '66', '33', '00'];
        const row = 20;
        const col = 20;
        let w = 500
        let html = ''
        for (var i = 0; i < 6; i++) {
          for (var j = 0; j < 6; j++) {
            for (var k = 0; k < 6; k++) {
              n++;
              var color = hex[j] + hex[k] + hex[i];
              html += '<span class="item" style="width:30px;height:30px;background:#' + color + '; " data-color="#' + color + '"></span> '
            }
          }
        }
        document.querySelector('.color—box').innerHTML = html
        this.getColor()
      },
      // 获取颜色
      getColor() {
        const me = this;
        document.querySelector('.color—box').addEventListener('touchstart',function (event) {
          const finger = event.changedTouches[0]
          const target = event.target
          if (target.tagName === "SPAN") {
            const bg = target.getAttribute('data-color')
            document.querySelector('.color').style.backgroundColor = bg
            me.color = bg
            me.setColor()
          }
        })
      },
      setColor(){
        this.$emit('getColor',this.color, this)
      }

    }
  }
</script>

<style scoped>
  .color—box{
    width: 500px;
    height: 500px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    font-size: 0;
    align-content: flex-start;
  }

  .color{
    width: 30px;
    height: 30px;
  }
  .color—box span{
    width: 30px;
    height: 30px;
  }
  .color-pannel{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 4;
    left: 0;
    top: 0;

  }
</style>