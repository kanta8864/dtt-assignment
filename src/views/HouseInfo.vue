<template>
    <div class="houseInfoContainer" v-if="house">
        <img class="housePhoto" :src="house.image" alt="house photo">
        <div id="houseTextInfoContainer">
            <div class="houseDisplayHeader">{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div>&euro; {{ house.price }}</div>
            <div>{{ house.location.city }} {{ house.location.zip }}</div>
            <div class="moreInfo">
                <div class="bedroomInfo">
                    <img src="../assets/ic_bed@3x.png" alt="bed icon">
                    {{ house.rooms.bedrooms }}
                </div>
                <div class="bathroomInfo">
                    <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
                    {{ house.rooms.bathrooms }}
                </div>
                <div class="sizeInfo">
                    <img src="../assets/ic_size@3x.png" alt="size icon">
                    {{ house.size }} m2
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        errorrrrr
    </div>
</template>

<script>
import { ref } from "vue"
import axios from 'axios'

export default {
    props: ["id"],
    setup(props) {
        const house = ref(null)
        const error = ref(null)
        console.log("yooooo")
        const load = async () => {
            try {
                axios.defaults.headers['X-API-KEY'] = 'DiAa72IRMOZYnGe5qVSo9C4gmUQJ-wu3';
                let data = await axios.get("https://api.intern.d-tt.nl/api/houses/" + props.id)
                if (data.status !== 200) {
                    throw Error("No house was found")
                } else {
                    house.value = await data.data[0]
                    console.log(house.value)
                }
            } catch (e) {
                error.value = e.message
            }
        }
        load()
        return { house, error }
    }
}
</script>

<style>
.houseInfoContainer {
    display: flex;
    gap: 20px;
}

.housePhoto {
    border-radius: 20px;
    height:100%;
}

#houseTextInfoContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
}

.moreInfo img {
    width: 16px;
    height: auto;
}

.moreInfo {
    display: flex;
    gap: 10px;
}

.bedroomInfo,
.bathroomInfo,
.sizeInfo {
    display: flex;
    gap: 7px;
    align-items: center;
    justify-content: center;
}
</style>