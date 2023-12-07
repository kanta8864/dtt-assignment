import { defineStore } from "pinia"

export const useHouseStore = defineStore("houseStore", {
    state: () => ({
        houses: []
    }),
    getters: {
        priceSorted() {
            return this.houses.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
        },
        sizeSorted() {
            return this.houses.sort((a,b) => (a.size > b.size) ? 1 : ((b.size > a.size) ? -1 : 0))
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