<template>
    <div id="house-info" v-if="house">
        <img class="house-photo" :src="house.image" alt="house photo">
        <div class="preview-text">
            <div class="street">{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div>&euro; {{ house.price }}</div>
            <div>{{ house.location.city }} {{ house.location.zip }}</div>
            <div class="more-info">
                <div class="bedroom-info">
                    <img src="../assets/ic_bed@3x.png" alt="bed icon">
                    {{ house.rooms.bedrooms }}
                </div>
                <div class="bathroom-info">
                    <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
                    {{ house.rooms.bathrooms }}
                </div>
                <div class="size-info">
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
#house-info {
    display: flex;
    gap: 20px;
    font-family: "Open Sans";
    font-weight:500;
}

#house-info .street {
    font-family: "Montserrat";
    font-weight: 700;
    font-size:18px;
}

.house-photo {
    border-radius: 20px;
    height:100%;
}

.preview-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
}

.more-info img {
    width: 16px;
    height: auto;
}

.more-info {
    display: flex;
    gap: 10px;
}

.bedroom-info,
.bathroom-info,
.size-info {
    display: flex;
    gap: 7px;
    align-items: center;
    justify-content: center;
}
</style>