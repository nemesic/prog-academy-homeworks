<script setup>
// filepath: d:\work\TailwindCSS\vue-project\src\context\FavoritesProvider.vue
import { ref, provide, watch, defineEmits } from 'vue'

const emit = defineEmits(['add', 'remove', 'clear'])

const favorites = ref([])

try {
  const saved = localStorage.getItem('favorites')
  if (saved) favorites.value = JSON.parse(saved)
} catch (e) {
  // ignore
}

watch(favorites, (val) => {
  localStorage.setItem('favorites', JSON.stringify(val))
}, { deep: true })

function addToFavorites(movie) {
  if (!favorites.value.some(m => m.id === movie.id)) {
    favorites.value.push(movie)
    emit('add', movie)
  }
}

function removeFromFavorites(id) {
  const idx = favorites.value.findIndex(m => m.id === id)
  if (idx !== -1) {
    const removed = favorites.value[idx]
    favorites.value.splice(idx, 1)
    emit('remove', removed)
  }
}

function isFavorite(id) {
  return favorites.value.some(m => m.id === id)
}

function clearFavorites() {
  favorites.value = []
  emit('clear')
}

provide('favoritesContext', {
  favorites,
  addToFavorites,
  removeFromFavorites,
  isFavorite,
  clearFavorites,
})
</script>

<template>
  <slot />
</template>