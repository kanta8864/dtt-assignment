<!-- this views file is responsible for showing listings that are marked as favorites by the user -->
<template>
  <NavVar />
  <div id="favorites">
    <div class="header1">Favorite Listings</div>
    <div v-for="house in houseStore.getFavs" :key="house.id">
      <HousePreview :house="house" />
    </div>
  </div>
</template>


<script setup>
import NavVar from "../components/NavVar.vue"
import HousePreview from "../components/HousePreview.vue"
import { useHouseStore } from "../stores/HouseStore"

const houseStore = useHouseStore()
</script>

<style>
#favorites {
  padding: 10px 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media only screen and (max-width: 1200px) {
  #favorites {
    padding: 20px 150px;
  }
}

@media only screen and (max-width: 992px) {
  #favorites {
    padding: 20px 50px;
  }
}

@media only screen and (max-width: 768px) {
  #favorites .header1 {
    text-align: center;
    margin-top: 40px;
    font-size: 22px;
  }

  #favorites {
    padding: 10px 20px;
    margin-bottom: 70px;
  }
}
</style>