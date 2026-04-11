<template>
  <header class="main-header">
    <div class="content-wrapper">
      <div class="header-left">
        <div class="netflix-brand">
          <router-link to="/">
            <img src="/img/netflix-logo.png" alt="Netflix" />
          </router-link>
        </div>
        <span class="date-text" v-if="isLoggedIn">Friday, July 8th</span>
      </div>

      <nav class="nav-menu" v-if="isLoggedIn">
        <router-link to="/">HOME</router-link>
        <router-link to="/about">ABOUT</router-link>
        <router-link to="/price">PRICE</router-link>
        <router-link to="/contact">CONTACT</router-link>
        <router-link to="/admin">ADMIN</router-link>
      </nav>

      <div class="header-right">
        <div class="header-actions">
          <template v-if="!isLoggedIn">
            <button
              @click="openLogin"
              aria-label="Login"
              class="login-nav-btn"
            >
              Login
            </button>
            <ModalLogin
              v-if="showModal"
              @login="handleLoginSuccess"
              @close="showModal = false"
            />
          </template>
          <template v-else>
            <button
              class="search-icon"
              aria-label="Search"
              @click="toggleSearch"
              :aria-pressed="searchOpen"
              style="background:none;border:none;padding:0;margin:0;cursor:pointer"
            >
              <i class="fa-solid fa-magnifying-glass"></i>
            </button>
            <div v-if="searchOpen" style="position:relative;">
              <input
                ref="searchInput"
                v-model="searchValue"
                type="text"
                placeholder="Search movies..."
                class="header-search active"
                aria-label="Search movies"
                @input="onSearchInput"
                @blur="closeSearch"
                @keydown.esc="closeSearch"
                autocomplete="off"
              />
              <div v-if="searchLoading" class="search-results">
                <div style="color:#aaa;padding:8px 0;">
                  <i class="fa fa-spinner fa-spin"></i> Searching...
                </div>
              </div>
              <div v-else-if="searchValue && searchValue.length > 2 && moviesList.length" class="search-results">
                <div v-if="filteredMovies.length === 0" class="search-no-results">
                  No movies found
                </div>
                <ul v-else class="search-list" style="padding:0;display:flex;flex-direction:column;gap:8px;">
                  <li v-for="movie in filteredMovies" :key="movie.id" style="display:flex;align-items:center;gap:12px;padding:6px 0;">
                    <img
                      :src="movie.img"
                      :alt="movie.title"
                      style="width:38px;height:54px;object-fit:cover;border-radius:4px;box-shadow:0 1px 4px #0002;"
                    />
                    <div style="display:flex;flex-direction:column;">
                      <span style="color:#fff;font-weight:500;">{{ movie.title }}</span>
                      <span style="color:#aaa;font-size:13px;">{{ movie.raw.release_date ? movie.raw.release_date.slice(0,4) : (movie.raw.first_air_date ? movie.raw.first_air_date.slice(0,4) : '') }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div class="favorites-wrapper" ref="dropdownRef">
              <button
                class="heart-icon"
                aria-label="Favorites"
                @click="toggleFav"
                :aria-pressed="favOpen"
                @keydown.esc="favOpen = false"
                style="background:none;border:none;padding:0;margin:0;cursor:pointer"
              >
                <i :class="['fa-heart', favorites.length ? 'fa-solid' : 'fa-regular']"></i>
              </button>
              <transition name="bounce">
                <span v-if="favorites.length" class="favorites-count">{{ favorites.length }}</span>
              </transition>
              <div
                class="favorites-dropdown"
                :class="{ active: favOpen }"
                v-if="favOpen"
                tabindex="-1"
                aria-label="Favorites dropdown"
                @keydown.esc="favOpen = false"
              >
                <h4>
                  <i class="fa-solid fa-heart" style="color:#e50914;margin-right:6px;"></i>
                  Favorites ({{ favorites.length }})
                </h4>
                <div v-if="favorites.length === 0" class="favorites-empty">
                  <i class="fa-regular fa-face-smile-beam" style="font-size:32px;color:#e50914;margin-bottom:8px;"></i>
                  <div>No favorites yet</div>
                  <div style="font-size:13px;color:#aaa;margin-top:4px;">Add movies to your favorites!</div>
                </div>
                <div
                  v-for="movie in favorites"
                  :key="movie.id"
                  class="favorite-item"
                >
                  <img :src="movie.img || 'https://via.placeholder.com/50x70'" :alt="movie.title" />
                  <div class="info">
                    <h5>{{ movie.title }}</h5>
                    <p>{{ movie.year || '2024' }}</p>
                  </div>
                  <div class="actions">
                    <button class="btn-watch" @click="handleWatch(movie)" aria-label="Watch movie">Watch</button>
                    <button class="btn-delete" @click="removeFromFavorites(movie.id)" aria-label="Remove from favorites">Delete</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="profile-container">
              <img
                ref="avatarRef"
                src="/img/avatar.png"
                alt="profile"
                style="border-radius:50%;width:44px;height:44px;object-fit:cover;border:2px solid #fff;transition:transform 0.3s;"
                @click="enlargeAvatar"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, watch, nextTick, computed, onBeforeMount, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
import { movies as localMovies } from '../data/movies.js'
import ModalLogin from './ModalLogin.vue'

const props = defineProps({
  search: String,
  movies: {
    type: Array,
    default: undefined
  },
  isLoggedIn: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:search', 'update:isLoggedIn'])

const searchOpen = ref(false)
const favOpen = ref(false)
const searchInput = ref(null)
const dropdownRef = ref(null)

const isLoggedIn = ref(props.isLoggedIn)
watch(isLoggedIn, val => emit('update:isLoggedIn', val))

const showModal = ref(false)

function openLogin() {
  showModal.value = true
}
function handleLoginSuccess(payload) {
  isLoggedIn.value = true
  showModal.value = false
}

function handleLogin() {
  isLoggedIn.value = true
  showModal.value = false
}

const favoritesContext = inject('favoritesContext')
const favorites = favoritesContext?.favorites || []
const favoritesCount = computed(() => favorites.length)
const removeFromFavorites = favoritesContext?.removeFromFavorites || (() => {})

function toggleFav() {
  favOpen.value = !favOpen.value
}
function closeFav() {
  favOpen.value = false
}
function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => {
      if (searchInput.value) searchInput.value.focus()
    })
  } else {
    searchValue.value = ''
    movieAPI.value = []
  }
}
function closeSearch() {
  searchOpen.value = false
  searchValue.value = ''
  movieAPI.value = []
}

watch(favOpen, (open) => {
  if (open) {
    document.addEventListener('mousedown', handleClickOutside)
  } else {
    document.removeEventListener('mousedown', handleClickOutside)
  }
})

function handleClickOutside(e) {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
    favOpen.value = false
  }
}

const searchValue = ref(props.search || '')
const searchLoading = ref(false)

const movieAPI = ref([])
const API_KEY = '9eee1c8a9ca4c5306eb86111905631a1'

async function fetchMovieAPI(query) {
  query = (query || '').trim()
  if (!query || query.length < 3) {
    movieAPI.value = []
    searchLoading.value = false
    return
  }
  searchLoading.value = true
  try {
    const [moviesRes, seriesRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`),
      fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}`)
    ])
    const moviesData = await moviesRes.json()
    const seriesData = await seriesRes.json()
    const moviesList = (moviesData.results || []).filter(item => item.title && item.title.trim())
    const seriesList = (seriesData.results || []).filter(item => item.name && item.name.trim())
    const seen = new Set()
    const combined = [...moviesList, ...seriesList].filter(item => {
      const t = (item.title || item.name || '').trim().toLowerCase()
      if (!t || seen.has(t)) return false
      seen.add(t)
      return true
    })
    movieAPI.value = combined.map(item => ({
      id: item.id,
      title: item.title || item.name,
      img: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/300x450',
      raw: item
    }))
  } catch (e) {
    movieAPI.value = []
  } finally {
    searchLoading.value = false
  }
}

watch(
  searchValue,
  (val) => {
    if (typeof val === 'string' && val.length > 2) {
      fetchMovieAPI(val)
    } else {
      movieAPI.value = []
      searchLoading.value = false
    }
  }
)

const moviesList = computed(() =>
  movieAPI.value.length
    ? movieAPI.value
    : (Array.isArray(props.movies) && props.movies.length ? props.movies : localMovies)
)

function onSearchInput() {
  emit('update:search', searchValue.value)
}

const filteredMovies = computed(() => {
  if (
    typeof searchValue.value === 'string' &&
    searchValue.value.length > 2 &&
    moviesList.value.length
  ) {
    const q = searchValue.value.trim().toLowerCase()
    return moviesList.value.filter(m => {
      const title = m.title.toLowerCase()
      return (
        title === q ||
        title.startsWith(q) ||
        title.split(/\s+/).some(word => word.startsWith(q))
      )
    }).slice(0, 5)
  }
  return []
})

watch(
  () => props.search,
  (newVal) => {
    searchValue.value = newVal || ''
  }
)

function handleWatch(movie) {
  alert(`Launching the preview: ${movie.title}`)
  favOpen.value = false
}

const moviesCount = computed(() => moviesList.value.length)
const avgTitleLength = computed(() =>
  moviesList.value.length
    ? (moviesList.value.reduce((sum, m) => sum + m.title.length, 0) / moviesList.value.length).toFixed(1)
    : 0
)

const avatarRef = ref(null)
function enlargeAvatar() {
  if (avatarRef.value) {
    avatarRef.value.style.transform = 'scale(1.5)'
    setTimeout(() => {
      avatarRef.value.style.transform = 'scale(1)'
    }, 3000)
  }
}

onBeforeMount(() => {
  console.log('Header: onBeforeMount')
})
onMounted(() => {
  console.log('Header: onMounted')
})
onBeforeUpdate(() => {
  console.log('Header: onBeforeUpdate')
})
onUpdated(() => {
  console.log('Header: onUpdated')
})
onBeforeUnmount(() => {
  console.log('Header: onBeforeUnmount')
})
onUnmounted(() => {
  console.log('Header: onUnmounted')
})
</script>