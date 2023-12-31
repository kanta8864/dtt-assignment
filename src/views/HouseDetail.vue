<!-- this views file is responsible for showing a house detail page -->
<template>
  <NavVar />
  <article id="house-detail" v-if="house">
    <div class="back-button">
      <router-link :to="{ name: `home` }">
        <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
        <img src="../assets/ic_back_white@3x.png" alt="back button" class="back-whie">
      </router-link>
      <div>Back to Overview</div>
    </div>
    <!-- this is for mobile users. The delete, edit, and favorite icon is displayed at the top of the screen, 
    on top of the house picture -->
    <!-- only show edit and delete button if the house is made by the user -->
    <div class="mobile-buttons-container">
      <div v-if="house.madeByMe" class="edit-delete-button-container">
        <router-link :to="{ name: `edit`, params: { id: house.id } }">
          <img src="../assets/ic_edit_white@3x.png" class="edit-delete-button">
        </router-link>
        <div>
          <img src="../assets/ic_delete_white@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
        </div>
        <DeletePopup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.favList.includes(house.id) }"
          @click.prevent="houseStore.toggleFav(house.id)" size="2x" />
      </div>
    </div>
    <div class="main-content">
      <div class="house-info">
        <img :src="house.image" alt="house photo" id="big-house-image">
        <div class="text-content">
          <div class="first-row">
            <div class="header1 address">{{ house.location.street }} {{ house.location.houseNumber }} {{
              house.location.houseNumberAddition }}</div>
            <div class="buttons-container">
              <!-- only show edit and delete button if the house is made by the user -->
              <div v-if="house.madeByMe" class="edit-delete-button-container">
                <router-link :to="{ name: `edit`, params: { id: house.id } }">
                  <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
                </router-link>
                <div>
                  <img src="../assets/ic_delete@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
                  <DeletePopup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
                </div>
              </div>
              <div>
                <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.favList.includes(house.id) }"
                  @click.prevent="houseStore.toggleFav(house.id)" size="2x" />
              </div>
            </div>
          </div>
          <div class="second-row">
            <div class="icon">
              <img src="../assets/ic_location@3x.png" alt="location icon">
              {{ house.location.city }}
              {{ house.location.zip }}
            </div>
          </div>
          <div class="third-row">
            <div class="icon">
              <img src="../assets/ic_price@3x.png" alt="price icon">
              {{ filters.currencyFormatting(house.price).substring(2) }}
            </div>
            <div class="icon">
              <img src="../assets/ic_size@3x.png" alt="size icon">
              {{ house.size }} m2
            </div>
            <div class="icon">
              <img src="../assets/ic_construction_date@3x.png" alt="building icon">
              Built in {{ house.constructionYear }}
            </div>
          </div>
          <div class="fourth-row">
            <div class="icon">
              <img src="../assets/ic_bed@3x.png" alt="bed icon">
              {{ house.rooms.bedrooms }}
            </div>
            <div class="icon">
              <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
              {{ house.rooms.bathrooms }}
            </div>
            <div class="icon">
              <img src="../assets/ic_garage@3x.png" alt="garage icon">
              {{ house.hasGarage ? "yes" : "no" }}
            </div>
          </div>
          <div class="description">
            {{ house.description }}
          </div>
        </div>
      </div>
      <div id="recommendation" v-if="recommendations">
        <div class="header2">Recommended for you</div>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[0].id } }" class="recommendation-item"
          @click="handleRecommendationClick(recommendations[0].id)">
          <HouseInfo :id="recommendations[0].id" type="recommendation" :key="recommendations" />
        </router-link>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[1].id } }" class="recommendation-item"
          @click="handleRecommendationClick(recommendations[1].id)">
          <HouseInfo :id="recommendations[1].id" type="recommendation" :key="recommendations" />
        </router-link>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[2].id } }" class="recommendation-item"
          @click="handleRecommendationClick(recommendations[2].id)">
          <HouseInfo :id="recommendations[2].id" type="recommendation" :key="recommendations" />
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup>
import { ref, onMounted } from "vue"
import HouseInfo from "../components/HouseInfo.vue"
import NavVar from "../components/NavVar.vue"
import { useHouseStore } from "../stores/HouseStore"
import DeletePopup from "../components/DeletePopup.vue"

const props = defineProps({
  id: String,
})
// initialize house store and get the particular house using id passed to this component as a prop
const houseStore = useHouseStore()
const house = ref("")
const recommendations = ref([])

async function setUp(id) {
  if (houseStore.houses.length == 0) {
    await houseStore.fetchHouses()
  }
  house.value = await houseStore.getOneHouse(id)
  // recommendation items are choosen to be three houses
  // with a similar price to the currently viewed house
  recommendations.value = houseStore.houses.filter(x => x.id != house.value.id).sort((a, b) => {
    const priceDifA = Math.abs(a.price - house.value.price)
    const priceDifB = Math.abs(b.price - house.value.price)
    if (priceDifA > priceDifB) return 1
    else if (priceDifA < priceDifB) return -1
    else return 0
  }).slice(0, 3)
}

onMounted(() => setUp(props.id))

function handleRecommendationClick(id) {
  setUp(id)
  // scroll up to the top of the page
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
}

// deals with opening and closing of popup asking user to confirm the deletion of a listing
const popupIsOpen = ref(false)
const openPopup = () => {
  popupIsOpen.value = true
}
const closePopup = () => {
  popupIsOpen.value = false
}
</script>

<style>
#house-detail {
  display: flex;
  flex-direction: column;
  padding: 10px 200px;
  font-family: "Open Sans", sans-serif;
}

#house-detail .back-button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
  font-size: 16px;
  height: 70px;
}

#house-detail .back-button img {
  width: 16px;
  height: 16px;
}

#house-detail #big-house-image {
  min-width: 100%;
  height: auto;
  max-height: 500px;
}

#house-detail .main-content {
  display: flex;
  justify-content: space-between;
}

#house-detail .mobile-buttons-container {
  display: none;
}

#house-detail .buttons-container {
  display: flex;
  gap: 10px;
  align-items: start;
  margin-top: 25px;
  position: absolute;
  right: 20px;
  top: 10px;
}

#house-detail .edit-delete-button-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

#house-detail .edit-delete-button {
  width: 25px;
  height: auto;
}

#house-detail .house-info {
  width: 55%;
  background: white;
  display: flex;
  flex-direction: column;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 30px;
  font-size: 16px;
  position: relative;
}

#house-detail .icon img {
  width: 16px;
  height: 16px;
}

#recommendation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 40%;
}

#house-detail .recommendation-item {
  background: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 5px;
  height: 130px;
  color: #4A4B4C;
  font-size: 16px;
  text-decoration: none;
}

#house-detail .active {
  color: red
}

.address {
  width: 80%;
}

.second-row,
.third-row,
.fourth-row {
  display: flex;
  justify-content: left;
  gap: 40px;
}

.first-row,
.second-row,
.third-row,
.fourth-row {
  width: 100%;
  font-weight: 600;
  font-size: 16px;
}

#house-detail .description {
  margin-top: 20px;
  font-weight: 500;
  font-size: 18px;
}

.icon {
  display: flex;
  gap: 8px;
  text-align: center;
}

@media only screen and (max-width: 1200px) {
  #house-detail {
    padding: 20px 100px;
  }
}

@media only screen and (max-width: 992px) {
  #house-detail {
    padding: 20px 30px;
  }
}

@media only screen and (max-width: 768px) {
  #house-detail {
    padding: 0;
    margin-bottom: 70px;
  }

  #house-detail .back-button {
    position: absolute;
    padding: 0 20px;
    z-index: 99;
  }

  #house-detail .back-button div {
    display: none;
  }

  #house-detail .house-info {
    position: relative;
  }

  #house-detail #big-house-image {
    width: 100%;
    height: auto;
    max-height: 500px;
  }

  #house-detail .main-content {
    flex-direction: column;
  }

  #house-detail .house-info {
    width: 100%;
    padding: 0;
  }

  #house-detail .text-content {
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    background-color: white;
    position: relative;
    bottom: 30px;
    z-index: 2;
  }

  #recommendation {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
  }

  #house-detail .recommendation-item {
    font-size: 12px;
  }


  .first-row,
  .second-row,
  .third-row,
  .fourth-row {
    font-weight: 600;
    font-size: 12px;
  }

  #house-detail .description {
    font-size: 12px;
  }

  #house-detail .buttons-container {
    display: none;
    align-items: center;
  }

  #house-detail .mobile-buttons-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    right: 20px;
    padding: 20px 0px;
    z-index: 99;
  }

  /* for favorite (heart) icon */
  #house-detail svg {
    color: white;
  }

  #house-detail .edit-delete-button {
    width: 25px;
    height: auto;
  }

  #house-detail .back-button img {
    width: 25px;
    height: 25px;
  }

  #house-detail .back-button .back-white {
    display: none;
  }

  #house-detail .back-button .back-white {
    display: inline;
  }

  #house-detail .back-button .back-grey {
    display: none;
  }
}
</style>