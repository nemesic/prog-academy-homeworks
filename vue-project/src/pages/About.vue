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
<style>@import '../assets/About.css'; </style>