<template>
    <div id="houses">
        <div v-for="house in houseList" :key="house.id">
            <HousePreview :house="house" />
        </div>
    </div>
</template>

<script>
import HousePreview from './HousePreview.vue'

export default {
    name: "HousesComponent",
    components: {HousePreview},
    props: ["houseList"]
}
</script>

<style>
#houses {
    padding: 10px 100px;
    display:flex;
    flex-direction: column;
    gap:10px;
}
</style>