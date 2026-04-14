
<template>
  <div class="admin-page min-h-screen pt-20 pb-16 px-4 text-white">
    <transition name="toast-fade-slide">
      <div
        v-if="toast"
        class="success-box price-toast"
        role="status"
        aria-live="polite"
        style="top: 32px; left: 50%; transform: translateX(-50%); position: fixed; z-index: 99999;"
      >
        <span class="checkmark">✔</span>
        <span>{{ toast }}</span>
      </div>
    </transition>

    <div class="admin-header mx-auto max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-12 shadow-2xl animate-fade-in">
      <h1 class="text-5xl md:text-6xl font-black tracking-wide leading-none mb-6">
        Pricing Plans
      </h1>
      <p class="text-lg text-white/70">
        Choose the best plan for your experience
      </p>
    </div>

    <div class="price-grid md:grid md:grid-cols-3 md:gap-8">
      <div
        v-for="p in plans"
        :key="p.key"
        class="price-card glass-card animate-pop-in"
        :class="{
          active: plan === p.key,
          'card-focus': cardFocus === p.key
        }"
        @click="handleSelect(p.key)"
        @focus="cardFocus = p.key"
        @blur="cardFocus = null"
        tabindex="0"
        :aria-label="`${p.name} plan`"
      >
        <span
          v-if="plan === p.key"
          :class="['plan-badge', p.badgeClass]"
          aria-hidden="true"
        >{{ p.badge }}</span>
        <h2>{{ p.name }}</h2>
        <div style="font-size:13px;color:#aaa;margin-bottom:8px;">{{ p.desc }}</div>
        <p class="price">{{ p.price }}</p>
        <ul>
          <li v-for="f in p.features" :key="f">{{ f }}</li>
        </ul>
        <button
          @click.stop="choosePlan(p.key)"
          :aria-label="`Choose ${p.name} plan`"
        >
          Choose
        </button>
      </div>
    </div>

    <div class="compare-plans-section glass-card compare-fade">
      <h2 class="compare-title">Compare plans</h2>
      <div class="compare-table-responsive">
        <table class="compare-table">
          <thead>
            <tr>
              <th></th>
              <th
                v-for="planObj in plans"
                :key="planObj.key"
                :class="{ 'compare-plan-th-highlight': plan === planObj.key }"
              >
                {{ planObj.name }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="feature in features"
              :key="feature.key"
              :class="{ 'compare-row-highlight': featureRowHighlight(feature) }"
            >
              <td>{{ feature.label }}</td>
              <td
                v-for="planObj in plans"
                :key="planObj.key"
                class="center"
                :class="{
                  check: feature.values[planObj.key] === true || feature.values[planObj.key] === '✔',
                  'compare-col-highlight': plan === planObj.key
                }"
              >
                <span v-if="feature.values[planObj.key] === true || feature.values[planObj.key] === '✔'" class="compare-check">&#10003;</span>
                <span v-else-if="feature.values[planObj.key] === false || feature.values[planObj.key] === ''" class="compare-dash">—</span>
                <span v-else class="compare-value">{{ feature.values[planObj.key] }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const plan = ref('standard')
const toast = ref('')
let toastTimeout = null

const cardFocus = ref(null)

const plans = [
  {
    key: 'basic',
    name: 'Basic',
    price: '$5',
    desc: 'For casual viewers',
    features: ['720p Quality', '1 Device', 'Ads included'],
    badge: 'Starter',
    badgeClass: 'badge-starter'
  },
  {
    key: 'standard',
    name: 'Standard',
    price: '$10',
    desc: 'For movie lovers',
    features: ['1080p Quality', '2 Devices', 'No ads'],
    badge: 'Popular',
    badgeClass: 'badge-popular'
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$15',
    desc: 'For families & 4K fans',
    features: ['4K Quality', '4 Devices', 'Offline download'],
    badge: 'Best Value',
    badgeClass: 'badge-premium'
  },
]

const features = [
  { key: 'hd', label: 'HD available', icon: 'fa-solid fa-tv', values: { basic: true, standard: true, premium: true } },
  { key: 'uhd', label: 'Ultra HD', icon: 'fa-solid fa-film', values: { basic: false, standard: false, premium: true } },
  { key: 'devices', label: 'Devices at once', icon: 'fa-solid fa-mobile-screen', values: { basic: 1, standard: 2, premium: 4 } },
  { key: 'noads', label: 'No ads', icon: 'fa-solid fa-ban', values: { basic: false, standard: true, premium: true } },
  { key: 'offline', label: 'Offline download', icon: 'fa-solid fa-download', values: { basic: false, standard: false, premium: true } },
  { key: 'support', label: 'Support', icon: 'fa-solid fa-headset', values: { basic: 'Standard', standard: 'Priority', premium: 'Premium' } }
]

function handleSelect(value) {
  plan.value = value
}
function choosePlan(value) {
  handleSelect(value)
  const name = plans.find(p => p.key === value)?.name || value
  showToast(`${name} plan selected!`)
}

function showToast(msg) {
  toast.value = msg
  clearTimeout(toastTimeout)
  toastTimeout = setTimeout(() => {
    toast.value = ''
  }, 2200)
}

function featureRowHighlight(feature) {
  return feature.values[plan.value] !== false && feature.values[plan.value] !== '' && plan.value;
}
</script>


<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes pop-in {
  0% { opacity: 0; transform: scale(0.92); }
  80% { opacity: 1; transform: scale(1.04); }
  100% { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.6s cubic-bezier(.4,0,.2,1);
}
.animate-pop-in {
  animation: pop-in 0.5s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-active, .toast-fade-slide-leave-active {
  transition: opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1);
}
.toast-fade-slide-enter-from, .toast-fade-slide-leave-to {
  opacity: 0;
  transform: scale(0.85) translateY(-24px);
}
.toast-fade-slide-enter-to, .toast-fade-slide-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
}
.fade-slide-enter-from, .fade-slide-leave-to {
  opacity: 0;
  transform: translateY(32px) scale(0.98);
}
.fade-slide-enter-to, .fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}
.success-box.price-toast {
  min-width: 180px;
  max-width: 90vw;
  background: rgba(0,0,0,0.92);
  color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(229,9,20,0.13);
  padding: 18px 32px 14px 32px;
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  border: 2px solid #e50914;
  opacity: 1;
  box-shadow: 0 8px 36px #e5091440;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7em;
}
.success-box .checkmark {
  font-size: 24px;
  color: limegreen;
  margin-right: 8px;
  filter: drop-shadow(0 0 6px #34d39944);
}
.admin-header {
  margin: 0 auto 2.5rem auto;
  max-width: 48rem;
  background: linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(24,24,28,0.85) 100%);
  border: 1.5px solid rgba(255,255,255,0.10);
  box-shadow: 0 4px 32px rgba(229,9,20,0.10), 0 1.5px 8px rgba(229,9,20,0.08);
  backdrop-filter: blur(18px);
  border-radius: 1.5rem;
  padding: 2.5rem 2rem 2rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  transition: box-shadow 0.5s cubic-bezier(.4,0,.2,1), background 0.5s cubic-bezier(.4,0,.2,1), border 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.4,0,.2,1);
}
.admin-header::before {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  z-index: -1;
  filter: blur(2px) brightness(1.07);
  opacity: 0.85;
  pointer-events: none;
}
.admin-header h1 {
  font-size: 2.5rem;
  font-weight: 900;
  margin-bottom: 0.7em;
  color: #fff;
  letter-spacing: 0.01em;
  font-family: 'Inter', sans-serif;
  text-shadow: 0 4px 12px rgba(0,0,0,0.7);
  line-height: 1;
}
@media (min-width: 768px) {
  .admin-header h1 {
    font-size: 3.5rem;
  }
}
@media (min-width: 1024px) {
  .admin-header h1 {
    font-size: 4rem;
  }
}
.admin-header p {
  font-size: 1.1rem;
  color: #aaa;
  margin: 0;
}

:root {
  --red: #e50914;
  --red-hover: #b0060f;
  --badge-popular: linear-gradient(90deg, #ffe259 0%, #ffa751 100%);
  --badge-premium: #e0f7fa;
  --badge-starter: #f3e8ff;
  --badge-shadow: 0 2px 12px rgba(229,9,20,0.13);
  --anim-fast: 0.32s cubic-bezier(.4,0,.2,1);
  --anim-medium: 0.55s cubic-bezier(.4,0,.2,1);
  --anim-slow: 0.8s cubic-bezier(.4,0,.2,1);
  --table-bg: rgba(30,32,38,0.85);
  --table-border: rgba(255,255,255,0.10);
  --table-row-hover: rgba(229,9,20,0.10); 
  --table-highlight: linear-gradient(90deg, #e5091440 0%, #fff0 100%);
  --table-highlight-col: #e5091422;
  --table-highlight-row: linear-gradient(90deg, #e5091430 0%, #fff0 100%);
  --table-row-alt: rgba(255,255,255,0.03);
}
body, .price-page {
  min-height: 100vh;
}
.price-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.2rem;
  margin-bottom: 2.5rem;
}
@media (min-width: 768px) {
  .price-grid {
    grid-template-columns: repeat(3, 1fr);
    justify-items: center;
  }
}
.price-card {
  min-width: 240px;
  max-width: 320px;
  width: 100%;
  border-radius: 1.2rem;
  background: linear-gradient(120deg, rgba(255,255,255,0.08) 0%, rgba(24,24,28,0.93) 100%);
  border: 1.5px solid rgba(255,255,255,0.11);
  box-shadow: 0 4px 24px rgba(229,9,20,0.10), 0 1.5px 8px 0 rgba(229,9,20,0.08), 0 0 0 0 #e5091440;
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
  cursor: pointer;
  transition:
    box-shadow var(--anim-medium),
    transform var(--anim-medium),
    border var(--anim-medium),
    background var(--anim-medium),
    filter var(--anim-medium);
  will-change: transform, box-shadow, border, background, filter;
}
.price-card:hover,
.price-card:focus-visible,
.price-card.card-focus {
  transform: scale(1.035) translateY(-2px);
  box-shadow: 0 8px 36px #e5091422, 0 0 0 4px #e5091422;
  border-color: var(--red);
  z-index: 2;
}
.price-card:active {
  transform: scale(0.98) translateY(1px);
  box-shadow: 0 2px 8px #e5091422;
}
.price-card.active {
  border: 2px solid var(--red);
  box-shadow: 0 8px 32px rgba(229,9,20,0.22), 0 2px 8px #e5091440;
  transform: scale(1.05) translateY(-4px);
  background: linear-gradient(120deg, rgba(229,9,20,0.10) 0%, rgba(24,24,28,0.85) 100%);
  filter: drop-shadow(0 0 18px #e5091440);
  transition:
    box-shadow var(--anim-medium),
    transform var(--anim-medium),
    border var(--anim-medium),
    background var(--anim-medium),
    filter var(--anim-medium);
}
.plan-badge {
  position: absolute;
  top: -22px;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.42em 1.3em;
  border-radius: 1.5em;
  font-size: 1.08em;
  font-weight: 800;
  letter-spacing: 0.04em;
  box-shadow: 0 4px 24px #ffd70055, 0 1.5px 8px 0 #ffb30033;
  z-index: 2;
  opacity: 0.97;
  pointer-events: none;
  user-select: none;
  border: 2.5px solid #fff7;
  background: #ffe259;
  color: #b06c00;
  text-shadow: 0 2px 8px #fff8, 0 1px 0 #fff;
  filter: drop-shadow(0 0 8px #ffd70088) brightness(1.08);
  animation: badge-pop-in 0.7s cubic-bezier(.4,0,.2,1);
  transition: background 0.3s, color 0.3s, box-shadow 0.3s;
}
.badge-popular {
  background: #ffe259 !important;
  color: #b06c00 !important;
  border-color: #ffe25999 !important;
}
.badge-premium {
  background: #e0f7fa !important;
  color: #00796b;
  border-color: #00796b33;
  text-shadow: 0 2px 8px #fff8;
  filter: drop-shadow(0 0 8px #00bfae44) brightness(1.08);
}
.badge-starter {
  background: #f3e8ff !important;
  color: #7c3aed;
  border-color: #7c3aed33;
  text-shadow: 0 2px 8px #fff8;
  filter: drop-shadow(0 0 8px #7c3aed44) brightness(1.08);
}
@keyframes badge-pop-in {
  0% { opacity: 0; transform: translateX(-50%) scale(0.7);}
  60% { opacity: 1; transform: translateX(-50%) scale(1.18);}
  100% { opacity: 0.97; transform: translateX(-50%) scale(1);}
}
.price-card h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.3em;
  color: #fff;
  letter-spacing: 0.01em;
}
.price-card .price {
  font-size: 2.1rem;
  color: var(--red);
  font-weight: 800;
  margin: 0.7em 0 1.2em 0;
  letter-spacing: 0.02em;
}
.price-card ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.1em 0;
  flex: 1 1 auto;
}
.price-card li {
  margin-bottom: 0.5em;
  color: #fff;
  opacity: 0.93;
  font-size: 1.05em;
}
.price-card button {
  margin-top: 0.8em;
  padding: 0.85em 0;
  background: linear-gradient(90deg, #e50914 0%, #b0060f 100%);
  color: #fff;
  font-weight: 700;
  border: none;
  border-radius: 1.1em;
  font-size: 1.08em;
  box-shadow: 0 2px 12px #e5091440, 0 0.5px 2px #fff2;
  position: relative;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  z-index: 1;
  transition:
    background var(--anim-fast),
    transform var(--anim-fast),
    box-shadow var(--anim-fast),
    filter var(--anim-fast),
    outline var(--anim-fast),
    border-color var(--anim-fast);
}
.price-card button::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 1.1em;
  z-index: 0;
  pointer-events: none;
  background: linear-gradient(90deg, #fff 0%, #e50914 100%);
  opacity: 0.18;
  transition: opacity 0.3s;
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
.backdrop-blur-xl {
    --tw-backdrop-blur: blur(var(--blur-xl));
    backdrop-filter: var(--tw-backdrop-blur, ) var(--tw-backdrop-brightness, ) var(--tw-backdrop-contrast, ) var(--tw-backdrop-grayscale, ) var(--tw-backdrop-hue-rotate, ) var(--tw-backdrop-invert, ) var(--tw-backdrop-opacity, ) var(--tw-backdrop-saturate, ) var(--tw-backdrop-sepia, );
}

.shadow-2xl {
    --tw-shadow: 0 25px 50px -12px var(--tw-shadow-color, rgb(0 0 0 / 0.25));
    box-shadow: var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
}

.price-card button::after {
  content: "";
  position: absolute;
  inset: -2px;
  border-radius: 1.2em;
  z-index: 2;
  pointer-events: none;
  background: linear-gradient(90deg, #fff 0%, #e50914 100%);
  opacity: 0;
  box-shadow: 0 0 0 0 #fff0;
  transition: opacity 0.3s, box-shadow 0.3s;
}
.price-card button:hover::after,
.price-card button:focus-visible::after {
  opacity: 0.45;
  box-shadow: 0 0 0 3px #fff5, 0 0 16px #e5091440;
}
.price-card button:hover, .price-card button:focus-visible {
  background: linear-gradient(90deg, #ff3c3c 0%, #e50914 100%);
  transform: translateY(-2px) scale(1.07);
  filter: brightness(1.09) drop-shadow(0 0 10px #e5091440);
  box-shadow: 0 8px 28px #e5091440;
  outline: 2px solid #fff8;
}
.price-card button:active {
  transform: scale(0.97);
  filter: brightness(0.97);
}
.price-card button span {
  position: relative;
  z-index: 3;
}
.glass-card {
  background: rgba(255,255,255,0.07);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border: 1.5px solid rgba(255,255,255,0.10);
  box-shadow: 0 4px 32px rgba(229,9,20,0.10), 0 1.5px 8px 0 rgba(229,9,20,0.08);
}
.compare-plans-section {
  margin: 60px auto 0;
  max-width: 900px;
  width: 100%;
  border-radius: 28px;
  padding: 2.8rem 2.2rem 2.2rem 2.2rem;
  background: var(--table-bg);
  box-shadow: 0 8px 40px #e5091420, 0 2px 8px 0 #e5091440;
  border: 2px solid #e50914;
  backdrop-filter: blur(22px);
  overflow-x: auto;
  position: relative;
  animation: compare-fadein 1s cubic-bezier(.4,0,.2,1);
}
@keyframes compare-fadein {
  from { opacity: 0; filter: blur(12px) brightness(0.9);}
  to { opacity: 1; filter: blur(0) brightness(1);}
}
.compare-title {
  text-align: center;
  margin-bottom: 28px;
  color: #fff !important;
  background: linear-gradient(90deg, #e5091420 0%, #e5091440 50%, #fff0 100%);
  border-bottom: 2px solid #e50914;
  text-shadow: 0 2px 16px #e50914cc, 0 2px 12px #e5091420;
  border-radius: 16px;
  padding: 0.4em 0;
  font-weight: 900;
  letter-spacing: 0.04em;
  font-size: 2.2rem;
  border-bottom: 2px solid #e50914;
  box-shadow: 0 2px 16px #e5091420;
  animation: compare-title-pop 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes compare-title-pop {
  0% { opacity: 0; transform: translateY(-18px) scale(0.93);}
  60% { opacity: 1; transform: translateY(4px) scale(1.04);}
  100% { opacity: 1; transform: translateY(0) scale(1);}
}
.compare-table-responsive {
  width: 100%;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
.compare-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 0 auto;
  background: none;
  min-width: 420px;
  border-radius: 1.2em;
  overflow: hidden;
  box-shadow: 0 2px 24px #e5091420;
  animation: table-fadein 1.1s cubic-bezier(.4,0,.2,1);
}
@keyframes table-fadein {
  from { opacity: 0; filter: blur(8px);}
  to { opacity: 1; filter: blur(0);}
}
.compare-table th,
.compare-table td {
  padding: 1.15rem 0.8rem;
  text-align: center;
  font-size: 1.13rem;
  border-bottom: 1.5px solid #e5091440;
  color: #fff;
  background: transparent;
  transition: background 0.38s cubic-bezier(.4,0,.2,1), color 0.38s cubic-bezier(.4,0,.2,1), box-shadow 0.38s cubic-bezier(.4,0,.2,1);
  position: relative;
  z-index: 1;
}
.compare-table th {
  font-weight: 800;
  background: #2a0a0a;
  color: #e50914;
  border-bottom: 2.5px solid #e50914;
  box-shadow: 0 2px 16px #e5091420;
}
.compare-plan-th-highlight {
  background: var(--table-highlight);
  color: #fff;
  box-shadow: 0 2px 24px #e50914cc;
  border-bottom: 2.5px solid #e50914;
  z-index: 2;
  animation: th-highlight-pop 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes th-highlight-pop {
  0% { background: #fff0; color: #fff; }
  60% { background: #e5091440; color: #fff; }
  100% { background: var(--table-highlight); color: #fff; }
}
.compare-table td:first-child,
.compare-table th:first-child {
  text-align: left;
  color: #ddd;
  font-weight: 700;
  background: none;
  min-width: 140px;
  border-left: none;
}
.compare-table tr:last-child td {
  border-bottom: none;
}
.compare-table tr {
  transition: background 0.38s cubic-bezier(.4,0,.2,1);
}
.compare-table tbody tr:nth-child(odd) {
  background: var(--table-row-alt);
}
.compare-table tr:hover td {
  background: var(--table-row-hover);
  transition: background 0.22s cubic-bezier(.4,0,.2,1);
}
.compare-table tbody tr:nth-child(3) td {
  background: linear-gradient(90deg, #e5091422 0%, #fff0 100%);
  box-shadow: 0 2px 16px #e5091422;
  position: relative;
  z-index: 1;
  transition: background 0.4s cubic-bezier(.4,0,.2,1), box-shadow 0.4s cubic-bezier(.4,0,.2,1);
}
.compare-table tbody tr:nth-child(3):hover td {
  background: linear-gradient(90deg, #e5091440 0%, #fff0 100%);
  box-shadow: 0 4px 24px #e5091440;
}
.center {
  text-align: center;
}
.compare-check {
  color: #34d399;
  font-weight: bold;
  font-size: 1.3em;
  display: inline-block;
  animation: check-pop 0.5s cubic-bezier(.4,0,.2,1);
  filter: drop-shadow(0 0 6px #34d39944);
}
@keyframes check-pop {
  0% { transform: scale(0.7); opacity: 0.2; }
  60% { transform: scale(1.18); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.compare-dash {
  color: #666;
  font-size: 1.2em;
  opacity: 0.7;
  display: inline-block;
}
.compare-value {
  color: #fff;
  font-weight: 600;
  font-size: 1.08em;
  letter-spacing: 0.01em;
  animation: value-pop 0.5s cubic-bezier(.4,0,.2,1);
}
@keyframes value-pop {
  0% { transform: scale(0.7); opacity: 0.2; }
  60% { transform: scale(1.12); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.compare-row-highlight {
  background: var(--table-highlight-row);
  animation: row-highlight-pop 0.8s cubic-bezier(.4,0,.2,1);
  transition: background 0.5s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 2px 24px #e50914cc;
}
@keyframes row-highlight-pop {
  0% { background: #fff0; }
  60% { background: #e5091430; }
  100% { background: var(--table-highlight-row); }
}
.compare-col-highlight {
  background: var(--table-highlight-col);
  animation: col-highlight-pop 0.8s cubic-bezier(.4,0,.2,1);
  transition: background 0.5s cubic-bezier(.4,0,.2,1);
  box-shadow: 0 0 16px #e50914cc;
}
@keyframes col-highlight-pop {
  0% { background: #fff0; }
  60% { background: #e5091422; }
  100% { background: var(--table-highlight-col); }
}
.compare-table th, .compare-table td {
  animation: table-cell-fadein 0.7s cubic-bezier(.4,0,.2,1);
}
@keyframes table-cell-fadein {
  from { opacity: 0; transform: translateY(12px);}
  to { opacity: 1; transform: translateY(0);}
}
@media (max-width: 900px) {
  .price-header {
    max-width: 98vw;
    padding: 1.2rem 0.7rem 1rem 0.7rem;
    border-radius: 1rem;
    background: linear-gradient(120deg, rgba(255,255,255,0.13) 0%, rgba(24,24,28,0.93) 100%);
  }
  .price-header h1 {
    font-size: 1.7rem;
    margin-bottom: 0.5em;
  }
  .price-header p {
    font-size: 1rem;
  }
  .price-grid {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .price-card {
    min-width: 0;
    max-width: 370px;
    width: 94vw;
    margin: 0.5rem auto;
    padding: 1rem 1rem 0.8rem 1rem;
    border-radius: 1rem;
    font-size: 1em;
    box-shadow: 0 2px 12px #e5091420;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .plan-badge {
    font-size: 1em;
    padding: 0.22em 0.9em;
    top: -14px;
  }
  .price-card h2 {
    font-size: 1.13rem;
    margin-bottom: 0.2em;
  }
  .price-card .price {
    font-size: 1.3rem;
    margin: 0.4em 0 0.7em 0;
  }
  .price-card li {
    font-size: 0.97em;
    margin-bottom: 0.18em;
  }
  .price-card button {
    font-size: 0.97em;
    padding: 0.6em 0;
    border-radius: 0.7em;
    margin-top: 0.5em;
    width: 100%;
    max-width: 220px;
  }
}
@media (max-width: 600px) {
  .price-header {
    max-width: 100vw;
    padding: 0.7rem 0.2rem 0.6rem 0.2rem;
    border-radius: 0.7rem;
    background: linear-gradient(120deg, rgba(255,255,255,0.15) 0%, rgba(24,24,28,0.97) 100%);
  }
  .price-card {
    max-width: 98vw;
    width: 98vw;
    margin: 0.3rem auto;
    padding: 0.7rem 0.5rem 0.6rem 0.5rem;
    border-radius: 0.7rem;
    font-size: 0.95em;
  }
  .plan-badge {
    font-size: 0.93em;
    padding: 0.13em 0.6em;
    top: -8px;
  }
  .price-card h2 {
    font-size: 0.97rem;
  }
  .price-card .price {
    font-size: 1.05rem;
    margin: 0.2em 0 0.4em 0;
  }
  .price-card li {
    font-size: 0.91em;
    margin-bottom: 0.12em;
  }
  .price-card button {
    font-size: 0.91em;
    padding: 0.38em 0;
    border-radius: 0.5em;
    margin-top: 0.3em;
    max-width: 180px;
  }
}
@media (max-width: 430px) {
  .price-card {
    max-width: 99vw;
    width: 99vw;
    margin: 0.18rem auto;
    padding: 0.45rem 0.1rem 0.45rem 0.1rem;
    border-radius: 0.45rem;
    font-size: 0.89em;
  }
  .plan-badge {
    font-size: 0.81em;
    padding: 0.08em 0.3em;
    top: -4px;
  }
  .price-card h2 {
    font-size: 0.81rem;
  }
  .price-card .price {
    font-size: 0.93rem;
    margin: 0.1em 0 0.2em 0;
  }
  .price-card li {
    font-size: 0.85em;
    margin-bottom: 0.07em;
  }
  .price-card button {
    font-size: 0.81em;
    padding: 0.18em 0;
    border-radius: 0.3em;
    margin-top: 0.13em;
    max-width: 120px;
  }
}
</style>