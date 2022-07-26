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
  <div class="fixed flex place-content-center lg:gap-32 gap-16 bg-base-100 bottom-0 lg:w-[calc(100%-16rem)] w-full p-5">
    <MoleculeInputModal
      :id="depositModalId"
      title="Einzahlung"
      action-label="Einzahlen"
      input-label="Einzuzahlender Betrag:"
      @submit="handleDeposit"
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
</template>

<script lang="ts" setup>
import { ITransaction } from '../../interfaces/transaction.interface';
import { CurrencyService } from '../services/currency.service';
import { CurrencyDollarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/outline';
import MoleculeTransactionTable from '../molecules/MoleculeTransactionTable.vue';
import MoleculeInputModal from '../molecules/MoleculeInputModal.vue';
import { onKeyStroke } from '@vueuse/core';
import { BankService, TransactionType } from '../services/bank.service';
import { onMounted, ref } from 'vue';
import { IAccount } from '../../interfaces/account.interface';

const DEMO_ACCOUNT_ID = '0000123456';

const accountDetails = ref<IAccount>();
const depositModalLabel = ref<HTMLLabelElement>();
const salaryModalLabel = ref<HTMLLabelElement>();
const withdrawModalLabel = ref<HTMLLabelElement>();

onMounted(async () => {
  // TODO: Remove this demo account id
  accountDetails.value = await BankService.getAccountDetails(DEMO_ACCOUNT_ID);
});

const depositModalId = 'deposit-modal';
const salaryModalId = 'salary-modal';
const withdrawModalId = 'withdraw-modal';

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

async function handleDeposit(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(DEMO_ACCOUNT_ID, amountNumber, TransactionType.DEPOSIT));
  }
}

async function handleSalary(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(DEMO_ACCOUNT_ID, amountNumber, TransactionType.SALARY));
  }
}

async function handleWithdraw(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber)) {
    updateTransactions(await BankService.addTransaction(DEMO_ACCOUNT_ID, amountNumber, TransactionType.WITHDRAW));
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