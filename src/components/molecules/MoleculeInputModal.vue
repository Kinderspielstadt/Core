<template>
  <AtomModal
    :id="id"
    :title="title"
    @open="handleOpen"
  >
    <div class="flex justify-between place-items-center">
      <span>{{ inputLabel }}</span>
      <AtomCurrencyInput
        ref="input"
        class="w-4/12"
        @keyup.enter="handleSubmit()"
        @keyup.esc="abortButton.click()"
      />
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
        {{ actionLabel }}
      </button>
    </template>
  </AtomModal>
</template>

<script lang="ts" setup>
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/outline';
import AtomModal from '../atoms/AtomModal.vue';
import AtomCurrencyInput from '../atoms/AtomCurrencyInput.vue';
import { ref } from 'vue';

const input = ref();
const abortButton = ref();

defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  actionLabel: {
    type: String,
    required: true,
  },
  inputLabel: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['submit']);

function handleOpen(event: {id: string, open: boolean}) {
  if(event.open) {
    // This is (currently) the only method to focus a input field inside a custom component.
    input.value.$refs.input.$refs.input.value = '';
    input.value.$refs.input.$refs.input.focus();
  }
}

function handleSubmit() {
  emit('submit', input.value.$refs.input.$refs.input.value);
  abortButton.value.click();
}
</script>

<style lang="scss" scoped>

</style>