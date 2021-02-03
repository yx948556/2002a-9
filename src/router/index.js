import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import mobil from './mobile'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import('../views/users'),
    children:[
      {
        path: '/one',
        name: 'One',
        component: () => import('../views/one/one.vue')
      },
      {
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/goods/goods.vue')
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import('../views/goods/detail')
      },
    ]
  },
 

  // ...mobil
]


const router = new VueRouter({
  routes
})

export default router