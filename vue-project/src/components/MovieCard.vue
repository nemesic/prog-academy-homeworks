<template>
  <div class="movie-card" @click="selectMovie" tabindex="0" aria-label="Movie card">
    <img
      :src="img"
      :alt="title"
      class="movie-card-img"
      draggable="false"
    />
    <i
      :class="['fa-heart', fav ? 'fa-solid' : 'fa-regular', 'movie-fav-icon']"
      @click.stop="handleFavoriteClick"
      :aria-label="fav ? 'Remove from favorites' : 'Add to favorites'"
      :aria-pressed="fav"
      tabindex="0"
      role="button"
    />
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  img: String,
  title: String,
  movie: Object,
  onSelect: Function
})

const favoritesContext = inject('favoritesContext')
const addToFavorites = favoritesContext?.addToFavorites || (() => {})
const removeFromFavorites = favoritesContext?.removeFromFavorites || (() => {})
const isFavorite = favoritesContext?.isFavorite || (() => false)

const fav = computed(() => isFavorite(props.movie.id))

function handleFavoriteClick() {
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

<style scoped>
.movie-card {
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.18s, transform 0.18s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  outline: none;
}
.movie-card:focus,
.movie-card:hover {
  box-shadow: 0 6px 24px rgba(229,9,20,0.18);
  transform: translateY(-2px) scale(1.03);
}
.movie-card-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
  user-select: none;
  pointer-events: none;
}
.movie-fav-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #e50914;
  background: rgba(0,0,0,0.32);
  border-radius: 50%;
  padding: 6px;
  font-size: 22px;
  cursor: pointer;
  transition: color 0.18s, background 0.18s, transform 0.18s;
  z-index: 2;
}
.movie-fav-icon.fa-regular {
  color: #fff;
}
.movie-fav-icon:hover,
.movie-fav-icon:focus {
  color: #e50914;
  background: rgba(229,9,20,0.08);
  transform: scale(1.15);
}
</style>