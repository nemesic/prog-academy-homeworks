<template>
  <div class="user-profile-card animate-user-in">
    <div class="avatar-block">
      <img class="avatar-img" src="https://randomuser.me/api/portraits/lego/1.jpg" alt="User avatar" />
    </div>
    <h1 class="user-title">User #{{ userId || 'Guest' }}</h1>
    <div class="user-info">
      <div class="info-row"><span class="info-label">ID:</span> <span class="info-value">{{ userId }}</span></div>
      <div class="info-row"><span class="info-label">Status:</span> <span class="info-value">Active</span></div>
    </div>
    <router-link to="/" class="back-btn">Back to Home</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
const userId = route.params.id
</script>
<style>@import '../assets/User.css'; </style>