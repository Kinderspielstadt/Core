<template>
  <iframe
    v-if="settings?.radioUrl"
    :src="settings?.radioUrl"
    frameborder="0"
    class="h-full w-full"
  />
  <span v-else>Fehler: Keine Radio URL festgelegt.</span>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { SettingsResponse } from '../../types/pocketbase.types';
import { SettingsService } from '../../services/settings.service';

const settings = ref<SettingsResponse>();

onMounted(async () => {
  settings.value = await SettingsService.getSettings();
});

</script>

<style lang="scss" scoped>

</style>