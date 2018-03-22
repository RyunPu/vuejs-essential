export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/auth/register',
    name: 'Register',
    component: () => import('@/views/auth/Register')
  },
  {
    path: '/auth/login',
    name: 'Login',
    component: () => import('@/views/auth/Login')
  },
  {
    path: '/articles/create',
    name: 'Create',
    component: () => import('@/views/articles/Create'),
    meta: { auth: true }
  },
  {
    path: '/column',
    name: 'Column',
    component: () => import('@/views/articles/Column'),
    children: [
      {
        path: '/articles/:articleId/content',
        name: 'Content',
        component: () => import('@/components/layouts/Content.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/'
  }
]
