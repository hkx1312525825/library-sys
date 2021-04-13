import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Index from '../views/Login/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: 'Login',
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Login/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Login/Register.vue')
      }
    ]
  },
  {
    path: '/manager/Index',
    name: 'ManagerIndex',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Manager/Index'),
    redirect: '/manager/Index/Book',
    children: [
      {
        path: '/manager/Index/Book',
        name: 'Book',
        redirect: 'BookManage',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/Manager/Book/Index.vue'
          ),
        children: [
          {
            path: '/manager/Index/BookManage',
            name: 'BookManage',
            // redirect: 'BookManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/BookManage.vue'
              )
          },
          {
            path: '/manager/Index/BookEdit',
            name: 'BookEdit',
            // redirect: 'BookManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/BookEdit.vue'
              )
          }
        ]
      },
      {
        path: '/manager/Index/Manager',
        name: 'Manager',
        redirect: 'ManagerManage',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/Manager/Manager/Index.vue'
          ),
        children: [
          {
            path: '/manager/Index/ManagerManage',
            name: 'ManagerManage',
            // redirect: 'BookManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerManage.vue'
              )
          },
          {
            path: '/manager/Index/ManagerAdd',
            name: 'ManagerAdd',
            // redirect: 'BookManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerAdd.vue'
              )
          },
          {
            path: '/manager/Index/ManagerEdit',
            name: 'ManagerEdit',
            // redirect: 'BookManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerEdit.vue'
              )
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  // to.meta.auth 表示需要做登录健全
  // 不需要的 可以直接next
  if (to.meta.requiresAuth) {
    // debugger
    console.log(store.state.token)
    // store.state.token 表示已经登录 可以直接next
    // 没有登录 跳转到/login 并携带参数redirect 方便登录后直接跳转到to.path
    if (store.state.token) {
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
