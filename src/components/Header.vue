<template>
    <div class="header">
      <hamburger></hamburger>
      <h1 class="centered-title">Just The Ducks</h1>
      
      <!-- <div @click="updateMenu(childMenu)" :class="{ vis: isAboutPath() }" class="feature-menu">
        <div class="earth"></div>
        <h3 class="icon-padding hidden-mobile">Features</h3>
      </div>
      <feature-nav :is-activated="childMenu"></feature-nav> -->
    </div>
</template>
  
<script setup lang="ts">
  import { ref } from 'vue';
  import {useRoute} from 'vue-router'
  import Hamburger from './Hamburger.vue'
  // import FeatureNav from './FeatureNav.vue'

  let childMenu = ref(true);
  
  function isAboutPath(){
    const route = useRoute();
    return route.fullPath.includes('about');
  }

  function updateMenu(childMenuUpdate: Boolean) {
    childMenu.value = !childMenuUpdate;
  }
</script>
<style scoped lang="scss">
  .centered-title{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .icon-padding{
    padding-left: 10px;
  }
    .vis{
      visibility: hidden;
    }

    .feature-menu{
      display: flex;
      position: absolute;
      right: 20px;
      align-items: center;
      cursor: pointer;
      z-index: 30;
    }

    .header{
      display: flex;
      justify-content: space-between;
      position: relative;
      align-items: center;
      width: 100%;
      height: 80px;
      background-color: black;
      border-bottom: 3px solid #93CDDD;
    }

  @media (max-width: 767px) {
    .hidden-mobile{
      display: none;
    }
  }

</style>