<template>
  <div id="nav-container">
    <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
    <router-link :to="{name: `home`}" :class="housesIncluded ? `active` : ``">
        <div>Houses</div>
    </router-link>  
    <router-link :to="{name: `about`}" :class="housesIncluded ? `` : `active`">
        <div>About</div>
    </router-link>
  </div>
</template>

<script>
import {useRoute} from 'vue-router'
import {computed} from 'vue'

export default {
    setup() {
        const route = useRoute();
        const housesIncluded = computed(() => route.path.includes("houses") ? true : false)
        return {housesIncluded}
    }
}
</script>

<style>
#nav-container {
    display:flex;
    gap: 70px;
    align-items: center;
    padding: 15px 100px;
    background-color:white;
    font-family: "Montserrat";
    font-size:18px;
}

#nav-container a {
    color: black;
    text-decoration: none;
}

#nav-container .active {
    font-weight: 700;
}

img {
    max-width: 150px;  
    height: auto;  
}

</style>