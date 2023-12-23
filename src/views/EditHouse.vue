<!-- this views file is responsible for showing a form to edit listing detail -->
<template>
    <NavVar />
    <div id="edit-house" class="content">
        <div class="back-button">
            <!-- Use of router link to navigate user back to house detail page when clicked -->
            <router-link :to="{ name: `houseDetail`, params: { id: id } }">
                <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
            </router-link>
            <div>Back to House Detail</div>
        </div>
        <div class="header1">Edit listing</div>
        <HouseForm type="edit" :id="id" />
    </div>
</template>

<script setup>
import NavVar from "../components/NavVar.vue"
import HouseForm from "../components/HouseForm.vue"
import { defineProps } from "vue"

const props = defineProps({
  id: Number,
})
</script>

<style>
#edit-house {
    /* answer from Fabrizio Calderan to put a gradient background over another background
    https://stackoverflow.com/questions/16791202/how-do-i-overlay-a-gradient-background-over-an-existing-background-with-css */
    background: linear-gradient(to right, rgba(255, 255, 256, 1) 0%, rgba(255, 255, 255, 0.2) 100%),
        url(../assets/img_placeholder_house@3x.png);
        box-sizing: border-box;
}

@media only screen and (max-width: 768px) {
    #edit-house {
        padding: 10px;
    }

    #edit-house .header1 {
        text-align: center;
        margin-top: 40px;
    }
}
</style>
