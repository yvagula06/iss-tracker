<template>
    <div :class="{ 'nav-display': !childMenu }" class="navigation">
      <div class="burger-header">
        <div @click="updateMenu(childMenu)" class="burger-container">
          <HamburgerBar :is-activated="childMenu"></HamburgerBar>
        </div>
        <div class="navbar">
          <div class="nav-items">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/cta">ARCanvas</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from "vue";
  import HamburgerBar from "./HamburgerBar.vue";
  
  //const emits = defineEmits(["UpdateIsMenu"]);
  
  let childMenu = ref(true);
  
  function updateMenu(childMenuUpdate: Boolean) {
    childMenu.value = !childMenuUpdate;
  }
</script>
  
<style scoped lang="scss">
    .burger-header {
        min-height: 50px;
        min-width: 35px;
    }
    .burger-container {
        padding: 45px 20px;
        position: absolute;
        z-index: 30;
    }
    .navigation {
        display: flex;
        justify-content: flex-start;
        //width: 100%;
        min-height: 125px;
        height: 125px;
    }
    .navbar {
        top: 0;
        position: fixed;
        display: flex;
        overflow: hidden;
        justify-content: flex-start;
        height: 100%;
        background: black;
        width: 26%;
        opacity: 85%;
        margin-left: -600px;
        z-index: 5;
        transition: margin 0.5s ease-in-out;
        border-right: 3px solid #93CDDD;
    }
    .nav-display {
      .burger-container {
        position: fixed;
      }
      .navbar {
        margin-left: 0px;
      }
    }
    .nav-items {
        position: relative;
        bottom: 100px;
        color: #93CDDD;
        li {
            padding: 15px 0px;
        }
    }

    @media (min-width: 320px) and (max-width: 767px) {
        .burger-header {
            justify-content: flex-end;
            // align-items: center;
            z-index: 10;
            min-height: max-content;
            width: 100%;
        }
    }
</style>
  