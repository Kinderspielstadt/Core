<script lang="ts" setup>
import { ref } from 'vue';
import { ColorsResponse } from '../../types/pocketbase.types';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const isSelecting = ref(false);

defineProps<{
  selectedColor?: string;
  colors: ColorsResponse[];
}>();

function selectColor(id?: string) {
  emit('selectColor', id);
  isSelecting.value = false;
}

const emit = defineEmits<{
  selectColor: [id?: string];
}>();
</script>

<template>
  <div
    class="flex size-10 cursor-pointer place-items-center justify-center rounded-full border border-base-content"
    :style="`background: ${selectedColor}`"
    @click="isSelecting = !isSelecting"
  >
    <template v-if="!selectedColor"><XMarkIcon class="size-7" /></template>
    <div v-if="isSelecting" class="absolute mt-20 flex items-center gap-2">
      <div
        v-for="color in colors"
        :key="color.id"
        class="size-6 rounded-full border border-base-content shadow-lg transition-all hover:size-8"
        :style="`background: ${color.hex}`"
        @click.stop="selectColor(color.id)"
      />
      <div
        class="group flex size-6 cursor-pointer place-items-center justify-center rounded-full border border-base-content transition-all hover:size-8"
        @click.stop="selectColor()"
      >
        <XMarkIcon class="size-5 transition-all group-hover:size-7" />
      </div>
    </div>
  </div>
</template>
