<template>
    <div id="house-info" >
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
</template>

<script>
import { useHouseStore } from "../stores/HouseStore"

export default {
    props: ["id"],
    setup(props) {
        const houseStore = useHouseStore()
        const house = houseStore.getById(props.id)
        console.log(house)
        return { houseStore, house }
    }
}
</script>

<style>
#house-info {
    display: flex;
    gap: 20px;
    font-family: "Open Sans";
    font-weight:500;
    height:100%;
}

#house-info .street {
    font-family: "Montserrat";
    font-weight: 700;
    font-size:18px;
}

.house-photo {
    border-radius: 20px;
    margin: 10px;
    aspect-ratio: 1 / 1; 
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