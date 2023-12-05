<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,500;0,600;0,700;1,500&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap');

body {
  color: black;
  margin:0;
  background-color: #F6F6F6;
}

.backButtonContainer {
  display:flex;
  align-items: center;
  gap:10px;
  font-family: "Montserrat";
  font-weight:600;
  font-size:16px;
}

.backButtonContainer img{
  width:16px;
  height:auto;
  margin: 30px 0px;
}

</style>
