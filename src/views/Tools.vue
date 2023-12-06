<template>
  <div id="tools">
    <div class="first-row">
      <div class="header1">Houses</div>
      <router-link id="new-button" :to="{name: `create`}">
        <img src="../assets/ic_plus_white@3x.png" alt="plus symbol">
        CREATE NEW
      </router-link>
    </div>
    <div class="second-row">
      <input type="search" placeholder="Search for a house" v-model="searchText">
      <div class="sort">
          <input type="radio" id="price-choice" name="choice" value="price" checked="checked">
          <label for="price-choice" id="price-label">Price</label>
          <input type="radio" id="size-choice" name="choice" value="size">
          <label for="size-choice" id="side-label">Size</label>
      </div>
    </div>
    <div>5 results found</div>
  </div>
</template>

<script>
import { computed } from "vue"

export default {
}
</script>

<style>
#tools {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 100px;
  font-family: "Montserrat";
}

#tools a {
    text-decoration: none;
}

#tools #housesHeader {
  font-size: 30px;
  font-weight: bold;
}

#tools #new-button {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 25px;
  border-radius: 10px;
  color: white;
  background-color: #EB5440;
  border: none;
  font-weight: bold;
  font-size: 18px;
}

#tools #new-button img {
  width: 25px;
  height: auto;
}

#tools .first-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#tools .second-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#tools input[type=search] {
  width: 400px;
  padding: 15px 15px 15px 50px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  background-image: url(../assets/ic_search@3x.png);
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 20px center;
  background-color: #E8E8E8;
}

#tools input[type=radio] {
  display:none;
  position:absolute;
  visibility: hidden;
}

#tools label {
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 50px;
  color: white;
  background-color: #C3C3C3;
  font-size:16px;
}

#tools #price-label {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#tools #size-label {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

#tools input[type=radio]:checked + label{
  background-color: #EB5440;
}

</style>