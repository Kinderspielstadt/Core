<script lang="ts" setup>
import { ColorsResponse } from '../../types/pocketbase.types';
import { DateService } from '../../services/date.service';
import { CurrencyService } from '../../services/currency.service';
import { FileService } from '../../services/file.service';
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import MoleculeColorSelector from '../molecules/MoleculeColorSelector.vue';
import { onMounted, ref, watch } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sortedData = ref<any[]>([]);
const currentSortKey = ref('');
const sortDirection = ref<'UP' | 'DOWN'>('DOWN');

const noSortKeys = [
  TableHeaderType.BUTTON_ACCOUNT,
  TableHeaderType.BUTTON_CONTACT,
  TableHeaderType.BUTTON_CHANGE_ACCOUNT_NUMBER,
];

const props = defineProps<{
  tableHeaders: { title: string; key: string; type: TableHeaderType }[];
  // Explicit allow any types as this is a dynamic list of data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  colors?: ColorsResponse[];
  cameraEnabled?: boolean;
  defaultSortKey?: string;
}>();

onMounted(() => {
  if (props.defaultSortKey) {
    sortData(props.defaultSortKey, true);
  }
  sortedData.value = props.data;
});

function sortData(key: string, automatic = false) {
  if (!props.tableHeaders || !sortedData.value) {
    return;
  }
  const header = props.tableHeaders.find((h) => h.key === key);
  if (!header) {
    return;
  }
  if (noSortKeys.includes(header.type)) {
    return;
  }
  if (currentSortKey.value === key && !automatic) {
    sortDirection.value = sortDirection.value === 'UP' ? 'DOWN' : 'UP';
    sortedData.value.reverse();
    return;
  }
  currentSortKey.value = key;
  if (!automatic) {
    sortDirection.value = 'DOWN';
  }
  sortedData.value.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  if (automatic && sortDirection.value === 'UP') {
    sortedData.value.reverse();
  }
}

defineEmits<{
  openContactModal: [id: string];
  changeAccountNumber: [id: string];
  updateColor: [id: string, colorId?: string];
  pictureClick: [id: string];
}>();

watch(
  () => props.data,
  () => {
    sortedData.value = props.data;
    if (currentSortKey.value) {
      sortData(currentSortKey.value, true);
    }
  },
);
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

<template>
  <div class="h-full overflow-x-auto rounded-lg">
    <table class="table table-zebra table-pin-rows mb-6">
      <thead class="uppercase">
        <tr class="z-0">
          <th
            v-for="header in tableHeaders"
            :key="header.key"
            class="select-none"
            :class="{
              'cursor-pointer': !noSortKeys.includes(header.type),
            }"
            @click="sortData(header.key)"
          >
            <div class="flex justify-between gap-2">
              {{ header.title }}
              <BarsArrowDownIcon
                v-if="header.key === currentSortKey && sortDirection === 'DOWN'"
                class="size-4"
              />
              <BarsArrowUpIcon
                v-else-if="
                  header.key === currentSortKey && sortDirection === 'UP'
                "
                class="size-4"
              />
              <div v-else class="size-4" />
            </div>
          </th>
        </tr>
      </thead>
      <tbody class="bg-base-100">
        <tr v-for="entry in sortedData" :key="entry">
          <td
            v-for="header in tableHeaders"
            :key="header.key"
            :class="{
              'text-center': [
                TableHeaderType.BUTTON_ACCOUNT,
                TableHeaderType.BUTTON_CONTACT,
              ].includes(header.type),
              'text-right': header.type === TableHeaderType.CURRENCY,
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
                :src="FileService.getSmallAvatar(entry.id, entry[header.key])"
                class="m-auto size-10 rounded-full"
              />
              <div
                v-else
                class="m-auto flex size-10 items-center justify-center rounded-full border border-base-content"
              >
                <XMarkIcon class="size-7" />
              </div>
            </span>
            <span v-else-if="header.type === TableHeaderType.COLOR">
              <MoleculeColorSelector
                v-if="colors"
                class="m-auto"
                :colors="colors"
                :selected-color="entry[header.key]"
                @select-color="
                  (colorId) => $emit('updateColor', entry.id, colorId)
                "
              />
            </span>
            <span v-else-if="header.type === TableHeaderType.VEGETARIAN">
              <div v-if="entry[header.key]" class="text-center text-2xl">
                🥦
              </div>
              <div v-else class="text-center text-2xl">🍗</div>
            </span>
            <span v-else-if="header.type === TableHeaderType.DATE">
              {{ DateService.toShortString(entry[header.key]) }}
            </span>
            <span v-else-if="header.type === TableHeaderType.DATETIME">
              {{
                entry[header.key]
                  ? DateService.toString(new Date(entry[header.key]))
                  : 'N/A'
              }}
            </span>
            <span v-else-if="header.type === TableHeaderType.CURRENCY">
              {{ CurrencyService.toString(entry[header.key]) }}
            </span>
            <button
              v-else-if="
                header.type === TableHeaderType.BUTTON_CHANGE_ACCOUNT_NUMBER
              "
              class="btn btn-ghost btn-sm p-1"
              @click="$emit('changeAccountNumber', entry.id)"
            >
              <div
                class="tooltip tooltip-left normal-case"
                data-tip="Kontonummer ändern"
              >
                <CreditCardIcon class="size-6" />
              </div>
            </button>
            <button
              v-else-if="header.type === TableHeaderType.BUTTON_CONTACT"
              class="btn btn-ghost btn-sm p-1"
              @click="$emit('openContactModal', entry.id)"
            >
              <DocumentTextIcon class="size-6" />
            </button>
            <RouterLink
              v-else-if="header.type === TableHeaderType.BUTTON_ACCOUNT"
              :to="`/bank?accountNumber=${entry.accountNumber}`"
              class="btn btn-ghost btn-sm p-1"
            >
              <CurrencyDollarIcon class="size-6" />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
