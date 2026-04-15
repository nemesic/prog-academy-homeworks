<template>
  <div class="page">
    <div class="admin-header animate-fade-in">
      <h1>About Movie App</h1>
      <p>
        A modern Vue Netflix-style app with API integration, favorites and admin tools.
      </p>
    </div>
    <section class="grid animate-fade-in">  

      <div class="card animate-fade-in">
        <div class="icon red">i</div>
        <h2>About</h2>
        <p>
          Netflix-inspired movie platform with clean UI and fast performance.
          <br><br>
          <b>Browse, search and manage movies easily.</b>
        </p>
      </div>

      <div class="card">
        <div class="icon yellow">★</div>
        <h2>Features</h2>

        <ul>
          <li>TMDB API integration</li>
          <li>Custom movie creation</li>
          <li>Favorites (localStorage)</li>
          <li>Real-time search</li>
          <li>Admin panel</li>
        </ul>
      </div>

      <div class="card">
        <div class="icon blue">⚙</div>
        <h2>Tech Stack</h2>

        <ul>
          <li>Vue 3 + Composition API</li>
          <li>Vue Router</li>
          <li>Tailwind + Glass UI</li>
          <li>Provide / Inject</li>
          <li>TMDB API</li>
        </ul>
      </div>

    </section>

  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 90px 16px 60px;
  color: white;
}

.admin-header {
  margin: 0 auto 2.5rem auto;
  max-width: 48rem;
  background: none;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  text-align: center;
  position: static;
  z-index: 1;
  overflow: visible;
  transition: none;
}
.admin-header h1 {
  font-size: 3.2rem;
  font-weight: 900;
  letter-spacing: 0.4px;
  color: #fff;
  margin-bottom: 0.5rem;
  text-align: center;
}
.admin-header p {
  font-size: 15px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.4px;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}
.admin-header p::after {
  content: "";
  display: block;
  width: 60px;
  height: 2px;
  background: #e50914;
  margin: 12px auto 0;
  border-radius: 2px;
}

.grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.card {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 26px;
  backdrop-filter: blur(18px);
  transition: 0.25s;
}

.card:hover {
  transform: translateY(-6px);
  border-color: rgba(229,9,20,0.5);
  box-shadow: 0 20px 50px rgba(229,9,20,0.15);
}

.icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  margin-bottom: 14px;
}

.red { background: #e50914; }
.yellow { background: #fbbf24; color: black; }
.blue { background: #3b82f6; }

.card h2 {
  font-size: 18px;
  font-weight: 800;
  margin-bottom: 10px;
}

.card p {
  opacity: 0.85;
  font-size: 14px;
  line-height: 1.6;
}

ul {
  margin-top: 10px;
  padding-left: 0;
  list-style: none;
}

li {
  padding: 6px 0;
  opacity: 0.85;
  font-size: 14px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 32px;
  }
}

.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(.4,0,.2,1);
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>