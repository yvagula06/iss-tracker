import { createApp } from 'vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'

// Style
import 'bootstrap/scss/bootstrap.scss'
import './styles/main.scss'

// Routing
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('@/pages/CanvasTest.vue') },
    { path: '/cta', component: () => import('@/pages/CanvasTestAr.vue') },
    { path: '/about', component: () => import('@/pages/About.vue') },
  ]
})

// App
const app = createApp(App)
app.use(router)
app.mount('#app')
