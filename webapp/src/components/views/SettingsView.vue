<template>
  <MoleculeAuthDialog v-if="!isAuthenticated" />
  <div
    v-else
    class="@container"
  >
    <div class="flex h-full flex-wrap justify-center gap-4 p-6 @[832px]:justify-normal">
      <AtomCard class="w-96">
        <template #title>
          <WrenchScrewdriverIcon class="h-6 w-6" />Einstellungen
        </template>
        <div class="mt-4 flex h-full flex-col gap-4">
          <div class="flex place-items-center justify-between">
            <span>Mindestlohn</span>
            <AtomCurrencyInput
              class="w-2/4"
              per-day
            />
          </div>
          <div class="flex flex-col gap-2">
            <span>Radio URL</span>
            <AtomInput />
          </div>
          <button
            class="btn btn-primary mt-auto w-1/2 self-end"
          >
            Speichern
          </button>
        </div>
      <!-- <div
        v-if="settingsSaveSuccess"
        class="toast z-10"
      >
        <div class="alert alert-success">
          <span>Änderungen erfolgreich gespeichert.</span>
        </div>
      </div>
      <div
        v-if="settingsSaveError"
        class="toast z-10"
      >
        <div class="alert alert-error">
          <span>Ein Fehler ist aufgetreten. Bitte Eingabe oder Verbindung überprüfen.</span>
        </div>
      </div> -->
      </AtomCard>
      <AtomCard class="w-96">
        <template #title>
          <MagnifyingGlassIcon class="h-6 w-6" />Verwaltung
        </template>
        <div class="mt-4 flex h-full flex-col gap-4">
          <RouterLink
            class="btn"
            :to="{ name: 'data' }"
          >
            <UsersIcon class="h-5 w-5" />
            Stammdaten-Übersicht
          </RouterLink>
          <RouterLink
            class="btn"
            :to="{ name: 'admin' }"
          >
            <StarIcon class="h-5 w-5" />
            Admin Oberfläche
          </RouterLink>
        </div>
      </AtomCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import MoleculeAuthDialog from '../molecules/MoleculeAuthDialog.vue';
import { ref, onMounted } from 'vue';
import { AuthService } from '../../services/auth.service';
import AtomCard from '../atoms/AtomCard.vue';
import AtomCurrencyInput from '../atoms/AtomCurrencyInput.vue';
import AtomInput from '../atoms/AtomInput.vue';
import { MagnifyingGlassIcon, StarIcon, UsersIcon, WrenchScrewdriverIcon } from '@heroicons/vue/24/outline';

const isAuthenticated = ref(false);

useEventBus<boolean>('isAuthenticated').on(state => {
  isAuthenticated.value = state;
});

onMounted(() => {
  isAuthenticated.value = AuthService.isAuthenticated();
});
</script>

<style lang="scss" scoped>

</style>