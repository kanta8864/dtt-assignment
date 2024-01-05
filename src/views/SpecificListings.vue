<!-- this views file is responsible for showing listings that are marked as favorites by the user -->
<template>
  <NavVar />
  <div id="specific-listings" v-if="type">
    <div id="favorites" v-if="type == 'favorites'">
      <div class="header1">Favorite Listings</div>
      <div class="header2" v-if="houseStore.getFavs.length"> {{ houseStore.getFavs.length }} listings </div>
      <div class="header2 no-match" v-else> No Listing found </div>
      <div class="list-container">
        <article v-for="house in houseStore.getFavs" :key="house.id">
          <HousePreview :house="house" />
        </article>
      </div>
    </div>
    <div id="my-houses" v-else>
      <div class="header1">My Listings</div>
      <div class="header2" v-if="houseStore.getMyListings.length"> {{ houseStore.getMyListings.length }} listings </div>
      <div class="header2 no-match" v-else> No Listing found </div>
      <div class="list-container">
        <article v-for="house in houseStore.getMyListings" :key="house.id" class="list-container">
          <HousePreview :house="house" />
        </article>
      </div>
    </div>
  </div>
</template>


<script setup>
import NavVar from "../components/NavVar.vue"
import HousePreview from "../components/HousePreview.vue"
import { useHouseStore } from "../stores/HouseStore"
import { onBeforeUpdate } from "vue"

const houseStore = useHouseStore()
let type = ""

const pathSegmanets = window.location.pathname.split("/")
// this is to deal with trailing backslash. 
type = pathSegmanets.pop() || pathSegmanets.pop()

onBeforeUpdate(() => {
  const pathSegmanets = window.location.pathname.split("/")
  type = pathSegmanets.pop() || pathSegmanets.pop()
})

</script>

<style>
#specific-listings {
  padding: 10px 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#specific-listings .header2 {
  font-size: 18px;
}

#specific-listings .no-match {
  text-align: center;
  font-size: 30px;
  margin-top: 30px;
}

#specific-listings .list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media only screen and (max-width: 1200px) {
  #specific-listings {
    padding: 20px 100px;
  }
}

@media only screen and (max-width: 992px) {
  #specific-listings {
    padding: 20px 30px;
  }
}

@media only screen and (max-width: 768px) {
  #specific-listings .header1 {
    text-align: center;
    margin-top: 40px;
    font-size: 22px;
  }

  #specific-listings {
    padding: 10px 20px;
    margin-bottom: 70px;
  }

  #specific-listings .no-match {
    text-align: center;
    font-size: 18px;
  }


}
</style>