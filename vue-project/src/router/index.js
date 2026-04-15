import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Price from '../pages/Price.vue'
import Contact from '../pages/Contact.vue'
import Admin from '../pages/Admin.vue'
import User from '../pages/User.vue'
import NotFound from '../pages/NotFound.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/price', component: Price },
  { path: '/contact', component: Contact },
  { path: '/admin', component: Admin },
  { path: '/user/:id', component: User },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router