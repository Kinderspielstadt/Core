<template>
  <table class="table table-zebra">
    <thead>
      <tr>
        <th />
        <th class="normal-case text-lg text-right">{{ CurrencyService.toString(balance) }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions">
        <td>
          <div class="flex items-center">
            <div>
              <div class="font-bold">{{ transaction.label }}</div>
              <div>{{ DateService.toString(transaction.date) }}</div>
            </div>
          </div>
        </td>
        <td
          v-if="transaction.amount < 0"
          class="text-right text-error"
        >
          {{ CurrencyService.toSignedString(transaction.amount) }}
        </td>
        <td
          v-else
          class="text-right text-success"
        >
          {{ CurrencyService.toSignedString(transaction.amount) }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { ITransaction } from '../../interfaces/transaction.interface';
import { CurrencyService } from '../services/currency.service';
import { DateService } from '../services/date.service';

defineProps({
  transactions: {
    type: Array as PropType<ITransaction[]>,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>

</style>