<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomCurrencyInput from '../atoms/AtomCurrencyInput.vue';
import AtomModal from '../atoms/AtomModal.vue';

const modal = ref<InstanceType<typeof AtomModal>>();
const amount = ref();

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

function handleClose() {
  amount.value = '';
}

function handleSubmit() {
  if (amount.value <= 0) {
    return;
  }
  emit('submit', amount.value);
}

defineExpose({
  show: () => modal.value?.show(),
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
});
</script>

<template>
  <AtomModal :id="id" ref="modal" :title="title" @close="handleClose">
    <div class="flex place-items-center justify-between">
      <span>{{ inputLabel }}</span>
      <AtomCurrencyInput
        v-model="amount"
        class="w-4/12"
        :max="1000"
        @keyup.esc="modal?.close()"
      />
    </div>
    <template #action>
      <label class="btn gap-2" :for="id" @click="modal?.close()">
        <XCircleIcon class="h-6 w-6" />
        Abbrechen
      </label>
      <button class="btn gap-2" @click="handleSubmit()">
        <CheckCircleIcon class="h-6 w-6" />
        {{ actionLabel }}
      </button>
    </template>
  </AtomModal>
</template>
