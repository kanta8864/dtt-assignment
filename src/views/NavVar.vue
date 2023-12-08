<template>
  <div id="nav-container">
    <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
    <!-- checks if the current route starts with /houses. 
        If so, add CSS class "active" and make the Houses text bold-->
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
        // use of computed property to automatically track its dependencies. (the route in this case) 
        // checks if the route contains houses. 
        const housesIncluded = computed(() => route.path.includes("/houses") ? true : false)
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