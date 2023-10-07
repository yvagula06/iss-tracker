<template>
    <label :class="{ active: !props.isActivated }" class="burger">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </label>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({ isActivated: Boolean });
  </script>
  
  <style scoped lang="scss">
  .burger {
    cursor: pointer;
    transition: 0.5s ease;
    //height: 50px;
    &:hover .bar {
      box-shadow: 1px 1px 7px 1px RGBa(0, 0, 0, 0.3);
    }
    .bar {
      width: 40px;
      height: 5px;
      background: #93CDDD;
      box-shadow: 1px 1px 3px RGBa(0, 0, 0, 0.4);
      border-radius: 2px;
      transition: 0.6s ease;
      &:not(:first-child) {
        margin-top: 10px;
      }
    }
  }
  
  .active {
    transform: rotatey(180deg);
    .bar {
      transform: rotatey(180deg) rotatex(360deg);
      background: white;
      &:first-child {
        transform: rotate(-45deg);
        margin-top: 20px;
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        margin-top: -20px;
        transform: rotate(45deg);
      }
    }
  }
  </style>
  