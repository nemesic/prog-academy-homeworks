<template>
  <form
    @submit.prevent="handleSubmit"
    class="create-form bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 w-full max-w-[320px] mx-auto text-white"
  >
    <h3 class="text-xl font-bold text-white mb-6 text-center tracking-wide">
      ADD NEW MOVIE
    </h3>

    <div class="space-y-5">
      <!-- TITLE -->
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

      <!-- IMAGE -->
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

<style scoped>
.input {
  width: 100%;
  background: rgba(255,255,255,0.10);
  border: 1px solid rgba(255,255,255,0.20);
  border-radius: 12px;
  padding: 14px 18px;
  color: white;
  outline: none;
  transition: 0.2s;
}

.input:focus {
  border-color: #e50914;
  background: rgba(255,255,255,0.13);
  box-shadow: 0 0 0 4px rgba(229,9,20,0.25);
}

.input.error {
  border-color: #ef4444;
  background: rgba(127,0,0,0.2);
}

.error-msg {
  display: block;
  margin-top: 6px;
  font-size: 13px;
  color: #ef4444;
  font-weight: 500;
}

.btn {
  margin-top: 24px;
  width: 100%;
  background: #e50914;
  padding: 14px;
  border-radius: 12px;
  font-weight: 800;
  transition: 0.2s;
}

.btn:hover {
  background: #ff2a2a;
  transform: translateY(-1px);
}
</style>