<template>
  <Feature
    :title="selectedMovie?.title || 'Stranger Things'"
    :description="selectedMovie?.description || defaultDescription"
    :genres="selectedMovie?.genres || defaultGenres"
    :year="selectedMovie?.year || 2019"
    :director="selectedMovie?.director || 'Shawn Levy'"
    :seasons="selectedMovie?.seasons || 3"
    :episodes="selectedMovie?.episodes || defaultEpisodes"
    :initialRating="selectedMovie?.rating || 5"
  />
  <Popular
    :movies="[...movies, ...apiMovies]"
    :setApiMovies="setApiMovies"
    :search="search"
    :onSelectMovie="handleSelectMovie"
    :isLoggedIn="isLoggedIn"
  />
  <div v-if="!movies.length && !apiMovies.length" style="text-align:center;color:#e50914;margin:32px 0 0 0;font-size:1.2rem;">
    No movies found.
  </div>
  <RatingBox :rating="selectedMovie?.rating || 5" />
</template>

<script setup>
import Feature from '../components/Feature.vue'
import Popular from '../components/Popular.vue'
import RatingBox from '../components/RatingBox.vue'
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  search: String,
  isLoggedIn: Boolean
})

const movies = ref([])
const apiMovies = ref([])
const selectedMovie = ref(null)
const prevSelected = ref(null)
const moviesFromApi = ref([])

const defaultDescription = "In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries."
const defaultGenres = ['Drama', 'Thriller', 'Supernatural']
const defaultEpisodes = [
  { id: 1, title: 'Episode 1: The Beginning' },
  { id: 2, title: 'Episode 2: The Mystery' },
  { id: 3, title: 'Episode 3: The Upside Down' },
  { id: 4, title: 'Episode 4: The Rescue' }
]

function setApiMovies(fn) {
  apiMovies.value = fn(apiMovies.value)
}

function handleSelectMovie(movie) {
  prevSelected.value = selectedMovie.value
  selectedMovie.value = movie
  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

onMounted(async () => {
  // Можна підвантажити початкові фільми тут
  // const res = await fetch('https://your-api/movies')
  // moviesFromApi.value = await res.json()
})

function loadMore() {
  fetch('https://api.example.com/movies?page=2')
    .then(res => res.json())
    .then(newMovies => {
      movies.value = [...movies.value, ...newMovies]
    })
}
</script>
