<template>
  <div class="contact-page">
    <!-- SUCCESS ANIMATION -->
    <transition name="pop">
      <div v-if="success" class="success-box">
        <div class="checkmark">✔</div>
        <p>Message sent successfully!</p>
      </div>
    </transition>
    <div class="contact-header glass-card">
      <h1>Contact Us</h1>
      <p>We usually respond within 24 hours</p>
    </div>
    <form class="contact-form glass-card" @submit.prevent="handleSubmit" autocomplete="on">
      <!-- NAME -->
      <div class="input-box">
        <input
          name="name"
          v-model="form.name"
          autocomplete="name"
          aria-label="Name"
          autofocus
          @input="errors.name = ''"
        />
        <label :class="{ active: form.name }">Name</label>
        <span v-if="errors.name">{{ errors.name }}</span>
      </div>
      <!-- EMAIL -->
      <div class="input-box">
        <input
          name="email"
          v-model="form.email"
          autocomplete="email"
          aria-label="Email"
          @input="errors.email = ''"
        />
        <label :class="{ active: form.email }">Email</label>
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <!-- MESSAGE -->
      <div class="input-box">
        <textarea
          name="message"
          v-model="form.message"
          autocomplete="off"
          aria-label="Message"
          rows="4"
          @input="errors.message = ''"
        />
        <label :class="{ active: form.message }">Message</label>
        <span v-if="errors.message">{{ errors.message }}</span>
      </div>
      <button type="submit" :disabled="submitting || !isFormValid">
        <span v-if="submitting" class="login-spinner" style="margin-right:8px;"></span>
        {{ submitting ? 'Sending...' : 'Send Message' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})
const errors = reactive({})
const success = ref(false)
const submitting = ref(false)

function validateEmail(email) {
  // Простий email pattern
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validate() {
  errors.name = !form.name.trim() ? 'Name is required' : ''
  errors.email = !validateEmail(form.email) ? 'Invalid email' : ''
  errors.message = form.message.length < 10 ? 'Message too short' : ''
  return !errors.name && !errors.email && !errors.message
}

const isFormValid = computed(() => {
  return form.name.trim() && validateEmail(form.email) && form.message.length >= 10
})

function handleSubmit() {
  if (!validate()) return
  submitting.value = true
  setTimeout(() => {
    submitting.value = false
    success.value = true
    form.name = ''
    form.email = ''
    form.message = ''
    setTimeout(() => {
      success.value = false
    }, 2000)
  }, 1200)
}
</script>

<style scoped>
/* ...existing code... */
.login-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  vertical-align: middle;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
.pop-enter-active, .pop-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.pop-enter-to, .pop-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>