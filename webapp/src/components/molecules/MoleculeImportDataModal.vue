<script lang="ts" setup>
import { ref } from 'vue';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/vue/24/outline';
import AtomModal from '../atoms/AtomModal.vue';
import AtomFileInput from '../atoms/AtomFileInput.vue';

const modal = ref<InstanceType<typeof AtomModal>>();
const file = ref<File>();

defineProps<{
  id: string;
  title: string;
  actionLabel: string;
}>();

const emit = defineEmits(['submit']);

function handleSubmit() {
  if (!file.value) {
    return;
  }
  emit('submit', file.value);
}

defineExpose({
  show: () => modal.value?.show(),
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
});
</script>

<template>
  <AtomModal :id="id" ref="modal" :title="title">
    <div class="flex flex-col gap-2">
      <AtomFileInput
        @change="file = ($event.target as HTMLInputElement)?.files?.[0]"
      />
      <p>
        Datei für den Import der Stammdaten im CSV-Format auswählen.<br /><b
          >! Achtung !</b
        >
        Die Datei muss eine Kopfzeile besitzen.
      </p>
    </div>
    <template #action>
      <label class="btn gap-2" :for="id" @click="modal?.close()">
        <XCircleIcon class="size-6" />
        Abbrechen
      </label>
      <button class="btn gap-2" @click="handleSubmit()">
        <CheckCircleIcon class="size-6" />
        {{ actionLabel }}
      </button>
    </template>
  </AtomModal>
</template>
