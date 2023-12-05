<template>
    <router-link :to="{name: `houseDetail`, params: {id: house.id }}" class="housePreviewContainer">
        <div class="y">
            <HouseInfo :id="house.id"/>
        </div>
        <div>
            <img src="../assets/ic_edit@3x.png" class="editDeleteButton">
            <img src="../assets/ic_delete@3x.png" class="editDeleteButton">
        </div>
    </router-link>
</template>

<script>
import HouseInfo from "./HouseInfo.vue"

export default {
    name: "HouseDisplay",
    components: {HouseInfo},
    props: ["house"],
}
</script>

<style>
.housePreviewContainer {
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

.housePreviewContainer .editDeleteButton {
    width: 20px;
    height: auto;
    margin: 5px;
    align-items:start;
}

.housePreviewContainer .houseDisplayHeader {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 16px;
}

.y {
    align-self: center;
}
</style>