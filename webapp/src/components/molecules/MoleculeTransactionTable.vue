<template>
  <table class="table table-zebra overflow-hidden rounded-lg">
    <thead class="bg-base-200">
      <tr>
        <th />
        <th class="text-right text-lg normal-case text-base-content">{{ CurrencyService.toString(balance) }}</th>
      </tr>
    </thead>
    <tbody class="bg-base-100">
      <tr v-for="transaction in transactions">
        <td>
          <div class="flex items-center">
            <div>
              <div class="font-bold">{{ transaction.label }}</div>
              <div>{{ DateService.toString(new Date(transaction.created)) }}</div>
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
import { CurrencyService } from '../../services/currency.service';
import { DateService } from '../../services/date.service';
import { TransactionsResponse } from '../../types/pocketbase.types';

defineProps({
  transactions: {
    type: Array as PropType<TransactionsResponse[]>,
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