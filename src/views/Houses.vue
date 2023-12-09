<template>
    <div id="houses">
        <!-- if the search field is empty or search result size is graeter than 0 (there are some matches)
        then we show available listings -->
        <div v-if="searchText.length == 0 || searchResultSize > 0">
            <div v-if="searchText.length" id="searchMatches" class="header2">
                <div v-if="searchResultSize == 1">{{ searchResultSize }} result found</div>
                <div v-else>{{ searchResultSize }} results found</div>
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
        <!-- if there is no match to the search text, then we display that there was no match -->
        <div v-else id="noMatch">
            <img src="../assets/img_empty_houses@3x.png" alt="house search icon">
            <p>No results found.</p>
            <p>Please try another keyword.</p>
        </div>
    </div>
</template>

<script>
import HousePreview from './HousePreview.vue'
import { useHouseStore } from "../stores/HouseStore"


export default {
    components: { HousePreview },
    props: ["searchResultSize", "searchText", "sortType"],
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

#searchMatches {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
}

#noMatch {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top:50px;
    font-family: "Montserrat";
    font-weight: 500;
    font-size:18px;
}

#noMatch img {
    margin-bottom:30px;
    min-width:300px;
    height:auto;
}

#noMatch p {
    margin:5px;
}

#price-sorted,
#size-sorted {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>