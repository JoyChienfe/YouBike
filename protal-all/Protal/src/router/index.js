import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { title: '登入' },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/youbike_portal',
      name: 'portal',
      meta: { title: '入口網站' },
      component: () => import('../views/PortalView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotfoundView.vue'),
      meta: { title: '404頁面', isValidation: false, islogin: false }
    }
  ]
})

const JWTisok = () => {
  const cookieName = []
  const cookies = document.cookie.split(';')
  cookies.forEach((item) => {
    const str = item.split('=')[0].trim()
    if (str === 'youbike' || str === 'youbiketestBack') {
      cookieName.push(str)
    }
  })

  if (cookieName.includes('youbike') || cookieName.includes('youbiketestBack')) {
    return true
  } else {
    return false
  }
}

router.beforeEach((to, form, next) => {
  const notToken = JWTisok()
  if (to.fullPath === '/login') {
    if (notToken) {
      next('/youbike_portal')
    } else {
      next()
    }
  } else if (to.fullPath === '/') {
    if (notToken) {
      next('/youbike_portal')
    } else {
      next('/login')
    }
  } else if (to.fullPath === '/youbike_portal') {
    if (notToken) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title || '報表系統'
  }
})

export default router
