<template>
  <main class="feature-section pt-8 pb-16">
    <div class="content-wrapper mx-auto px-4 md:px-10 max-w-275">

      <!-- Genres -->
      <div class="tags-list flex flex-wrap gap-x-6 gap-y-2 mb-10">
        <span 
          v-for="genre in genres" 
          :key="genre"
          class="text-2xl md:text-[29px] font-medium text-white tracking-wide"
        >
          {{ genre }}
        </span>
      </div>

      <!-- Title -->
      <h1 class="feature-title text-5xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-wide mb-8">
        {{ title }}
      </h1>

      <!-- Details -->
      <div class="details-row flex flex-col md:flex-row gap-4 md:gap-10 mb-8 text-white">
        <span class="text-2xl md:text-3xl font-medium">{{ year }}</span>
        <span class="text-2xl md:text-3xl font-medium">
          Director: <span class="text-[#a7a6a6]">{{ director }}</span>
        </span>
        <span class="text-2xl md:text-3xl font-medium">
          Seasons: <span class="text-[#a7a6a6]">{{ seasons }}</span> 
          ({{ episodes.length }} Episodes)
        </span>
      </div>

      <!-- Description -->
      <div class="story-summary max-w-3xl mb-10">
        <p class="text-lg md:text-2xl text-white/90 leading-relaxed">
          {{ description }}
        </p>
      </div>

      <!-- Rating Stars -->
      <div class="stars-rating flex gap-1 mb-12" aria-label="Movie rating">
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

      <!-- Control Buttons -->
      <div class="control-buttons flex flex-col sm:flex-row gap-4">
        <button 
          @click="showStreamAlert"
          class="start-stream flex-1 sm:flex-none bg-[#e50914] hover:bg-[#f40613] active:scale-95 transition-all font-bold text-lg md:text-xl tracking-wider h-14 sm:h-14.5 px-10 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-red-600/50"
        >
          STREAM NOW
          <img src="/img/play-icon.png" alt="play" class="w-6 h-6" />
        </button>

        <button 
          @click="showEpisodes = true"
          class="episodes-list flex-1 sm:flex-none border-2 border-white hover:border-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md h-14 sm:h-14.5 px-10 rounded-xl font-bold text-lg md:text-xl tracking-wider transition-all flex items-center justify-center"
        >
          ALL EPISODES
        </button>
      </div>

      <!-- Episodes Modal -->
      <teleport to="body">
        <div 
          v-if="showEpisodes" 
          class="episodes-modal-overlay fixed inset-0 bg-black/80 backdrop-blur-sm z-1000 flex items-center justify-center"
          @click.self="showEpisodes = false"
        >
          <div class="episodes-modal bg-[#181818] border-2 border-[#e50914] rounded-3xl p-8 md:p-10 max-w-105 w-[92vw] shadow-2xl">
            <h3 class="text-[#e50914] text-2xl font-bold mb-6 text-center">All Episodes</h3>
            
            <ul class="space-y-1 mb-8">
              <li 
                v-for="(ep, i) in episodes" 
                :key="i"
                class="px-5 py-4 hover:bg-white/10 rounded-xl cursor-pointer transition-colors"
              >
                {{ ep.title || `Episode ${i + 1}` }}
              </li>
            </ul>

            <button 
              @click="showEpisodes = false"
              class="close-btn w-full bg-[#e50914] hover:bg-[#f40613] py-4 rounded-2xl font-bold text-lg transition-all active:scale-95"
            >
              Close
            </button>
          </div>
        </div>
      </teleport>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genres: { type: Array, default: () => ['Drama', 'Thriller', 'Supernatural'] },
  director: { type: String, default: 'Shawn Levy' },
  year: { type: [String, Number], default: '2019' },
  seasons: { type: [String, Number], default: 3 },
  episodes: {
    type: Array,
    default: () => [
      { title: 'Episode 1: The Beginning' },
      { title: 'Episode 2: The Mystery' },
      { title: 'Episode 3: The Upside Down' },
      { title: 'Episode 4: The Rescue' }
    ]
  },
  initialRating: { type: Number, default: 3 }
})

const emit = defineEmits(['update:rating'])

const maxRating = 5
const rating = ref(props.initialRating)

function setRating(val) {
  rating.value = val
  emit('update:rating', val)
}

function showStreamAlert() {
  alert('Streaming started')
}

const showEpisodes = ref(false)
</script>