<!-- this views file is responsible for showing a house detail page -->
<template>
  <NavVar />
  <div id="house-detail" class="content">
    <div class="back-button">
      <router-link :to="{ name: `home` }">
        <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
        <img src="../assets/ic_back_white@3x.png" alt="back button" class="back-whie">
      </router-link>
      <div>Back to Overview</div>
    </div>
    <!-- this is for mobile users. The delete, edit, and favorite icon is displayed at the top of the screen, 
    on top of the house picture -->
    <div class="mobile-edit-delete-button-container">
      <!-- only show edit and delete button if the house is made by the user -->
      <div v-if="house.madeByMe" class="buttons-container">
        <router-link :to="{ name: `edit`, params: { id: house.id } }">
          <img src="../assets/ic_edit_white@3x.png" class="edit-delete-button">
        </router-link>
        <div>
          <img src="../assets/ic_delete_white@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
        </div>
        <DeletePopup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
      </div>
      <div>
        <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.getFavs.includes(house) }"
          @click.prevent="houseStore.toggleFav(house.id)" size="2x" />
      </div>
    </div>
    <div class="main-content">
      <div class="house-info">
        <img :src="house.image" alt="house photo" id="big-house-image">
        <div class="text-content">
          <div class="first-row">
            <div class="header1">{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div class="edit-delete-button-container">
              <!-- only show edit and delete button if the house is made by the user -->
              <div v-if="house.madeByMe" class="buttons-container">
                <router-link :to="{ name: `edit`, params: { id: house.id } }">
                  <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
                </router-link>
                <div>
                  <img src="../assets/ic_delete@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
                  <DeletePopup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
                </div>
              </div>
              <div>
                <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.getFavs.includes(house) }"
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
              {{ house.price }}
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
              {{ hasGarage }}
            </div>
          </div>
          <div class="description">
            {{ house.description }}
          </div>
        </div>
      </div>
      <div id="recommendation">
        <div class="header2">Recommended for you</div>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[0].id } }" class="recommendation-item" v-if="recommendations.length >= 1">
          <HouseInfo :id="recommendations[0].id" />
        </router-link>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[1].id } }" class="recommendation-item" v-if="recommendations.length >= 2">
          <HouseInfo :id="recommendations[1].id" />
        </router-link>
        <router-link :to="{ name: `houseDetail`, params: { id: recommendations[2].id } }" class="recommendation-item" v-if="recommendations.length >= 3">
          <HouseInfo :id="recommendations[2].id" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import HouseInfo from "../components/HouseInfo.vue"
import NavVar from "../components/NavVar.vue"
import { useHouseStore } from "../stores/HouseStore"
import DeletePopup from "../components/DeletePopup.vue"

export default {
  props: ["id"],
  components: { HouseInfo, NavVar, DeletePopup },
  setup(props) {
    // initialize house store and get the particular house using id passed to this component as a prop
    const houseStore = useHouseStore()
    const house = houseStore.getById(props.id)

    // converts true/false value to yes/no for easier understanding
    const hasGarage = ref(house.hasGarage ? "yes" : "no")

    // deals with opening and closing of popup asking user to confirm the deletion of a listing
    const popupIsOpen = ref(false)
    const openPopup = () => {
      popupIsOpen.value = true
    }
    const closePopup = () => {
      popupIsOpen.value = false
    }

    // recommendation items are choosen to be three houses
    // with a similar price to the currently viewed house
    const recommendations = houseStore.houses.filter(x => x.id != house.id).sort((a, b) => {
      const priceDifA = Math.abs(a.price - house.price)
      const priceDifB = Math.abs(b.price - house.price)
      if (priceDifA > priceDifB) return 1
      else if (priceDifA < priceDifB) return -1
      else return 0
    }).slice(0, 3)

    return { houseStore, house, hasGarage, popupIsOpen, openPopup, closePopup, recommendations }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        // forcing the page to reload when there is any change to the route.
        location.reload()
      }
    )
  },
}
</script>

<style>
#house-detail {
  display: flex;
  flex-direction: column;
  padding: 10px 100px;
  font-family: "Open Sans";
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

#house-detail .buttons-container {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-right: 10px;
}

#house-detail .house-info {
  width: 65%;
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
}

#house-detail .icon img {
  width: 16px;
  height: auto;
}

#recommendation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
}

#house-detail .recommendation-item {
  background: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  height: 130px;
  color: #4A4B4C;
  font-size: 16px;
  text-decoration: none;
}

#house-detail .active {
  color: red
}

#house-detail .edit-delete-button-container {
  display: flex;
  align-items: center;
}

#house-detail .mobile-edit-delete-button-container {
  display: none;
}

.first-row {
  display: flex;
  justify-content: space-between;
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

@media only screen and (max-width: 768px) {
  #house-detail {
    padding: 0;
    margin-bottom: 70px;
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
    width: calc(100% - 40px);
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

  #house-detail .edit-delete-button-container {
    display: none;
    align-items: center;
  }

  #house-detail .mobile-edit-delete-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    position: absolute;
    right: 20px;
    padding: 20px 0px;
    z-index: 99;
  }

  #house-detail svg {
    color: white;
  }

  #house-detail .mobile-edit-delete-button-container img {
    width: 22px;
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