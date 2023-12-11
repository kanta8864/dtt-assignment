<template>
    <NavVar />
    <div id="create-house" class="content">
        <div class="back-button">
            <!-- $router.go(-1) is used to go back to the previous page based on navigation history  -->
            <router-link :to="{ name: `home` }">
                <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
            </router-link>
            <div>Back to House Detail</div>
        </div>
        <div class="header1">Create new listing</div>
        <HouseForm type="create" />
    </div>
</template>

<script>
import NavVar from "./NavVar.vue"
import HouseForm from "./HouseForm.vue"

export default {
    components: { NavVar, HouseForm }
}
</script>


<style>
#create-house {
    /* answer from Fabrizio Calderan to put a gradient background over another background
    https://stackoverflow.com/questions/16791202/how-do-i-overlay-a-gradient-background-over-an-existing-background-with-css */
    background: linear-gradient(to right, rgba(255, 255, 256, 1) 0%, rgba(255, 255, 255, 0.2) 100%),
        url(../assets/img_placeholder_house@3x.png);
}

@media only screen and (max-width: 600px) {
    #create-house {
        width: calc(100% - 40px)
    }

    #create-house .header1 {
        text-align: center;
        margin-top: 40px;
    }
}
</style>