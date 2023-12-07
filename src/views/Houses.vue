<template>
    <div id="houses">
        <div v-if="searchText.length" id="searchMatches" class="header2">
            <div v-if="searchResultSize==1">{{searchResultSize}} result found</div>
            <div v-else>{{searchResultSize}} results found</div>
        </div>
        <div v-if="sortType === 'price'" id="price-sorted">
            <div v-for="house in houseStore.priceSorted(searchText)" :key="house.id">
                <HousePreview :house="house" />
            </div>
        </div>
        <div v-if="sortType === `size`" id="size-sorted">
            <div v-for="house in houseStore.sizeSorted(searchText)" :key="house.id">
                <HousePreview :house="house" />
            </div>
        </div>
    </div>
</template>

<script>
import HousePreview from './HousePreview.vue'
import { useHouseStore } from "../stores/HouseStore"


export default {
    name: "HousesComponent",
    components: { HousePreview },
    props: ["searchResultSize","searchText", "sortType"],
    setup(props) {
        const houseStore = useHouseStore()
        return { houseStore }
    }
}
</script>

<style>
#houses {
    padding: 10px 100px;
}

#searchMatches {
    margin-top: 10px;
    margin-bottom:20px;
    font-size:18px;
}

#price-sorted, #size-sorted {
    display:flex;
    flex-direction: column;
    gap: 10px;
}
</style>