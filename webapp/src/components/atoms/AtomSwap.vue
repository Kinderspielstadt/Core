<script lang="ts" setup>
import { FunctionalComponent, PropType } from 'vue';

defineProps({
  onIcon: {
    type: Function as PropType<FunctionalComponent>,
    required: true,
  },
  offIcon: {
    type: Function as PropType<FunctionalComponent>,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <label class="swap swap-rotate">
    <input type="checkbox" :checked="checked" />
    <component :is="onIcon" class="swap-on size-6" />
    <component :is="offIcon" class="swap-off size-6" />
  </label>
</template>
