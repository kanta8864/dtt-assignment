<template>
  <NavVar />
  {{ houseStore.tasks }}
  <Tools @changeSortTarget="handleSortTargetChange" @changeSearchText="handleSearchTextChange"/>
  <div v-if="error"> {{ error }}</div>
  <div v-if="houseStore.houses.length">
    <Houses :searchText="searchText" :sortType="sortType"></Houses>
  </div>
</template>

<script>
import NavVar from "./NavVar.vue"
import Tools from "./Tools.vue"
import Houses from "./Houses.vue"
import { ref } from "vue"
import axios from 'axios'
import { useHouseStore } from "../stores/HouseStore"

export default {
  name: 'HomeView',
  components: { NavVar, Tools, Houses },
  setup() {
    const houseStore = useHouseStore()
    console.log()
    houseStore.initializeHouses()

    const sortType = ref("price")
    const handleSortTargetChange = (value) => {
      sortType.value = value
    }

    const searchText = ref("")
    const handleSearchTextChange = (value) => {
      searchText.value = value
    }

    

    return { houseStore, handleSortTargetChange, handleSearchTextChange, sortType, searchText}
  },
  craeted() {
    console.log("sup")
  }
}
</script>

