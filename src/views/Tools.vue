<template>
  <div class="toolContainer">
    <div class="firstRow">
      <div class="housesTitle">Houses</div>
      <button class="newButton">
        <img class="plusSymbol" src="../assets/ic_plus_white@3x.png" alt="plus symbol">
        CREATE NEW
      </button>
    </div>
    <div class="secondRow">
      <input type="text" placeholder="Search for a house" clearOnEdit>
      <div class="sortButtons">Price, Size</div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.toolContainer {
  display:flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 40px;
}

.toolContainer .housesTitle {
  font-size:30px;
  font-weight: bold;
}

.toolContainer .newButton {
  display: flex;
  align-items: center;
  gap: 10px;
  padding:10px 25px;
  border-radius:10px;
  color:white;
  background-color: #EB5440;
  border: none;
  font-weight: bold;
  font-size:16px;
}

.toolContainer .newButton img{
  width:25px;
  height:auto;
}

.toolContainer .firstRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toolContainer .secondRow {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input[type=text] {
  width: 400px;
  padding: 10px 10px 10px 50px;
  border-radius:5px;
  font-size:16px;
  border: none;
  background-image: url(../assets/ic_search@3x.png);
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 20px center;
}
</style>