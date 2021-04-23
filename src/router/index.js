import Vue from 'vue'
import store from '@/store'
import VueRouter from 'vue-router'
import Index from '../views/Login/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/User/Index.vue'),
    redirect: 'Home',
    children: [
      {
        path: '/Home',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/User/Home.vue')
      },
      {
        path: '/BookList',
        name: 'BookList',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/User/BookList.vue')
      },
      {
        path: '/BookDetail/:id',
        name: 'BookDetail',
        props: true,
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/User/BookDetail.vue')
      },
      {
        path: '/ReserveCenter',
        name: 'ReserveCenter',
        meta: { requiresAuth: true },
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/User/ReserveCenter.vue')
      }
    ]
  },
  {
    path: '/Login',
    name: 'Index',
    component: Index,
    redirect: 'Login',
    children: [
      {
        path: '/Login',
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
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/BookManage.vue'
              )
          },
          {
            path: '/manager/Index/BookEdit',
            name: 'BookEdit',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/BookEdit.vue'
              )
          },
          {
            path: '/manager/Index/TagManage',
            name: 'TagManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/TagManage.vue'
              )
          },
          {
            path: '/manager/Index/ReserveManage',
            name: 'ReserveManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Book/ReserveManage.vue'
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
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerManage.vue'
              )
          },
          {
            path: '/manager/Index/ManagerAdd',
            name: 'ManagerAdd',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerAdd.vue'
              )
          },
          {
            path: '/manager/Index/ManagerEdit',
            name: 'ManagerEdit',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/ManagerEdit.vue'
              )
          },
          {
            path: '/manager/Index/CarouselManage',
            name: 'CarouselManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/Manager/CarouselManage.vue'
              )
          }
        ]
      },
      {
        path: '/manager/Index/User',
        name: 'User',
        redirect: 'UserManage',
        component: () =>
          import(
            /* webpackChunkName: "about" */ '../views/Manager/User/Index.vue'
          ),
        children: [
          {
            path: '/manager/Index/UserManage',
            name: 'UserManage',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/User/UserManage.vue'
              )
          },
          {
            path: '/manager/Index/UserAdd',
            name: 'UserAdd',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/User/UserAdd.vue'
              )
          },
          {
            path: '/manager/Index/UserEdit',
            name: 'UserEdit',
            component: () =>
              import(
                /* webpackChunkName: "about" */ '../views/Manager/User/UserEdit.vue'
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
