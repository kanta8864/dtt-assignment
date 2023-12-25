import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import HouseDetail from "../views/HouseDetail.vue"
import MyHouses from "../views/MyHouses.vue"
import Favorites from "../views/Favorites.vue"
import HouseForm from "../views/HouseForm.vue"

// specifying all the available routes of the application
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
    path: '/houses/:id',
    name: 'houseDetail',
    component: HouseDetail,
    props: true
  },
  {
    path: '/houses/:type',
    name: 'create',
    component: HouseForm,
    props: true
  },
  {
    path: '/houses/:id/:type',
    name: 'edit',
    component: HouseForm,
    props: true
  },
  {
    path: '/myHouses',
    name: 'myHouses',
    component: MyHouses
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
