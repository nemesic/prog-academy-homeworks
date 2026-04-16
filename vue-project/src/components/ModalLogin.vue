<template>
  <transition name="modal-fade">
    <div class="modal-bg" v-if="visible">
      <div class="modal-glow"></div>
      <div class="login-modal animate-pop-in" role="dialog" aria-modal="true">

        <button
        @click="emit('close')"
        class="close-btn"
        aria-label="Close login modal"
        >
        ✕
      </button>

        <h3 class="login-title">Sign In</h3>

        <form class="login-form" @submit.prevent="tryLogin" autocomplete="on">
          <div class="field icon-field">
            <span class="input-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"/></svg></span>
            <input
              v-model="login"
              type="text"
              placeholder="Username"
              class="login-input with-icon"
              autocomplete="username"
              required
              aria-label="Username"
              :disabled="loading"
            />
          </div>
          <div class="field icon-field">
            <span class="input-icon"><svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" viewBox="0 0 24 24"><rect x="6" y="11" width="12" height="7" rx="2"/><path d="M12 16v-2"/><circle cx="12" cy="13" r="1"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg></span>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              class="login-input with-icon"
              autocomplete="current-password"
              required
              aria-label="Password"
              :disabled="loading"
            />
          </div>
          <button class="login-btn" type="submit" :disabled="loading">
            <span v-if="loading" class="loader" aria-label="Loading"></span>
            <span v-else>Sign In</span>
          </button> 
          <div v-if="error" class="login-error" role="alert">{{ error }}</div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
const emit = defineEmits(['close', 'login'])
const login = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const visible = ref(true)

function tryLogin() {
  if (loading.value) return
  error.value = ''
  loading.value = true
  setTimeout(() => {
    if (login.value === 'admin' && password.value === '12345') {
      emit('login', { user: login.value })
      login.value = ''
      password.value = ''
      visible.value = false
    } else {
      error.value = 'Wrong username or password'
    }
    loading.value = false
  }, 700)
}

function onKeyDown(e) {
  if (e.key === 'Escape') emit('close')
}
onMounted(() => window.addEventListener('keydown', onKeyDown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeyDown))
</script>
<style>@import '../assets/ModalLogin.css'; </style>