<template>
  <NavVar />
  <Tools />
  <div v-if="error"> {{ error }}</div>
  <div v-if="houseList.length">
    <Houses :houseList="houseList"></Houses>
  </div>
</template>

<script>
import NavVar from "./NavVar.vue"
import Tools from "./Tools.vue"
import Houses from "./Houses.vue"
import { ref } from "vue"
import axios from 'axios'

export default {
  name: 'HomeView',
  components: { NavVar, Tools, Houses },
  setup() {
    const houseList = ref([])
    const error = ref(null)

    const load = async () => {
      try {
        axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
        let data = await axios.get("https://api.intern.d-tt.nl/api/houses")
        if (data.status !== 200) {
          throw Error("No house was found")
        } else {
          houseList.value = await data.data
        }
      } catch (e) {
        error.value = e.message
      }
    }

    load()
    return { houseList, error }
  }
}
</script>

