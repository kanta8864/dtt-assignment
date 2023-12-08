<template>
    <NavVar />
    <div id="create-house" class="content">
        <div class="back-button">
            <!-- $router.go(-1) is used to go back to the previous page based on navigation history  -->
            <img src="../assets/ic_back_grey@3x.png" alt="back button" @click="$router.go(-1)">
            Back to Overview
        </div>
        <div class="header1">Create new listing</div>
        <!-- submit.prevent prevents the default behavior of the form submit and let us execute formSubmit function -->
        <form @submit.prevent="formSubmit" id="house-form">
            <div>
                <p>Street name&#x2a;</p>
                <input type="text" v-model="streetName" placeholder="Enter the street name" required>
            </div>
            <div class="house-number">
                <div>
                    <p>House number&#x2a;</p>
                    <input type="text" v-model="houseNumber" placeholder="Enter house number" required>
                </div>
                <div>
                    <p>Addition (optional)</p>
                    <input type="text" v-model="numberAddition" placeholder="e.g. A">
                </div>
            </div>
            <div>
                <p>Postal code&#x2a;</p>
                <input type="text" v-model="zip" placeholder="e.g. 1000 AA" required>
            </div>
            <div>
                <p>City&#x2a;</p>
                <input type="text" v-model="city" placeholder="e.g. Utrecht" required>
            </div>
            <div>
                <p>Upload picture (PNG or JPG)&#x2a;</p>
                <input type="file" @change="onFileUpload" placeholder="e.g. Utrecht" required>
            </div>

            <div>
                <p>Price&#x2a;</p>
                <input type="text" v-model="price" placeholder="e.g. &euro;150.000" required>
            </div>
            <div>
                <div>
                    <p>Size&#x2a;</p>
                    <input type="text" v-model="size" placeholder="e.g. 60m2" required>
                </div>
                <div>
                    <p>Garage&#x2a;</p>
                    <input type="text" v-model="hasGarage" placeholder="Select" required>
                </div>
            </div>
            <div>
                <div>
                    <p>Bedrooms&#x2a;</p>
                    <input type="text" v-model="bedrooms" placeholder="Enter amount" required>
                </div>
                <div>
                    <p>Bathrooms&#x2a;</p>
                    <input type="text" v-model="bathrooms" placeholder="Enter amount" required>
                </div>
            </div>
            <div>
                <p>Construction date&#x2a;</p>
                <input type="text" v-model="constructionYear" placeholder="e.g. 1990" required>
            </div>
            <div id="description">
                <p>Description&#x2a;</p>
                <textarea v-model="description" placeholder="e.g. Utrecht" required></textarea>
            </div>
            <div id="post-button-container">
                <button type="submit">POST</button>
            </div>
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

        // this keeps track of the name of the submitted file
        const fileName = ref("")
        const onFileUpload = function (e) {
            fileName.value = e.target.files[0]
        }

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

        // defines the behaviour when the POST button is pressed
        const formSubmit = async function (e) {
            const body = {
                price: price.value,
                bedrooms: bedrooms.value,
                bathrooms: bathrooms.value,
                size: size.value,
                streetName: streetName.value,
                houseNumber: houseNumber.value,
                numberAddition: numberAddition.value,
                zip: zip.value,
                city: city.value,
                constructionYear: constructionYear.value,
                hasGarage: hasGarage.value,
                description: description.value
            }
            //validators

            // calls addHouse defined in HouseStore
            houseStore.addHouse(body, fileName)
        }

        return {
            price, bedrooms, bathrooms, size, streetName, houseNumber, numberAddition, zip, city,
            constructionYear, hasGarage, description, fileName, onFileUpload, formSubmit
        }
    }
}
</script>


<style>
#house-form {
    display: flex;
    flex-direction: column;
    width: 25%;
    gap:15px;
}

#create-house input {
    border: none;
    width: 100%;
    height: 40px;
}

#create-house textarea {
    border: none;
    width: 100%;
    height: 150px;
}

#create-house button {
    background-color: #EB5440;
    color:white;
    text-align: center;
    padding: 12px 0px;
    border-radius: 5px;
    width:160px;
    font-family: "Montserrat";
    font-size:18px;
    font-weight: 700;
    border:none;
}

#post-button-container {
    display: flex;
    justify-content: end;
}

#create-house p {
    font-size: 14px;
    font-family: "Montserrat";
    font-weight: 600;
    margin-bottom: 10px;
}

#create-house input::placeholder {
    font-size: 14px;
    font-family: "Open Sans";
    color: #4A4B4C;
}

#create-house .house-number {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

#create-house .house-number div{
    width:calc(50% - 20px);
}

</style>