<!-- this views file is responsible for showing a list of houses that are posted by the user -->
<template>
  <NavVar />
  <div id="my-houses">
    <div class="header1">My Listings</div>
    <div v-for="house in houseStore.getMyListings" :key="house.id">
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
#my-houses {
  padding: 10px 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media only screen and (max-width: 1200px) {
  #my-houses {
    padding: 20px 150px;
  }
}

@media only screen and (max-width: 992px) {
  #my-houses {
    padding: 20px 50px;
  }
}

@media only screen and (max-width: 768px) {
  #my-houses .header1 {
    text-align: center;
    margin-top: 40px;
    font-size: 22px;
  }

  #my-houses {
    margin-bottom: 70px;
    padding: 10px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}
</style>