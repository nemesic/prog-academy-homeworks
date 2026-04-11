<template>
  <div class="admin-page">
    <div class="admin-header glass-card">
      <h1>Admin Panel</h1>
      <p>Manage and add new movies to your collection</p>
    </div>
    <div class="admin-tabs">
      <button
        class="admin-tab"
        :class="{ active: activeTab === 'form' }"
        @click="activeTab = 'form'"
        aria-label="Add Movie Tab"
      >
        ➕ Add Movie
      </button>
      <button
        class="admin-tab"
        :class="{ active: activeTab === 'list' }"
        @click="activeTab = 'list'"
        aria-label="Movies List Tab"
      >
        📽️ Movies ({{ movies.length }})
      </button>
    </div>

    <!-- CONTENT -->
    <div class="admin-container">
      <!-- CREATE FORM -->
      <div class="admin-form-section glass-card" :class="{ active: activeTab === 'form' }">
        <h2>Add New Movie</h2>
        <CreateMovie @add-movie="addMovie" />
      </div>
      <!-- MOVIES LIST -->
      <div class="admin-movies-section glass-card" :class="{ active: activeTab === 'list' }">
        <h2>Available movies ({{ movies.length }})</h2>
        <ul class="admin-movies-grid">
          <li v-if="!movies.length" style="text-align:center;opacity:0.7;font-size:1.1rem;padding:24px 0;">
            No movies yet. Add your first movie!
          </li>
          <li
            v-for="movie in movies"
            :key="movie.id"
            class="admin-movie-item"
            tabindex="0"
            aria-label="Movie item"
          >
            <div class="admin-movie-img-wrapper">
              <img :src="movie.img" :alt="movie.title" />
              <button
                class="admin-delete-btn"
                @click="confirmDelete(movie.id)"
                aria-label="Delete movie"
                title="Delete"
                type="button"
              >
                <i class="fa fa-trash"></i>
              </button>
            </div>
            <p>{{ movie.title }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreateMovie from '../components/CreateMovie.vue'
import { movies as initialMovies } from '../data/movies.js'

const movies = ref([...initialMovies])
const activeTab = ref('form')

function addMovie(newMovie) {
  movies.value.push(newMovie)
  activeTab.value = 'list'
}

function confirmDelete(id) {
  const movie = movies.value.find(m => m.id === id)
  if (!movie) return
  if (window.confirm(`Delete "${movie.title}"? This cannot be undone.`)) {
    movies.value = movies.value.filter(m => m.id !== id)
  }
}
</script>

<style scoped>
.admin-delete-btn {
  position: absolute;
  top: 6px;
  right: 6px;
  background: rgba(229,9,20,0.12);
  border: none;
  border-radius: 6px;
  color: #e50914;
  font-size: 1.1rem;
  padding: 4px 7px;
  cursor: pointer;
  z-index: 2;
  transition: background 0.18s, color 0.18s;
}
.admin-delete-btn:hover,
.admin-delete-btn:focus {
  background: #e50914;
  color: #fff;
}
.admin-movie-img-wrapper {
  position: relative;
}
</style>
