<template>
  <div id="tools" class="content">
    <div class="first-row">
      <div class="header1">Houses</div>
      <router-link id="new-button" :to="{ name: `create` }">
        <img src="../assets/ic_plus_white@3x.png" alt="plus symbol" class="plus-white">
        <img src="../assets/ic_plus_grey@3x.png" alt="plus symbol" class="plus-grey">
        <div>CREATE NEW</div>
      </router-link>
    </div>
    <div class="second-row">
      <!-- emits a custom event to the parent component (Home) when there is a change in input text
        It also emits the search text itself -->
      <input type="search" id="search-text-input" placeholder="Search for a house" v-model="searchText"
        @input="e => $emit('changeSearchText', e.target.value)">
      <div class="sort">
        <!-- emits a custom event to the parent component (Home) when the radio button is clicked
        It also emits a target-value which will either be price or size. -->
        <input type="radio" id="price-choice" name="choice" value="price" checked="checked"
          @click="e => $emit('changeSortTarget', e.target.value)">
        <label for="price-choice" id="price-label">Price</label>
        <input type="radio" id="size-choice" name="choice" value="size"
          @click="e => $emit('changeSortTarget', e.target.value)">
        <label for="size-choice" id="size-label">Size</label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue"

export default {
  emits: ["changeSortTarget"],
  setup() {
    // this variable will keep track of the user input for search text.
    const searchText = ref("")
    return { searchText }
  }
}
</script>

<style>
#tools {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: space-around;
  gap: 30px;
  font-family: "Montserrat", sans-serif;
  box-sizing: border-box;
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

/* Grey plus icon is not shown and taken out of document flow when viewd in desktop */
#tools #new-button .plus-grey {
  display: none;
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
  max-width: 400px;
  min-width: 300px;
  padding: 15px 15px 15px 50px;
  border-radius: 5px;
  font-size: 14px;
  border: none;
  /* adding search icon in the search bar */
  background-image: url(../assets/ic_search@3x.png);
  background-repeat: no-repeat;
  background-size: 20px;
  background-position: 20px center;
  background-color: #E8E8E8;
}

#tools input[type=radio] {
  display: none;
  position: absolute;
  visibility: hidden;
}

#tools label {
  display: inline-block;
  cursor: pointer;
  font-weight: bold;
  padding: 10px 50px;
  color: white;
  background-color: #C3C3C3;
  font-size: 16px;
}

#tools #price-label {
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#tools #size-label {
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
}


#tools input[type=radio]:checked+label {
  background-color: #EB5440;
}

@media only screen and (max-width: 768px) {
  #tools {
    gap: 10px;
  }

  #tools #new-button {
    background-color: transparent;
    border: none;
    padding: 0;
  }

  /* Hide the white plus button */
  #tools #new-button .plus-white {
    display: none;
  }

  /* Show the grey plus button */
  #tools #new-button .plus-grey {
    display: block;
  }

  /* Hide the "CREATE NEW" */
  #tools #new-button div {
    display: none;
  }

  #tools .first-row {
    margin: 20px 0;
  }

  #tools .first-row div {
    margin: auto;
    font-size:22px;
  }

  #tools .first-row a {
    position: absolute;
    right: 15px;
  }

  #tools .second-row {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
  }

  #tools input[type=search] {
    padding: 10px 15px 10px 50px;
  }
}

</style>