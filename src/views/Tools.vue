<template>
  <div id="toolContainer">
    <div id="firstRow">
      <div id="housesHeader">Houses</div>
      <button id="newButton">
        <img id="plusSymbol" src="../assets/ic_plus_white@3x.png" alt="plus symbol">
        CREATE NEW
      </button>
    </div>
    <div id="secondRow">
      <input type="text" placeholder="Search for a house">
      <div id="sortButtons">Price, Size</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#toolContainer {
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 100px;
  margin-top:30px;
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

input[type=text] {
  width: 400px;
  padding: 10px 10px 10px 50px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  background-image: url(../assets/ic_search@3x.png);
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 20px center;
}
</style>