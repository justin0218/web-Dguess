<template>
    <div>
        <div>我是home vue</div>
        <canvas id="canvas"></canvas>
        <button >创建房间</button>
    </div>
</template>
<script>
    import BXYDboard from "../libs/BXYDBoard/main";
    import protobuf from '../libs/proto/ws_pb'
    import Event from "../libs/g";
    export default {
        name: "home",
        data (){
            return {
                ws: null,
                roomId: 0,
                BXY:{}
            }
        },
        created() {
            const url = this.$route.query
            // const {uid, roomid} = url
            this.establish(url.uid, url.roomid)
            console.log('url',url.roomid)

        },
        mounted() {
            const me = this;
            this.BXY =  new BXYDboard("canvas")
            this.BXY.addEventListener("path",function ( event ) {
                let {x, y} = event;
                console.log('xxxx',event)
                Event.emit("test",JSON.stringify(event))
                me.sendws(x, y)
            })

            // const obj = BXY.getPath()
            this.BXY.setWIdth(document.documentElement.clientWidth, document.documentElement.clientHeight)
            var ws_msg_base = {
                event:2,
                data:gdraw_content
            }
            var gdraw_content = {
                x:1,
                y:2
            }
        },
        methods: {
            sendws(x,y){
                const wsMsgBase = new protobuf.ws_msg_base()
                wsMsgBase.setEvent(2)
                const wsMsgBase2 = new protobuf.gdraw_content()
                wsMsgBase2.setX(x)
                wsMsgBase2.setY(y)
                wsMsgBase.setData(wsMsgBase2.serializeBinary())
                this.ws.send(wsMsgBase.serializeBinary())
            },
            establish(uid, roomid) {
                let m = this
                const url = `ws://192.168.1.3:14001/v1/ws/gdraw?uid=${uid}&room=${roomid}`
                this.ws = new WebSocket(url);
                this.ws.onopen = function () {
                    // ws.send("发送数据");
                    // alert("数据发送中...");
                }
                this.ws.onmessage = function (evt) {
                    const data = evt.data
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(data);

                    reader.onload = async (evt) => {
                        if (evt.target.readyState == FileReader.DONE) {
                            let data2 = new Uint8Array(evt.target.result);
                            let message = protobuf.ws_msg_base.deserializeBinary(data2);
                            let result = message.toObject();
                            switch (result.event) {
                                case 3:
                                    let response = protobuf.gdraw_content.deserializeBinary(result.data);
                                    //this.roomId = response.toObject();
                                    // console.log('data', response.toObject())
                                    break
                                case 2:

                                    let responsew = protobuf.gdraw_content.deserializeBinary(result.data);
                                    //this.roomId = ;
                                    console.log('data', responsew.toObject())
                                    let t =  responsew.toObject()
                                    console.log('yyyyy',t)
                                    m.BXY.setPath(t.x, t.y)
                                    break

                            }
                        }
                    }

                }
            },
            readBuff(dataBuff){
                let reader = new FileReader();
                reader.readAsArrayBuffer(dataBuff);
                reader.onload = function () {

                }
            }
        }
    }
</script>

<style scoped>

</style>