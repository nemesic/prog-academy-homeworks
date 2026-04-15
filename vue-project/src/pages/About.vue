<template>
  <div class="page">

    <!-- HEADER -->
    <section class="header">
      <h1>About Movie App</h1>
      <p>
        A modern Vue Netflix-style app with API integration, favorites and admin tools.
      </p>
    </section>

    <!-- GRID -->
    <section class="grid">

      <div class="card">
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
/* PAGE */
.page {
  min-height: 100vh;
  padding: 90px 16px 60px;
  color: white;
}

/* HEADER */
.header {
  max-width: 720px;
  margin: 0 auto 40px;
  text-align: center;
}

.header h1 {
  font-size: 44px;
  font-weight: 900;
}

.header p {
  margin-top: 10px;
  opacity: 0.7;
  font-size: 16px;
  line-height: 1.6;
}

/* GRID */
.grid {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

/* CARD */
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

/* ICON */
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

/* TEXT */
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

/* LIST */
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

/* RESPONSIVE */
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .header h1 {
    font-size: 32px;
  }
}
</style>