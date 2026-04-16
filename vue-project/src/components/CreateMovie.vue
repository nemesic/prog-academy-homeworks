<template>
  <form
    @submit.prevent="handleSubmit"
    class="create-form bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-[320px] mx-auto text-white"
  >
    <h3 class="text-xl font-bold text-white mb-6 text-center tracking-wide">
      ADD NEW MOVIE
    </h3>

    <div class="space-y-5">
      <div>
        <input
          v-model.trim="form.title"
          type="text"
          placeholder="Movie title"
          class="input"
          :class="{ error: errors.title }"
          @input="errors.title = ''"
        />
        <span v-if="errors.title" class="error-msg">
          {{ errors.title }}
        </span>
      </div>

      <div>
        <input
          v-model.trim="form.img"
          type="url"
          placeholder="Image URL"
          class="input"
          :class="{ error: errors.img }"
          @input="errors.img = ''"
        />
        <span v-if="errors.img" class="error-msg">
          {{ errors.img }}
        </span>
      </div>
    </div>

    <button type="submit" class="btn">
      ADD MOVIE
    </button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['add-movie'])

const form = reactive({
  title: '',
  img: ''
})

const errors = reactive({
  title: '',
  img: ''
})

function isValidUrl(url) {
  try {
    return Boolean(new URL(url))
  } catch {
    return false
  }
}

function validate() {
  let ok = true

  if (!form.title.trim()) {
    errors.title = 'Title is required'
    ok = false
  }

  if (!form.img.trim()) {
    errors.img = 'Image URL is required'
    ok = false
  } else if (!isValidUrl(form.img)) {
    errors.img = 'Enter valid URL'
    ok = false
  }

  return ok
}

function resetForm() {
  form.title = ''
  form.img = ''
  errors.title = ''
  errors.img = ''
}

function handleSubmit() {
  if (!validate()) return

  emit('add-movie', {
    id: `custom-${Date.now()}`,
    title: form.title.trim(),
    img: form.img.trim()
  })

  resetForm()
}
</script>

<style>@import '../assets/CreateMovie.css'; </style>