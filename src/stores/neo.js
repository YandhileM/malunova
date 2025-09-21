import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useNeoStore = defineStore('neo', () => {
  // State
  const asteroidData = ref(null)
  const isLoading = ref(false)
  const error = ref(null)
  const lastFetchDate = ref(null)

  // Getters
  const totalCount = computed(() => asteroidData.value?.element_count || 0)

  const hazardousCount = computed(() => {
    if (!asteroidData.value?.near_earth_objects) return 0

    let count = 0
    Object.values(asteroidData.value.near_earth_objects).forEach(dayAsteroids => {
      dayAsteroids.forEach(asteroid => {
        if (asteroid.is_potentially_hazardous_asteroid) count++
      })
    })
    return count
  })

  const dateRange = computed(() => {
    if (!asteroidData.value?.near_earth_objects) return 'No data'

    const dates = Object.keys(asteroidData.value.near_earth_objects).sort()
    if (dates.length === 0) return 'No data'
    if (dates.length === 1) return formatDate(dates[0])
    return `${formatDate(dates[0])} - ${formatDate(dates[dates.length - 1])}`
  })

  const allAsteroids = computed(() => {
    if (!asteroidData.value?.near_earth_objects) return []

    const asteroids = []
    Object.entries(asteroidData.value.near_earth_objects).forEach(([date, dayAsteroids]) => {
      dayAsteroids.forEach(asteroid => {
        asteroids.push({ ...asteroid, approach_date: date })
      })
    })
    return asteroids
  })

  // Actions
  const setAsteroidData = (data) => {
    asteroidData.value = data
    lastFetchDate.value = new Date().toISOString()
    error.value = null
  }

  const setLoading = (loading) => {
    isLoading.value = loading
  }

  const setError = (errorMessage) => {
    error.value = errorMessage
    isLoading.value = false
  }

  const clearData = () => {
    asteroidData.value = null
    error.value = null
    lastFetchDate.value = null
  }

  // Helper functions
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return {
    // State
    asteroidData,
    isLoading,
    error,
    lastFetchDate,

    // Getters
    totalCount,
    hazardousCount,
    dateRange,
    allAsteroids,

    // Actions
    setAsteroidData,
    setLoading,
    setError,
    clearData
  }
})