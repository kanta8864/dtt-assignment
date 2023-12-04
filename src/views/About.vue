<template>
  <NavVar />
  <div id="aboutPage">
    <div>
      <div class="title">About DTT Real Estate</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna
        aliqua.</p>
    </div>
    <div>
      <div class="title">Design and Development</div>
      <div id="dttContainer">
        <img class="logo" src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
        <div>
          <div>By DTT</div>
          <a href="https://www.d-tt.nl">www.d-tt.nl</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavVar from "./NavVar.vue"
export default {
  components: { NavVar }
}
</script>

<style>
#aboutPage {
  padding: 10px 40px;
  font-family: "Open Sans";
  font-weight:400;
  font-size:18px;
}

#aboutPage .title {
  font-family: "Montserrat";
  font-weight: 700;
  font-size: 32px;
  margin: 30px 0px;
}

#aboutPage .logo {
  max-width: 250px;
}

#aboutPage #dttContainer {
  display: flex;
  gap: 30px;
  align-items: center;
}

#aboutPage a:link {
  color: #067BC2;
}
</style>