<template>
    <div class="houseListContainer">
        <div v-for="house in houseList" :key="house.id">
            <HouseDisplay :house="house" />
        </div>
    </div>
</template>

<script>
import HouseDisplay from './HouseDisplay.vue'

export default {
    name: "HousesComponent",
    components: {HouseDisplay},
    props: ["houseList"]
}
</script>

<style>
</style>