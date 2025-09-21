import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ApodDaily from '../views/ApodDaily.vue'
import ApodArchive from '../views/ApodArchive.vue'
import ApodSearch from '../views/ApodSearch.vue'
import MarsRoverDashboard from '../views/MarsRoverDashboard.vue'
import MarsPhotoGallery from '../views/MarsPhotoGallery.vue'
import MarsCameraFilters from '../views/MarsCameraFilters.vue'
import NeoAsteroidDashboard from '../views/NeoAsteroidDashboard.vue'
import NeoDataTable from '../views/NeoDataTable.vue'
import NeoHazardTracker from '../views/NeoHazardTracker.vue'
import EpicEarthViewer from '../views/EpicEarthViewer.vue'
import EpicTimelapse from '../views/EpicTimelapse.vue'
import EventMap from '../views/EventMap.vue'
import EventList from '../views/EventList.vue'
import EventFilters from '../views/EventFilters.vue'
import StyleGuide from '../views/StyleGuide.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/apod',
    name: 'APOD',
    children: [
      {
        path: 'daily',
        name: 'ApodDaily',
        component: ApodDaily
      },
      {
        path: 'archive',
        name: 'ApodArchive',
        component: ApodArchive
      },
      {
        path: 'search',
        name: 'ApodSearch',
        component: ApodSearch
      }
    ]
  },
  {
    path: '/mars',
    name: 'Mars',
    children: [
      {
        path: 'dashboard',
        name: 'MarsRoverDashboard',
        component: MarsRoverDashboard
      },
      {
        path: 'gallery',
        name: 'MarsPhotoGallery',
        component: MarsPhotoGallery
      },
      {
        path: 'filters',
        name: 'MarsCameraFilters',
        component: MarsCameraFilters
      }
    ]
  },
  {
    path: '/neo',
    name: 'NEO',
    children: [
      {
        path: 'dashboard',
        name: 'NeoAsteroidDashboard',
        component: NeoAsteroidDashboard
      },
      {
        path: 'data',
        name: 'NeoDataTable',
        component: NeoDataTable
      },
      {
        path: 'hazards',
        name: 'NeoHazardTracker',
        component: NeoHazardTracker
      }
    ]
  },
  {
    path: '/epic',
    name: 'EPIC',
    children: [
      {
        path: 'viewer',
        name: 'EpicEarthViewer',
        component: EpicEarthViewer
      },
      {
        path: 'timelapse',
        name: 'EpicTimelapse',
        component: EpicTimelapse
      }
    ]
  },
  {
    path: '/events',
    name: 'Events',
    children: [
      {
        path: 'map',
        name: 'EventMap',
        component: EventMap
      },
      {
        path: 'list',
        name: 'EventList',
        component: EventList
      },
      {
        path: 'filters',
        name: 'EventFilters',
        component: EventFilters
      }
    ]
  },
  {
    path: '/style-guide',
    name: 'StyleGuide',
    component: StyleGuide
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router