<template>
    <div class="houseContainer">
        <div class="left">
            <img class="housePhoto" src="../assets/img_placeholder_house@3x.png" alt="house photo">
            <div class="houseInfo">
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
        <div class="editDelteButtons">
            <img src="../assets/ic_edit@3x.png">
            <img src="../assets/ic_delete@3x.png">
        </div>
    </div>
</template>

<script>
export default {
    name: "HouseDisplay",
    props: ["house"]
}
</script>

<style>
.houseContainer {
    background: white;
    display: flex;
    justify-content: space-between;
    border-radius: 10px;
    padding: 10px 20px;
    height: 150px;
    font-family: "Open Sans";
    color: #4A4B4C;
    font-size: 16px;
}

.houseContainer .left {
    display: flex;
    gap: 20px;
}

.houseContainer .housePhoto {
    border-radius: 20px;
}

.houseContainer .houseInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 7px;
}

.houseContainer .moreInfo {
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

.houseContainer .moreInfo img {
    width: 16px;
}

.houseContainer .editDelteButtons img {
    width: 20px;
    height: auto;
    margin: 5px;
}

.houseContainer .houseDisplayHeader {
    font-family: "Montserrat";
    font-weight: 700;
    font-size: 16px;
}
</style>