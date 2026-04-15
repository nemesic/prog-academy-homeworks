<script setup>
import { ref, provide, watch } from 'vue'

const favorites = ref([])

const saved = localStorage.getItem('favorites')
if (saved) {
  try {
    favorites.value = JSON.parse(saved)
  } catch {
    favorites.value = []
  }
}

watch(
  favorites,
  (val) => {
    console.log('Favorites changed:', val)
    localStorage.setItem('favorites', JSON.stringify(val))
  },
  { deep: true }
)

function addToFavorites(movie) {
  if (!movie?.id) return
  if (!favorites.value.some(m => m.id === movie.id)) {
    favorites.value.push(movie)
  }
}

function removeFromFavorites(id) {
  favorites.value = favorites.value.filter(m => m.id !== id)
}

function isFavorite(id) {
  return favorites.value.some(m => m.id === id)
}

function clearFavorites() {
  favorites.value = []
}

provide('favoritesContext', {
  favorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  clearFavorites
})
</script>

<template>
  <slot />
</template> 