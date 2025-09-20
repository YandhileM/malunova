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
        <a href="#" class="nav-brand">NASA Space Explorer</a>
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
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Daily Picture</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Archive Browser</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Date Search</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('mars', $event)">
            Mars Rovers
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('mars') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('mars') }">
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Rover Dashboard</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Photo Gallery</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Camera Filters</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('neo', $event)">
            Near Earth Objects
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('neo') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('neo') }">
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Asteroid Dashboard</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Data Table</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Hazard Tracker</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('epic', $event)">
            EPIC Earth
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('epic') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('epic') }">
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Earth Viewer</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Timelapse Player</a>
          </div>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click="toggleDropdown('events', $event)">
            Earth Events
            <span class="dropdown-arrow" :class="{ 'open': isDropdownOpen('events') }">▼</span>
          </a>
          <div class="dropdown-menu" :class="{ 'mobile-open': isDropdownOpen('events') }">
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Event Map</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Event List</a>
            <a href="#" class="dropdown-item" @click="closeMobileMenu">Event Filters</a>
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

