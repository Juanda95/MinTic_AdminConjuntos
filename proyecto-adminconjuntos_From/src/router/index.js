import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Inicio_Sesion',
    component: ()=> import('../views/Inicio_Sesion.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('../views/diseño.vue')
  },
  {
    path: '/inicio',
    name: 'Inicio',
    component: () => import('../views/inicio.vue')
  },
  {
    path: '/Contaduria',
    name: 'Contaduria',
    component: () => import('../views/Contaduria.vue')
  },
  {
    path: '/Propietarios',
    name: 'Propietarios',
    component: () => import('../views/Propietarios.vue')
  },
  {
    path: '/tabla',
    name: 'tabla',
    component: () => import('../views/tabla.vue')
  }

]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
