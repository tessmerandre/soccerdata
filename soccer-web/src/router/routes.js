
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/temporadas', component: () => import('pages/temporadas.vue') },
      { path: '/times', component: () => import('pages/times.vue') },
      { path: '/estadios', component: () => import('pages/estadios.vue') },
      { path: '/temporadas/partida', component: () => import('pages/partida') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
