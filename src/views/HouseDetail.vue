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
    <div class="mobile-edit-delete-button-container" v-if="house.madeByMe">
      <router-link :to="{ name: `edit`, params: { id: house.id } }">
        <img src="../assets/ic_edit_white@3x.png" class="edit-delete-button">
      </router-link>
      <router-link :to="{ name: `home`, }">
        <img src="../assets/ic_delete_white@3x.png" @click="deleteHouse" class="edit-delete-button">
      </router-link>
    </div>
    <div class="main-content">
      <div class="house-info">
        <img :src="house.image" alt="house photo" id="big-house-image">
        <div class="text-content">
          <div class="first-row">
            <div class="header1">{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div class="edit-delete-button-container" v-if="house.madeByMe">
              <router-link :to="{ name: `edit`, params: { id: house.id } }">
                <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
              </router-link>
              <router-link :to="{ name: `home`, }">
                <img src="../assets/ic_delete@3x.png" @click="deleteHouse" class="edit-delete-button">
              </router-link>
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
        <div class="recommendation-item">
          <HouseInfo id="2" />
        </div>
        <div class="recommendation-item">
          <HouseInfo id="3" />
        </div>
        <div class="recommendation-item">
          <HouseInfo id="4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"
import HouseInfo from "./HouseInfo.vue"
import NavVar from "./NavVar.vue"
import { useHouseStore } from "../stores/HouseStore"

export default {
  props: ["id"],
  components: { HouseInfo, NavVar },
  setup(props) {
    const houseStore = useHouseStore()
    const house = houseStore.getById(props.id)

    // converts true/false value to yes/no for easier understanding
    const hasGarage = ref(house.hasGarage ? "yes" : "no")

    const deleteHouse = () => houseStore.deleteHouse(house.id)

    return { house, hasGarage, deleteHouse }
  }
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

@media only screen and (max-width: 600px) {
  #house-detail {
    padding: 0px;
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
    z-index: 99;
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
    gap:10px;
    position: absolute;
    right: 20px;
    padding: 30px 10px;
    z-index: 99;
  }

  #house-detail .mobile-edit-delete-button-container img{
    width:20px;
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