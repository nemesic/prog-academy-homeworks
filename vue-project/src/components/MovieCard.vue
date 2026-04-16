
<template>
  <div class="moviecard" :style="cardStyle" @click="selectMovie">
    <div class="moviecard-img-wrap">
      <img :src="img" :alt="title" class="moviecard-img" @error="onImgError">
      <button class="moviecard-fav" :class="{ active: fav }" @click.stop="toggleFavorite">
        <svg viewBox="0 0 24 24" width="22" height="22"><path :fill="fav ? '#e50914' : '#fff'" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
    </div>
    <div class="moviecard-bottom">
      <span class="moviecard-title">{{ title }}</span>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, ref } from 'vue'

const props = defineProps({
  img: String,
  title: String,
  movie: Object,
  onSelect: Function
})

const fallbackImg = ref('/img/placeholder.png')
function onImgError(e) {
  e.target.src = fallbackImg.value
}

const favoritesContext = inject('favoritesContext')
const fav = computed(() => favoritesContext?.favorites?.value?.some(m => m.id === props.movie?.id) ?? false)

function toggleFavorite() {
  if (!favoritesContext || !props.movie?.id) return
  if (fav.value) {
    favoritesContext.removeFromFavorites(props.movie.id)
  } else {
    favoritesContext.addToFavorites(props.movie)
  }
}

function selectMovie() {
  props.onSelect?.(props.movie)
}

const cardStyle = computed(() => {
  if (window.innerWidth <= 480) {
    return 'width: 110px; min-width: 110px; max-width: 110px; height: 170px; padding: 4px 0 0 0;'
  }
  if (window.innerWidth <= 700) {
    return 'width: 130px; min-width: 130px; max-width: 130px; height: 210px; padding: 6px 0 0 0;'
  }
  return 'width: 164px; min-width: 164px; max-width: 164px; height: 278px; padding: 8px 0 0 0;'
})
</script>

<style>@import '../assets/MovieCard.css'; </style>