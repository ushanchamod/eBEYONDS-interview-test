// A reusable checkbox component. // - Binds `modelValue` (Boolean) to checkbox state using v-model
pattern. // - Emits `update:modelValue` when the checkbox is toggled. // - Accepts `id` for
input/label linking and `wrapperClass` for custom styling. // - Supports custom label text via slot.

<script setup>
defineProps({
  id: String,
  modelValue: Boolean,
  wrapperClass: String,
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group checkbox-group">
    <input
      type="checkbox"
      :id="id"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
    />
    <label :for="id">
      <slot></slot>
    </label>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/variables.scss' as *;

.checkbox-group {
  display: flex;
  align-items: center;
  margin: 2rem 0;
  display: flex;
  gap: 0.5rem;

  input {
    width: 1rem;
    height: 1rem;
    accent-color: $primary-color-foreground;
    cursor: pointer;
  }

  label {
    margin-top: 0rem;
    font-weight: 500;
    font-size: 1.2rem;
    color: $font-gray;
    cursor: pointer;
    font-family: $subtitle-font;
  }
}
</style>
