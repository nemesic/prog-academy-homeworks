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


<style scoped>
.open-modal-btn-loadmore {
  padding: 1.18rem 2.7rem;
  min-width: 190px;
  background: linear-gradient(90deg, #e50914 60%, #ff3c3c 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.13rem;
  border: none;
  border-radius: 16px;
  box-shadow: 0 2px 12px #e5091440;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s, transform 0.13s;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-bottom: 2.5rem;
  line-height: 1.2;
}
.open-modal-btn-loadmore:hover, .open-modal-btn-loadmore:focus {
  background: linear-gradient(90deg, #ff3c3c 60%, #e50914 100%);
  box-shadow: 0 4px 24px #e5091440;
  transform: scale(1.04);
}
.open-modal-btn-loadmore:active {
  transform: scale(0.97);
}
.modal-overlay-simple {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.18);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-simple {
  background: rgba(40, 44, 52, 0.72);
  border-radius: 18px;
  box-shadow: 0 8px 32px #0004, 0 2px 8px #e5091440;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  min-width: 320px;
  max-width: 95vw;
  max-height: 90vh;
  overflow-y: auto;
  border: 1.5px solid rgba(255,255,255,0.13);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(14px);
}
.modal-title-simple {
  color: #fff;
  font-size: 1.7rem;
  font-weight: 900;
  margin-bottom: 1.2rem;
  letter-spacing: 0.01em;
  text-align: center;
}
.modal-close-btn-simple {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 38px;
  height: 38px;
  background: #f3f3f3;
  color: #e50914;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  box-shadow: 0 2px 8px #e5091440;
  z-index: 2;
  outline: none;
  padding: 0;
  line-height: 1;
  font-size: 1.5rem;
}
.modal-close-btn-simple:hover, .modal-close-btn-simple:focus {
  background: #e50914;
  color: #fff;
}
.post-card-simple {
  background: rgba(60, 64, 72, 0.82);
  border-radius: 12px;
  box-shadow: 0 1.5px 8px #e5091420;
  padding: 1.2rem 1rem 1rem 1rem;
  margin-bottom: 1.2rem;
  width: 100%;
  border: 1.5px solid rgba(255,255,255,0.10);
  backdrop-filter: blur(8px);
}
.comments-btn-simple {
  min-width: 140px;
  background: #e50914;
  color: #fff;
  font-weight: 700;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  padding: 10px 22px;
  box-shadow: 0 2px 8px #e5091440;
  cursor: pointer;
  transition: background 0.13s, box-shadow 0.13s;
  outline: none;
  display: inline-block;
}
.comments-btn-simple:hover:not(:disabled), .comments-btn-simple:focus:not(:disabled) {
  background: #b0060f;
  box-shadow: 0 4px 16px #e5091440;
}
.comments-btn-simple:active {
  background: #a0000f;
}
.comments-btn-simple:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.comments-list-simple {
  background: rgba(50, 54, 62, 0.85);
  border-radius: 10px;
  box-shadow: 0 2px 8px #e5091420;
  margin-top: 0.5rem;
  border: 1.2px solid rgba(255,255,255,0.09);
  padding: 1rem 0.8rem 0.7rem 0.8rem;
  width: 100%;
  backdrop-filter: blur(6px);
}
.comment-item-simple {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #f3f3f3;
}
.comment-item-simple:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.comment-avatar-simple {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #e50914;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px #e5091440;
  margin-top: 2px;
  flex-shrink: 0;
  letter-spacing: 1px;
}
.comment-content-simple {
  flex: 1;
}
.modal-fade-enter-active, .modal-fade-leave-active {
  transition: opacity 0.38s cubic-bezier(.4,0,.2,1);
}
.modal-fade-enter-from, .modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-to, .modal-fade-leave-from {
  opacity: 1;
}
.post-card-glass {
  background: rgba(35, 39, 47, 0.82);
  border-radius: 22px;
  padding: 2.2rem 1.5rem 1.5rem 1.5rem;
  box-shadow: 0 8px 32px #0004, 0 2px 8px #e5091440;
  backdrop-filter: blur(8px);
  border: 1.5px solid rgba(255,255,255,0.13);
  margin-bottom: 2.2rem;
  transition: box-shadow 0.22s;
}
.post-card-glass:hover {
  box-shadow: 0 12px 48px #e5091440, 0 2px 8px #fff2;
}
.comments-btn-glass {
  min-width: 180px;
  background: linear-gradient(90deg, #e50914 60%, #ff3c3c 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.08rem;
  border: none;
  border-radius: 12px;
  padding: 12px 28px;
  box-shadow: 0 2px 12px #e5091440;
  cursor: pointer;
  transition: background 0.18s, box-shadow 0.18s, transform 0.13s;
  outline: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
.comments-btn-glass:hover:not(:disabled), .comments-btn-glass:focus:not(:disabled) {
  background: linear-gradient(90deg, #ff3c3c 60%, #e50914 100%);
  box-shadow: 0 4px 24px #e5091440;
  transform: scale(1.04);
}
.comments-btn-glass:active {
  transform: scale(0.97);
}
.comments-btn-glass:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.comments-list-glass {
  background: rgba(24, 26, 32, 0.92);
  border-radius: 18px;
  padding: 1.5rem 1.1rem 1.1rem 1.1rem;
  box-shadow: 0 4px 24px #e5091420;
  margin-top: 0.5rem;
  border: 1.2px solid rgba(255,255,255,0.09);
}
.comment-item-glass {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #2a2d36;
  animation: fadeInComment 0.7s;
}
.comment-item-glass:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.comment-avatar-glass {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: #fff;
  font-size: 1.5rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px #e5091440;
  margin-top: 2px;
  flex-shrink: 0;
  letter-spacing: 1px;
}
.comment-content-glass {
  flex: 1;
}
@keyframes fadeInComment {
  0% { opacity: 0; transform: translateY(18px) scale(0.97); }
  80% { opacity: 1; transform: translateY(-4px) scale(1.04); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
.fade-glass-enter-active, .fade-glass-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,0,.2,1);
}
.fade-glass-enter-from, .fade-glass-leave-to {
  opacity: 0;
}
.fade-glass-enter-to, .fade-glass-leave-from {
  opacity: 1;
}
.fade-comment-enter-active, .fade-comment-leave-active {
  transition: all 0.7s cubic-bezier(.4,0,.2,1);
}
.fade-comment-enter-from, .fade-comment-leave-to {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}
.fade-comment-enter-to, .fade-comment-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>