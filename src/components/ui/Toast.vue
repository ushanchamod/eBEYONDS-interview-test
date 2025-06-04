<template>
  <div id="toast-container">
    <div v-for="(toast, index) in toasts" :key="index" class="toast">
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const toasts = ref([])

function showToast(message, duration = 3000) {
  const toast = { message }
  toasts.value.push(toast)

  setTimeout(() => {
    const index = toasts.value.indexOf(toast)
    if (index !== -1) toasts.value.splice(index, 1)
  }, duration)
}

defineExpose({ showToast })
</script>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

// Tokens
$primary-color-background: #000000;
$secondary-color-background: #1d1d1d;
$primary-color-foreground: #d1a805;
$font-white: #ffffff;
$font-gray: #b4b4b4;
$main-title-font: 'Inter', sans-serif;

// Container
#toast-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.75rem;
  z-index: 9999;
  max-width: 90vw;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1rem;
    left: 1rem;
    align-items: center;
  }
}

// Toast
.toast {
  background-color: $secondary-color-background;
  color: $font-white;
  padding: 0.85rem 1.3rem;
  border-left: 5px solid $primary-color-foreground;
  border-radius: 8px;
  font-family: $main-title-font;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  animation: fadeInOut 4s ease forwards;
  opacity: 0;
  transform: translateY(20px);
  max-width: 320px;
  width: 100%;
  pointer-events: auto;

  @media (max-width: 768px) {
    max-width: 100%;
    width: calc(100vw - 2rem);
    text-align: center;
    border-left: none;
    border-top: 5px solid $primary-color-foreground;
  }
}

// Animation
@keyframes fadeInOut {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  10% {
    opacity: 1;
    transform: translateY(0);
  }

  90% {
    opacity: 1;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateY(20px);
  }
}
</style>
