<template>
  <div class="notfound-page animate-404-in">
    <div class="notfound-illustration">
      <div class="emoji-avatar-center">
        <span class="emoji-404 pulse-emoji" aria-label="sad face" tabindex="0">😕</span>
      </div>
      <div class="emoji-caption">Oops! Lost?</div>
    </div>
    <h1>404</h1>
    <p class="notfound-text">Oops! Page Not Found</p>
    <router-link to="/" class="back-btn">Back to Home</router-link>
    <div class="notfound-hint">The page you are looking for does not exist or was moved.</div>
  </div>
</template>

<script setup>
</script>
<style>@import '../assets/NotFound.css'; </style>