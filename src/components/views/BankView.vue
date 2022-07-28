<template>
  <div
    v-if="accountDetails"
    class="hero-content flex-col text-center lg:p-6 pt-0"
  >
    <h1 class="text-8xl mt-5">{{ CurrencyService.toString(accountDetails.balance) }}</h1>
    <h3 class="text-5xl font-bold mt-10">Kontoinhaber: {{ `${accountDetails.firstName} ${accountDetails.lastName}` }}</h3>
    <h4 class="text-4xl mb-10">Kontonummer: {{ accountDetails.accountNumber }}</h4>
    <MoleculeTransactionTable
      class="w-[42rem] mb-24"
      :balance="accountDetails.balance"
      :transactions="accountDetails.transactions"
    />
  </div>
  <div
    v-if="accountDetails"
    class="fixed flex place-content-center lg:gap-32 gap-16 bg-base-100 bottom-0 lg:w-[calc(100%-16rem)] p-5"
  >
    <MoleculeInputModal
      :id="depositModalId"
      title="Einzahlung"
      action-label="Einzahlen"
      input-label="Einzuzahlender Betrag:"
      @submit="handleDeposit"
      @open="depositModalOpen = $event.open"
    />
    <label
      ref="depositModalLabel"
      class="btn gap-2"
      :for="depositModalId"
    >
      <ChevronUpIcon class="w-6 h-6 text-success" />
      Einzahlen
    </label>
    <MoleculeInputModal
      :id="salaryModalId"
      title="Gehalt"
      action-label="Gehalt hinzufügen"
      input-label="Gehalt Betrag:"
      @submit="handleSalary"
      @open="salaryModalOpen = $event.open"
    />
    <label
      ref="salaryModalLabel"
      class="btn gap-2"
      :for="salaryModalId"
    >
      <CurrencyDollarIcon class="w-6 h-6 text-warning" />
      Gehalt
    </label>
    <MoleculeInputModal
      :id="withdrawModalId"
      title="Auszahlung"
      action-label="Auszahlen"
      input-label="Auszuzahlender Betrag:"
      @submit="handleWithdraw"
      @open="withdrawModalOpen = $event.open"
    />
    <label
      ref="withdrawModalLabel"
      class="btn gap-2"
      :for="withdrawModalId"
    >
      <ChevronDownIcon class="w-6 h-6 text-error" />
      Auszahlen
    </label>
  </div>
  <AtomHeroText v-else>
    Bitte Karte scannen...
    <div
      v-if="accountNotFound"
      class="alert alert-error shadow-lg mt-6"
    >
      <div>
        <XCircleIcon class="w-6 h-6" />
        <span class="text-base font-normal">Fehler: Der Account wurde nicht gefunden.</span>
      </div>
    </div>
  </AtomHeroText>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onKeyStroke, promiseTimeout } from '@vueuse/core';
import { BankService, TransactionType } from '../services/bank.service';
import { CurrencyService } from '../services/currency.service';
import { IAccount } from '../../interfaces/account.interface';
import { ITransaction } from '../../interfaces/transaction.interface';
import { CurrencyDollarIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/vue/outline';
import AtomHeroText from '../atoms/AtomHeroText.vue';
import MoleculeInputModal from '../molecules/MoleculeInputModal.vue';
import MoleculeTransactionTable from '../molecules/MoleculeTransactionTable.vue';

const route = useRoute();
const router = useRouter();

const accountDetails = ref<IAccount>();
const depositModalLabel = ref<HTMLLabelElement>();
const salaryModalLabel = ref<HTMLLabelElement>();
const withdrawModalLabel = ref<HTMLLabelElement>();
const accountId = ref<string>('');
const inputBuffer = ref<string>('');
const depositModalOpen = ref<boolean>(false);
const salaryModalOpen = ref<boolean>(false);
const withdrawModalOpen = ref<boolean>(false);
const accountNotFound = ref<boolean>(false);

const depositModalId = 'deposit-modal';
const salaryModalId = 'salary-modal';
const withdrawModalId = 'withdraw-modal';

if(route.query.accountNumber) {
  accountId.value = route.query.accountNumber as string;
  getAccountDetails();
  router.replace({ path: '/bank' });
}

onKeyStroke(['e', 'g', 'a'], (e) => {
  e.preventDefault();
  switch (e.key) {
  case 'e':
    depositModalLabel.value?.click();
    break;
  case 'g':
    salaryModalLabel.value?.click();
    break;
  case 'a':
    withdrawModalLabel.value?.click();
    break;
  }
});

onKeyStroke(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'], (e) => {
  if(depositModalOpen.value || salaryModalOpen.value || withdrawModalOpen.value) {
    return;
  }
  accountNotFound.value = false;
  e.preventDefault();
  if(e.key === 'Enter') {
    accountId.value = inputBuffer.value;
    inputBuffer.value = '';
    getAccountDetails();
  } else {
    inputBuffer.value += e.key;
  }
});

async function getAccountDetails() {
  try {
    accountDetails.value = await BankService.getAccountDetails(accountId.value);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if(error.message == 'Account not found') {
      accountNotFound.value = true;
      await promiseTimeout(3000);
      accountNotFound.value = false;
    } else {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }
}

async function handleDeposit(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(accountId.value, amountNumber, TransactionType.DEPOSIT));
  }
}

async function handleSalary(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(accountId.value, amountNumber, TransactionType.SALARY));
  }
}

async function handleWithdraw(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(accountId.value, amountNumber, TransactionType.WITHDRAW));
  }
}

function updateTransactions(transaction: ITransaction) {
  if(accountDetails.value) {
    accountDetails.value.balance += transaction.amount;
    accountDetails.value.transactions.unshift(transaction);
  }
}
</script>

<style lang="scss" scoped>

</style>