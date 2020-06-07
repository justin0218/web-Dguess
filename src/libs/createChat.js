// 创建聊天内容
/**
 * @author: yangwenbo
 * @param {string} element - 输入框的文字
 * @description: 每条文字都会创建一个div 滑动到屏幕不可见时移除
 * @date: 2020/6/7  20:09
 */
class CreateChat {
  constructor() {
    this.interval.bind(this)
  }

  setStyle() {
    // chatWrap.style.transition = 'all .1s ease-in-out';
  }
  sendMessage(element) {
    this.chatWrap = document.createElement('section')
    // 屏幕高度 发弹幕，距离顶部的时候用
    this.HEIGHT = document.documentElement.clientHeight
    // 屏幕宽度  按下发送按钮 从右边到左边 滑动过去
    this.WIDTH = document.documentElement.clientWidth
    this.chatWrap.className = 'chat'
    // 高度
    this.chatWrap.style.height = '30px';
    // 脱离文档流
    this.chatWrap.style.position = 'absolute';
    // 行高
    this.chatWrap.style.lineHeight = this.chatWrap.style.height;
    // 最小宽度
    this.chatWrap.style.minWidth = '100px';
    // 背景色
    this.chatWrap.style.backgroundColor = 'rgba(0,0,0,.4)'
    // 圆角
    this.chatWrap.style.borderRadius = this.chatWrap.style.height;
    const header = `<header></header><div style="padding: 0 5px">${element}</div>`
    // 添加到容器里
    this.chatWrap.innerHTML = header
    // 添加到body里
    document.body.appendChild(this.chatWrap)
    this.left = this.WIDTH
    this.index = Math.floor(Math.random() * 10 + 1)
    this.top = this.index * ((this.HEIGHT - 400) / 10)
    // 如果小于  100 就等于100 不能盖住头部
    this.chatWrap.style.top =   this.top < 100 ? 100 : this.top + 'px';
    this.chatWrap.style.left = this.WIDTH + 'px'
    // clearInterval(time)
    // this.interval()
  }
  interval(){
    const me = this
    this.left -= 0.5
    console.log('aaa',me.left)
    // 距左距离
    me.chatWrap.style.left = me.left + 'px'
    //小于屏幕宽度 移除元素，
    if (me.left <= (-me.WIDTH) && document.querySelector('.chat')) {
      // 清除定时器
      // clearInterval(time)
      // document.body.removeChild(this.chatWrap)
    }
    window.requestAnimationFrame(this.interval)
  }

}
export default new CreateChat