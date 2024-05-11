<script lang="ts" setup>
import { isDark } from '../../utils/darkMode';
</script>

<template>
  <img v-if="isDark" src="../../assets/svg/logo_white.svg" class="w-48" />
  <img v-else src="../../assets/svg/logo_black.svg" class="w-48" />
</template>
