import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { unref } from 'vue'
import { nasaApiService } from '../services/nasa-api'

// Query key factory
export const apodKeys = {
  all: ['apod'],
  today: () => ['apod', 'today'],
  byDate: (date) => ['apod', 'date', date],
  range: (startDate, endDate) => ['apod', 'range', startDate, endDate]
}

// Use Today's APOD
export function useTodayApod(options = {}) {
  return useQuery({
    queryKey: apodKeys.today(),
    queryFn: () => nasaApiService.fetchApod(),
    staleTime: 60 * 60 * 1000, // 1 hour - APOD changes daily
    cacheTime: 2 * 60 * 60 * 1000, // 2 hours
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  })
}

// Use APOD for specific date
export function useApodByDate(date, options = {}) {
  return useQuery({
    queryKey: apodKeys.byDate(unref(date)),
    queryFn: () => nasaApiService.fetchApod(unref(date)),
    enabled: !!unref(date),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours - historical data doesn't change
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  })
}

// Use APOD for date range
export function useApodRange(startDate, endDate, options = {}) {
  return useQuery({
    queryKey: apodKeys.range(unref(startDate), unref(endDate)),
    queryFn: () => nasaApiService.fetchApodRange(unref(startDate), unref(endDate)),
    enabled: !!(unref(startDate) && unref(endDate)),
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
    cacheTime: 7 * 24 * 60 * 60 * 1000, // 7 days
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  })
}

// Mutation for refreshing APOD data
export function useRefreshApod() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (date = null) => {
      return await nasaApiService.fetchApod(date)
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries
      if (variables) {
        queryClient.invalidateQueries({
          queryKey: apodKeys.byDate(variables)
        })
      } else {
        queryClient.invalidateQueries({
          queryKey: apodKeys.today()
        })
      }
    },
    onError: (error) => {
      console.error('Error refreshing APOD data:', error)
    }
  })
}

// Helper composable for APOD date management
export function useApodDates() {
  const getToday = () => nasaApiService.getTodayFormatted()

  const getDateRange = (daysBack = 7) => {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - daysBack)

    return {
      startDate: nasaApiService.formatDateForApi(startDate),
      endDate: nasaApiService.formatDateForApi(endDate)
    }
  }

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const isValidApodDate = (dateString) => {
    const date = new Date(dateString)
    const today = new Date()
    const firstApodDate = new Date('1995-06-16') // First APOD was published on this date

    return date >= firstApodDate && date <= today
  }

  return {
    getToday,
    getDateRange,
    formatDisplayDate,
    isValidApodDate
  }
}

// Hook for managing APOD favorites (local storage)
export function useApodFavorites() {
  const STORAGE_KEY = 'nasa-apod-favorites'

  const getFavorites = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error reading APOD favorites:', error)
      return []
    }
  }

  const addToFavorites = (apodData) => {
    try {
      const favorites = getFavorites()
      const exists = favorites.some(fav => fav.date === apodData.date)

      if (!exists) {
        favorites.push({
          date: apodData.date,
          title: apodData.title,
          url: apodData.url,
          addedAt: new Date().toISOString()
        })
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
      }

      return favorites
    } catch (error) {
      console.error('Error adding to APOD favorites:', error)
      return getFavorites()
    }
  }

  const removeFromFavorites = (date) => {
    try {
      const favorites = getFavorites()
      const filtered = favorites.filter(fav => fav.date !== date)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered))
      return filtered
    } catch (error) {
      console.error('Error removing from APOD favorites:', error)
      return getFavorites()
    }
  }

  const isFavorite = (date) => {
    const favorites = getFavorites()
    return favorites.some(fav => fav.date === date)
  }

  return {
    getFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  }
}