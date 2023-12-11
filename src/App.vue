<template>
  <router-view />
</template>

<style>
/* import two fonts from google font */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

body {
  color: black;
  margin: 0;
  background-color: #F6F6F6;
}

/* styling rules for the main content of different pages */
.content {
  margin: 0;
  padding: 10px 70px;
}


/* styling rules for header1 */
.header1 {
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 32px;
  margin: 30px 0px;
}

/* styling rules for header2 */
.header2 {
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 22px;
  margin: 15px 0px;
}

/* styling rules for go back icon and text */
.back-button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Montserrat";
  font-weight: 600;
  font-size: 16px;
}

.back-button img {
  width: 16px;
  height: auto;
  margin: 30px 0px;
}

/* styling rules for editing and deleting button */
.edit-delete-button {
  width: 25px;
  height: auto;
  margin: 5px;
}

/* styling rules for displaying house listings */
.house-preview-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media only screen and (max-width: 600px) {
/* styling rules for the main content of different pages */
.content {
  margin: 0;
  padding: 10px 20px;
}

/* styling rules for header1 */
.header1 {
  font-size:18px;
  margin: 10px 0px;
}

/* styling rules for header2 */
.header2 {
  font-size: 14px;
  margin: 5px 0px;
}

/* styling rules for go back icon and text */
.back-button {
  position:absolute;
  padding: 10px 10px;
  z-index:99;
}

.back-button div{
  display:none;
}

.back-button img {
  width: 20px;
  height: auto;
  margin: 30px 0px;
}

/* styling rules for editing and deleting button */
.edit-delete-button {
  width: 15px;
  margin: 2px;
}


}
</style>
