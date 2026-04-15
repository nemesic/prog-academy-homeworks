<template>
  <transition name="modal">
    <div class="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">

      <div
        class="modal-card relative w-[92vw] max-w-md bg-[#141414]/95 border border-white/10 rounded-2xl p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
      >

        <!-- CLOSE -->
        <button
          @click="emit('close')"
          class="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
        >
          ✕
        </button>

        <!-- TITLE -->
        <h2 class="text-center text-white text-2xl font-bold mb-6">
          Sign In
        </h2>

        <!-- FORM -->
        <div class="space-y-4">

          <input
            v-model="login"
            type="text"
            placeholder="Username"
            autocomplete="username"
            class="input"
            @keyup.enter="tryLogin"
            @input="error = ''"
          />

          <input
            v-model="password"
            type="password"
            placeholder="Password"
            autocomplete="current-password"
            class="input"
            @keyup.enter="tryLogin"
            @input="error = ''"
          />

          <button
            @click="tryLogin"
            :disabled="loading"
            class="btn"
          >
            <span v-if="loading" class="loader"></span>
            <span v-else>Sign In</span>
          </button>

          <p v-if="error" class="text-red-500 text-sm text-center mt-2">
            {{ error }}
          </p>

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

  loading.value = true
  error.value = ''

  setTimeout(() => {
    if (login.value === 'admin' && password.value === '12345') {
      emit('login', { user: login.value })
      login.value = ''
      password.value = ''
    } else {
      error.value = 'Wrong username or password'
    }
    loading.value = false
  }, 600)
}
</script>

<style scoped>
/* MODAL ANIMATION */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* INPUT */
.input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  color: white;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  border-color: rgba(229, 9, 20, 0.6);
  background: rgba(255,255,255,0.08);
}

/* BUTTON */
.btn {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background: #e50914;
  color: white;
  font-weight: 700;
  transition: 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.btn:hover {
  background: #ff2a2a;
  transform: translateY(-1px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* LOADER */
.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>