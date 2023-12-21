import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        // stores a list of houses
        houses: [],
        // stores a list of ids of houses that are marked as favorites
        favList: []
    }),
    getters: {
        // get the house object by its id
        getById: (state) => {
            return (id) => {
                return state.houses.find(x => x.id == id)
            }
        },
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
        // fetch all the houses from House API
        async fetchHouses() {
            try {
                // private API key is not secured but this is just so that reviewers can use it without configuring anything 
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
                // function execution is paused until the promise is resolved
                let data = await axios.get("https://api.intern.d-tt.nl/api/houses")
                if (data.status !== 200) {
                    throw Error("No house was found")
                } else {
                    this.houses = data.data
                }
            } catch (e) {
                alert(e)
            }
        },
        // add house and send a post request to House API
        async addHouse(body, fileName) {
            try {
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3'
                let data = await axios.post("https://api.intern.d-tt.nl/api/houses", body)
                const formData = new FormData()
                formData.append("image", fileName.value)
                await axios.post(`https://api.intern.d-tt.nl/api/houses/${data.data.id}/upload`, formData)
                await this.fetchHouses()
                router.push({ name: 'houseDetail', params: { id: data.data.id } })
                alert("House listing posted!")
                return true
            } catch (e) {
                alert(e)
                return false
            }
        },
        // deleter house and send delete request to House API
        async deleteHouse(houseId) {
            try {
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
                await axios.delete("https://api.intern.d-tt.nl/api/houses/" + houseId)
                if (this.favList.includes(houseId)) this.favList.splice(this.favList.indexOf(houseId), 1)
                await this.fetchHouses()
                router.push({ name: 'home' })
            } catch (e) {
                alert(e)
            }
        },
        // update house and send post request to House API
        async updateHouse(houseId, body, fileName) {
            try {
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
                await axios.post("https://api.intern.d-tt.nl/api/houses/" + houseId, body)
                // we do not update house photo if user did not submit a new image
                if(fileName) {
                    const formData = new FormData()
                    formData.append("image", fileName)
                    await axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, formData)
                }
                await this.fetchHouses()
                alert("House listing updated!")
            } catch (e) {
                alert(e)
            }
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