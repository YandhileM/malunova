import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { unref } from 'vue'
import { nasaApiService } from '../services/nasa-api'
import { useNeoStore } from '../stores/neo'

// Query key factory
export const neoKeys = {
  all: ['neo'],
  feed: (startDate, endDate) => ['neo', 'feed', startDate, endDate],
  details: (neoId) => ['neo', 'details', neoId]
}

// Use NEO Feed Data
export function useNeoFeed(startDate, endDate, options = {}) {
  const neoStore = useNeoStore()


  return useQuery({
    queryKey: neoKeys.feed(unref(startDate), unref(endDate)),
    queryFn: async () => {
      neoStore.setLoading(true)
      try {
        const startDateValue = unref(startDate)
        const endDateValue = unref(endDate)
        const data = await nasaApiService.fetchNeoFeed(startDateValue, endDateValue)
        neoStore.setAsteroidData(data)
        return data
      } catch (error) {
        neoStore.setError(error.message)
        throw error
      } finally {
        neoStore.setLoading(false)
      }
    },
    enabled: !!(unref(startDate) && unref(endDate)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    ...options
  })
}

// Use Current Week NEO Data
export function useCurrentWeekNeoFeed(options = {}) {
  const { startDate, endDate } = nasaApiService.getCurrentWeekDateRange()
  return useNeoFeed(startDate, endDate, options)
}

// Use NEO Details
export function useNeoDetails(neoId, options = {}) {
  return useQuery({
    queryKey: neoKeys.details(neoId),
    queryFn: () => nasaApiService.fetchNeoDetails(neoId),
    enabled: !!neoId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    cacheTime: 60 * 60 * 1000, // 1 hour
    ...options
  })
}

// Mutation for refreshing NEO data
export function useRefreshNeoData() {
  const queryClient = useQueryClient()
  const neoStore = useNeoStore()

  return useMutation({
    mutationFn: async ({ startDate, endDate }) => {
      return await nasaApiService.fetchNeoFeed(startDate, endDate)
    },
    onMutate: () => {
      neoStore.setLoading(true)
    },
    onSuccess: (data, variables) => {
      neoStore.setAsteroidData(data)
      // Invalidate and refetch
      queryClient.invalidateQueries({
        queryKey: neoKeys.feed(variables.startDate, variables.endDate)
      })
    },
    onError: (error) => {
      neoStore.setError(error.message)
    },
    onSettled: () => {
      neoStore.setLoading(false)
    }
  })
}

// Helper composable for date management
export function useDateRange() {
  const getCurrentWeek = () => nasaApiService.getCurrentWeekDateRange()

  const getDateRange = (daysFromToday = 0, rangeDays = 7) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() + daysFromToday)

    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + rangeDays)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  return {
    getCurrentWeek,
    getDateRange
  }
}