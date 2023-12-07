<template>
    <NavVar />
    <div id="create-house" class="content">
        <form @submit.prevent="formSubmit">
            <div class="back-button">
                <!-- Comment -->
                <img src="../assets/ic_back_grey@3x.png" alt="back button" @click="this.$router.go(-1)">
                Back to Overview
            </div>
            <div>Create new listing</div>
            <div>
                <p>Street name</p>
                <input type="text" v-model="streetName" placeholder="Enter the street name" required>
            </div>
            <div>
                <div>
                    <p>House number</p>
                    <input type="text" v-model="houseNumber" placeholder="Enter house number" required>
                </div>
                <div>
                    <p>Addition (optional)</p>
                    <input type="text" v-model="numberAddition" placeholder="e.g. A">
                </div>
            </div>
            <div>
                <p>Postal code</p>
                <input type="text" v-model="zip" placeholder="e.g. 1000 AA" required>
            </div>
            <div>
                <p>City</p>
                <input type="text" v-model="city" placeholder="e.g. Utrecht" required>
            </div>
            <div>
                <p>Upload picture (PNG or JPG)</p>
                <input type="file" @change="onFileUpload" placeholder="e.g. Utrecht" required>
            </div>
            
            <div>
                <p>Price</p>
                <input type="text" v-model="price" placeholder="e.g. &euro;150.000" required>
            </div>
            <div>
                <div>
                    <p>Size</p>
                    <input type="text" v-model="size" placeholder="e.g. 60m2" required>
                </div>
                <div>
                    <p>Garage</p>
                    <input type="text" v-model="hasGarage" placeholder="Select" required>
                </div>
            </div>
            <div>
                <div>
                    <p>Bedrooms</p>
                    <input type="text" v-model="bedrooms" placeholder="Enter amount" required>
                </div>
                <div>
                    <p>Bathrooms</p>
                    <input type="text" v-model="bathrooms" placeholder="Enter amount" required>
                </div>
            </div>
            <div>
                <p>Construction date</p>
                <input type="text" v-model="constructionYear" placeholder="e.g. 1990" required>
            </div>
            <div>
                <p>Description</p>
                <input type="text" v-model="description" placeholder="e.g. Utrecht" required>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
import NavVar from "./NavVar.vue"
import { ref } from 'vue'
import { useHouseStore } from "../stores/HouseStore"

export default {
    components: { NavVar },
    setup() {
        const houseStore = useHouseStore()

        // for storing form inputs. The use of v-model allows for two-way data binding
        const streetName = ref("")
        const houseNumber = ref("")
        const numberAddition = ref("")
        const zip = ref("")
        const city = ref("")
        const price = ref("")
        const size = ref("")
        const hasGarage = ref("")
        const bedrooms = ref("")
        const bathrooms = ref("")
        const constructionYear = ref("")
        const description = ref("")

        const formSubmit = async function (e) {
            const body = {
                price: price.value, 
                bedrooms: bedrooms.value,
                bathrooms: bathrooms.value,
                size: size.value,
                streetName: streetName.value, 
                houseNumber:houseNumber.value, 
                numberAddition: numberAddition.value, 
                zip:zip.value, 
                city:city.value, 
                constructionYear: constructionYear.value, 
                hasGarage: hasGarage.value, 
                description: description.value
        }
            //validators
            houseStore.addHouse(body, file)
        }

        const file = ref("")

        const onFileUpload = function(e) {
            file.value = e.target.files[0]
            console.log(window.location.pathname)
            console.log(file.name)

        }
        return {price, bedrooms,bathrooms,size, streetName, houseNumber, numberAddition, zip, city, 
                constructionYear, hasGarage, description, file, formSubmit, onFileUpload}
    }
 }
</script>

<style>
#create-house {
    position: relative;
    left: 0;
    right: 0;
    z-index: 9999;
    margin-left: 20px;
    margin-right: 20px;

}

/*https://stackoverflow.com/questions/20039765/how-to-apply-a-css-filter-to-a-background-image
background-image: url(../assets/img_placeholder_house@3x.png);
*/
.createHouseContainer::before {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;

    display: block;

    background-size: cover;
    width: 100%;
    height: 100%;

    -webkit-filter: blur(15px);
    -moz-filter: blur(15px);
    -o-filter: blur(15px);
    -ms-filter: blur(15px);
    filter: blur(15px);
}
</style>