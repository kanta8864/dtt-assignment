<template>
    <NavVar />
    <div class="content  house-preview-container" id="favorites">
        <div class="header1">Favorite Listings</div>
        <div v-for="house in houseStore.getFavs" :key="house.id">
            <HousePreview :house="house" />
        </div>
    </div>
</template>


<script>
import NavVar from "./NavVar.vue"
import HousePreview from "./HousePreview.vue"
import { useHouseStore } from "../stores/HouseStore"

export default {
    components: { NavVar, HousePreview },
    setup() {
        const houseStore = useHouseStore()
        return { houseStore }
    }
}
</script>

<style>

@media only screen and (max-width: 600px) {
    #favorites .header1{
    text-align: center;
}
}
</style>