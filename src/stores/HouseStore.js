import { defineStore } from "pinia"

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        houses: []
    }),
    getters: {
        priceSorted: (state) => {
            return (searchText) => {
                console.log(state.houses.map(x => (x.location.street).toLowerCase()))
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
            }
        }
        ,
        sizeSorted: (state) => {
            return (searchText) => {
                const filteredList = state.houses.filter(x => x.location.street.toLowerCase().includes(searchText.toLowerCase()))
                return filteredList.sort((a,b) => (a.size > b.size) ? 1 : ((b.size > a.size) ? -1 : 0))
            }
        },
        numMatch(){

        }
    },
    actions: {
        initializeHouses(houses) {
            this.houses = houses
        },
        addHouse(house) {
            this.houses.push(house)
        }
    }
})