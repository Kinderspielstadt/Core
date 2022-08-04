<template>
  <div
    v-show="!pinCorrect"
    class="hero min-h-full"
  >
    <div class="hero-content flex-col text-center">
      <AtomInput
        placeholder="Bitte PIN eingeben"
        type="password"
        @input="inputEvent"
      />
    </div>
  </div>
  <div
    v-show="pinCorrect"
    class="lg:p-6"
  >
    <AtomInput
      placeholder="Nach Vor-/Nachname suchen"
      class="mb-4"
      @input="filterEvent"
    />
    <MoleculeDataTable
      v-if="data"
      :table-headers="tableHeaders"
      :data="data"
      :contact-modal-id="contactModalId"
      @open-contact-modal="openContactModal"
    />
    <MoleculeContactModal
      :id="contactModalId"
      :name="contactName"
      :contact="contact"
    />
    <MoleculeMigrateAccountModal
      :id="migrateAccountModalId"
    />
    <MoleculeAddAccountModal
      :id="addAccountModalId"
      @submit="addAccount"
    />
    <label
      class="btn btn-primary btn-lg btn-circle shadow-2xl fixed bottom-8 right-28"
      :for="migrateAccountModalId"
    >
      <SupportIcon class="w-7 h-7" />
    </label>
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
import { IAccountData } from '../../interfaces/account-data.interface';
import { PlusIcon, SupportIcon } from '@heroicons/vue/outline';
import MoleculeAddAccountModal from '../molecules/MoleculeAddAccountModal.vue';
import MoleculeContactModal from '../molecules/MoleculeContactModal.vue';
import MoleculeDataTable, { TableHeaderType } from '../molecules/MoleculeDataTable.vue';
import AtomInput from '../atoms/AtomInput.vue';
import MoleculeMigrateAccountModal from '../molecules/MoleculeMigrateAccountModal.vue';

const ACCESS_PIN_KEY = '1337';
const pinCorrect = ref(false);
const data = ref<IAccountData[]>([]);
const initialData = ref<IAccountData[]>([]);
const contactName = ref('');
const contact = ref<string[]>([]);
const contactModalId = 'contact-modal';
const addAccountModalId = 'add-account-modal';
const migrateAccountModalId = 'migrate-account-modal';
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
  // {
  //   title: 'Geburtsdatum',
  //   key: 'birthday',
  //   type: TableHeaderType.STRING,
  // },
  {
    title: 'Kontostand',
    key: 'balance',
    type: TableHeaderType.CURRENCY,
  },
  // {
  //   title: 'Adresse',
  //   key: 'address',
  //   type: TableHeaderType.STRING,
  // },
  {
    title: 'Letzter Login',
    key: 'lastCheckIn',
    type: TableHeaderType.DATETIME,
  },
  // {
  //   title: 'Kontakt',
  //   key: '',
  //   type: TableHeaderType.BUTTON_CONTACT,
  // },
  {
    title: 'Trans.',
    key: '',
    type: TableHeaderType.BUTTON_ACCOUNT,
  },
];

onMounted(async () => {
  data.value = await DataService.getAllData();
  initialData.value = data.value;
});

function openContactModal(data: { name: string, contact: string[] }) {
  contactName.value = data.name;
  contact.value = data.contact;
}

function addAccount(account: IAccountData) {
  data.value.push(account);
  initialData.value = data.value;
}

function inputEvent(event: Event) {
  if((event.target as HTMLInputElement).value == ACCESS_PIN_KEY) {
    pinCorrect.value = true;
  }
}

function filterEvent(event: Event) {
  const input = (event.target as HTMLInputElement).value;
  data.value = initialData.value;
  if(input === '') {
    return;
  }
  data.value = data.value.filter((account: IAccountData) => {
    return `${account.firstName} ${account.lastName}`.toLocaleLowerCase().includes(input.toLocaleLowerCase());
  });
}
</script>

<style lang="scss" scoped>
</style>