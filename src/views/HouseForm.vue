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
            <input type="file" class="file" @change="onFileUpload" required>

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
                <input type="radio" id="yesGarage" value="true" v-model="hasGarage">
                <label for="yesGarage" id="yes-label">Yes</label>
                <input type="radio" id="noGarage" value="false" v-model="hasGarage">
                <label for="noGarage" id="no-label">No</label>
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
            <textarea v-model="description" placeholder="Enter description" required></textarea>
        </div>
        <div id="post-button-container">
            <button type="submit" v-if="type == 'create'">POST</button>
            <button type="submit" v-if="type == 'edit'">SAVE</button>
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
        const fileName = ref("")
        const url = ref("")
        const onFileUpload = function (e) {
            fileName.value = e.target.files[0]
            url.value = URL.createObjectURL(fileName.value);
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

        // defines the behaviour when the POST button is pressed
        const formSubmit = async function (e) {
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


            //validators

            if (props.type === "create") {
                houseStore.addHouse(body, fileName)
                // clearing all the inputs
                streetName.value = houseNumber.value = numberAddition.value = zip.value = city.value = price.value =
                    size.value = bedrooms.value = bathrooms.value = constructionYear.value = description.value = ""
                const file = document.querySelector(".file")
                file.value = ""
                document.getElementById("yesGarage").checked = true;
                document.getElementById("noGarage").checked = false;
                alert("House listing posted!")
            } else {
                houseStore.updateHouse(props.id, body, fileName)
                alert("House detail editted!")
            }
        }

        return {
            price, bedrooms, bathrooms, size, streetName, houseNumber, numberAddition, zip, city,
            constructionYear, hasGarage, description, fileName, onFileUpload, formSubmit, url, filePath
        }
    }
}
</script>

<style>
#house-form input[type=radio] {
    display: none;
    position: absolute;
    visibility: hidden;
}

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

#house-form {
    display: flex;
    flex-direction: column;
    width: 35%;
    max-width: 500px;
    min-width: 350px;
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

.fileUpload img {
    border: 1px dotted grey;
    height: 100%;
}

#house-form .house-number div {
    width: calc(50% - 20px);
}

@media only screen and (max-width: 600px) {
    #house-form label {
        font-size: 14px;
    }

    #house-form {
        width: 100%;
        margin:0;
        gap: 15px;
        margin-bottom:80px;
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

    .fileUpload img {
        border: 1px dotted grey;
        height: 100%;
    }

    #house-form .house-number div {
        width: calc(50% - 20px);
    }
}
</style>
