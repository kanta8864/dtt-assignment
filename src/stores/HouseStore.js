import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
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
        getFavs() {
            return this.houses.filter(x => this.favList.includes(x.id))
        },
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
        filterByText(searchText) {
            console.log(this.houses.map( x=> x.location.city))
            console.log(searchText)
            return this.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase())
            || x.location.city.toLowerCase().includes(searchText.toLowerCase()) )
        },
        async fetchHouses() {
            try {
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
        async addHouse(body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3'
            let data = await axios.post("https://api.intern.d-tt.nl/api/houses", body)
            const formData = new FormData()
            formData.append("image", fileName.value)
            await axios.post(`https://api.intern.d-tt.nl/api/houses/${data.data.id}/upload`, formData)
            await this.fetchHouses()
            router.push({ name: 'houseDetail', params: { id: data.data.id } })
        },
        async deleteHouse(houseId) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            await axios.delete("https://api.intern.d-tt.nl/api/houses/" + houseId)
            if(this.favList.includes(houseId)) this.favList.splice(this.favList.indexOf(houseId), 1)
            this.fetchHouses()
        }, 
        async updateHouse(houseId, body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            await axios.post("https://api.intern.d-tt.nl/api/houses/" + houseId, body)
            const formData = new FormData()
            formData.append("image", fileName.value)
            await axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, formData)
            this.fetchHouses()
        },
        toggleFav(id) {
            if(!this.favList.includes(id)){
                this.favList.push(id)
            } else {
                this.favList.splice(this.favList.indexOf(id), 1)
            }
        }
    },
    persist: true
})