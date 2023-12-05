<template>
  <NavVar />
  <div id="houseDetailContainer">
    <div class="backButtonContainer">
      <img src="../assets/ic_back_grey@3x.png" alt="back button" @click="this.$router.go(-1)">
      Back to Overview
    </div>
    <div id="houseDetailContent">
      <div id="houseDetail" v-if="house">
        <img class="hey" :src="house.image" alt="house photo" width="500" height="600">
        <div class="textContent">
          <div class="firstRow">
            {{ house.location.street }} {{ house.location.houseNumber }}
            <div>
              <img src="../assets/ic_edit@3x.png" class="editDeleteButton">
              <img src="../assets/ic_delete@3x.png" class="editDeleteButton">
            </div>
          </div>
          <div>
            <img src="../assets/ic_location@3x.png" alt="location icon">
            {{ house.location.city }}
            {{ house.location.zip }}
          </div>
          <div class="secondRow">
            <div>
              <img src="../assets/ic_price@3x.png" alt="price icon">
              {{ house.price }}
            </div>
            <div class="sizeInfo">
              <img src="../assets/ic_size@3x.png" alt="size icon">
              {{ house.size }} m2
            </div>
            <div>
              <img src="../assets/ic_construction_date@3x.png" alt="building icon">
              Built in {{ house.constructionYear }}
            </div>
          </div>
          <div class="thirdRow">
            <div class="bedroomInfo">
              <img src="../assets/ic_bed@3x.png" alt="bed icon">
              {{ house.rooms.bedrooms }}
            </div>
            <div class="bathroomInfo">
              <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
              {{ house.rooms.bathrooms }}
            </div>
            <div>
              <img src="../assets/ic_garage@3x.png" alt="garage icon">
              {{ hasGarage }}
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div id="recommendationContainer">
        <div>Recommended for you</div>
        <div class="recommendationItemContainer">
          <HouseInfo id="2" />
        </div>
        <div class="recommendationItemContainer">
          <HouseInfo id="3" />
        </div>
        <div class="recommendationItemContainer">
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
#houseDetailContainer {
  display: flex;
  flex-direction: column;
  padding: 10px 100px;
}

#houseDetailContent {
  display: flex;
  justify-content: space-between;
}

#houseDetail {
  width: 65%;
  background: white;
  display: flex;
  flex-direction: column;
}

.textContent {
  display: flex;
  flex-direction: column;
  gap:10px;
}

#houseDetail img {
  width: 16px;
  height: auto;
}

#recommendationContainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 30%;
}

.recommendationItemContainer {
  background: white;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px 20px;
  height: 130px;
  font-family: "Open Sans";
  color: #4A4B4C;
  font-size: 16px;
  text-decoration: none;
}

.hey {
  width: 100% !important;
  height: auto;
}

.editDeleteButton {
  width: 20px;
  height: auto;
  margin: 5px;
}

.firstRow {
  display: flex;
  justify-content: space-between;
}

.secondRow, .thirdRow {
  display: flex;
  gap:40px;
}

.textContent {
  margin-top: 20px;
  padding: 0px 50px;
}
</style>