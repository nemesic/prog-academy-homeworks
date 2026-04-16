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
<style>@import '../assets/Contact.css'; </style>