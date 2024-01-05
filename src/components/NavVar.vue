<template>
  <!-- this component is for displaying a navigation bar -->
  <nav id="nav-container">
    <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
    <!-- active class is for styling the navigation bar text to be bold when needed -->
    <router-link :to="{ name: `home` }" :class="housesIncluded ? `active` : ``" id="home-button">
      <div>Houses</div>
    </router-link>
    <router-link :to="{ name: `myHouses` }" :class="myHousesIncluded ? `active` : ``">
      <div>My Listings</div>
    </router-link>
    <router-link :to="{ name: `favorites` }" :class="favoritesIncluded ? `active` : ``">
      <div>Favorites</div>
    </router-link>
    <router-link :to="{ name: `about` }" :class="aboutIncluded ? `active` : ``" id="about-button">
      <div>About</div>
    </router-link>
  </nav>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute();
// use of computed property to automatically track its dependencies. (the route in this case) 
// the following four values check if each navigation bar text needs to be bold given the current route
const housesIncluded = computed(() => route.path.includes("/houses") ? true : false)
const aboutIncluded = computed(() => route.path.includes("/about") ? true : false)
const myHousesIncluded = computed(() => route.path.includes("/myHouses") ? true : false)
const favoritesIncluded = computed(() => route.path.includes("/favorites") ? true : false)
</script>

<style>
#nav-container {
  display: flex;
  gap: 40px;
  align-items: center;
  padding: 20px 200px;
  background-color: white;
  font-family: "Montserrat", sans-serif;
  font-size: 18px;
}

#nav-container a {
  color: black;
  text-decoration: none;
}

#nav-container .active {
  font-weight: 700;
}

#nav-container img {
  max-width: 150px;
  height: auto;
}

@media only screen and (max-width: 1200px) {
  #nav-container {
    padding: 20px 100px;
  }
}

@media only screen and (max-width: 992px) {
  #nav-container {
    padding: 20px 30px;
  }
}

@media only screen and (max-width: 768px) {
  #nav-container {
    position: fixed;
    bottom: 0;
    width: calc(100% - 20px);
    gap: 0;
    padding: 10px;
    height: 50px;
    justify-content: space-around;
    font-size: 14px;
  }

  #nav-container a {
    height: 40px;
    display: flex;
    align-items: center;
  }

  #nav-container a {
    height: 40px;
  }

  #nav-container img {
    display: none
  }

  #home-button {
    background: url(../assets/ic_mobile_navigarion_home@3x.png);
    background-size: 35px;
    background-position: center;
    background-repeat: no-repeat;
  }

  #home-button.active {
    background: url(../assets/ic_mobile_navigarion_home_active@3x.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  #home-button div {
    color: transparent;
  }

  #about-button {
    background: url(../assets/ic_mobile_navigarion_info@3x.png);
    background-size: 35px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  #about-button.active {
    background: url(../assets/ic_mobile_navigarion_info_active@3x.png);
    background-size: contain;
    background-repeat: no-repeat;
  }

  #about-button div {
    color: transparent;
  }
}
</style>