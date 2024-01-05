<template>
  <!-- this component is responsible for showing a delete confirmation popup -->
  <div class="popup" @click.prevent="handleClosePopup">
    <div class="popup-content">
      <div class="header1">Delete listing</div>
      <div>
        <div>Are you sure you want to delete this listing?</div>
        <div>The action cannot be undone.</div>
      </div>
      <div class="buttons">
        <button class="delete" @click="houseStore.deleteHouse(houseId)">YES, DELETE</button>
        <button class="goback">GO BACK</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useHouseStore } from "../stores/HouseStore"

const props = defineProps({
  houseId: Number,
})

const emit = defineEmits(["closePopup"])
const houseStore = useHouseStore()

function handleClosePopup(e) {
  const modalBackground = document.querySelector(".popup")
  const gobackButton = document.querySelector(".goback")
  if (e.target.isEqualNode(modalBackground) || e.target.isEqualNode(gobackButton)) {
    emit("closePopup")
  }
}

</script>

<style>
.popup {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 3;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup-content {
  position: relative;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 500px;
  padding: 30px;
  font-size: 18px;
  border-radius: 15px;
}

.popup-content div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.popup-content .buttons {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.popup-content button {
  width: 200px;
  height: 30px;
  color: white;
  border-radius: 5px;
  border: none;
}

.popup-content .delete {
  background-color: #EB5440;
}

.popup-content .goback {
  background-color: #4A4B4C;
}

@media only screen and (max-width: 480px) {
  .popup-content {
    font-size: 12px;
    width: 80%;
  }
}
</style>
