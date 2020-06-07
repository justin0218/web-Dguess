import VueRouter from 'vue-router'
// 首页
import Home from '@/views/home'
// 注册
import Regist from '@/views/regist'
// 房间列表
import RoomList from '@/views/roomList'
// 游戏房间
import GameRoom from '@/views/gameRoom'

const router = new VueRouter({
    routes:[
        { path: '/home', component: Home},
        { path: '/list', component: Home},
        { path: '/regist', component: Regist},
        { path: '/roomList', component: RoomList},
        { path: '/gameRoom', component: GameRoom},

    ]
})

export default router;