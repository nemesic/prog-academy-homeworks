<template>
  <div>
    <Feature
      :title="activeMovie.title"
      :description="activeMovie.description"
      :genres="activeMovie.genres"
      :year="activeMovie.year"
      :director="activeMovie.director"
      :seasons="activeMovie.seasons"
      :episodes="activeMovie.episodes"
      :initialRating="activeMovie.rating"
    />

    <Popular
      :movies="allMovies"
      :setApiMovies="setApiMovies"
      :search="search"
      :onSelectMovie="handleSelectMovie"
      :isLoggedIn="isLoggedIn"
    />

    <div
      v-if="!movies.length && !apiMovies.length"
      class="text-center py-12 text-red-500 text-xl"
    >
      No movies found.
    </div>

    <RatingBox />
    <ApiPost />
    <InputDemo />
  </div>
</template>

<script setup>
import ApiPost from '../components/ApiPost.vue'
import { ref, computed, nextTick } from 'vue'

import Feature from '../components/Feature.vue'
import Popular from '../components/Popular.vue'
import RatingBox from '../components/RatingBox.vue'
import InputDemo from '../components/InputDemo.vue'


const props = defineProps({
  search: String,
  isLoggedIn: Boolean
})

const movies = ref([])
const apiMovies = ref([])
const selectedMovie = ref(null)

const defaultMovie = {
  title: 'Stranger Things',
  description:
    'In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries.',
  genres: ['Drama', 'Thriller', 'Supernatural'],
  year: 2019,
  director: 'Shawn Levy',
  seasons: 3,
  episodes: [
    { id: 1, title: 'Episode 1' },
    { id: 2, title: 'Episode 2' },
    { id: 3, title: 'Episode 3' },
    { id: 4, title: 'Episode 4' }
  ],
  rating: 5
}

const activeMovie = computed(() =>
  selectedMovie.value || defaultMovie
)

const allMovies = computed(() => [
  ...movies.value,
  ...apiMovies.value
])

function setApiMovies(fn) {
  apiMovies.value = fn(apiMovies.value)
}

function handleSelectMovie(movie) {
  selectedMovie.value = movie

  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
</script>