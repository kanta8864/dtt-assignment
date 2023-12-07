<template>
    <div id="houses">
        <div v-if="sortType === 'price'" id="price-sorted">
            <div v-for="house in houseStore.priceSorted" :key="house.id">
                <HousePreview :house="house" />
            </div>
        </div>
        <div v-if="sortType === `size`" id="size-sorted">
            {{ sortType }}
            <div v-for="house in houseStore.sizeSorted" :key="house.id">
                <HousePreview :house="house" />
            </div>
        </div>
    </div>
</template>

<script>
import HousePreview from './HousePreview.vue'
import { useHouseStore } from "../stores/HouseStore"
import { ref } from 'vue'


export default {
    name: "HousesComponent",
    components: { HousePreview },
    props: ["houseList", "sortType"],
    setup() {
        const houseStore = useHouseStore()
        return { houseStore }
    }
}
</script>

<style>
#houses {
    padding: 10px 100px;
}

#price-sorted, #size-sorted {
    display:flex;
    flex-direction: column;
    gap: 10px;
}
</style>