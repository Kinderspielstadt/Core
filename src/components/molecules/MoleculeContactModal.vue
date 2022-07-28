<template>
  <AtomModal
    :id="id"
    :title="`Kontaktdaten von ${name}`"
    darker
    close-button
  >
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <tbody>
          <tr v-for="entry of contact">
            <td>{{ JSON.parse(entry).label }}</td>
            <td>{{ JSON.parse(entry).phone }}</td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="contact.length == 0"
        class="alert alert-info shadow-lg"
      >
        <div>
          <InformationCircleIcon class="h-6 w-6" />
          <span>Keine Kontaktdaten vorhanden.</span>
        </div>
      </div>
    </div>
  </AtomModal>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { InformationCircleIcon } from '@heroicons/vue/outline';
import AtomModal from '../atoms/AtomModal.vue';

defineProps({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>

</style>