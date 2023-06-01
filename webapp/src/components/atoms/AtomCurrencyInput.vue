<template>
  <div>
    <AtomInput
      ref="input"
      type="number"
      class="pr-16 text-right"
      step="1"
      min="1"
      max="100"
    />
    <span class="pointer-events-none absolute top-2/4 -ml-16 -mt-8 text-sm opacity-50">,00 Öro</span>
  </div>
</template>

<script lang="ts" setup>
import AtomInput from './AtomInput.vue';
</script>

<style lang="scss" scoped>

</style>