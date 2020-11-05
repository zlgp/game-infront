import Vue from 'vue'
import VueRouter from 'vue-router'
const index = () => import('@v/index/index.vue')
const center = () => import('@v/center/center.vue')
const games = () => import('@v/games/games.vue')
const detail = () => import('@v/detail/detail.vue')



const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: index
  },
  {
    path: '/index',
    name: 'index',
    meta: {
      title: '首页'
    },
    component: index
  },
  {
    path: '/center',
    name: 'center',
    meta: {
      title: '个人中心'
    },
    component: center
  },
  {
    path: '/games',
    name: 'games',
    meta: {
      title: '全部游戏'
    },
    component: games
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      title: '详情'
    },
    component: detail
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.use(VueRouter)
// 路由守卫
router.beforeEach((to, from, next) => {
  let uerInfo = JSON.parse(localStorage.getItem('uerInfo'))

  let token
  if (uerInfo == null) {
    token = null
  } else {
    token = uerInfo.token
  }
  if (to.path == '/center' && token == null) {
    Vue.prototype.$message({
      type: "error",
      message: "请先登录"
    })
    next('/index');
  } else {
    next()
  }

})

export default router
