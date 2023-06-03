<template>
  <AtomModal
    :id="id"
    title="Account hinzufügen"
  >
    <div class="flex flex-col gap-4">
      <h4 class="text-lg">Daten</h4>
      <div class="flex gap-4">
        <AtomInput
          v-model="firstName"
          placeholder="Vorname"
        />
        <AtomInput
          v-model="lastName"
          placeholder="Nachname"
        />
      </div>
      <AtomInput
        v-model="accountNumber"
        placeholder="Kontonummer"
        type="number"
      />
      <AtomInput
        v-model="birthday"
        placeholder="Geburtsdatum"
      />
      <div class="flex gap-4">
        <AtomInput
          v-model="street"
          placeholder="Straße"
        />
        <AtomInput
          v-model="houseNumber"
          placeholder="Hnr."
          class="w-3/12"
        />
      </div>
      <div class="flex gap-4">
        <AtomInput
          v-model="zipCode"
          placeholder="Postleitzahl"
          class="w-6/12"
        />
        <AtomInput
          v-model="city"
          placeholder="Stadt"
        />
      </div>
      <h4 class="text-lg">Kontakt</h4>
      <div
        v-for="index in contactCount"
        class="flex gap-4"
      >
        <AtomSelect
          v-model="contactLabel[index - 1]"
          placeholder="Label"
          :options="['Festnetz', 'Mobil', 'Arbeit']"
          class="w-4/12"
          @change="handleContactChange(index)"
        />
        <AtomInput
          v-model="contactPhone[index - 1]"
          :disabled="contactLabel.length < index"
          placeholder="Telefonnummer"
        />
      </div>
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
import AtomSelect from '../atoms/AtomSelect.vue';

const abortButton = ref();
const firstName = ref('');
const lastName = ref('');
const accountNumber = ref('');
const birthday = ref('');
const street = ref('');
const houseNumber = ref('');
const zipCode = ref('');
const city = ref('');
const contactLabel = ref([]);
const contactPhone = ref([]);
const contactCount = ref(1);

defineProps({
  id: {
    type: String,
    required: true,
  },
});

async function handleSubmit() {
  alert('TODO: Implement handleSubmit');
  // try {
  //   const account = await DataService.addAccount(
  //     {
  //       accountNumber: accountNumber.value,
  //       firstName: firstName.value,
  //       lastName: lastName.value,
  //       birthday: birthday.value,
  //       address: `${street.value} ${houseNumber.value}, ${zipCode.value} ${city.value}`,
  //       contact: contactLabel.value.map((label, index) => JSON.stringify({
  //         label,
  //         phone: contactPhone.value[index],
  //       })),
  //     },
  //   );
  //   emit('submit', account);
  //   firstName.value = '';
  //   lastName.value = '';
  //   accountNumber.value = '';
  //   birthday.value = '';
  //   street.value = '';
  //   houseNumber.value = '';
  //   zipCode.value = '';
  //   city.value = '';
  //   contactLabel.value = [];
  //   contactPhone.value = [];
  //   contactCount.value = 1;
  //   abortButton.value.click();
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } catch (error: any) {
  //   if(error.message == 'Account already exists') {
  //     alert('Konto existiert bereits');
  //   } else {
  //     alert('Fehler beim Speichern');
  //     // eslint-disable-next-line no-console
  //     console.error(error);
  //   }
  // }
}

function handleContactChange(index: number) {
  if(index === contactCount.value) {
    contactCount.value++;
  }
}

const emit = defineEmits(['submit']);
</script>

<style lang="scss" scoped>

</style>