import { defineStore } from "pinia"
import axios from "axios"
import router from '../router'

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        houses: []
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
                return state.houses.filter(x => x.location.street.toLowerCase().includes(text.toLowerCase())).length
            }
        },
        getFavs() {
            return this.houses.filter(x => x.isFav)
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
            return this.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
        },
        async fetchHouses() {
            try {
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
                // function execution is paused until the promise is resolved
                let data = await axios.get("https://api.intern.d-tt.nl/api/houses")
                console.log(data)
                if (data.status !== 200) {
                    throw Error("No house was found")
                } else {
                    // add isFav property and set to false if not initialized 
                    data.data.forEach(element => {
                        if(!Object.hasOwn(isFav)) {
                            element.isFav = false
                        } else {
                            console.log("yay")
                        }
                    })
                    this.houses = data.data
                }
            } catch (e) {
                console.log(e)
            }

        },
        addHouse(body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3'
            axios.post("https://api.intern.d-tt.nl/api/houses", body).then(response => {
                const formData = new FormData()
                formData.append("image", fileName.value)
                axios.post(`https://api.intern.d-tt.nl/api/houses/${response.data.id}/upload`, formData)
                .then(() => {
                    this.fetchHouses()
                    console.log(response.data.id)
                    router.push({ name: 'houseDetail', params: { id: response.data.id } })
                })
            })
        },
        deleteHouse(houseId) {
            console.log(this.houses)
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.delete("https://api.intern.d-tt.nl/api/houses/" + houseId)
                .then(() => {
                    this.fetchHouses()
                    console.log(this.houses)
                })
        }, 
        updateHouse(houseId, body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.post("https://api.intern.d-tt.nl/api/houses/" + houseId, body)
                .then(() => {
                const formData = new FormData()
                formData.append("image", fileName.value)
                axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, formData)
                .then(() => this.fetchHouses())
            })
        },
        toggleFav(id) {
            const house = this.houses.find(x => x.id == id)
            house.isFav = !house.isFav
        }
    },
    persist: true
})