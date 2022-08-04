<template>
  <div>
    <AtomInput
      ref="input"
      type="number"
      class="text-right pr-16"
      step="1"
      min="1"
      max="100"
    />
    <span class="text-sm opacity-50 absolute -ml-16 top-2/4 -mt-8 pointer-events-none">,00 Öro</span>
  </div>
</template>

<script lang="ts" setup>
import AtomInput from './AtomInput.vue';
</script>

<style lang="scss" scoped>

</style>