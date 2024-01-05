import { defineStore } from "pinia"
import router from '../router'
import api from '../services/api.js'

export const useHouseStore = defineStore("houseStore", {
  state: () => ({
    // stores a list of houses
    houses: [],
    // stores a list of ids of houses that are marked as favorites
    favList: []
  }),
  getters: {
    // get the size of the listing after filtering by search text 
    getFilteredListSize: (state) => {
      return (text) => {
        return state.houses.filter(x => x.location.street.toLowerCase().includes(text.toLowerCase())
          || x.location.city.toLowerCase().includes(text.toLowerCase())).length
      }
    },
    // get the houses that are marked as favorite
    getFavs() {
      return this.houses.filter(x => this.favList.includes(x.id))
    },
    // get all the houses posted by user
    getMyListings() {
      return this.houses.filter(x => x.madeByMe)
    },


  },
  actions: {
    // sort the houses in the ascending order of price. filter is also considered
    sortByPrice(houses) {
      return houses.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
    },
    // sort the houses in the ascending order of size. filter is also considered
    sortBySize(houses) {
      return houses.sort((a, b) => (a.size > b.size) ? 1 : ((b.size > a.size) ? -1 : 0))
    },
    // filter the house listing by search text 
    filterByText(searchText) {
      return this.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase())
        || x.location.city.toLowerCase().includes(searchText.toLowerCase()))
    },
    // update houses state with the latest fetched data 
    updateHouses(houses) {
      // store fetched data in the store 
      this.houses = houses
    },
    // function dealing with route direct
    routeDirect(routeName, params) {
      if (!params) router.push({ name: routeName })
      router.push({ name: routeName, params: params })
    },
    // fetch all the houses from House API
    async fetchHouses() {
      const houses = await api.fetchHouses()
      this.updateHouses(houses)
    },
    // get information about one specific house 
    async getOneHouse(id) {
      return await api.getOneHouse(id)
    },
    // add house and send a post request to House API
    async addHouse(body, fileName) {
      const newId = await api.addHouse(body, fileName)
      if (newId != -1) {
        await this.fetchHouses()
        this.routeDirect("houseDetail", { id: newId })
        alert("House listing posted!")
        return true
      } else {
        return false
      }
    },
    // deleter house and send delete request to House API
    async deleteHouse(houseId) {
      await api.deleteHouse(houseId)
      if (this.favList.includes(houseId)) {
        this.favList.splice(this.favList.indexOf(houseId), 1)
      }
      await this.fetchHouses()
      this.routeDirect("home")
    },
    // update house and send post request to House API
    async updateHouse(houseId, body, fileName) {
      await api.updateHouse(houseId, body, fileName)
      await this.fetchHouses()
      this.routeDirect("houseDetail", { id: houseId })
      alert("House listing updated!")
    },
    // add house id into the favList if id does not already exist, otherwise remove it from the list 
    toggleFav(id) {
      if (!this.favList.includes(id)) {
        this.favList.push(id)
      } else {
        this.favList.splice(this.favList.indexOf(id), 1)
      }
    }
  },
  persist: true
})