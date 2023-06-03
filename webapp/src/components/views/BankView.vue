<template>
  <div
    v-if="account"
    class="hero-content flex-col pt-0 text-center lg:p-6"
  >
    <h1 class="mt-5 text-8xl">{{ CurrencyService.toString(getBalance()) }}</h1>
    <h3 class="mt-10 text-5xl font-bold">Kontoinhaber: {{ `${account.firstName} ${account.lastName}` }}</h3>
    <h4 class="mb-10 text-4xl">Kontonummer: {{ account.accountNumber }}</h4>
    <MoleculeTransactionTable
      v-if="transactions"
      class="mb-24 max-w-[42rem]"
      :balance="getBalance()"
      :transactions="transactions"
    />
  </div>
  <div
    v-if="account"
    class="fixed bottom-0 flex place-content-center gap-16 bg-base-100 p-5 lg:w-[calc(100%-16rem)] lg:gap-32"
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
      <ChevronUpIcon class="h-6 w-6 text-success" />
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
      <CurrencyDollarIcon class="h-6 w-6 text-warning" />
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
      <ChevronDownIcon class="h-6 w-6 text-error" />
      Auszahlen
    </label>
  </div>
  <AtomHeroText v-else>
    Bitte Karte scannen...
    <div
      v-if="error"
      class="alert alert-error mt-6 shadow-lg"
    >
      <XCircleIcon class="h-6 w-6" />
      <span class="text-base font-normal"><b>Fehler: </b>{{ error }}</span>
    </div>
  </AtomHeroText>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onKeyStroke, promiseTimeout } from '@vueuse/core';
import { UnsubscribeFunc } from 'pocketbase';
import { AccountsResponse, TransactionsResponse } from '../../types/pocketbase.types';
import { AccountService } from '../../services/account.service';
import { BankService, TransactionType } from '../../services/bank.service';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyDollarIcon, ChevronDownIcon, ChevronUpIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomHeroText from '../atoms/AtomHeroText.vue';
import MoleculeInputModal from '../molecules/MoleculeInputModal.vue';
import MoleculeTransactionTable from '../molecules/MoleculeTransactionTable.vue';

const router = useRouter();
const subscription = ref<UnsubscribeFunc>();

const account = ref<AccountsResponse|null>();
const transactions = ref<TransactionsResponse[]>();
const depositModalLabel = ref<HTMLLabelElement>();
const salaryModalLabel = ref<HTMLLabelElement>();
const withdrawModalLabel = ref<HTMLLabelElement>();
const accountId = ref<string>('');
const inputBuffer = ref<string>('');
const depositModalOpen = ref<boolean>(false);
const salaryModalOpen = ref<boolean>(false);
const withdrawModalOpen = ref<boolean>(false);
const error = ref('');

const depositModalId = 'deposit-modal';
const salaryModalId = 'salary-modal';
const withdrawModalId = 'withdraw-modal';

if(router.currentRoute.value.query.accountNumber) {
  accountId.value = router.currentRoute.value.query.accountNumber as string;
  getAccount();
  router.replace({ path: '/bank' });
}

onKeyStroke(['e', 'g', 'a'], (e) => {
  e.preventDefault();
  if(depositModalOpen.value || salaryModalOpen.value || withdrawModalOpen.value) {
    return;
  }
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
  error.value = '';
  e.preventDefault();
  if(e.key === 'Enter') {
    accountId.value = inputBuffer.value;
    inputBuffer.value = '';
    getAccount();
  } else {
    inputBuffer.value += e.key;
  }
});

async function getAccount() {
  account.value = null;
  transactions.value = [];
  try {
    account.value = await AccountService.getAccount(accountId.value);
    transactions.value = await BankService.getTransactions(account.value.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if(e.status == 404) {
      error.value = 'Der Account wurde nicht gefunden.';
      await promiseTimeout(4000);
      error.value = '';
    } else {
      error.value = 'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.';
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

function getBalance(): number {
  return transactions.value?.reduce((acc, transaction) => acc + transaction.amount, 0) ?? 0;
}

async function handleDeposit(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(account.value.id, amountNumber, TransactionType.DEPOSIT);
  }
}

async function handleSalary(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(account.value.id, amountNumber, TransactionType.SALARY);
  }
}

async function handleWithdraw(amount: string) {
  const amountNumber = parseInt(amount);
  if(!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(account.value.id, -amountNumber, TransactionType.WITHDRAW);
  }
}

onMounted(async () => {
  subscription.value = await BankService.subscribeToTransactionChanges((transactionSubscription) => {
    if(transactions.value && transactionSubscription.record.account === account.value?.id) {
      switch (transactionSubscription.action) {
      case 'create':
        transactions.value.unshift(transactionSubscription.record);
        break;
      case 'update':
        transactions.value = transactions.value.map((transaction) => {
          if(transaction.id == transactionSubscription.record.id) {
            transaction = transactionSubscription.record;
          }
          return transaction;
        });
        break;
      case 'delete':
        transactions.value = transactions.value.filter((transaction) => transaction.id !== transactionSubscription.record.id);
        break;
      }
    }
  });
});

onUnmounted(() => {
  subscription.value?.();
});
</script>

<style lang="scss" scoped>

</style>