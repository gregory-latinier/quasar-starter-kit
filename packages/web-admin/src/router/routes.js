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
        path: '/dashboard',
        component: () => import('pages/dashboard.vue')
      },
      {
        path: '/users/list',
        component: () => import('pages/users/list/list.vue')
      },
      {
        path: '/users/new',
        component: () => import('pages/users/create-update/create-update.vue')
      },
      {
        path: '/users/{id}',
        component: () => import('pages/users/create-update/create-update.vue')
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
