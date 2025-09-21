<script setup>
import NavBar from './components/common/NavBar.vue'
</script>

<template>
  <!-- Navigation bar always visible -->
  <NavBar />

  <!-- Main content with top padding to account for fixed navbar -->
  <div style="padding-top: 4rem;">
    <router-view />
  </div>
</template>

