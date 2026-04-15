<template>
  <div class="contact-page min-h-screen pt-20 pb-16 px-4 text-white">

    <!-- Toast -->
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

    <!-- Header -->
    <header class="header">
      <h1>Get in Touch</h1>
      <p>We’d love to hear from you. Send us a message.</p>
    </header>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="form">

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

/* HEADER */
.header {
  text-align: center;
  max-width: 520px;
}

.header h1 {
  font-size: 42px;
  font-weight: 900;
}

.header p {
  opacity: 0.7;
  margin-top: 8px;
}

/* FORM */
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

/* FIELD */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  opacity: 0.7;
}

/* INPUT */
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

/* ERROR */
small {
  color: #ff4d4d;
  font-size: 12px;
}

/* BUTTON */
.btn {
  margin-top: 6px;
  padding: 12px;
  border-radius: 12px;
  font-weight: 700;
  background: linear-gradient(90deg, #e50914, #b0060f);
  transition: 0.25s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(229,9,20,0.35);
}

/* TOAST */
.toast {
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.9);
  border: 1px solid #e50914;
  padding: 14px 22px;
  border-radius: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 600;
}

.toast-icon {
  color: #22c55e;
}

/* ANIMATION */
.toast-enter-active,
.toast-leave-active {
  transition: 0.3s;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>  