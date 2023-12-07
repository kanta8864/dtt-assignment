import { defineStore } from "pinia"
import axios from "axios"
import { ref } from "vue"
export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        houses: []
    }),
    getters: {
        priceSorted: (state) => {
            return (searchText) => {
                console.log(state.houses.map(x => (x.location.street).toLowerCase()))
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            }
        }
        ,
        sizeSorted: (state) => {
            return (searchText) => {
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a, b) => (a.size > b.size) ? 1 : ((b.size > a.size) ? -1 : 0))
            }
        },
        getById: (state) => {
            return (id) => {
                return state.houses.find(x => x.id == id)
            }
        }, 
        getFilteredListSize: (state) => {
            return (text) => {
                return state.houses.filter(x => x.location.street.toLowerCase().includes(text.toLowerCase())).length
            }
        }


    },
    actions: {
        async initializeHouses() {
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
        addHouse(body, file) {
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            console.log(body)
            axios.post("https://api.intern.d-tt.nl/api/houses", body).then(response => {
                const formData = new FormData()
                formData.append("image", file.value)
                axios.post(`https://api.intern.d-tt.nl/api/houses/${response.data.id}/upload`, formData).then(response => console.log(response))
            })
        },
        deleteHouse(hosueId) {
            console.log("hi")
            axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
            axios.delete("https://api.intern.d-tt.nl/api/houses/" + hosueId)
                .then(this.houses = this.houses.filter(x => x.id != hosueId))
        }
    }
})