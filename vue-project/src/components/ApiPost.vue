<template>
  <section class="post-section py-12 animate-fade-in">
    <div class="content-wrapper mx-auto px-4 md:px-10 max-w-2xl flex flex-col items-center">
      <button @click="showModal = true" class="open-modal-btn-loadmore">
        <i class="fa-solid fa-newspaper mr-2"></i>
        Open Post
      </button>
      <teleport to="body">
        <div v-if="showModal" class="modal-overlay-simple">
          <div class="modal-simple">
            <button class="modal-close-btn-simple" @click="showModal = false" aria-label="Close modal">&times;</button>
            <h2 class="modal-title-simple">API Post Example</h2>
            <div v-if="loadingPost" class="text-gray-700 text-center py-8">Loading post...</div>
            <div v-if="!loadingPost && post" class="post-card-simple">
              <h3 class="text-lg font-bold text-gray-900 mb-2">{{ post.title }}</h3>
              <p class="text-gray-800 mb-5 text-base">{{ post.body }}</p>
              <button @click="fetchComments" :disabled="loadingComments" class="comments-btn-simple">
                {{ loadingComments ? 'Loading comments...' : 'Show Comments' }}
              </button>
            </div>
            <div v-if="comments.length" class="comments-list-simple">
              <h4 class="text-base font-bold text-gray-900 mb-3">Comments</h4>
              <ul>
                <li v-for="c in comments" :key="c.id" class="comment-item-simple">
                  <div class="comment-avatar-simple">{{ c.email.charAt(0).toUpperCase() }}</div>
                  <div class="comment-content-simple">
                    <div class="text-gray-900 font-semibold">{{ c.name }}</div>
                    <div class="text-gray-500 text-xs mb-1">{{ c.email }}</div>
                    <div class="text-gray-700">{{ c.body }}</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </teleport>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'

const post = ref(null)
const comments = ref([])
const loadingPost = ref(true)
const loadingComments = ref(false)
const showModal = ref(false)

async function fetchPost() {
  loadingPost.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    post.value = await res.json()
  } finally {
    loadingPost.value = false
  }
}

async function fetchComments() {
  if (loadingComments.value) return
  loadingComments.value = true
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
    comments.value = await res.json()
  } finally {
    loadingComments.value = false
  }
}

onMounted(fetchPost)
</script>

<style>@import '../assets/ApiPost.css'; </style>