import Vue from 'vue'
import VueRouter from 'vue-router'
import TodoViews from '../views/TodoViews.vue'
import RegisterViews from '../views/RegisterViews.vue'
import LoginViews from '../views/LoginViews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Todo',
    component: TodoViews
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterViews
  },
  {
    path: '/login',
    name: 'login',
    component: LoginViews
  },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
