<template>
  <transition name="modal-fade">
    <div class="modal-bg">
      <div class="login-modal modal-relative" role="dialog" aria-modal="true">
        <button class="close-modal-btn square" @click="emit('close')" aria-label="Close login modal" type="button">
          <span class="close-icon">&#10005;</span>
        </button>
        <h3>Login</h3>
        <input
          v-model="login"
          placeholder="Login"
          autocomplete="username"
          @keyup.enter="tryLogin"
          aria-label="Login"
          autofocus
          @input="error = ''"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          autocomplete="current-password"
          @keyup.enter="tryLogin"
          aria-label="Password"
          @input="error = ''"
        />
        <button @click="tryLogin" :disabled="loading">
          <span v-if="loading" class="login-spinner"></span>
          Login
        </button>
        <div v-if="error" class="login-error">{{ error }}</div>
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
      error.value = ''
      login.value = ''
      password.value = ''
    } else {
      error.value = 'Invalid login or password'
    }
    loading.value = false
  }, 700)
}
</script>
<style scoped>
/* ...existing code... */
.login-modal.modal-relative {
  position: relative;
  /* забезпечує позиціювання для абсолютного хрестика */
  z-index: 10;
}
.close-modal-btn.square {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid #e50914;
  border-radius: 8px;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.18s, background 0.18s, border 0.18s;
  padding: 0;
}
.close-modal-btn.square:hover {
  color: #e50914;
  background: rgba(229,9,20,0.18);
  border-color: #fff;
}
.close-icon {
  font-size: 1.2rem;
  line-height: 1;
  display: block;
  pointer-events: none;
}
.login-modal h3 {
  margin-top: 10px;
  margin-bottom: 22px;
}
@media (max-width: 480px) {
  .login-modal.modal-relative {
    min-width: 90vw;
    padding: 18px 6vw 14px 6vw;
  }
  .close-modal-btn.square {
    top: 6px;
    right: 6px;
    width: 28px;
    height: 28px;
    font-size: 1rem;
  }
}
/* ...existing code... */
</style>