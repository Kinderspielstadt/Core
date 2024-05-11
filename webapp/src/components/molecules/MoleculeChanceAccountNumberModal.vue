<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomModal from '../atoms/AtomModal.vue';
import AtomInput from '../atoms/AtomInput.vue';

const modal = ref<InstanceType<typeof AtomModal>>();
const accountNumber = ref('');
const accountId = ref('');

defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['submit']);

function handleClose() {
  accountNumber.value = '';
}

function handleSubmit() {
  if (!accountNumber.value) {
    return;
  }
  emit('submit', {
    id: accountId.value,
    accountNumber: accountNumber.value,
  });
}

defineExpose({
  show: (id: string) => {
    accountId.value = id;
    modal.value?.show();
  },
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
});
</script>

<template>
  <AtomModal :id="id" ref="modal" :title="title" @close="handleClose">
    <div class="flex place-items-center justify-between">
      <AtomInput
        v-model="accountNumber"
        class="w-4/12"
        @keyup.esc="modal?.close()"
      />
    </div>
    <template #action>
      <label class="btn gap-2" :for="id" @click="modal?.close()">
        <XCircleIcon class="size-6" />
        Abbrechen
      </label>
      <button class="btn gap-2" @click="handleSubmit()">
        <CheckCircleIcon class="size-6" />
        Speichern
      </button>
    </template>
  </AtomModal>
</template>
