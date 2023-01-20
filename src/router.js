import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/dashboard/pages/Login'),
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        {
          name: 'Dashboard',
          path: '/',
          component: () => import('@/views/dashboard/pages/Routes'),
        },
        // Dashboard
        {
          name: 'Dashboard',
          path: '/dashboard',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        {
          name: 'Analasys',
          path: '/Analasys',
          component: () => import('@/views/dashboard/pages/Analasys'),
        }, {
          name: 'כיוונים',
          path: '/Routes',
          component: () => import('@/views/dashboard/pages/Routes'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})
