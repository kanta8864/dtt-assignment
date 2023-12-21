<!-- this views file is responsible for showing a form to create a listing -->
<template>
    <NavVar />
    <div id="create-house" class="content">
        <div class="back-button">
            <!-- Use of router link to navigate user back to house overview page when clicked -->
            <router-link :to="{ name: `home` }">
                <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
            </router-link>
            <div>Back to House Overview</div>
        </div>
        <div class="header1">Create new listing</div>
        <HouseForm type="create" />
    </div>
</template>

<script>
import NavVar from "../components/NavVar.vue"
import HouseForm from "../components/HouseForm.vue"

export default {
    components: { NavVar, HouseForm }
}
</script>


<style>
#create-house {
    /* Answer from Fabrizio Calderan to put a gradient background over another background
    https://stackoverflow.com/questions/16791202/how-do-i-overlay-a-gradient-background-over-an-existing-background-with-css */
    background: linear-gradient(to right, rgba(255, 255, 256, 1) 0%, rgba(255, 255, 255, 0.2) 100%),
        url(../assets/img_placeholder_house@3x.png);
        box-sizing: border-box;
}

@media only screen and (max-width: 768px) {
    #create-house {
        padding: 10px;
    }

    #create-house .header1 {
        text-align: center;
        margin-top: 40px;
    }
}

@media only screen and (max-width: 480px) {
}
</style>