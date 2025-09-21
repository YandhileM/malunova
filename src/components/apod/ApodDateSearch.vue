<script setup>
import { ref, computed } from 'vue'

const currentDate = new Date()
const selectedDate = ref(null)
const currentMonth = ref(currentDate.getMonth())
const currentYear = ref(currentDate.getFullYear())
const showApodModal = ref(false)
const selectedApod = ref(null)

// Hardcoded APOD data for different dates
const apodData = {
  '2025-09-21': {
    "date": "2025-09-21",
    "explanation": "Does the Sun set in the same direction every day? No, the direction of sunset depends on the time of the year. Although the Sun always sets approximately toward the west, on an equinox like today the Sun sets directly toward the west. After tomorrow's September equinox, the Sun will set increasingly toward the southwest, reaching its maximum displacement at the December solstice. Before today's September equinox, the Sun had set toward the northwest, reaching its maximum displacement at the June solstice. The featured time-lapse image shows seven bands of the Sun setting one day each month from 2019 December through 2020 June. These image sequences were taken from Alberta, Canada -- well north of the Earth's equator -- and feature the city of Edmonton in the foreground. The middle band shows the Sun setting during the last equinox -- in March. From this location, the Sun will set along this same equinox band again tomorrow.",
    "hdurl": "https://apod.nasa.gov/apod/image/2509/SunsetMonths_Vanzella_2400.jpg",
    "media_type": "image",
    "service_version": "v1",
    "title": "Equinox Sunset",
    "url": "https://apod.nasa.gov/apod/image/2509/SunsetMonths_Vanzella_1080.jpg"
  },
  '2025-09-20': {
    "date": "2025-09-20",
    "explanation": "In this stunning view from the International Space Station, Earth's terminator—the boundary between day and night—creates a dramatic line across our planet. The thin blue line of our atmosphere glows brilliantly against the black of space, while city lights twinkle below in the darkness. This perspective reminds us of our planet's fragility and beauty as it orbits through the cosmos.",
    "hdurl": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=1200&h=800&fit=crop",
    "media_type": "image",
    "service_version": "v1",
    "title": "Earth's Terminator from Space",
    "url": "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=800&h=600&fit=crop"
  },
  '2025-09-19': {
    "date": "2025-09-19",
    "explanation": "The Orion Nebula, also known as M42, is one of the brightest nebulae visible to the naked eye. Located in the constellation Orion, this stellar nursery is where new stars are born from clouds of gas and dust. The nebula's distinctive shape and vibrant colors make it a favorite target for both amateur and professional astronomers. The trapezium cluster at its heart illuminates the surrounding gas with intense ultraviolet radiation.",
    "hdurl": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&h=800&fit=crop",
    "media_type": "image",
    "service_version": "v1",
    "title": "The Great Orion Nebula",
    "url": "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=800&h=600&fit=crop"
  },
  '2025-09-18': {
    "date": "2025-09-18",
    "explanation": "Saturn's magnificent ring system has captivated observers for centuries. Composed primarily of water ice particles ranging from tiny grains to house-sized chunks, the rings are divided into several distinct sections. The Cassini spacecraft revealed intricate details of these rings, including spokes, braided patterns, and shepherd moons that help maintain the ring structure. This view shows Saturn in all its glory, a true jewel of our solar system.",
    "hdurl": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=1200&h=800&fit=crop",
    "media_type": "image",
    "service_version": "v1",
    "title": "Saturn and Its Rings",
    "url": "https://images.unsplash.com/photo-1614314107768-6018061b5b72?w=800&h=600&fit=crop"
  },
  '2025-09-17': {
    "date": "2025-09-17",
    "explanation": "The Milky Way galaxy stretches across the night sky in this breathtaking panoramic view. Our home galaxy contains over 100 billion stars, and from our position within one of its spiral arms, we see it edge-on as a luminous band crossing the sky. Dark lanes of cosmic dust block some of the light from distant stars, creating the intricate patterns visible in this image. The galactic center, located in the constellation Sagittarius, glows brightly in the distance.",
    "hdurl": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=1200&h=800&fit=crop",
    "media_type": "image",
    "service_version": "v1",
    "title": "The Milky Way Galaxy",
    "url": "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop"
  }
}

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const daysInMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
})

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay()
})

const calendarDays = computed(() => {
  const days = []
  const totalDays = daysInMonth.value
  const firstDay = firstDayOfMonth.value

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  // Add all days of the month
  for (let day = 1; day <= totalDays; day++) {
    days.push(day)
  }

  return days
})

const previousMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

const selectDate = (day) => {
  if (!day) return

  const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  selectedDate.value = dateString

  // Check if we have APOD data for this date
  if (apodData[dateString]) {
    selectedApod.value = apodData[dateString]
    showApodModal.value = true
  }
}

const closeModal = () => {
  showApodModal.value = false
  selectedApod.value = null
}

const hasApodData = (day) => {
  if (!day) return false
  const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return !!apodData[dateString]
}

const isToday = (day) => {
  if (!day) return false
  const today = new Date()
  return day === today.getDate() &&
         currentMonth.value === today.getMonth() &&
         currentYear.value === today.getFullYear()
}
</script>

<template>
  <div class="apod-date-search">
    <!-- Calendar Header -->
    <div class="calendar-header">
      <div class="calendar-nav">
        <button @click="previousMonth" class="btn btn-ghost nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="15,18 9,12 15,6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <h2 class="calendar-title">
          {{ monthNames[currentMonth] }} {{ currentYear }}
        </h2>

        <button @click="nextMonth" class="btn btn-ghost nav-btn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9,18 15,12 9,6" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>
      </div>

      <p class="calendar-subtitle">
        Click on a highlighted date to view the Astronomy Picture of the Day
      </p>
    </div>

    <!-- Calendar Grid -->
    <div class="calendar-container">
      <div class="calendar-grid">
        <!-- Day headers -->
        <div v-for="day in daysOfWeek" :key="day" class="day-header">
          {{ day }}
        </div>

        <!-- Calendar days -->
        <button
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="{
            'calendar-day': true,
            'empty': !day,
            'has-apod': hasApodData(day),
            'today': isToday(day),
            'selected': selectedDate === `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          }"
          @click="selectDate(day)"
          :disabled="!day || !hasApodData(day)"
        >
          <span v-if="day">{{ day }}</span>
          <div v-if="hasApodData(day)" class="apod-indicator"></div>
        </button>
      </div>
    </div>

    <!-- APOD Modal -->
    <div v-if="showApodModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button @click="closeModal" class="modal-close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2"/>
          </svg>
        </button>

        <div v-if="selectedApod" class="apod-content">
          <div class="apod-image-container">
            <img
              :src="selectedApod.url"
              :alt="selectedApod.title"
              class="apod-image"
            />
          </div>

          <div class="apod-info">
            <div class="apod-header">
              <h3 class="apod-title">{{ selectedApod.title }}</h3>
              <div class="apod-date">{{ new Date(selectedApod.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              }) }}</div>
            </div>

            <p class="apod-explanation">{{ selectedApod.explanation }}</p>

            <div class="apod-actions">
              <a :href="selectedApod.hdurl" target="_blank" class="btn btn-primary">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/>
                  <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
                  <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
                </svg>
                Download HD
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>