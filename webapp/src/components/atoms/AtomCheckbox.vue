<script lang="ts" setup>
defineProps<{
  label: string;
}>();

const model = defineModel<boolean>();
</script>

<template>
  <div class="form-control">
    <label class="label cursor-pointer gap-4">
      <input v-model="model" type="checkbox" class="checkbox" />
      <span class="label-text">{{ label }}</span>
    </label>
  </div>
</template>
