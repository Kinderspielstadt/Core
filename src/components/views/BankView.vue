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
    <button class="btn gap-2">
      <ChevronUpIcon class="w-6 h-6 text-success" />
      Einzahlen
    </button>
    <button class="btn gap-2">
      <CurrencyDollarIcon class="w-6 h-6 text-warning" />
      Gehalt
    </button>
    <button class="btn gap-2">
      <ChevronDownIcon class="w-6 h-6 text-error" />
      Auszahlen
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ITransaction } from '../../interfaces/transaction.interface';
import { CurrencyService } from '../services/currency.service';
import MoleculeTransactionTable from '../molecules/MoleculeTransactionTable.vue';
import { CurrencyDollarIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/outline';

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
</script>

<style lang="scss" scoped>

</style>