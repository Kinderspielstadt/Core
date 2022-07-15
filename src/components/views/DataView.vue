<template>
  <div class="lg:p-6">
    <MoleculeDataTable :data="data" />
    <MoleculeAddAccountModal :id="addAccountModalId" />
    <label
      class="btn btn-primary btn-lg btn-circle shadow-2xl fixed bottom-8 right-8"
      :for="addAccountModalId"
    >
      <PlusIcon class="w-7 h-7" />
    </label>
  </div>
</template>

<script lang="ts" setup>
import MoleculeDataTable from '../molecules/MoleculeDataTable.vue';
import { PlusIcon } from '@heroicons/vue/outline';
import MoleculeAddAccountModal from '../molecules/MoleculeAddAccountModal.vue';

const addAccountModalId = 'add-account-modal';
/* eslint-disable @typescript-eslint/naming-convention */
const data = [
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  {
    'Kontonummer': '0000123456',
    'Name': 'John Doe',
    'Geburtsdatum': '13.11.1998',
    'Kontostand': '150,00 Öro',
    'Adresse': 'Test-Straße 1, 74613 Öhringen',
    'Letzter': '12.07.2022 17:39',
    'Kontakt': null,
    'Trans.': null,
  },
  /* eslint-enable @typescript-eslint/naming-convention */
];

</script>

<style lang="scss" scoped>

</style>