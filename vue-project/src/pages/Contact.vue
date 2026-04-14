<template>
  <div class="admin-page contact-page min-h-screen pt-20 pb-16 px-4 text-white">
    <transition name="toast-fade-slide">
      <div
        v-if="success"
        class="success-box price-toast"
        role="status"
        aria-live="polite"
        style="top: 32px; left: 50%; transform: translateX(-50%); position: fixed; z-index: 99999;"
      >
        <span class="checkmark">✔</span>
        <span>Message sent successfully!</span>
      </div>
    </transition>

    <div class="admin-header mx-auto max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-12 shadow-2xl animate-fade-in">
      <h1 class="text-5xl md:text-6xl font-black tracking-wide leading-none mb-6">
        Get in Touch
      </h1>
      <p class="text-lg text-white/70">
        We’d love to hear from you! Fill out the form and our team will get back to you soon.
      </p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="contact-form glass-card w-full max-w-lg mx-auto flex flex-col gap-7 px-8 py-10 rounded-2xl shadow-xl transition-all duration-300 hover:shadow-[0_8px_36px_#e5091422,0_0_0_4px_#e5091422] hover:border-red-600 focus-within:shadow-[0_8px_36px_#e5091422,0_0_0_4px_#e5091422] focus-within:border-red-600 animate-fade-in"
      autocomplete="on"
    >
      <div class="flex flex-col gap-2">
        <label class="font-semibold text-white/80 text-left mb-1" for="name">Name</label>
        <input
          v-model="form.name"
          id="name"
          name="name"
          autocomplete="name"
          aria-label="Name"
          autofocus
          @input="errors.name = ''"
          :class="inputClass(errors.name)"
          placeholder="Your name"
        />
        <transition name="fade-error">
          <span v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</span>
        </transition>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold text-white/80 text-left mb-1" for="email">Email</label>
        <input
          v-model="form.email"
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          aria-label="Email"
          @input="errors.email = ''"
          :class="inputClass(errors.email)"
          placeholder="you@email.com"
        />
        <transition name="fade-error">
          <span v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</span>
        </transition>
      </div>
      <div class="flex flex-col gap-2">
        <label class="font-semibold text-white/80 text-left mb-1" for="message">Message</label>
        <textarea
          v-model="form.message"
          id="message"
          name="message"
          rows="5"
          autocomplete="off"
          aria-label="Message"
          @input="errors.message = ''"
          :class="inputClass(errors.message, true)"
          placeholder="Type your message..."
        />
        <transition name="fade-error">
          <span v-if="errors.message" class="text-red-500 text-xs mt-1">{{ errors.message }}</span>
        </transition>
      </div>
      <button
        type="submit"
        class="contact-btn w-full mt-2 py-3 rounded-xl font-bold text-lg bg-red-600 hover:bg-red-700 shadow-lg text-white transition-all duration-300 hover:scale-[1.07] hover:shadow-[0_8px_28px_#e5091440,0_0_0_3px_#fff5] focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden animate-btn-pop"
      >
        Send Message
      </button>
    </form>
    <br>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({})
const success = ref(false)

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate() {
  errors.name = !form.name ? 'Required' : ''
  errors.email = !validateEmail(form.email) ? 'Invalid email' : ''
  errors.message = form.message.length < 10 ? 'Min 10 chars' : ''
  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validate()) return

  success.value = true
  form.name = ''
  form.email = ''
  form.message = ''

  setTimeout(() => success.value = false, 2200)
}

function inputClass(error, isTextarea = false) {
  return [
    'transition-all duration-300',
    'rounded-xl',
    'bg-white/10',
    'border',
    error ? 'border-red-500' : 'border-white/20',
    'focus:border-red-600',
    'focus:bg-white/15',
    'focus:ring-2',
    'focus:ring-red-600/30',
    'focus:outline-none',
    'text-white',
    'placeholder-white/40',
    'shadow-inner',
    isTextarea ? 'resize-y min-h-[120px] max-h-[320px]' : 'h-12',
    'px-4',
    'py-2',
    'text-base',
    'font-medium',
    'outline-none',
    'hover:scale-[1.03]',
    'focus:scale-[1.04]'
  ].join(' ')
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.92); }
  80% { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(.4,0,.2,1);
}
.animate-pop-in {
  animation: pop-in 0.5s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-active, .toast-fade-slide-leave-active {
  transition: opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-from, .toast-fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(-24px);
}
.toast-fade-slide-enter-to, .toast-fade-slide-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.success-box.price-toast {
  min-width: 180px;
  max-width: 90vw;
  background: rgba(0,0,0,0.92);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(229,9,20,0.13);
  padding: 18px 32px 14px 32px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #e50914;
  opacity: 1;
  box-shadow: 0 8px 36px #e5091440;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
}
.success-box .checkmark {
  font-size: 24px;
  color: limegreen;
  margin-right: 8px;
  filter: drop-shadow(0 0 6px #34d39944);
}

.contact-page {
  min-height: 100vh;
  padding: 0 16px 60px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.2rem;
  color: #fff;
}
@media (min-width: 768px) {
  .contact-page {
    justify-items: center;
    align-items: start;
  }
}

.glass-card {
  background: linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(24,24,28,0.85) 100%);
  border: 2.5px solid rgba(255,255,255,0.10); 
  box-shadow: 0 4px 32px rgba(229,9,20,0.10), 0 1.5px 8px rgba(229,9,20,0.08);
  backdrop-filter: blur(18px);
  border-radius: 1.5rem;
  transition-property: box-shadow, border, transform !important;
  transition-duration: 0.5s, 0.5s, 0.5s !important;
  transition-timing-function: cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1) !important;
  will-change: transform, box-shadow, border;
}

.admin-header {
  margin: 0 auto 2.5rem auto !important;
  padding: 2.5rem 2rem 2rem !important;
  border-radius: 1.5rem;
  text-align: center;
  background: linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(24,24,28,0.85) 100%);
  box-shadow: 0 4px 32px rgba(229,9,20,0.10), 0 1.5px 8px rgba(229,9,20,0.08);
  border: 2.5px solid rgba(255,255,255,0.10); /* збільшено товщину бордера */
  backdrop-filter: blur(18px);
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition-property: box-shadow, border, transform !important;
  transition-duration: 0.5s, 0.5s, 0.5s !important;
  transition-timing-function: cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1) !important;
  will-change: transform, box-shadow, border;
}

.contact-form {
  width: 100%;
  max-width: 710px;
  padding: 2rem;
  display: flex;
  flex-direction: column; 
  gap: 18px;
  border: 2.5px solid rgba(255,255,255,0.10); /* збільшено товщину бордера */
  transition-property: box-shadow, border, transform !important;
  transition-duration: 0.5s, 0.5s, 0.5s !important;
  transition-timing-function: cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1) !important;
  will-change: transform, box-shadow, border;
}

input, textarea {
  transition: box-shadow 0.32s, border 0.32s, background 0.32s, transform 0.32s;
  border-radius: 1rem;
  background: rgba(255,255,255,0.10);
  border: 1.5px solid rgba(255,255,255,0.20);
  color: #fff;
  font-size: 1rem;
  font-weight: 500;
  outline: none;
  padding: 0.75rem 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04) inset;
}
input:focus, textarea:focus {
  border-color: #e50914;
  background: rgba(255,255,255,0.13);
  box-shadow: 0 0 0 5px rgba(229,9,20,0.22);
  transform: scale(1.03);
}
textarea:focus {
  min-height: 130px;
}
input::placeholder, textarea::placeholder {
  color: #fff6;
  opacity: 1;
}

.contact-btn {
  margin-top: 10px;
  padding: 12px;
  border-radius: 14px;
  font-weight: 800;
  background: linear-gradient(90deg, #e50914, #b0060f);
  color: #fff;
  transition: background 0.22s, transform 0.22s, box-shadow 0.22s, filter 0.22s, outline 0.22s, border-color 0.22s;
  animation: btn-pop 1.1s cubic-bezier(.4,0,.2,1);
}
@keyframes btn-pop {
  0% { opacity: 0; transform: scale(0.93);}
  60% { opacity: 1; transform: scale(1.09);}
  100% { opacity: 1; transform: scale(1);}
}
.contact-btn:hover,
.contact-btn:focus-visible {
  box-shadow: 0 14px 40px rgba(229,9,20,0.35), 0 0 0 4px #fff5;
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
  outline: 2.5px solid #fff8;
  filter: brightness(1.09) drop-shadow(0 0 10px #e5091440);
}
.contact-btn:active {
  filter: brightness(0.97);
}

@media (max-width: 600px) {
  .glass-card,
  .admin-header,
  .contact-form {
    border-radius: 1rem;
    padding: 1.2rem 0.7rem 1rem 0.7rem !important;
    border: 2.5px solid rgba(255,255,255,0.10) !important;
    transition-property: box-shadow, border, transform !important;
    transition-duration: 0.5s, 0.5s, 0.5s !important;
    transition-timing-function: cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1) !important;
    will-change: transform, box-shadow, border;
  }
  .admin-header h1 {
    font-size: 1.7rem;
  }
  .admin-header p::after {
    width: 38px;
    height: 2px;
    margin: 10px auto 0;
  }
}
@media (max-width: 400px) {
  .admin-header p::after {
    width: 28px;
    height: 2px;
    margin: 8px auto 0;
  }
}

.text-red-500 {
  font-size: 12px;
  margin-top: 4px;
}

.bg-blur {
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  background: rgba(18,18,22,0.82);
}
</style>