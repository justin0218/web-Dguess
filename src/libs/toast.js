class Toast {
  constructor() {
    this.createDom();
    this.createStyle()
    this.append()

  }

  createDom() {
    this.ele = document.createElement('div')
  }
  createStyle() {
    this.ele.className = 'toast'
    this.ele.style.width = '200px'
    this.ele.style.height = '40px'
    this.ele.style.height = '40px'
    this.ele.style.textAlign = 'center'
    this.ele.style.borderRadius = this.ele.style.height;
    this.ele.style.lineHeight = this.ele.style.height;
    this.ele.style.position = 'fixed'
    this.ele.style.top = '50%'
    this.ele.style.left = '50%'
    this.ele.style.marginLeft = -200 / 2+'px'
    this.ele.style.marginTop = -40 / 2 + 'px'
    this.ele.style.transform = 'scale(0)'
    this.ele.style.transformrigin = 'transform-origin：0 0'


    this.ele.style.backgroundColor = 'rgba(0,0,0,0.4)';
    this.ele.style.transition = 'all 1s'
  }
  append() {
    document.body.appendChild(this.ele)
  }
  // 设置内容
  message(html){
    // this.ele.style.display = 'block'
    this.ele.style.transform = 'scale(1)'
    this.ele.innerHTML = html;
    setTimeout( ()=> {
      // this.ele.style.display = 'none'
      this.ele.style.transform = 'scale(0)'
    },2000)
  }

}
export default new Toast