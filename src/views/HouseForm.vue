<template>
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
                <div v-if="type == 'create'">
                    <input type="file" class="file" @change="onFileUpload" required>
                    <div id="preview">
                        <img v-if="url" :src="url">
                    </div>
                </div>
                <!-- following is for when the user is trying to edit listing-->
                <div v-else>
                    <input type="file" class="file" id="fileInput" @change="onFileUpload" style="display:none;" required>
                    <label for="fileInput" class="fileUpload">
                        <img src="../assets/ic_upload@3x.png" alt="upload icon">
                    </label>
                    <!-- if user submits a new image, show that preview, otherwise show the original image -->
                    <div id="preview">
                        <img v-if="url" :src="url">
                        <img v-else-if="filePath" :src="filePath">
                    </div>
                </div>
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
                <button type="submit" v-if="type=='create'">POST</button>
                <button type="submit" v-if="type=='edit'">SAVE</button>
            </div>
        </form>
</template>

<script>
import { ref } from 'vue'
import { useHouseStore } from "../stores/HouseStore"

export default {
  props: ["type", "id"], 
  setup(props) {
        const houseStore = useHouseStore()

        // this keeps track of the name of the submitted file and a string containing a URL representing the image
        const file = ref("")
        const url = ref("")
        const onFileUpload = function (e) {
            file.value = e.target.files[0]
            url.value = URL.createObjectURL(file.value);
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
        const filePath = ref("")

        if(props.type === "edit") {
                const house = houseStore.getById(props.id)
                streetName.value = house.location.street
                houseNumber.value = house.location.houseNumber
                numberAddition.value = house.location.houseNumberAddition
                zip.value = house.location.zip
                city.value = house.location.city
                price.value = house.price
                size.value = house.size
                hasGarage.value = house.hasGarage
                bedrooms.value = house.rooms.bedrooms
                bathrooms.value = house.rooms.bathrooms
                constructionYear.value = house.constructionYear
                description.value = house.description
                filePath.value = house.image
            
        }

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

            if(props.type === "create") {
                houseStore.addHouse(body, file)
                // clearing text fields and file input
                streetName.value = houseNumber.value = numberAddition.value = zip.value = city.value = price.value =
                size.value = hasGarage.value = bedrooms.value = bathrooms.value = constructionYear.value = description.value = ""
                const file = document.querySelector(".file")
                file.value = ""
                alert("House listing posted!")
            } else {
                houseStore.updateHouse(props.id, body, file)
                alert("House detail editted!")
            }
        }

        return {
            price, bedrooms, bathrooms, size, streetName, houseNumber, numberAddition, zip, city,
            constructionYear, hasGarage, description, file, onFileUpload, formSubmit, url, filePath
        }
    }
}
</script>

<style>
#house-form {
    display: flex;
    flex-direction: column;
    width: 25%;
    gap: 15px;
}

#house-form input {
    border: none;
    width: 100%;
    height: 40px;
}

#house-form textarea {
    border: none;
    width: 100%;
    height: 150px;
}

#house-form button {
    background-color: #EB5440;
    color: white;
    text-align: center;
    padding: 12px 0px;
    border-radius: 5px;
    width: 160px;
    font-family: "Montserrat";
    font-size: 18px;
    font-weight: 700;
    border: none;
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

#house-form .house-number {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.fileUpload img{
    border: 1px dotted grey;
    height:100%;
}

#house-form .house-number div {
    width: calc(50% - 20px);
}
</style>
