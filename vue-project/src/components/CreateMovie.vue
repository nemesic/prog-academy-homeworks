<template>
  <form 
    @submit.prevent="handleSubmit" 
    class="create-form bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-[320px] mx-auto text-white"
  >
    <h3 class="text-xl font-bold text-white mb-6 text-center tracking-wide">ADD NEW MOVIE</h3>

    <div class="space-y-5">
      <div>
        <input
          type="text"
          required
          placeholder="Movie title"
          v-model.trim="title"
          @input="titleError = ''"
          class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/50 focus:border-red-600 focus:outline-none transition-all"
          :class="{ 'border-red-600 bg-red-950/30': titleError }"
        />
        <span v-if="titleError" class="error-msg text-red-500 text-sm mt-1.5 block font-medium">
          {{ titleError }}
        </span>
      </div>

      <div>
        <input
          type="url"
          required
          placeholder="Image URL"
          v-model.trim="img"
          @input="imgError = ''"
          class="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-3.5 text-white placeholder:text-white/50 focus:border-red-600 focus:outline-none transition-all"
          :class="{ 'border-red-600 bg-red-950/30': imgError }"
        />
        <span v-if="imgError" class="error-msg text-red-500 text-sm mt-1.5 block font-medium">
          {{ imgError }}
        </span>
      </div>
    </div>

    <button 
      type="submit"
      class="mt-8 w-full bg-red-600 hover:bg-red-700 active:bg-red-800 transition-all font-bold py-4 rounded-xl text-lg shadow-lg shadow-red-600/40"
    >
      ADD MOVIE
    </button>
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

  if (!title.value.trim()) {
    titleError.value = 'Title is required'
    valid = false
  }
  if (!img.value.trim()) {
    imgError.value = 'Image URL is required'
    valid = false
  } else if (!isValidUrl(img.value)) {
    imgError.value = 'Enter a valid URL'
    valid = false
  }

  if (!valid) return

  const newMovie = {
    id: 'custom-' + Date.now(),
    title: title.value.trim(),
    img: img.value.trim(),
  }

  emit('add-movie', newMovie)

  title.value = ''
  img.value = ''
  titleError.value = ''
  imgError.value = ''
}
</script>