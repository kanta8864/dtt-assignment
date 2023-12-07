<template>
    <router-link :to="{name: `houseDetail`, params: {id: house.id }}" id="house-preview">
        <div class="y">
            <HouseInfo :id="house.id"/>
        </div>
        <div v-if="house.madeByMe">
            <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
            <img src="../assets/ic_delete@3x.png" class="edit-delete-button" @click.prevent="houseStore.deleteHouse(house.id)">
        </div>
    </router-link>
</template>

<script>
import HouseInfo from "./HouseInfo.vue"
import axios from 'axios'
import { useHouseStore } from "../stores/HouseStore"

export default {
    name: "HouseDisplay",
    components: {HouseInfo},
    props: ["house"],
    setup(props) {
        const houseStore = useHouseStore()

        return {houseStore}
    }
}
</script>

<style>
#house-preview {
    background: white;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px 20px;
    height: 150px;
    font-family: "Open Sans";
    color: #4A4B4C;
    font-size: 16px;
    text-decoration: none;
}

.y {
    align-self: center;
}
</style>