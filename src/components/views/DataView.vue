<template>
  <div class="lg:p-6">
    <MoleculeDataTable
      v-if="data"
      :table-headers="tableHeaders"
      :data="data"
    />
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
import { onMounted, ref } from 'vue';
import { DataService } from '../services/data.service';
import { PlusIcon } from '@heroicons/vue/outline';
import MoleculeAddAccountModal from '../molecules/MoleculeAddAccountModal.vue';
import MoleculeDataTable, { TableHeaderType } from '../molecules/MoleculeDataTable.vue';

const data = ref();
const addAccountModalId = 'add-account-modal';
const tableHeaders = [
  {
    title: 'Kontonummer',
    key: 'accountNumber',
    type: TableHeaderType.STRING,
  },
  {
    title: 'Name',
    key: 'name',
    type: TableHeaderType.STRING,
  },
  {
    title: 'Geburtsdatum',
    key: 'birthday',
    type: TableHeaderType.DATE,
  },
  {
    title: 'Kontostand',
    key: 'balance',
    type: TableHeaderType.CURRENCY,
  },
  {
    title: 'Adresse',
    key: 'address',
    type: TableHeaderType.STRING,
  },
  {
    title: 'Letzter Login',
    key: 'lastCheckIn',
    type: TableHeaderType.DATETIME,
  },
  {
    title: 'Kontakt',
    key: '',
    type: TableHeaderType.BUTTON_CONTACT,
  },
  {
    title: 'Trans.',
    key: '',
    type: TableHeaderType.BUTTON_ACCOUNT,
  },
];

onMounted(async () => {
  data.value = await DataService.getAllData();
});
</script>

<style lang="scss" scoped>

</style>