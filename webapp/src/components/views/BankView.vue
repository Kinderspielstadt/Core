<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { onKeyStroke, promiseTimeout } from '@vueuse/core';
import { UnsubscribeFunc } from 'pocketbase';
import {
  AccountsResponse,
  TransactionsResponse,
} from '../../types/pocketbase.types';
import { AccountService } from '../../services/account.service';
import { BankService, TransactionType } from '../../services/bank.service';
import { CurrencyService } from '../../services/currency.service';
import { FileService } from '../../services/file.service';
import {
  CurrencyDollarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  XCircleIcon,
  CreditCardIcon,
  BanknotesIcon,
} from '@heroicons/vue/24/outline';
import AtomHeroText from '../atoms/AtomHeroText.vue';
import MoleculeInputModal from '../molecules/MoleculeInputModal.vue';
import MoleculeTransactionTable from '../molecules/MoleculeTransactionTable.vue';

const router = useRouter();
const subscription = ref<UnsubscribeFunc>();

const account = ref<AccountsResponse | null>();
const transactions = ref<TransactionsResponse[]>();
const accountId = ref<string>('');
const inputBuffer = ref<string>('');
const error = ref('');
const depositModal = ref<InstanceType<typeof MoleculeInputModal>>();
const salaryModal = ref<InstanceType<typeof MoleculeInputModal>>();
const withdrawModal = ref<InstanceType<typeof MoleculeInputModal>>();

if (router.currentRoute.value.query.accountNumber) {
  accountId.value = router.currentRoute.value.query.accountNumber as string;
  getAccount();
  router.replace({ path: '/bank' });
}

onKeyStroke(['e', 'g', 'a'], (e) => {
  e.preventDefault();
  if (
    depositModal.value?.isOpen() ||
    salaryModal.value?.isOpen() ||
    withdrawModal.value?.isOpen()
  ) {
    return;
  }
  switch (e.key) {
    case 'e':
      depositModal.value?.show();
      break;
    case 'g':
      salaryModal.value?.show();
      break;
    case 'a':
      withdrawModal.value?.show();
      break;
  }
});

onKeyStroke(
  ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'Enter'],
  (e) => {
    if (
      depositModal.value?.isOpen() ||
      salaryModal.value?.isOpen() ||
      withdrawModal.value?.isOpen()
    ) {
      return;
    }
    error.value = '';
    e.preventDefault();
    if (e.key === 'Enter') {
      accountId.value = inputBuffer.value;
      inputBuffer.value = '';
      getAccount();
    } else {
      inputBuffer.value += e.key;
    }
  },
);

async function getAccount() {
  account.value = null;
  transactions.value = [];
  try {
    account.value = await AccountService.getAccount(accountId.value);
    transactions.value = await BankService.getTransactions(account.value.id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    if (e.status == 404) {
      error.value = 'Der Account wurde nicht gefunden.';
      await promiseTimeout(4000);
      error.value = '';
    } else {
      error.value =
        'Ein unerwarteter Fehler ist aufgetreten. Bitte kontaktiere einen Administrator.';
      // eslint-disable-next-line no-console
      console.error(e);
    }
  }
}

function getBalance(): number {
  return (
    transactions.value?.reduce(
      (acc, transaction) => acc + transaction.amount,
      0,
    ) ?? 0
  );
}

async function handleDeposit(amount: string) {
  const amountNumber = parseInt(amount);
  if (amountNumber > 1000) {
    return;
  }
  if (!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(
      account.value.id,
      amountNumber,
      TransactionType.DEPOSIT,
    );
  }
}

async function handleSalary(amount: string) {
  const amountNumber = parseInt(amount);
  if (amountNumber > 1000) {
    return;
  }
  if (!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(
      account.value.id,
      amountNumber,
      TransactionType.SALARY,
    );
  }
}

async function handleWithdraw(amount: string) {
  const amountNumber = parseInt(amount);
  if (amountNumber > 1000) {
    return;
  }
  if (!isNaN(amountNumber) && account.value) {
    await BankService.addTransaction(
      account.value.id,
      -amountNumber,
      TransactionType.WITHDRAW,
    );
  }
}

onMounted(async () => {
  subscription.value = await BankService.subscribeToTransactionChanges(
    (transactionSubscription) => {
      if (
        transactions.value &&
        transactionSubscription.record.account === account.value?.id
      ) {
        switch (transactionSubscription.action) {
          case 'create':
            transactions.value.unshift(transactionSubscription.record);
            break;
          case 'update':
            transactions.value = transactions.value.map((transaction) => {
              if (transaction.id == transactionSubscription.record.id) {
                transaction = transactionSubscription.record;
              }
              return transaction;
            });
            break;
          case 'delete':
            transactions.value = transactions.value.filter(
              (transaction) =>
                transaction.id !== transactionSubscription.record.id,
            );
            break;
        }
      }
    },
  );
});

onUnmounted(() => {
  subscription.value?.();
});
</script>

<template>
  <div>
    <div
      v-if="account"
      class="hero-content flex-col gap-4 pt-0 text-center lg:p-6"
    >
      <div class="flex items-center gap-8">
        <img
          :src="FileService.getAvatar(account.id, account.picture)"
          class="h-64 w-64 rounded-lg"
        />
        <div class="flex flex-col items-start gap-4">
          <h3 class="text-left text-5xl font-bold">
            {{ `${account.firstName} ${account.lastName}` }}
          </h3>
          <h4 class="text-4xl">
            <CreditCardIcon class="mr-4 inline h-10 w-10" />
            {{ account.accountNumber }}
          </h4>
          <h1 class="text-4xl">
            <BanknotesIcon class="mr-4 inline h-10 w-10" />
            {{ CurrencyService.toString(getBalance()) }}
          </h1>
        </div>
      </div>
      <MoleculeTransactionTable
        v-if="transactions"
        class="mb-24 max-w-[42rem]"
        :balance="getBalance()"
        :transactions="transactions"
      />
    </div>
    <div
      v-if="account"
      class="fixed bottom-0 flex w-full place-content-center gap-16 bg-base-100 p-5 lg:w-[calc(100%-16rem)] lg:gap-32"
    >
      <MoleculeInputModal
        id="deposit-modal"
        ref="depositModal"
        title="Einzahlung"
        action-label="Einzahlen"
        input-label="Einzuzahlender Betrag"
        @submit="handleDeposit"
      />
      <button class="btn gap-2" @click="() => depositModal?.show()">
        <ChevronUpIcon class="h-6 w-6 text-success" />
        Einzahlen
      </button>
      <MoleculeInputModal
        id="salary-modal"
        ref="salaryModal"
        title="Gehalt"
        action-label="Gehalt hinzufügen"
        input-label="Gehalt Betrag"
        @submit="handleSalary"
      />
      <button class="btn gap-2" @click="() => salaryModal?.show()">
        <CurrencyDollarIcon class="h-6 w-6 text-warning" />
        Gehalt
      </button>
      <MoleculeInputModal
        id="withdraw-modal"
        ref="withdrawModal"
        title="Auszahlung"
        action-label="Auszahlen"
        input-label="Auszuzahlender Betrag"
        @submit="handleWithdraw"
      />
      <button class="btn gap-2" @click="() => withdrawModal?.show()">
        <ChevronDownIcon class="h-6 w-6 text-error" />
        Auszahlen
      </button>
    </div>
    <AtomHeroText v-else>
      Bitte Karte scannen...
      <div v-if="error" class="alert alert-error mt-6 shadow-lg">
        <XCircleIcon class="h-6 w-6" />
        <span class="text-base font-normal"><b>Fehler: </b>{{ error }}</span>
      </div>
    </AtomHeroText>
  </div>
</template>
