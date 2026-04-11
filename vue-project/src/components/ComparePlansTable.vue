<template>
  <div class="compare-plans-section glass-card">
    <h2 class="compare-title">Compare plans</h2>
    <table class="compare-table">
      <thead>
        <tr>
          <th></th>
          <th v-for="plan in plans" :key="plan.key">{{ plan.name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="feature in features" :key="feature.key">
          <td>{{ feature.label }}</td>
          <td
            v-for="plan in plans"
            :key="plan.key"
            class="center"
            :class="{ check: feature.values[plan.key] === true || feature.values[plan.key] === '✔' }"
          >
            <template v-if="feature.values[plan.key] === true || feature.values[plan.key] === '✔'">
              &#10003;
            </template>
            <template v-else-if="feature.values[plan.key] === false || feature.values[plan.key] === ''">
              <!-- empty -->
            </template>
            <template v-else>
              {{ feature.values[plan.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const plans = [
  { key: 'basic', name: 'Basic' },
  { key: 'standard', name: 'Standard' },
  { key: 'premium', name: 'Premium' }
];

const features = [
  {
    key: 'hd',
    label: 'HD available',
    values: { basic: true, standard: true, premium: true }
  },
  {
    key: 'uhd',
    label: 'Ultra HD',
    values: { basic: false, standard: false, premium: true }
  },
  {
    key: 'devices',
    label: 'Devices at once',
    values: { basic: 1, standard: 2, premium: 4 }
  },
  {
    key: 'noads',
    label: 'No ads',
    values: { basic: false, standard: true, premium: true }
  },
  {
    key: 'offline',
    label: 'Offline download',
    values: { basic: false, standard: false, premium: true }
  },
  {
    key: 'support',
    label: 'Support',
    values: { basic: 'Standard', standard: 'Priority', premium: 'Premium' }
  }
];
</script>