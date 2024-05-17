<script lang="ts" setup>
defineProps<{
  placeholder: string;
  options: string[];
}>();

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
