<template>
  <div id="toolContainer">
    <div id="firstRow">
      <div id="housesHeader">Houses</div>
      <router-link id="newButton" :to="{name: `create`}">
        <img id="plusSymbol" src="../assets/ic_plus_white@3x.png" alt="plus symbol">
        CREATE NEW
      </router-link>
    </div>
    <div id="secondRow">
      <input type="search" placeholder="Search for a house" v-model="searchText">
      <div class="container">
          <input type="radio" id="priceChoice" name="choice" value="price" checked="checked">
          <label for="priceChoice" id="priceLabel">Price</label>
          <input type="radio" id="SizeChoice" name="choice" value="size">
          <label for="SizeChoice" id="sizeLabel">Size</label>
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
#toolContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 100px;
  margin-top: 30px;
  font-family: "Montserrat";
}

#toolContainer a {
    text-decoration: none;
}

#toolContainer #housesHeader {
  font-size: 30px;
  font-weight: bold;
}

#toolContainer #newButton {
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

#toolContainer #newButton img {
  width: 25px;
  height: auto;
}

#toolContainer #firstRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#toolContainer #secondRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#toolContainer input[type=search] {
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

#toolContainer input[type=radio] {
  display:none;
  position:absolute;
  visibility: hidden;
}

#toolContainer label {
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 50px;
  color: white;
  background-color: #C3C3C3;
  font-size:16px;
}

#toolContainer #priceLabel {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#toolContainer #sizeLabel {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}

#toolContainer input[type=radio]:checked + label{
  background-color: #EB5440;
}

</style>