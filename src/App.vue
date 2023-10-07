<template>
  <Header></Header>
  <router-view />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>
