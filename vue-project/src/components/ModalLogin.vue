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
          <span class="close-x">✕</span>
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

<style scoped>
.modal-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 420px;
  height: 320px;
  background: radial-gradient(ellipse at center, #e5091440 0%, transparent 80%);
  filter: blur(48px);
  z-index: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
}

.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.38s cubic-bezier(.4,0,.2,1), transform 0.38s cubic-bezier(.4,0,.2,1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.92) translateY(30px);
}
.modal-fade-enter-to, .modal-fade-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

.modal-bg {
  position: fixed;
  inset: 0;
  background: rgba(20,20,20,0.82);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeInModalBg 0.28s cubic-bezier(.4,0,.2,1);
  backdrop-filter: blur(2.5px);
}
@keyframes fadeInModalBg {
  from { opacity: 0; }
  to { opacity: 1; }
}

.login-modal {
  position: relative;
  background: rgba(24,24,28,0.97);
  color: #fff;
  border-radius: 22px;
  padding: 2.7rem 2.1rem 2.1rem 2.1rem;
  min-width: 320px;
  max-width: 95vw;
  box-shadow: 0 12px 48px #e5091430, 0 2px 8px #e5091440, 0 1.5px 0 0 #fff2;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: popInModal 0.32s cubic-bezier(.4,0,.2,1);
  transition: box-shadow 0.22s;
  z-index: 1;
  overflow: hidden;
}
.login-modal::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 22px;
  padding: 0;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(120deg, #e50914 0%, #b0060f 100%);
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box, 
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 2.5px solid transparent;
  pointer-events: none;
}
.login-modal > * {
  position: relative;
  z-index: 3;
}
@keyframes popInModal {
  from { transform: scale(0.92); opacity: 0.7; }
  to { transform: scale(1); opacity: 1; }
}

.close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 44px;
  height: 44px;
  background: rgba(229,9,20,0.12);
  color: #e50914;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.22s, color 0.22s, transform 0.18s, box-shadow 0.22s;
  box-shadow: 0 2px 8px #e5091440;
  z-index: 2;
  outline: none;
  padding: 0;
  line-height: 1;
}
.close-x {
  font-size: 2rem;
  display: block;
  transition: transform 0.22s cubic-bezier(.4,0,.2,1), color 0.22s;
  color: #e50914;
  text-shadow: 0 2px 8px #e5091440;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 44px;
}
.close-btn:hover, .close-btn:focus {
  background: #e50914;
  box-shadow: 0 4px 16px #e5091440;
  outline: none;
}
.close-btn:hover .close-x, .close-btn:focus .close-x {
  color: #fff;
  transform: rotate(90deg) scale(1.08);
  text-shadow: 0 2px 16px #fff8;
}
.close-btn:active .close-x {
  transform: scale(0.95);
}

.login-title {
  color: #fff;
  font-size: 2.1rem;
  font-weight: 900;
  margin-bottom: 1.7rem;
  letter-spacing: 0.01em;
  text-align: center;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 2px 12px #000a;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.icon-field {
  position: relative;
}
.input-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #e50914cc;
  pointer-events: none;
  z-index: 1;
}

.login-input {
  width: 100%;
  padding: 14px 16px 14px 44px;
  border-radius: 14px;
  background: rgba(255,255,255,0.08);
  border: 1.5px solid rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1.08rem;
  outline: none;
  transition: border-color 0.25s, box-shadow 0.25s, background 0.2s;
  font-family: 'Inter', sans-serif;
  box-shadow: 0 1.5px 8px #e5091420;
}
.login-input:focus {
  border-color: #e50914;
  background: rgba(255,255,255,0.13);
  box-shadow: 0 0 0 4px rgba(229,9,20,0.18), 0 1.5px 8px #e5091420;
}
.login-input.with-icon {
  padding-left: 44px;
}

.login-btn {
  width: 100%;
  padding: 15px;
  border-radius: 14px;
  background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
  color: white;
  font-weight: 700;
  font-size: 1.13rem;
  border: none;
  box-shadow: 0 2px 16px #e5091440;
  margin-top: 0.7rem;
  transition: background 0.22s, transform 0.18s, box-shadow 0.22s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  letter-spacing: 0.01em;
}
.login-btn:hover, .login-btn:focus {
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 16px 40px rgba(229,9,20,0.35);
  outline: none;
}
.login-btn:active {
  transform: scale(0.97);
}
.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-error {
  color: #e50914;
  margin-top: 12px;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
  text-shadow: 0 1px 8px #e5091420;
}

.loader {
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 600px) {
  .login-modal {
    min-width: 90vw;
    padding: 1.2rem 4vw 1.2rem 4vw;
    border-radius: 13px;
  }
  .login-modal::before {
    border-radius: 13px;
  }
  .login-title {
    font-size: 1.3rem;
    margin-bottom: 1.1rem;
  }
  .login-btn {
    font-size: 1rem;
    padding: 12px;
    border-radius: 10px;
  }
  .login-input {
    font-size: 0.98rem;
    padding: 12px 12px 12px 40px;
    border-radius: 10px;
  }
  .close-btn {
    width: 36px;
    height: 36px;
    top: 8px;
    right: 8px;
  }
  .close-x {
    line-height: 36px;
  }
  .modal-glow {
    width: 90vw;
    height: 180px;
    filter: blur(32px);
  }
}
</style>