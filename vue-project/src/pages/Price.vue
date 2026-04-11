<template>
  <div class="price-page">
    <div class="price-header glass-card">
      <h1>Pricing Plans</h1>
      <p>Choose the best plan for your experience</p>
    </div>
    <div class="price-grid">
      <div
        v-for="p in plans"
        :key="p.key"
        class="price-card glass-card"
        :class="{ active: plan === p.key }"
        @click="handleSelect(p.key)"
        tabindex="0"
        :aria-label="`${p.name} plan`"
      >
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
    <transition name="pop">
      <div
        v-if="toast"
        class="success-box price-toast"
        role="status"
        aria-live="polite"
      >
        <div class="checkmark">✔</div>
        <p>{{ toast }}</p>
      </div>
    </transition>
    <ComparePlansTable />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ComparePlansTable from '../components/ComparePlansTable.vue'

const plan = ref('standard')
const toast = ref('')
let toastTimeout = null

const plans = [
  {
    key: 'basic',
    name: 'Basic',
    price: '$5',
    desc: 'For casual viewers',
    features: ['720p Quality', '1 Device', 'Ads included'],
  },
  {
    key: 'standard',
    name: 'Standard',
    price: '$10',
    desc: 'For movie lovers',
    features: ['1080p Quality', '2 Devices', 'No ads'],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: '$15',
    desc: 'For families & 4K fans',
    features: ['4K Quality', '4 Devices', 'Offline download'],
  },
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
</script>

<style scoped>
.price-card {
  transition: box-shadow 0.22s, transform 0.18s;
}
.price-card.active {
  box-shadow: 0 8px 32px rgba(229,9,20,0.22), 0 2px 8px #e5091440;
  transform: scale(1.05) translateY(-4px);
  border: 2px solid var(--red);
}
.price-card button {
  font-weight: 600;
  letter-spacing: 0.02em;
}
.success-box {
  position: fixed;
  z-index: 9999;
  left: 50%;
  transform: translateX(-50%);
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
  animation: pop 0.3s;
}
.toast-center {
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
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
  animation: pop 0.3s;
}
.price-toast {
  position: fixed;
  top: max(18px, env(safe-area-inset-top, 18px));
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.88);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 14px 18px;
  border-radius: 12px;
  text-align: center;
  min-width: 140px;
  max-width: 95vw;
  z-index: 9999;
  animation: pop 0.3s;
  box-shadow: 0 4px 24px rgba(229,9,20,0.13);
  font-size: 1.05rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.price-toast .checkmark {
  font-size: 24px;
  color: limegreen;
  margin-right: 8px;
}
@keyframes pop {
  from { transform: scale(0.8) translateX(-50%); opacity: 0; }
  to { transform: scale(1) translateX(-50%); opacity: 1; }
}
.pop-enter-active, .pop-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.pop-enter-from, .pop-leave-to {
  opacity: 0;
  transform: scale(0.8) translateX(-50%);
}
.pop-enter-to, .pop-leave-from {
  opacity: 1;
  transform: scale(1) translateX(-50%);
}

/* Mobile: show toast at top center */
@media (max-width: 600px) {
  .price-toast {
    top: max(10px, env(safe-area-inset-top, 10px));
    bottom: auto;
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: 98vw;
    min-width: 0;
    padding: 12px 6vw;
    font-size: 0.98rem;
    border-radius: 10px;
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .price-toast .checkmark {
    font-size: 20px;
    margin-right: 6px;
  }
}
@media (max-width: 400px) {
  .price-toast {
    top: max(4px, env(safe-area-inset-top, 4px));
    bottom: auto;
    padding: 7px 2vw;
    font-size: 0.92rem;
    border-radius: 7px;
    gap: 4px;
  }
  .price-toast .checkmark {
    font-size: 13px;
    margin-right: 2px;
  }
}
</style>