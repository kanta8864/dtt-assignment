<template>
    <NavVar />
    <div id="create-house" class="content">
        <div class="back-button">
            <!-- Comment -->
            <img src="../assets/ic_back_grey@3x.png" alt="back button" @click="this.$router.go(-1)">
            Back to Overview
        </div>
        <div>Create new listing</div>
        <div>
            <p>Street name</p>
            <input type="text" v-model="name" placeholder="Enter the street name" required>
        </div>
        <div>
            <div>
                <p>House number</p>
                <input type="text" v-model="name" placeholder="Enter house number" required>
            </div>
            <div>
                <p>Addition (optional)</p>
                <input type="text" v-model="name" placeholder="e.g. A">
            </div>
        </div>
        <div>
            <p>Postal code</p>
            <input type="text" v-model="name" placeholder="e.g. 1000 AA" required>
        </div>
        <div>
            <p>City</p>
            <input type="text" v-model="name" placeholder="e.g. Utrecht" required>
        </div>
        <div>
            <p>Upload picture (PNG or JPG)</p>
            <input type="file" placeholder="e.g. Utrecht" required>
        </div>
        <div>
            <p>Price</p>
            <input type="text" v-model="name" placeholder="e.g. &euro;150.000" required>
        </div>
        <div>
            <div>
                <p>Size</p>
                <input type="text" v-model="name" placeholder="e.g. 60m2" required>
            </div>
            <div>
                <p>Garage</p>
                <input type="text" v-model="name" placeholder="Select" required>
            </div>
        </div>
        <div>
            <div>
                <p>Bedrooms</p>
                <input type="text" v-model="name" placeholder="Enter amount" required>
            </div>
            <div>
                <p>Bathrooms</p>
                <input type="text" v-model="name" placeholder="Enter amount" required>
            </div>
        </div>
        <div>
            <p>Construction date</p>
            <input type="text" v-model="name" placeholder="e.g. 1990" required>
        </div>
        <div>
            <p>Description</p>
            <input type="text" v-model="name" placeholder="e.g. Utrecht" required>
        </div>
    </div>
</template>

<script>
import NavVar from "./NavVar.vue"
export default {
    components: { NavVar },
    props: ["houseList"]
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
  
  background-size:cover;
  width: 100%;
  height: 100%;

  -webkit-filter: blur(15px);
  -moz-filter: blur(15px);
  -o-filter: blur(15px);
  -ms-filter: blur(15px);
  filter: blur(15px);
}





</style>