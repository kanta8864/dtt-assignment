<template>
  <NavVar />
  <div id="house-detail" class="content">
    <div class="back-button">
      <img src="../assets/ic_back_grey@3x.png" alt="back button" @click="this.$router.go(-1)">
      Back to Overview
    </div>
    <div class="main-content">
      <div class="house-info" v-if="house">
        <img :src="house.image" alt="house photo" width="500" height="600">
        <div class="text-content">
          <div class="first-row">
            <div class="header1">{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div class="edit-delete-button-container">
              <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
              <img src="../assets/ic_delete@3x.png" class="edit-delete-button">
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
import axios from 'axios'
import HouseInfo from "./HouseInfo.vue"
import NavVar from "./NavVar.vue"

export default {
  props: ["id"],
  components: { HouseInfo, NavVar },
  setup(props) {
    const house = ref(null)
    const error = ref(null)
    const hasGarage = ref("")

    const load = async () => {
      try {
        axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
        let data = await axios.get("https://api.intern.d-tt.nl/api/houses/" + props.id)
        if (data.status !== 200) {
          throw Error("No house was found")
        } else {
          console.log("hi")
          house.value = await data.data[0]
          hasGarage.value = house.hasGarage ? "yes" : "no"
        }
      } catch (e) {
        error.value = e.message
      }
    }
    load()
    return { house, error, hasGarage }
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
  padding: 0px 50px;
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

#house-detail  .edit-delete-button-container {
  display: flex;
  align-items: center;
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
}</style>