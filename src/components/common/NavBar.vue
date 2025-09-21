<script setup>
import { ref } from 'vue'

// Mobile menu state
const isMobileMenuOpen = ref(false)

// Mobile dropdown states
const openDropdowns = ref(new Set())

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  // Close all dropdowns when menu closes
  if (!isMobileMenuOpen.value) {
    openDropdowns.value.clear()
  }
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  openDropdowns.value.clear()
}

const toggleDropdown = (dropdownId, event) => {
  // Only toggle dropdowns on mobile (when burger menu is visible)
  if (window.innerWidth <= 768) {
    event.preventDefault()
    if (openDropdowns.value.has(dropdownId)) {
      openDropdowns.value.delete(dropdownId)
    } else {
      openDropdowns.value.add(dropdownId)
    }
  }
}

const isDropdownOpen = (dropdownId) => {
  return openDropdowns.value.has(dropdownId)
}
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      <div class="nav-header">
        <router-link to="/" class="nav-brand">NASA Space Explorer</router-link>
        <!-- Burger Menu Button (Mobile Only) -->
        <button
          class="burger-menu"
          @click="toggleMobileMenu"
          :class="{ 'active': isMobileMenuOpen }"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <!-- Navigation Menu -->
      <ul class="nav-menu" :class="{ 'mobile-open': isMobileMenuOpen }">
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('apod', $event)">
            APOD
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('apod') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('apod') }">
            <router-link to="/apod/daily" class="dropdown-item" @click="closeMobileMenu">Daily Picture</router-link>
            <router-link to="/apod/archive" class="dropdown-item" @click="closeMobileMenu">Archive Browser</router-link>
            <router-link to="/apod/search" class="dropdown-item" @click="closeMobileMenu">Date Search</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('mars', $event)">
            Mars Rovers
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('mars') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('mars') }">
            <router-link to="/mars/dashboard" class="dropdown-item" @click="closeMobileMenu">Rover Dashboard</router-link>
            <router-link to="/mars/gallery" class="dropdown-item" @click="closeMobileMenu">Photo Gallery</router-link>
            <router-link to="/mars/filters" class="dropdown-item" @click="closeMobileMenu">Camera Filters</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('neo', $event)">
            Near Earth Objects
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('neo') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('neo') }">
            <router-link to="/neo/dashboard" class="dropdown-item" @click="closeMobileMenu">Asteroid Dashboard</router-link>
            <router-link to="/neo/data" class="dropdown-item" @click="closeMobileMenu">Data Table</router-link>
            <router-link to="/neo/hazards" class="dropdown-item" @click="closeMobileMenu">Hazard Tracker</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('epic', $event)">
            EPIC Earth
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('epic') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('epic') }">
            <router-link to="/epic/viewer" class="dropdown-item" @click="closeMobileMenu">Earth Viewer</router-link>
            <router-link to="/epic/timelapse" class="dropdown-item" @click="closeMobileMenu">Timelapse Player</router-link>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('events', $event)">
            Earth Events
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('events') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('events') }">
            <router-link to="/events/map" class="dropdown-item" @click="closeMobileMenu">Event Map</router-link>
            <router-link to="/events/list" class="dropdown-item" @click="closeMobileMenu">Event List</router-link>
            <router-link to="/events/filters" class="dropdown-item" @click="closeMobileMenu">Event Filters</router-link>
          </div>
        </li>
      </ul>
    </div>

    <!-- Mobile Overlay -->
    <div
      class="mobile-overlay"
      :class="{ 'active': isMobileMenuOpen }"
      @click="closeMobileMenu"
    ></div>
  </nav>
</template>

