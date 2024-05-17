<script lang="ts" setup>
import { FunctionalComponent } from 'vue';

withDefaults(
  defineProps<{
    onIcon: FunctionalComponent;
    offIcon: FunctionalComponent;
    checked?: boolean;
  }>(),
  {
    checked: false,
  },
);
</script>

<template>
  <label class="swap swap-rotate">
    <input type="checkbox" :checked="checked" />
    <component :is="onIcon" class="swap-on size-6" />
    <component :is="offIcon" class="swap-off size-6" />
  </label>
</template>
