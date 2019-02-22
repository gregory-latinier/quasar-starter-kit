const routes = [
  {
    path: '/',
    component: () => import('layouts/anonymous.vue'),
    children: [
      { path: '', component: () => import('pages/index.vue') },
      { path: '/login', component: () => import('pages/login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/authenticated.vue'),
    meta: { auth: true },
    children: [
      {
        path: '/authenticated',
        component: () => import('pages/authenticated.vue')
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/404.vue')
  })
}

export default routes
