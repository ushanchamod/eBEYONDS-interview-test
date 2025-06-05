<!--
  TextareaInput.vue

  A reusable textarea component for form inputs.

  Features:
  - Accepts `id`, `label`, `modelValue`, and optional `rows` (default is 4).
  - Emits `update:modelValue` on user input for v-model binding.
  - Supports custom styling via `wrapperClass` (optional).
-->

<script setup>
defineProps({
  id: String,
  label: String,
  modelValue: String,
  rows: {
    type: Number,
    default: 4,
  },
  wrapperClass: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :rows="rows"
    >
    </textarea>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.form-group {
  margin-bottom: 1.5rem;

  label {
    width: fit-content;
    display: block;
    margin-bottom: 0.2rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: $font-gray;
    font-family: $subtitle-font;
  }

  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid $movie-card-background;
    border-radius: 5px;
    font-size: 1rem;
    background-color: $movie-card-background;
    color: $font-white;
    width: 100%;
    resize: vertical;
    min-height: 120px;

    &:focus {
      outline: none;
      border-color: $primary-color-foreground;
    }

    &.error {
      border-color: $danger-color;
    }
  }

  .error-message {
    display: block;
    margin-top: 0.5rem;
    color: $danger-color;
    font-size: 0.875rem;
  }
}
</style>
