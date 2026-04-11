<template>
  <section class="popular-section" v-if="isLoggedIn">
    <div class="content-wrapper">
      <div class="popular-header">
        <h4>POPULAR THIS WEEK</h4>
        <div class="navigation-arrows">
          <button class="arrow-left" @click="scrollLeft" aria-label="Previous movies">
            <i class="fa-solid fa-chevron-left"></i>
          </button>
          <button class="arrow-right" @click="scrollRight" aria-label="Next movies">
            <i class="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div v-if="initialLoading" style="text-align:center;padding:40px 0;">
        <span class="spinner"></span>
        <span style="color:#fff;font-size:18px;margin-left:10px;">Loading popular movies...</span>
      </div>
      <Swiper
        v-else
        class="shows-row"
        :modules="[Navigation, Autoplay]"
        @swiper="setSwiperInstance"
        :spaceBetween="14"
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
      <div v-if="!filteredMovies.length && !initialLoading" style="text-align:center;color:#e50914;margin:32px 0 0 0;font-size:1.2rem;">
        No movies found.
      </div>
      <div style="text-align:center;margin-top:20px">
        <button class="load-more-btn" @click="loadMore" :disabled="loading">
          <span v-if="loading" class="spinner"></span>
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
  if (!props.search.trim()) return props.movies
  return props.movies.filter((movie) =>
    movie.title.toLowerCase().includes(props.search.toLowerCase())
  )
})

async function fetchPopularMovies(newPage) {
  loading.value = true
  try {
    const [moviesRes, seriesRes] = await Promise.all([
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${newPage}`
      ),
      fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${newPage}`
      ),
    ])
    const moviesData = await moviesRes.json()
    const seriesData = await seriesRes.json()
    const moviesList = moviesData.results || []
    const seriesList = seriesData.results || []
    const combined = [...moviesList, ...seriesList]
    const formatted = combined.map((item) => ({
      id: item.id,
      title: item.title || item.name,
      img: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : 'https://via.placeholder.com/300x450',
      raw: item,
    }))
    props.setApiMovies((prev) => {
      const ids = new Set(prev.map((m) => m.id))
      const newItems = formatted.filter((m) => !ids.has(m.id))
      return [...prev, ...newItems]
    })
  } catch (error) {
    // Покращено: показати помилку користувачу
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