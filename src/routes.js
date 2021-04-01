import Home from './views/Home.vue'
import About from './views/About.vue'
import NotFound from './views/NotFound.vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: '/', component: Home, meta: { title: 'menunuzburada.com' } },
  {
    path: '/about',
    meta: { title: 'About' },
    component: About,
  },
  {
    path: '/menus',
    meta: { title: 'İşletme Bilgileri' },
    component: () => import('./views/Menus.vue'),
  },
  {
    path: '/categories/:alias',
    meta: { title: 'Kategori Yönetimi' },
    component: () => import('./views/Categories.vue'),
  },
  {
    path: '/products/:alias',
    meta: { title: 'Ürün Yönetimi' },
    component: () => import('./views/Products.vue'),
  },
  { path: '/:path(.*)', component: NotFound },
]
