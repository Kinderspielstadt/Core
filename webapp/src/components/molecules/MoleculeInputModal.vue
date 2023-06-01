<template>
  <AtomModal
    :id="id"
    :title="title"
    @open="handleOpen"
  >
    <div class="flex place-items-center justify-between">
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
        <XCircleIcon class="h-6 w-6" />
        Abbrechen
      </label>
      <button
        class="btn gap-2"
        @click="handleSubmit()"
      >
        <CheckCircleIcon class="h-6 w-6" />
        {{ actionLabel }}
      </button>
    </template>
  </AtomModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomCurrencyInput from '../atoms/AtomCurrencyInput.vue';
import AtomModal from '../atoms/AtomModal.vue';

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
  if(input.value.$refs.input.$refs.input.value <= 0 || input.value.$refs.input.$refs.input.value > 100) {
    return;
  }
  emit('submit', input.value.$refs.input.$refs.input.value);
  abortButton.value.click();
}
</script>

<style lang="scss" scoped>

</style>