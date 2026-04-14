<template>
  <section class="popular-section py-12" v-if="isLoggedIn">
    <div class="content-wrapper mx-auto px-4 md:px-10 max-w-275">
      
      <!-- Header -->
      <div class="popular-header flex items-center justify-between mb-6">
        <h4 class="text-white uppercase text-2xl font-black tracking-[3px]">
          POPULAR THIS WEEK
        </h4>
        
        <div class="navigation-arrows flex gap-4">
          <button 
            @click="scrollLeft"
            class="arrow-left w-14 h-14 flex items-center justify-center bg-black/40 border-2 border-white/80 hover:border-red-600 hover:bg-red-600/80 rounded-full backdrop-blur-md transition-all active:scale-95"
            aria-label="Previous movies"
          >
            <i class="fa-solid fa-chevron-left text-2xl text-white"></i>
          </button>
          <button 
            @click="scrollRight"
            class="arrow-right w-14 h-14 flex items-center justify-center bg-black/40 border-2 border-white/80 hover:border-red-600 hover:bg-red-600/80 rounded-full backdrop-blur-md transition-all active:scale-95"
            aria-label="Next movies"
          >
            <i class="fa-solid fa-chevron-right text-2xl text-white"></i>
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="initialLoading" class="py-20 text-center">
        <div class="inline-block w-8 h-8 border-4 border-white/30 border-t-red-600 rounded-full animate-spin"></div>
        <p class="text-white text-lg mt-4">Loading popular movies...</p>
      </div>

      <!-- Swiper -->
      <Swiper
        v-else
        class="shows-row"
        :modules="[Navigation, Autoplay]"
        @swiper="setSwiperInstance"
        :spaceBetween="16"
        :slidesPerView="2.1"
        :navigation="false"
        :autoplay="{ delay: 3300, disableOnInteraction: false }"
        :breakpoints="breakpoints"
        aria-label="Popular movies slider"
      >
        <SwiperSlide v-for="movie in filteredMovies" :key="movie.id">
          <MovieCard
            :img="movie.img"
            :title="movie.title"
            :movie="movie"
            :onSelect="onSelectMovie"
          />
        </SwiperSlide>
      </Swiper>

      <!-- No movies -->
      <div v-if="!filteredMovies.length && !initialLoading" 
           class="text-center py-12 text-red-500 text-xl">
        No movies found.
      </div>

      <!-- Load More -->
      <div class="flex justify-center mt-10">
        <button 
          @click="loadMore" 
          :disabled="loading"
          class="load-more-btn px-10 py-4 bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-70 font-bold text-white rounded-2xl text-lg shadow-lg shadow-red-600/40 transition-all active:scale-95 flex items-center gap-3"
        >
          <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
          {{ loading ? 'Loading...' : 'Load More' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import MovieCard from './MovieCard.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  search: { type: String, default: '' },
  movies: { type: Array, default: () => [] },
  setApiMovies: Function,
  onSelectMovie: Function,
})

const page = ref(1)
const loading = ref(false)
const initialLoading = ref(true)
const swiperInstance = ref(null)

const API_KEY = '9eee1c8a9ca4c5306eb86111905631a1'

const breakpoints = {
  320: { slidesPerView: 2 },
  480: { slidesPerView: 2.5 },
  640: { slidesPerView: 3.5 },
  860: { slidesPerView: 4.5 },
  1080: { slidesPerView: 5.5 },
  1300: { slidesPerView: 6.5 },
}

function setSwiperInstance(swiper) {
  swiperInstance.value = swiper
}

function scrollLeft() {
  swiperInstance.value?.slidePrev()
}

function scrollRight() {
  swiperInstance.value?.slideNext()
}

function loadMore() {
  page.value += 1
}

const filteredMovies = computed(() => {
  if (!props.search?.trim()) return props.movies
  const q = props.search.trim().toLowerCase()
  return props.movies.filter((movie) => {
    const title = movie.title.toLowerCase()
    return (
      title === q ||
      title.startsWith(q) ||
      title.split(/\s+/).some(word => word.startsWith(q))
    )
  })
})

async function fetchPopularMovies(newPage) {
  loading.value = true
  try {
    const [moviesRes, seriesRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${newPage}`),
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${newPage}`)
    ])
    
    const moviesData = await moviesRes.json()
    const seriesData = await seriesRes.json()

    const combined = [...(moviesData.results || []), ...(seriesData.results || [])]
    
    const formatted = combined.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      img: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/300x450',
      raw: item,
    }))

    props.setApiMovies((prev) => {
      const ids = new Set(prev.map(m => m.id))
      const newItems = formatted.filter(m => !ids.has(m.id))
      return [...prev, ...newItems]
    })
  } catch (error) {
    alert('Failed to load movies. Please try again later.')
  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

watch(page, (newPage) => {
  fetchPopularMovies(newPage)
}, { immediate: true })
</script>