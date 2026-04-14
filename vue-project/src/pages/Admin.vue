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

    <div class="admin-header mx-auto max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-12 shadow-2xl animate-fade-in">
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
          class="admin-form-section bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 transition-all animate-fade-in"
          :class="{ 'block': activeTab === 'form', 'hidden md:block': activeTab !== 'form' }"
        >
          <h2 class="text-2xl font-bold text-center mb-8 text-white">Add New Movie</h2>
          <CreateMovie @add-movie="addMovie" />
        </div>
      </transition>
      <transition name="fade-slide">
        <div 
          v-if="activeTab === 'list' || isDesktop"
          class="admin-movies-section bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 transition-all overflow-hidden animate-fade-in"
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
              <div class="admin-movie-img-wrapper relative w-full aspect-2/3 rounded-xl overflow-hidden bg-black/40 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl group-hover:scale-[1.03]">
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

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.92); }
  80% { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(.4,0,.2,1);
}
.animate-pop-in {
  animation: pop-in 0.5s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-active, .toast-fade-slide-leave-active {
  transition: opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-from, .toast-fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(-24px);
}
.toast-fade-slide-enter-to, .toast-fade-slide-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.success-box.price-toast {
  min-width: 180px;
  max-width: 90vw;
  background: rgba(0,0,0,0.92);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(229,9,20,0.13);
  padding: 18px 32px 14px 32px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #e50914;
  opacity: 1;
  box-shadow: 0 8px 36px #e5091440;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
}
.success-box .checkmark {
  font-size: 24px;
  color: limegreen;
  margin-right: 8px;
  filter: drop-shadow(0 0 6px #34d39944);
}

.admin-delete-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.7);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.1rem;
  padding: 8px 10px;
  cursor: pointer;
  z-index: 2;
  opacity: 0;
  transition: background 0.22s, color 0.22s, opacity 0.22s, box-shadow 0.22s, transform 0.22s;
  box-shadow: 0 2px 8px #e5091440;
}
.admin-movie-item:hover .admin-delete-btn,
.admin-movie-item:focus-within .admin-delete-btn {
  opacity: 1;
  transform: scale(1.08);
}
.admin-delete-btn:hover,
.admin-delete-btn:focus {
  background: #e50914;
  color: #fff;
  box-shadow: 0 4px 16px #e5091440;
  transform: scale(1.12);
}
.admin-movie-img-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  width: 100%;
  aspect-ratio: 2 / 3;
  background: #0006;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  box-shadow: 0 2px 12px #0002;
  transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1);
}
.admin-movie-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  min-width: 0;
  min-height: 0;
  transition: transform 0.3s cubic-bezier(.4,0,.2,1);
}
.admin-movie-item {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.22s, transform 0.22s;
  min-width: 0;
}
.admin-movie-item:hover .admin-movie-img-wrapper img,
.admin-movie-item:focus-within .admin-movie-img-wrapper img {
  transform: scale(1.05);
  transition: transform 0.22s;
}

@media (max-width: 1023px) {
  .admin-header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .admin-header h1 {
    font-size: 2.1rem;
    margin-bottom: 1rem;
  }
  .admin-header p {
    font-size: 1rem;
  }
  .admin-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 100%;
  }
  .admin-form-section,
  .admin-movies-section {
    padding: 1.25rem;
    border-radius: 1rem;
  }
}

@media (max-width: 767px) {
  .admin-page {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .admin-header {
    padding: 1rem;
    margin-bottom: 1.25rem;
    border-radius: 1rem;
  }
  .admin-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
  }
  .admin-header p {
    font-size: 0.95rem;
  }
  .admin-tabs {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
    max-width: 100%;
  }
  .admin-tabs button {
    font-size: 0.95rem;
    padding: 0.7rem 0.2rem;
    border-radius: 0.8rem;
  }
  .admin-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: 100%;
  }
  .admin-form-section,
  .admin-movies-section {
    padding: 0.7rem;
    border-radius: 0.7rem;
  }
  .admin-movies-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .admin-movie-img-wrapper {
    border-radius: 0.7rem;
    aspect-ratio: 2 / 3;
  }
  .admin-movie-item p {
    font-size: 0.95rem;
    margin-top: 0.5rem;
    padding-left: 0;
    padding-right: 0;
  }
  .admin-delete-btn {
    top: 8px;
    right: 8px;
    font-size: 1rem;
    padding: 6px 8px;
    border-radius: 0.7rem;
  }
}

@media (max-width: 480px) {
  .admin-header {
    padding: 0.7rem;
    margin-bottom: 1rem;
  }
  .admin-header h1 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .admin-header p {
    font-size: 0.85rem;
  }
  .admin-form-section,
  .admin-movies-section {
    padding: 0.4rem;
    border-radius: 0.5rem;
  }
  .admin-movie-img-wrapper {
    border-radius: 0.5rem;
  }
  .admin-movie-item p {
    font-size: 0.85rem;
    margin-top: 0.35rem;
  }
  .admin-delete-btn {
    top: 4px;
    right: 4px;
    font-size: 0.95rem;
    padding: 4px 6px;
    border-radius: 0.5rem;
  }
}

.admin-tabs-mobile {
  display: flex;
  gap: 0;
  border-radius: 1.2rem;
  overflow: hidden;
  background: rgba(255,255,255,0.03);
  box-shadow: 0 2px 12px #0001;
  margin-bottom: 2rem;
}
.admin-tab-mobile {
  border: none;
  outline: none;
  border-right: 1px solid rgba(255,255,255,0.08);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  font-size: 1rem;
  padding: 0.85rem 0.5rem;
  min-width: 0;
  flex: 1 1 0%;
  text-align: center;
  user-select: none;
}
.admin-tab-mobile:last-child {
  border-right: none;
}
.admin-tab-mobile:active,
.admin-tab-mobile:focus-visible {
  box-shadow: 0 0 0 2px #e50914, 0 2px 8px #e5091440;
  z-index: 2;
}
@media (min-width: 768px) {
  .admin-tabs-mobile {
    display: none !important;
  }
}
@media (max-width: 640px) {
  .admin-tabs-mobile {
    max-width: 100%;
    margin-bottom: 1.2rem;
    border-radius: 0.8rem;
  }
  .admin-tab-mobile {
    font-size: 0.97rem;
    padding: 0.7rem 0.2rem;
    border-radius: 0;
  }
}

@media (max-width: 767px) {
  .admin-header {
    padding: 1rem !important;
    margin-bottom: 1.25rem !important;
    border-radius: 1rem !important;
  }
  .admin-header h1 {
    font-size: 1.5rem !important;
    margin-bottom: 0.7rem !important;
  }
  .admin-header p {
    font-size: 0.95rem !important;
  }
  .admin-container {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
    max-width: 100% !important;
  }
  .admin-form-section,
  .admin-movies-section {
    padding: 0.7rem !important;
    border-radius: 0.7rem !important;
    min-width: 0 !important;
    max-width: 100vw !important;
    box-sizing: border-box !important;
  }
  .admin-movies-grid {
    grid-template-columns: 1fr !important;
    gap: 1rem !important;
  }
  .admin-movie-img-wrapper {
    border-radius: 0.7rem !important;
    aspect-ratio: 2 / 3 !important;
  }
  .admin-movie-item p {
    font-size: 0.95rem !important;
    margin-top: 0.5rem !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .admin-delete-btn {
    top: 8px !important;
    right: 8px !important;
    font-size: 1rem !important;
    padding: 6px 8px !important;
    border-radius: 0.7rem !important;
  }
}

@media (max-width: 480px) {
  .admin-header {
    padding: 0.7rem !important;
    margin-bottom: 1rem !important;
  }
  .admin-header h1 {
    font-size: 1.1rem !important;
    margin-bottom: 0.5rem !important;
  }
  .admin-header p {
    font-size: 0.85rem !important;
  }
  .admin-form-section,
  .admin-movies-section {
    padding: 0.4rem !important;
    border-radius: 0.5rem !important;
  }
  .admin-movie-img-wrapper {
    border-radius: 0.5rem !important;
  }
  .admin-movie-item p {
    font-size: 0.85rem !important;
    margin-top: 0.35rem !important;
  }
  .admin-delete-btn {
    top: 4px !important;
    right: 4px !important;
    font-size: 0.95rem !important;
    padding: 4px 6px !important;
    border-radius: 0.5rem !important;
  }
}

@media (max-width: 767px) {
  .admin-delete-btn i.fa-trash {
    color: #e50914 !important;
    font-size: 2rem !important;
    transition: color 0.18s;
  }
  .admin-delete-btn:hover i.fa-trash,
  .admin-delete-btn:focus i.fa-trash {
    color: #fff !important;
  }
}

</style>