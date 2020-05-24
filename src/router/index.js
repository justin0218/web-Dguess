import VueRouter from 'vue-router'

import Home from '@/views/home'

const router = new VueRouter({
    routes:[
        { path: '/home', component: Home},
        { path: '/list', component: Home}
    ]
})

export default router;