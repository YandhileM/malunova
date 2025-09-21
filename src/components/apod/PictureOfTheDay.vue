<script setup>
import { computed } from 'vue'
import { useTodayApod, useRefreshApod, useApodDates, useApodFavorites } from '../../composables/useApodData'

// Composables
const { formatDisplayDate } = useApodDates()
const { addToFavorites, removeFromFavorites, isFavorite } = useApodFavorites()

// Fetch today's APOD only
const {
  data: apodData,
  isLoading,
  isError,
  error
} = useTodayApod()

// Refresh mutation
const refreshMutation = useRefreshApod()

// Computed properties
const isCurrentFavorite = computed(() => {
  return apodData.value ? isFavorite(apodData.value.date) : false
})

// Actions
const handleRefresh = async () => {
  try {
    await refreshMutation.mutateAsync()
  } catch (error) {
    console.error('Error refreshing APOD:', error)
  }
}

const toggleFavorite = () => {
  if (!apodData.value) return

  if (isCurrentFavorite.value) {
    removeFromFavorites(apodData.value.date)
  } else {
    addToFavorites(apodData.value)
  }
}

const handleShare = async () => {
  if (!apodData.value) return

  try {
    await navigator.share({
      title: apodData.value.title,
      text: `NASA Astronomy Picture of the Day: ${apodData.value.title}`,
      url: window.location.href
    })
  } catch (error) {
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    } catch (clipboardError) {
      console.error('Error sharing:', error)
    }
  }
}
</script>

<template>
  <div class="apod-component">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Loading today's astronomy picture...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="isError" class="error-state">
      <p>{{ error?.message || 'Failed to load APOD' }}</p>
      <button @click="handleRefresh" class="btn btn-primary">Retry</button>
    </div>

    <!-- APOD Image -->
    <div v-else-if="apodData">
      <div class="apod-image-container">
        <img
          v-if="apodData.media_type === 'image'"
          :src="apodData.url"
          :alt="apodData.title"
          class="apod-image"
          loading="lazy"
        />
        <iframe
          v-else-if="apodData.media_type === 'video'"
          :src="apodData.url"
          :title="apodData.title"
          frameborder="0"
          allowfullscreen
          class="apod-video"
        ></iframe>

        <div class="apod-overlay">
          <div class="apod-info">
            <h2>{{ apodData.title }}</h2>
            <p>{{ formatDisplayDate(apodData.date) }}</p>
          </div>
        </div>
      </div>

      <!-- Explanation -->
      <div class="apod-explanation">
        <p>{{ apodData.explanation }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.apod-component {
  width: 100%;
}

/* Loading State */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.loading-state p {
  margin-top: 1rem;
  color: var(--star-silver);
}

/* Error State */
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.error-state p {
  margin-bottom: 1rem;
  color: var(--solar-orange);
}

/* APOD Image Container */
.apod-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  border-radius: 0.5rem;
}

.apod-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.apod-video {
  width: 100%;
  height: 100%;
  border: none;
}

/* Overlay */
.apod-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 2rem;
  color: white;
}

.apod-info h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.apod-info p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.875rem;
}

/* Explanation */
.apod-explanation {
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: rgba(var(--cosmic-navy), 0.3);
  border-radius: 0.5rem;
  border-left: 4px solid var(--plasma-cyan);
}

.apod-explanation p {
  margin: 0;
  line-height: 1.6;
  color: var(--star-silver);
  font-size: 1rem;
}

/* Responsive */
@media (max-width: 768px) {
  .apod-image-container {
    height: 300px;
  }

  .apod-overlay {
    padding: 1rem;
  }

  .apod-info h2 {
    font-size: 1.25rem;
  }
}
</style>
