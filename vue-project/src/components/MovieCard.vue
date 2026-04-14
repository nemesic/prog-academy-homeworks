<template>
  <div 
    class="movie-card group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg transition-all duration-200 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-red-600"
    @click="selectMovie"
    tabindex="0"
    aria-label="Movie card"
  >
    <img
      :src="img"
      :alt="title"
      class="movie-card-img w-full h-62.5 object-cover transition-transform duration-300 group-hover:scale-105"
      draggable="false"
    />
    <!-- Favorite Icon -->
    <button
      @click.stop="handleFavoriteClick"
      :aria-label="fav ? 'Remove from favorites' : 'Add to favorites'"
      :aria-pressed="fav"
      tabindex="0"
      class="movie-fav-icon absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/50 hover:bg-red-600/90 backdrop-blur-sm rounded-full text-2xl transition-all duration-200 hover:scale-110 z-10"
    >
      <i :class="fav ? 'fa-solid fa-heart' : 'fa-regular fa-heart'" class="text-white"></i>
    </button>
  </div>
</template>

<script setup>
// filepath: d:\work\TailwindCSS\vue-project\src\components\MovieCard.vue
import { inject, computed } from 'vue'

const props = defineProps({
  img: String,
  title: String,
  movie: Object,
  onSelect: Function
})

const favoritesContext = inject('favoritesContext')
const addToFavorites = favoritesContext?.addToFavorites
const removeFromFavorites = favoritesContext?.removeFromFavorites
const isFavorite = favoritesContext?.isFavorite

const fav = computed(() => isFavorite && props.movie?.id ? isFavorite(props.movie.id) : false)

function handleFavoriteClick() {
  if (!favoritesContext) return
  if (fav.value) {
    removeFromFavorites(props.movie.id)
  } else {
    addToFavorites(props.movie)
  }
}

function selectMovie() {
  if (props.onSelect) props.onSelect(props.movie)
}
</script>