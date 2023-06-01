<template>
  <img
    v-if="isDark"
    src="../../assets/logo_white.svg"
    class="w-48 scale-[1.4]"
  />
  <img
    v-else
    src="../../assets/logo_black.svg"
    class="w-48 scale-[1.4]"
  />
</template>

<script lang="ts" setup>
import { isDark } from '../../utils/darkMode';
</script>

<style lang="scss" scoped>

</style>