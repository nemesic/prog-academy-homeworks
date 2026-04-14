<template>
  <div class="admin-page min-h-screen pt-20 pb-16 px-4 text-white from-neutral-950 via-neutral-900 to-neutral-800">
    <div class="admin-header mx-auto max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-14 shadow-2xl animate-fade-in">
      <h1 class="text-5xl md:text-6xl font-black tracking-wide leading-none mb-6 drop-shadow-lg">
        About Movie App
      </h1>
      <p class="text-lg text-white/70 font-medium">
        A modern Netflix-style Vue application with API integration, favorites system and custom movie creation.
      </p>
    </div>
    <div class="admin-content grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <!-- About Card -->
      <div class="admin-card glass-card rounded-2xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 min-h-85">
        <div class="flex items-center justify-center mb-5">
          <span class="icon-circle bg-red-600/90 shadow-lg">
            <i class="fa fa-info-circle text-white text-2xl"></i>
          </span>
        </div>
        <h2 class="text-xl font-bold mb-2 tracking-wide">About</h2>
        <p class="text-white/90 leading-relaxed">
          This project is a Netflix-inspired movie platform.<br><br>
          <strong class="text-white">Browse, search, and manage your favorite movies with a modern UI.</strong>
        </p>
      </div>
      <!-- Features Card -->
      <div class="admin-card glass-card rounded-2xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in delay-100 hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 min-h-85">
        <div class="flex items-center justify-center mb-5">
          <span class="icon-circle bg-amber-400/90 shadow-lg">
            <i class="fa fa-star text-white text-2xl"></i>
          </span>
        </div>
        <h2 class="text-xl font-bold mb-2 tracking-wide">Features</h2>
        <ul class="space-y-2 text-white/90 text-left mx-auto max-w-xs">
          <li class="flex items-center gap-3"><i class="fa fa-check-circle text-emerald-400"></i><span>Movie API (TMDB)</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-check-circle text-emerald-400"></i><span>Add custom movies</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-heart text-red-600"></i><span>Favorites system with localStorage</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-search text-yellow-400"></i><span>Real-time search functionality</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-user-shield text-red-700"></i><span>Admin panel for managing content</span></li>
        </ul>
      </div>
      <!-- Tech Stack Card -->
      <div class="admin-card glass-card rounded-2xl p-8 shadow-lg flex flex-col items-center text-center animate-fade-in delay-200 hover:scale-[1.04] hover:shadow-2xl transition-all duration-300 min-h-85">
        <div class="flex items-center justify-center mb-5">
          <span class="icon-circle bg-blue-500/90 shadow-lg">
            <i class="fa fa-cubes text-white text-2xl"></i>
          </span>
        </div>
        <h2 class="text-xl font-bold mb-2 tracking-wide">Tech Stack</h2>
        <ul class="space-y-2 text-white/90 text-left mx-auto max-w-xs">
          <li class="flex items-center gap-3"><i class="fa fa-vuejs text-[#42b883]"></i><span>Vue 3 + Composition API</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-route text-gray-400"></i><span>Vue Router</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-plug text-gray-400"></i><span>Provide / Inject API</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-paint-brush text-red-600"></i><span>Tailwind CSS + Glass UI</span></li>
          <li class="flex items-center gap-3"><i class="fa fa-cloud text-blue-500"></i><span>TMDB API Integration</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
// ...existing code...
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px);}
  to { opacity: 1; transform: translateY(0);}
}
.animate-fade-in {
  animation: fade-in 0.7s cubic-bezier(.4,0,.2,1);
}
.animate-fade-in.delay-100 { animation-delay: 0.1s; }
.animate-fade-in.delay-200 { animation-delay: 0.2s; }

.admin-header {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(24px);
  border: 1.5px solid rgba(255,255,255,0.10);
  border-radius: 1.5rem;
  box-shadow: 0 8px 36px #e5091440, 0 2px 12px #0001;
  padding: 3.5rem 2rem 3rem 2rem;
  margin-bottom: 3rem;
  text-align: center;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
@media (max-width: 1023px) {
  .admin-header {
    padding: 1.5rem;
    margin-bottom: 2rem;
  }
  .admin-header h1 {
    font-size: 2.1rem;
    margin-bottom: 1rem;
  }
  .admin-header p {
    font-size: 1rem;
  }
}
@media (max-width: 767px) {
  .admin-header {
    padding: 1rem;
    margin-bottom: 1.25rem;
    border-radius: 1rem;
  }
  .admin-header h1 {
    font-size: 1.5rem;
    margin-bottom: 0.7rem;
  }
  .admin-header p {
    font-size: 0.95rem;
  }
}
@media (max-width: 480px) {
  .admin-header {
    padding: 0.7rem;
    margin-bottom: 1rem;
  }
  .admin-header h1 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
  .admin-header p {
    font-size: 0.85rem;
  }
}
.glass-card {
  background: linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(24,24,28,0.85) 100%);
  border: 2.5px solid rgba(255,255,255,0.10); 
  box-shadow: 0 4px 32px rgba(229,9,20,0.10), 0 1.5px 8px rgba(229,9,20,0.08);
  backdrop-filter: blur(18px);
  border-radius: 1.5rem;
  transition-property: box-shadow, border, transform !important;
  transition-duration: 0.5s, 0.5s, 0.5s !important;
  transition-timing-function: cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1), cubic-bezier(.4,0,.2,1) !important;
  will-change: transform, box-shadow, border;
}
.icon-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 9999px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.12);
}
.admin-card {
  /* Ensure all cards have the same min height and spacing */
  min-height: 340px;
  padding: 2rem;
  background-clip: padding-box;
}
@media (max-width: 900px) {
  .admin-content {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  .admin-card {
    min-height: 220px !important;
    padding: 1.2rem 0.7rem 1rem 0.7rem !important;
  }
  .icon-circle {
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>