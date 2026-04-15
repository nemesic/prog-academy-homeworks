<template>
  <div class="notfound-page animate-404-in">
    <div class="notfound-illustration">
      <div class="emoji-avatar-center">
        <span class="emoji-404 pulse-emoji" aria-label="sad face" tabindex="0">😕</span>
      </div>
      <div class="emoji-caption">Oops! Lost?</div>
    </div>
    <h1>404</h1>
    <p class="notfound-text">Oops! Page Not Found</p>
    <router-link to="/" class="back-btn">Back to Home</router-link>
    <div class="notfound-hint">The page you are looking for does not exist or was moved.</div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.notfound-page {
  max-width: 420px;
  margin: 60px auto 0 auto;
  padding: 38px 22px 32px 22px;
  background: linear-gradient(120deg, #19191d 80%, #e5091420 100%);
  border-radius: 22px;
  color: #fff;
  box-shadow: 0 8px 32px #e5091440, 0 2px 8px #fff2;
  text-align: center;
  position: relative;
  animation: notfound-in 0.7s cubic-bezier(.4,0,.2,1);
}
.notfound-illustration {
  margin-bottom: 18px;
  animation: bounce404 1.1s cubic-bezier(.4,0,.2,1);
}
.notfound-page h1 {
  font-size: 3.2rem;
  color: #e50914;
  margin-bottom: 10px;
  font-weight: 900;
  letter-spacing: 0.04em;
}
.notfound-text {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 18px;
  font-weight: 600;
}
.back-btn {
  display: inline-block;
  margin-top: 10px;
  padding: 8px 22px;
  background: #e50914;
  color: #fff;
  border-radius: 8px;
  font-size: 1.08rem;
  font-weight: 600;
  text-decoration: none;
  box-shadow: 0 2px 12px #e5091440;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  border: none;
}
.back-btn:hover, .back-btn:focus {
  background: #fff;
  color: #e50914;
  box-shadow: 0 0 0 4px #e5091440;
  transform: scale(1.06);
  outline: none;
}
.emoji-avatar-center {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
}
.emoji-404 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 4.2rem;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(135deg, #fffbe6 60%, #e5091420 100%);
  box-shadow: 0 4px 24px #e5091440, 0 2px 8px #fff2;
  border: 3px solid #e50914;
  margin: 0 auto 8px auto;
  animation: bounce404 1.1s cubic-bezier(.4,0,.2,1);
  user-select: none;
  backdrop-filter: blur(6px) saturate(1.1);
  transition: transform 0.18s, box-shadow 0.18s;
  cursor: pointer;
}
.emoji-404:hover, .emoji-404:focus {
  transform: rotate(-8deg) scale(1.09);
  box-shadow: 0 0 0 8px #e5091440, 0 2px 24px #e5091440;
  outline: none;
}
.pulse-emoji {
  animation: pulse404 1.8s infinite alternate cubic-bezier(.4,0,.2,1);
}
.emoji-caption {
  color: #e50914;
  font-size: 1.13rem;
  font-weight: 700;
  margin-bottom: 10px;
  letter-spacing: 0.01em;
  text-shadow: 0 2px 8px #e5091440;
}
@keyframes pulse404 {
  0% { filter: brightness(1) scale(1); }
  100% { filter: brightness(1.13) scale(1.08); }
}
.notfound-hint {
  margin-top: 18px;
  color: #fff8;
  font-size: 1.02rem;
  font-style: italic;
}
@keyframes notfound-in {
  0% { opacity: 0; transform: scale(0.93) translateY(32px); }
  60% { opacity: 1; transform: scale(1.04) translateY(-8px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes bounce404 {
  0% { transform: scale(0.7) translateY(18px); }
  60% { transform: scale(1.08) translateY(-4px); }
  100% { transform: scale(1) translateY(0); }
}
@media (max-width: 600px) {
  .notfound-page {
    max-width: 98vw;
    padding: 18px 2vw 18px 2vw;
    border-radius: 13px;
  }
  .notfound-illustration svg {
    width: 64px;
    height: 64px;
  }
  .notfound-page h1 {
    font-size: 2.1rem;
  }
  .notfound-text {
    font-size: 1.05rem;
  }
  .back-home {
    font-size: 1rem;
    padding: 8px 16px;
  }
}
</style>
