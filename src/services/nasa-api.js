// NASA API Service
const BASE_URL = import.meta.env.VITE_NASA_API_BASE_URL
const API_KEY = import.meta.env.VITE_NASA_API_KEY

// API Endpoints
const ENDPOINTS = {
  NEO_FEED: '/neo/rest/v1/feed',
  NEO_DETAILS: '/neo/rest/v1/neo',
  APOD: '/planetary/apod'
}

class NasaApiService {
  constructor() {
    this.baseURL = BASE_URL
    this.apiKey = API_KEY
  }

  async fetchNeoFeed(startDate, endDate) {
    try {
      const params = new URLSearchParams({
        start_date: startDate,
        end_date: endDate,
        detailed: 'false',
        api_key: this.apiKey
      })

      const url = `${this.baseURL}${ENDPOINTS.NEO_FEED}?${params}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`NASA API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching NEO data:', error)
      throw error
    }
  }

  async fetchNeoDetails(neoId) {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey
      })

      const url = `${this.baseURL}${ENDPOINTS.NEO_DETAILS}/${neoId}?${params}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`NASA API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching NEO details:', error)
      throw error
    }
  }

  // Helper method to get current week's date range
  getCurrentWeekDateRange() {
    const today = new Date()
    const startDate = new Date(today)
    const endDate = new Date(today)
    endDate.setDate(endDate.getDate() + 7)

    return {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    }
  }

  // Helper method to format date for API
  formatDateForApi(date) {
    return new Date(date).toISOString().split('T')[0]
  }

  // Fetch APOD (Astronomy Picture of the Day)
  async fetchApod(date = null) {
    try {
      const params = new URLSearchParams({
        api_key: this.apiKey
      })

      // Add date parameter if provided
      if (date) {
        params.append('date', this.formatDateForApi(date))
      }

      const url = `${this.baseURL}${ENDPOINTS.APOD}?${params}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`NASA APOD API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching APOD data:', error)
      throw error
    }
  }

  // Fetch multiple APOD images for a date range
  async fetchApodRange(startDate, endDate) {
    try {
      const params = new URLSearchParams({
        start_date: this.formatDateForApi(startDate),
        end_date: this.formatDateForApi(endDate),
        api_key: this.apiKey
      })

      const url = `${this.baseURL}${ENDPOINTS.APOD}?${params}`

      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`NASA APOD API Error: ${response.status} - ${response.statusText}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching APOD range data:', error)
      throw error
    }
  }

  // Get today's date formatted for APOD API
  getTodayFormatted() {
    return this.formatDateForApi(new Date())
  }
}

export const nasaApiService = new NasaApiService()
export default nasaApiService