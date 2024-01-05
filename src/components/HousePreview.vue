<template>
  <!-- this component is for displaying house information for each house in house overview page (home page)
    It contains house info as well as edit, delete, and mark as favorite buttons -->
  <router-link :to="{ name: `houseDetail`, params: { id: house.id } }" id="house-preview">
    <div class="left">
      <HouseInfo :id="house.id" />
    </div>
    <!-- only displays edit and delete button when the listing was made by the user -->
    <div class="buttons-container">
      <div v-if="house.madeByMe" class="edit-delete-button-container">
        <router-link :to="{ name: `edit`, params: { id: house.id } }">
          <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
        </router-link>
        <div>
          <!-- click.prevent is there to stop the propagation of click event to the parent element (not to be routed to HouseDetail page) -->
          <img src="../assets/ic_delete@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
        </div>
        <DeletePopup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
      </div>
      <!-- importing heart icon for marking a listing as favorite-->
      <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.favList.includes(house.id) }"
        @click.prevent="houseStore.toggleFav(house.id)" size="2x" />
    </div>
  </router-link>
</template>

<script setup>
import HouseInfo from "./HouseInfo.vue"
import { useHouseStore } from "../stores/HouseStore"
import DeletePopup from "./DeletePopup.vue"
import { ref } from 'vue'

const props = defineProps({
  house: Object
})

const houseStore = useHouseStore()

// manages if the popup to confirm listing deletion is open or not
const popupIsOpen = ref(false)
const openPopup = () => {
  popupIsOpen.value = true
}
const closePopup = () => {
  popupIsOpen.value = false
}
</script>

<style>
#house-preview .active {
  color: red
}

#house-preview {
  background: white;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 20px;
  height: 150px;
  font-family: "Open Sans", sans-serif;
  color: #4A4B4C;
  font-size: 16px;
  text-decoration: none;
}

#house-preview .buttons-container {
  display: flex;
  gap: 5px;
  height: 30px;
  align-items: center;
  margin-top: 20px;
}

#house-preview .edit-delete-button-container {
  height: 30px;
  display: flex;
  align-items: center;
  gap: 5px;
}

#house-preview .edit-delete-button {
  width: 25px;
  height: auto;
  margin: 0;
}

#house-preview svg {
  width: 25px;
  height: auto;
}

#house-preview .left {
  align-self: center;
  height: 100%;
}

@media only screen and (max-width: 768px) {
  #house-preview {
    font-size: 12px;
    height: 130px;
    padding: 10px 10px;
  }

  #house-preview .edit-delete-button {
    width: 20px;
    height: auto;
  }

  #house-preview svg {
    width: 20px;
    height: auto;
  }

  #house-preview .buttons-container {
    flex-direction: column;
    height: auto;
  }

  #house-preview .edit-delete-button-container {
    flex-direction: column;
    height: auto;
  }
}
</style>