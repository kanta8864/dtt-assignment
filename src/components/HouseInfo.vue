<template>
  <!-- this component is used to display house information in the preview format
         (for house overview page and recommended houses in the house detail page)-->
  <div id="house-info" :class="{ recommendation: type == 'recommendation' }">
    <img class="house-photo" :src="house.image" alt="house photo">
    <div class="preview-text">
      <div class="header2">{{ house.location.street }} {{ house.location.houseNumber }}</div>
      <div>{{ filters.currencyFormatting(house.price) }}</div>
      <div>{{ house.location.city }} {{ house.location.zip }}</div>
      <div class="more-info">
        <div class="bedroom-info">
          <img src="../assets/ic_bed@3x.png" alt="bed icon">
          {{ house.rooms.bedrooms }}
        </div>
        <div class="bathroom-info">
          <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
          {{ house.rooms.bathrooms }}
        </div>
        <div class="size-info">
          <img src="../assets/ic_size@3x.png" alt="size icon">
          {{ house.size }} m2
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHouseStore } from "../stores/HouseStore"
import { defineProps } from "vue"
const props = defineProps({
  id: Number,
  type: String
})
const houseStore = useHouseStore()
const house = houseStore.getById(props.id)
</script>

<style>
#house-info {
  display: flex;
  gap: 20px;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  height: 100%;
  align-items: center;
}

#house-info .preview-text {
  display: flex;
  flex-direction: column;
  gap: 5px;

}

.house-photo {
  border-radius: 20px;
  margin: 10px;
  width: 100px;
  height: 100px;
}

#house-info.recommendation {
  font-size: 12px;
}

.recommendation .house-photo {
  width: 100px;
  height: 100px;
}

.recommendation .header2 {
  font-size: 16px;
}

.more-info img {
  width: 16px;
  height: auto;
}

.more-info {
  display: flex;
  gap: 10px;
}

.bedroom-info,
.bathroom-info,
.size-info {
  display: flex;
  gap: 7px;
  align-items: center;
  justify-content: center;
}

@media only screen and (max-width: 480px) {
  #house-info {
    width: 100%;
    gap: 10px;
  }

  .house-photo {
    width: 80px;
    height: 80px;
    margin: 5px;
  }
}
</style>