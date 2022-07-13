<template>
  <div class="overflow-x-auto">
    <table class="table w-full table-zebra">
      <thead class="sticky top-0">
        <tr>
          <th v-for="(_, key) of data[0]">{{ key }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entries in data">
          <td
            v-for="(entry, _, key) of entries"
            :class="key >= 6 ? 'text-center' : null"
          >
            <span v-if="key < 6">{{ entry }}</span>
            <button
              v-if="key == 6"
              class="btn btn-sm btn-ghost p-1"
            >
              <DocumentTextIcon
                class="h-6 w-6"
              />
            </button>
            <button
              v-if="key == 7"
              class="btn btn-sm btn-ghost p-1"
            >
              <CurrencyDollarIcon
                class="h-6 w-6"
              />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>import { PropType } from 'vue';
import { CurrencyDollarIcon, DocumentTextIcon } from '@heroicons/vue/outline';

defineProps({
  data: {
    type: Array as PropType<object[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>

</style>