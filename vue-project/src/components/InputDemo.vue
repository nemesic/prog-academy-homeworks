<template>
  <div class="input-demo-card">
    <h2 class="input-demo-title">Demo Input (Options API)</h2>
    <input v-model="inputValue" type="text" placeholder="Enter something..." class="input-demo-input" />
    <button @click="showValue" class="input-demo-btn">Show Value</button>
    <div v-if="outputValue !== ''" class="input-demo-output">
      <span class="output-label">You entered:</span> <span class="output-value">{{ outputValue }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputDemo',
  data() {
    return {
      inputValue: '',
      outputValue: ''
    }
  },
  methods: {
    showValue() {
      this.outputValue = this.inputValue
    }
  }
}
</script>
<style>@import '../assets/InputDemo.css'; </style>