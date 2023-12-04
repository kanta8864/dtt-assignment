<template>
    <div class="houseContainer">
        <img class="housePhoto" src="../assets/img_placeholder_house@3x.png" alt="house photo">
        <div class="houseInfo">
            <div>{{ house.location.street }} {{ house.location.houseNumber }}</div>
            <div>&euro; {{ house.price }}</div>
            <div>{{ house.location.city }} {{ house.location.zip }}</div>
            <div class="moreInfo">
                <div id="bedroomInfo">
                    <img src="../assets/ic_bed@3x.png" alt="bed icon">
                    {{ house.rooms.bedrooms }}
                </div>
                <div id="bathroomInfo">
                    <img src="../assets/ic_bath@3x.png" alt="bathroom icon">
                    {{ house.rooms.bathrooms }}
                </div>
                <div id="sizeInfo">
                    <img src="../assets/ic_size@3x.png" alt="size icon">
                    {{ house.size }}
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
    display:flex;
    justify-content: space-between;
    margin: 10px;
    border-radius: 10px;
    padding:10px 50px;
    height: 150px;
}

.houseContainer img {
    border-radius: 20px;
}

.houseContainer .houseInfo {
    display:flex;
    flex-direction: column;
    justify-content: center;
}

.houseContainer .moreInfo {
    display:flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.houseContainer .moreInfo img{
    width:25px;
    height:auto;
}

.houseContainer .editDelteButtons img{
    width:20px;
    height:auto;
    margin:5px;
}
</style>