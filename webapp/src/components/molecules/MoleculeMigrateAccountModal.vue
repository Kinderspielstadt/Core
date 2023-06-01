<template>
  <AtomModal
    :id="id"
    title="Kontonummer ändern"
  >
    <div class="flex flex-col gap-4">
      <AtomInput
        v-model="oldAccountNumber"
        placeholder="Alte Kontonummer"
        type="number"
      />
      <AtomInput
        v-model="newAccountNumber"
        placeholder="Neue Kontonummer"
        type="number"
      />
    </div>
    <template #action>
      <label
        ref="abortButton"
        :for="id"
        class="btn gap-2"
      >
        <XCircleIcon class="h-6 w-6" />
        Abbrechen
      </label>
      <button
        class="btn gap-2"
        @click="handleSubmit"
      >
        <CheckCircleIcon class="h-6 w-6" />
        Speichern
      </button>
    </template>
  </AtomModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomInput from '../atoms/AtomInput.vue';
import AtomModal from '../atoms/AtomModal.vue';

const abortButton = ref();
const oldAccountNumber = ref('');
const newAccountNumber = ref('');

defineProps({
  id: {
    type: String,
    required: true,
  },
});

async function handleSubmit() {
  alert('TODO: Implement handleSubmit');
  // try {
  //   const isSuccess = await DataService.migrateAccount(oldAccountNumber.value, newAccountNumber.value);
  //   emit('submit', isSuccess);
  //   abortButton.value.click();
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (error: any) {
  //   alert('Fehler beim Migrieren');
  //   // eslint-disable-next-line no-console
  //   console.error(error);

  // }
}

const emit = defineEmits(['submit']);
</script>

<style lang="scss" scoped>

</style>