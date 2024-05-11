<script lang="ts" setup>
import { useEventBus } from '@vueuse/core';
import { ref, onMounted } from 'vue';
import { AccountService } from '../../services/account.service';
import { DateService } from '../../services/date.service';
import { AuthService } from '../../services/auth.service';
import { FileService } from '../../services/file.service';
import { SettingsService } from '../../services/settings.service';
import {
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  StarIcon,
  TableCellsIcon,
  TrophyIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/vue/24/outline';
import AtomCard from '../atoms/AtomCard.vue';
import AtomInput from '../atoms/AtomInput.vue';
import MoleculeAuthDialog from '../molecules/MoleculeAuthDialog.vue';
import MoleculeImportDataModal from '../molecules/MoleculeImportDataModal.vue';

const isAuthenticated = ref(false);
const importAccountsModal = ref<InstanceType<typeof MoleculeImportDataModal>>();
const radioUrl = ref('');
const settingsSaveSuccess = ref(false);
const settingsSaveError = ref(false);
const importPending = ref(false);
const importDone = ref(false);

async function saveSettings() {
  if (radioUrl.value) {
    await SettingsService.setSettings({
      radioUrl: radioUrl.value,
    });
    settingsSaveSuccess.value = true;
    const timeout = setTimeout(() => {
      settingsSaveSuccess.value = false;
      clearTimeout(timeout);
    }, 5000);
  } else {
    settingsSaveError.value = true;
    const timeout = setTimeout(() => {
      settingsSaveError.value = false;
      clearTimeout(timeout);
    }, 5000);
  }
}

async function genrateCardCSV() {
  const data = await AccountService.getFullAccountsWherePictureIsSet();
  const csv =
    'Vorname;Nachname;Geburtsdatum;Farbgruppe;@Bild\n' +
    data
      .map(
        (account) =>
          `${account.firstName};${account.lastName};${
            account.expand?.personalData
              ? DateService.toShortString(
                  new Date(account.expand.personalData.birthday),
                )
              : ''
          };${account.color};${account.picture}`,
      )
      .join('\n');
  const BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
  const url = window.URL.createObjectURL(
    new Blob([BOM, csv], { type: 'text/csv;charset=UTF-8' }),
  );
  window.location.assign(url);
  const zip = await FileService.getAvatarsAsZip(data);
  window.location.assign(window.URL.createObjectURL(zip));
}

async function importAccounts(file: File): Promise<void> {
  const data = await file.text();
  const promises = [];
  for (const line of data.split('\n').slice(1)) {
    const [
      ,
      ,
      ,
      vegetarian,
      intolerances,
      firstName,
      lastName,
      birthday,
      email,
      firstNameParent,
      lastNameParent,
      street,
      zipCode,
      city,
      phone,
      ,
      oneweek,
    ] = line.trim().split(';');
    promises.push(
      AccountService.addAccount(
        {
          firstName: firstName?.trim(),
          lastName: lastName?.trim(),
        },
        {
          vegetarian: vegetarian === '1',
          intolerances: intolerances?.trim(),
          birthday: birthday ? new Date(birthday).toISOString() : '',
          email: email?.trim(),
          firstNameParent: firstNameParent?.trim(),
          lastNameParent: lastNameParent?.trim(),
          street: street?.trim(),
          zipCode: parseInt(zipCode),
          city: city?.trim(),
          phone: phone?.trim(),
          oneweek: oneweek === '1',
        },
      ),
    );
  }
  importPending.value = true;
  await Promise.all(promises);
  importPending.value = false;
  importDone.value = true;
  const timeout = setTimeout(() => {
    importDone.value = false;
    clearTimeout(timeout);
  }, 5000);
}

useEventBus<boolean>('isAuthenticated').on((state) => {
  isAuthenticated.value = state;
});

onMounted(async () => {
  isAuthenticated.value = AuthService.isAuthenticated();
  const settings = await SettingsService.getSettings();
  radioUrl.value = settings.radioUrl;
});
</script>

<template>
  <MoleculeAuthDialog v-if="!isAuthenticated" />
  <div v-else class="@container">
    <div
      class="flex h-full flex-wrap justify-center gap-4 p-6 @[832px]:justify-normal"
    >
      <AtomCard class="w-96">
        <template #title>
          <WrenchScrewdriverIcon class="h-6 w-6" />Einstellungen
        </template>
        <div class="mt-4 flex h-full flex-col gap-4">
          <div class="flex flex-col gap-2">
            <span>Radio URL</span>
            <AtomInput v-model="radioUrl" />
          </div>
          <button
            class="btn btn-primary mt-auto w-1/2 self-end"
            @click="saveSettings()"
          >
            Speichern
          </button>
        </div>
        <div v-if="settingsSaveSuccess" class="toast z-10">
          <div class="alert alert-success">
            <span>Änderungen erfolgreich gespeichert.</span>
          </div>
        </div>
        <div v-if="settingsSaveError" class="toast z-10">
          <div class="alert alert-error">
            <span
              >Ein Fehler ist aufgetreten. Bitte Eingabe oder Verbindung
              überprüfen.</span
            >
          </div>
        </div>
      </AtomCard>
      <AtomCard class="w-96">
        <template #title>
          <MagnifyingGlassIcon class="h-6 w-6" />Verwaltung
        </template>
        <div class="mt-4 flex h-full flex-col gap-4">
          <RouterLink class="btn" :to="{ name: 'data' }">
            <UsersIcon class="h-5 w-5" />
            Stammdaten-Übersicht
          </RouterLink>
          <RouterLink class="btn" :to="{ name: 'pollsResult' }">
            <TrophyIcon class="h-5 w-5" />
            Abstimmungsergebnisse
          </RouterLink>
          <RouterLink class="btn" :to="{ name: 'admin' }">
            <StarIcon class="h-5 w-5" />
            Admin Oberfläche
          </RouterLink>
        </div>
      </AtomCard>
      <AtomCard class="w-96 border-2 border-error">
        <template #title>
          <div class="flex items-center gap-2 text-error">
            <ExclamationTriangleIcon class="h-6 w-6" />Danger Zone
          </div>
        </template>
        <div class="mt-4 flex h-full flex-col gap-4">
          <MoleculeImportDataModal
            id="import-accounts-modal"
            ref="importAccountsModal"
            title="Stammdaten importieren"
            action-label="Importieren"
            @submit="importAccounts"
          />
          <button class="btn" @click="importAccountsModal?.show()">
            <TableCellsIcon class="h-5 w-5" />
            Stammdaten importieren
          </button>
          <button class="btn" @click="genrateCardCSV">
            <ArrowDownTrayIcon class="h-5 w-5" />
            Karten CSV generieren
          </button>
        </div>
        <div v-if="importPending" class="toast z-10">
          <div class="alert alert-info">
            <span>Daten werden importiert. Bitte warten...</span>
          </div>
        </div>
        <div v-if="importDone" class="toast z-10">
          <div class="alert alert-success">
            <span>Daten wurden erfolgreich importiert.</span>
          </div>
        </div>
      </AtomCard>
    </div>
  </div>
</template>
