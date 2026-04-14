<template>
  <FavoritesProvider>
    <header
      v-if="!isLoggedIn"
      class="main-header py-5 md:py-8 lg:py-10 transition-all"
      :class="{ 'login-modal-open': showModal }"
    >
      <div
        class="content-wrapper mx-auto px-4 md:px-10 max-w-screen-2xl flex items-center justify-between"
        :class="{ 'hidden md:flex': showModal && windowWidth <= 600 }"
      >
        <div class="netflix-brand">
          <img 
            src="/img/netflix-logo.png" 
            alt="Netflix" 
            class="max-w-32.5 md:max-w-39"
          />
        </div>

        <button
          v-if="!isLoggedIn"
          @click="openLogin"
          class="login-nav-btn px-6 py-2.5 text-base md:text-lg font-medium text-white hover:text-red-500 transition-colors"
        >
          Login
        </button>
      </div>

      <ModalLogin
        v-if="showModal && !isLoggedIn"
        @login="handleLoginSuccess"
        @close="closeLogin"
        ref="modalLoginRef"
      />

      <div
        v-if="showModal && windowWidth <= 600"
        class="mobile-login-backdrop fixed inset-0 bg-black/95 z-9998"
      ></div>
    </header>

    <div v-if="!isLoggedIn && (!showModal || windowWidth > 600)" class="mt-8">
      <Feature
        title="Stranger Things"
        description="In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries."
      />
    </div>

    <template v-else>
      <Header
        :search="search"
        @update:search="val => search = val"
        :movies="[...movies, ...apiMovies]"
        v-model:isLoggedIn="isLoggedIn"
        key="main-header"
      />
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
    </template>
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