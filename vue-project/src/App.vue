<template>
  <FavoritesProvider>
    <div
      v-if="!isLoggedIn"
      class="main-header"
      :style="mainHeaderStyle"
      :class="{ 'login-modal-open': showModal }"
    >
      <div
        class="content-wrapper"
        :style="headerWrapperStyle"
        v-show="!showModal || windowWidth > 600"
      >
        <div class="netflix-brand">
          <img src="/img/netflix-logo.png" alt="Netflix" style="max-width:156px;margin-right:46px;" />
        </div>
        <button
          v-if="!isLoggedIn"
          @click="openLogin"
          class="login-nav-btn"
          :style="loginBtnStyle"
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
        class="mobile-login-backdrop"
      ></div>
    </div>
    <div
      v-if="!isLoggedIn && (!showModal || windowWidth > 600)"
      class="mt-8"
    >
      <Feature
        title="Stranger Things"
        description=" In 1980s Indiana, a group of young friends witness supernatural forces and secret government exploits. As they search for answers, the children unravel a series of extraordinary mysteries."
      />
    </div>
    <template v-else>
      <Header
        :search="search"
        @update:search="val => search = val"
        :movies="[...movies, ...apiMovies]"
        v-model:isLoggedIn="isLoggedIn"
      />
      <RouterView :search="search" :isLoggedIn="isLoggedIn" />
    </template>
  </FavoritesProvider>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
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

const mainHeaderStyle = computed(() => {
  if (windowWidth.value <= 600) {
    return 'padding:18px 0;margin-bottom:24px;';
  }
  if (windowWidth.value <= 900) {
    return 'padding:28px 0;margin-bottom:32px;';
  }
  return 'padding:42px 0;margin-bottom:40px;';
});
const headerWrapperStyle = computed(() => {
  if (windowWidth.value <= 600) {
    return 'display:flex;align-items:center;gap:8px;';
  }
  if (windowWidth.value <= 900) {
    return 'display:flex;align-items:center;gap:12px;';
  }
  return 'display:flex;align-items:center;gap:16px;';
});
const loginBtnStyle = computed(() => {
  if (windowWidth.value <= 600) {
    return 'margin-left:auto;font-size:16px;padding:6px 12px;';
  }
  if (windowWidth.value <= 900) {
    return 'margin-left:auto;font-size:18px;';
  }
  return 'margin-left:auto;font-size:22px;';
});

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
  }, 50)
}

function closeLogin() {
  showModal.value = false
}

function onKeyDown(e) {
  if (showModal.value && e.key === 'Escape') {
    closeLogin()
  }
}

function updateResponsive() {
  windowWidth.value = window.innerWidth
  mainHeaderStyle.value
  headerWrapperStyle.value
  loginBtnStyle.value
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('resize', updateResponsive)
})
watch(showModal, val => {
  if (!val) window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
@media (max-width: 600px) {
  .main-header.login-modal-open {
    opacity: 1 !important;
    pointer-events: auto !important;
    height: auto !important;
    min-height: unset !important;
    max-height: unset !important;
    overflow: visible !important;
    padding: 0 !important;
    margin: 0 !important;
    transition: opacity 0.18s;
    background: transparent !important;
  }
  .main-header.login-modal-open .content-wrapper {
    display: none !important;
  }
  .mobile-login-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(20,20,20,0.92);
    z-index: 9998;
    pointer-events: auto;
    touch-action: none;
  }
  .login-nav-btn {
    margin-left: auto !important;
    display: block !important;
    text-align: right !important;
  }
  .content-wrapper {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    width: 100%;
  }
}
</style>
