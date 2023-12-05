import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateHouse from "../views/CreateHouse.vue"
import HouseDetail from "../views/HouseDetail.vue"

const routes = [
  {
    path: '/',
    redirect: "/houses",
  }, 
  {
    path: '/houses',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  }, 
  {
    path: '/houses/new',
    name: 'create',
    component: CreateHouse
  }, 
  {
    path: '/houses/:id',
    name: 'houseDetail',
    component: HouseDetail,
    props: true
  }, 

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
