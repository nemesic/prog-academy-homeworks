<template>
  <div class="about">
    <!-- HEADER -->
    <div class="about-header glass-card">
      <h1>About Movie App</h1>
      <p>
        A modern Netflix-style Vue application with API integration,
        favorites system and custom movie creation.
      </p>
    </div>
    <div class="about-tabs" role="tablist" aria-label="About tabs">
      <button
        :class="{ active: tab === 'about' }"
        @click="tab = 'about'"
        role="tab"
        :aria-selected="tab === 'about'"
        aria-controls="about-panel"
        tabindex="0"
      >
        About
      </button>
      <button
        :class="{ active: tab === 'features' }"
        @click="tab = 'features'"
        role="tab"
        :aria-selected="tab === 'features'"
        aria-controls="features-panel"
        tabindex="0"
      >
        Features
      </button>
      <button
        :class="{ active: tab === 'stack' }"
        @click="tab = 'stack'"
        role="tab"
        :aria-selected="tab === 'stack'"
        aria-controls="stack-panel"
        tabindex="0"
      >
        Stack
      </button>
    </div>

    <transition name="fade" mode="out-in">
      <div class="about-content glass-card" :key="tab">
        <template v-if="tab === 'about'">
          <p id="about-panel">
            This project is a Netflix-inspired movie platform.
            <br>
            <b>Browse, search, and manage your favorite movies with a modern UI.</b>
          </p>
        </template>
        <template v-else-if="tab === 'features'">
          <ul id="features-panel">
            <li>
              <i class="fa fa-check-circle" style="color:#2ecc71;margin-right:8px;"></i>
              Movie API (TMDB)
            </li>
            <li>
              <i class="fa fa-check-circle" style="color:#2ecc71;margin-right:8px;"></i>
              Add custom movies
            </li>
            <li>
              <i class="fa fa-heart" style="color:#e50914;margin-right:8px;"></i>
              Favorites system
            </li>
            <li>
              <i class="fa fa-search" style="color:#ffea2b;margin-right:8px;"></i>
              Search functionality
            </li>
            <li>
              <i class="fa fa-user-shield" style="color:#b20710;margin-right:8px;"></i>
              Admin panel
            </li>
          </ul>
        </template>
        <template v-else-if="tab === 'stack'">
          <ul id="stack-panel">
            <li>
              <i class="fa fa-vuejs" style="color:#42b883;margin-right:8px;"></i>
              Vue 3
            </li>
            <li>
              <i class="fa fa-route" style="color:#888;margin-right:8px;"></i>
              Vue Router
            </li>
            <li>
              <i class="fa fa-plug" style="color:#888;margin-right:8px;"></i>
              Provide/Inject API
            </li>
            <li>
              <i class="fa fa-paint-brush" style="color:#e50914;margin-right:8px;"></i>
              CSS (glass UI)
            </li>
            <li>
              <i class="fa fa-cloud" style="color:#2d8cff;margin-right:8px;"></i>
              TMDB API
            </li>
          </ul>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tab = ref('about')
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.about-tabs button {
  outline: none;
}
.about-tabs button.active {
  box-shadow: 0 2px 12px rgba(229,9,20,0.08);
}
.about-content ul li {
  display: flex;
  align-items: center;
  gap: 4px;
}
</style>