<template>
  <header class="main-header py-7 md:py-14">
    <div class="content-wrapper mx-auto px-2 md:px-10 flex flex-wrap items-center justify-between gap-4 md:gap-6">

      <div class="header-left flex items-center gap-4 md:gap-8 flex-1 md:flex-none">
        <div class="netflix-brand flex items-end gap-2 md:gap-4" style="align-items:flex-end;">
          <router-link to="/">
            <img src="/img/netflix-logo.png" alt="Netflix" 
              class="logo-img max-w-[110px] sm:max-w-[130px] md:max-w-[130px] lg:max-w-[156px] h-auto"
              style="transform:translateY(4px);max-height:32px;"
            />
          </router-link>
          <span v-if="isLoggedIn" class="header-date text-white font-netflix-date text-lg ml-4 hidden sm:inline-block" style="margin-top:0;position:relative;line-height:1.1;">Friday July 8th</span>
        </div>
      </div>

      <nav v-if="isLoggedIn" class="nav-menu hidden sm:flex gap-3 md:gap-8 text-white/80 text-base md:text-xl font-medium">
        <router-link to="/" class="same-class px-1 md:px-2"> HOME </router-link>
        <router-link to="/about" class="same-class px-1 md:px-2">ABOUT</router-link>
        <router-link to="/price" class="same-class px-1 md:px-2">PRICE</router-link>
        <router-link to="/contact" class="same-class px-1 md:px-2">CONTACT</router-link>
        <router-link to="/admin" class="same-class px-1 md:px-2">ADMIN</router-link>
      </nav>

      <div v-if="isLoggedIn" class="burger-mobile-only flex items-center w-full justify-center relative" style="display: flex; align-items: center;">
        <button @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Open menu" class="burger-btn mobile-burger-btn focus:outline-none relative z-50" :aria-expanded="mobileMenuOpen">
          <span :class="{'burger-bar': true, 'open': mobileMenuOpen}"></span>
          <span :class="{'burger-bar': true, 'open': mobileMenuOpen}"></span>
          <span :class="{'burger-bar': true, 'open': mobileMenuOpen}"></span>
        </button>
        <transition name="menu-fade">
          <nav v-if="mobileMenuOpen" class="mobile-nav-menu shadow-2xl rounded-b-2xl border-t border-white/10 animate-fade-in-down flex flex-col items-center pt-8 pb-4 px-4 gap-2 relative">
            <router-link to="/" class="mobile-link" @click="closeMobileMenu">HOME</router-link>
            <router-link to="/about" class="mobile-link" @click="closeMobileMenu">ABOUT</router-link>
            <router-link to="/price" class="mobile-link" @click="closeMobileMenu">PRICE</router-link>
            <router-link to="/contact" class="mobile-link" @click="closeMobileMenu">CONTACT</router-link>
            <router-link to="/admin" class="mobile-link" @click="closeMobileMenu">ADMIN</router-link>
          </nav>
        </transition>
      </div>

      <template v-if="!isLoggedIn">
        <button
          @click="openLogin"
          class="same-class"
          style="background:none;border:none;padding:0;margin:0;cursor:pointer;"
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
        <div style="display:flex;align-items:center;">
          <div style="position:relative;display:flex;align-items:center;gap:2px;">
            <transition name="fade-search" @after-leave="clearSearchData">
              <div v-if="searchOpen" style="display:flex;align-items:center;gap:4px;">
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
                  @keydown.enter="onSearchButton"
                  autocomplete="off"
                  :style="searchInputStyle"
                  @focus="onSearchFocus"
                  style="max-width:120px;min-width:0;"
                />
                <button
                  class="search-btn-anim"
                  aria-label="Search"
                  @click="onSearchButton"
                  :disabled="searchLoading"
                  style="background:none;border:none;padding:0;margin:0;cursor:pointer;width:38px;height:38px;display:flex;align-items:center;justify-content:center;"
                >
                  <i
                    class="fa-solid fa-magnifying-glass"
                    :style="{
                      color: '#e50914',
                      fontSize: '22px',
                      transition: 'color 0.22s, transform 0.22s',
                      transform: searchLoading ? 'scale(1.2) rotate(20deg)' : 'scale(1)',
                      filter: searchLoading ? 'drop-shadow(0 0 8px #e50914)' : 'none'
                    }"
                  ></i>
                </button>
              </div>
            </transition>
            <button
              v-if="!searchOpen"
              class="search-icon"
              aria-label="Search"
              @click="toggleSearch"
              :aria-pressed="searchOpen"
              style="background:none;border:none;padding:0;margin:0;cursor:pointer;width:48px;height:48px;display:flex;align-items:center;justify-content:center;z-index:1;"
              @mouseenter="searchIconHover = true"
              @mouseleave="searchIconHover = false"
            >
              <i
                class="fa-solid fa-magnifying-glass"
                :style="{
                  color: searchIconHover ? '#e50914' : '#fff',
                  fontSize: '28px',
                  width: '44px',
                  height: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }"
              ></i>
            </button>
            <transition name="fade-search">
              <div
                v-if="searchOpen && (searchLoading || (searchValue && searchValue.length > 2 && moviesList.length))"
                style="position:absolute;left:0;top:100%;width:100%;z-index:50;"
              >
                <div v-if="searchLoading" class="search-results">
                  <div style="color:#aaa;padding:8px 0;">
                    <i class="fa fa-spinner fa-spin"></i> Searching...
                  </div>
                </div>
                <div v-else-if="filteredMovies.length || (searchValue && searchValue.length > 2)" class="search-results">
                  <div v-if="filteredMovies.length === 0" class="search-no-results" style="color:#e74c3c;padding:12px 0;text-align:center;">
                    No movies found
                  </div>
                  <transition-group name="search-list-fade" tag="ul" class="search-list" style="padding:0;display:flex;flex-direction:column;gap:0;">
                    <li
                      v-for="movie in filteredMovies"
                      :key="movie.id"
                      @mousedown.prevent="selectMovie(movie)"
                      style="display:flex;align-items:center;gap:12px;padding:6px 10px;cursor:pointer;transition:background 0.18s, box-shadow 0.18s, transform 0.18s; border-radius:8px;"
                      @mouseenter="hoveredMovie = movie.id"
                      @mouseleave="hoveredMovie = null"
                      :style="{ background: hoveredMovie === movie.id ? 'rgba(229,9,20,0.13)' : 'rgba(255,255,255,0.03)', boxShadow: hoveredMovie === movie.id ? '0 2px 12px #e5091440' : 'none', transform: hoveredMovie === movie.id ? 'scale(1.03)' : 'none' }"
                    >
                      <img
                        :src="movie.img"
                        :alt="movie.title"
                        style="width:38px;height:54px;object-fit:cover;border-radius:4px;box-shadow:0 1px 4px #0002;"
                      />
                      <div style="display:flex;flex-direction:column;">
                        <span style="color:#fff;font-weight:500;">{{ movie.title }}</span>
                        <span style="color:#aaa;font-size:13px;">
                          {{ movie.raw?.release_date ? movie.raw.release_date.slice(0,4) : (movie.raw?.first_air_date ? movie.raw.first_air_date.slice(0,4) : '') }}
                        </span>
                      </div>
                    </li>
                  </transition-group>
                </div>
              </div>
            </transition>
            <div class="favorites-menu" ref="dropdownRef" style="margin-left:2px;">
              <button
                type="button"
                class="favorites-heart-btn"
                aria-label="Open favorites"
                :aria-expanded="favOpen"
                @click="toggleFav"
                @keydown.esc="favOpen = false"
                @mouseenter="favHeartHover.value = true"
                @mouseleave="favHeartHover.value = false"
                style="background:none;border:none;padding:0;margin:0;cursor:pointer;width:44px;height:44px;display:flex;align-items:center;justify-content:center;"
              >
                <i
                  class="fa-regular fa-heart favorites-heart-icon"
                  :class="{ 'favorites-heart-hover': favHeartHover.value }"
                  aria-hidden="true"
                ></i>
                <transition name="badge-bounce">
                  <span
                    v-if="favorites.length"
                    class="favorites-badge"
                    style="position:absolute;top:-7px;right:-7px;"
                  >
                    {{ favorites.length }}
                  </span>
                </transition>
              </button>

              <transition name="menu-fade">
                <div
                  v-if="favOpen"
                  class="favorites-panel"
                  tabindex="-1"
                  aria-label="Favorites dropdown"
                  @keydown.esc="favOpen = false"
                >
                  <div class="favorites-panel-accent"></div>
                  <div class="favorites-panel-header">
                    <span class="favorites-title text-xl font-bold">Favorites</span>
                  </div>
                  <div v-if="!favorites.length" class="favorites-empty">
                    <i class="fa-regular fa-face-smile-beam text-red-500"></i>
                    <p class="empty-title">No favorites yet</p>
                    <p class="empty-desc">Add movies to build your watch list.</p>
                  </div>

                  <div v-else class="favorites-list-wrapper">
                    <transition-group name="favorites-list" tag="div" class="favorites-list">
                      <article
                        v-for="(movie, index) in favorites"
                        :key="movie.id"
                        class="favorites-item"
                        :style="{ '--i': index + 1 }"
                      >
                        <img
                          :src="movie.img"
                          :alt="movie.title"
                          class="favorites-item-img"
                        />
                        <div class="favorites-item-info">
                          <h5 class="favorites-item-title">{{ movie.title }}</h5>
                          <p class="favorites-item-year">{{ movie.year || movie.raw?.release_date?.slice(0, 4) || movie.raw?.first_air_date?.slice(0, 4) || 'Unknown year' }}</p>
                        </div>
                        <div class="favorites-item-actions">
                          <button
                            type="button"
                            class="favorites-watch-btn"
                            @click="handleWatch(movie)"
                          >
                            Watch
                          </button>
                          <button
                            type="button"
                            class="favorites-delete-btn"
                            @click="removeFromFavorites(movie.id)"
                          >
                            Delete
                          </button>
                        </div>
                      </article>
                    </transition-group>
                  </div>
                </div>
              </transition>
            </div>
            <div class="profile-container" style="margin-left:8px;position:relative;width:40px;height:40px;">
              <img
                src="/img/avatar.png"
                alt="profile"
                @click="enlargeAvatar"
                :class="['avatar-img', avatarScaled ? 'avatar-glow-ring' : '']"
                style="width:40px;height:40px;z-index:2;position:relative;cursor:pointer;"
              />
              <transition name="avatar-ring-fade">
                <span
                  v-if="avatarScaled"
                  class="avatar-animated-ring"
                  style="width:52px;height:52px;"
                ></span>
              </transition>
            </div>
          </div>
        </div>
      </template>

    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, nextTick, computed, onBeforeUnmount, watch } from 'vue'
const mobileMenuOpen = ref(false)
function closeMobileMenu() {
  mobileMenuOpen.value = false
}
import ModalLogin from './ModalLogin.vue'
import { movies as localMovies } from '../data/movies.js'


const favoritesContext = inject('favoritesContext')
const favorites = computed(() => favoritesContext?.favorites?.value ?? [])
const removeFromFavorites = favoritesContext?.removeFromFavorites
  
const props = defineProps({
  search: String,
  movies: Array,
  isLoggedIn: { type: Boolean, default: false }
})

const emit = defineEmits(['update:search', 'update:isLoggedIn'])

const showModal = ref(false)

const searchOpen = ref(false)
const searchValue = ref(props.search || '')
const searchInput = ref(null)
const searchLoading = ref(false)
const hoveredMovie = ref(null)
const searchIconHover = ref(false)

function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) {
    nextTick(() => {
      searchInput.value?.focus()
    })
  } else {
    searchValue.value = ''
    movieAPI.value = []
  }
}

function closeSearch() {
  searchOpen.value = false;
}

function clearSearchData() {
  searchValue.value = '';
  movieAPI.value = [];
}

function onSearchInput() {
  emit('update:search', searchValue.value)
  searchOpen.value = true
}

function onSearchButton() {
  if (searchValue.value && searchValue.value.length > 2) {
    fetchMovieAPI(searchValue.value)
  }
}

function onSearchFocus(e) {
  e.target.style.borderColor = '#fff';
  setTimeout(() => {
    if (document.activeElement !== e.target) {
      e.target.style.borderColor = '#e50914';
    }
  }, 300);
}

const favOpen = ref(false)
const dropdownRef = ref(null)
const favHeartHover = ref(false)

function toggleFav() {
  favOpen.value = !favOpen.value
}

function handleOutsideClick(e) {
  const dropdown = dropdownRef.value
  if (!dropdown) return
  if (!dropdown.contains(e.target)) {
    favOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleOutsideClick)
})
onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleOutsideClick)
})

function handleWatch(movie) {
  alert(`Watch: ${movie.title}`)
  favOpen.value = false
}

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

    const moviesList = (moviesData.results || []).filter(i => i.title?.trim())
    const seriesList = (seriesData.results || []).filter(i => i.name?.trim())

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

watch(searchValue, (val) => {
  if (val && val.length > 2) {
    fetchMovieAPI(val)
  } else {
    movieAPI.value = []
  }
})

const moviesList = computed(() =>
  movieAPI.value.length
    ? movieAPI.value
    : (Array.isArray(props.movies) && props.movies.length ? props.movies : localMovies)
)

const filteredMovies = computed(() => {
  if (searchValue.value?.length > 2) {
    const q = searchValue.value.toLowerCase()
    return moviesList.value
      .filter(m => (m.title || '').toLowerCase().includes(q))
      .slice(0, 6)
  }
  return []
})

function selectMovie() {
  closeSearch();
}

const avatarScaled = ref(false)
function enlargeAvatar() {
  avatarScaled.value = true
  favOpen.value = false
  searchOpen.value = false
  setTimeout(() => {
    avatarScaled.value = false
  }, 300)
}

function openLogin() {
  showModal.value = true
}

function handleLoginSuccess() {
  emit('update:isLoggedIn', true)
  showModal.value = false
}

const searchInputStyle = computed(() => {
  if (typeof window !== 'undefined') {
    if (window.innerWidth <= 600) {
      return `
        width: 100px;
        height:36px;
        font-size:13px;
        padding:0 10px 0 38px;
        min-width:0;
        border-radius:0;
        border:2.5px solid #e50914;
        background:rgba(24,24,28,0.98);
        color:#fff;
        box-shadow:0 4px 24px 0 #e5091420,0 2px 8px #fff2;
        outline:none;
        transition:border-color 0.22s,box-shadow 0.22s,width 0.22s,font-size 0.22s,padding 0.22s;
        position:relative;left:0;top:0;z-index:2;margin-left:0;
      `
    }
    if (window.innerWidth <= 900) {
      return `
        width: 160px;
        height:40px;
        font-size:15px;
        padding:0 14px 0 38px;
        min-width:0;
        border-radius:0;
        border:2.5px solid #e50914;
        background:rgba(24,24,28,0.98);
        color:#fff;
        box-shadow:0 4px 24px 0 #e5091420,0 2px 8px #fff2;
        outline:none;
        transition:border-color 0.22s,box-shadow 0.22s,width 0.22s,font-size 0.22s,padding 0.22s;
        position:relative;left:0;top:0;z-index:2;margin-left:0;
      `
    }
  }
  return `
    width: 240px;
    min-width: 0;
    padding: 0 22px 0 48px;
    height: 48px;
    font-size: 17px;
    border-radius: 0;
    border: 2.5px solid #e50914;
    background: rgba(24,24,28,0.98);
    color: #fff;
    box-shadow: 0 4px 24px 0 #e5091420, 0 2px 8px #fff2;
    outline: none;
    transition: border-color 0.22s, box-shadow 0.22s, width 0.22s, font-size 0.22s, padding 0.22s;
    position: relative;
    left: 0;
    top: 0;
    z-index: 2;
    margin-left: 0;
  `
})
</script>
<style>@import '../assets/Header.css'; </style>