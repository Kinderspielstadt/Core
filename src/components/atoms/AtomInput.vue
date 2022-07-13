<template>
  <input
    ref="input"
    :type="type"
    :placeholder="placeholder"
    class="input input-bordered w-full max-w-xs"
  />
</template>

<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>