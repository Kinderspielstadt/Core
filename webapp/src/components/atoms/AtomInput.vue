<template>
  <input
    ref="input"
    :type="type"
    :required="required"
    :placeholder="placeholder"
    :value="modelValue"
    class="input-bordered input w-full"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

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
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
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