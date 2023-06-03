<template>
  <MoleculeAuthDialog v-if="!isAuthenticated" />
  <div
    v-else
    class="flex h-full flex-col p-6"
  >
    <AtomInput
      v-model="searchQuery"
      placeholder="Nach Vor-/Nachname suchen"
      class="mb-4"
    />
    <MoleculeDataTable
      v-if="accounts"
      :table-headers="tableHeaders"
      :data="accounts"
      :contact-modal-id="contactModalId"
      @open-contact-modal="openContactModal"
    />
  </div>
  <MoleculeContactModal
    :id="contactModalId"
    :contact-id="contactId"
  />
  <!-- <MoleculeMigrateAccountModal
    :id="migrateAccountModalId"
  />
  <MoleculeAddAccountModal
    :id="addAccountModalId"
    @submit="addAccount"
  /> -->
  <label
    class="btn-primary btn-circle btn-lg btn fixed bottom-8 right-28 shadow-2xl"
    :for="migrateAccountModalId"
  >
    <LifebuoyIcon class="h-7 w-7" />
  </label>
  <label
    class="btn-primary btn-circle btn-lg btn fixed bottom-8 right-8 shadow-2xl"
    :for="addAccountModalId"
  >
    <PlusIcon class="h-7 w-7" />
  </label>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useEventBus } from '@vueuse/core';
import { UnsubscribeFunc } from 'pocketbase';
import { BankService } from '../../services/bank.service';
import { AccountsListResponse } from '../../types/pocketbase.types';
import { AccountService } from '../../services/account.service';
import { AuthService } from '../../services/auth.service';
import { LifebuoyIcon, PlusIcon } from '@heroicons/vue/24/outline';
import AtomInput from '../atoms/AtomInput.vue';
import MoleculeAddAccountModal from '../molecules/MoleculeAddAccountModal.vue';
import MoleculeContactModal from '../molecules/MoleculeContactModal.vue';
import MoleculeDataTable, { TableHeaderType } from '../molecules/MoleculeDataTable.vue';
import MoleculeMigrateAccountModal from '../molecules/MoleculeMigrateAccountModal.vue';
import MoleculeAuthDialog from '../molecules/MoleculeAuthDialog.vue';

const isAuthenticated = ref(false);
const accountsSubscription = ref<UnsubscribeFunc>();
const transactionsSubscription = ref<UnsubscribeFunc>();

const accounts = ref<AccountsListResponse<number, string>[]>([]);
const initAccounts = ref<AccountsListResponse<number, string>[]>([]);
const searchQuery = ref('');
const contactId = ref('');
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
  {
    title: 'Letzter Check-In',
    key: 'lastCheckIn',
    type: TableHeaderType.DATETIME,
  },
  {
    title: 'Kontostand',
    key: 'balance',
    type: TableHeaderType.CURRENCY,
  },
  {
    title: 'Trans.',
    key: '',
    type: TableHeaderType.BUTTON_ACCOUNT,
  },
  {
    title: 'Pers. Daten',
    key: '',
    type: TableHeaderType.BUTTON_CONTACT,
  },
];

function openContactModal(id: string) {
  contactId.value = id;
}

// function addAccount(account: IAccountData) {
//   data.value.push(account);
//   initialData.value = data.value;
// }

useEventBus<boolean>('isAuthenticated').on(state => {
  isAuthenticated.value = state;
  if(isAuthenticated.value) {
    getData();
  }
});

async function getData() {
  initAccounts.value = await AccountService.getAccounts();
  accounts.value = initAccounts.value;
}

watch(
  searchQuery,
  (value) => {
    search(value);
  },
);

function search(value: string) {
  if(initAccounts.value) {
    accounts.value = initAccounts.value.filter((account) =>
      account.name?.toLocaleLowerCase().includes(value.toLocaleLowerCase()),
    );
  }
}

onMounted(async () => {
  isAuthenticated.value = AuthService.isAuthenticated();
  if(isAuthenticated.value) {
    getData();
  }
  accountsSubscription.value = await AccountService.subscribeToAccountChanges(async () => {
    await getData();
    search(searchQuery.value);
  });
  transactionsSubscription.value = await BankService.subscribeToTransactionChanges(async () => {
    await getData();
    search(searchQuery.value);
  });
});

onUnmounted(() => {
  accountsSubscription.value?.();
  transactionsSubscription.value?.();
});
</script>

<style lang="scss" scoped>
</style>