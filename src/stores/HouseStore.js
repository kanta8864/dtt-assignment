import { defineStore } from "pinia"
import axios from "axios"

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        houses: []
    }),
    getters: {
        // sort the houses in the ascending order of price. filter is also considered
        priceSorted: (state) => {
            return (searchText) => {
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            }
        },
        // sort the houses in the ascending order of size. filter is also considered
        sizeSorted: (state) => {
            return (searchText) => {
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a, b) => (a.size > b.size) ? 1 : ((b.size > a.size) ? -1 : 0))
            }
        },
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
        }


    },
    actions: {
        async fetchHouses() {
            console.log("you called me")
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

            }

        },
        addHouse(body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.post("https://api.intern.d-tt.nl/api/houses", body).then(response => {
                const formData = new FormData()
                formData.append("image", fileName.value)
                axios.post(`https://api.intern.d-tt.nl/api/houses/${response.data.id}/upload`, formData)
                this.fetchHouses()
            })
        },
        deleteHouse(houseId) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.delete("https://api.intern.d-tt.nl/api/houses/" + houseId)
                .then(this.fetchHouses())
        }, 
        updateHouse(houseId, body, fileName) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.post("https://api.intern.d-tt.nl/api/houses/" + houseId, body)
                .then(() => {
                const formData = new FormData()
                formData.append("image", fileName.value)
                axios.post(`https://api.intern.d-tt.nl/api/houses/${houseId}/upload`, formData)
                this.fetchHouses()
            })
        }
    },
    persist: true
})