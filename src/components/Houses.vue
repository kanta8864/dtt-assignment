<template>
  <div id="houses">
    <!-- if the search field is empty or search result size is graeter than 0 (there are some matches)
        then we show available listings -->
    <div v-if="searchText.length == 0 || searchResultSize > 0">
      <div v-if="searchText.length" id="searchMatches" class="header2">
        <div v-if="searchResultSize == 1">{{ searchResultSize }} result found</div>
        <div v-else>{{ searchResultSize }} results found</div>
      </div>
      <!-- if current sorting type is price, display a house list sorted by price -->
      <div v-if="sortType === 'price'" class="house-preview-container">
        <article v-for="house in houseStore.sortByPrice(houseStore.filterByText(searchText))" :key="house.id">
          <HousePreview :house="house" />
        </article>
      </div>
      <!-- if current sorting type is size, display a house list sorted by size -->
      <div v-if="sortType === `size`" class="house-preview-container">
        <article v-for="house in houseStore.sortBySize(houseStore.filterByText(searchText))" :key="house.id">
          <HousePreview :house="house" />
        </article>
      </div>
    </div>
    <!-- if there is no match to the search text, then we display that there was no match -->
    <div v-else id="noMatch">
      <img src="../assets/img_empty_houses@3x.png" alt="house search icon">
      <p>No results found.</p>
      <p>Please try another keyword.</p>
    </div>
  </div>
</template>

<script setup>
import HousePreview from './HousePreview.vue'
import { useHouseStore } from "../stores/HouseStore"

const props = defineProps({
  searchResultSize: Number,
  searchText: String,
  sortType: String
})

const houseStore = useHouseStore()
</script>

<style>
#houses {
  margin-bottom: 50px;
  padding: 10px 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#houses .house-preview-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#searchMatches {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}

#noMatch {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  font-size: 18px;
}

#noMatch img {
  margin-bottom: 30px;
  width: 300px;
  height: auto;
}

#noMatch p {
  margin: 5px;
}

@media only screen and (max-width: 1200px) {
  #houses {
    padding: 20px 100px;
  }
}

@media only screen and (max-width: 992px) {
  #houses {
    padding: 20px 30px;
  }
}

@media only screen and (max-width: 768px) {
  #houses {
    padding: 10px 20px;
  }
}

@media only screen and (max-width: 480px) {

  /* Styling rules for the main content of different pages */
  #houses {
    padding: 5px;
  }
}
</style>