<template>
  <div id="nav-container">
    <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
    <router-link :to="{name: `home`}">
        <div class="houses">Houses</div>
    </router-link>  
    <router-link :to="{name: `about`}">
        <div class="about">About</div>
    </router-link>
  </div>
</template>

<script>
export default {
    setup() {

    }
}
</script>

<style>
#nav-container {
    display:flex;
    gap: 70px;
    align-items: center;
    padding: 10px 40px;
    background-color:white;
    font-family: 'Montserrat';
}

#nav-container a {
    color: black;
    text-decoration: none;
    font-size:16px;
}

#nav-container a.router-link-exact-active {
    font-weight: bold;
}

img {
    max-width: 120px;  
    height: auto;  
}

</style>