<template>
  <div class="hero-content flex-col text-center lg:p-6 pt-0">
    <h1 class="text-8xl mt-5">{{ CurrencyService.toString(balance) }}</h1>
    <h3 class="text-5xl font-bold mt-10">Kontoinhaber: John Doe</h3>
    <h4 class="text-4xl mb-10">Kontonummer: 0000123456</h4>
    <MoleculeTransactionTable
      class="w-[42rem]"
      :balance="balance"
      :transactions="transactions"
    />
  </div>
  <div class="sticky flex place-content-center lg:gap-32 gap-16 bg-base-100 bottom-0 w-100 p-5">
    <MoleculeInputModal
      :id="depositModalId"
      title="Einzahlung"
      action-label="Einzahlen"
      input-label="Einzuzahlender Betrag:"
      @submit="handleDeposit"
    />
    <label
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

const depositModalId = 'deposit-modal';
const salaryModalId = 'salary-modal';
const withdrawModalId = 'withdraw-modal';
const balance = 13500;
const transactions: ITransaction[] = [
  {
    type: 'Kontoeröffnung',
    date: new Date(2022, 7, 12, 17, 30, 0),
    amount: 500,
  },
  {
    type: 'Bargeldeinzahlung',
    date: new Date(2022, 7, 12, 17, 30, 10),
    amount: 10000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Gehalt',
    date: new Date(2022, 7, 12, 17, 34, 10),
    amount: 5000,
  },
  {
    type: 'Bargeldauszahlung',
    date: new Date(2022, 7, 15, 18, 26, 0),
    amount: -2000,
  },
].sort((a, b) => b.date.getTime() - a.date.getTime());



onKeyStroke('e', (e) => {
  e.preventDefault();
  console.log('e pressed');
  // TODO: open deposit modal
});

function handleDeposit(amount: number) {
  console.log('Deposit:', amount);
}

function handleSalary(amount: number) {
  console.log('Salary:', amount);
}

function handleWithdraw(amount: number) {
  console.log('Withdraw:', amount);
}
</script>

<style lang="scss" scoped>

</style>