// A customizable button component. // - Uses `modelValue` (Boolean) to control whether the button
is enabled. // - Emits `update:modelValue` with the opposite value when clicked. // - Accepts
`wrapperClass` for custom classes and `style` for inline styling. // - Supports slot content for
flexible button labeling.

<script setup>
defineProps({
  modelValue: Boolean,
  wrapperClass: String,
  style: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <button
    :class="wrapperClass"
    :disabled="!modelValue"
    @click="$emit('update:modelValue', !modelValue)"
    :style="style"
  >
    <slot></slot>
  </button>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

button {
  background-color: $primary-color-foreground;
  color: $font-white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: $subtitle-font;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $primary-color-hover;
  }

  &:disabled {
    background-color: $font-gray;
    cursor: not-allowed;
  }
}
</style>
