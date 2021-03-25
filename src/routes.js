import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'www.menunuzburada.com' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
  },
  {
    path: '/general',
    meta: { title: 'İşletme Bilgileri' },
    component: () => import('./views/General.vue'),
  },
  {
    path: '/categories',
    meta: { title: 'Kategori Yönetimi' },
    component: () => import('./views/Categories.vue'),
  },
  {
    path: '/products',
    meta: { title: 'Ürün Yönetimi' },
    component: () => import('./views/Products.vue'),
  },
  { path: '/:path(.*)', component: NotFound },
]
