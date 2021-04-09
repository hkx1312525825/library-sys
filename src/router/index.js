import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Index from '../views/Login/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/manager/index',
    name: 'ManagerIndex',
    component: () => import(/* webpackChunkName: "about" */ '../views/Manager/Index')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to.meta.auth 表示需要做登录健全
  // 不需要的 可以直接next
  if (to.meta.requiresAuth) {
    // store.state.token 表示已经登录 可以直接next
    // 没有登录 跳转到/login 并携带参数redirect 方便登录后直接跳转到to.path
    if (store.state.authorization) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router
