<template>
    <NavVar />
    <div id="house-form">
        <div v-if="type == 'create'" class="top-row">
            <div class="back-button">
                <!-- Use of router link to navigate user back to house overview page when clicked -->
                <router-link :to="{ name: `home` }">
                    <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
                </router-link>
                <div>Back to House Overview</div>
            </div>
            <div class="header1">Create new listing</div>
        </div>
        <div v-if="type == 'edit'" class="top-row">
            <div class="back-button">
                <!-- Use of router link to navigate user back to house detail page when clicked -->
                <router-link :to="{ name: `houseDetail`, params: { id: id } }">
                    <img src="../assets/ic_back_grey@3x.png" alt="back button" class="back-grey">
                </router-link>
                <div>Back to House Detail</div>
            </div>
            <div class="header1">Edit listing</div>
        </div>
        <!-- This component contains a form which is used to create and edit a listing -->
        <!-- submit.prevent prevents the default behavior of the form submit and let us execute formSubmit function -->
        <form @submit.prevent="formSubmit" novalidate>
            <div>
                <p>Street name&#x2a;</p>
                <input type="text" id="street-input" v-model="streetName" placeholder="Enter the street name" required>
            </div>
            <div class="house-number">
                <div>
                    <p>House number&#x2a;</p>
                    <input type="text" id="house-number-input" v-model="houseNumber" placeholder="Enter house number"
                        required>
                </div>
                <div>
                    <p>Addition (optional)</p>
                    <input type="text" id="addition-input" v-model="numberAddition" placeholder="e.g. A">
                </div>
            </div>
            <div>
                <p>Postal code&#x2a;</p>
                <input type="text" id="postal-code-input" v-model="zip" placeholder="e.g. 1000 AA" required>
            </div>
            <div>
                <p>City&#x2a;</p>
                <input type="text" id="city-input" v-model="city" placeholder="e.g. Utrecht" required>
            </div>
            <div>
                <p>Upload picture (PNG or JPG)&#x2a;</p>
                <div id="house-photo-input-container">
                    <input type="file" id="picture-input" class="file" @change="onFileUpload" required>
                    <!-- show currently chosen photo as preview -->
                    <img class="house-photo" :src="houseImage" alt="house photo" v-if="!fileName && type == 'edit'">
                    <img :src="url" v-if="fileName" class="house-photo">
                </div>
            </div>

            <div>
                <p>Price&#x2a;</p>
                <input type="text" id="price-input" v-model="price" placeholder="e.g. &euro;150.000" required>
            </div>
            <div>
                <div>
                    <p>Size&#x2a;</p>
                    <input type="text" id="size-input" v-model="size" placeholder="e.g. 60m2" required>
                </div>
                <div>
                    <p>Garage&#x2a;</p>
                    <div id="garage-input">
                        <input type="radio" id="yesGarage" value="true" v-model="hasGarage">
                        <label for="yesGarage" id="yes-label">Yes</label>
                        <input type="radio" id="noGarage" value="false" v-model="hasGarage">
                        <label for="noGarage" id="no-label">No</label>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <p>Bedrooms&#x2a;</p>
                    <input type="text" id="bedroom-input" v-model="bedrooms" placeholder="Enter amount" required>
                </div>
                <div>
                    <p>Bathrooms&#x2a;</p>
                    <input type="text" id="bathroom-input" v-model="bathrooms" placeholder="Enter amount" required>
                </div>
            </div>
            <div>
                <p>Construction year&#x2a;</p>
                <input type="text" id="construction-year-input" v-model="constructionYear" placeholder="e.g. 1990" required>
            </div>
            <div id="description">
                <p>Description&#x2a;</p>
                <textarea v-model="description" id="description-input" placeholder="Enter description" required></textarea>
            </div>
            <div id="post-button-container">
                <!-- decide which button to display depending on the type passed as a prop -->
                <button type="submit" v-if="type == 'create'">POST</button>
                <button type="submit" v-if="type == 'edit'">SAVE</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useHouseStore } from "../stores/HouseStore"
import NavVar from "../components/NavVar.vue"

const props = defineProps({
    id: String,
    type: String
})

const houseStore = useHouseStore()

// get a house image if id is passed as a prop. 
// (This is used to show the current house picture)
let houseImage = ""
if (props.id) {
    const house = houseStore.getById(props.id)
    houseImage = house.image
}

// this keeps track of the name of the submitted file and a string containing a URL representing the image
const fileName = ref("")
const url = ref("")
const onFileUpload = function (e) {
    fileName.value = e.target.files[0]
    url.value = URL.createObjectURL(fileName.value)
}

// for storing form inputs. The use of v-model allows for two-way data binding
const streetName = ref("")
const houseNumber = ref("")
const numberAddition = ref("")
const zip = ref("")
const city = ref("")
const price = ref("")
const size = ref("")
const hasGarage = ref("true")
const bedrooms = ref("")
const bathrooms = ref("")
const constructionYear = ref("")
const description = ref("")
const filePath = ref("")

if (props.type === "edit") {
    const house = houseStore.getById(props.id)
    // set the default input value to equal the exisiting data 
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

// function which displays error message in case of bad input (missing required field, invalid input type etc)
function hadleBadInput(id, message) {
    const inputField = document.querySelector(`#${id}`)
    const errorMessageSpan = document.createElement("span")
    errorMessageSpan.classList.add("error-message")
    errorMessageSpan.appendChild(document.createTextNode(message))
    inputField.style.border = "1px solid red"
    inputField.parentNode.insertBefore(errorMessageSpan, inputField.nextSibling)
}

// function to validate the inputs by the users
function validateInputs() {
    // check if there exists any required fields missing  
    if (!streetName.value) hadleBadInput("street-input", "Required field missing")
    else if (!houseNumber.value) hadleBadInput("house-number-input", "Required field missing")
    else if (!zip.value) hadleBadInput("postal-code-input", "Required field missing")
    else if (!city.value) hadleBadInput("city-input", "Required field missing")
    else if (!fileName.value && props.type != "edit") hadleBadInput("picture-input", "Required field missing")
    else if (!price.value) hadleBadInput("price-input", "Required field missing")
    else if (!size.value) hadleBadInput("size-input", "Required field missing")
    else if (!bedrooms.value) hadleBadInput("bedroom-input", "Required field missing")
    else if (!bathrooms.value) hadleBadInput("bathroom-input", "Required field missing")
    else if (!constructionYear.value) hadleBadInput("construction-year-input", "Required field missing")
    else if (!description.value) hadleBadInput("description-input", "Required field missing")
    else {
        // check if the input is valid 
        if (isNaN(parseInt(houseNumber.value))) hadleBadInput("house-number-input", "Invalid house number input")
        else if (isNaN(parseInt(price.value))) hadleBadInput("price-input", "Invalid price input")
        else if (isNaN(parseInt(size.value))) hadleBadInput("size-input", "Invalid size input")
        else if (isNaN(parseInt(bedrooms.value))) hadleBadInput("bedroom-input", "Invalid bedrooms input")
        else if (isNaN(parseInt(bathrooms.value))) hadleBadInput("bathroom-input", "Invalid bathrooms input")
        else if (isNaN(parseInt(constructionYear.value))) hadleBadInput("construction-year-input", "Invalid construction year input")
        else return true
    }
}

// defines the behaviour when the POST button is pressed
const formSubmit = async function (e) {
    // remove the error message div from DOM and make the input border back to black
    const errorMessageDiv = document.querySelector(".error-message")
    if (errorMessageDiv) {
        const inputFields = document.querySelectorAll("#house-form input")
        inputFields.forEach(input => input.style.border = "none")
        errorMessageDiv.remove()
    }

    if (validateInputs()) {
        const body = {
            price: parseInt(price.value),
            bedrooms: parseInt(bedrooms.value),
            bathrooms: parseInt(bathrooms.value),
            size: parseInt(size.value),
            streetName: streetName.value,
            houseNumber: parseInt(houseNumber.value),
            numberAddition: numberAddition.value,
            zip: zip.value,
            city: city.value,
            constructionYear: parseInt(constructionYear.value),
            hasGarage: hasGarage.value,
            description: description.value,
        }

        if (props.type === "create") {
            houseStore.addHouse(body, fileName).then((isSuccessful) => {
                // Only clear inputs when there was no error was caught when making request to House API
                if (isSuccessful) {
                    // clearing all the inputs
                    streetName.value = houseNumber.value = numberAddition.value = zip.value = city.value = price.value =
                        size.value = bedrooms.value = bathrooms.value = constructionYear.value = description.value = ""
                    const file = document.querySelector(".file")
                    file.value = ""
                    document.getElementById("yesGarage").checked = true;
                    document.getElementById("noGarage").checked = false;
                }
            })
        } else {
            houseStore.updateHouse(props.id, body, fileName.value)
        }
    }
}
</script>

<style>
#house-form {
    /* Answer from Fabrizio Calderan to put a gradient background over another background
    https://stackoverflow.com/questions/16791202/how-do-i-overlay-a-gradient-background-over-an-existing-background-with-css */
    background: linear-gradient(to right, rgba(255, 255, 256, 1) 0%, rgba(255, 255, 255, 0.2) 100%),
        url(../assets/img_placeholder_house@3x.png);
    background-size: cover;
    box-sizing: border-box;
    padding: 10px 200px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 14px;
}

#house-form .back-button {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    font-size: 16px;
    height: 50px;
    padding-top: 30px;
}

#house-form .back-button img {
    width: 16px;
    height: 16px;
}

#house-form form {
    display: flex;
    flex-direction: column;
    width: 35%;
    max-width: 500px;
    gap: 15px;
}

#house-form input[type=text],
#house-form textarea {
    border: none;
    width: 100%;
    height: 40px;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 20px;
    border-radius: 5px;
}

#house-form input[type=radio] {
    display: none;
    position: absolute;
    visibility: hidden;
}

/* for garage options */
#house-form label {
    display: inline-block;
    cursor: pointer;
    font-weight: bold;
    padding: 10px 50px;
    color: white;
    background-color: #C3C3C3;
    font-size: 16px;
}

#house-form #yes-label {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

#house-form #no-label {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}

#house-form input[type=radio]:checked+label {
    background-color: #EB5440;
}

#house-form textarea {
    height: 150px;
    padding-top: 15px;
}

#house-form button {
    background-color: #EB5440;
    color: white;
    text-align: center;
    padding: 12px 0;
    border-radius: 5px;
    width: 160px;
    font-family: "Montserrat", sans-serif;
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
    font-family: "Montserrat", sans-serif;
    font-weight: 600;
    margin-bottom: 10px;
}

#house-form .house-number {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

#house-form .house-number div {
    width: calc(50% - 20px);
}

#house-form #house-photo-input-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#house-form .error-message {
    font-size: 14px;
    font-family: "Montserrat";
    font-style: italic;
    color: red;
}

/* hides "no file selected" text */
#house-form input[type='file'] {
    color: transparent;
}

@media only screen and (max-width: 768px) {
    #house-form {
        padding: 10px 20px;
    }

    #house-form .top-row {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
    }

    #house-form .header1 {
        text-align: center;
        margin-top: 40px;
    }

    #house-form .back-button {
        position: absolute;
        left:0;
        z-index: 99;
    }

    #house-form .back-button div {
        display: none;
    }

    #house-form form {
        width: 100%;
        margin: 0;
        gap: 15px;
        margin-bottom: 80px;
    }

    #house-form label {
        font-size: 14px;
    }

    #house-form input[type=text],
    #house-form textarea {
        font-size: 12px;
    }

    #house-form textarea {
        height: 120px;
    }


    #house-form .house-number div {
        width: calc(50% - 20px);
    }

    #house-form .error-message {
        font-size: 12px;
    }
}
</style>
