<template>
  <img
    v-if="isDark"
    src="../../assets/logo_white.png"
  />
  <img
    v-else
    src="../../assets/logo.png"
  />
</template>

<script lang="ts" setup>
import { isDark } from '../../utils/darkMode';
</script>

<style lang="scss" scoped>

</style>