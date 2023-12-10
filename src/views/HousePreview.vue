<template>
    <router-link :to="{ name: `houseDetail`, params: { id: house.id } }" id="house-preview">
        <div class="left">
            <HouseInfo :id="house.id" />
        </div>
        <!-- only displays edit and delete button when the listing was made by the user
        click.prevent is there to stop the propagation of click to the parent elements (not to be routed to HouseDetail page)-->
        <div>
            <div v-if="house.madeByMe">
                <router-link :to="{ name: `edit`, params: { id: house.id } }">
                    <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
                </router-link>
                <router-link :to="{ name: `home`}">
                    <img src="../assets/ic_delete@3x.png" class="edit-delete-button"
                    @click.prevent="houseStore.deleteHouse(house.id)">
                </router-link>
            </div>
            <font-awesome-icon :icon="['fas', 'heart']" :class="{active: house.isFav}" @click.prevent="houseStore.toggleFav(house.id)" size="lg"/>
        </div>
    </router-link>
</template>

<script>
import HouseInfo from "./HouseInfo.vue"
import { useHouseStore } from "../stores/HouseStore"

export default {
    components: { HouseInfo },
    props: ["house"],
    setup() {
        const houseStore = useHouseStore()
        return { houseStore}
    }
}
</script>

<style>
#house-preview .active {
    color:red
}
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

#house-preview .left {
    align-self: center;
    height: 100%;
}
</style>