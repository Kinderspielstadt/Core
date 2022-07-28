<template>
  <select
    class="select select-bordered w-full"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  >
    <option
      disabled
      selected
    >
      {{ placeholder }}
    </option>
    <option v-for="option in options">{{ option }}</option>
  </select>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  placeholder: {
    type: String,
    required: true,
  },
  options: {
    type: Array as PropType<string[]>,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

defineEmits(['update:modelValue']);
</script>

<style lang="scss" scoped>

</style>