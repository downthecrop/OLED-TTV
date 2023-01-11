import { createRouter, createWebHistory } from 'vue-router'
import Chat from './views/Chat.vue'
import Home from './views/Home.vue'

const baseURL = '/routes-sandbox/'

export const router = createRouter({
  base: baseURL,
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: baseURL+'/:username', component: Chat },
    { path: baseURL, component: Home },
  ],
})
