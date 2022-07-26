<template>
  <div class="overflow-x-auto">
    <table class="table w-full table-zebra">
      <thead class="sticky top-0">
        <tr>
          <th v-for="header in tableHeaders">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in data">
          <td
            v-for="header in tableHeaders"
            :class="[TableHeaderType.BUTTON_ACCOUNT, TableHeaderType.BUTTON_CONTACT].includes(header.type) ? 'text-center' : null"
          >
            <span v-if="header.type === TableHeaderType.STRING">
              {{ entry[header.key] }}
            </span>
            <span v-else-if="header.type === TableHeaderType.DATE">
              {{ DateService.toShortString(entry[header.key]) }}
            </span>
            <span v-else-if="header.type === TableHeaderType.DATETIME">
              {{ DateService.toString(entry[header.key]) }}
            </span>
            <span v-else-if="header.type === TableHeaderType.CURRENCY">
              {{ CurrencyService.toString(entry[header.key]) }}
            </span>
            <button
              v-if="header.type === TableHeaderType.BUTTON_CONTACT"
              class="btn btn-sm btn-ghost p-1"
            >
              <DocumentTextIcon class="h-6 w-6" />
            </button>
            <button
              v-if="header.type === TableHeaderType.BUTTON_ACCOUNT"
              class="btn btn-sm btn-ghost p-1"
            >
              <CurrencyDollarIcon class="h-6 w-6" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { CurrencyService } from '../services/currency.service';
import { DateService } from '../services/date.service';
import { CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/vue/outline';


defineProps({
  tableHeaders: {
    type: Array as PropType<{ title: string, key: string, type: TableHeaderType }[]>,
    required: true,
  },
  data: {
    // Explicit allow any types as this is a dynamic list of data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    type: Array as PropType<any[]>,
    required: true,
  },
});
</script>

<script lang="ts">
export enum TableHeaderType {
  STRING,
  DATE,
  CURRENCY,
  DATETIME,
  BUTTON_CONTACT,
  BUTTON_ACCOUNT,
}
</script>

<style lang="scss" scoped>
.table th:first-child {
  position: inherit;
}
</style>