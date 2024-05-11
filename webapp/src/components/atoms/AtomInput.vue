<script lang="ts" setup>
defineProps({
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const model = defineModel<string | number>();
</script>

<template>
  <input
    ref="input"
    v-model="model"
    :type="type"
    :required="required"
    :placeholder="placeholder"
    class="input input-bordered input-primary w-full"
  />
</template>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
