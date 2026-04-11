<template>
  <form class="create-form" @submit.prevent="handleSubmit" novalidate>
    <h3>ADD NEW MOVIE</h3>
    <input
      type="text"
      required
      placeholder="Movie title"
      v-model.trim="title"
      :class="{ 'input-error': titleError }"
      @input="titleError = ''"
    />
    <span v-if="titleError" class="error-msg">{{ titleError }}</span>
    <input
      type="url"
      required
      placeholder="Image URL"
      v-model.trim="img"
      :class="{ 'input-error': imgError }"
      @input="imgError = ''"
    />
    <span v-if="imgError" class="error-msg">{{ imgError }}</span>
    <button type="submit">ADD MOVIE</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-movie'])

const title = ref('')
const img = ref('')
const titleError = ref('')
const imgError = ref('')

function isValidUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

function handleSubmit() {
  let valid = true
  if (!title.value) {
    titleError.value = 'Title is required'
    valid = false
  }
  if (!img.value) {
    imgError.value = 'Image URL is required'
    valid = false
  } else if (!isValidUrl(img.value)) {
    imgError.value = 'Enter a valid URL'
    valid = false
  }
  if (!valid) return

  const newMovie = {
    id: 'custom-' + Date.now(),
    title: title.value,
    img: img.value,
  }
  emit('add-movie', newMovie)
  title.value = ''
  img.value = ''
}
</script>

<style scoped>
.input-error {
  border-color: #e50914 !important;
  background: rgba(229,9,20,0.08);
}
.error-msg {
  color: #e50914;
  font-size: 13px;
  margin-bottom: 6px;
  display: block;
  font-weight: 500;
}
</style>