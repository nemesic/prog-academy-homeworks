<template>
  <div
    class="movie-card group relative cursor-pointer rounded-2xl overflow-hidden shadow-lg bg-[#18181c] movie-card-hover transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.07]"
    style="width: 164px; min-width: 164px; max-width: 164px; height: 278px; padding: 8px 0 0 0;"
    @click.self="selectMovie"
  >
    <div class="w-full h-64 flex items-center justify-center bg-[#222] rounded-2xl overflow-hidden relative group/image">
      <img
        :src="img"
        :alt="title"
        class="w-full h-64 object-cover rounded-2xl shadow-xl transition-transform duration-300 group-hover/image:scale-110 group-hover/image:shadow-2xl"
        draggable="false"
        @error="e => e.target.style.display = 'none'"
        @click="selectMovie"
      />
      <i
        :class="['fa-heart', fav ? 'fa-solid' : 'fa-regular']"
        @click.stop="toggleFavorite"
        :style="{
          position: 'absolute',
          top: '12px',
          right: '12px',
          color: fav ? 'red' : 'white',
          cursor: 'pointer',
          fontSize: '22px',
          zIndex: 30,
          filter: fav ? 'drop-shadow(0 0 8px #e50914cc)' : 'drop-shadow(0 2px 12px #fff)'
        }"
        aria-label="Add to favorites"
      />
    </div>
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
</script>