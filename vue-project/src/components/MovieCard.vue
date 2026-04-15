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

<style scoped>
.moviecard {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #181818;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: box-shadow .2s;
}
.moviecard:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
}
.moviecard-img-wrap {
  width: 100%;
  height: 80%;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.moviecard-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  background: #222;
}
.moviecard-fav {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background: rgba(24,24,24,0.7);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background .2s;
  z-index: 2;
}
.moviecard-fav.active {
  background: #fff2;
}
.moviecard-bottom {
  width: 100%;
  min-height: 36px;
  background: linear-gradient(0deg, #181818 90%, #181818cc 100%, transparent 100%);
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4px;
}
.moviecard-title {
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 80px;
}
@media (max-width: 700px) {
  .moviecard-title { max-width: 60px; font-size: 0.93rem; }
  .moviecard-bottom { padding-bottom: 4px; }
}
@media (max-width: 480px) {
  .moviecard-title { max-width: 44px; font-size: 0.85rem; }
  .moviecard-bottom { padding-bottom: 2px; }
}
</style>