import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import CreateHouse from "../views/CreateHouse.vue"
import HouseDetail from "../views/HouseDetail.vue"
import EditHouse from "../views/EditHouse.vue"
import MyHouses from "../views/MyHouses.vue"
import Favorites from "../views/Favorites.vue"

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
    path: '/houses/new',
    name: 'create',
    component: CreateHouse
  },
  {
    path: '/houses/:id/edit',
    name: 'edit',
    component: EditHouse,
    props: true
  },
  {
    path: '/houses/:id',
    name: 'houseDetail',
    component: HouseDetail,
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
