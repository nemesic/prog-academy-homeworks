
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

    <div class="admin-header animate-fade-in mx-auto max-w-3xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-14 text-center mb-12 shadow-2xl">
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
<style>@import '../assets/Price.css'; </style>