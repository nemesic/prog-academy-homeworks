<template>
  <div class="admin-page min-h-screen pt-20 pb-16 px-4 text-white">
    <transition name="toast-fade-slide">
      <div
        v-if="toast"
        class="success-box price-toast"
        role="status"
        aria-live="polite"
        style="top: 32px; left: 50%; transform: translateX(-50%); position: fixed; z-index: 99999;"
      >
        <span class="checkmark">✔</span>
        <span>{{ toast }}</span>
      </div>
    </transition>

    <div class="admin-header mx-auto max-w-3xl bg-white/5 border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-12 shadow-2xl animate-fade-in">
      <h1 class="text-5xl md:text-6xl font-black tracking-wide leading-none mb-6">
        Admin Panel
      </h1>
      <p class="text-lg text-white/70">
        Manage and add new movies to your collection
      </p>
    </div>

    <div class="admin-tabs-mobile flex items-center justify-center mb-8 max-w-xs mx-auto md:hidden">
      <button
        v-for="t in tabs"
        :key="t.id"
        @click="activeTab = t.id"
        :class="[
          'admin-tab-mobile flex-1 py-3 text-base font-semibold border transition-all duration-200',
          activeTab === t.id
            ? 'bg-red-600 text-white border-red-600 shadow'
            : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
        ]"
        :aria-label="t.label"
        style="min-width: 0"
      >
        <span v-if="t.id === 'list'">{{ t.label }} ({{ movies.length }})</span>
        <span v-else>{{ t.label }}</span>
      </button>
    </div>

    <div class="admin-container max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
      <transition name="fade-slide">
        <div 
          v-if="activeTab === 'form' || isDesktop"
          class="admin-form-section bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 transition-all animate-fade-in"
          :class="{ 'block': activeTab === 'form', 'hidden md:block': activeTab !== 'form' }"
        >
          <h2 class="text-2xl font-bold text-center mb-8 text-white">Add New Movie</h2>
          <CreateMovie @add-movie="addMovie" />
        </div>
      </transition>
      <transition name="fade-slide">
        <div 
          v-if="activeTab === 'list' || isDesktop"
          class="admin-movies-section bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 transition-all overflow-hidden animate-fade-in"
          :class="{ 'block': activeTab === 'list', 'hidden md:block': activeTab !== 'list' }"
        >
          <h2
            class="available-movies-title text-2xl font-bold text-center mb-8 text-white"
          >
            Available Movies ({{ movies.length }})
          </h2>
          <ul class="admin-movies-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            <li v-if="!movies.length" class="col-span-full text-center py-16 text-white/60 text-lg animate-fade-in">
              No movies yet. Add your first movie!
            </li>
            <li
              v-for="movie in movies"
              :key="movie.id"
              class="admin-movie-item group cursor-pointer flex flex-col items-center animate-pop-in"
              tabindex="0"
            >
              <div class="admin-movie-img-wrapper relative w-full aspect-2/3 rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-hover:scale-[1.03]">
                <img 
                  :src="movie.img" 
                  :alt="movie.title" 
                  class="admin-movie-img w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 block"
                  draggable="false"
                />
                <button
                  @click.stop="confirmDelete(movie.id)"
                  class="admin-delete-btn absolute top-2 right-2 bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white rounded-md p-2 transition-all shadow focus:outline-none opacity-0 group-hover:opacity-100 focus:opacity-100"
                  title="Delete movie"
                  type="button"
                  tabindex="0"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
              <p class="mt-2 text-center text-xs sm:text-sm font-medium line-clamp-2 px-1 break-word w-full transition-colors duration-200 group-hover:text-red-400">
                {{ movie.title }}
              </p>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import CreateMovie from '../components/CreateMovie.vue'
import { movies as initialMovies } from '../data/movies.js'

const movies = ref([...initialMovies])
const activeTab = ref('form')
const toast = ref('')
let toastTimeout = null

const tabs = [
  { id: 'form', label: '➕ Add Movie' },
  { id: 'list', label: '📽️ Movies' }
]

const isDesktop = ref(false)
function updateIsDesktop() {
  isDesktop.value = typeof window !== 'undefined' && window.innerWidth >= 768
}
onMounted(() => {
  updateIsDesktop()
  window.addEventListener('resize', updateIsDesktop)
})
onUnmounted(() => {
  window.removeEventListener('resize', updateIsDesktop)
})

function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value = ''
  }, 2200)
}

function addMovie(newMovie) {
  movies.value.push(newMovie)
  activeTab.value = 'list'
  showToast('Movie added!')
}

function confirmDelete(id) {
  const movie = movies.value.find(m => m.id === id)
  if (!movie) return
  if (window.confirm(`Delete "${movie.title}"? This cannot be undone.`)) {
    movies.value = movies.value.filter(m => m.id !== id)
    showToast('Movie deleted!')
  }
}
</script>
<style>@import '../assets/Admin.css'; </style>
<!-- <style>@import '../assets/style.css'; </style> -->