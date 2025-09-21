<template>
  <div class="page-container">
    <div class="container">
      <h1>Near Earth Objects Dashboard</h1>

      <!-- Controls -->
      <div class="card mb-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Quick Date Selection -->
          <div>
            <h3 class="card-title mb-3">Quick Select</h3>
            <div class="flex gap-2 flex-wrap">
              <button @click="handleDateRangeChange(0)" class="btn btn-secondary">This Week</button>
              <button @click="handleDateRangeChange(7)" class="btn btn-ghost">Next Week</button>
              <button @click="handleDateRangeChange(-7)" class="btn btn-ghost">Last Week</button>
              <button @click="handleDateRangeChange(0, 1)" class="btn btn-ghost">Today</button>
            </div>
          </div>

          <!-- Custom Date Range -->
          <div>
            <h3 class="card-title mb-3">Custom Date Range</h3>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-2 items-end">
              <div class="form-group">
                <label class="form-label">Start Date</label>
                <input
                  v-model="customStartDate"
                  type="date"
                  class="form-input"
                  :max="maxDate"
                  :min="minDate"
                />
              </div>
              <div class="form-group">
                <label class="form-label">End Date</label>
                <input
                  v-model="customEndDate"
                  type="date"
                  class="form-input"
                  :max="maxDate"
                  :min="customStartDate"
                />
              </div>
              <button
                @click="handleCustomDateRange"
                :disabled="!isValidDateRange || isLoading"
                class="btn btn-primary">
                Apply Range
              </button>
            </div>
            <p v-if="dateRangeError" class="text-xs text-solar-orange mt-1">{{ dateRangeError }}</p>
            <p class="text-xs text-asteroid-gray mt-1">Max 7 days range allowed</p>
          </div>
        </div>

        <!-- Refresh Button -->
        <div class="flex justify-end mt-4 pt-4 border-t border-asteroid-gray">
          <button @click="handleRefresh"
                  :disabled="isLoading || isMutationLoading"
                  class="btn btn-primary">
            <span v-if="isLoading || isMutationLoading">Refreshing...</span>
            <span v-else>Refresh Data</span>
          </button>
        </div>
      </div>

      <!-- Error State -->
      <div v-if="isError" class="card mb-6 border-l-4 border-solar-orange">
        <h3 class="text-solar-orange mb-2">Error Loading Data</h3>
        <p class="text-sm mb-3">{{ error?.message || 'Failed to fetch asteroid data' }}</p>
        <button @click="refetch" class="btn btn-secondary">Retry</button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading && !displayData.near_earth_objects" class="card mb-6">
        <div class="text-center">
          <div class="spinner mb-4"></div>
          <p>Loading asteroid data from NASA...</p>
        </div>
      </div>

      <!-- Summary Stats -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="card text-center">
          <h3 class="card-title">Total Objects</h3>
          <div v-if="isLoading && !totalCount" class="skeleton skeleton-text"></div>
          <p v-else class="text-2xl font-bold text-plasma-cyan">{{ totalCount }}</p>
        </div>
        <div class="card text-center">
          <h3 class="card-title">Date Range</h3>
          <div v-if="isLoading && !dateRange" class="skeleton skeleton-text"></div>
          <p v-else class="text-aurora-green">{{ dateRange }}</p>
        </div>
        <div class="card text-center">
          <h3 class="card-title">Hazardous Objects</h3>
          <div v-if="isLoading && !hazardousCount" class="skeleton skeleton-text"></div>
          <p v-else class="text-2xl font-bold text-solar-orange">{{ hazardousCount }}</p>
        </div>
      </div>

      <!-- Asteroid News Feed -->
      <div class="card">
        <div class="card-header">
          <h2 class="card-title">Asteroid News Feed</h2>
          <p class="card-subtitle">Recent near-Earth object approaches</p>
        </div>

        <div v-for="(asteroids, date) in displayData.near_earth_objects" :key="date" class="mb-6">
          <h3 class="mb-4 text-stellar-blue">{{ formatDate(date) }}</h3>

          <div class="grid grid-cols-1 gap-4">
            <div v-for="asteroid in asteroids" :key="asteroid.id" class="card border-l-4"
                 :class="{'border-solar-orange': asteroid.is_potentially_hazardous_asteroid, 'border-aurora-green': !asteroid.is_potentially_hazardous_asteroid}">

              <div class="flex justify-between items-start mb-3">
                <div>
                  <h4 class="font-bold text-lg">{{ asteroid.name }}</h4>
                  <p class="text-sm text-star-silver">ID: {{ asteroid.neo_reference_id }}</p>
                </div>
                <div class="text-right">
                  <span v-if="asteroid.is_potentially_hazardous_asteroid"
                        class="btn btn-primary text-xs">HAZARDOUS</span>
                  <span v-else class="btn btn-ghost text-xs">SAFE</span>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Size Information -->
                <div>
                  <h5 class="font-semibold text-plasma-cyan mb-2">Estimated Size</h5>
                  <p class="text-sm">
                    {{ Math.round(asteroid.estimated_diameter.meters.estimated_diameter_min) }}m -
                    {{ Math.round(asteroid.estimated_diameter.meters.estimated_diameter_max) }}m
                  </p>
                  <p class="text-xs text-asteroid-gray">
                    ({{ Math.round(asteroid.estimated_diameter.feet.estimated_diameter_min) }}ft -
                    {{ Math.round(asteroid.estimated_diameter.feet.estimated_diameter_max) }}ft)
                  </p>
                </div>

                <!-- Approach Data -->
                <div v-if="asteroid.close_approach_data[0]">
                  <h5 class="font-semibold text-plasma-cyan mb-2">Close Approach</h5>
                  <p class="text-sm">{{ formatApproachDate(asteroid.close_approach_data[0].close_approach_date_full) }}</p>
                  <p class="text-xs text-asteroid-gray">
                    Speed: {{ Math.round(asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour) }} km/h
                  </p>
                </div>

                <!-- Distance Information -->
                <div v-if="asteroid.close_approach_data[0]">
                  <h5 class="font-semibold text-plasma-cyan mb-2">Miss Distance</h5>
                  <p class="text-sm">{{ formatDistance(asteroid.close_approach_data[0].miss_distance.kilometers) }} km</p>
                  <p class="text-xs text-asteroid-gray">
                    {{ parseFloat(asteroid.close_approach_data[0].miss_distance.lunar).toFixed(1) }} lunar distances
                  </p>
                </div>
              </div>

              <!-- NASA Link -->
              <div class="mt-4 pt-3 border-t border-asteroid-gray">
                <a :href="asteroid.nasa_jpl_url" target="_blank" class="btn btn-secondary text-sm">
                  View on NASA JPL →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useNeoFeed, useCurrentWeekNeoFeed, useRefreshNeoData, useDateRange } from '../composables/useNeoData'
import { useNeoStore } from '../stores/neo'

// Store and composables
const neoStore = useNeoStore()
const { getCurrentWeek, getDateRange } = useDateRange()

// Date range state
const selectedDateRange = ref(getCurrentWeek())
const customStartDate = ref('')
const customEndDate = ref('')
const dateRangeError = ref('')

// Date constraints
const today = new Date()
const minDate = computed(() => {
  const date = new Date()
  date.setFullYear(date.getFullYear() - 1) // Allow up to 1 year ago
  return date.toISOString().split('T')[0]
})

const maxDate = computed(() => {
  const date = new Date()
  date.setDate(date.getDate() + 30) // Allow up to 30 days in future
  return date.toISOString().split('T')[0]
})

// Validation
const isValidDateRange = computed(() => {
  if (!customStartDate.value || !customEndDate.value) return false

  const start = new Date(customStartDate.value)
  const end = new Date(customEndDate.value)
  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  return start <= end && diffDays <= 7
})

// TanStack Query for fetching NEO data with dynamic date range
const startDate = computed(() => selectedDateRange.value.startDate)
const endDate = computed(() => selectedDateRange.value.endDate)

const {
  data: asteroidData,
  isLoading,
  isError,
  error,
  refetch
} = useNeoFeed(
  startDate,
  endDate,
  {
    refetchOnWindowFocus: false,
    refetchOnMount: true
  }
)

// Refresh mutation
const refreshMutation = useRefreshNeoData()

// Computed to safely access mutation loading state
const isMutationLoading = computed(() => refreshMutation?.isLoading?.value || false)

// Computed properties using both query data and store
const totalCount = computed(() => asteroidData.value?.element_count || neoStore.totalCount || 0)
const hazardousCount = computed(() => neoStore.hazardousCount || 0)
const dateRange = computed(() => neoStore.dateRange || 'Loading...')

// Display data (fallback to store if query is loading)
const displayData = computed(() => {
  return asteroidData.value || neoStore.asteroidData || { near_earth_objects: {} }
})

// Actions
const handleRefresh = async () => {
  try {
    const { startDate, endDate } = selectedDateRange.value
    if (refreshMutation && refreshMutation.mutateAsync) {
      await refreshMutation.mutateAsync({ startDate, endDate })
    } else {
      // Fallback to refetch if mutation is not available
      await refetch()
    }
  } catch (error) {
    console.error('Error refreshing data:', error)
  }
}

const handleDateRangeChange = (days, rangeDays = 7) => {
  selectedDateRange.value = getDateRange(days, rangeDays)
  // Clear custom date inputs when using quick select
  customStartDate.value = ''
  customEndDate.value = ''
  dateRangeError.value = ''
  refetch()
}

const handleCustomDateRange = () => {
  dateRangeError.value = ''

  if (!customStartDate.value || !customEndDate.value) {
    dateRangeError.value = 'Please select both start and end dates'
    return
  }

  const start = new Date(customStartDate.value)
  const end = new Date(customEndDate.value)

  if (start > end) {
    dateRangeError.value = 'Start date must be before end date'
    return
  }

  const diffTime = Math.abs(end - start)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays > 7) {
    dateRangeError.value = 'Date range cannot exceed 7 days'
    return
  }

  // Update selected date range and refetch
  selectedDateRange.value = {
    startDate: customStartDate.value,
    endDate: customEndDate.value
  }

  refetch()
}

const initializeDateInputs = () => {
  const { startDate, endDate } = getCurrentWeek()
  customStartDate.value = startDate
  customEndDate.value = endDate
}

// Initialize date inputs on component mount
initializeDateInputs()

// Helper functions for formatting
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatApproachDate = (dateString) => {
  const date = new Date(dateString.replace(/(\d{4})-(\w{3})-(\d{2})/, '$1/$2/$3'))
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDistance = (kilometers) => {
  const km = parseFloat(kilometers)
  if (km > 1000000) {
    return (km / 1000000).toFixed(2) + 'M'
  } else if (km > 1000) {
    return (km / 1000).toFixed(0) + 'K'
  }
  return Math.round(km).toString()
}
</script>

<style scoped>
.page-container {
  min-height: calc(100vh - 4rem);
  padding: 2rem 0;
}

/* Color classes matching StyleGuide */
.text-plasma-cyan { color: var(--plasma-cyan); }
.text-aurora-green { color: var(--aurora-green); }
.text-solar-orange { color: var(--solar-orange); }
.text-stellar-blue { color: var(--stellar-blue); }
.text-star-silver { color: var(--star-silver); }
.text-asteroid-gray { color: var(--asteroid-gray); }

/* Border colors */
.border-solar-orange { border-color: var(--solar-orange); }
.border-aurora-green { border-color: var(--aurora-green); }
.border-asteroid-gray { border-color: var(--asteroid-gray); }

/* Typography utilities */
.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-lg { font-size: 1.125rem; }
.text-2xl { font-size: 1.5rem; }
.font-bold { font-weight: bold; }
.font-semibold { font-weight: 600; }

/* Layout utilities */
.grid { display: grid; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1rem; }
.pt-3 { padding-top: 0.75rem; }
.pt-4 { padding-top: 1rem; }
.border-t { border-top: 1px solid; }
.border-l-4 { border-left: 4px solid; }
.items-end { align-items: flex-end; }
.flex-wrap { flex-wrap: wrap; }

/* Button states */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Flexbox utilities */
.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-start { align-items: flex-start; }
.text-center { text-align: center; }
.text-right { text-align: right; }

/* Responsive grid */
@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>