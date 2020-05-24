const Event = {
    on: function (eventName, handler) {
        if (!this.handler){
            this.handler = {}
        }
        if (!this.handler[eventName]){
            this.handler[eventName] = []
        }
        this.handler[eventName].push(handler)
    },
    emit: function (eventName){
        if (!this.handler[eventName]){
            return false
        } else {
            for(var i = 0; i<this.handler[eventName].length;i++){
                this.handler[eventName][i](arguments[1])
            }
        }
    }
}
export default Event