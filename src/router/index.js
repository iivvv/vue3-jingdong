// import { nextTick } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
// import HomePage from '../views/home/Home'
// import ShopPage from '../views/shop/Shop'
// import LoginPage from '../views/login/Login'
// import RegisterPage from '../views/register/Register'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/Home')
  },
  {
    path: '/shop/:id',
    name: 'ShopPage',
    component: () => import(/* webpackChunkName: "shop" */ '../views/shop/Shop')
  },
  {
    path: '/cartList',
    name: 'CartList',
    component: () => import(/* webpackChunkName: "cartList" */ '../views/cartList/cartList')
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import(/* webpackChunkName: "order" */ '../views/orderList/OrderList')
  },
  {
    path: '/orderConfirmation/:id',
    name: 'OrderConfirmation',
    component: () => import(/* webpackChunkName: "orderConfirmation" */ '../views/orderConfirmation/OrderConfirmation')
  },
  {
    path: '/personal',
    name: 'Personal',
    component: () => import(/* webpackChunkName: "personal" */ '../views/personal/personal')
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: () => import(/* webpackChunkName: "register" */ '../views/register/Register'),
    beforeEnter (to, from, next) {
      const { isLogin } = localStorage
      isLogin ? next({ name: 'HomePage' }) : next()
    }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/Login'),
    // 已登录就不让回到登录页面
    beforeEnter (to, from, next) {
      // // console.log(to, from)
      // const isLogin = localStorage.isLogin
      // if (isLogin) {
      //   next({ name: 'HomePage' })
      // } else {
      //   next()
      // }
      // 优化写法：解构赋值+三元
      const { isLogin } = localStorage
      isLogin ? next({ name: 'HomePage' }) : next()
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守卫设置
// 每次路由跳转之前
// to是去哪个目录，from是从哪个目录
router.beforeEach((to, from, next) => {
  // // console.log(to, from)
  // // 用isLogin判断是否已经登录
  // const isLogin = localStorage.isLogin
  // // 避免死循环
  // if (isLogin || to.name === 'Login') {
  //   next()
  // } else {
  //   next({ name: 'Login' })
  // }
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'LoginPage' || name === 'RegisterPage');
  (isLogin || isLoginOrRegister) ? next() : next({ name: 'LoginPage' })
})

export default router
