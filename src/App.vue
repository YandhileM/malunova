<script setup>
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import StyleGuide from './components/StyleGuide.vue'
import NavBar from './components/common/NavBar.vue'

const showStyleGuide = ref(false)

const goToStyleGuide = () => {
  showStyleGuide.value = true
}

const backToHome = () => {
  showStyleGuide.value = false
}
</script>

<template>
  <!-- Navigation bar always visible -->
  <NavBar />

  <!-- Main content with top padding to account for fixed navbar -->
  <div style="padding-top: 4rem;">
    <div v-if="!showStyleGuide">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src="/vite.svg" class="logo" alt="Vite logo" />
        </a>
        <a href="https://vuejs.org/" target="_blank">
          <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
      </div>
      <HelloWorld msg="Vite + Vue" />

      <!-- Style Guide Button -->
      <div class="style-guide-section">
        <button @click="goToStyleGuide" class="btn btn-primary">
          🚀 View NASA Style Guide
        </button>
      </div>
    </div>

    <StyleGuide v-else @back-to-home="backToHome" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.style-guide-section {
  margin-top: 2rem;
  text-align: center;
}
</style>
