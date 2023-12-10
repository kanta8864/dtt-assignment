<template>
    <NavVar />
    <div class="content house-preview-container">
        <div class="header1">My Listings</div>
        <div v-for="house in houseStore.sortByPrice(houseStore.getMyListings)" :key="house.id">
            <HousePreview :house="house" />
        </div>
    </div>
</template>


<script>
import NavVar from "./NavVar.vue"
import HousePreview from "./HousePreview.vue"
import { useHouseStore } from "../stores/HouseStore"

export default {
    components: { NavVar, HousePreview},
    setup() {
        const houseStore = useHouseStore()
        return { houseStore }
    }
}
</script>

<style>
</style>