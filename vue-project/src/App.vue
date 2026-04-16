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