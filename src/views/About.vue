<template>
  <NavVar />
  <div id="about-mobile" class="header1">About</div>
  <div id="about" class="content">
    <div>
      <div class="header1">About DTT Real Estate</div>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
        culpa qui officia deserunt mollit anim id est laborum.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua.</p>
    </div>
    <div>
      <div class="header1">Design and Development</div>
      <div id="dtt-info">
        <img src="../assets/img_logo_dtt@3x.png" alt="DTT logo">
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
#about {
  font-family: "Open Sans";
  font-weight: 400;
  font-size: 18px;
}

#about img {
  width: 250px;
}

#about #dtt-info {
  display: flex;
  gap: 30px;
  align-items: center;
}

#about a:link {
  color: #067BC2;
}

#about-mobile {
  display: none;
}

@media only screen and (max-width: 768px) {
  #about {
    margin-bottom: 80px;
    font-size: 12px;
  }

  #about-mobile {
    display: block;
    text-align: center;
    margin-top: 40px;
    font-size: 22px;
  }

  #about img {
    width: 150px;
  }
}
</style>