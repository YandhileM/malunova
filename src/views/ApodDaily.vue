<script setup>
import PictureOfTheDay from '../components/apod/PictureOfTheDay.vue'
</script>

<template>
  <div class="apod-daily-view">
    <PictureOfTheDay />
  </div>
</template>

<style scoped>
.apod-daily-view {
  min-height: calc(100vh - 4rem);
}
</style>