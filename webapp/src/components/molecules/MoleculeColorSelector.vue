<template>
  <div
    class="flex h-10 w-10 cursor-pointer place-items-center justify-center rounded-full border border-base-content"
    :style="`background: ${selectedColor}`"
    @click="isSelecting = !isSelecting"
  >
    <template v-if="!selectedColor"><XMarkIcon class="h-7 w-7" /></template>
    <div
      v-if="isSelecting"
      class="absolute mt-20 flex items-center gap-2"
    >
      <div
        v-for="color in colors"
        class="h-6 w-6 rounded-full border border-base-content shadow-lg transition-all hover:h-8 hover:w-8"
        :style="`background: ${color.hex}`"
        @click.stop="selectColor(color.id)"
      />
      <div
        class="group flex h-6 w-6 cursor-pointer place-items-center justify-center rounded-full border border-base-content
               transition-all hover:h-8 hover:w-8"
        @click.stop="selectColor()"
      >
        <XMarkIcon class="h-5 w-5 transition-all group-hover:h-7 group-hover:w-7" />
      </div>
    </div>
  </div>
</template>

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

<style lang="scss" scoped>

</style>