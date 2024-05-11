<script lang="ts" setup>
const version =
  ((import.meta as any).env.VITE_APP_VERSION as string) ?? 'local+dev';
</script>

<template>
  <footer class="footer footer-center bg-base-100 p-4 text-base-content">
    <div>
      <p>Version: {{ version }}</p>
      <p>Made with ❤️ by Simon Giesel</p>
      <p>Copyright © 2022 - 2024 - All rights reserved</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
