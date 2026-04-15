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
            <!-- Favorites Heart Icon (simple white heart, no blur, no circle, red on hover) -->
            <div class="favorites-menu" ref="dropdownRef">
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
            <!-- Profile -->
            <div class="profile-container" style="margin-left:18px;position:relative;width:54px;height:54px;">
            <img
            src="/img/avatar.png"
            alt="profile"
            @click="enlargeAvatar"
            :class="['avatar-img', avatarScaled ? 'avatar-glow-ring' : '']"
            style="width:54px;height:54px;z-index:2;position:relative;cursor:pointer;"
          />
        <transition name="avatar-ring-fade">
        <span
        v-if="avatarScaled"
        class="avatar-animated-ring"
        ></span>
          </transition>
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


// ================= FAVORITES DROPDOWN =================
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
  avatarScaled.value = true
  favOpen.value = false
  searchOpen.value = false
  setTimeout(() => {
    avatarScaled.value = false
  }, 300)
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

/* Анімація glow при наведенні */

.profile-container img {
  border-radius: 50%;
  transition: box-shadow 0.3s, transform 0.3s;
}
.profile-container img:hover {
  box-shadow: 0 0 24px 0 #e50914cc;
  transform: scale(1.08);
}

/* Пульсація при кліку */
 .avatar-glow-ring {
  animation: avatar-pulse 0.3s;
  box-shadow: 0 0 0 8px #e5091440, 0 0 32px 0 #e50914cc;
}
@keyframes avatar-pulse {
  0% {
    box-shadow: 0 0 0 0 #e5091440, 0 0 0 0 #e50914cc;
    transform: scale(1);
  }
  60% {
    box-shadow: 0 0 0 14px #e5091420, 0 0 32px 0 #e50914cc;
    transform: scale(1.13);
  }
  100% {
    box-shadow: 0 0 0 0 #e5091440, 0 0 0 0 #e50914cc;
    transform: scale(1);
  }
}

/* Анімоване кільце */
.avatar-animated-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 3px solid #e50914;
  box-shadow: 0 0 24px #e50914cc;
  transform: translate(-50%, -50%) scale(1);
  animation: ring-pop 0.45s;
  pointer-events: none;
  z-index: 1;
}
@keyframes ring-pop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.7);
  }
  60% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.13);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1.18);
  }
}

/* --- FAVORITES HEART ICON --- */
.favorites-heart-btn {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;  
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.favorites-heart-icon {
  color: #fff;
  font-size: 28px;
  transition: color 0.18s;
}
.favorites-heart-icon.favorites-heart-hover {
  color: #e50914 !important;
}
.favorites-heart-btn:hover .favorites-heart-icon {
  color: #e50914 !important;
}

/* --- SEARCH ICON --- */
.search-icon {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
.search-icon i {
  color: #fff;
  font-size: 28px;
  transition: color 0.18s;
}
.search-icon:hover i {
  color: #e50914;
}

/* --- SEARCH INPUT --- */
.header-search.active {
  width: 180px !important;
  height: 44px !important;
  font-size: 16px !important;
  padding: 0 16px 0 38px !important;
  border-radius: 8px !important;
  border: 2px solid #e50914 !important;
  background: rgba(24,24,28,0.98) !important;
  color: #fff !important;
  box-shadow: 0 4px 24px 0 #e5091420, 0 2px 8px #fff2 !important;
  outline: none !important;
  transition: border-color 0.22s, box-shadow 0.22s, width 0.22s, font-size 0.22s, padding 0.22s !important;
  /* --- SEARCH BUTTON ANIMATION --- */
  .search-btn-anim {
    background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
    border-radius: 50%;
    box-shadow: 0 2px 8px #e5091440;
    transition: background 0.22s, transform 0.22s, box-shadow 0.22s;
    border: none;
    outline: none;
  }
  .search-btn-anim:hover:not(:disabled), .search-btn-anim:focus-visible:not(:disabled) {
    background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
    transform: scale(1.08) translateY(-2px);
    box-shadow: 0 0 0 4px rgba(229,9,20,0.18), 0 8px 24px #e5091440;
  }
  .search-btn-anim:active:not(:disabled) {
    background: #e50914;
    transform: scale(0.96);
  }
  .search-btn-anim:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  position: relative !important;
  left: 0;
  top: 0;
  z-index: 2;
  margin-left: 0;
}
@media (max-width: 600px) {
  .header-search.active {
    width: 100px !important;
    height: 36px !important;
    font-size: 13px !important;
    padding: 0 10px 0 38px !important;
    border-radius: 6px !important;
  }
}
@media (max-width: 900px) {
  .header-search.active {
    width: 140px !important;
    height: 40px !important;
    font-size: 15px !important;
    padding: 0 14px 0 38px !important;
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
/* Netflix-like pulse animation for heart */
@keyframes pulse-heart {
  0% { transform: scale(1); filter: drop-shadow(0 0 0 #e50914); }
  50% { transform: scale(1.18); filter: drop-shadow(0 0 12px #e50914); }
  100% { transform: scale(1); filter: drop-shadow(0 0 0 #e50914); }
}
.animate-pulse-heart {
  animation: pulse-heart 0.5s;
}

.favorites-menu {
  position: relative;
  isolation: isolate;
  z-index: 60;
}

.favorites-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.14);
  background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
  box-shadow: 0 12px 28px rgba(0,0,0,0.24);
  transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
  position: relative;
  overflow: hidden;
}
.favorites-trigger:hover {
  transform: translateY(-1px) scale(1.05);
  border-color: rgba(229,9,20,0.4);
  box-shadow: 0 0 0 4px rgba(229,9,20,0.12), 0 16px 30px rgba(0,0,0,0.3);
}
.favorites-heart {
  font-size: 22px;
  color: inherit !important;
  filter: drop-shadow(0 0 10px rgba(229,9,20,0.18));
  transition: color 0.18s, filter 0.18s, transform 0.18s;
}

.favorites-badge {
  position: absolute;
  top: -7px;
  right: -7px;
  min-width: 20px;
  background: #e50914;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  border-radius: 999px;
  padding: 2px 6px;
  text-align: center;
  box-shadow: 0 4px 14px rgba(229,9,20,0.35);
  animation: badge-bounce 0.5s;
}
@keyframes badge-bounce {
  0% { transform: scale(0.7);}
  60% { transform: scale(1.18);}
  80% { transform: scale(0.95);}
  100% { transform: scale(1);}
}

.favorites-panel {
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 100;
  margin-top: 12px;
  width: min(25rem, calc(100vw - 1rem));
  max-width: min(25rem, calc(100vw - 1rem));
  overflow: hidden;
  border-radius: 1.4rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(180deg, rgba(17,17,18,0.97), rgba(7,7,8,0.95));
  box-shadow: 0 30px 72px rgba(0,0,0,0.54), 0 10px 30px rgba(229,9,20,0.09);
  backdrop-filter: blur(24px);
  transform-origin: top right;
}

.favorites-panel-accent {
  height: 1px;
  background: linear-gradient(90deg, rgba(229,9,20,0), rgba(229,9,20,0.85), rgba(229,9,20,0));
}

.favorites-panel-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  background: linear-gradient(90deg, rgba(229,9,20,0.12), rgba(255,255,255,0.02));
}
.favorites-title {
  font-size: 0.95rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: #fff;
}
.favorites-count {
  background: #e50914;
  color: #fff;
  font-size: 11px;
  font-weight: bold;
  border-radius: 999px;
  padding: 2px 8px;
}

.favorites-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 1.5rem;
  text-align: center;
  color: #fff;
  opacity: 0.7;
}
.favorites-empty i {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
  color: #e50914;
}
.empty-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
}
.empty-desc {
  margin-top: 0.25rem;
  font-size: 0.85rem;
  color: #fff;
  opacity: 0.5;
}

.favorites-list-wrapper {
  max-height: 62vh;
  overflow-y: auto;
  padding: 0.5rem 0;
}
.favorites-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0 0.75rem;
}
.favorites-item {
  display: grid;
  grid-template-columns: 44px minmax(0,1fr) 102px;
  align-items: start;
  gap: 0.75rem;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  animation: favoritesCardIn 0.34s cubic-bezier(.2,.8,.2,1) both;
  animation-delay: calc(var(--i, 1) * 38ms);
  transition: background 0.18s, box-shadow 0.18s, border-color 0.18s;
}
.favorites-item:hover {
  background: rgba(255,255,255,0.06);
  border-color: rgba(229,9,20,0.18);
  box-shadow: 0 14px 28px rgba(229,9,20,0.08);
  transform: translateY(-2px);
}
.favorites-item-img {
  height: 64px;
  width: 44px;
  border-radius: 0.75rem;
  object-fit: cover;
  box-shadow: 0 2px 8px #0004;
}
.favorites-item-info {
  min-width: 0;
  padding-top: 0.15rem;
}
.favorites-item-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.1rem;
  white-space: normal;
  overflow: visible;
  text-overflow: initial;
}
.favorites-item-year {
  margin-top: 0.2rem;
  font-size: 0.82rem;
  font-family: monospace;
  color: #fff;
  opacity: 0.45;
}
.favorites-item-actions {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 102px;
  align-self: center;
}
.favorites-watch-btn {
  background: linear-gradient(90deg, #e50914 0%, #c80a13 100%);
  color: #fff;
  border-radius: 0.75rem;
  font-size: 0.92rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  box-shadow: 0 10px 20px rgba(229,9,20,0.18);
  transition: background 0.18s;
}
.favorites-watch-btn:hover {
  background: linear-gradient(90deg, #ff3838 0%, #e50914 100%);
}
.favorites-delete-btn {
  border: 1px solid rgba(255,107,107,0.24);
  background: rgba(255,255,255,0.05);
  color: #ff9f9f;
  border-radius: 0.75rem;
  font-size: 0.92rem;
  font-weight: 600;
  padding: 0.5rem 0.75rem;
  transition: background 0.18s, color 0.18s, border-color 0.18s;
}
.favorites-delete-btn:hover {
  background: rgba(255,107,107,0.18);
  color: #fff;
  border-color: rgba(255,107,107,0.5);
}

@keyframes favoritesCardIn {
  from { opacity: 0; transform: translateY(14px) scale(0.98);}
  to { opacity: 1; transform: translateY(0) scale(1);}
}

@media (max-width: 420px) {
  .favorites-item {
    grid-template-columns: 44px minmax(0, 1fr);
  }
  .favorites-item-actions {
    grid-column: 2;
    width: 100%;
    max-width: 132px;
    margin-top: 6px;
  }
}
</style>