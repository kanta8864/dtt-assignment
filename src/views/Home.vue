<template>
  <NavVar />
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
    const error = ref(null)

    const load = async () => {
      try {
        axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
        let data = await axios.get("https://api.intern.d-tt.nl/api/houses")
        console.log(data.data)
        if (data.status !== 200) {
          throw Error("No house was found")
        } else {
          houseStore.initializeHouses(await data.data)

        }
      } catch (e) {
        error.value = e.message
      }
    }

    load()

    const sortType = ref("price")
    const handleSortTargetChange = (value) => {
      sortType.value = value
    }

    const searchText = ref("")
    const handleSearchTextChange = (value) => {
      searchText.value = value
    }

    const houseStore = useHouseStore()

    

    return { houseStore, error, handleSortTargetChange, handleSearchTextChange, sortType, searchText}
  },
  craeted() {
    console.log("sup")
  }
}
</script>

