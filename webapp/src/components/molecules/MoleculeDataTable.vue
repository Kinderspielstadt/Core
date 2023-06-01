<template>
  <div class="overflow-x-auto">
    <table class="table-zebra table w-full">
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
              {{ entry[header.key] ? DateService.toString(new Date(entry[header.key])): 'N/A' }}
            </span>
            <span v-else-if="header.type === TableHeaderType.CURRENCY">
              {{ CurrencyService.toString(entry[header.key]) }}
            </span>
            <label
              v-if="header.type === TableHeaderType.BUTTON_CONTACT"
              :for="contactModalId"
              class="btn-ghost btn-sm btn p-1"
              @click="$emit('open-contact-modal', entry.id)"
            >
              <DocumentTextIcon class="h-6 w-6" />
            </label>
            <RouterLink
              v-if="header.type === TableHeaderType.BUTTON_ACCOUNT"
              :to="`/bank?accountNumber=${entry.accountNumber}`"
              class="btn-ghost btn-sm btn p-1"
            >
              <CurrencyDollarIcon class="h-6 w-6" />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { DateService } from '../../services/date.service';
import { CurrencyService } from '../../services/currency.service';
import { CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/vue/24/outline';

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
  contactModalId: {
    type: String,
    required: true,
  },
});

defineEmits(['open-contact-modal']);
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