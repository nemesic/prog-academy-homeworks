<template>
  <transition name="modal-fade">
    <div class="modal-bg fixed inset-0 bg-black/85 backdrop-blur-sm z-9999 flex items-center justify-center">
      <div 
        class="login-modal relative bg-[#181818] border-2 border-[#e50914] rounded-3xl p-10 md:p-12 max-w-95 w-[92vw] shadow-2xl"
        role="dialog"
        aria-modal="true"
      >
        <!-- Close Button -->
        <button
          @click="emit('close')"
          aria-label="Close login modal"
          type="button"
          class="close-modal-btn absolute top-4 right-4 w-9 h-9 bg-white/10 border border-[#e50914] hover:bg-red-950/50 hover:border-white rounded-2xl flex items-center justify-center transition-all active:scale-90"
        >
          <span class="text-xl leading-none text-white hover:text-red-500 transition-colors">✕</span>
        </button>

        <h3 class="text-[#e50914] text-3xl font-bold tracking-wide text-center mb-8">
          Login
        </h3>

        <div class="space-y-5">
          <input
            v-model="login"
            placeholder="Login"
            autocomplete="username"
            @keyup.enter="tryLogin"
            @input="error = ''"
            autofocus
            class="w-full bg-white/10 border border-white/20 focus:border-red-600 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 outline-none transition-all text-base"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            @keyup.enter="tryLogin"
            @input="error = ''"
            class="w-full bg-white/10 border border-white/20 focus:border-red-600 rounded-2xl px-6 py-4 text-white placeholder:text-white/50 outline-none transition-all text-base"
          />

          <button
            @click="tryLogin"
            :disabled="loading"
            class="w-full bg-[#e50914] hover:bg-[#f40613] active:bg-red-700 disabled:opacity-70 transition-all font-bold text-lg py-4 rounded-2xl mt-3 flex items-center justify-center gap-3 shadow-lg shadow-red-600/40"
          >
            <span v-if="loading" class="login-spinner w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            <span v-else>Login</span>
          </button>
        </div>

        <div v-if="error" class="login-error text-red-500 text-center font-medium mt-5">
          {{ error }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login', 'close'])

const login = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function tryLogin() {
  if (loading.value) return

  error.value = ''
  loading.value = true

  setTimeout(() => {
    if (login.value === 'admin' && password.value === '12345') {
      emit('login', { user: login.value })
      login.value = ''
      password.value = ''
      error.value = ''
    } else {
      error.value = 'Invalid login or password'
    }
    loading.value = false
  }, 700)
}
</script>