<template>
    <router-link :to="{ name: `houseDetail`, params: { id: house.id } }" id="house-preview">
        <div class="left">
            <HouseInfo :id="house.id" />
        </div>
        <!-- only displays edit and delete button when the listing was made by the user
        click.prevent is there to stop the propagation of click event to the parent element (not to be routed to HouseDetail page)-->
        <div>
            <div v-if="house.madeByMe">
                <router-link :to="{ name: `edit`, params: { id: house.id } }">
                    <img src="../assets/ic_edit@3x.png" class="edit-delete-button">
                </router-link>
                <div>
                    <img src="../assets/ic_delete@3x.png" class="edit-delete-button" @click.prevent="openPopup(house.id)">
                </div>
                <Popup :houseId="house.id" @closePopup="closePopup" v-if="popupIsOpen" />
            </div>
            <!-- importing heart icon for marking a listing as favorite-->
            <font-awesome-icon :icon="['fas', 'heart']" :class="{ active: houseStore.getFavs.includes(house) }"
                @click.prevent="houseStore.toggleFav(house.id)" size="2x" />
        </div>
    </router-link>
</template>

<script>
import HouseInfo from "./HouseInfo.vue"
import { useHouseStore } from "../stores/HouseStore"
import DeletePopup from "./DeletePopup.vue"
import { ref } from 'vue'

export default {
    components: { HouseInfo, DeletePopup },
    props: ["house"],
    setup() {
        const houseStore = useHouseStore()

        // manages if the popup to confirm listing deletion is open or not
        const popupIsOpen = ref(false)
        const openPopup = () => {
            popupIsOpen.value = true
        }
        const closePopup = () => {
            popupIsOpen.value = false
        }
        return { houseStore, popupIsOpen, openPopup, closePopup }
    }
}
</script>

<style>
#house-preview .active {
    color: red
}

#house-preview {
    background: white;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px 20px;
    height: 150px;
    font-family: "Open Sans", sans-serif;
    color: #4A4B4C;
    font-size: 16px;
    text-decoration: none;
}

#house-preview .left {
    align-self: center;
    height: 100%;
}

@media only screen and (max-width: 768px) {
    #house-preview {
        font-size: 12px;
        height: 130px;
        padding: 10px 10px;
    }
}
</style>