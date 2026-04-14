<template>
  <header class="main-header py-10 md:py-14">
    <div class="content-wrapper mx-auto px-4 md:px-10 flex flex-wrap items-center justify-between gap-6">

      <div class="header-left flex items-center gap-8 flex-1 md:flex-none">
        <div class="netflix-brand">
          <router-link to="/">
            <img src="/img/netflix-logo.png" alt="Netflix" class="max-w-35 md:max-w-39" />
          </router-link>
        </div>
        <span
          v-if="isLoggedIn"
          class="date-text hidden lg:block font-[Kyiv*Type Titling] font-medium text-[24px] leading-[100%] tracking-[0] text-white/80"
        >
          Friday, July 8th
        </span>
      </div>
      
      <nav v-if="isLoggedIn" class="nav-menu flex gap-6 md:gap-8 text-white/80 text-xl font-medium">
        <router-link to="/" class="same-class"> HOME </router-link>
        <router-link to="/about" class="same-class">ABOUT</router-link>
        <router-link to="/price" class="same-class">PRICE</router-link>
        <router-link to="/contact" class="same-class">CONTACT</router-link>
        <router-link to="/admin" class="same-class">ADMIN</router-link>
      </nav>

      <div class="header-right flex items-center gap-4 md:gap-6">

        <template v-if="!isLoggedIn">
          <button
            @click="openLogin"
            class="login-nav-btn px-6 py-2.5 text-lg font-medium text-white/80 hover:text-white transition-all"
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
          <!-- Search, Favorites, Avatar: одинаковый размер и увеличенный padding -->
          <div style="display:flex;align-items:center;">
            <!-- Search Icon + Input -->
            <div style="position:relative;display:flex;align-items:center;">
              <input
                v-if="searchOpen"
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
                :style="searchInputStyle"
                @focus="onSearchFocus"
              />
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
                  <ul v-else class="search-list" style="padding:0;display:flex;flex-direction:column;gap:0;">
                    <li
                      v-for="movie in filteredMovies"
                      :key="movie.id"
                      @mousedown.prevent="selectMovie(movie)"
                      style="display:flex;align-items:center;gap:12px;padding:6px 10px;cursor:pointer;transition:background 0.18s;"
                      @mouseenter="hoveredMovie = movie.id"
                      @mouseleave="hoveredMovie = null"
                      :style="{ background: hoveredMovie === movie.id ? 'rgba(229,9,20,0.07)' : 'transparent' }"
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
                  </ul>
                </div>
              </div>
            </div>
            <!-- Favorites Heart Icon -->
            <div class="favorites-wrapper" ref="dropdownRef">
              <button
                class="heart-icon"
                aria-label="Favorites"
                @click="toggleFav"
                :aria-pressed="favOpen"
                @keydown.esc="favOpen = false"
                style="background:none;border:none;padding:0;margin:0;cursor:pointer"
                type="button"
              >
                <i :class="['fa-heart', favorites.length ? 'fa-solid' : 'fa-regular']"></i>
                <transition name="bounce">
                  <span v-if="favorites.length" class="favorites-count">{{ favorites.length }}</span>
                </transition>
              </button>
              <transition name="fav-fade">
                <div
                  class="favorites-dropdown"
                  :class="{ active: favOpen }"
                  v-if="favOpen"
                  tabindex="-1"
                  aria-label="Favorites dropdown"
                  @keydown.esc="favOpen = false"
                >
                  <h4 class="fav-title flex items-center gap-2">
                    <i class="fa-solid fa-heart" style="color:#e50914;"></i>
                    <span>Favorites</span>
                    <span class="fav-count">{{ favorites.length }}</span>
                  </h4>
                  <div v-if="favorites.length === 0" class="favorites-empty flex flex-col items-center py-10 text-white/60 animate-fav-pop">
                    <i class="fa-regular fa-face-smile-beam text-5xl text-red-500 mb-3 animate-fav-pop"></i>
                    <div class="font-semibold text-base">No favorites yet</div>
                    <div class="text-xs mt-1">Add movies to your favorites!</div>
                  </div>
                  <div v-else class="fav-list max-h-[56vh] overflow-y-auto custom-scroll py-2">
                    <transition-group name="fav-list" tag="div">
                      <div
                        v-for="movie in favorites"
                        :key="movie.id"
                        class="favorite-item flex items-center gap-4 px-5 py-3 rounded-xl hover:bg-white/10 transition group animate-fav-pop"
                      >
                        <img
                          :src="movie.img"
                          :alt="movie.title"
                          class="w-12 h-16 object-cover rounded-lg shadow-md border border-white/10 group-hover:scale-105 transition"
                        />
                        <div class="flex-1 min-w-0">
                          <div class="flex items-center gap-2">
                            <span class="text-white font-semibold truncate block max-w-40">{{ movie.title }}</span>
                            <span class="text-white/40 text-xs font-mono">{{ movie.year || '2024' }}</span>
                          </div>
                        </div>
                        <div class="flex flex-col gap-1">
                          <button @click="handleWatch(movie)" class="fav-btn-watch px-3 py-1 bg-red-600 hover:bg-red-700 text-xs rounded-lg font-semibold text-white shadow transition" type="button">Watch</button>
                          <button @click="removeFromFavorites(movie.id)" class="fav-btn-delete px-3 py-1 bg-white/10 hover:bg-red-900/60 text-xs rounded-lg font-semibold text-red-400 shadow transition" type="button">Delete</button>
                        </div>
                      </div>
                    </transition-group>
                  </div>
                </div>
              </transition>
            </div>
            <!-- Profile -->
            <div class="profile-container" style="margin-left:18px;">
              <img
                src="/img/avatar.png"
                alt="profile"
                @click="enlargeAvatar"
                :class="
                  'rounded-full object-cover border-2 border-white cursor-pointer transition-transform duration-300',
                  avatarScaled ? 'ring-4 ring-red-600 scale-110' : ''
                "
                style="width:48px;height:48px;"
              />
            </div>
          </div>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, nextTick, computed, onBeforeUnmount, watch } from 'vue'
import ModalLogin from './ModalLogin.vue'
import { movies as localMovies } from '../data/movies.js'

// --- FAVORITES CONTEXT ---
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

// ================= SEARCH =================
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
  searchOpen.value = false
  // searchValue.value = '' // optionally clear
  // movieAPI.value = []
}

function onSearchInput() {
  emit('update:search', searchValue.value)
  searchOpen.value = true
}

function onSearchFocus(e) {
  e.target.style.borderColor = '#fff';
  setTimeout(() => {
    if (document.activeElement !== e.target) {
      e.target.style.borderColor = '#e50914';
    }
  }, 300);
}

// ================= FAVORITES DROPDOWN =================
const favOpen = ref(false)
const dropdownRef = ref(null)

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

// ================= API SEARCH =================
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
  closeSearch()
}

// ================= AVATAR =================
const avatarScaled = ref(false)
function enlargeAvatar() {
  avatarScaled.value = !avatarScaled.value
  favOpen.value = false
  searchOpen.value = false
}

// ================= LOGIN =================
function openLogin() {
  showModal.value = true
}

function handleLoginSuccess() {
  emit('update:isLoggedIn', true)
  showModal.value = false
}

// ================= ADAPTIVE SEARCH INPUT =================
const searchInputStyle = computed(() => {
  // Responsive width and font for search input
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

<style scoped>
/* --- FAVORITES DROPDOWN BEAUTY --- */
.glass-fav {
  background: linear-gradient(120deg, rgba(24,24,28,0.98) 70%, rgba(229,9,20,0.10) 100%);
  backdrop-filter: blur(18px) saturate(1.1);
  box-shadow: 0 12px 48px 0 #e5091440, 0 2px 8px #fff2;
  border-radius: 18px;
  border: 1.5px solid #e50914;
  animation: fav-pop 0.45s cubic-bezier(.4,0,.2,1); /* вернули pop анимацию */
}
@keyframes fav-pop {
  0% { opacity: 0; transform: translateY(24px) scale(0.93);}
  60% { opacity: 1; transform: translateY(-4px) scale(1.04);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
.fav-header {
  border-radius: 18px 18px 0 0;
  box-shadow: 0 2px 12px #e5091420;
}
.fav-list {
  padding-bottom: 8px;
}
.fav-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s, box-shadow 0.18s;
}
.fav-item:last-child {
  border-bottom: none;
}
.fav-btn-watch {
  background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px #e5091440;
}
.fav-btn-watch:hover {
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
}
.fav-btn-delete {
  background: rgba(255,255,255,0.08);
  color: #ff6b6b;
  border: 1.5px solid #ff6b6b33;
  box-shadow: 0 2px 8px #ff6b6b22;
}
.fav-btn-delete:hover {
  background: rgba(255, 107, 107, 0.18);
  color: #fff;
  border-color: #ff6b6b;
}
@media (max-width: 600px) {
  .glass-fav {
    width: min(98vw, 340px) !important;
    max-width: 98vw !important;
    border-radius: 14px;
  }
  .fav-header {
    padding: 14px 10px;
    font-size: 1rem;
  }
  .fav-item {
    gap: 8px;
    padding: 8px 4px;
  }
  .fav-item img {
    width: 36px !important;
    height: 48px !important;
  }
  .fav-btn-watch, .fav-btn-delete {
    font-size: 10px !important;
    padding: 2px 7px !important;
    border-radius: 7px !important;
  }
}
/* --- FAVORITES DROPDOWN BEAUTY --- */
.glass-fav {
  background: linear-gradient(120deg, rgba(24,24,28,0.98) 70%, rgba(229,9,20,0.10) 100%);
  backdrop-filter: blur(18px) saturate(1.1);
  box-shadow: 0 12px 48px 0 #e5091440, 0 2px 8px #fff2;
  border-radius: 18px;
  border: 1.5px solid #e50914;
  animation: fav-pop 0.45s cubic-bezier(.4,0,.2,1); /* вернули pop анимацию */
}
@keyframes fav-pop {
  0% { opacity: 0; transform: translateY(24px) scale(0.93);}
  60% { opacity: 1; transform: translateY(-4px) scale(1.04);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
.fav-header {
  border-radius: 18px 18px 0 0;
  box-shadow: 0 2px 12px #e5091420;
}
.fav-list {
  padding-bottom: 8px;
}
.fav-item {
  border-bottom: 1px solid rgba(255,255,255,0.06);
  transition: background 0.18s, box-shadow 0.18s;
}
.fav-item:last-child {
  border-bottom: none;
}
.fav-btn-watch {
  background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 2px 8px #e5091440;
}
.fav-btn-watch:hover {
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
}
.fav-btn-delete {
  background: rgba(255,255,255,0.08);
  color: #ff6b6b;
  border: 1.5px solid #ff6b6b33;
  box-shadow: 0 2px 8px #ff6b6b22;
}
.fav-btn-delete:hover {
  background: rgba(255, 107, 107, 0.18);
  color: #fff;
  border-color: #ff6b6b;
}
@media (max-width: 600px) {
  .glass-fav {
    width: min(98vw, 340px) !important;
    max-width: 98vw !important;
    border-radius: 14px;
  }
  .fav-header {
    padding: 14px 10px;
    font-size: 1rem;
  }
  .fav-item {
    gap: 8px;
    padding: 8px 4px;
  }
  .fav-item img {
    width: 36px !important;
    height: 48px !important;
  }
  .fav-btn-watch, .fav-btn-delete {
    font-size: 10px !important;
    padding: 2px 7px !important;
    border-radius: 7px !important;
  }
}

/* Анимация появления/исчезновения favorites-dropdown */
/* УБРАТЬ transform для fav-fade */
.fav-fade-enter-active, .fav-fade-leave-active {
  transition: opacity 0.38s cubic-bezier(.4,0,.2,1);
}
.fav-fade-enter-from, .fav-fade-leave-to {
  opacity: 0;
  /* transform: scale(0.93) translateY(24px); */
}
.fav-fade-enter-to, .fav-fade-leave-from {
  opacity: 1;
  /* transform: scale(1) translateY(0); */
}

/* Bounce для badge */
.bounce-enter-active, .bounce-leave-active {
  transition: transform 0.38s cubic-bezier(.4,0,.2,1), opacity 0.38s cubic-bezier(.4,0,.2,1);
}
.bounce-enter-from, .bounce-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.bounce-enter-to, .bounce-leave-from {
  opacity: 1;
  transform: scale(1);
}

/* Анимация для списка избранного */
.fav-list-enter-active, .fav-list-leave-active {
  transition: all 0.38s cubic-bezier(.4,0,.2,1);
}
.fav-list-enter-from, .fav-list-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}
.fav-list-enter-to, .fav-list-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Поп для иконки и пустого состояния */
@keyframes fav-pop {
  0% { opacity: 0; transform: scale(0.85) translateY(18px);}
  60% { opacity: 1; transform: scale(1.08) translateY(-4px);}
  100% { opacity: 1; transform: scale(1) translateY(0);}
}
.animate-fav-pop {
  animation: fav-pop 0.55s cubic-bezier(.4,0,.2,1);
}

/* Заголовок и счетчик */
.fav-title {
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  letter-spacing: 0.04em;
  padding: 16px 20px 12px 20px;
  background: linear-gradient(90deg, #e5091420 0%, #fff0 100%);
  border-bottom: 2px solid #e50914;
  display: flex;
  align-items: center;
  gap: 10px;
}
.fav-count {
  background: #e50914;
  color: #fff;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  padding: 2px 10px;
  margin-left: 8px;
  box-shadow: 0 2px 8px #e5091440;
  letter-spacing: 0.02em;
}
</style>