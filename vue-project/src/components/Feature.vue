<template>
  <main class="feature-section pt-8 pb-16">
    <div class="content-wrapper mx-auto px-4 md:px-10 max-w-275">

      <div class="tags-list flex flex-col gap-0.5 mb-4 sm:mb-6">
        <span v-for="genre in genres" :key="genre" class="genre-mobile text-base sm:text-xl md:text-2xl font-semibold text-white leading-tight">
          {{ genre }}
        </span>
      </div>

      <h1 class="feature-title text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-wide mb-2 sm:mb-4">
        {{ title }}
      </h1>

      <div class="details-row flex flex-col gap-0.5 mb-2 sm:mb-4">
        <div class="details-row-typography flex items-center flex-wrap gap-0.5 mb-2" style="font-size: 1.25em;">
          <span class="main-detail text-white font-semibold">{{ year }}</span>
          <span class="main-detail text-white font-semibold">DIRECTOR: <span class="sub-detail font-normal text-white/80">{{ director }}</span></span>
          <span class="main-detail text-white font-semibold">Seasons: <span class="sub-detail font-normal text-white/80">{{ seasons }} ({{ episodes.length }} Episodes)</span></span>
        </div>
      </div>

      <div class="story-summary max-w-xs sm:max-w-2xl mb-6 sm:mb-8">
        <p class="desc-mobile text-xs sm:text-base md:text-lg text-white/90 leading-relaxed break-words">
          {{ description }}
        </p>
      </div>

      <div class="stars-rating flex gap-1 mb-8" aria-label="Movie rating">
        <i
          v-for="index in maxRating"
          :key="index"
          :class="index <= rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          class="text-3xl text-white cursor-pointer hover:scale-110 transition-transform"
          @click="setRating(index)"
          @keydown.enter="setRating(index)"
          tabindex="0"
        ></i>
      </div>

      <div class="control-buttons flex flex-col sm:flex-row gap-3">
        <button 
          @click="showStreamAlert"
          class="start-stream flex-1 sm:flex-none bg-[#e50914] hover:bg-[#f40613] active:scale-95 transition-all font-bold text-base md:text-lg tracking-wider h-12 sm:h-14 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md shadow-red-600/40"
        >
          STREAM NOW
          <img src="/img/play-icon.png" alt="play" class="w-5 h-5" />
        </button>
        <button 
          type="button"
          class="episodes-list flex-1 sm:flex-none border-2 border-white hover:border-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md h-12 sm:h-14 px-6 rounded-lg font-bold text-base md:text-lg tracking-wider transition-all flex items-center justify-center cursor-pointer opacity-90"
          @click="showEpisodes = true"
        >
          ALL EPISODES
        </button>
        <teleport to="body">
          <transition name="modal-fade">
            <div v-if="showEpisodes" class="episodes-modal-clean animate-pop-in-dark">
              <button @click="showEpisodes = false" class="close-btn-episodes-clean" aria-label="Close episodes modal">
                <span class="close-x-episodes-clean">✕</span>
              </button>
              <h3 class="episodes-title-clean">All Episodes</h3>
              <ul class="episodes-list-modal-clean custom-scrollbar">
                <li v-for="(ep, idx) in episodes" :key="ep.title || idx" class="episode-item-clean">
                  <span class="episode-num-clean">{{ idx + 1 }}.</span> <span class="episode-title-clean">{{ ep.title }}</span>
                </li>
              </ul>
            </div>
          </transition>
        </teleport>
      </div>
    </div>
    </main>
    </template>

  <script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  genres: { type: Array, default: () => ['Drama', 'Thriller', 'Supernatural'] },
  director: { type: String, default: 'Shawn Levy' },
  year: { type: [String, Number], default: '2019' },
  seasons: { type: [String, Number], default: 3 },
  episodes: {
    type: Array,
    default: () => [
      { title: 'Episode 1' },
      { title: 'Episode 2' },
      { title: 'Episode 3' },
      { title: 'Episode 4' }
    ]
  },
  initialRating: { type: Number, default: 3 }
})


const emit = defineEmits(['update:rating'])

const maxRating = 5
const rating = ref(props.initialRating)
const showEpisodes = ref(false)

function setRating(val) {
  rating.value = val
  emit('update:rating', val)
}

function showStreamAlert() {
  alert('Streaming started')
}
</script>
<style>@import '../assets/Feature.css'; </style>