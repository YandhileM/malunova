<script setup>
import { ref } from 'vue'

const currentMission = ref('Artemis III')
const launchDate = ref('2026-09-01')
const missionStatus = ref('Planning')

const missions = ref([
  { id: 1, name: 'Artemis I', status: 'Completed', date: '2022-11-16' },
  { id: 2, name: 'Artemis II', status: 'Scheduled', date: '2025-11-01' },
  { id: 3, name: 'Artemis III', status: 'Planning', date: '2026-09-01' },
  { id: 4, name: 'Mars Sample Return', status: 'Development', date: '2028-07-15' }
])

const showMissionDetails = ref(false)

const emit = defineEmits(['back-to-home'])

const goBackHome = () => {
  emit('back-to-home')
}
</script>

<template>
  <div class="style-guide">
    <!-- Navigation -->
    <nav class="navbar">
      <div class="nav-container">
        <a href="#" class="nav-brand">NASA Style Guide</a>
        <ul class="nav-menu">
          <li><a href="#" class="nav-link active">Components</a></li>
          <li><a href="#" class="nav-link">Typography</a></li>
          <li><a href="#" class="nav-link">Colors</a></li>
          <li><button @click="goBackHome" class="btn btn-ghost">← Back to Home</button></li>
        </ul>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container">
      <!-- Hero Section -->
      <section class="section text-center animate-fade-in">
        <h1 class="mb-4">NASA Space Explorer Style Guide</h1>
        <p class="mb-5">Comprehensive design system for space exploration interfaces</p>

        <div class="flex justify-center gap-3 mb-5">
          <button class="btn btn-primary" @click="showMissionDetails = !showMissionDetails">
            Mission Details
          </button>
          <button class="btn btn-secondary">Launch Sequence</button>
          <button class="btn btn-ghost">System Status</button>
        </div>
      </section>

      <!-- Typography Section -->
      <section class="section">
        <h2 class="text-center mb-5">Typography</h2>
        <div class="card">
          <h1>Heading 1 - Mission Title</h1>
          <h2>Heading 2 - Section Header</h2>
          <h3>Heading 3 - Subsection</h3>
          <p>This is a paragraph with regular text that demonstrates the body typography used throughout the application. It has good contrast and readability against the dark cosmic background.</p>
          <a href="#">This is a link with hover effects</a>
        </div>
      </section>

      <!-- Button Variants -->
      <section class="section">
        <h2 class="text-center mb-5">Button Components</h2>
        <div class="card text-center">
          <div class="flex justify-center gap-3 mb-4">
            <button class="btn btn-primary">Primary Button</button>
            <button class="btn btn-secondary">Secondary Button</button>
            <button class="btn btn-ghost">Ghost Button</button>
          </div>
          <p>Buttons with gradient backgrounds, hover animations, and shine effects</p>
        </div>
      </section>

      <!-- Mission Cards Grid -->
      <section class="section">
        <h2 class="text-center mb-5">Card Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="mission in missions" :key="mission.id" class="card animate-fade-in">
            <div class="card-header">
              <h3 class="card-title">{{ mission.name }}</h3>
              <p class="card-subtitle">Status: {{ mission.status }}</p>
            </div>
            <p>Launch Date: {{ new Date(mission.date).toLocaleDateString() }}</p>
            <div class="mt-3">
              <span :class="{
                'btn-primary': mission.status === 'Completed',
                'btn-secondary': mission.status === 'Scheduled',
                'btn-ghost': mission.status === 'Planning' || mission.status === 'Development'
              }" class="btn">{{ mission.status }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Form Elements -->
      <section v-if="showMissionDetails" class="section animate-slide-in">
        <h2 class="text-center mb-5">Form Components</h2>
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Mission Configuration: {{ currentMission }}</h2>
            <p class="card-subtitle">Interactive form elements with space theme</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-group">
              <label class="form-label">Mission Name</label>
              <input v-model="currentMission" class="form-input" type="text" />
            </div>

            <div class="form-group">
              <label class="form-label">Launch Date</label>
              <input v-model="launchDate" class="form-input" type="date" />
            </div>

            <div class="form-group">
              <label class="form-label">Status</label>
              <select v-model="missionStatus" class="form-select">
                <option>Planning</option>
                <option>Development</option>
                <option>Scheduled</option>
                <option>Active</option>
                <option>Completed</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Mission Notes</label>
              <textarea class="form-textarea" rows="3" placeholder="Enter mission details..."></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- Data Table -->
      <section class="section">
        <h2 class="text-center mb-5">Table Components</h2>
        <div class="card">
          <table class="table">
            <thead>
              <tr>
                <th>Mission</th>
                <th>Status</th>
                <th>Launch Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="mission in missions" :key="mission.id">
                <td>{{ mission.name }}</td>
                <td>
                  <span :class="{
                    'text-aurora-green': mission.status === 'Completed',
                    'text-plasma-cyan': mission.status === 'Scheduled',
                    'text-solar-orange': mission.status === 'Planning' || mission.status === 'Development'
                  }">{{ mission.status }}</span>
                </td>
                <td>{{ new Date(mission.date).toLocaleDateString() }}</td>
                <td>{{ mission.status === 'Completed' ? '30 days' : 'TBD' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Loading States -->
      <section class="section">
        <h2 class="text-center mb-5">Loading Components</h2>
        <div class="card text-center">
          <h3 class="mb-4">System Components</h3>
          <div class="flex justify-center gap-4 mb-4">
            <div class="spinner"></div>
            <div class="animate-pulse">
              <div class="skeleton skeleton-title"></div>
              <div class="skeleton skeleton-text"></div>
              <div class="skeleton skeleton-text" style="width: 80%;"></div>
            </div>
          </div>
          <p>Spinner and skeleton loading states</p>
        </div>
      </section>

      <!-- Image Components -->
      <section class="section">
        <h2 class="text-center mb-5">Image Components</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=500&h=300&fit=crop" alt="Space" style="width: 100%; height: 250px; object-fit: cover;" />
            <div class="image-overlay">
              <div class="image-caption">
                <h4>Artemis Launch</h4>
                <p>Next-generation space exploration</p>
              </div>
            </div>
          </div>

          <div class="image-container">
            <img src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=300&fit=crop" alt="Earth from space" style="width: 100%; height: 250px; object-fit: cover;" />
            <div class="image-overlay">
              <div class="image-caption">
                <h4>Earth Observation</h4>
                <p>Monitoring our home planet</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Color Palette -->
      <section class="section">
        <h2 class="text-center mb-5">Color Palette</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="card">
            <h3 class="card-title">Primary Colors</h3>
            <div class="grid grid-cols-2 gap-2 mt-3">
              <div class="p-3 text-center" style="background: var(--space-black); border-radius: 0.5rem;">
                <small>Space Black</small>
              </div>
              <div class="p-3 text-center" style="background: var(--cosmic-navy); border-radius: 0.5rem;">
                <small>Cosmic Navy</small>
              </div>
              <div class="p-3 text-center" style="background: var(--deep-blue); border-radius: 0.5rem;">
                <small>Deep Blue</small>
              </div>
              <div class="p-3 text-center" style="background: var(--stellar-blue); border-radius: 0.5rem;">
                <small>Stellar Blue</small>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Accent Colors</h3>
            <div class="grid grid-cols-2 gap-2 mt-3">
              <div class="p-3 text-center" style="background: var(--nebula-blue); border-radius: 0.5rem;">
                <small>Nebula Blue</small>
              </div>
              <div class="p-3 text-center" style="background: var(--plasma-cyan); border-radius: 0.5rem;">
                <small>Plasma Cyan</small>
              </div>
              <div class="p-3 text-center" style="background: var(--aurora-green); border-radius: 0.5rem;">
                <small>Aurora Green</small>
              </div>
              <div class="p-3 text-center" style="background: var(--solar-orange); border-radius: 0.5rem;">
                <small>Solar Orange</small>
              </div>
            </div>
          </div>

          <div class="card">
            <h3 class="card-title">Text Colors</h3>
            <div class="grid grid-cols-1 gap-2 mt-3">
              <div class="p-3 text-center" style="background: var(--moon-white); color: var(--space-black); border-radius: 0.5rem;">
                <small>Moon White</small>
              </div>
              <div class="p-3 text-center" style="background: var(--star-silver); color: var(--space-black); border-radius: 0.5rem;">
                <small>Star Silver</small>
              </div>
              <div class="p-3 text-center" style="background: var(--asteroid-gray); border-radius: 0.5rem;">
                <small>Asteroid Gray</small>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.text-aurora-green { color: var(--aurora-green); }
.text-plasma-cyan { color: var(--plasma-cyan); }
.text-solar-orange { color: var(--solar-orange); }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}
</style>