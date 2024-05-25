<script lang="ts" setup>
import { ref } from 'vue';
import AtomModal from '../atoms/AtomModal.vue';
import { FileService } from '../../services/file.service';
import { AccountService } from '../../services/account.service';

defineProps<{
  id: string;
}>();

const picture = ref('');
const modal = ref<typeof AtomModal>();

defineExpose({
  show: async (id: string) => {
    const account = await AccountService.getAccountById(id);
    picture.value = FileService.getAvatar(id, account.picture);
    modal.value?.show();
  },
  close: () => modal.value?.close(),
  isOpen: () => modal.value?.isOpen(),
});
</script>

<template>
  <AtomModal :id ref="modal" close-button w-auto @close="picture = ''">
    <img
      v-if="picture"
      :src="picture"
      class="skeleton -mb-4 size-64 rounded-lg bg-base-200"
    />
    <div v-else class="skeleton -mb-4 size-64 rounded-lg bg-base-200" />
  </AtomModal>
</template>
