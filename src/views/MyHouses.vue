<template>
    <NavVar />
    <div class="content house-preview-container" id="my-houses">
        <div class="header1">My Listings</div>
        <div v-for="house in houseStore.getMyListings" :key="house.id">
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
@media only screen and (max-width: 768px) {
    #my-houses .header1 {
        text-align: center;
        margin-top: 40px;
        font-size: 22px;
    }
}
</style>