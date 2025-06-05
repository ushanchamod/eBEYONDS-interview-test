// A reusable input field component. // - Supports v-model binding using `modelValue` (String |
Number). // - Accepts `label`, `type`, `id`, and `wrapperClass` as props for customization. // -
Emits `update:modelValue` on input change and `blur` on input blur. // - Displays validation error
styles and message when `error` is true and `errorMessage` is provided. // - Styled using SCSS with
support for light and error states.

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  error: Boolean,
  errorMessage: String,
  wrapperClass: String,
})

defineEmits(['update:modelValue', 'blur'])
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>

    <input
      :type="type"
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @blur="$emit('blur')"
      :class="{ error: error }"
    />

    <span class="error-message" v-if="error && errorMessage">
      {{ errorMessage }}
    </span>
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

  input[type='text'],
  input[type='email'],
  input[type='tel'] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid $movie-card-background;
    border-radius: 5px;
    font-size: 1rem;
    background-color: $movie-card-background;
    color: $font-white;

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
