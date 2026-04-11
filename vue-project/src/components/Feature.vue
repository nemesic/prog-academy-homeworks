<template>
  <main class="feature-section">
    <div class="content-wrapper">

      <!-- 5 -->
      <div class="tags-list">
        <span v-for="genre in genres" :key="genre">{{ genre }}</span>
      </div>

      <h1 class="feature-title">{{ title }}</h1>
      <div class="details-row">
        <span>{{ year }}</span>
        <span>Director: <strong>{{ director }}</strong></span>
        <span>Seasons: <strong>{{ seasons }} ({{ episodes.length }} Episodes)</strong></span>
      </div>
      <div class="story-summary">
        <p>{{ description }}</p>
      </div>

      <!-- 5 -->
      <div class="stars-rating" aria-label="Movie rating">
        <i
          v-for="index in maxRating"
          :key="index"
          :class="index <= rating ? 'fa-solid fa-star' : 'fa-regular fa-star'"
          @click="setRating(index)"
          :aria-pressed="index === rating"
          tabindex="0"
          @keydown.enter="setRating(index)"
          style="cursor:pointer"
        ></i>
      </div>
      <!-- --- -->
      <!-- 16 -->
      <div class="control-buttons">
        <button class="start-stream" @click="showStreamAlert()">
          STREAM NOW
          <img src="/img/play-icon.png" alt="play" />
        </button>
        <button class="episodes-list" @click="showEpisodes = true">
          ALL EPISODES
        </button>
      </div>
      <teleport to="body">
        <div v-if="showEpisodes" class="episodes-modal-overlay" @click.self="showEpisodes = false">
          <div class="episodes-modal glass-card">
            <h3>All Episodes</h3>
            <ul>
              <li>Stranger Things Episode 1</li>
              <li>Stranger Things Episode 2</li>
              <li>Stranger Things Episode 3</li>
              <li>Stranger Things Episode 4</li>
            </ul>
            <button @click="showEpisodes = false" class="close-btn">Close</button>
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
      { id: 1, title: 'Episode 1: The Beginning' },
      { id: 2, title: 'Episode 2: The Mystery' },
      { id: 3, title: 'Episode 3: The Upside Down' },
      { id: 4, title: 'Episode 4: The Rescue' }
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
