<template>
  <label class="swap swap-rotate">
    <input
      type="checkbox"
      :checked="checked"
    />
    <component
      :is="onIcon"
      class="swap-on h-6 w-6"
    />
    <component
      :is="offIcon"
      class="swap-off h-6 w-6"
    />
  </label>
</template>

<script lang="ts" setup>
import { FunctionalComponent, PropType } from 'vue';

defineProps({
  onIcon: {
    type: Object as PropType<FunctionalComponent>,
    required: true,
  },
  offIcon: {
    type: Object as PropType<FunctionalComponent>,
    required: true,
  },
  checked: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>

</style>