<!-- this views file is responsible for showing a form to create a listing -->
<template>
    <NavVar />
    <div id="create-house">
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

<script setup>
import NavVar from "../components/NavVar.vue"
import HouseForm from "../components/HouseForm.vue"
</script>


<style>
#create-house {
    /* Answer from Fabrizio Calderan to put a gradient background over another background
    https://stackoverflow.com/questions/16791202/how-do-i-overlay-a-gradient-background-over-an-existing-background-with-css */
    background: linear-gradient(to right, rgba(255, 255, 256, 1) 0%, rgba(255, 255, 255, 0.2) 100%),
        url(../assets/img_placeholder_house@3x.png);
    box-sizing: border-box;
    padding: 10px 200px;
}

#create-house .top-row {
    display: flex;
    align-items: center;

}

#create-house .back-button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 16px;
    height: 50px;
    padding-top: 30px;
}

#create-house .back-button img {
    width: 16px;
    height: auto;
}


@media only screen and (max-width: 768px) {
    #create-house {
        padding: 10px 20px;
    }

    #create-house .header1 {
        text-align: center;
        margin-top: 40px;
    }

    #create-house .back-button {
        position: absolute;
        padding: 0 10px;
        z-index: 99;
    }

    #create-house .back-button div {
        display: none;
    }

    #create-house .back-button img {
        margin-top: 50px;
    }
}

@media only screen and (max-width: 480px) {}
</style>