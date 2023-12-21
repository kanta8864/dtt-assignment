<!-- this views file is responsible for showing the home page (house overview page) -->
<template>
  <NavVar />
  <!-- handling custom events emitted from Tools component-->
  <Tools @changeSortTarget="handleSortTargetChange" @changeSearchText="handleSearchTextChange" />
  <Houses :searchResultSize="searchResultSize" :searchText="searchText" :sortType="sortType"></Houses>
</template>

<script>
import NavVar from "../components/NavVar.vue"
import Tools from "../components/Tools.vue"
import Houses from "../components/Houses.vue"
import { ref } from "vue"
import { useHouseStore } from "../stores/HouseStore"

export default {
  name: 'HomeView',
  components: { NavVar, Tools, Houses },
  setup() {
    // initializes HouseStore and fetch all the available house API
    const houseStore = useHouseStore()
    houseStore.fetchHouses()

    // keeps track of the currently used sorting type
    const sortType = ref("price")
    const handleSortTargetChange = (value) => {
      sortType.value = value
    }

    // keeps track of the search text and the size of the listings that match the search text
    const searchText = ref("")
    const searchResultSize = ref(0)
    const handleSearchTextChange = (value) => {
      searchText.value = value
      searchResultSize.value = houseStore.getFilteredListSize(value)
    }

    return { houseStore, sortType, handleSortTargetChange, searchText, searchResultSize, handleSearchTextChange }
  }
}
</script>

