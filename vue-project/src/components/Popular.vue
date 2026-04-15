<template>
  <section class="popular-section py-12" v-if="isLoggedIn">
    <div class="content-wrapper mx-auto px-4 md:px-10 max-w-5xl">
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

      <div v-if="initialLoading" class="py-20 text-center">
        <div class="inline-block w-8 h-8 border-4 border-white/30 border-t-red-600 rounded-full animate-spin"></div>
        <p class="text-white text-lg mt-4">Loading popular movies...</p>
      </div>

      <div v-else class="popular-slider-wrapper flex flex-col items-center w-full">
        <div class="w-full" style="max-width:1055px;">
          <Swiper
            class="shows-row"
            :modules="[Navigation, Autoplay]"
            @swiper="setSwiperInstance"
            :spaceBetween="24"
            :breakpoints="breakpoints"
            :autoplay="{ delay: 3200, disableOnInteraction: false }"
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
        </div>
        <div class="flex justify-center mt-10 w-full">
          <button 
            @click="loadMore" 
            :disabled="loading"
            class="load-more-btn px-10 py-4 min-w-[180px] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-70 font-bold text-white rounded-2xl text-lg drop-shadow-lg shadow-red-600/40 transition-all active:scale-95 flex items-center gap-3 ring-2 ring-red-700/30 focus:outline-none focus:ring-4"
          >
            <span v-if="loading" class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            {{ loading ? 'Loading...' : 'Load More' }}
          </button>
        </div>
      </div>

      <div v-if="!filteredMovies.length && !initialLoading" 
           class="text-center py-12 text-red-500 text-xl">
        No movies found.
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import MovieCard from './MovieCard.vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
  
const props = defineProps({
  isLoggedIn: Boolean,
  search: String,
  movies: Array,
  setApiMovies: Function,
  onSelectMovie: Function
})

const API_KEY = '9eee1c8a9ca4c5306eb86111905631a1'

const page = ref(1)
const loading = ref(false)
const initialLoading = ref(true)
const swiper = ref(null)

const breakpoints = {
  320: { slidesPerView: 2 },
  480: { slidesPerView: 2.3 },
  640: { slidesPerView: 3.2 },
  860: { slidesPerView: 4.2 },
  1080: { slidesPerView: 5.2 },
  1300: { slidesPerView: 6.2 },
}

function setSwiperInstance(s) {
  swiper.value = s
}

function scrollLeft() {
  swiper.value?.slidePrev()
}

function scrollRight() {
  swiper.value?.slideNext()
}

function loadMore() {
  if (loading.value) return
  page.value++
}

function normalize(items) {
  return items.map(i => {
    let id = i.id
    // fallback: for some TMDB items, id may be missing or duplicated, try to make unique
    if (!id && i.title && i.name) {
      id = `${i.title}-${i.name}`
    } else if (!id && i.title) {
      id = i.title
    } else if (!id && i.name) {
      id = i.name
    }
    return {
      id,
      title: i.title || i.name,
      img: i.poster_path
        ? `https://image.tmdb.org/t/p/w500${i.poster_path}`
        : 'https://via.placeholder.com/300x450',
      raw: i
    }
  })
}

async function fetchPopular(pageNum) {
  if (loading.value) return

  loading.value = true

  try {
    const [moviesRes, tvRes] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNum}`),
      fetch(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=${pageNum}`)
    ])

    const moviesData = await moviesRes.json()
    const tvData = await tvRes.json()

    const combined = [
      ...normalize(moviesData.results || []),
      ...normalize(tvData.results || [])
    ]

    // IMPORTANT: dedupe by id
    props.setApiMovies(prev => {
      const map = new Map(prev.map(m => [m.id, m]))
      combined.forEach(m => map.set(m.id, m))
      return [...map.values()]
    })

  } finally {
    loading.value = false
    initialLoading.value = false
  }
}

watch(page, (p) => fetchPopular(p), { immediate: true })

const filteredMovies = computed(() => {
  const list = props.movies || []

  if (!props.search?.trim()) return list

  const q = props.search.toLowerCase()

  return list.filter(m =>
    (m.title || '').toLowerCase().includes(q)
  )
})
</script>