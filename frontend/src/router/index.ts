import Vue from 'vue'
import VueRouter, { RouteConfig, RouterOptions } from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'catchAll',
    redirect: '/main'
  }
] as Array<RouteConfig>

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
} as RouterOptions)

router.beforeEach((to, from, next) => {
  /*
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const loginPath = window.location.pathname
  console.log('###### PAGE SWITCH ######')
  console.log({ requiresAuth }, { loginPath }, { to }, { from }, { next })
  console.log('#########################')
  */
  next()
})

export default router
