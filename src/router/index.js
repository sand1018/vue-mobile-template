import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    redirect: '/home',
    component: () => import('@/layout'),
    children: [{
        path: 'home',
        name: 'home',
        component: () => import('@/views/tabbar/home.vue'),
        meta: {
          title: '首页',
          keepAlive: true
        }
      },
      {
        path: 'mine',
        name: 'mine',
        component: () => import('@/views/tabbar/mine.vue'),
        meta: {
          title: '个人中心',
          keepAlive: true
        }
      },
      {
        path: 'sort',
        name: 'sort',
        component: () => import('@/views/tabbar/sort.vue'),
        meta: {
          title: '分类',
          keepAlive: true
        }
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('@/views/tabbar/cart.vue'),
        meta: {
          title: '购物车',
          keepAlive: true
        }
      }
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
