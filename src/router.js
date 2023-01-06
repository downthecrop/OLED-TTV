import { createRouter, createWebHistory } from 'vue-router'
import Chat from './views/Chat.vue'
import Home from './views/Home.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: '/:username', component: Chat },
  { path: '/', component: Home }],
})
