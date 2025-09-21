<script setup>
import { ref } from 'vue'

const apodData = ref({
  date: "2025-09-21",
  explanation: "Does the Sun set in the same direction every day? No, the direction of sunset depends on the time of the year. Although the Sun always sets approximately toward the west, on an equinox like today the Sun sets directly toward the west. After tomorrow's September equinox, the Sun will set increasingly toward the southwest, reaching its maximum displacement at the December solstice. Before today's September equinox, the Sun had set toward the northwest, reaching its maximum displacement at the June solstice. The featured time-lapse image shows seven bands of the Sun setting one day each month from 2019 December through 2020 June. These image sequences were taken from Alberta, Canada -- well north of the Earth's equator -- and feature the city of Edmonton in the foreground. The middle band shows the Sun setting during the last equinox -- in March. From this location, the Sun will set along this same equinox band again tomorrow.",
  hdurl: "https://apod.nasa.gov/apod/image/2509/SunsetMonths_Vanzella_2400.jpg",
  media_type: "image",
  service_version: "v1",
  title: "Equinox Sunset",
  url: "https://apod.nasa.gov/apod/image/2509/SunsetMonths_Vanzella_1080.jpg"
})
</script>

<template>
  <div class="apod-page">
    <!-- Hero Section with Image -->
    <div class="hero-section">
      <div class="hero-background">
        <img
          :src="apodData.url"
          :alt="apodData.title"
          class="hero-image"
          loading="lazy"
        />
        <div class="hero-overlay"></div>
      </div>

      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">🌌</span>
          <span>NASA Astronomy Picture of the Day</span>
        </div>

        <h1 class="hero-title">{{ apodData.title }}</h1>

        <div class="hero-meta">
          <div class="meta-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
              <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
              <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ new Date(apodData.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            }) }}
          </div>

          <div class="meta-chip">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
              <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
            </svg>
            {{ apodData.media_type }}
          </div>
        </div>

        <div class="hero-actions">
          <a :href="apodData.hdurl" target="_blank" class="btn btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2"/>
              <polyline points="7,10 12,15 17,10" stroke="currentColor" stroke-width="2"/>
              <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2"/>
            </svg>
            Download HD Image
          </a>

          <button class="btn btn-ghost">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor" stroke-width="2"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor" stroke-width="2"/>
            </svg>
            Share
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <div class="content-section">
      <div class="container">
        <div class="content-grid">
          <!-- Main Description -->
          <div class="description-card">
            <div class="card-header">
              <h2 class="card-title">About This Image</h2>
              <div class="card-accent"></div>
            </div>
            <div class="card-content">
              <p class="description-text">{{ apodData.explanation }}</p>
            </div>
          </div>

          <!-- Image Details Sidebar -->
          <div class="details-sidebar">
            <div class="details-card">
              <h3>Image Details</h3>

              <div class="detail-item">
                <div class="detail-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" stroke-width="2"/>
                    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Publication Date
                </div>
                <div class="detail-value">{{ apodData.date }}</div>
              </div>

              <div class="detail-item">
                <div class="detail-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" stroke-width="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Media Type
                </div>
                <div class="detail-value">
                  <span class="media-badge">{{ apodData.media_type }}</span>
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                    <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Service Version
                </div>
                <div class="detail-value">{{ apodData.service_version }}</div>
              </div>
            </div>

            <!-- Quick Actions -->
            <div class="actions-card">
              <h3>Quick Actions</h3>
              <div class="action-buttons">
                <button class="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" stroke-width="2"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  View Full Size
                </button>

                <button class="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2"/>
                    <polyline points="17,21 17,13 7,13 7,21" stroke="currentColor" stroke-width="2"/>
                    <polyline points="7,3 7,8 15,8" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Save to Collection
                </button>

                <button class="action-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" stroke="currentColor" stroke-width="2"/>
                    <polyline points="16,6 12,2 8,6" stroke="currentColor" stroke-width="2"/>
                    <line x1="12" y1="2" x2="12" y2="15" stroke="currentColor" stroke-width="2"/>
                  </svg>
                  Export Image
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

