
class BXYDboard {
    /**
     * @file: BXYDboard.html
     * @method constructor
     * @param { object } element - dom元素
     * @param { function } callback - 获取鼠标按下的坐标，和鼠标移动的坐标
     * @description: 第一个参数是dom元素， 第二个参数是回调函数，接受两个参数，第一个参数相对左，上角的坐标，第二个坐标鼠标移动的坐标，
     * @author: yangwenbo
     * @date: 2020/5/17  11:14
     */
    constructor(element) {
        // 缓存this
        let me = this
        // 获取画布dom元素
        this.element = document.querySelector(element)
            console.log(this.element)
        // 获取画图上下文环境
        this.context = this.element.getContext("2d")
        //给画布添加鼠标按下的事件
        if (this.hasPc()) {
            this.element.onmousedown = function (event) {
                // 兼容处理
                let ev = event || window.event;
                // 获取屏幕坐标（相对左上角x，y）
                let mouseX = ev.offsetX
                let mouseY = ev.offsetY
                // 开启新的路径
                me.context.beginPath()
                //
                // callback && callback({
                //     x: mouseX,
                //     y: mouseY,
                //     event: ev
                // })
                me.emit("path",{mouseX,mouseY})
                // 设置鼠标按下坐标
                me.context.moveTo(mouseX,mouseY)
                // 给画布添加移动事件
                this.onmousemove = function (evet) {
                    let ev = evet || window.event;
                    // 鼠标移动的坐标
                    let moveX = ev.offsetX
                    let moveY = ev.offsetY
                    // 画线
                    me.context.lineTo(moveX,moveY)
                    //
                    me.context.stroke()
                    // callback && callback({
                    //     x: moveX,
                    //     y: moveY,
                    //     event: ev
                    // })
                    me.emit("path",{moveX,moveY})
                }
                this.onmouseup = function () {
                    me.element.onmousemove = null;
                    me.element.onmouseup = null
                }
            }
        } else {
            this.element.addEventListener("touchstart",function (event) {
                // 兼容处理
                let ev = event;
                // 获取屏幕坐标（相对左上角x，y）
                let mouseX = ev.changedTouches[0].clientX
                let mouseY = ev.changedTouches[0].clientY
                // 开启新的路径
                me.context.beginPath()
                // 设置鼠标按下坐标
                me.context.moveTo(mouseX,mouseY)
                // callback && callback(
                //     {
                //         x: mouseX,
                //         y: mouseY
                //     })
                me.emit("startpath",{mouseX,mouseY})
                // 给画布添加移动事件
                this.addEventListener("touchmove",function (eve) {
                    let ev = eve ;
                    // 鼠标移动的坐标
                    let moveX = ev.changedTouches[0].clientX
                    let moveY = ev.changedTouches[0].clientY
                    // 画线
                    me.context.lineTo(moveX,moveY)
                    //
                    // callback && callback(
                    //     {
                    //         x: moveX,
                    //         y: moveY
                    //     })
                    me.emit("path",{moveX,moveY})
                    me.context.stroke()

                })

            })
        }

    }

    getPath(x = 0, y = 0 ){
        console.log('x,x',x,'y',y)
        return {
            x: x,
            y: y
        }
    }
    /**
     * @file: BXYDboard.html
     * @method setWIdth
     * @param {number} w - 数值
     * @param {number} h - 数值
     * @description: 设置画布大小
     * @author: yangwenbo
     * @date: 2020/5/17
     */
    setWIdth(w, h){
        this.element.width = w;
        this.element.height = h;
    }
    /**
     * @param {string} color - 线条的颜色
     * @description:
     * @author: yangwenbo
     * @date: 2020/5/16
     */
    setColor(color) {
        this.context.beginPath()
        this.context.strokeStyle = color
        this.context.closePath()
        this.context.stroke()

    }

    /**
     * @file: BXYDboard.html
     * @method setCrude
     * @param {number} num - 数值
     * @description:  设置线条的粗细
     * @author: yangwenbo
     * @date: 2020/5/17  11:09
     */
    setCrude(num){
        this.context.beginPath();
        this.context.lineWidth = num
        this.context.scale(window.devicePixelRatio, window.devicePixelRatio);
        this.context.closePath()
    }

    /**
     * @file: BXYDboard.html
     * @method : hasPc
     * @return {boolean} flag - 区分pc端还是移动端
     * @description:
     * @author: yangwenbo
     * @date: 2020/5/17  13:06
     */
    hasPc(){
        // 浏览器ua
        const ua = navigator.userAgent
        // 需要区分的客户端
        const agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad"]
        // 返回标识符
        let flag = true;
        for (let i = 0; i < agents.length; i++) {
            if (ua.includes(agents[i])) {
                flag = false
                break
            }
        }
        return flag
    }
    // 绘制
    setPath(x,y) {
        this.context.lineTo(x, y)
        this.context.strokeStyle = "blue"
        this.context.stroke()
    }
    // 禁止绘画
    forbidDraw(is){
       is ? (this.element.style.pointerEvents = 'none') : (this.element.style.pointerEvents = 'auto')
    }

    addEventListener (eventName, handler) {
        // let self = this;
        if (!this.handler){
            this.handler = {}
        }
        if (!this.handler[eventName]){
            this.handler[eventName] = []
        }
        this.handler[eventName].push(handler)
    }

    emit (eventName){
        if (!this.handler[eventName]){
            return false
        } else {
            for(var i = 0; i<this.handler[eventName].length;i++){
                this.handler[eventName][i](arguments[1])
            }
        }
    }


}


export default BXYDboard