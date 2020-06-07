<template>
  <div class="contaienr">
    <canvas class="canvas"></canvas>
    <ul class="chat-wrap">
      <li class="chat-item" v-for="item in items" :style="{ width: item.width+'px', height:item.height+'px',left:(item.left)+'px',top: item.top+'px'}">{{item.txt}}</li>
    </ul>
    <div class="mask" v-show="isShow">
      <button class="start-game" @click="startGame">开始游戏</button>
    </div>
    <div>{{countdown}}</div>
    <button @click="changeColor">色板</button>
    <!--   色板-->
    <color-board :showColorBoard="hasColorBoard" @getColor="getColor"></color-board>

    <input type="text" v-model="content">
    <button @click="sendContent">发送</button>
  </div>
</template>

<script>
  import axios from 'axios'
  import BXYDboard from "../libs/BXYDBoard/main";
  import colorBoard from '@/components/ColorBoard'
  import Toast from "../libs/toast";
  import CreateChat from "../libs/createChat";
  import ReconnectingWebSocket from '../libs/reconnecting-websocket'

  export default {
    name: "gameRoom",
    data() {
      return {
        BXY: {},
        // 用户id
        uid: '',
        // 秘钥
        token: '',
        // 房间id
        roomId: '',
        // 开始蒙版
        isShow: true,
        // 开始按钮是否可点击 （成员大于1的时候可以开始，就是有人看的时候）默认不可以点击
        roomCount: false,
        role: 0,
        roomstatus: 0,
        countdown: 0,
        //  色板
        hasColorBoard: false,
        setColor: '',
        content: '',
        WIDTH: document.documentElement.clientWidth,
        HEIGHT: document.documentElement.clientHeight,
        items:[]
      }
    },
    components: {colorBoard},
    created() {
      // 房间id
      this.roomId = this.$route.query.roomId
    },
    mounted() {
      const me = this;
      // 用户信息
      const userInfo = JSON.parse(localStorage.getItem('userinfo'))
      if ( !userInfo ) {
        this.$router.push({
          path: '/regist'
        });
        return
      }
      this.BXY = new BXYDboard('.canvas')
      this.uid = userInfo.data.id
      this.token = userInfo.data.token
      this.getRoomId()
      this.BXY.addEventListener("path", function (event) {
        me.ws.send(JSON.stringify({
          "event": 1, "data":
            {
              x: event.moveX,
              y: event.moveY,
              "color": me.setColor,
              "crude": ""
            }
        }))

      });

      this.BXY.addEventListener("startpath", function (event) {
        me.ws.send(JSON.stringify({
          "event": 1, "data":
            {
              x: event.mouseX,
              y: event.mouseX,
              "color": me.setColor,
              "crude": "",
              "is_first": true
            }
        }))
      })
      this.BXY.setWIdth(document.documentElement.clientWidth, document.documentElement.clientHeight - 100)
      this.interval()

    },
    methods: {
      // 开始游戏按钮
      startGame() {
        const me = this;
        // if (!this.roomCount){
        //   alert("房间人数大于1人")
        //   return
        // }
        me.ws.send(JSON.stringify({"event": 2}))
      },
      getRoomId() {
        let m = this
        const roomId = ''
        const url = `ws://192.168.1.3:14001/v1/ws/gdraw?room_id=${roomId || this.roomId}&token=${this.token}&uid=${this.uid}`
        this.ws = new ReconnectingWebSocket(url);
        this.ws.onopen = function () {
          // ws.send("发送数据");
          // console.log("数据发送中...");
        }
        this.ws.onmessage = evt => {
          const event = JSON.parse(evt.data);
          console.log('event', event)
          // event = -2 // 错误，其他错误
          // event = -1 // 错误，参数错误
          // event = 0  // 成员列表
          // event = 1  // 画的时候，传的坐标信息
          // event = 2  // 游戏开始
          // event = 3  // 作答
          // event = 4  // 游戏结束
          // event = 5  // 游戏状态，1.游戏中 0未开始
          // event = 6  // 用户角色 1.房主 2.观众 3 成员
          // event = 7  //历史路径
          switch (event.event) {
            case -2:
              // 禁用画板
              // this.BXY.forbidDraw(true)
              break
            case -1:
              // 禁用画板
              //this.BXY.forbidDraw(true)
              break
            case 0:
              // 禁用画板
              // this.BXY.forbidDraw(true)
              // 房间人数大于1，开始按钮可以点击
              // if (event.data.length > 1 && this.role == 1) {
              //   this.roomCount = true
              //
              // } else {
              //   //
              //   this.roomCount = false
              // }
              break
            case 1:
              // 绘制路径
              // this.BXY.setPath(event.data.x,event.data.y)
              // 禁用画板
              //this.BXY.forbidDraw(true)
              break
            case 2:
              // 禁用画板
              // this.BXY.forbidDraw(true)
              this.countdown = event.data.countdown_second
              break
            case 3:
              // 禁用画板
              // this.BXY.forbidDraw(true)
              break
            case 4:
              // 禁用画板
              // this.BXY.forbidDraw(true)
              break
            case 5:
              // 成员进来 >= 1 的时候可以点开始按钮
              this.roomstatus = event.room_status
              /*
              * room_status 1 游戏进行中 0 等待开始 2 游戏结束
              * */
              if (event.room_status === 0 && event.ready_status === 0) {
                //显示开始按钮
                this.isShow = true
                return
              } else {
                //隐藏开始按钮
                this.isShow = false
              }
              break
            case 6:
              this.role = event.role
              // 启用画板
              if (event.role == 1) {
                this.BXY.forbidDraw(false)
              }
              break
            case 7:
              if (event.data && event.data.length) {
                this.drawHistory(event.data)
              }
              break
          }
        }
      },
      // 绘制历史坐标
      drawHistory(data) {
        for (let i = 0; i < data.length; i++) {
          this.BXY.setPath(data[i].x, data[i].y)
        }
      },
      // 获取子组件传过来的颜色
      getColor(color) {
        this.hasColorBoard = false
        this.setColor = color
        this.BXY.setColor(color)
      },
      // 显示色板
      changeColor() {
        this.hasColorBoard = true
      },
      // 发送按钮
      sendContent() {
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


       setTimeout(()=>{
         for (let i=0;i<this.items.length;i++){
           this.items[i].left = -this.WIDTH
         }
       },100)

        setTimeout(()=>{
          this.items.shift()
        },3000)
        // if (!this.content) {
        //   Toast.message('不能发送为空')
        //   return
        // }
        // CreateChat.sendMessage(this.content)
        this.content = ''

      },


      interval(){
        // 屏幕宽度  按下发送按钮 从右边到左边 滑动过去



        clearInterval(timer)

        // 距左距离
        var timer = setInterval(()=>{
          const chat = document.querySelectorAll('.chat')
          if (chat.length ==0) {
            return
          }
          //console.log('aaa',left)
          for (let i = 0;i < chat.length;i++) {
            let l = chat[i].style.width-= 0.5
            chat[i].style.left = l + 'px'
            //小于屏幕宽度 移除元素，
            if (l <= (-this.WIDTH) && document.querySelectorAll('.chat')) {
              // 清除定时器
              clearInterval(timer)
              document.body.removeChild(chat[i])

            } else {
              // left -= 0.5
              this.interval()
            }

          }
        })

       //  for (let i = 0;i < chat.length;i++) {
       //    left -= 0.5
       //    chat[i].style.left = left + 'px'
       //    //小于屏幕宽度 移除元素，
       //    if (left <= (-this.WIDTH) && document.querySelectorAll('.chat')) {
       //      // 清除定时器
       //      cancelAnimationFrame(globalID);
       //
       //      document.body.removeChild(chat[i])
       //    } else {
       //
       //    }
       //    console.log('i',left)
       //  }
       // let globalID = window.requestAnimationFrame(this.interval)

      }

    }
  }
</script>

<style scoped>
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, .3);
    z-index: 3;
  }
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
  .start-game {
    width: 100px;
    height: 40px;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #f60;
    border-radius: 40px;
    border: 0;
    outline: 0;
    color: #fff;
  }

  .canvas {
    margin: 0;
    padding: 0;
  }


</style>