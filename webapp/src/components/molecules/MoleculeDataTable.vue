<template>
  <div class="h-full overflow-x-auto rounded-lg">
    <table class="table table-zebra table-pin-rows">
      <thead class="uppercase">
        <tr>
          <th v-for="header in tableHeaders">{{ header.title }}</th>
        </tr>
      </thead>
      <tbody class="bg-base-100">
        <tr v-for="entry in data">
          <td
            v-for="header in tableHeaders"
            :class="{
              'text-center' : [TableHeaderType.BUTTON_ACCOUNT, TableHeaderType.BUTTON_CONTACT].includes(header.type),
              'text-right' : header.type === TableHeaderType.CURRENCY,
              'p-0': header.type === TableHeaderType.PICTURE,
            }"
          >
            <span v-if="header.type === TableHeaderType.STRING">
              {{ entry[header.key] }}
            </span>
            <span
              v-else-if="header.type === TableHeaderType.PICTURE"
              :class="{
                'cursor-pointer': cameraEnabled,
              }"
              @click="$emit('pictureClick', entry.id)"
            >
              <img
                v-if="entry[header.key]"
                :src="FileService.getAvatar(entry.id, entry[header.key])"
                class="m-auto h-10 w-10 rounded-full"
              />
              <div
                v-else
                class="m-auto flex h-10 w-10 items-center justify-center rounded-full border border-base-content"
              >
                <XMarkIcon class="h-7 w-7" />
              </div>
            </span>
            <span v-else-if="header.type === TableHeaderType.COLOR">
              <MoleculeColorSelector
                v-if="colors"
                class="m-auto"
                :colors="colors"
                :selected-color="entry[header.key]"
                @select-color="colorId => $emit('updateColor', entry.id, colorId)"
              />
            </span>
            <span v-else-if="header.type === TableHeaderType.VEGETARIAN">
              <div
                v-if="entry[header.key]"
                class="text-center text-2xl"
              >🥦</div>
              <div
                v-else
                class="text-center text-2xl"
              >🍗</div>
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
            <button
              v-else-if="header.type === TableHeaderType.BUTTON_CHANGE_ACCOUNT_NUMBER"
              class="btn btn-ghost btn-sm p-1"
              @click="$emit('changeAccountNumber', entry.id)"
            >
              <div
                class="tooltip tooltip-left normal-case"
                data-tip="Kontonummer ändern"
              >
                <CreditCardIcon class="h-6 w-6" />
              </div>
            </button>
            <button
              v-else-if="header.type === TableHeaderType.BUTTON_CONTACT"
              class="btn btn-ghost btn-sm p-1"
              @click="$emit('openContactModal', entry.id)"
            >
              <DocumentTextIcon class="h-6 w-6" />
            </button>
            <RouterLink
              v-else-if="header.type === TableHeaderType.BUTTON_ACCOUNT"
              :to="`/bank?accountNumber=${entry.accountNumber}`"
              class="btn btn-ghost btn-sm p-1"
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
import { ColorsResponse } from '../../types/pocketbase.types';
import { DateService } from '../../services/date.service';
import { CurrencyService } from '../../services/currency.service';
import { FileService } from '../../services/file.service';
import { CreditCardIcon, CurrencyDollarIcon, DocumentTextIcon, XMarkIcon } from '@heroicons/vue/24/outline';
import MoleculeColorSelector from '../molecules/MoleculeColorSelector.vue';

defineProps<{
  tableHeaders: { title: string, key: string, type: TableHeaderType }[],
  // Explicit allow any types as this is a dynamic list of data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[],
  colors?: ColorsResponse[],
  cameraEnabled?: boolean,
}>();

defineEmits<{
  openContactModal: [id: string],
  changeAccountNumber: [id: string],
  updateColor: [id: string, colorId: string],
  pictureClick: [id: string],
}>();
</script>

<script lang="ts">
export enum TableHeaderType {
  STRING,
  DATE,
  PICTURE,
  CURRENCY,
  COLOR,
  VEGETARIAN,
  DATETIME,
  BUTTON_CONTACT,
  BUTTON_ACCOUNT,
  BUTTON_CHANGE_ACCOUNT_NUMBER,
}
</script>

<style lang="scss" scoped>

</style>