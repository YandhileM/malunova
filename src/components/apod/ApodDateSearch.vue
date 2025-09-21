<script setup>
import { ref, computed, watch } from 'vue'
import { useApodDates } from '../../composables/useApodData'
import { nasaApiService } from '../../services/nasa-api'

const currentDate = new Date()
const selectedDate = ref(null)
const currentMonth = ref(currentDate.getMonth())
const currentYear = ref(currentDate.getFullYear())
const showApodModal = ref(false)
const selectedApod = ref(null)
const isLoadingApod = ref(false)
const apodError = ref(null)

// Use APOD composables
const { isValidApodDate, formatDisplayDate } = useApodDates()

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

const selectDate = async (day) => {
  if (!day) return

  const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // Validate the date
  if (!isValidApodDate(dateString)) {
    apodError.value = 'APOD data is only available from June 16, 1995 to today'
    return
  }

  selectedDate.value = dateString
  isLoadingApod.value = true
  apodError.value = null

  console.log('Fetching APOD for date:', dateString)

  // Call NASA API directly
  try {
    const data = await nasaApiService.fetchApod(dateString)
    console.log('APOD data received:', data)

    selectedApod.value = data
    showApodModal.value = true
    isLoadingApod.value = false
  } catch (err) {
    console.error('Error fetching APOD:', err)
    apodError.value = err.message || 'Failed to load APOD data'
    isLoadingApod.value = false
  }
}

const closeModal = () => {
  showApodModal.value = false
  selectedApod.value = null
  selectedDate.value = null
  apodError.value = null
}

const hasApodData = (day) => {
  if (!day) return false
  const dateString = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`

  // Check if date is within valid APOD range (June 16, 1995 - today)
  return isValidApodDate(dateString)
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
        Click on any date to view the Astronomy Picture of the Day (Available from June 16, 1995)
      </p>

      <!-- Error Message -->
      <div v-if="apodError" class="error-message">
        {{ apodError }}
      </div>

      <!-- Loading Message -->
      <div v-if="isLoadingApod" class="loading-message">
        <div class="spinner"></div>
        Loading APOD data...
      </div>
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
          :disabled="!day"
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

<style scoped>
/* Loading and Error Messages */
.loading-message,
.error-message {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.loading-message {
  background: rgba(var(--plasma-cyan), 0.1);
  border: 1px solid var(--plasma-cyan);
  color: var(--plasma-cyan);
}

.error-message {
  background: rgba(var(--solar-orange), 0.1);
  border: 1px solid var(--solar-orange);
  color: var(--solar-orange);
}

/* Update calendar day styling for all valid dates */
.calendar-day.has-apod {
  background: rgba(var(--aurora-green), 0.2);
  border-color: var(--aurora-green);
}

.calendar-day.has-apod:hover {
  background: rgba(var(--aurora-green), 0.3);
  transform: translateY(-2px);
}

/* Disable styling for dates outside APOD range */
.calendar-day:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.calendar-day:disabled:hover {
  transform: none;
  background: transparent;
}
</style>