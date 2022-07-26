<template>
  <AtomModal
    :id="id"
    title="Account hinzufügen"
  >
    <div class="flex flex-col gap-4">
      <h4 class="text-md">Daten</h4>
      <div class="flex gap-4">
        <AtomInput
          v-model="firstName"
          placeholder="Vorname"
        />
        <AtomInput placeholder="Nachname" />
      </div>
      <AtomInput
        placeholder="Kontonummer"
        type="number"
      />
      <AtomInput
        placeholder="Geburtsdatum"
        type="number"
      />
      <div class="flex gap-4">
        <AtomInput placeholder="Straße" />
        <AtomInput
          placeholder="Hnr."
          class="w-3/12"
        />
      </div>
      <div class="flex gap-4">
        <AtomInput
          placeholder="Postleitzahl"
          class="w-6/12"
        />
        <AtomInput placeholder="Stadt" />
      </div>
      <h4 class="text-md">Kontakt</h4>
      <div class="flex gap-4">
        <AtomSelect
          placeholder="Label"
          :options="['Festnetz', 'Mobil', 'Arbeit']"
          class="w-4/12"
        />
        <AtomInput placeholder="Telefonnummer" />
      </div>
    </div>
    <template #action>
      <label
        ref="abortButton"
        class="btn gap-2"
        :for="id"
      >
        <XCircleIcon class="w-6 h-6" />
        Abbrechen
      </label>
      <button
        class="btn gap-2"
        @click="handleSubmit()"
      >
        <CheckCircleIcon class="w-6 h-6" />
        Speichern
      </button>
    </template>
  </AtomModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import AtomInput from '../atoms/AtomInput.vue';
import AtomModal from '../atoms/AtomModal.vue';
import AtomSelect from '../atoms/AtomSelect.vue';

const firstName = ref('');

defineProps({
  id: {
    type: String,
    required: true,
  },
});

function handleSubmit() {
  console.log('TODO: Submit');
  console.log(firstName.value);
}
</script>

<style lang="scss" scoped>

</style>