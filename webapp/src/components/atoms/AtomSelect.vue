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
});

const model = defineModel<string>();
</script>

<template>
  <select v-model="model" class="select select-bordered w-full">
    <option disabled selected>
      {{ placeholder }}
    </option>
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>
