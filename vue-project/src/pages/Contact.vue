<template>
  <div class="contact-page min-h-screen pt-20 pb-16 px-4 text-white">
    <transition name="toast">
      <div
        v-if="success"
        class="toast"
        role="status"
        aria-live="polite"
      >
        <span class="toast-icon">✔</span>
        <span>Message sent successfully</span>
      </div>
    </transition>

    <div class="admin-header animate-fade-in">
      <h1>Get in Touch</h1>
      <p>We’d love to hear from you. Send us a message.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="form animate-fade-in">

      <div class="field">
        <label>Name</label>
        <input v-model="form.name" @input="errors.name=''" placeholder="Your name" />
        <small v-if="errors.name">{{ errors.name }}</small>
      </div>

      <div class="field">
        <label>Email</label>
        <input v-model="form.email" @input="errors.email=''" placeholder="you@email.com" />
        <small v-if="errors.email">{{ errors.email }}</small>
      </div>

      <div class="field">
        <label>Message</label>
        <textarea v-model="form.message" @input="errors.message=''" rows="5" />
        <small v-if="errors.message">{{ errors.message }}</small>
      </div>

      <button class="btn" type="submit">
        Send Message
      </button>

    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

const form = reactive({
  name: "",
  email: "",
  message: ""
})

const errors = reactive({})
const success = ref(false)

const validateEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

function validate() {
  errors.name = form.name ? "" : "Name required"
  errors.email = validateEmail(form.email) ? "" : "Invalid email"
  errors.message = form.message.length >= 10 ? "" : "Min 10 characters"

  return !errors.name && !errors.email && !errors.message
}

function handleSubmit() {
  if (!validate()) return

  success.value = true

  form.name = ""
  form.email = ""
  form.message = ""

  setTimeout(() => (success.value = false), 2200)
}
</script>

<style scoped>
/* PAGE */
.contact-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.admin-header {
  margin: 0 auto 2.5rem auto;
  max-width: 48rem;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  text-align: center;
  position: static;
  z-index: 1;
  overflow: visible;
  transition: none;
}
.admin-header h1 {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 0.4px;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
}
.admin-header p {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.4px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}
.admin-header p::after {
  content: "";
  display: block;
  width: 60px;
  height: 2px;
  background: #e50914;
  margin: 12px auto 0;
  border-radius: 2px;
}

.form {
  width: 100%;
  max-width: 520px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(18px);
  border-radius: 18px;
  padding: 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  opacity: 0.7;
}

input, textarea {
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 12px;
  padding: 12px 14px;
  color: white;
  outline: none;
  transition: 0.25s;
}

input:focus, textarea:focus {
  border-color: #e50914;
  box-shadow: 0 0 0 4px rgba(229,9,20,0.25);
}

small {
  color: #ff4d4d;
  font-size: 14px;
} 

.btn {
  margin-top: 6px;
  padding: 12px;
  background: var(--red);
  box-shadow: 0 4px 12px rgba(229, 9, 20, 0.45);
  border: none;
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.25s ease;
  font-size: 0.95rem;
}
.btn:hover {
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 10px 30px rgba(229,9,20,0.35);
  filter: brightness(1.08); 
}

.toast {
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
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99999;
}
.toast-icon {
  font-size: 24px;
  color: limegreen;
  margin-right: 8px;
  filter: drop-shadow(0 0 6px #34d39944);
}

.toast-enter-active,
.toast-leave-active {
  transition: 0.3s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(.4,0,.2,1);
}
</style>  