<template>
  <FavoritesProvider>
    <Header
      :search="search"
      @update:search="val => search = val"
      :movies="[...movies, ...apiMovies]"
      v-model:isLoggedIn="isLoggedIn"
      :showModal="showModal"
      @open-login="openLogin"
      @close-login="closeLogin"
      @login-success="handleLoginSuccess"
      key="main-header"
    />
    <div v-if="!isLoggedIn && (!showModal || windowWidth > 600)" class="mt-8">
      <Feature
        title="Stranger Things"
        description="In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries."
      />
    </div>
    <RouterView
      v-if="isLoggedIn"
      :search="search"
      :isLoggedIn="isLoggedIn"
      :movies="movies"
      :apiMovies="apiMovies"
      @update:movies="val => movies = val"
      @update:apiMovies="val => apiMovies = val"
      :key="$route.fullPath"
    />
  </FavoritesProvider>
</template>

<style>
.same-class {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  padding: 0 0.7em;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  transition: color 0.18s;
  text-decoration: none;
  display: inline-block;
}
.same-class:hover, .same-class:focus {
  color: #e50914;
}
@media (max-width: 600px) {
  .main-header {
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .content-wrapper {
    padding-left: 8px;
    padding-right: 8px;
    max-width: 100vw;
    gap: 4px;
  }
  .netflix-brand img {
    max-width: 90px;
  }
  .same-class {
    font-size: 1rem;
    padding: 0 0.5em;
  }
}
.modal-login {
  background: rgba(24,24,28,0.97);
  box-shadow: 0 8px 40px #000a, 0 2px 8px #e5091440;
  border-radius: 18px;
  border: 1.5px solid rgba(255,255,255,0.12);
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 420px;
  margin: 60px auto 0;
  color: #fff;
  position: relative;
  z-index: 10001;
  backdrop-filter: blur(8px);
}

.modal-login input {
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.18);
  border-radius: 10px;
  color: #fff;
  padding: 12px 16px;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.modal-login input:focus {
  border-color: #e50914;
  box-shadow: 0 0 0 3px #e5091440;
}

.modal-login button {
  background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  padding: 14px 0;
  box-shadow: 0 2px 12px #e5091440; 
  margin-top: 1rem;
  width: 100%;
  transition: background 0.22s, transform 0.18s;
}
.modal-login button:hover {
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
  transform: translateY(-2px) scale(1.04);
}
  </style>

  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import FavoritesProvider from './context/FavoritesProvider.vue'
  import Header from './components/Header.vue'
  import ModalLogin from './components/ModalLogin.vue'
  import Feature from './components/Feature.vue'

  const search = ref('')
  const movies = ref([])
  const apiMovies = ref([])
  const isLoggedIn = ref(false)
  const showModal = ref(false)
  const modalLoginRef = ref(null)
  const windowWidth = ref(window.innerWidth)

  function handleLoginSuccess() {
    isLoggedIn.value = true
    showModal.value = false
  }

  function openLogin() {
    showModal.value = true
    setTimeout(() => {
      const modal = modalLoginRef.value?.$el
      if (modal) {
        const input = modal.querySelector('input')
        if (input) input.focus()
      }
    }, 100)
  }

  function closeLogin() {
    showModal.value = false
  }

  function onKeyDown(e) {
    if (showModal.value && e.key === 'Escape') {
      closeLogin()
    }
  }

  function updateWindowWidth() {
    windowWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', updateWindowWidth)
  })

  watch(showModal, (val) => {
    if (!val) {
      window.removeEventListener('keydown', onKeyDown)
    }
  })
  </script>