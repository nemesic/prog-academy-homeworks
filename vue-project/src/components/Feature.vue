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
          type="button"
          class="episodes-list flex-1 sm:flex-none border-2 border-white hover:border-white/90 bg-white/10 hover:bg-white/20 backdrop-blur-md h-14 sm:h-14.5 px-10 rounded-xl font-bold text-lg md:text-xl tracking-wider transition-all flex items-center justify-center cursor-default opacity-80"
          disabled
        >
          ALL EPISODES
        </button>
      </div>

      <!-- Episodes Modal removed by user request -->
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

function setRating(val) {
  rating.value = val
  emit('update:rating', val)
}

function showStreamAlert() {
  alert('Streaming started')
}


</script>


<style scoped>

@keyframes fadeInModalBg {
  0% { opacity: 0; }
  100% { opacity: 1; }  
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.38s cubic-bezier(.4,0,.2,1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to, .modal-fade-leave-from {
  opacity: 1;
}

.shadow-glow {
  box-shadow: 0 0 0 6px #e50914cc, 0 0 32px 8px #e50914cc, 0 18px 64px 0 #e5091440, 0 2px 8px #fff2;
}

.animate-pop-in {
  animation: pop-in 0.5s cubic-bezier(.4,0,.2,1);
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.92); }
  80% { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-bounce-short {
  animation: bounce-short 0.7s;
}
@keyframes bounce-short {
  0% { transform: translateY(-18px); }
  60% { transform: translateY(8px); }
  100% { transform: translateY(0); }
}
.animate-episodes-title {
  animation: episodes-title-pop 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes episodes-title-pop {
  0% { opacity: 0; transform: scale(0.8); }
  60% { opacity: 1; transform: scale(1.08); }
  100% { opacity: 1; transform: scale(1); }
}
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: #e50914 #222;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 7px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e50914;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #222;
  border-radius: 8px;
}
</style>